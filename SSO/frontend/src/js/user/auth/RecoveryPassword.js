import { CircularProgress } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { UserActions } from "../UserActions";
import queryString from "query-string";
import Page from "../../../../src/components/Page";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import GradientBG from "./img/GradientBG.png";
import google from "./img/google.svg";
import IconSimpleFacebook from "./img/IconSimpleFacebook.svg";
import linkedin from "./img/linkedin.svg";
import LogoImage from "../../../../public/LoginImg/logo.png";
import LockIcon from "@material-ui/icons/Lock";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import OtpInput from "react-otp-input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PaceLogo from "./PaceLogo";
import SocialAccount from "./SocialAccount";
import "../../../../src/App.css";
import { Fragment } from "react";
import loginBBg from "../../../../../static/public/images/LoginImg/logbeforebg.png";

class RecoveryPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      email: this.props.route.location.state.email,
      next: this.props.route.location.state.next,
      result: {},
      passwordLengthCheck: false,
      capitalLetterCheck: false,
      numberCheck: false,
      classname: "classes.progresBoxWarning",
      password: "",
      conf_pass: "",
      enterPasswordPage: true,
      errors: {},
      touched: {},
    };
    this.action = new UserActions(this.props.dispatch);
  }

  handleChangeOtp = (otp) => this.setState({ otp });

  handleChange = (event) => {
    this.setState({ conf_pass: event.target.value });
  };

  handleChangePassword = (event) => {
    let password = event.target.value;
    this.setState({ password: password });
    if (password.length >= 8) {
      this.setState({ passwordLengthCheck: true });
    } else {
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

  handleTouch = (e) => {
    let { touched } = this.state;

    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched });
    }
  };

  handleClickVerify = () => {
    let isValid = this.formValidation();
    console.log({ isValid: isValid });
    if (isValid) {
      const form_data = new FormData();
      if (isNaN(this.state.email)) {
        form_data.append("email", this.state.email);
        form_data.append("authOTP", this.state.otp);
      } else {
        form_data.append("email", this.state.mobile);
        form_data.append("authOTP", this.state.otp);
      }
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
          this.setState({ enterPasswordPage: false });

          this.action.openSnackbar(
            "OTP entered succesfully.Please reset password"
          );
          this.action.showSnackbar;
        })
        .catch((err) => {
          console.log({ error: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            console.log(err.response.data.error);
            this.action.openSnackbar(err.response.data.error, true);
            this.action.showSnackbar;
          }
        });
    } else {
      this.setState({ enterPasswordPage: true });
    }
  };

  handleBack = () => {
    this.setState({ enterPasswordPage: true });
  };

  formValidation = () => {
    const { password, conf_pass, otp } = this.state;
    let errors = {};
    let isValid = true;

    if (this.state.enterPasswordPage) {
      if (this.state.otp == "") {
        errors.otp = "Please enter OTP received";
        isValid = false;
      } else if (this.state.otp.match(/[0-9]{6}/) == null) {
        errors.otp = "Please enter valid OTP";
        isValid = false;
      }
    } else {
      if (password == "") {
        errors.password = "password should be specified";
        isValid = false;
      } else if (password.length < 8) {
        errors.password = "password should have minimum of 8 characters";
        isValid = false;
      } else if (password.match(/[A-Z]/) == null) {
        errors.conf_pass = "password must have atleast one UPPERCASE letter";
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
    }
    this.setState({ errors }, () => console.log({ errors: this.state.errors }));
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let isValid = this.formValidation();
    console.log({ isValid: isValid });

    if (isValid) {
      const input = new FormData();

      if (isNaN(this.state.email)) {
        input.append("email", this.state.email);
      } else {
        input.append("mobile", this.state.email);
      }
      input.append("authOTP", this.state.otp);
      input.append("password", this.state.password);

      const url =
        process.env.API_URL + process.env.API_VERSION + "/user/resetpass/";
      axios
        .put(url, input, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(this.state.next);
          this.props.route.history.push("/login/" + this.state.next);
          this.action.openSnackbar("Password changed succesfully!!");
          this.action.showSnackbar;
        })
        .catch((err) => {
          console.log({ error: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            this.setState({ enterPasswordPage: false });
            console.log(err.response.data.error);
            this.action.openSnackbar(err.response.data.error, true);
            this.action.showSnackbar;
          }
        });
    } else {
      this.setState(
        {
          touched: {
            password: true,
            conf_pass: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  componentDidMount = () => {
    // alert(1234567)
    console.log(this.state);
    this.handleClickOTP();
  };

  handleClickOTP = () => {
    this.setState({ otp: "" });
    const input = new FormData();
    if (isNaN(this.state.email)) {
      input.append("email", this.state.email);
      input.append("receiver", "forgot-password");
    } else {
      input.append("mobile", this.state.email);
      input.append("receiver", "forgot-password");
    }
    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/send-otp/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        this.setState({ result: res.data.data.results });
        // this.action.openSnackbar('OTP has been sent on Email address/Mobile provided')
        this.action.openSnackbar("OTP has been sent on Email address provided");
        this.action.showSnackbar;
      })
      .catch((err) => {
        console.log({ error_Desc: err });
        this.setState({ loading: false });
        if (err.response && err.response.status == 400) {
          this.action.openSnackbar("Error: Records not Found", true);
          this.action.showSnackbar;
          return;
        }
      });
  };

  render() {
    const { classes } = this.props;
    const { result } = this.state;
    const { touched, errors } = this.state;

    console.log({ props: this.props });
    return (
      <Fragment>
        <Grid container className={classes.logoSection}>
          <Grid item xs={12} sm={12} md={12} align="center">
            <PaceLogo />
          </Grid>
        </Grid>
        <Page className={classes.root} title="Recovery Password">
          <Box
            className={classes.customcontentbox}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            hidden={!this.state.enterPasswordPage}
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
                item
                xs={12}
                sm={12}
                md={12}
                //component={Paper}
                //elevation={0}
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
                      Retrieve Password
                    </Typography>
                  </Grid>
                  <form className={classes.form} autoComplete="off" noValidate>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      align="center"
                      className={classes.userLogDetail}
                    >
                      <Typography component="h5" variant="h5">
                        <AccountCircleIcon /> {this.state.email}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className={classes.otpFieldstyle}
                      hidden={
                        !(Boolean(result.email) || Boolean(result.mobile))
                      }
                    >
                      {/* <Typography component="body1" variant="body1">
                                                Enter the 6-digit OTP sent to your mobile: 
                                                            {String(result.mobile).substring(0,2)}******{String(result.mobile).slice(-3)}
                                                            / email: {String(result.email).substring(0,2)}******{String(result.email).slice(-4)} 
                                            </Typography> */}
                      <Typography component="body1" variant="body1">
                        Enter the 6-digit OTP sent to your email:{" "}
                        {String(result.email).substring(0, 2)}******
                        {String(result.email).slice(-4)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.otpFieldstyle}>
                      <TextField
                        //hidden={this.state.otpField}
                        variant="outlined"
                        //required
                        fullWidth
                        name="otp"
                        //label="Enter OTP"
                        type="otp"
                        id="otp"
                        //fullWidth
                        className={classes.inputCustmStyl}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <OtpInput
                              //style={{ padding: "10px" }}
                              className={classes.otpFieldstyle}
                              value={this.state.otp}
                              onChange={(e) => {
                                this.handleChangeOtp(e);
                              }}
                              onBlur={(e) => {
                                this.handleTouch(e);
                              }}
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
                    {touched.otp || Boolean(errors.otp) ? (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.otp}
                      </span>
                    ) : (
                      ""
                    )}
                    <Grid item xs={12} sm={12} align="right">
                      <Link
                        onClick={this.handleClickOTP}
                        className={classes.forgotLinkSty}
                      >
                        Resend OTP
                      </Link>
                    </Grid>

                    <Grid container className={classes.mT30}>
                      <Grid container item xs={6}>
                        <Link
                          to="/login"
                          variant="contained"
                          color="default"
                          className={classes.buttonCustomotp}
                          //startIcon={<LockIcon />}
                          // onClick={this.handleBackOTP}
                        >
                          Back
                        </Link>
                      </Grid>
                      <Grid container item xs={6}>
                        <Button
                          // type="submit"
                          fullWidth
                          variant="contained"
                          className={classes.buttonCustom}
                          onClick={this.handleClickVerify}
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
            hidden={this.state.enterPasswordPage}
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
                      Hi {this.state.email}
                    </Typography>
                  </Grid>
                  <form
                    autoComplete="off"
                    noValidate
                    className={classes.form}
                    onSubmit={this.handleSubmit}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      align="center"
                      className={classes.userLogDetail}
                    >
                      <Typography component="h5" variant="h5">
                        <AccountCircleIcon /> {this.state.email}
                      </Typography>
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
                        required
                        margin="normal"
                        fullWidth
                        name="password"
                        label="New Password"
                        type="password"
                        id="password"
                        className={classes.inputCustmStyl}
                        value={this.state.password}
                        helperText={touched.password ? errors.password : ""}
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
                        label="Re-Confirm Password"
                        type="password"
                        id="conf_pass"
                        // helperText="Password did not match"
                        className={classes.inputCustmStyl}
                        value={this.state.conf_pass}
                        helperText={touched.conf_pass ? errors.conf_pass : ""}
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
                    <Grid container className={classes.mT30mB30}>
                      <Grid container item xs={6}>
                        <Link
                          // to="/login"

                          className={classes.buttonCustomLogin}
                          //fullWidth
                          variant="contained"
                          onClick={this.handleBack}
                        >
                          Back
                        </Link>
                      </Grid>
                      <Grid container item xs={6}>
                        <Button
                          type="submit"
                          //fullWidth
                          variant="contained"
                          //color="primary"
                          className={classes.buttonCustomSign}
                          // onClick={this.handleContinue}
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
  userLogDetail: {
    margin: theme.spacing(2, 0, 3, 0),
    "& h5": {
      color: "#16384F",
      fontSize: "15px",
      lineHeight: "19px",
      display: "inline-block",
      padding: "3px 32px",
      borderRadius: "18px",
      border: "1px solid #E3E3E3",
      backgroundColor: "#F2F2F2",
      "& svg": {
        verticalAlign: "middle",
        marginRight: "8px",
        color: "#054D69",
      },
    },
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  customUsernamFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "15px",
      padding: "10px 10px 4px 10px",
      backgroundColor: "#16384f",
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      textAlign: "center",
      width: "50px",
      height: "55px",
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
  mT30mB30: {
    marginTop: "30px",
    marginBottom: "30px",
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
  buttonCustomSign: {
    width: "90%",
    color: "#ffffff",
    fontSize: "13px",
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
  paper: {
    margin: theme.spacing(1, 2, 6, 2),
    padding: theme.spacing(4, 6, 12, 4),
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
    margin: theme.spacing(3, 0, 1, 0),
    backgroundColor: "#054D69",
    fontSize: "14px",
    fontFamily: "Montserrat-Bold",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#054D69",
    },
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  buttonCustomotp: {
    color: "#054D69",
    width: "90%",
    fontSize: "13px",
    lineHeight: "18px",
    marginRight: "10%",
    paddingTop: "15px",
    borderRadius: "0px",
    paddingBottom: "15px",
    backgroundColor: "#ffffff",
    border: "1px solid #92A6B6",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    textAlign: "center",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#ffffff",
      color: "#054D69",
    },
    "&:focus": {
      outline: "none",
    },
  },
  buttonCustom: {
    width: "95%",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "19px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#054D69",
    marginLeft: "10%",
    border: "1px solid #054D69",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#054D69",
    },
    "&:focus": {
      outline: "none",
    },
    "& span": {
      verticalAlign: "top",
      paddingRight: "10px",
    },
  },
  mT30: {
    marginTop: "30px",
  },
  forgotLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
  },
  otpFieldstyle: {
    padding: "8px 0px",
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
      margin: "5px 18px",
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
  userLogDetail: {
    margin: theme.spacing(3, 0, 2, 0),
    "& h5": {
      color: "#16384F",
      fontSize: "15px",
      lineHeight: "19px",
      display: "inline-block",
      padding: "3px 32px",
      borderRadius: "18px",
      border: "1px solid #E3E3E3",
      backgroundColor: "#F2F2F2",
      "& svg": {
        verticalAlign: "middle",
        marginRight: "8px",
        color: "#054D69",
      },
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
  )(withStyles(useStyles, { withTheme: true })(RecoveryPassword))
);
