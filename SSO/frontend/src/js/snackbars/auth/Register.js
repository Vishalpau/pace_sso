import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import clsx from "clsx";
import _ from "lodash";
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserActions } from "../UserActions";
import { Button, TextField, Typography, Grid, Paper } from "@material-ui/core";

import GradientBG from "./img/GradientBG.png";
import google from "./img/google.svg";
import IconSimpleFacebook from "./img/IconSimpleFacebook.svg";
import linkedin from "./img/linkedin.svg";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import LogoImage from "../../../../public/LoginImg/logo.png";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";

// import '../../../../src/App.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.action = new UserActions(this.props.dispatch);
  }

  state = {
    snackbarOpen: false,
  };

  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
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

  validationSchema = Yup.object().shape({
    name: Yup.string().required("Please specify First Name"),
    email: Yup.string().required("Please specify the Email Address"),
    password: Yup.string().required("Please enter the password"),

    conf_pass: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm password field does not match"
      ),
    }),
    mobile: Yup.string().required("Please enter the mobile Number"),
  });
  render() {
    // const { classes } = this.props
    const {
      classes,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    } = this.props;
    return (
      <Fragment>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} sm={4} md={6} className={classes.hidDestopView}>
            <Grid
              item
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
                <Typography
                  variant="h1"
                  className={classes.welcomTitleS}
                  align="right"
                  gutterBottom
                >
                  Create Account.
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.welcomSubTitle}
                  align="right"
                >
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8} md={6}>
            <Grid
              item
              //xs={{span: 12, order: 2}}
              xs={12}
              sm={12}
              md={12}
              component={Paper}
              elevation={0}
            >
              <div className={classes.paper} elevation={0}>
                <div className={classes.logoBoxStyle}>
                  <img
                    className={classes.logoImg}
                    src={LogoImage}
                    title="Sign in"
                    alt="Sign in"
                  />
                </div>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.logTitle}
                >
                  Sign Up
                </Typography>

                <Grid container className={classes.mT30}>
                  <Grid item xs>
                    <Typography
                      component="h5"
                      variant="h5"
                      className={classes.signupLabel}
                      align="left"
                    >
                      Do you have an account?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link
                      to="/login"
                      onClick={this.toggle}
                      className={classes.signupBtnStyl}
                      verticalAlign="middle"
                    >
                      Sign In{" "}
                      <ArrowRightAltIcon className={classes.verticlAlnIcon} />
                    </Link>
                  </Grid>
                </Grid>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    conf_pass: "",
                    mobile: "",
                  }}
                  validationSchema={this.validationSchema}
                  enableReinitialize
                  onSubmit={(
                    values,
                    { setSubmitting, setFieldError, resetForm }
                  ) => {
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/register/",
                      method: "POST",
                      data: {
                        email: values.email,
                        password: values.password,
                        conf_pass: values.conf_pass,
                        name: values.name,
                        mobile: values.mobile,
                      },
                    })
                      .then((res) => {
                        resetForm({ values: "" });
                        this.props.route.history.push("/login");
                      })
                      .catch((err) => {
                        console.log(err);
                        const errData = err.response.data.errors;

                        console.log(err);
                        var tifOptions = Object.keys(errData).map(function (
                          key
                        ) {
                          console.log(key);
                          return setFieldError(`${key}`, `${errData[key][0]}`);
                        });
                      });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form
                      autoComplete="off"
                      noValidate
                      className={classes.form}
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        value={values.name}
                        helperText={touched.name ? errors.name : ""}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        //required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        //autoComplete="email"
                        autoFocus
                        className={classes.inputCustmStyl}
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        className={classes.inputCustmStyl}
                        value={values.email}
                        helperText={touched.email ? errors.email : ""}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        //autoComplete="email"
                      />

                      <TextField
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        id="mobile"
                        label="Mobile No."
                        name="mobile"
                        className={classes.inputCustmStyl}
                        value={values.mobile}
                        helperText={touched.mobile ? errors.mobile : ""}
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.mobile && Boolean(errors.mobile)}
                        //autoComplete="email"
                      />

                      <Grid container spacing={2} className={classes.mT10}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            className={classes.inputCustmStyl}
                            value={values.password}
                            helperText={touched.password ? errors.password : ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            //autoComplete="current-password"
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
                            helperText={
                              touched.conf_pass ? errors.conf_pass : ""
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.conf_pass && Boolean(errors.conf_pass)
                            }
                            //autoComplete="current-password"
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          //color="primary"
                          className={classes.submitBtn}
                        >
                          CREATE ACCOUNT
                        </Button>
                      </Grid>
                      <Grid
                        direction="column"
                        justify="center"
                        alignItems="flex-end"
                      >
                        <Typography
                          component="h5"
                          variant="h5"
                          className={classes.signinLabel}
                          align="center"
                        >
                          Register with social links
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="flex-end"
                      >
                        {/* <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={linkedin} title="Linkedin Account" alt="Linkedin Account" /></button>
                                                    <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={google} title="Google Account" alt="Google Account" /></button>
                                                    <button className={classes.mLR}><img className={classes.socilIconstyle} spacing={2} src={IconSimpleFacebook} title="Facebook Account" alt="Facebook Account" /></button> */}
                      </Grid>
                    </form>
                  )}
                </Formik>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} className={classes.hidMobileView}>
            <Grid
              item
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
                <Typography
                  variant="h1"
                  className={classes.welcomTitleS}
                  align="right"
                  gutterBottom
                >
                  Create Account.
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.welcomSubTitle}
                  align="right"
                >
                  lorem ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "100px",
      backgroundColor: "transparent",
    },
    //height: '100vh',
    backgroundImage: `url(${GradientBG})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
  },
  paperRoot: {
    backgroundColor: "transparent",
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
      justify: "flex-start",
      alignItems: "baseline",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  leftPaper: {
    //margin: theme.spacing(8, 3, 10, 40),
    //padding: theme.spacing(0, 0, 14, 40),
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(20, 5, 14, 25),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  welcomSubTitle: {
    padding: theme.spacing(0, 0, 0, 20),
    color: "#F2F2F2",
    lineHeight: "26px",
    fontSize: "20px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "18px",
      fontSize: "12px",
    },
    fontFamily: "Montserrat-Medium",
  },
  /*avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main
    },*/
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
    fontSize: 45,
    fontFamily: "Montserrat-Bold",
    marginBottom: "15px",
  },
  logoBoxStyle: {
    backgroundColor: "#16384F",
    height: 115,
    width: 115,
    borderRadius: 100,
    marginBottom: 35,
    position: "relative",
  },
  logoImg: {
    maxWidth: "100%",
    top: 45,
    display: "block",
    position: "absolute",
  },
  signupBtnStyl: {
    border: "none",
    backgroundColor: "transparent",
    verticalAlign: "middle",
    color: "#F28705",
    fontFamily: "Montserrat-SemiBold",
    fontSize: "20px",
  },
  verticlAlnIcon: {
    verticalAlign: "middle",
  },
  welcomTitleS: {
    fontSize: "80px",
    lineHeight: "80px",
    color: "#F2F2F2",
    fontFamily: "Montserrat-SemiBold",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "42px",
      fontSize: "42px",
      marginLeft: "55px",
    },
  },
  signupLabel: {
    color: "#16384F",
    fontSize: "20px",
    fontFamily: "Montserrat-Regular",
  },
  buttonCustom: {
    width: "95%",
    color: "#16384F",
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#92A6B6",
  },
  buttonCustomotp: {
    width: "95%",
    color: "#16384F",
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    marginLeft: "5%",
    backgroundColor: "#92A6B6",
  },
  orLabel: {
    color: "#16384F",
    lineHeight: "50px",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
  },
  mT30: {
    marginTop: "30px",
  },
  mT10: {
    marginTop: "10px",
  },
  signinLabel: {
    color: "#F28705",
    fontSize: "14px",
    fontFamily: "Montserrat-Bold",
    lineHeight: "32px",
    marginTop: "50px",
    marginBottom: "10px",
  },
  mLR: {
    margin: "0px 10px",
  },
  socilIconstyle: {
    verticalAlign: "middle",
    padding: "5px",
  },
  inputCustmStyl: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#F28705",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
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
  hidDestopView: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  hidMobileView: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
});

function mapStateToProps(state, props) {
  return { user: state };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(Register));
