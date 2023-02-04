import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import clsx from "clsx";
import _ from "lodash";
import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import VerifyOtp from "../auth/VerifyOtp";
import { UserActions } from "../UserActions";
import Page from "../../../../src/components/Page";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Popper,
  NativeSelect,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import GradientBG from "./img/GradientBG.png";
import google from "./img/google.svg";
import IconSimpleFacebook from "./img/IconSimpleFacebook.svg";
import linkedin from "./img/linkedin.svg";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import LogoImage from "../../../../public/LoginImg/logo.png";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import PaceLogo from "./PaceLogo";
import SocialAccount from "./SocialAccount";
import "../../../../src/App.css";
import OtpInput from "react-otp-input";
import loginBBg from "../../../../../static/public/images/LoginImg/logbeforebg.png";
import countries from "../../../../src/js/data/country";

const CountryCodeList = (props) => {
  return (
    <Popper {...props} style={{ width: "300px" }} placement="bottom-start" />
  );
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
    console.log({ props: this.props });
  }

  state = {
    snackbarOpen: false,
    password: "",
    passwordLengthCheck: false,
    capitalLetterCheck: false,
    numberCheck: false,
    classname: "classes.progresBoxWarning",
    errors: {},
    touched: {},
    name: "",
    email: "",
    mobile: "",
    conf_pass: "",
    phone: "",
    phone_code: "",
    emailPhoneVerifyPage: true,
    otp_email: "",
    otp_mobile: "",
    referralEmail: "",
    referralPhone: "",
  };

  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  };

  componentDidMount = () => {
    console.log({ props: this.props.location });
    if ("invitee_data" in this.props.location) {
      this.setState({
        referralEmail: this.props.location.invitee_data.referralEmail,
      });
      this.setState({
        referralPhone: this.props.location.invitee_data.referralPhone,
      });
      this.setState({ email: this.props.location.invitee_data.referralEmail });
      if (this.props.location.invitee_data.referralPhone) {
        this.setState({
          mobile: String(this.props.location.invitee_data.referralPhone),
        });
      }
    }
  };

  handleChangeOtpM = (e) => {
    console.log({ event: e });
    this.setState({ otp_mobile: e });
  };

  handleChangeOtpE = (e) => {
    console.log({ event: e });
    this.setState({ otp_email: e });
  };

  handleOptionChange = (event, value) => {
    this.setState({ phone_code: value.code });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    history.push("/");
  };

  handleContinue = () => {
    let isValid = this.formValidation();
    console.log({ isValid: isValid });
    if (isValid) {
      const form_data = new FormData();
      form_data.append("name", this.state.name);
      form_data.append("email", this.state.email);
      form_data.append("mobile", this.state.mobile);
      form_data.append("password", this.state.password);
      form_data.append("conf_pass", this.state.conf_pass);
      // form_data.append('applogo', values.logo)

      const url =
        process.env.API_URL + process.env.API_VERSION + "/user/register/";
      axios
        .post(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.setState({ emailPhoneVerifyPage: false });
          console.log({ location_details: this.props.location });
          if ("invitee_data" in this.props.location) {
            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/check-user/",
              method: "GET",
              params: {
                username: this.props.location.invitee_data.referralEmail,
              },
            })
              .then((res) => {
                console.log({ result: res });

                const invitee_user_id = res.data.data.results.user;

                console.log({ check_user: invitee_user_id });
                console.log({
                  invitee: this.props.location.invitee_data.users.id,
                });

                const invite_id = this.props.location.invitee_data.id;

                const input = new FormData();

                input.append(
                  "fkAppId",
                  this.props.location.invitee_data.fkAppId
                );
                input.append(
                  "fkGroupId",
                  this.props.location.invitee_data.fkGroupId
                );
                input.append(
                  "fkCompanyId",
                  this.props.location.invitee_data.fkCompanyId
                );
                input.append("active", true);

                axios({
                  url:
                    process.env.API_URL +
                    process.env.API_VERSION +
                    "/user/" +
                    invitee_user_id +
                    "/invitee_subscriptions/",
                  method: "POST",
                  data: input,
                })
                  .then((res) => {
                    console.log({ result: res });
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/updateinvite/" +
                        invite_id +
                        "/",
                      method: "GET",
                    })
                      .then((res) => {
                        console.log({ result: res });
                      })
                      .catch((err) => {
                        //alert('error');
                        console.log({ err: err });
                      });
                    // this.action.openSnackbar('Succesfully Registrated your PACE account')

                    // this.action.login(res.data.data.results)
                    // this.props.route.history.push('/dashboard');
                    // this.action.openSnackbar("Welcome! Login successful")
                    // this.action.showSnackbar
                  })
                  .catch((err) => {
                    //alert('error');
                    console.log({ err: err });
                  });
              })
              .catch((err) => {
                //alert('error');
                console.log({ err: err });
              });
          }

          this.action.openSnackbar("One step away for registration!!");
          this.action.showSnackbar;
          //   this.props.history.push('/login')
        })
        .catch((err) => {
          console.log({ error: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            // this.setState({emailPhoneVerifyPage:true})
            console.log(err.response.data.error_description);
            this.action.openSnackbar(
              err.response.data.data.results.email,
              true
            );
            this.action.showSnackbar;
            // this.props.history.push('/register')
          } else {
            this.action.openSnackbar('Something went wrong, please try again later.', true)
            this.action.showSnackbar
          }
        });
    } else {
      this.setState({ emailPhoneVerifyPage: true });
      this.setState(
        {
          touched: {
            name: true,
            email: true,
            mobile: true,
            password: true,
            conf_pass: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleTouch = (e) => {
    let { touched } = this.state;
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched }, () =>
        console.log({ touched: this.state.touched })
      );
    }
  };

  handleSkip = (e) => {
    this.props.history.push("/login");
  };

  formValidation = () => {
    const {
      name,
      email,
      mobile,
      password,
      conf_pass,
      emailPhoneVerifyPage,
      otp_email,
      otp_mobile,
    } = this.state;
    let isValid = true;
    console.log({ email: this.state.email });
    console.log({ mobile: this.state.mobile });
    const errors = {};
    if (emailPhoneVerifyPage) {
      if (name == "") {
        errors.name = "Full Name should be specified";
        isValid = false;
      }
      if (email == "") {
        errors.email = "Email should be specified";
        isValid = false;
      } else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) == null) {
        errors.email = "Please enter valid Email";
        isValid = false;
      }

      if (!/^\d{10,11}$/.test(mobile) && mobile != "") {
        errors.mobile = "Please enter valid mobile number";
        isValid = false;
      }
      if (password == "") {
        errors.password = "password should be specified";
        isValid = false;
      } else if (password.length < 8) {
        errors.password = "password should have minimum of 8 characters";
        isValid = false;
      } else if (password.match(/[A-Z]/) == null) {
        errors.password = "password must have atleast one UPPERCASE letter";
        isValid = false;
      } else if (password.match(/[0-9]/) == null) {
        errors.password = "password must have number";
        isValid = false;
      }
      if (conf_pass == "") {
        errors.conf_pass = "confirm password should be specified";
        isValid = false;
      }
      if (password != conf_pass) {
        errors.conf_pass = "password and confirm password should match";
        isValid = false;
      }
    } else {
      if (otp_email == "" && otp_mobile == "") {
        errors.otp = "Enter OTP you received";
        isValid = false;
      }
    }

    this.setState({ errors }, () => console.log({ errors: this.state.errors }));

    return isValid;
  };

  handleChangePassword = (event) => {
    let password = event.target.value;
    this.setState({ password: password });
    //console.log({password: password})
    if (password.length >= 8) {
      //console.log({successpassword: password.length})
      this.setState({ passwordLengthCheck: true });
    } else {
      //console.log({errorpassword: password.length})
      this.setState({ passwordLengthCheck: false });
    }
    if (password.match(/[A-Z]/) != null) {
      this.setState({ capitalLetterCheck: true });
    } else {
      this.setState({ capitalLetterCheck: false });
    }
    if (password.match(/[0-9]/) != null) {
      this.setState({ numberCheck: true });
    } else {
      this.setState({ numberCheck: false });
    }
  };

  handleClickOTPMobile = () => {
    this.setState({ otp_mobile: "" });
    const input = new FormData();

    input.append("mobile", this.state.mobile);
    input.append("receiver", "mobile");

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/send-otp/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        console.log({ result: res.data.data.results });
        this.action.openSnackbar("OTP has been resent to your Mobile");
        this.action.showSnackbar;
      })
      .catch((err) => {
        //alert('error');
        this.setState({ loading: false });
        if (err.response && err.response.data.status_code == 400) {
          this.action.openSnackbar(err.response.data.error, true);
          this.action.showSnackbar;
        }
      });
  };

  handleClickOTPEmail = () => {
    this.setState({ otp_email: "" });
    const input = new FormData();

    input.append("email", this.state.email);
    input.append("receiver", "email");

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/send-otp/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        console.log({ result: res.data.data.results });
        this.action.openSnackbar("OTP has been resent to your Email");
        this.action.showSnackbar;
      })
      .catch((err) => {
        //alert('error');
        console.log({ errors: err });
        this.setState({ loading: false });
        if (err.response && err.response.data.status_code == 400) {
          this.action.openSnackbar(err.response.data.error, true);
          this.action.showSnackbar;
        }
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const isValid = this.formValidation();

    if (isValid) {
      const form_data = new FormData();
      form_data.append("email", this.state.email);
      form_data.append("mobile", this.state.mobile);
      form_data.append("OTP_email", this.state.otp_email);
      form_data.append("OTP_mobile", this.state.otp_mobile);

      const url =
        process.env.API_URL + process.env.API_VERSION + "/user/verifyotp/";
      axios
        .put(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log({ result: res });

          const token = res.data.data.results.access_token;
          var fullToken = "Bearer " + token;
          axios.defaults.headers.common["Authorization"] = fullToken;
          //   localStorage.setItem('companyId',this.props.location.invitee_data.fkCompanyId)

          if (this.props.location.invitee_data != undefined) {
            localStorage.setItem(
              "companyId",
              this.props.location.invitee_data.fkCompanyId
            );
            // get role of user for accounts application and save it in localstorage
            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/self/" +
                localStorage.getItem("companyId") +
                "/",
              method: "GET",
            })
              .then((res1) => {
                console.log({
                  result_self:
                    res1.data.data.results.data.companies[0].subscriptions,
                });

                const subscriptions =
                  res1.data.data.results.data.companies[0].subscriptions;
                localStorage.setItem(
                  "companyCode",
                  JSON.stringify(res1.data.data.results.data.companies[0])
                );

                subscriptions.map((subscription) => {
                  if (subscription.appCode == "accounts") {
                    localStorage.setItem("ssoRole", subscription.roles[0].name);

                    if (localStorage.getItem("companyCode") != undefined) {
                      const companyCode = JSON.parse(
                        localStorage.getItem("companyCode")
                      ).companyCode;

                      console.log({ companycode_reg: companyCode });

                      if (companyCode == "SCDJVSTAGE") {
                        // this.action.openSnackbar('succesfully verified')
                        // this.action.showSnackbar
                        window.location.href =
                          "https://scdjv-stage.teknobuilt.com";
                      } else if (companyCode == "SCDJV") {
                        this.action.openSnackbar("succesfully verified");
                        this.action.showSnackbar;
                        // return "https://scdjv-pace.teknobuilt.com"
                        window.location.href =
                          "https://scdjv-pace.teknobuilt.com";
                      } else {
                        this.action.openSnackbar(
                          "Succesfully Registrated your PACE account"
                        );
                        this.action.login(res.data.data.results);
                        this.props.route.history.push("/dashboard");
                        this.action.openSnackbar("Welcome! Login successful");
                        this.action.showSnackbar;
                      }
                    }
                  }
                });
              })
              .catch((err) => {
                console.log(
                  err,
                  err.response,
                  err.response.error.message,
                  err.response.message
                );
                // this.setState({otpErr: err.response})
              });
          }

          // if(localStorage.getItem('companyCode')!=undefined){
          //         const companyCode=JSON.parse(localStorage.getItem('companyCode')).companyCode

          //         console.log({'companycode_reg':companyCode})

          //         if(companyCode=='SCDJVSTAGE'){
          //             // this.action.openSnackbar('succesfully verified')
          //             // this.action.showSnackbar
          //             window.location.href = "https://scdjv-stage.teknobuilt.com";
          //         }
          //         else if(companyCode=='SCDJV'){
          //             // this.action.openSnackbar('succesfully verified')
          //             // this.action.showSnackbar
          //             return "https://scdjv-pace.teknobuilt.com"
          //             // window.location.href = "https://scdjv-pace.teknobuilt.com";
          //         }

          //         else{
          //             this.action.openSnackbar('Succesfully Registrated your PACE account')
          //             this.action.login(res.data.data.results)
          //             this.props.route.history.push('/dashboard');
          //             this.action.openSnackbar("Welcome! Login successful")
          //             this.action.showSnackbar
          //           }
          //     }
        })
        .catch((err) => {
          // alert('error')
          console.log(err, err.response, err.response.data.error.error);
          this.setState({ loading: false });
          if (err.response && err.response.data.status_code == 400) {
            console.log(err.response.data.error.error);
            this.action.openSnackbar(err.response.data.error.error, true);
            this.action.showSnackbar;
          }
        });
    } else {
      this.setState(
        {
          touched: {
            otp_email: true,
            otp_mobile: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  render() {
    // const { classes } = this.props
    const { classes, handleSubmit } = this.props;
    const { touched, errors } = this.state;

    return (
      <Fragment>
        <Grid container className={classes.logoSection}>
          <Grid item xs={12} sm={12} md={12} align="center">
            <PaceLogo />
          </Grid>
        </Grid>
        <Page className={classes.root} title="Register">
          <Box
            className={classes.customcontentbox}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            hidden={!this.state.emailPhoneVerifyPage}
          >
            <Grid
              container
              component="main"
              className={classes.root}
              style={{
                background: `url(${loginBBg}) no-repeat 50% 100%`,
                backgroundSize: "contain",
                paddingBottom: "170px",
              }}
            >
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
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  component={Paper}
                  className={classes.paper}
                  elevation={5}
                >
                  {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}
                  <Grid item xs={12} sm={12} md={12} align="center">
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.logTitle}
                    >
                      Sign Up
                    </Typography>
                  </Grid>

                  <form
                    autoComplete="off"
                    noValidate
                    className={classes.form}
                  // onSubmit={this.handleSubmit}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.customUsernamFild}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        value={this.state.name}
                        helperText={
                          touched.name && Boolean(errors.name)
                            ? errors.name
                            : ""
                        }
                        type="text"
                        onChange={(e) => {
                          this.handleChange(e);
                          this.formValidation();
                        }}
                        onBlur={(e) => {
                          this.handleTouch(e);
                          this.formValidation();
                        }}
                        error={touched.name && Boolean(errors.name)}
                        //required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        //autoComplete="email"
                        // autoFocus
                        className={classes.inputCustmStyl}
                      />
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29.89"
                          height="29.89"
                          viewBox="0 0 29.89 29.89"
                        >
                          <path
                            d="M25.513,4.377A14.945,14.945,0,0,0,4.377,25.513,14.945,14.945,0,0,0,25.513,4.377ZM7.492,25.826a7.568,7.568,0,0,1,14.905,0,13.165,13.165,0,0,1-14.905,0Zm2.7-12.757a4.752,4.752,0,1,1,4.752,4.752A4.757,4.757,0,0,1,10.193,13.069ZM23.915,24.611a9.334,9.334,0,0,0-5.426-6.092,6.5,6.5,0,1,0-7.087,0,9.332,9.332,0,0,0-5.426,6.091,13.194,13.194,0,1,1,17.939,0Zm0,0"
                            fill="#f2f2f2"
                          />
                        </svg>
                      </i>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.customUsernamFild}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        className={classes.inputCustmStyl}
                        value={
                          Boolean(this.state.referralEmail)
                            ? this.state.referralEmail
                            : this.state.email
                        }
                        helperText={
                          touched.email && Boolean(errors.email)
                            ? errors.email
                            : ""
                        }
                        type="text"
                        disabled={
                          Boolean(this.state.referralEmail) ? true : false
                        }
                        onChange={(e) => {
                          this.handleChange(e);
                          this.formValidation();
                        }}
                        onBlur={(e) => {
                          this.handleTouch(e);
                          this.formValidation();
                        }}
                        error={touched.email && Boolean(errors.email)}
                      //autoComplete="email"
                      />
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29.891"
                          height="29.891"
                          viewBox="0 0 29.891 29.891"
                        >
                          <path
                            d="M21.26,18.457a2.627,2.627,0,1,0,2.627,2.627A2.63,2.63,0,0,0,21.26,18.457Z"
                            transform="translate(-6.256 -6.197)"
                            fill="#f2f2f2"
                          />
                          <path
                            d="M14.887,0a14.945,14.945,0,0,0,0,29.891,15.1,15.1,0,0,0,15-15A15,15,0,0,0,14.887,0Zm6.247,19.265a3.5,3.5,0,0,1-2.862-1.494,4.381,4.381,0,1,1-.641-6.365v-.022a.876.876,0,0,1,1.751,0v4.379a1.751,1.751,0,0,0,3.5,0c0-5.861-3.878-8.757-7.881-8.757a7.881,7.881,0,0,0,0,15.763,7.8,7.8,0,0,0,4.791-1.623.876.876,0,0,1,1.067,1.389A9.539,9.539,0,0,1,15,24.52,9.633,9.633,0,0,1,15,5.254c4.84,0,9.633,3.569,9.633,10.508A3.506,3.506,0,0,1,21.134,19.265Z"
                            fill="#f2f2f2"
                          />
                        </svg>
                      </i>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12}  className={classes.customPhoneFild}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    //required
                                                    fullWidth
                                                    id="mobile"
                                                    label="Mobile No."
                                                    name="mobile"
                                                    className={classes.inputCustmStyl}
                                                    value={Boolean(this.state.referralPhone)?this.state.referralPhone:this.state.mobile}
                                                    helperText={touched.mobile ? errors.mobile : ""}
                                                    type="text"
                                                    disabled={Boolean(this.state.referralPhone)?true:false}
                                                    onChange={(e) => { this.handleChange(e); this.formValidation();}}
                                                    onBlur={(e) => { this.handleTouch(e); this.formValidation();}}
                                                    error={touched.mobile && Boolean(errors.mobile)}
                                                //autoComplete="email"
                                                />

                                            <div className={classes.cuntryCodePhone}>
                                                <Autocomplete
                                                    id="country-code"
                                                    options={countries}
                                                    defaultValue={countries.find(option => option.code == "+91")}
                                                    autoHighlight
                                                    closeIcon=""
                                                    PopperComponent={CountryCodeList}
                                                    getOptionLabel={(option) => option.code}
                                                    onChange={this.handleOptionChange}
                                                    renderOption={(option) => (
                                                        <React.Fragment>
                                                            {option.code}{" " + option.name} </React.Fragment>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color="secondary"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <i><svg xmlns="http://www.w3.org/2000/svg" width="21" height="35" viewBox="0 0 21 35"><path d="M12.688,31.5A2.194,2.194,0,0,0,10.5,29.313a2.188,2.188,0,1,0,1.545,3.732A2.106,2.106,0,0,0,12.688,31.5Zm5.688-4.375V7.875A.887.887,0,0,0,17.5,7H3.5a.887.887,0,0,0-.875.875v19.25A.887.887,0,0,0,3.5,28h14a.887.887,0,0,0,.875-.875ZM13.125,3.938a.387.387,0,0,0-.437-.438H8.313a.387.387,0,0,0-.437.438.387.387,0,0,0,.437.437h4.375A.387.387,0,0,0,13.125,3.938ZM21,3.5v28A3.55,3.55,0,0,1,17.5,35H3.5a3.361,3.361,0,0,1-2.461-1.039A3.368,3.368,0,0,1,0,31.5V3.5A3.361,3.361,0,0,1,1.039,1.039,3.368,3.368,0,0,1,3.5,0h14a3.361,3.361,0,0,1,2.461,1.039A3.368,3.368,0,0,1,21,3.5Z" fill="#f2f2f2" /></svg></i>
                                        </Grid> */}

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.customUsernamFild}
                    >
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
                        onChange={(e) => {
                          this.handleChangePassword(e);
                          this.formValidation();
                        }}
                        onBlur={(e) => {
                          this.handleTouch(e);
                          this.formValidation();
                        }}
                        error={touched.password && Boolean(errors.password)}
                      //autoComplete="current-password"
                      />
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="33.254"
                          viewBox="0 0 35 33.254"
                        >
                          <path
                            d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z"
                            transform="translate(0 0)"
                            fill="#f2f2f2"
                          />
                        </svg>
                      </i>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      className={classes.passwordPolicyStep}
                    >
                      <Typography variant="h6" className={classes.title}>
                        Password policy:
                      </Typography>
                      <List>
                        <ListItem>
                          <span
                            className={
                              this.state.passwordLengthCheck
                                ? classes.progresBoxSucess
                                : this.state.password.length > 0
                                  ? classes.progresBoxWarning
                                  : classes.progresBox
                            }
                          ></span>
                          <ListItemText primary="Minimum 8 characters length." />
                        </ListItem>
                        <ListItem>
                          <span
                            className={
                              this.state.capitalLetterCheck
                                ? classes.progresBoxSucess
                                : this.state.password.length > 0
                                  ? classes.progresBoxWarning
                                  : classes.progresBox
                            }
                          ></span>
                          <ListItemText primary="Must have at least one UPPERCASE character." />
                        </ListItem>
                        <ListItem>
                          <span
                            className={
                              this.state.numberCheck
                                ? classes.progresBoxSucess
                                : this.state.password.length > 0
                                  ? classes.progresBoxWarning
                                  : classes.progresBox
                            }
                          ></span>
                          <ListItemText primary="Must have number." />
                        </ListItem>
                      </List>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.customUsernamFild}
                    >
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
                        onChange={(e) => {
                          this.handleChange(e);
                          this.formValidation();
                        }}
                        onBlur={(e) => {
                          this.handleTouch(e);
                          this.formValidation();
                        }}
                        error={touched.conf_pass && Boolean(errors.conf_pass)}
                      //autoComplete="current-password"
                      />
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="33.254"
                          viewBox="0 0 35 33.254"
                        >
                          <path
                            d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z"
                            transform="translate(0 0)"
                            fill="#f2f2f2"
                          />
                        </svg>
                      </i>
                    </Grid>
                    <Grid container className={classes.mT30}>
                      <Grid container item xs={6}>
                        <Link
                          to="/login"
                          onClick={this.toggle}
                          className={classes.buttonCustomLogin}
                          //fullWidth
                          variant="contained"
                        >
                          Sign in instead
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
                          <span>Continue</span>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.358"
                            height="15.506"
                            viewBox="0 0 14.358 15.506"
                          >
                            <g
                              id="right-arrow"
                              transform="translate(0.814 0.814)"
                            >
                              <path
                                id="Path_389"
                                data-name="Path 389"
                                d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z"
                                transform="translate(-7.592 -0.005)"
                                fill="#f2f2f2"
                                stroke="#f2f2f2"
                                stroke-width="1.5"
                              />
                              <path
                                id="Path_390"
                                data-name="Path 390"
                                d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z"
                                transform="translate(-1.312 0)"
                                fill="#f2f2f2"
                                stroke="#f2f2f2"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <SocialAccount /> */}
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                <p>
                  Copyright © 2021, Teknobuilt Ltd. | All rights are reserved
                </p>
              </Grid>
            </Grid>
          </Box>
          <Box
            className={classes.customcontentbox}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            hidden={this.state.emailPhoneVerifyPage}
          >
            <Grid
              container
              component="main"
              className={classes.root}
              style={{
                background: `url(${loginBBg}) no-repeat 50% 100%`,
                backgroundSize: "contain",
                paddingBottom: "170px",
              }}
            >
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
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  component={Paper}
                  className={classes.paper}
                  elevation={5}
                >
                  {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}

                  <Grid item xs={12} sm={12} md={12} align="center">
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.logTitle}
                    >
                      Verification
                    </Typography>
                  </Grid>

                  <form
                    className={classes.form}
                    autoComplete="off"
                    noValidate
                    onSubmit={this.handleSubmit}
                  >
                    <Grid item xs={12} sm={12} md={12} align="center">
                      {/* <Typography component="h5" variant="h5" className={classes.verificationDetail}>
                                                {/* <AccountCircleIcon /> {this.state.email} */}
                      {/* Enter the 6-digit verification code received your mobile number {String(this.state.mobile).substring(0, 2)}******{String(this.state.mobile).slice(-3)} and email I’d {String(this.state.email).substring(0, 2)}******{String(this.state.email).slice(-4)}
                                            </Typography> */}
                      <Typography
                        component="h5"
                        variant="h5"
                        className={classes.verificationDetail}
                      >
                        {/* <AccountCircleIcon /> {this.state.email} */}
                        Enter the 6-digit verification code received your Email
                        Id {String(this.state.email).substring(0, 2)}******
                        {String(this.state.email).slice(-4)}
                      </Typography>
                    </Grid>

                    <Grid container>
                      <Grid container item xs={12} sm={12}>
                        {/* <Grid item xs={12} className={classes.otpFieldLabel}>
                                                    <Typography component="body1" variant="body1" >
                                                        Mobile verification code
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} className={classes.otpFieldstyle}>
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
                                                                    onBlur={(e) => { this.handleTouch(e) }}
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
                                                {touched.otp || Boolean(errors.otp) ? <span style={{ color: "red", fontSize: '12px' }}>{errors.otp}</span> : ""}
                                                <Grid item xs={12} sm={12} align="right">
                                                    <Link onClick={this.handleClickOTPMobile} className={classes.forgotLinkSty}>
                                                        Resend OTP
                                                    </Link>
                                                </Grid> */}

                        <Grid item xs={12} className={classes.otpFieldLabel}>
                          <Typography component="body1" variant="body1">
                            Email verification code
                          </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.otpFieldstyle}>
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
                                  onChange={(e) => {
                                    this.handleChangeOtpE(e);
                                  }}
                                  onBlur={(e) => {
                                    this.handleTouch(e);
                                  }}
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
                        {touched.otp || Boolean(errors.otp) ? (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.otp}
                          </span>
                        ) : (
                          ""
                        )}
                        <Grid item xs={12} sm={12} align="right">
                          <Link
                            onClick={this.handleClickOTPEmail}
                            className={classes.forgotLinkSty}
                          >
                            Resend OTP
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mT30}>
                      <Grid container item xs={6}>
                        <Button
                          //hidden={this.state.otpField}
                          variant="contained"
                          color="default"
                          className={classes.buttonCustomotpBack}
                          //startIcon={<LockIcon />}
                          onClick={this.handleSkip}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.358"
                            height="15.496"
                            viewBox="0 0 14.358 15.496"
                          >
                            <g transform="translate(0.814 0.803)">
                              <path
                                d="M20.018,13.948a.3.3,0,0,0,.215-.518L13.779,6.977,20.233.523A.3.3,0,0,0,19.8.095L13.136,6.763a.3.3,0,0,0,0,.429L19.8,13.859A.3.3,0,0,0,20.018,13.948Z"
                                transform="translate(-13.048 -0.005)"
                                fill="#054d69"
                                stroke="#054d69"
                                stroke-width="1.5"
                              />
                              <path
                                d="M8.283,13.943a.3.3,0,0,0,.215-.518L2.044,6.971,8.5.518A.3.3,0,0,0,8.068.089L1.4,6.757a.3.3,0,0,0,0,.429l6.668,6.668A.3.3,0,0,0,8.283,13.943Z"
                                transform="translate(4.143 0)"
                                fill="#054d69"
                                stroke="#054d69"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                          <span>Skip</span>
                        </Button>
                      </Grid>
                      <Grid container item xs={6}>
                        <Button
                          variant="contained"
                          //color="default"
                          className={classes.buttonCustom}
                          onClick={this.handleSubmit}
                          type="submit"
                        //startIcon={<LockIcon />}
                        >
                          <span>Verify</span>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.358"
                            height="15.506"
                            viewBox="0 0 14.358 15.506"
                          >
                            <g
                              id="right-arrow"
                              transform="translate(0.814 0.814)"
                            >
                              <path
                                id="Path_389"
                                data-name="Path 389"
                                d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z"
                                transform="translate(-7.592 -0.005)"
                                fill="#f2f2f2"
                                stroke="#f2f2f2"
                                stroke-width="1.5"
                              />
                              <path
                                id="Path_390"
                                data-name="Path 390"
                                d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z"
                                transform="translate(-1.312 0)"
                                fill="#f2f2f2"
                                stroke="#f2f2f2"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                <p>
                  Copyright © 2022, Teknobuilt Ltd. | All rights are reserved
                </p>
              </Grid>
            </Grid>
          </Box>
        </Page>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "1px",
      backgroundColor: "transparent",
    },
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
  },
  paperRoot: {
    backgroundColor: "transparent",
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
    maxWidth: "485px",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      //margin: theme.spacing(2, 2),
      //padding: theme.spacing(3, 2),
      justify: "flex-start",
      alignItems: "baseline",
    },
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(4, 0),
      padding: theme.spacing(2, 2),
    },
    boxShadow:
      "0px 3px 5px -1px rgb(22 56 79 / 20%), 0px 5px 8px 0px rgb(22 56 79 / 14%), 0px 1px 14px 0px rgb(22 56 79 / 12%)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submitBtn: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: "#F28705",
    fontSize: "14px",
    fontFamily: "Montserrat-Bold",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "#ffffff",
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  logoBoxStyle: {
    backgroundColor: "#16384F",
    height: 115,
    width: 115,
    borderRadius: 100,
    marginBottom: 35,
    position: "relative",
  },
  buttonCustomSign: {
    width: "90%",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "19px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#054D69",
    textTransform: "none",
    marginLeft: "10%",
    boxShadow: "none",
    "& > span > span": {
      verticalAlign: "top",
      paddingRight: "10px",
    },
    "&.MuiButton-contained:hover": {
      boxShadow: "none",
      backgroundColor: "#f28705",
    },
    "&.MuiButton-contained:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#054D69 !important",
    },
  },
  buttonCustomLogin: {
    width: "90%",
    color: "#054D69",
    fontSize: "13px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "17px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    marginRight: "10%",
    backgroundColor: "#ffffff",
    textTransform: "none",
    border: "none",
    boxShadow: "none",
    textAlign: "center",
    border: "1px solid #ffffff",
    "&:hover": {
      border: "1px solid #054D69",
      color: "#054D69",
    },
  },
  mT30: {
    marginTop: "30px",
  },
  inputCustmStyl: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#054D69",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#92A6B6",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#F28705",
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#f28705",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "& legend": {
        "& span": {
          paddingLeft: "10px",
          paddingRight: "5px",
        },
      },
    },
  },
  customUsernamFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "15px",
      padding: "10px 10px 4px 10px",
      //backgroundColor: '#16384f',
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      textAlign: "center",
      width: "50px",
      height: "55px",
      borderRight: "1px solid #92A6B6",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 52px",
      borderColor: "#92A6B6",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 52px",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      padding: "0px 0px 0px 60px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 65px",
      fontFamily: "Montserrat-Medium",
    },
    "& > i svg": {
      verticalAlign: "text-top",
    },
  },

  customPhoneFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "15px",
      padding: "10px 10px 4px 10px",
      //backgroundColor: '#16384f',
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      textAlign: "center",
      width: "50px",
      height: "55px",
      borderRight: "1px solid #92A6B6",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 130px",
      borderColor: "#92A6B6",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 118px",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      padding: "0px 0px 0px 158px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 130px",
      fontFamily: "Montserrat-Medium",
    },
    "& > i svg": {
      verticalAlign: "text-top",
    },
  },
  cuntryCodePhone: {
    left: "50px",
    borderRight: "1px solid #92A6B6",
    top: "16px",
    position: "absolute",
    "& .MuiNativeSelect-select.MuiInputBase-input": {
      padding: "18.5px 20px 18.5px 10px",
      borderBottom: "none",
      backgroundColor: "transparent",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "& .MuiNativeSelect-icon": {
      color: "#92A6B6",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot":
    {
      paddingRight: "0px",
      borderBottom: "none",
      height: "52px",
      paddingLeft: "8px",
      width: "72px",
    },
    "& .MuiAutocomplete-inputRoot[class*='MuiInput-root'] .MuiAutocomplete-input:first-child":
    {
      padding: "4px 20px 0px 0px",
      textAlign: "center",
    },
  },
  passwordPolicyStep: {
    marginTop: "10px",
    "& .MuiListItem-gutters": {
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiListItemText-root": {
      margin: "0px",
    },
    "& > h6": {
      color: "#054D69",
      fontSize: "10px",
      lineHeight: "19px",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiTypography-body1": {
      color: "#054D69",
      fontSize: "9px",
      lineHeight: "19px",
      fontFamily: "Montserrat-Medium",
    },
  },
  progresBox: {
    width: "10px",
    height: "10px",
    backgroundColor: "#cccccc",
    marginRight: "4px",
    backgroundColor: "#EDEDED",
    borderRadius: "2px",
    border: "1px solid #F2F2F2",
  },
  progresBoxSucess: {
    backgroundColor: "#0EAC01",
    border: "1px solid #0EAC01",
    width: "10px",
    height: "10px",
    marginRight: "4px",
    borderRadius: "2px",
  },
  progresBoxWarning: {
    backgroundColor: "#F28705",
    border: "1px solid #F28705",
    width: "10px",
    height: "10px",
    marginRight: "4px",
    borderRadius: "2px",
  },
  verificationDetail: {
    fontSize: "12px",
    color: "#05374A",
    fontFamily: "Montserrat-Medium",
    textAlign: "left",
    marginTop: "12px",
    marginBottom: "8px",
  },
  otpFieldstyle: {
    "& input": {
      width: "2em !important",
      margin: theme.spacing(0.5, 1),
      height: "2rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #F28705",
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "0px",
    },
    "& .MuiOutlinedInput-root div": {
      margin: "0px auto",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
    },
    "& .MuiFormLabel-root": {
      color: "#F28705",
    },
    padding: "0px 0px",
    border: "none",
    borderRadius: "4px",
  },
  otpFieldstyle: {
    padding: "0px 0px",
    border: "none",
    borderRadius: "4px",
    "& input": {
      width: "35px !important",
      height: "36px",
      fontSize: "1rem",
      borderRadius: "0px",
      border: "1px solid #92A6B6",
      outline: "none",
      fontFamily: "Montserrat-Medium",
      color: "#05374A",
    },
    "& .MuiOutlinedInput-root > div > div": {
      margin: "0px auto",
      margin: "5px 17px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "12px !important",
    },
    "& .MuiOutlinedInput-root > div > div:nth-child(1)": {
      marginLeft: "0px !important",
    },
    "& .MuiOutlinedInput-root > div > div:nth-child(6)": {
      marginRight: "0px !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
      border: "none",
      padding: "0px !important",
    },
    "& .MuiFormLabel-root": {
      color: "#F28705",
    },
    "& .MuiTypography-root": {
      color: "#05374A",
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
  otpFieldLabel: {
    padding: "0px",
    marginTop: "15px",
    "& .MuiTypography-body1": {
      lineHeight: "18px",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      color: "#05374A",
    },
  },
  forgotLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
  },
  buttonCustomotpBack: {
    color: "#054D69",
    position: "relative",
    width: "90%",
    fontSize: "16px",
    lineHeight: "15px",
    marginRight: "10%",
    marginBottom: "60px",
    paddingTop: "15px",
    borderRadius: "0px",
    paddingBottom: "15px",
    backgroundColor: "#ffffff",
    border: "1px solid #92A6B6",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#ffffff",
    },
    "&:focus": {
      outline: "none",
    },
    "& span span": {
      verticalAlign: "top",
      paddingLeft: "10px",
    },
  },
  buttonCustom: {
    position: "relative",
    width: "100%",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "19px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#054D69",
    border: "1px solid #054D69",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    marginBottom: "60px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#054D69",
    },
    "&:focus": {
      outline: "none",
    },
    "& span > span": {
      paddingRight: "10px",
    },
  },
  footerCopyRight: {
    padding: "5px 15px 5px 15px",
    display: "block",
    textAlign: "center",
    "& p": {
      marginBottom: "0px",
      fontSize: "12px",
    },
  },
});

function mapStateToProps(state, props) {
  return { user: state };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(useStyles, { withTheme: true })(Register))
);
