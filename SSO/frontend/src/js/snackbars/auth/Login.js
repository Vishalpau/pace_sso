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
import LockIcon from '@material-ui/icons/Lock';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import OtpInput from 'react-otp-input';
//import './../../app.css';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'password',
            loading: false,
            passwordField: true,
            otp: '',
            otpField: true,
        };

        this.action = new UserActions(this.props.dispatch);
    }

    // state = {
    //     passwordField: true,
    //     email: "",
    //     password: ''
    // }

    handleChangeOtp = otp => this.setState({ otp });

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }
    handleClick = () => {
        this.setState({ otpField: true })
        this.setState({ passwordField: !this.state.passwordField })

        // if (!this.state.passwordField) {

        // }

    }
    handleClickOTP = () => {
        this.setState({ passwordField: true })
        if (this.state.otpField)
            this.setState({ otpField: !this.state.otpField })

        // if (this.state.otpField) {
        const input = new FormData()
        if (isNaN(this.state.email)) {
            input.append('email', this.state.email)
        }
        else {
            input.append('mobile', this.state.email)
        }
        // alert("sending otp");
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/send-otp/',
            method: 'PATCH',
            data: input,
        }).then((res) => {
            // alert('OTP has been sent on mobile no provided:' + res.data.data.results.authOTP);
            // const token = res.data.access_token
            // var fullToken = 'Bearer ' + token
            // axios.defaults.headers.common['Authorization'] = fullToken;
            // this.action.login(res.data)
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
        // alert("trying logging in");
        const values = queryString.parse(this.props.route.location.search)
        console.log({ values: values })
        console.log({ props: this.props.route.location.search })
        const code = values.code;
        const next = values.next
        // alert(code)
        // if (code) {
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
            // alert("success")
            console.log({ success: res.data })
            return
            // const token = res.data.access_token
            // var fullToken = 'Bearer ' + token
            // axios.defaults.headers.common['Authorization'] = fullToken;
            // this.action.login(res.data)
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
            // alert('code');
            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/auth/token/',
                method: 'POST',
                data: {
                    client_id: "pace_client",
                    client_secret: "pace_secret",
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
        console.log({ values: values });
        // alert(111)
        // return
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
                        client_id: "user_id",
                        client_secret: "user_secret",
                        grant_type: "password",
                    },
                }).then((res) => {
                    // alert("success")
                    // console.log({ next: "value" })
                    // console.log({ next: values })
                    // alert("alerting a value")

                    if (values.next) {
                        const token = res.data.access_token
                        var fullToken = 'Bearer ' + token
                        axios.defaults.headers.common['Authorization'] = fullToken;
                        this.action.login(res.data)
                        window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=pace_client&response_type=code';
                    }
                    else {

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
                    const token = res.data.data.results.access_token
                    var fullToken = 'Bearer ' + token
                    axios.defaults.headers.common['Authorization'] = fullToken;
                    this.action.login(res.data.data.results)
                }).catch((err) => {
                    alert('error');
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




    loginUser = () => {
        this.setState({ loading: true })


        if (!this.state.passwordField) {
            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/auth/token/',
                method: 'POST',
                data: {
                    username: this.state.email,
                    password: this.state.password,
                    client_id: "user_id",
                    client_secret: "user_secret",
                    grant_type: "password",
                },
            }).then((res) => {
                // alert('success');
                const token = res.data.access_token
                var fullToken = 'Bearer ' + token
                axios.defaults.headers.common['Authorization'] = fullToken;
                this.action.login(res.data)
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
                    <Grid container component="main" className={classes.root} >
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
                            <div className={classes.paper} elevation={0}>
                                <div className={classes.logoBoxStyle}>
                                    <img className={classes.logoImg} src={LogoImage} title="Sign in" alt="Sign in" />
                                </div>
                                <Typography component="h1" variant="h5" className={classes.logTitle} >
                                    Signin
                                </Typography>

                                <Grid container className={classes.mT30}>
                                    <Grid item xs>
                                        <Typography component="h5" variant="h5" className={classes.signupLabel} align="left" >
                                            Don't have an account?
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" onClick={this.toggle} className={classes.signupBtnStyl} verticalAlign="middle">Signup <ArrowRightAltIcon className={classes.verticlAlnIcon} /></Link>
                                    </Grid>
                                </Grid>
                                <form className={classes.form} autoComplete="off"
                                    noValidate>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        //required
                                        fullWidth
                                        id="email"
                                        label="Email Or Mobile Number"
                                        name="email"
                                        autoFocus
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        className={classes.inputCustmStyl}
                                    />


                                    <Grid container spacing={2} className={classes.mT10} >
                                        <Grid item xs={12} sm={12} hidden={this.state.passwordField}>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                type="password"
                                                id="password"
                                                className={classes.inputCustmStyl}
                                                value={this.state.password}
                                                onChange={this.handleChange}
                                            />
                                            <Link to="/recoveryPassword" onClick={this.toggle} className={classes.forgotLinkSty}>Forgot password?</Link>
                                        </Grid>
                                        <Grid container item xs={12} sm={12} hidden={this.state.otpField}>
                                            <Grid item xs={12} className={classes.otpFieldstyle}>
                                                <TextField
                                                    hidden={this.state.otpField}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    name="otp"
                                                    label="Enter OTP"
                                                    type="otp"
                                                    id="otp"
                                                    fullWidth
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
                                            <Grid item xs={12} sm={12}>
                                                <Link align="left" href="#" className={classes.forgotLinkSty}>
                                                    Resend OTP
                                                </Link>
                                            </Grid>
                                            {/*<Grid item xs={6} sm={6} align="right">
                                                <Link align="left" href="#" className={classes.forgotLinkSty}>
                                                    Sign in with password
                                                </Link>
                                            </Grid>*/}
                                        </Grid>
                                    </Grid>

                                    <Grid container className={classes.mT30}>
                                        <Grid item xs>
                                            <Button
                                                onClick={this.handleClick}
                                                variant="contained"
                                                color="default"
                                                className={classes.buttonCustom}
                                                startIcon={<LockIcon />}
                                            >
                                                Password
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h2" className={classes.orLabel} align="center" >
                                                OR
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                className={classes.buttonCustomotp}
                                                startIcon={<LockIcon />}
                                                onClick={this.handleClickOTP}
                                            >
                                                OTP
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Button
                                        // type="submit"
                                        fullWidth
                                        variant="contained"
                                        //color="primary"
                                        className={classes.submitBtn}
                                        onClick={() => { this.loginUserUpdated() }}
                                        disabled={this.state.loading ? true : false}
                                    >
                                        JOIN PACE
                                    </Button>
                                    <Grid
                                        direction="column"
                                        justify="center"
                                        alignItems="flex-end"
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
                                        Welcome Back.
                                    </Typography>
                                    <Typography variant="body1" className={classes.welcomSubTitle} align="right" >
                                        lorem ipsum is simply dummy text of the printing and typesetting industry.
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Page>
        );
    }
}

const useStyles = theme => ({
    password: {
        display: "block",
        position: "relative",
        textTransform: "uppercase",
        fontWeight: 700,
        width: "100%"
    },
    password__show: {
        cursor: "pointer",
        position: "absolute",
        bottom: "14px",
        height: "16px",
        right: "10px",
        color: "#6d757d",
        fontSize: "0.8rem",
    },
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
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(2, 2),
            justify: 'flex-start',
            alignItems: 'baseline',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "transparent",
    },
    leftPaper: {
        //margin: theme.spacing(8, 3, 10, 40),
        //padding: theme.spacing(0, 0, 14, 40),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(20, 5, 14, 25),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    welcomSubTitle: {
        margin: theme.spacing(0, 0, 0, 20),
        color: '#F2F2F2',
        lineHeight: '26px',
        fontSize: '20px',
        [theme.breakpoints.down("sm")]: {
            lineHeight: '18px',
            fontSize: '12px',
        },
        fontFamily: 'Montserrat-Medium',
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
        margin: theme.spacing(5, 0, 2),
        backgroundColor: '#F28705',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        paddingTop: '15px',
        paddingBottom: '15px',
        color: '#ffffff',
    },
    customcontentbox: {

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
    signupBtnStyl: {
        border: 'none',
        backgroundColor: 'transparent',
        verticalAlign: 'middle',
        color: '#F28705',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '20px',
    },
    verticlAlnIcon: {
        verticalAlign: 'middle',
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
    },
    buttonCustom: {
        width: '95%',
        color: '#16384F',
        fontSize: '14px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '15px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#92A6B6',
    },
    buttonCustomotp: {
        width: '95%',
        color: '#16384F',
        fontSize: '14px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '15px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        marginLeft: '5%',
        backgroundColor: '#92A6B6',
    },
    orLabel: {
        color: '#16384F',
        lineHeight: '50px',
        fontFamily: 'Montserrat-Medium',
        fontSize: '14px',
    },
    mT30: {
        marginTop: '30px',
    },
    mT10: {
        marginTop: '10px',
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
)(withStyles(useStyles, { withTheme: true })(Login));
