import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserActions } from '../UserActions';
import { SnackbarActions } from '../../reducers/SnackbarActions';
import queryString from 'query-string';
import Page from '../../../../src/components/Page';
import { Box, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
// import GradientBG from './img/GradientBG.png';
// import google from './img/google.svg';
// import IconSimpleFacebook from './img/IconSimpleFacebook.svg';
// import linkedin from './img/linkedin.svg';
//import LogoImage from '../../../../public/LoginImg/logo.png';
//import LockIcon from '@material-ui/icons/Lock';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import OtpInput from 'react-otp-input';
import SuccessSnackbar from '../../../components/successSnackbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PaceLogo from './PaceLogo';
import SocialAccount from './SocialAccount';
import '../../../../src/App.css';
import { Fragment } from 'react';
import loginBBg from '../../../../../static/public/images/LoginImg/logbeforebg.png';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'password',
            loading: false,
            passwordField: false,
            otp: '',
            otpField: true,
            open: false,
        };

        this.action = new UserActions(this.props.dispatch);
    }



    handleChangeOtp = otp => this.setState({ otp });

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    handleClickOTP = () => {
        this.setState({ passwordField: !this.state.passwordField})
        // if (this.state.otpField)
        this.setState({ otpField: !this.state.otpField })
    }
    handleClick = () => {
        this.setState({ otpField: true })
        this.setState({ passwordField: !this.state.passwordField })

        const input = new FormData()
        if (isNaN(this.state.email)) {
            input.append('email', this.state.email)
        }
        else {
            input.append('mobile', this.state.email)
        }

        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/send-otp/',
            method: 'PATCH',
            data: input,
        }).then((res) => {
            this.action.openSnackbar('OTP has been sent on Email address provided')
            this.action.showSnackbar
        }).catch((err) => {
            //alert('error');
            this.setState({ loading: false })
            if (err.response && err.response.status == 400) {
                this.action.openSnackbar('Error: Records not Found',true)
                this.action.showSnackbar
                return;
                var errorKeys = _.keys(err.response.data.errors)
                console.log(errorKeys)
                errorKeys.forEach(element => {
                    var message = element + ': ' + err.response.data.errors[element][0]
                    // display the message in the material snacker
                });
            }
        })
        // }

    }
    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    componentDidMount() {
        const values = queryString.parse(this.props.route.location.search)
        console.log({ values: values })
        console.log({ props: this.props.route.location.search })
        const code = values.code;
        const next = values.next
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/',
            method: 'GET',
            params: {
                client_id: values.client_id,
                response_type: "code",
                redirect_uri: "http://localhost:8081/login/",
                code_challenge: "WZRHGrsBESr8wYFZ9sx0tPURuZgG2lmzyvWpwXPKz8U",
                code_challenge_method: "Plain",
            },
        }).then((res) => {
            console.log({ success: res.data })
            // return
        }).catch((err) => {
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
        // }

        if (code) {
            // alert('code')
            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/auth/token/',
                method: 'POST',
                data: {
                    client_id: process.env.client_id_server,
                    client_secret: process.env.client_secret_server,
                    grant_type: "authorization_code",
                    code: code
                },
            }).then((res) => {
                const token = res.data.access_token
                var fullToken = 'Bearer ' + token
                axios.defaults.headers.common['Authorization'] = fullToken;
                this.action.login(res.data)
            }).catch((err) => {
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
    }


    loginUserUpdated = () => {
        const values = queryString.parse(this.props.route.location.search)
        console.log({ props: this.props.route.location.search })
        const code = values.code;

        if (code) {
            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/auth/token/',
                method: 'POST',
                data: {
                    client_id: values.client_id,
                    client_secret: values.client_secret,
                    grant_type: "authorization_code",
                    code: code
                },
            }).then((res) => {

                const token = res.data.access_token
                var fullToken = 'Bearer ' + token
                axios.defaults.headers.common['Authorization'] = fullToken;

                this.action.login(res.data)
                this.action.openSnackbar("Welcome! Login successful")
            }).catch((err) => {
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
        else {

            if (!this.state.passwordField) {

                axios({
                    url: process.env.API_URL + process.env.API_VERSION + '/user/auth/token/',
                    method: 'POST',
                    data: {
                        username: this.state.email,
                        password: this.state.password,
                        client_id: process.env.client_id_client,
                        client_secret: process.env.client_secret_client,
                        grant_type: "password",
                    },
                }).then((res) => {

                    if (values.next) {
                        const token = res.data.access_token
                        var fullToken = 'Bearer ' + token
                        axios.defaults.headers.common['Authorization'] = fullToken;

                        window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=' + process.env.client_id_server + '&response_type=code';
                        this.action.login(res.data)
                    }
                    else {
                        this.action.openSnackbar("Welcome! Login successful")
                        const token = res.data.access_token
                        var fullToken = 'Bearer ' + token
                        axios.defaults.headers.common['Authorization'] = fullToken;
                        this.action.login(res.data)
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

            if (!this.state.otpField) {
                axios({
                    url: process.env.API_URL + process.env.API_VERSION + '/user/login/',
                    method: 'POST',
                    data: {
                        username: this.state.email,
                        authOTP: this.state.otp
                    },
                }).then((res) => {
                    this.action.openSnackbar("Welcome! Login successful")
                    const token = res.data.data.results.access_token
                    var fullToken = 'Bearer ' + token
                    axios.defaults.headers.common['Authorization'] = fullToken;
                    this.action.login(res.data.data.results)
                }).catch((err) => {
                    // alert('error');
                    this.setState({ loading: false })
                    if (err.response && err.response.status == 400) {
                        var errorKeys = _.keys(err.response.data.errors)

                        errorKeys.forEach(element => {
                            var message = element + ': ' + err.response.data.errors[element][0]
                            // display the message in the material snacker
                        });
                    }
                })
            }
        }

        this.setState({ loading: true })


    }




    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Grid container className={classes.logoSection} >
                    <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid>
                </Grid>
                <Page className={classes.root} title="Login">
                    <Box className={classes.customcontentbox}
                        display="flex"
                        flexDirection="column"
                        height="100%"
                        justifyContent="center"
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
                                <Grid container item xs={12} sm={8} md={4} component={Paper} className={classes.paper} elevation={5}>

                                    {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}

                                    <Grid item xs={12} sm={12} md={12} align="center">
                                        <Typography component="h1" variant="h5" className={classes.logTitle} >
                                            Sign in
                                        </Typography>
                                    </Grid>

                                    <form className={classes.form} autoComplete="off" noValidate>
                                        <Grid item xs={12} sm={12} md={12} align="center" className={classes.userLogDetail}>
                                            <Typography component="h5" variant="h5">
                                                <AccountCircleIcon /> example@gmail.com
                                            </Typography>
                                        </Grid>
                                        <Grid container >
                                            <Grid item xs={12} sm={12} className={classes.customPasswordFild} hidden={this.state.passwordField}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="Enter your password"
                                                    type="password"
                                                    id="password"
                                                    className={classes.inputCustmStyl}
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                />
                                                <i><svg xmlns="http://www.w3.org/2000/svg" width="26.773" height="31.89" viewBox="0 0 26.773 31.89">
                                                        <path id="padlock" d="M29.052,11.959H27.936V7.972c0-4.4-4-7.972-8.924-7.972s-8.924,3.576-8.924,7.972v3.986H8.972a3.187,3.187,0,0,0-3.347,2.99V28.9a3.187,3.187,0,0,0,3.347,2.99h20.08A3.187,3.187,0,0,0,32.4,28.9V14.948A3.187,3.187,0,0,0,29.052,11.959ZM13.062,7.972c0-2.931,2.668-5.315,5.95-5.315s5.95,2.384,5.95,5.315v3.986h-11.9ZM20.5,22.219v3.027a1.5,1.5,0,0,1-2.975,0V22.219a2.615,2.615,0,0,1-1.487-2.288,2.832,2.832,0,0,1,2.975-2.658,2.832,2.832,0,0,1,2.975,2.658A2.615,2.615,0,0,1,20.5,22.219Z" transform="translate(-5.625)" fill="#f2f2f2"/>
                                                    </svg>
                                                </i>
                                                <Link to="/recoveryPassword" onClick={this.toggle} className={classes.forgotLinkSty}>Forgot password?</Link>
                                            </Grid>
                                            <Grid container item xs={12} sm={12} hidden={this.state.otpField}>
                                                <Grid item xs={12} className={classes.otpFieldstyle}>
                                                    <Typography component="body1" variant="body1">
                                                        Enter the 6-digit OTP sent to your 96***** **75 / ex*****.com mobile number and email i’d.
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} className={classes.otpFieldstyle}>
                                                    <TextField
                                                        hidden={this.state.otpField}
                                                        variant="outlined"
                                                        required
                                                        //fullWidth
                                                        name="otp"
                                                        //label="Enter OTP"
                                                        type="otp"
                                                        id="otp"
                                                        //fullWidth
                                                        type="hidden"
                                                        className={classes.inputCustmStyl}
                                                        InputLabelProps={{ shrink: true }}

                                                        InputProps={{
                                                            endAdornment: (
                                                                <OtpInput
                                                                    //style={{ padding: "10px" }}
                                                                    className={classes.otpFieldstyle}
                                                                    value={this.state.otp}
                                                                    onChange={this.handleChangeOtp}
                                                                    numInputs={6}
                                                                    otpType="number"
                                                                    disabled={false}
                                                                //className={classes.inputCustmStyl}
                                                                //inputStyle={{
                                                                //   'padding': '8px'
                                                                //}}
                                                                />
                                                            ),
                                                        }}
                                                    />

                                                </Grid>
                                                <Grid item xs={12} sm={12} align="right">
                                                    <Link onClick={this.handleClickOTP} className={classes.forgotLinkSty}>
                                                        Resend OTP
                                                    </Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container className={classes.mT30}>
                                            <Grid container item xs={6}>
                                                <Button
                                                    hidden={this.state.passwordField}
                                                    variant="contained"
                                                    color="default"
                                                    className={classes.buttonCustomotp}
                                                    //startIcon={<LockIcon />}
                                                    onClick={this.handleClickOTP}
                                                >
                                                    Login with OTP
                                                </Button>
                                                <Button
                                                    hidden={this.state.otpField}
                                                    variant="contained"
                                                    color="default"
                                                    className={classes.buttonCustomotpBack}
                                                    //startIcon={<LockIcon />}
                                                    onClick={this.handleClickOTP}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14.358" height="15.496" viewBox="0 0 14.358 15.496"><g transform="translate(0.814 0.803)"><path d="M20.018,13.948a.3.3,0,0,0,.215-.518L13.779,6.977,20.233.523A.3.3,0,0,0,19.8.095L13.136,6.763a.3.3,0,0,0,0,.429L19.8,13.859A.3.3,0,0,0,20.018,13.948Z" transform="translate(-13.048 -0.005)" fill="#054d69" stroke="#054d69" stroke-width="1.5"/><path d="M8.283,13.943a.3.3,0,0,0,.215-.518L2.044,6.971,8.5.518A.3.3,0,0,0,8.068.089L1.4,6.757a.3.3,0,0,0,0,.429l6.668,6.668A.3.3,0,0,0,8.283,13.943Z" transform="translate(4.143 0)" fill="#054d69" stroke="#054d69" stroke-width="1.5"/></g></svg>
                                                    <span>Back</span>
                                                </Button>
                                            </Grid>
                                            <Grid container item xs={6} >
                                                <Button
                                                    variant="contained"
                                                    //color="default"
                                                    className={classes.buttonCustom}
                                                    //startIcon={<LockIcon />}
                                                >
                                                    Login
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
        padding: theme.spacing(4, 6, 12, 4),
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
    submitBtn: {
        margin: theme.spacing(3, 0, 1, 0),
        backgroundColor: '#054D69',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        paddingTop: '15px',
        paddingBottom: '15px',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#054D69',
        }
    },
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    logoBoxStyle: {
        backgroundColor: '#16384F',
        height: 115,
        width: 115,
        borderRadius: 100,
        marginBottom: 35,
        position: 'relative',
    },
    buttonCustom: {
        width: '95%',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '19px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#054D69',
        marginLeft: '10%',
        border: '1px solid #054D69',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        '&:hover':{
            boxShadow: 'none',
            backgroundColor: '#054D69',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    buttonCustomotp: {
        color: '#054D69',
        width: '90%',
        fontSize: '13px',
        lineHeight: '15px',
        marginRight: '10%',
        paddingTop: '15px',
        borderRadius: '0px',
        paddingBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #92A6B6',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        '&:hover':{
            boxShadow: 'none',
            backgroundColor: '#ffffff',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    buttonCustomotpBack: {
        color: '#054D69',
        width: '90%',
        fontSize: '13px',
        lineHeight: '15px',
        marginRight: '10%',
        paddingTop: '15px',
        borderRadius: '0px',
        paddingBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #92A6B6',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        '&:hover':{
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
    mT30: {
        marginTop: '30px',
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
            padding: '18.5px 14px 18.5px 100px',
            fontFamily: 'Montserrat-Medium',
        },
    },
    customPasswordFild: {
        position: 'relative',
        "& > i": {
            position: 'absolute',
            left: '0px',
            top: '15px',
            padding: '10px 10px 3px 10px',
            //backgroundColor: '#16384f',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            fontSize: '27px',
            color: '#ffffff',
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
            padding: '18.5px 14px 18.5px 60px',
            fontFamily: 'Montserrat-Medium',
        },
    },
    cuntryCodePhone: {
        left: '58px',
        paddingRight: '5px',
        borderRight: '1px solid #c2c2c2',
        top: '30px',
        position: 'absolute',
    },
    forgotLinkSty: {
        color: '#05374A',
        fontSize: '14px',
        fontFamily: 'Montserrat-SemiBold',
    },
    hidDestopView: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    hidMobileView: {
        display: 'block',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
    otpFieldstyle: {
        padding: '8px 0px',
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
            margin: '5px 18px',
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
    userLogDetail: {
        margin: theme.spacing(3, 0, 2, 0),
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Login));
