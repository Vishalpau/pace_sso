import React, { Component, forwardRef, Fragment } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Grid, Typography, Button, Card, CardContent, Container, CardActions, CardMedia, Paper, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import producticon from '../../../../../../public/LoginImg/producticon.png';
import '../../../../../../src/App.css'
import { connect } from 'react-redux';
import { List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserActions } from '../../../../../../src/js/user/UserActions';
import PaceLoader from '../../../../user/auth/PaceLoader';

class ListSubscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            subscriptions: [],
            userList: [],
            applications: {},
            open: false,
            roles: [],
            userId: "",
            existingUserShow: false,
            newUserShow: false,
            noOfSubscribers: "",
            email: "",
            mobile: "",
            roleId: "",
            touched: {},
            errors: {},
            roleId_new: "",
            isLoaded: false
        }
        console.log({ props: this.props })
        this.action = new UserActions(this.props.dispatch);
    }


    componentDidMount = () => {

        console.log({ props_dash: this.props })
        const companyId = localStorage.getItem('companyId')
        console.log({ company_id: companyId })

        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/self/' + companyId + '/',
            method: 'GET',
        }).then((res) => {
            this.setState({ isLoaded: true })
            this.setState({
                user: res.data.data.results.data
            })
            this.setState({
                subscriptions: res.data.data.results.data.subscriptions
            })

            console.log({ subscriptions: this.state.subscriptions })

        }).catch((err) => {
            this.setState({ isLoaded: true })
            console.log(err)

        })

        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/userList/' + companyId + '/',
            method: 'POST',
        }).then((res) => {
            console.log({ result: res.data.data.results })
            const userList = res.data.data.results.map(user => ({ 'id': user.id, "name": user.name }))
            console.log({ user_list: userList })
            this.setState({ userList: userList })
        }).catch((err) => {
            console.log({ error: err })

        })

        this.setState({ isLoaded: true })
        console.log({ loaded: this.state.isLoaded })
    }

    handleTouch = (e) => {
        console.log({ event: e.target.name })
        let { touched } = this.state
        if (e.target.name && touched[e.target.name] != true) {
            touched[e.target.name] = true;
            this.setState({ touched }, () => console.log({ touched: this.state.touched }))
        }
    }

    formValidation = () => {
        const { email, mobile, userId, roleId, roleId_new } = this.state
        let isValid = true
        const errors = {};

        if (this.state.existingUserShow) {
            if (email == "") {
                errors.email = "Email should be specified"
                isValid = false
            }

            else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) == null) {
                errors.email = "Please enter valid Email"
                isValid = false
            }

            if (mobile.match(/^[0-9]{10}$/) == null && mobile != "") {
                errors.mobile = "Please enter valid mobile number"
                isValid = false

            }
            if (roleId_new == "") {
                errors.roleId_new = "Please select the role"
                isValid = false
            }
        }
        else {
            if (userId == "") {
                errors.userId = "Please select the user"
                isValid = false
            }

            if (roleId == "") {
                errors.roleId = "Please select the role"
                isValid = false
            }
        }

        this.setState({ errors }, () => console.log({ errors: this.state.errors }));
        return isValid;
    }



    handleChangeRole = (e) => {
        this.setState({ roleId: e.target.value })
    }


    handleChangeRoleNew = (e) => {
        this.setState({ roleId_new: e.target.value })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleToggle = (index) => {
        this.setState({
            open: !this.state.open
        })
        console.log({ index: index })
        this.setState({ applications: this.state.subscriptions[index] })
        const appId = this.state.subscriptions[index].fkAppId
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/roles/',
            method: 'GET',
        }).then((res) => {
            console.log({ roles: res })
            this.setState({
                roles: res.data.data.results
            })

        }).catch((err) => {
            console.log(err)

        })
    }

    handleSubscribeExistingUser = () => {

        const isValid = this.formValidation();

        if (isValid) {
            const input = new FormData()
            const appId = this.state.applications.fkAppId
            const userId = this.state.userId
            const companyId = localStorage.getItem('companyId')

            console.log({ roleId: this.state.roleId })
            input.append('fkCompanyId', companyId)
            input.append('fkAppId', appId)
            input.append('fkRoleId', this.state.roleId)
            input.append('active', true)

            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/subscriptions/',
                method: 'POST',
                data: input,
            }).then((res) => {
                console.log({ result: res })
                this.setState({ role_name: res.data.data.results.role_name })
                this.setState({ roleShow: !this.state.roleShow })
                this.action.openSnackbar('User Subscribed succesfully')
                this.action.showSnackbar
            }).catch((err) => {
                //alert('error');
                console.log({ err: err })
                this.setState({ loading: false })
                if (err.response && err.response.status == 400) {
                    this.action.openSnackbar(err.response.data.data.results, true)
                    this.action.showSnackbar
                }
            })
        }
        else {
            this.setState({
                touched: {
                    'roleId': true,
                    'userId': true
                }
            }, () => console.log({ touched: this.state.touched }))
        }
    }

    handleSubscribeNewUser = () => {

        const isValid = this.formValidation();
        if (isValid) {
            const user_id = localStorage.getItem('user')
            const fkCompanyId = localStorage.getItem('companyId')
            const input = new FormData()

            input.append('fkAppId', this.state.applications.fkAppId)
            input.append('fkRoleId', this.state.roleId_new)
            input.append('fkCompanyId', fkCompanyId)
            input.append('referralEmail', this.state.email)
            input.append('referralPhone', this.state.mobile)

            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/' + user_id + '/invites/',
                method: 'POST',
                data: input,
            }).then((res) => {
                console.log({ result: res })
                this.action.openSnackbar('User has been invited succesfully')
                this.action.showSnackbar
            }).catch((err) => {
                //alert('error');
                console.log({ err: err })
                this.setState({ loading: false })
                if (err.response && err.response.status == 400) {
                    this.action.openSnackbar(err.response.data.data.results, true)
                    this.action.showSnackbar
                }
            })
        }
        else {
            this.setState({
                touched: {
                    'email': true,
                    'mobile': true,
                    'roleId_new': true,
                }
            }, () => console.log({ touched: this.state.touched }))
        }
    }
    handleClose = () => {
        this.setState({ open: !this.state.open })
    };

    handleExistingUser = () => {
        //console.log({existingUserShow:this.state.existingUserShow})
        this.setState({ existingUserShow: !this.state.existingUserShow })
        // this.setState({errors:{}})        
        // this.setState({touched:{}})
        // this.setState({roleId:""})

    }

    handleSearchChange = (event, newValue) => {
        console.log({ event: newValue })
        if (newValue) {
            this.setState({ userId: newValue.id }, () => console.log({ userId: this.state.userId }))
        }
    }


    render() {
        // const classes = useStyles();
        const { classes } = this.props;
        const { classNames } = this.props;

        // const subscriptions= this.state.subscriptions
        // console.log({state:this.state.user.name})

        const styles = (theme) => ({
            root: {
                margin: 0,
                //padding: theme.spacing(2),
            },
            closeButton: {
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
                color: theme.palette.grey[500],
            },
        });

        // searchUser =[
        //     { title: 'Viraj' },
        //     { title: 'Ashutosh' },
        //     { title: 'Vani' },
        //     { title: 'Vishal'},
        //     { title: 'Saddam'},
        //   ]

        const DialogTitle = withStyles(styles)((props) => {
            const { children, classes, onClose, ...other } = props;
            return (
                <MuiDialogTitle disableTypography className={classes.root} {...other}>
                    <Typography variant="h6">{children}</Typography>
                    {onClose ? (
                        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    ) : null}
                </MuiDialogTitle>
            );
        });


        const { open } = this.state

        const { touched, errors } = this.state


        const { isLoaded } = this.state
        // const subscriptions= this.state.subscriptions
        console.log({ state: isLoaded })
        return (
            <Fragment>
                {(isLoaded) ? '' : <PaceLoader />}
                <Container className={classes.root}>
                    <Grid item md={12} xs={12} className={classes.contentSection}>
                        <Typography className={classes.contentTitle} varient="h1">PACE Subscriptions</Typography>
                        <Paper>
                            {!(this.state.subscriptions.length === 0) ?
                                <Grid container className={classes.contentBoxContainer}>
                                    {this.state.subscriptions.map((subscription, index) => {
                                        return (
                                            (<Grid item xs={6} className={classes.contentBox}>
                                                <Card>

                                                    <CardContent className={classes.applictnBoxs}>
                                                        <div className={classes.productLog}>
                                                            <img className={classes.large} src={producticon} title="User pic" alt="User pic" />
                                                        </div>
                                                        {subscription.applications.map((application =>

                                                            <div className={classes.productCaption}>
                                                                <Typography gutterBottom variant="body1" component="h2"> {application.appName}<span>  </span></Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {application.appDesc}
                                                                </Typography>

                                                                <List className={classes.subscribCountBox}>
                                                                    <ListItem>
                                                                        <ListItemText
                                                                            className={classes.subscribCountLable}
                                                                            primary="Subscribers : "
                                                                            secondary={subscription.noOfSubscribers}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            <IconButton edge="perm" aria-label="plush">
                                                                                <ControlPointIcon />
                                                                            </IconButton>
                                                                            <IconButton edge="add" aria-label="plush" onClick={() => this.handleToggle(index)}>
                                                                                <ControlPointIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                </List>

                                                                <CardActions className={classes.customGetStarted}>
                                                                    <Button size="large">Get Started <span> </span></Button>
                                                                </CardActions>

                                                            </div>
                                                        ))}
                                                        <Dialog onClose={this.handleClose} className={classes.dialogSection} aria-labelledby="customized-dialog-title" open={open}>
                                                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                                                Subscribe User
                                                            </DialogTitle>
                                                            <DialogContent dividers>
                                                                <Grid
                                                                    container
                                                                    className={classes.selectUserBtnSection}
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        className={classes.formBox}
                                                                    >
                                                                        <ListItemText className={classes.applicationName} primary="Application Name : " secondary={this.state.applications.application_name} />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        className={classes.existingUserSection}
                                                                    >
                                                                        <ListItemText className={classes.dialogTitle} primary="Please select existing user or new user" />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={6}
                                                                        xs={6}
                                                                    >
                                                                        <Button fullWidth variant="outlined" className={(!this.state.existingUserShow) ? classes.activPopBtn : classes.PopBtn} onClick={this.handleExistingUser} disabled={!this.state.existingUserShow}>
                                                                            Existing Users
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={6}
                                                                        xs={6}
                                                                    >
                                                                        <Button fullWidth variant="outlined" className={(this.state.existingUserShow) ? classes.activPopBtn : classes.PopBtn} onClick={this.handleExistingUser} disabled={this.state.existingUserShow}>
                                                                            New User
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid
                                                                    container
                                                                //spacing={3}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        className={classes.existingUserSection}
                                                                        hidden={this.state.existingUserShow}
                                                                    >
                                                                        <Grid
                                                                            container
                                                                            spacing={2}
                                                                        >
                                                                            <Grid
                                                                                item
                                                                                md={6}
                                                                                xs={6}
                                                                                className={classes.formBox}
                                                                            >
                                                                                <TextField
                                                                                    fullWidth
                                                                                    label="Role"
                                                                                    margin="dense"
                                                                                    name="roleId"
                                                                                    id="roleId"
                                                                                    select
                                                                                    helperText={touched.roleId && Boolean(errors.roleId) ? errors.roleId : ""}
                                                                                    error={touched.roleId && Boolean(errors.roleId)}
                                                                                    onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                                                    onChange={(e) => { this.handleChangeRole(e); this.formValidation(); }}
                                                                                    variant="outlined"
                                                                                    className={classes.formControl}
                                                                                >

                                                                                    {this.state.roles && this.state.roles.map((role) => (
                                                                                        <MenuItem key={role.roleId} value={role.roleId}>
                                                                                            {role.roleName}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </TextField>

                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                md={6}
                                                                                xs={6}
                                                                                className={classes.formBox}
                                                                            >
                                                                                <Autocomplete
                                                                                    freeSolo
                                                                                    fullWidth
                                                                                    id='id'
                                                                                    name='id'
                                                                                    options={this.state.userList}
                                                                                    onChange={(e, newValue) => { this.handleSearchChange(e, newValue); this.formValidation() }}
                                                                                    // disableClearable
                                                                                    getOptionLabel={option => option.name}
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            label="Search User"
                                                                                            margin="dense"
                                                                                            variant="outlined"
                                                                                            helperText={touched.userId && Boolean(errors.userId) ? errors.userId : ""}
                                                                                            error={touched.userId && Boolean(errors.userId)}
                                                                                            onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                md={12}
                                                                                xs={12}
                                                                            >
                                                                                <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={this.handleSubscribeExistingUser}>
                                                                                    Subscribe Now
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        md={12}
                                                                        xs={12}
                                                                        className={classes.formBox}
                                                                        hidden={!this.state.existingUserShow}
                                                                    >

                                                                        <Grid
                                                                            container
                                                                            spacing={2}
                                                                        >
                                                                            <Grid
                                                                                item
                                                                                md={6}
                                                                                xs={6}
                                                                                className={classes.formBox}
                                                                            >
                                                                                <TextField
                                                                                    fullWidth
                                                                                    label="Email"
                                                                                    margin="dense"
                                                                                    name="email"
                                                                                    id="email"
                                                                                    variant="outlined"
                                                                                    value={this.state.email}
                                                                                    helperText={touched.email && Boolean(errors.email) ? errors.email : ""}
                                                                                    onChange={(e) => { this.handleChange(e); this.formValidation() }}
                                                                                    error={touched.email && Boolean(errors.email)}
                                                                                    onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                                                    // // onBlur={(e) => { this.handleTouch(e); }}
                                                                                    className={classes.formControl}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                md={6}
                                                                                xs={6}
                                                                                className={classes.formBox}
                                                                            >
                                                                                <TextField
                                                                                    fullWidth
                                                                                    label="Mobile"
                                                                                    margin="dense"
                                                                                    name="mobile"
                                                                                    id="mobile"
                                                                                    variant="outlined"
                                                                                    value={this.state.mobile}
                                                                                    helperText={touched.mobile && Boolean(errors.mobile) ? errors.mobile : ""}
                                                                                    onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                                                    error={touched.mobile && Boolean(errors.mobile)}
                                                                                    onChange={(event) => { this.handleChange(event); this.formValidation(); }}
                                                                                    className={classes.formControl}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                md={6}
                                                                                xs={6}
                                                                                className={classes.formBox}
                                                                            >
                                                                                <TextField
                                                                                    fullWidth
                                                                                    label="Role"
                                                                                    margin="dense"
                                                                                    name="roleId_new"
                                                                                    id="roleId_new"
                                                                                    select
                                                                                    helperText={touched.roleId_new && Boolean(errors.roleId_new) ? errors.roleId_new : ""}
                                                                                    error={touched.roleId_new && Boolean(errors.roleId_new)}
                                                                                    onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                                                    onChange={(e) => { this.handleChangeRoleNew(e); this.formValidation(); }} variant="outlined"
                                                                                    className={classes.formControl}
                                                                                >
                                                                                    {this.state.roles && this.state.roles.map((role) => (
                                                                                        <MenuItem key={role.roleId} value={role.roleId}>
                                                                                            {role.roleName}
                                                                                        </MenuItem>
                                                                                    ))}
                                                                                </TextField>
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                md={12}
                                                                                xs={12}
                                                                            >
                                                                                <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={this.handleSubscribeNewUser}>
                                                                                    Subscribe Now
                                                                                </Button>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </CardContent>
                                                </Card>
                                            </Grid>)
                                        )
                                    })}
                                </Grid>
                                :
                                <Grid container className={classes.contentBoxContainerNoApp}>
                                    <Typography gutterBottom className={classes.noAppSection} variant="body1" component="h2">No PACE Applications were subscribed</Typography>
                                </Grid>
                            }
                        </Paper>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

const useStyles = theme => ({
    root: {
        float: 'left',
        '& .MuiCardContent-root': {
            backgroundColor: '#ffffff',
            padding: '20px 60px',
            [theme.breakpoints.down("md")]: {
                padding: '20px',
            },
            [theme.breakpoints.down("sm")]: {
                padding: '15px',
            },
        },
    },
    applictnBoxs: {
        backgroundColor: '#ffffff',
        padding: '20px !important',
        float: 'left',
        width: '100%',
    },
    contentSection: {
        marginTop: '50px',
        //paddingLeft: '20px', 
        //paddingRight: '20px',
        marginBottom: '40px',
        [theme.breakpoints.down("md")]: {
            paddingLeft: '0px',
            paddingRight: '0px',
            marginTop: '35px',
        },
    },
    contentTitle: {
        fontSize: '30px',
        lineHeight: '50px',
        fontFamily: 'xolonium',
        color: '#054D69',
        paddingBottom: '5px',
        borderBottom: '1px solid #d6d9da',
        marginBottom: '30px',
        [theme.breakpoints.down("md")]: {
            fontSize: '22px',
            lineHeight: '40px',
        },
    },
    productLog: {
        width: '100px',
        float: 'left',
        display: 'block',
        border: '1px solid #ACACAC',
        borderRadius: '4px',
        padding: '4px',
        backgroundColor: '#F2F2F2',
        textAlign: 'center',
    },
    productCaption: {
        width: 'calc(100% - 120px)',
        float: 'left',
        display: 'block',
        marginLeft: '20px',
        '& h2': {
            color: '#054D69',
            fontSize: '18px',
            lineHeight: '18px',
            fontFamily: 'Montserrat-SemiBold',
        },
        '& h2 span': {
            width: '50px',
            height: '4px',
            display: 'block',
            backgroundColor: '#F28705',
            marginTop: '4px',
        },
        '& p': {
            fontSize: '14px',
            lineHeight: '20px',
            color: '#054D69',
            fontFamily: 'Montserrat-Medium',
        },
    },
    customGetStarted: {
        padding: '0px',
        '& Button': {
            width: '100%',
            padding: '0px',
            marginTop: '5px',
        },
        '& Button > span': {
            padding: '12px',
            fontSize: '14px',
            lineHeight: '18px',
            color: '#054D69',
            fontFamily: 'Montserrat-SemiBold',
            textTransform: 'capitalize',
            border: '1px solid #F28705',
            display: 'inline-grid',
        },
        '& Button > span:hover': {
            backgroundColor: '#F28705',
            border: '1px solid #F28705',
            color: '#F2F2F2',
            transitionDuration: '0.6s',
        },
        '& Button > span > span': {
            minWidth: '120px',
            height: '3px',
            backgroundColor: '#ffffff',
            width: '100%',
            margin: '2px auto 0px auto',
        },
        '& Button > span:hover span': {
            backgroundColor: '#F2F2F2',
            transitionDuration: '0.6s',
        },
    },
    creatAccountLink: {
        textAlign: 'center',
        marginTop: '50px',
        '& a': {
            fontSize: '25px',
            lineHeight: '37px',
            color: '#05374A',
            fontFamily: 'Montserrat-Bold',
            padding: '8px 10px',
            border: '1px solid #ffffff',
        },
        '& a:hover': {
            borderColor: '#05374A',
        },
    },
    contentBoxContainer: {
        padding: theme.spacing(0, 0, 6, 0),
    },
    contentBoxContainerNoApp: {
        padding: theme.spacing(2, 1, 2, 1),
    },
    noAppSection: {
        display: 'block',
        textAlign: 'center',
        padding: '20px',
        width: '100%',
        margin: '0',
        fontSize: '20px',
        fontFamily: 'Montserrat-Medium',
        color: '#054D69',
    },
    contentBox: {
        padding: theme.spacing(6, 3, 0, 3),
        margin: '0',
        maxWidth: 500,
    },
    subscribCountBox: {
        padding: '0px',
        '& li': {
            '& .MuiListItem-root': {
                padding: '0px',
                '& .MuiListItemText-primary': {
                    display: 'inline-block',
                    color: '#054D69',
                    fontSize: '14px',
                    fontFamily: 'Montserrat-Medium',
                    lineHeight: '20px',
                },
                '& .MuiListItemText-secondary': {
                    display: 'inline-block',
                    color: '#F28705',
                    fontSize: '14px',
                    fontFamily: 'Montserrat-Medium',
                    lineHeight: '20px',
                    paddingLeft: '5px',
                },
            },
            '& .MuiListItemSecondaryAction-root': {
                right: '0px',
                '& button': {
                    padding: '5px',
                },
            },
        },
        '& button:focus': {
            outline: 'none',
        },
    },
    dialogSection: {
        '& .MuiDialog-paper': {
            width: '100%',
        },
        '& .MuiDialogTitle-root': {
            '& .MuiTypography-root': {
                color: '#06374a',
                fontSize: '20px',
                lineHeight: '30px',
                fontFamily: 'xolonium',
            },
        },
        '& button:focus': {
            outline: 'none',
        },
    },
    dialogTitle: {
        '& .MuiListItemText-primary': {
            color: '#06374a',
            fontSize: '15px',
            fontFamily: 'Montserrat-Regular',
        },
    },
    selectUserBtnSection: {
        '& button': {
            padding: '10px 10px',
            fontSize: '12px',
            textTransform: 'capitalize',
            color: '#06374a',
            borderColor: '#06374a',
            fontFamily: 'Montserrat-Regular',
            borderRadius: '0px',
            marginBottom: '25px',
            '&:focus': {
                outline: '0px',
            },
        },
    },
    applicationName: {
        margin: '0px',
        '& .MuiListItemText-primary': {
            color: '#06374a',
            display: 'inline-block',
            fontSize: '13px',
            fontFamily: 'Montserrat-Regular',
        },
        '& .MuiListItemText-secondary': {
            color: '#06374a',
            display: 'inline-block',
            fontSize: '13px',
            fontFamily: 'Montserrat-Medium',
            lineHeight: '26px',
            display: 'inline-block',
            paddingLeft: '10px',
        },
    },
    // existingUserSection: {
    //     '& .MuiTextField-root': {
    //         width: '180px',
    //     },
    // },
    formBox: {
        //padding: '5px 8px !important',
        '& .MuiOutlinedInput-root.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#06374a',
            },
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#06374a',
        },
        '& .MuiInputLabel-formControl': {
            fontSize: '14px',
            fontFamily: 'Montserrat-Regular',
        },
    },
    custmSubmitBtn: {
        textTransform: 'capitalize',
        fontSize: '14px',
        fontFamily: 'Montserrat-Regular',
        '&:focus': {
            outline: 'none',
        },
        '&:hover': {
            backgroundColor: '#06374a',
            color: '#ffffff',

        }
    },
    popupBtn: {
        backgroundColor: '#ffffff',
    },
    activPopBtn: {
        backgroundColor: '#f28705',
        color: '#ffffff !important',
    },
});

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(ListSubscriptions));