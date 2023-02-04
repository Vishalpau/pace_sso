import React, { Component, forwardRef, Fragment } from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { Grid, Typography, Button, Card, CardContent, Container, CardActions, CardMedia, Paper, TextField } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import producticon from '../../../public/LoginImg/producticon.png';
import '../../../src/App.css'
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
import { UserActions } from '../../../src/js/user/UserActions';
import Page from '../../components/Page';
import { getPermissions } from '../../helpers';

class AppSubscriptions extends Component {

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
            isLoaded: false,
            openPerm: false
        }
        // console.log({props:this.props})
        this.action = new UserActions(this.props.dispatch);
    }


    componentDidMount = () => {
        // console.log({store:this.props})
        // console.log({props_dash:this.props})
        const companyId = localStorage.getItem('companyId')
        // console.log({company_id:companyId})

        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/self/' + companyId + '/',
            method: 'GET',
        }).then((res) => {
            this.setState({ isLoaded: true })
            this.setState({
                user: res.data.data.results.data
            })
            this.setState({
                subscriptions: res.data.data.results.data.companies.map(company => company.subscriptions)
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
            // console.log({result:res.data.data.results})
            const userList = res.data.data.results.map(user => ({ 'id': user.id, "name": user.name, "email": user.email }))
            // console.log({user_list:userList})
            this.setState({ userList: userList })
        }).catch((err) => {
            console.log({ error: err })

        })

        this.setState({ isLoaded: true })
        // console.log({loaded:this.state.isLoaded})
    }



    handleTouch = (e) => {
        // console.log({event:e.target.name})
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


    openPermission = () => {
        console.log({ perm: this.state.openPerm })
        this.setState({ openPerm: true })
        console.log({ perm: this.state.openPerm })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleToggle = (application) => {

        console.log({ application_toggle: application })
        this.setState({ applications: application })
        const appId = application.appId
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/roles/',
            method: 'GET',
        }).then((res) => {
            // console.log({ roles: res})
            this.setState({ open: !this.state.open })
            this.setState({
                roles: res.data.data.results
            })

        }).catch((err) => {
            console.log(err)
            if (err.response && err.response.data.status_code == 403) {
                this.action.openSnackbar('You are not authorized. Please contact your Admin', true)
                this.action.showSnackbar
            }

        })
    }

    handleSubscribeExistingUser = () => {

        const isValid = this.formValidation();

        if (isValid) {
            const input = new FormData()
            const appId = this.state.applications.appId
            const userId = this.state.userId
            const companyId = localStorage.getItem('companyId')

            // console.log({roleId:this.state.roleId})
            input.append('fkCompanyId', companyId)
            input.append('fkAppId', appId)
            input.append('fkGroupId', this.state.roleId)
            input.append('active', true)

            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/subscriptions/',
                method: 'POST',
                data: input,
            }).then((res) => {
                //   console.log({ result: res})
                this.setState({ role_name: res.data.data.results.role_name })
                this.setState({ roleShow: !this.state.roleShow })

                this.action.openSnackbar('User Subscribed succesfully')
                this.action.showSnackbar
                this.handleClose()

            }).catch((err) => {
                //alert('error');
                console.log({ err: err })
                this.setState({ loading: false })
                if (err.response && err.response.status == 400) {
                    this.action.openSnackbar(err.response.data.data.results, true)
                    this.action.showSnackbar

                }
                else if (err.response && err.response.data.status_code == 403) {
                    this.action.openSnackbar('You are not authorized. Please contact your Admin', true)
                    this.action.showSnackbar
                    this.handleClose()

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

            input.append('fkAppId', this.state.applications.appId)
            input.append('fkGroupId', this.state.roleId_new)
            input.append('fkCompanyId', fkCompanyId)
            input.append('referralEmail', this.state.email)
            input.append('referralPhone', this.state.mobile)

            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/' + user_id + '/invites/',
                method: 'POST',
                data: input,
            }).then((res) => {
                //   console.log({ result: res})
                this.action.openSnackbar('User has been invited succesfully')
                this.action.showSnackbar
                this.handleClose()

            }).catch((err) => {
                //alert('error');
                //   console.log({err:err})
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
        // console.log({event:newValue})
        if (newValue) {
            this.setState({ userId: newValue.id }, () => console.log({ userId: this.state.userId }))
        }
    }

    getStarted = (clientId) => {
        if (clientId) {

            window.open(
                process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + clientId + '&response_type=code&companyId=' + localStorage.getItem('companyId') + '&projectId=' + localStorage.getItem('ssoProjectId'),
                '_blank' // <- This is what makes it open in a new window.
            );
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
                padding: theme.spacing(2),
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


        const { open, openPerm } = this.state

        const { touched, errors } = this.state


        const { isLoaded } = this.state
        // const subscriptions= this.state.subscriptions
        console.log({ state: isLoaded })
        return (
            <Fragment>
                <Page title="Subscriptions">
                    <Container className={classes.root}>
                        {/* <Grid item md={12} xs={12} className={classes.contentSection}>
                    <Typography className={classes.contentTitle} varient="h1">Profile</Typography>
                    <Card>
                        <CardContent>
                            <Grid container >
                                <Grid item md={12} xs={12} >
                                    <Typography className={classes.userName} style={{ textTransform: 'capitalize'}} > Hi {this.state.user.name}!</Typography>
                                    <Typography className={classes.userWelcomeText}><span>Welcome to PACE OS</span></Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> */}

                        <Grid item md={12} xs={12} className={classes.contentSection}>
                            <Typography className={classes.contentTitle} varient="h1">PACE Subscriptions</Typography>
                            <Paper>
                                {!(this.state.subscriptions.length === 0) ?
                                    <Grid container className={classes.contentBoxContainer}>
                                        {/* { this.state.subscriptions[0].filter(application => application.appCode != 'accounts').map((application,index)=> { */}
                                        {this.state.subscriptions[0].map((application, index) => {
                                            return (
                                                (<Grid item xs={6} className={classes.contentBox}>

                                                    <Card>

                                                        <CardContent className={classes.applictnBoxs}>
                                                            <div className={classes.productLog}>
                                                                <img className={classes.large} src={producticon} title="User pic" alt="User pic" />
                                                            </div>


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
                                                                            secondary={application.total_subscriptions}
                                                                        />
                                                                        <ListItemSecondaryAction>
                                                                            {/* <IconButton edge="add" aria-label="plush" onClick={()=>this.openPermission()}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 27.067 27.067">
                                                        <g id="permission-settings" transform="translate(-64 -64)">
                                                            <path id="Path_1" data-name="Path 1" d="M614.767,596.35v-1.933a2.417,2.417,0,1,0-4.833,0v1.933A1.939,1.939,0,0,0,608,598.283v2.9a1.939,1.939,0,0,0,1.933,1.933h4.833a1.939,1.939,0,0,0,1.933-1.933v-2.9A1.939,1.939,0,0,0,614.767,596.35Zm-.967,0h-2.9v-1.933a1.45,1.45,0,1,1,2.9,0Z" transform="translate(-527.567 -512.05)" fill="#546e7a"/>
                                                            <path id="Path_2" data-name="Path 2" d="M90.29,75.444l-2.948-.59a.971.971,0,0,1-.721-.623q-.146-.4-.327-.789a.971.971,0,0,1,.069-.951l1.668-2.5a.967.967,0,0,0-.121-1.22L86.3,67.157a.967.967,0,0,0-1.22-.121l-2.5,1.668a.971.971,0,0,1-.951.069q-.386-.181-.789-.327a.971.971,0,0,1-.623-.721l-.59-2.948A.967.967,0,0,0,78.674,64H76.392a.967.967,0,0,0-.948.777l-.59,2.948a.971.971,0,0,1-.623.721q-.4.146-.789.327a.971.971,0,0,1-.951-.069l-2.5-1.668a.967.967,0,0,0-1.22.121L67.157,68.77a.967.967,0,0,0-.121,1.22l1.668,2.5a.971.971,0,0,1,.069.951q-.181.386-.327.789a.971.971,0,0,1-.721.623l-2.948.589a.967.967,0,0,0-.777.948v2.282a.967.967,0,0,0,.777.948l2.948.59a.971.971,0,0,1,.721.623q.146.4.327.789a.971.971,0,0,1-.069.951l-1.668,2.5a.967.967,0,0,0,.121,1.22L68.77,87.91a.967.967,0,0,0,1.22.121l2.5-1.668a.971.971,0,0,1,.951-.069q.386.181.789.327a.971.971,0,0,1,.623.721l.59,2.948a.967.967,0,0,0,.948.777h2.282a.967.967,0,0,0,.793-.413V83a5.791,5.791,0,1,1,3.753-4.32,6.634,6.634,0,0,1,1.564-.185,5.993,5.993,0,0,1,3.991,1.425l1.515-.3a.967.967,0,0,0,.777-.949V76.392a.967.967,0,0,0-.777-.948Z" fill="#546e7a"/>
                                                        </g>
                                                    </svg>
                                                </IconButton> */}
                                                                            <IconButton edge="add" aria-label="plush" disabled={getPermissions('applications.add_invites')} onClick={() => this.handleToggle(application)}>
                                                                                <ControlPointIcon />
                                                                            </IconButton>
                                                                        </ListItemSecondaryAction>
                                                                    </ListItem>
                                                                </List>

                                                                <CardActions className={classes.customGetStarted}>
                                                                    <Button size="large" onClick={() => this.getStarted(application.hostings[0].clientId)}>Get Started <span> </span></Button>
                                                                </CardActions>

                                                            </div>

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
                                                                            <ListItemText className={classes.applicationName} primary="Application Name : " secondary={this.state.applications.appName} />
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
                                                                                            <MenuItem key={role.id} value={role.id}>
                                                                                                {role.name}
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
                                                                                        getOptionLabel={option => option.email}
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
                                                                                            <MenuItem key={role.id} value={role.id}>
                                                                                                {role.name}
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
                                                                                        Invite
                                                                                    </Button>
                                                                                </Grid>
                                                                            </Grid>

                                                                        </Grid>
                                                                    </Grid>
                                                                </DialogContent>
                                                            </Dialog>

                                                            <Dialog onClose={this.handleClose} className={classes.dialogSection} aria-labelledby="customized-dialog-title" open={openPerm}>
                                                                <DialogTitle className={classes.popLableSection} id="customized-dialog-title" onClose={this.handleClose}>

                                                                </DialogTitle>
                                                                <DialogContent>
                                                                    <Grid
                                                                        container
                                                                        className={classes.selectUserBtnSection}
                                                                        spacing={2}
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            md={12}
                                                                            xs={12}
                                                                        >
                                                                            {/* <Typography className={classes.aplicationTitle}> Application</Typography> */}
                                                                            <Typography className={classes.aplicationTitVal}> Safety</Typography>
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={12}
                                                                            xs={12}
                                                                        >
                                                                            <Typography className={classes.permisionLabel}> Role</Typography>
                                                                            <TextField
                                                                                //multiline
                                                                                fullWidth
                                                                                disabled
                                                                                variant="outlined"
                                                                                //rows="1"
                                                                                id="description"
                                                                                //label="Role"
                                                                                defaultValue="Admin"
                                                                                className={classes.formControl}

                                                                            />
                                                                        </Grid>
                                                                        <Grid
                                                                            item
                                                                            md={12}
                                                                            xs={12}
                                                                        >
                                                                            <Typography className={classes.permisionLabel}> Permission</Typography>
                                                                            <List className={classes.permiListBox}>
                                                                                <ListItem className={classes.permiListLable}>
                                                                                    <ListItemText>Text 1</ListItemText>
                                                                                </ListItem>
                                                                                <ListItem className={classes.permiListLable}>
                                                                                    <ListItemText>Text 2</ListItemText>
                                                                                </ListItem>
                                                                                <ListItem className={classes.permiListLable}>
                                                                                    <ListItemText>Text 3</ListItemText>
                                                                                </ListItem>
                                                                            </List>
                                                                        </Grid>
                                                                    </Grid>
                                                                </DialogContent>
                                                            </Dialog>

                                                        </CardContent>
                                                    </Card>
                                                    {/* ))} */}
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
                </Page>
            </Fragment>
        );
    }
}

const useStyles = theme => ({
    // popLableSection :{
    //     height: '61px',
    // },
    permisionLabel: {
        color: '#06425C',
        fontSize: '15px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '20px',
    },
    aplicationTitVal: {
        color: '#06425C',
        fontSize: '18px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '20px',
    },
    permiListBox: {
        padding: '0px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    permiListLable: {
        borderBottom: '1px solid #ccc',
    },
    permiListBox: {
        padding: '0px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        '& .MuiListItemText-primary': {
            color: '#666666',
            fontSize: '14px',
            lineHeight: '18px',
            fontFamily: 'Montserrat-Regular',
        },
    },
    root: {
        float: 'left',
        '& .MuiCardContent-root': {
            backgroundColor: '#ffffff',
            padding: '12px 20px',
            [theme.breakpoints.down("md")]: {
                padding: '20px',
            },
            [theme.breakpoints.down("sm")]: {
                padding: '15px',
            },
        },
    },
    root: {
        float: 'left',
        '& .MuiCardContent-root': {
            backgroundColor: '#ffffff',
            padding: '12px 20px',
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
        paddingLeft: '20px',
        paddingRight: '20px',
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
    userName: {
        fontSize: '18px',
        lineHeight: '32px',
        color: '#05374A',
        fontFamily: 'xolonium',
    },
    userWelcomeText: {
        fontSize: '24px',
        lineHeight: '30px',
        color: '#05374A',
        fontFamily: 'xolonium',
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

    contentSection: {
        marginTop: '25px',
        marginBottom: '30px',
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
    userName: {
        fontSize: '18px',
        lineHeight: '32px',
        color: '#05374A',
        fontFamily: 'xolonium',
    },
    userWelcomeText: {
        fontSize: '24px',
        lineHeight: '30px',
        color: '#05374A',
        fontFamily: 'xolonium',
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
                fontFamily: 'Montserrat-Medium',
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
)(withStyles(useStyles, { withTheme: true })(AppSubscriptions));