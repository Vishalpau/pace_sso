import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect,withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { UserActions } from '../UserActions';
import Page from '../../../../src/components/Page';
import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    Paper,
    Popper,
    NativeSelect,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PaceLogo from './PaceLogo';
import '../../../../src/App.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import loginBBg from '../../../../../static/public/images/LoginImg/logbeforebg.png';


const CountryCodeList = (props) => {
    return <Popper {...props} style={{ width: "300px" }} placement="bottom-start" />;
};


class ReCreatePassword extends Component {
    constructor(props) {
        super(props);
        this.action = new UserActions(this.props.dispatch);
    }

    state = {
        snackbarOpen: false,
        password:"",
        passwordLengthCheck: false,
        capitalLetterCheck: false,
        numberCheck: false,
        classname:"classes.progresBoxWarning",
        errors: {},
        touched: {},
        name:'',
        email:'',
        mobile:'',
        conf_pass:'',
        phone:'',
        phone_code:'',
        emailPhoneVerifyPage:true,
        otp_email:"",
        otp_mobile:""
    }

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    handleChangeOtpM = (e) =>{

        console.log({event:e})
        this.setState({ otp_mobile:e })
    };


    handleChangeOtpE = (e) =>{

        console.log({event:e})
        this.setState({ otp_email:e })};



    handleOptionChange=(event,value)=>{
       this.setState({phone_code:value.code})
        }

    handleCloseSnackbar = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackbarOpen: false });
    }

    handleSignUp = (event) => {
        event.preventDefault();
        history.push('/');
    };

    handleContinue=()=>{
        let isValid=this.formValidation()
        console.log({isValid:isValid})
        if(isValid){
          const form_data = new FormData();
          form_data.append('name', this.state.name);
          form_data.append('email', this.state.email);
          form_data.append('mobile', this.state.mobile);
          form_data.append('password', this.state.password);
          form_data.append('conf_pass', this.state.conf_pass);
          // form_data.append('applogo', values.logo)

          const url = process.env.API_URL + process.env.API_VERSION + '/user/register/';
          axios.post(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
            .then(res => {
              console.log(res.data);
              this.setState({emailPhoneVerifyPage:false})
              this.action.openSnackbar('One step away for registration!!')
              this.action.showSnackbar
            //   this.props.history.push('/login')
            })
            .catch((err) => {
                console.log({error:err})
                this.setState({ loading: false })
                if (err.response && err.response.status == 400) {
                    // this.setState({emailPhoneVerifyPage:true})
                    console.log(err.response.data.error_description)
                    this.action.openSnackbar(err.response.data.data.results.email,true)
                    this.action.showSnackbar
                    // this.props.history.push('/register')
                }
            })

        }
        else{
            this.setState({emailPhoneVerifyPage:true})
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        })
      };

    handleTouch = (e) => {
        let { touched } = this.state
        if (e.target.name && touched[e.target.name] != true) {
          touched[e.target.name] = true;
          this.setState({ touched },()=>console.log({touched:this.state.touched}))
        }
      }

    formValidation = () => {
        const { name, email,mobile,password,conf_pass,emailPhoneVerifyPage,otp_email,otp_mobile } = this.state
        let isValid = true
        const errors = {};
        if (emailPhoneVerifyPage){
        if (name == "") {
          errors.name = "Name should be specified"
          isValid = false
        }
        if (email == "") {
          errors.email = "Email should be specified"
          isValid = false
        }

        else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/)==null){
           errors.email="Please enter valid Email"
           isValid = false
        }

        if (mobile == "") {
            errors.mobile = "Mobile should be specified"
            isValid = false
          }

        else if(mobile.match(/^[0-9]{10}$/)==null){
            errors.mobile="Please enter valid mobile number"
            isValid = false
        }
        if (password == "") {
            errors.password = "password should be specified"
            isValid = false
          }

        else if(password.length < 8){
              errors.password="password should have minimum of 8 characters"
              isValid = false
          }
        else if (password.match(/[A-Z]/)==null){
            errors.password="password must have atleast one UPPERCASE letter"
            isValid = false
        }
        else if (password.match(/[0-9]/)==null){
            errors.password="password must have number"
            isValid = false
        }
        if (conf_pass == "") {
            errors.conf_pass = "confirm password should be specified"
            isValid = false
          }
        if (password!=conf_pass){
            errors.conf_pass="password and confirm password should match"
            isValid = false
        }
    }
    else{
        if (otp_email == "" && otp_mobile=="") {
            errors.otp = "Enter OTP you received"
            isValid = false
          }

    }

        this.setState({ errors },()=>console.log({errors:this.state.errors}));

        return isValid;
      }

    handleChangePassword=(event)=>{
        let password = event.target.value
        this.setState({password:password})
        //console.log({password: password})
        if(password.length >= 8){
            //console.log({successpassword: password.length})
            this.setState({passwordLengthCheck:true})
        }
        else{
            //console.log({errorpassword: password.length})
            this.setState({passwordLengthCheck:false})
        }
        if(password.match(/[A-Z]/) != null){
            this.setState({capitalLetterCheck:true})
        }
        else{
            this.setState({capitalLetterCheck:false})
        }
        if(password.match(/[0-9]/) != null){
            this.setState({numberCheck:true})
        }
        else{
            this.setState({numberCheck:false})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const isValid = this.formValidation();

        if (isValid) {
          const form_data = new FormData();
          form_data.append('email', this.state.email);
          form_data.append('mobile', this.state.mobile);
          form_data.append('OTP_email', this.state.otp_email);
          form_data.append('OTP_mobile', this.state.otp_mobile);
          // form_data.append('applogo', values.logo)

          const url = process.env.API_URL + process.env.API_VERSION + '/user/verifyotp/';
          axios.put(url, form_data, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
            .then(res => {
              console.log(res.data);
              const token = res.data.access_token
              var fullToken = 'Bearer ' + token
              axios.defaults.headers.common['Authorization'] = fullToken;
              this.action.openSnackbar('Succesfully Registrated your PACE account')
              this.action.showSnackbar
              this.action.login(res.data)
              this.action.openSnackbar("Welcome! Login successful")

            })
            .catch((err) => {
                console.log({error:err})
                this.setState({ loading: false })
                if (err.response && err.response.status == 400) {
                    console.log(err.response.data.error_description)
                    this.action.openSnackbar(err.response.data.data.results.email,true)
                    this.action.showSnackbar
                }
            })
        }
        else{

            this.setState({
                touched:  {
                    'name': true,
                    'email': true,
                    'mobile': true,
                    'password':true,
                    'conf_pass':true
                },
              },()=>console.log({touched:this.state.touched}));
    }
};

    render() {
        // const { classes } = this.props
        const {
            classes,
            handleSubmit,
        } = this.props;

        const { touched, errors } = this.state

        return (
            <Fragment>
                <Grid container className={classes.logoSection} >
                    <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid>
                </Grid>
                <Page className={classes.root} title="ReCreatePassword">
                    <Box className={classes.customcontentbox}
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="center"
                        //hidden={!this.state.emailPhoneVerifyPage}
                    >
                        <Grid container component="main" className={classes.root} style={{ background: `url(${loginBBg}) no-repeat 50% 100%`, backgroundSize: 'contain', paddingBottom: '170px' }}>
                            <Grid
                                //item
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className={classes.mainWraper}
                                >
                                <Grid container item xs={12} sm={8} md={4} component={Paper} className={classes.paper} elevation={5} >
                                    {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}

                                    <Grid item xs={12} sm={12} md={12} align="center">
                                        <Typography component="h1" variant="h5" className={classes.logTitle} >
                                            Hi E-User Name
                                        </Typography>
                                    </Grid>
                                    <form autoComplete="off"
                                        noValidate
                                        className={classes.form}
                                        // onSubmit={this.handleSubmit}
                                        >

                                        <Grid item xs={12} sm={12} md={12} align="center" className={classes.userLogDetail}>
                                            <Typography component="h5" variant="h5">
                                                <AccountCircleIcon /> example@gmail.com
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} className={classes.customUsernamFild}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                margin="normal"
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                className={classes.inputCustmStyl}
                                                value={this.state.password}
                                                helperText={touched.password ? errors.password : ""}
                                                type="password"
                                                onChange={(e) => { this.handleChangePassword(e); this.formValidation(); }}
                                                onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                error={touched.password && Boolean(errors.password)}
                                            //autoComplete="current-password"
                                            />
                                            <i><svg xmlns="http://www.w3.org/2000/svg" width="35" height="33.254" viewBox="0 0 35 33.254"><path d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z" transform="translate(0 0)" fill="#f2f2f2"/></svg></i>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.passwordPolicyStep}>
                                            <Typography variant="h6" className={classes.title}>
                                                Password policy:
                                            </Typography>
                                            <List>
                                                <ListItem><span className={ (this.state.passwordLengthCheck) ? classes.progresBoxSucess  : ((this.state.password.length > 0) ? classes.progresBoxWarning : classes.progresBox)}></span><ListItemText primary="Minimum 8 characters length."/></ListItem>
                                                <ListItem><span className={ (this.state.capitalLetterCheck) ? classes.progresBoxSucess  : ((this.state.password.length > 0) ? classes.progresBoxWarning : classes.progresBox)}></span><ListItemText primary="Must have at least one UPPERCASE character."/></ListItem>
                                                <ListItem><span className={ (this.state.numberCheck) ? classes.progresBoxSucess  : ((this.state.password.length > 0) ? classes.progresBoxWarning : classes.progresBox)}></span><ListItemText primary="Must have number."/></ListItem>
                                            </List>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={12} className={classes.customUsernamFild}>
                                            <TextField
                                                //error
                                                variant="outlined"
                                                required
                                                margin="normal"
                                                fullWidth
                                                name="conf_pass"
                                                label="Confirm Password"
                                                type="password"
                                                id="conf_pass"
                                                //helperText="Password did not match"
                                                className={classes.inputCustmStyl}
                                                value={this.state.conf_pass}
                                                helperText={touched.conf_pass ? errors.conf_pass : ""}
                                                type="password"
                                                onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                                                onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                                                error={touched.conf_pass && Boolean(errors.conf_pass)}
                                            //autoComplete="current-password"
                                            />
                                            <i><svg xmlns="http://www.w3.org/2000/svg" width="35" height="33.254" viewBox="0 0 35 33.254"><path d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z" transform="translate(0 0)" fill="#f2f2f2"/></svg></i>
                                        </Grid>
                                        <Grid container className={classes.mT30mB30}>
                                            <Grid container item xs={6}>
                                                <Link
                                                    to="/login"
                                                    onClick={this.toggle}
                                                    className={classes.buttonCustomLogin}
                                                    //fullWidth
                                                    variant="contained"
                                                >
                                                    Back
                                                </Link>
                                            </Grid>
                                            <Grid container item xs={6}>
                                                <Button
                                                    // type="submit"
                                                    //fullWidth
                                                    variant="contained"
                                                    //color="primary"
                                                    className={classes.buttonCustomSign}
                                                    onClick={this.handleContinue}
                                                >
                                                    <span>Continue</span> <svg xmlns="http://www.w3.org/2000/svg" width="14.358" height="15.506" viewBox="0 0 14.358 15.506">
                                                    <g id="right-arrow" transform="translate(0.814 0.814)">
                                                        <path id="Path_389" data-name="Path 389" d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z" transform="translate(-7.592 -0.005)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5"/>
                                                        <path id="Path_390" data-name="Path 390" d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z" transform="translate(-1.312 0)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5"/>
                                                    </g>
                                                    </svg>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container >
                            <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                                <p>Copyright © 2021, Teknobuilt Ltd. | All rights are reserved</p>
                            </Grid>
                        </Grid>
                    </Box>
                </Page>
            </Fragment>
        );
    }
}

const useStyles = theme => ({
    root: {
        "& .MuiPaper-root": {
            borderRadius: "1px",
            backgroundColor: "transparent",
        },
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '100%',
    },
    paperRoot: {
        backgroundColor: 'transparent'
    },
    mainWraper: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    logoSection: {
        margin: theme.spacing(4, 0, 1, 0),
    },
    paper: {
        margin: theme.spacing(1, 2, 6, 2),
        padding: theme.spacing(4, 6),
        maxWidth: '485px',
        width: '100%',
        [theme.breakpoints.down("sm")]: {
            //margin: theme.spacing(2, 2),
            //padding: theme.spacing(3, 2),
            justify: 'flex-start',
            alignItems: 'baseline',
        },
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(4, 0),
            padding: theme.spacing(2, 2),
        },
        boxShadow: '0px 3px 5px -1px rgb(22 56 79 / 20%), 0px 5px 8px 0px rgb(22 56 79 / 14%), 0px 1px 14px 0px rgb(22 56 79 / 12%)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    userLogDetail: {
        margin: theme.spacing(2, 0, 3, 0),
        '& h5': {
            color: '#16384F',
            fontSize: '15px',
            lineHeight: '19px',
            display: 'inline-block',
            padding: '3px 32px',
            borderRadius: '18px',
            border: '1px solid #E3E3E3',
            backgroundColor: '#F2F2F2',
            '& svg': {
                verticalAlign: 'middle',
                marginRight: '8px',
                color: '#054D69',
            },
        },
    },
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    customUsernamFild: {
        position: 'relative',
        "& > i": {
            position: 'absolute',
            left: '0px',
            top: '15px',
            padding: '10px 10px 4px 10px',
            //backgroundColor: '#16384f',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            textAlign: 'center',
            width: '50px',
            height: '55px',
            borderRight: '1px solid #92A6B6',
            '& svg': {
                '& path': {
                    fill: '#92A6B6',
                },
            },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            padding: '0px 8px 0px 52px',
            borderColor: '#92A6B6',
        },
        "& .MuiInputLabel-animated": {
            padding: '0px 0px 0px 52px',
            color: '#05374A',
            fontFamily: 'Montserrat-Medium',
        },
        "& .MuiInputLabel-shrink": {
            padding: '0px 0px 0px 60px',
        },
        "& .MuiInputBase-input": {
            padding: '18.5px 14px 18.5px 65px',
            fontFamily: 'Montserrat-Medium',
        },
        "& > i svg": {
            verticalAlign: 'text-top',
        },
    },
    mT30mB30: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    inputCustmStyl: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: '#054D69',
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#92A6B6',
        },
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
        },
        "& .MuiFormHelperText-root.Mui-error": {
            color: '#F28705',
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: '#f28705',
        },
    },
    passwordPolicyStep: {
        marginTop: '10px',
        '& .MuiListItem-gutters': {
            paddingTop: '0px',
            paddingBottom: '0px',
        },
        '& .MuiListItemText-root': {
            margin: '0px',
        },
        '& > h6': {
            color: '#054D69',
            fontSize: '10px',
            lineHeight: '19px',
            fontFamily: 'Montserrat-Medium',
        },
        '& .MuiTypography-body1': {
            color: '#054D69',
            fontSize: '9px',
            lineHeight: '19px',
            fontFamily: 'Montserrat-Medium',
        },
    },
    progresBox: {
        width: '10px',
        height: '10px',
        backgroundColor: '#cccccc',
        marginRight: '4px',
        backgroundColor: '#EDEDED',
        borderRadius: '2px',
        border: '1px solid #F2F2F2',
    },
    progresBoxSucess: {
        backgroundColor: '#0EAC01',
        border: '1px solid #0EAC01',
        width: '10px',
        height: '10px',
        marginRight: '4px',
        borderRadius: '2px',
    },
    progresBoxWarning: {
        backgroundColor: '#F28705',
        border: '1px solid #F28705',
        width: '10px',
        height: '10px',
        marginRight: '4px',
        borderRadius: '2px',
    },
    buttonCustomLogin: {
        width: '90%',
        color: '#054D69',
        fontSize: '13px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '17px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        marginRight: '10%',
        backgroundColor: '#ffffff',
        textTransform: 'none',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'center',
        border: '1px solid #054D69',
        '&:hover': {
            border: '1px solid #054D69',
            color: '#054D69',
        },
    },
    buttonCustomSign: {
        width: '90%',
        color: '#ffffff',
        fontSize: '13px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '19px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#054D69',
        textTransform: 'none',
        marginLeft: '10%',
        boxShadow: 'none',
        '& > span > span': {
            verticalAlign: 'top',
            paddingRight: '10px',
        },
        '&.MuiButton-contained:hover': {
            boxShadow: 'none',
            backgroundColor: '#f28705',
        },
        '&.MuiButton-contained:focus': {
            outline: 'none',
        },
        '&:hover': {
            backgroundColor: '#054D69 !important',
        },
    },
    footerCopyRight: {
        padding: '5px 15px 5px 15px',
        display: 'block',
        textAlign: 'center',
        '& p': {
            marginBottom: '0px',
            fontSize: '12px',
        },
    },
});



function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(ReCreatePassword)));