import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserActions } from '../UserActions';
import queryString from 'query-string'
import Page from '../../../../src/components/Page';
import { Box, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import GradientBG from './img/GradientBG.png';
import google from './img/google.svg';
import IconSimpleFacebook from './img/IconSimpleFacebook.svg';
import linkedin from './img/linkedin.svg';
import LogoImage from '../../../../public/LoginImg/logo.png';
import OtpInput from 'react-otp-input';
//import './../../app.css';
import { withFormik, Formik } from "formik";
import * as Yup from 'yup';


class InputRecoveryPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'password',
            loading: false,
            passwordField: true,
            otpi: '',
            sendOTPView: false,
            initials: {
                "authOTP": "",
                "password": ""
            },
            initialEmail: {
                email: ""
            },
            inputData: {},
            email_or_mobile: 'email',
            username: "",
        };

        this.action = new UserActions(this.props.dispatch);
    }

    handleChangeOtpm = otpi => this.setState({ otpi });
    // switchView = () => {
    //     this.setState({ sendOTPView: !this.state.sendOTPView })
    // }

    sendOtpValidationSchema = Yup.object().shape({
        email: Yup.string().required("Please specify the email"),

    })

    validationSchema = Yup.object().shape({
        // authOTP: Yup.string().required("Please enter the otp you received on mobile number"),
        password: Yup.string().required("Please enter the password"),

        conf_pass: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password and Confirm password field does not match"
            )
        }),
    })


    render() {
        const { classes } = this.props
        return (
            <Page className={classes.root} title="Login">
                <Box className={classes.customcontentbox}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                >

                    <Grid container component="main" className={classes.root}>
                        <Grid item xs={12} sm={4} md={6} className={classes.hidDestopView}>
                            <Grid item
                                //xs={{span: 12, order: 1}}
                                //display={{ xs: 'none', sm: 'block' }}
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-end"
                            >
                                <div className={classes.leftPaper} elevation={0}>
                                    <Typography variant="h1" className={classes.welcomTitleS} align="right" gutterBottom >
                                        Create Account.
                                    </Typography>
                                    <Typography variant="body1" className={classes.welcomSubTitle} align="right" >
                                        lorem ipsum is simply dummy text of the printing and typesetting industry.
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            md={6}
                            component={Paper}
                            elevation={0}
                        >

                            {/* send otp */}

                            <div className={classes.paper} elevation={0} hidden={this.state.sendOTPView}>
                                <div className={classes.logoBoxStyle}>
                                    <img className={classes.logoImg} src={LogoImage} title="Sign in" alt="Sign in" />
                                </div>
                                <Typography component="h1" variant="h5" className={classes.logTitle} >
                                    Signin
                                </Typography>

                                <Grid item xs className={classes.mTB30}>
                                    <Typography component="h5" variant="h5" className={classes.signupLabel} align="center" >
                                        Enter your registered mobile number or email I'd to get a password recovery OTP
                                    </Typography>
                                </Grid>
                                <Formik
                                    initialValues={this.state.initialEmail}
                                    validationSchema={this.sendOtpValidationSchema}
                                    enableReinitialize
                                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                                        const input = new FormData()

                                        // this.setState({ 'email': values.email })
                                        if (isNaN(this.state.email)) {

                                            input.append('email', values.email)
                                            this.setState({ email_or_mobile: 'email' })
                                        }
                                        else {

                                            this.setState({ email_or_mobile: 'mobile' })
                                            input.append('mobile', values.email)
                                        }
                                        this.setState({ username: values.email })
                                        // alert(this.state.username);
                                        axios({
                                            url: process.env.API_URL + process.env.API_VERSION + '/user/send-otp/',
                                            method: 'PATCH',
                                            data: input,
                                        }).then((res) => {
                                            alert('OTP has been sent on mobile no provided:' + res.data.data.results.authOTP);
                                            this.setState({ sendOTPView: true })


                                        }).catch((err) => {
                                            console.log(err)
                                            const errData = err.response.data.errors

                                            console.log(err)
                                            var tifOptions = Object.keys(errData).map(function (key) {
                                                console.log(key)
                                                return setFieldError(`${key}`, `${errData[key][0]}`)
                                            });
                                        })


                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting
                                    }) => (<form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            //required
                                            fullWidth
                                            id="email"
                                            label="Email Or Mobile Number"
                                            name="email"
                                            //autoComplete="email"
                                            //autoFocus
                                            className={classes.inputCustmStyl}
                                            value={values.email}
                                            helperText={touched.email ? errors.email : ""}
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && Boolean(errors.email)}
                                        />

                                        <Grid item xs>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                //color="primary"
                                                className={classes.submitBtn}
                                            >
                                                SUBMIT
                                        </Button>
                                        </Grid>
                                        <Grid
                                            direction="column"
                                            justify="center"
                                            container
                                        >
                                            <Typography component="h5" variant="h5" className={classes.signinLabel} align="center" >
                                                More ways to Signin
                                      </Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-end"
                                        >
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={linkedin} title="Linkedin Account" alt="Linkedin Account" /></button>
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={google} title="Google Account" alt="Google Account" /></button>
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={IconSimpleFacebook} title="Facebook Account" alt="Facebook Account" /></button>

                                        </Grid>
                                    </form>
                                        )}
                                </Formik>
                            </div>

                            {/* send otp */}


                            <div className={classes.paper} elevation={0} hidden={!this.state.sendOTPView}>
                                <div className={classes.logoBoxStyle}>
                                    <img className={classes.logoImg} src={LogoImage} title="Sign in" alt="Sign in" />
                                </div>
                                <Typography component="h1" variant="h5" className={classes.logTitle} >
                                    Signin
                                </Typography>

                                <Grid item xs className={classes.mTB30}>
                                    <Typography component="h5" variant="h5" className={classes.signupLabel} align="center" >
                                        Enter the OTP has been sent to your registered email I'd or mobile number.
                                    </Typography>
                                </Grid>
                                <Formik
                                    initialValues={this.state.initials}
                                    validationSchema={this.validationSchema}
                                    enableReinitialize
                                    onSubmit={(values, { setSubmitting, setFieldError }) => {
                                        console.log(this.state.username)
                                        const data = new FormData()
                                        data.append('authOTP', this.state.otpi)
                                        data.append('password', values.password)
                                        data.append(this.state.email_or_mobile, this.state.username)
                                        console.log({ updatedData: data })
                                        alert("validating otp");
                                        axios({
                                            url: process.env.API_URL + process.env.API_VERSION + '/user/resetpass/',
                                            method: 'PATCH',
                                            data: data
                                        }).then((res) => {
                                            alert('OTP has been sent on mobile no provided:' + res.data.data.results.authOTP);
                                            this.setState({ sendOTPView: true })
                                            this.props.route.history.push("/login")
                                            // const token = res.data.access_token
                                            // var fullToken = 'Bearer ' + token
                                            // axios.defaults.headers.common['Authorization'] = fullToken;
                                            // this.action.login(res.data)
                                        }).catch((err) => {
                                            alert('error');
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


                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting
                                    }) => (<form className={classes.form} autoComplete="off" noValidate onSubmit={handleSubmit}>
                                        <Grid container item xs={12} sm={12} className={classes.mT30}>
                                            <Grid item xs={12} className={classes.otpFieldstyle}>
                                                <TextField
                                                    hidden={this.state.otpField}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="authOTP"
                                                    label="Enter OTP"
                                                    type="otp"
                                                    id="authOTP"
                                                    fullWidth
                                                    type="hidden"
                                                    className={classes.inputCustmStyl}
                                                    InputLabelProps={{ shrink: true }}

                                                    InputProps={{
                                                        endAdornment: (

                                                            <OtpInput
                                                                //className={classes.otpFieldstyle}
                                                                value={this.state.otpi}
                                                                onChange={this.handleChangeOtpm}
                                                                numInputs={6}
                                                                otpType="number"
                                                                disabled={false}
                                                                //separator={<span>-</span>}
                                                                className={classes.otpFieldstyle}
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={6} sm={6}>
                                                <Link align="left" href="/" className={classes.forgotLinkSty}>
                                                    Resend OTP
                                            </Link>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2} className={classes.mTB30}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="password"
                                                    label="New Password"
                                                    type="password"
                                                    id="password"
                                                    className={classes.inputCustmStyl}
                                                    value={values.password}
                                                    helperText={touched.password ? errors.password : ""}
                                                    type="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.password && Boolean(errors.password)}

                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    //error
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="conf_pass"
                                                    label="Confirm Password"
                                                    type="password"
                                                    id="conf_pass"
                                                    //helperText="Password did not match"
                                                    className={classes.inputCustmStyl}
                                                    value={values.conf_pass}
                                                    helperText={touched.conf_pass ? errors.conf_pass : ""}
                                                    type="passwod"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.conf_pass && Boolean(errors.conf_pass)}
                                                //autoComplete="current-password"
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid item xs>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                //color="primary"
                                                className={classes.submitBtn}
                                            >
                                                SUBMIT
                                        </Button>
                                        </Grid>
                                        <Grid
                                            direction="column"
                                            justify="center"
                                            container
                                        >
                                            <Typography component="h5" variant="h5" className={classes.signinLabel} align="center" >
                                                More ways to Signin
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-end"
                                        >
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={linkedin} title="Linkedin Account" alt="Linkedin Account" /></button>
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={google} title="Google Account" alt="Google Account" /></button>
                                            <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={IconSimpleFacebook} title="Facebook Account" alt="Facebook Account" /></button>

                                        </Grid>
                                    </form>
                                        )}
                                </Formik>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} md={6} className={classes.hidMobileView}>
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-end"
                            >
                                <div className={classes.leftPaper} elevation={0}>
                                    <Typography variant="h1" className={classes.welcomTitleS} align="right" gutterBottom >
                                        Create Account.
                                    </Typography>
                                    <Typography variant="body1" className={classes.welcomSubTitle} align="right" >
                                        lorem ipsum is simply dummy text of the printing and typesetting industry.
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Page >
        );
    }
}

const useStyles = theme => ({
    root: {
        "& .MuiPaper-root": {
            borderRadius: "100px",
            backgroundColor: "transparent",
        },
        //height: '100vh',
        backgroundImage: `url(${GradientBG})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '100%',
    },
    paperRoot: {
        backgroundColor: 'transparent'
    },
    /*image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },*/
    paper: {
        margin: theme.spacing(8, 16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "transparent",
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(2, 2),
            justify: 'flex-start',
            alignItems: 'baseline',
        },
    },
    leftPaper: {
        //margin: theme.spacing(8, 3, 10, 40),
        //padding: theme.spacing(0, 0, 14, 40),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(0, 5, 14, 25),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    welcomSubTitle: {
        margin: theme.spacing(0, 0, 0, 20),
        color: '#F2F2F2',
        lineHeight: '26px',
        fontSize: '20px',
        fontFamily: 'Montserrat-Medium',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '18px',
            fontSize: '12px',
        },
    },
    /*avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },*/
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submitBtn: {
        margin: theme.spacing(1, 0, 2),
        backgroundColor: '#F28705',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        paddingTop: '15px',
        paddingBottom: '15px',
        color: '#ffffff',
    },
    logTitle: {
        fontSize: 45,
        fontFamily: 'Montserrat-Bold',
        marginBottom: '15px',
    },
    logoBoxStyle: {
        backgroundColor: '#16384F',
        height: 115,
        width: 115,
        borderRadius: 100,
        marginBottom: 35,
        position: 'relative',
    },
    logoImg: {
        maxWidth: '100%',
        top: 45,
        display: 'block',
        position: 'absolute',
    },
    welcomTitleS: {
        fontSize: '80px',
        lineHeight: '80px',
        color: '#F2F2F2',
        fontFamily: 'Montserrat-SemiBold',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '42px',
            fontSize: '42px',
            marginLeft: '55px',
        },
    },
    signupLabel: {
        color: '#16384F',
        fontSize: '20px',
        fontFamily: 'Montserrat-Regular',
        lineHeight: '35px',
        [theme.breakpoints.down("sm")]: {
            textAlign: 'left',
        },
    },
    mTB30: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    signinLabel: {
        color: '#F28705',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        lineHeight: '32px',
        marginTop: '50px',
        marginBottom: '10px',
    },
    mLR: {
        margin: '0px 10px',
    },
    socilIconstyle: {
        verticalAlign: 'middle',
        padding: '5px',
    },
    inputCustmStyl: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: '#F28705',
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
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
    forgotLinkSty: {
        color: '#F28705',
        fontSize: '12px',
        fontFamily: 'Montserrat-Medium',
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
        "& input": {
            width: '2em !important',
            margin: theme.spacing(0.5, 1),
            height: '2rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #F28705',
            //padding: '8px',
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
        padding: '8px 0px',
        // border: '1px solid #ccc',
        border: 'none',
        borderRadius: '4px',
        // padding: theme.spacing(1, 1.2),
    }
});

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(InputRecoveryPassword));
