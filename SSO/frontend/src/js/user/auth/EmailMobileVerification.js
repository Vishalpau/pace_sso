import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import VerifyOtp from '../auth/VerifyOtp'
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
import PaceLogo from './PaceLogo';
import '../../../../src/App.css';
import OtpInput from 'react-otp-input';


class EmailMobileVerification extends Component {
    constructor(props) {
        super(props);
        this.action = new UserActions(this.props.dispatch);
    }

    state = {
        snackbarOpen: false,
        errors: {},
        touched: {},
        email: this.props.location.metaprops.email,
        otp_email: "",
        otp_mobile: "",
        show_email: false,
        show_mobile: false,
        result:{}
    }

    handleChangeOtpM = (e) => {

        console.log({ event: e })
        this.setState({ otp_mobile: e })
    };


    handleChangeOtpE = (e) => {

        console.log({ event: e })
        this.setState({ otp_email: e })
    };

   
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };

    handleTouch = (e) => {
        let { touched } = this.state
        if (e.target.name && touched[e.target.name] != true) {
            touched[e.target.name] = true;
            this.setState({ touched }, () => console.log({ touched: this.state.touched }))
        }
    }
    
    formValidation = () => {
        const { otp_email, otp_mobile } = this.state
        let isValid = true
        const errors = {};
        if (isNaN(this.state.email)) {

            if(otp_email==""){
                errors.otp_email = "Enter OTP you received to your email"
                isValid=false
            }
            else if(otp_email.match(/[0-9]{6}/)==null){
                errors.otp_email="Please enter valid OTP"
                isValid=false
            }
        }
        else{

            if(otp_mobile==""){
                errors.otp_mobile = "Enter OTP you received to your mobile"
                isValid = false
            }
            else if(otp_mobile.match(/[0-9]{6}/)==null){
                errors.otp_mobile="Please enter valid OTP"
                isValid=false
            }
         }

        this.setState({ errors }, () => console.log({ errors: this.state.errors }));
        return isValid;
    }

    handleClickOTP=()=> {

        console.log({props:this.props})
        console.log({show_email:this.state.show_email})
        this.setState({errors:{}})
        if(isNaN(this.state.email)){
            this.setState({otp_email:''})
            this.setState({show_email:true},()=>console.log(this.state.show_email))
        }
        else{
            this.setState({otp_mobile:''})
            this.setState({show_email:false},()=>console.log(this.state.show_email))
        }

        var receiver = ''
        receiver = isNaN(this.state.email) ? 'email' : 'mobile'

        if (receiver=='email'){
            var data= { 'email': this.state.email, 'receiver': receiver }
        }
        else{
            var data= { 'mobile': this.state.email, 'receiver': receiver }

        }
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/send-otp/',
            method: 'PATCH',
            data:data
        }).then((res) => {
            if (receiver == 'email') {
                // this.action.openSnackbar('OTP has been sent on email address provided:' + res.data.data.results.OTP_email)
                this.action.openSnackbar('OTP has been sent on email address provided')
            }
            else if (receiver == 'mobile') {
                // this.action.openSnackbar('OTP has been sent on mobile no provided:' + res.data.data.results.OTP_mobile)
                this.action.openSnackbar('OTP has been sent on mobile number provided')
            }
            else {
                this.action.openSnackbar('OTP has been sent succesfully' + res.data.data.results.authOTP)
            }
        }).catch((err) => {
            // alert('error');
            this.setState({ loading: false })
            if (err.response && err.response.status == 400) {
                var errorKeys = _.keys(err.response.data.errors)
                console.log(errorKeys)
                errorKeys.forEach(element => {
                    var message = element + ': ' + err.response.data.errors[element][0]
                    // display the message in the material snacker
                });
            }
        })

    }

    componentDidMount=()=>{

        this.handleClickOTP()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.formValidation();
        if (isValid) {
        const form_data = new FormData();
        if (this.state.show_email) {
            form_data.append('email', this.state.email);
            form_data.append('OTP_email', this.state.otp_email);
        }
        else {
            form_data.append('mobile', this.state.email);
            form_data.append('OTP_mobile', this.state.otp_mobile);
        }
        form_data.append('verification_only', true)
        const url = process.env.API_URL + process.env.API_VERSION + '/user/verifyotp/';
        axios.put(url, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log({result:res})
                this.props.history.push('/login')
                this.action.openSnackbar(res.data.data.results.message)
            })
            .catch((err) => {
                console.log({ error: err })
                this.setState({ loading: false })
                if (err.response && err.response.data.status_code == 400) {
                    console.log(err.response.data.error)
                    this.action.openSnackbar(err.response.data.error, true)
                    this.action.showSnackbar
                }
            })
        }
       
    };


    render() {
        // const { classes } = this.props
        const {
            classes,
            handleSubmit,
        } = this.props;

        const { touched, errors,email } = this.state
        return (
            <Fragment>
                <Page className={classes.root} title="EmailMobileVerification">
                    <Box className={classes.customcontentbox}
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="center"
                    >
                        <Grid container component="main" className={classes.root} >
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
                                <Grid container item xs={12} sm={8} md={4} component={Paper} className={classes.paper} elevation={5}>
                                    <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid>
                                    <Grid item xs={12} sm={12} md={12} align="center">
                                        <Typography component="h1" variant="h5" className={classes.logTitle} >
                                            Verification
                                        </Typography>
                                    </Grid>

                                    <form className={classes.form} autoComplete="off" noValidate onSubmit={this.handleSubmit}>
                                        <Grid item xs={12} sm={12} md={12} align="center">
                                            <Typography component="h5" variant="h5" className={classes.verificationDetail}>
                                                Enter the 6-digit verification code received your email address {String(this.state.email).substring(0, 2)}******{String(this.state.email).slice(-4)}
                                            </Typography>
                                        </Grid>

                                        <Grid container >
                                            <Grid container item xs={12} sm={12}>
                                                <div hidden={this.state.show_email ? 1 : 0}>
                                                    <Grid item xs={12} className={classes.otpFieldLabel}>
                                                        <Typography component="body1" variant="body1" >
                                                            Mobile verification code
                                                    </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} className={classes.otpFieldstyle} >
                                                        <TextField
                                                            //hidden={this.state.otpField}
                                                            variant="outlined"
                                                            required
                                                            //fullWidth
                                                            name="otp_mobile"
                                                            //label="Enter OTP"
                                                            type="otp"
                                                            id="otp_mobile"
                                                            //fullWidth
                                                            type="hidden"
                                                            className={classes.inputCustmStyl}
                                                            InputLabelProps={{ shrink: true }}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <OtpInput
                                                                        //style={{ padding: "10px" }}
                                                                        className={classes.otpFieldstyle}
                                                                        value={this.state.otp_mobile}
                                                                        onChange={(e) => { this.handleChangeOtpM(e) }}
                                                                        onBlur={(e) => { this.handleTouch(e)}}
                                                                        numInputs={6}
                                                                        otpType="number"
                                                                        disabled={false}
                                                                        name="otp_mobile"
                                                                    //className={classes.inputCustmStyl}
                                                                    //inputStyle={{
                                                                    //   'padding': '8px'
                                                                    //}}
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                    {touched.otp || Boolean(errors.otp_mobile) ? <span style={{ color: "red", fontSize: '12px' }}>{errors.otp_mobile}</span> : ""}
                                                    <Grid item xs={12} sm={12} align="right">
                                                        <Link onClick={this.handleClickOTP} className={classes.forgotLinkSty}>
                                                            Resend OTP
                                                    </Link>
                                                    </Grid>
                                                </div>
                                                <div hidden={this.state.show_email ? 0 : 1}>
                                                    <Grid item xs={12} className={classes.otpFieldLabel}>
                                                        <Typography component="body1" variant="body1" >
                                                            Email verification code
                                                    </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} className={classes.otpFieldstyle} >
                                                        <TextField
                                                            //hidden={this.state.otpField}
                                                            variant="outlined"
                                                            required
                                                            //fullWidth
                                                            name="otp_email"
                                                            //label="Enter OTP"
                                                            type="otp"
                                                            id="otp_email"
                                                            //fullWidth
                                                            type="hidden"
                                                            className={classes.inputCustmStyl}
                                                            InputLabelProps={{ shrink: true }}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <OtpInput
                                                                        //style={{ padding: "10px" }}
                                                                        className={classes.otpFieldstyle}
                                                                        value={this.state.otp_email}
                                                                        onChange={(e) => { this.handleChangeOtpE(e);this.formValidation() }}
                                                                        onBlur={(e) => { this.handleTouch(e);this.formValidation() }}
                                                                        numInputs={6}
                                                                        otpType="number"
                                                                        disabled={false}
                                                                        name="otp_email"
                                                                    //className={classes.inputCustmStyl}
                                                                    //inputStyle={{
                                                                    //   'padding': '8px'
                                                                    //}}
                                                                    />
                                                                ),
                                                            }}
                                                        />
                                                    </Grid>
                                                    {touched.otp || Boolean(errors.otp_email) ? <span style={{ color: "red", fontSize: '12px' }}>{errors.otp_email}</span> : ""}
                                                    <Grid item xs={12} sm={12} align="right">
                                                        <Link onClick={this.handleClickOTP} className={classes.forgotLinkSty}>
                                                            Resend OTP
                                                    </Link>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <Grid container className={classes.mT30}>
                                            <Grid container item xs={6}>
                                                <Link
                                                    to ='/login'
                                                    //hidden={this.state.otpField}
                                                    variant="contained"
                                                    color="default"
                                                    className={classes.buttonCustomotpBack}
                                                //startIcon={<LockIcon />}
                                                //onClick={this.handleBack}
                                                
                                                >
                                                    
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.358" height="15.496" viewBox="0 0 14.358 15.496"><g transform="translate(0.814 0.803)"><path d="M20.018,13.948a.3.3,0,0,0,.215-.518L13.779,6.977,20.233.523A.3.3,0,0,0,19.8.095L13.136,6.763a.3.3,0,0,0,0,.429L19.8,13.859A.3.3,0,0,0,20.018,13.948Z" transform="translate(-13.048 -0.005)" fill="#054d69" stroke="#054d69" stroke-width="1.5" /><path d="M8.283,13.943a.3.3,0,0,0,.215-.518L2.044,6.971,8.5.518A.3.3,0,0,0,8.068.089L1.4,6.757a.3.3,0,0,0,0,.429l6.668,6.668A.3.3,0,0,0,8.283,13.943Z" transform="translate(4.143 0)" fill="#054d69" stroke="#054d69" stroke-width="1.5" /></g></svg>
                                                    <span>Back</span>
                                                </Link>
                                            </Grid>
                                            
                                            <Grid container item xs={6} >
                                                <Button
                                                    variant="contained"
                                                    //color="default"
                                                    className={classes.buttonCustom}
                                                    onClick={this.handleSubmit}
                                                    type="submit"
                                                //startIcon={<LockIcon />}
                                                >
                                                    <span>Verify</span> <svg xmlns="http://www.w3.org/2000/svg" width="14.358" height="15.506" viewBox="0 0 14.358 15.506">
                                                        <g id="right-arrow" transform="translate(0.814 0.814)">
                                                            <path id="Path_389" data-name="Path 389" d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z" transform="translate(-7.592 -0.005)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5" />
                                                            <path id="Path_390" data-name="Path 390" d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z" transform="translate(-1.312 0)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5" />
                                                        </g>
                                                    </svg>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Grid>
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
    paper: {
        margin: theme.spacing(6, 2),
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
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    verificationDetail: {
        fontSize: '12px',
        color: '#05374A',
        fontFamily: 'Montserrat-Medium',
        textAlign: 'left',
        marginTop: '12px',
        marginBottom: '8px',
    },
    otpFieldLabel: {
        padding: '0px',
        marginTop: '15px',
        '& .MuiTypography-body1': {
            lineHeight: '18px',
            fontSize: '14px',
            fontFamily: 'Montserrat-Medium',
            color: '#05374A',
        },
    },
    otpFieldstyle: {
        "& input": {
            width: '2em !important',
            margin: theme.spacing(0.5, 1),
            height: '2rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #F28705',
        },
        "& .MuiOutlinedInput-root": {
            paddingRight: '0px',
        },
        "& .MuiOutlinedInput-root div": {
            margin: '0px auto',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
        },
        "& .MuiFormLabel-root": {
            color: '#F28705',
        },
        padding: '0px 0px',
        border: 'none',
        borderRadius: '4px',
    },
    otpFieldstyle: {
        padding: '0px 0px',
        border: 'none',
        borderRadius: '4px',
        "& input": {
            width: '35px !important',
            height: '36px',
            fontSize: '1rem',
            borderRadius: '0px',
            border: '1px solid #92A6B6',
            outline: 'none',
            fontFamily: 'Montserrat-Medium',
            color: '#05374A',
        },
        "& .MuiOutlinedInput-root > div > div": {
            margin: '0px auto',
            margin: '5px 34px 5px 0px',
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: '12px !important',
        },
        '& .MuiOutlinedInput-root > div > div:nth-child(1)': {
            marginLeft: '0px !important',
        },
        '& .MuiOutlinedInput-root > div > div:nth-child(6)': {
            marginRight: '0px !important',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
            border: 'none',
            padding: '0px !important',
        },
        "& .MuiFormLabel-root": {
            color: '#F28705',
        },
        '& .MuiTypography-root': {
            color: '#05374A',
            fontSize: '12px',
            lineHeight: '20px',
        },
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
        "& .MuiOutlinedInput-adornedEnd": {
            paddingRight: '0px',
        },
    },
    forgotLinkSty: {
        color: '#05374A',
        fontSize: '14px',
        fontFamily: 'Montserrat-SemiBold',
    },
    mT30: {
        marginTop: '30px',
    },
    buttonCustomotpBack: {
        color: '#054D69',
        position: 'relative',
        width: '90%',
        fontSize: '16px',
        lineHeight: '15px',
        marginRight: '10%',
        marginBottom: '30px',
        paddingTop: '15px',
        borderRadius: '0px',
        paddingBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #92A6B6',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        textAlign: 'center',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#ffffff',
        },
        '&:focus': {
            outline: 'none',
        },
        '& span': {
            verticalAlign: 'top',
            paddingLeft: '10px',
        },
    },
    buttonCustom: {
        position: 'relative',
        width: '100%',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '19px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#054D69',
        border: '1px solid #054D69',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        marginBottom: '30px',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#054D69',
        },
        '&:focus': {
            outline: 'none',
        },
        '& span > span': {
            paddingRight: '10px',
        },
    },




});



function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(EmailMobileVerification)));