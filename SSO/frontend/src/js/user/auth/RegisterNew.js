import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import _ from "lodash";
import { Component, Fragment, useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
// import "../../../../src/App.css";
import OtpInput from "react-otp-input";
import loginBBg from "../../../../public/static/images/logbeforebg2.png";
import PaceLogoImage from "../../../../../static/public/images/LoginImg/PACEWhite.png";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  pacelogonBox: {
    marginBottom: "30px",
  },
  signupSection: {
    maxWidth: "400px",
    background: "rgba(6,66,92, 0.95)",
    borderRadius: "10px",
    width: "100%",
    border: "1px solid #FFFFFF",
  },
  actionButtonSection: {
    paddingTop: "22px",
    "& button:nth-child(1)": {
      width: "45%",
      float: "left",
    },
    "& button:nth-child(2)": {
      width: "45%",
      float: "right",
    },
  },
  customOrgnBTN: {
    // width: '100%',
    float: "left",
    backgroundColor: "#7291a8",
    borderRadius: "36px",
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "18px",
    textTransform: "initial",
    color: "#ffffff",
    padding: "10px",
    // marginTop: '5px',
    "& .MuiSvgIcon-root": {
      height: "17px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
    },
  },
  customWhitBTN: {
    width: "50%",
    float: "left",
    backgroundColor: "#ffffff",
    borderRadius: "36px",
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "18px",
    textTransform: "initial",
    color: "#06425C",
    padding: "10px",
    textAlign: "center",
    // marginTop: '5px',
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff",
    },
  },
  groupSection: {
    padding: "28px 35px 31px 35px",
  },
  custommblFild: {
    position: "relative",
    marginBottom: "5px",
    "& > img": {
      position: "absolute",
      left: "12px",
      top: "32px",
      // '& svg': {
      //   '& path': {
      //     fill: '#92A6B6',
      //   },
      // },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 44px",
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 30px",
      color: "#06425C",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      // padding: '0px 0px 0px 45px',
      color: "#ffffff !important",
      padding: "5px 8px 5px 8px",
      background: "rgba(6,66,92, 0.95)",
      marginLeft: "0px",
      borderRadius: "5px",
      marginTop: "-4px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 45px",
      fontFamily: "Montserrat-Medium",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "7px",
    },
    "& .MuiFormHelperText-root": {
      "& span": {
        "& span": {
          "& a": {
            color: "#06425C",
            "& span": {
              color: "#06425C",
            },
          },
        },
      },
    },
  },
  inputCustmStyl: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06425C",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
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
    ".MuiOutlinedInput-notchedOutline": {
      paddingLeft: "52px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "& legend": {
        "& span": {
          paddingLeft: "12px",
          paddingRight: "8px",
        },
      },
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
      color: "#ffffff",
      fontSize: "10px",
      lineHeight: "19px",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiTypography-body1": {
      color: "#ffffff",
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
  SignUpTopDetailSection: {
    marginBottom: "30px",
  },
  signUpTitle: {
    fontFamily: "xolonium",
    color: "#F28705",
    fontSize: "22px",
    lineHeight: "22px",
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
  otpFieldstyle: {
    padding: "8px 0px",
    border: "none",
    borderRadius: "4px",
    "& input": {
      width: "42.5px !important",
      height: "40px",
      fontSize: "1rem",
      borderRadius: "7px",
      border: "1px solid #92A6B6",
      outline: "none",
      fontFamily: "Montserrat-Medium",
      color: "#05374A",
    },
    "& .MuiOutlinedInput-root > div > div": {
      // margin: '0px auto',
      margin: "0px 8.9px",
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
      color: "#ffffff",
      fontSize: "12px",
      lineHeight: "20px",
      fontFamily: "Montserrat-Medium",
    },
  },
  inputCustmStylOTP: {
    marginRight: "16px",
    "&:nth-last-child": {
      marginRight: "0px !important",
    },
  },
  resendOTPLink: {
    color: "#ffffff",
    width: "100%",
    marginBottom: "20px",
    textAlign: "right",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline",
  },
  resendForgotOTPLink: {
    color: "#ffffff",
    width: "100%",
    marginBottom: "20px",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
    "& a": {
      color: "#F28705",
    },
  },

  dailogBoxCustomStyle: {
    "& .MuiPaper-root": {
      maxWidth: "520px",
      width: "100%",
    },
  },
  successMessTitle: {
    color: "#06425C",
    fontSize: "30px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "37px",
    paddingTop: "5px",
  },
  successMessContent: {
    color: "#666666",
    fontSize: "20px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "24px",
    padding: "25px 0px 20px 0px",
  },
  wellComeText: {
    color: "#06374A",
    fontSize: "24px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "35px",
  },
  actionSection: {
    marginTop: "20px",
  },
  buttonStyle: {
    color: "#ffffff !important",
    padding: "5px 20px",
    fontSize: "16px",
    //marginRight: '15px',
    textTransform: "none",
    backgroundColor: "#06425C",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    "&:hover": {
      backgroundColor: "#F28705",
      borderColor: "#F28705",
    },
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    //padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const Register = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [succesPopupOpen, setSuccesPopupOpen] = useState(false);
  const [registerVerification, setRegisterVerification] = useState(true);
  const [maxWidthCP, setMaxWidthCP] = useState("sm");
  const [otpV, setOtpV] = useState({
    otp: "",
  });
  const initialValues = {
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confpassword: "",
    referralEmail: "",
    referralPhone: "",
    regLoading: false,
    errors: {
      fullname: "",
      password: "",
      email: "",
      registration: "",
      otp: "",
    },
    success: {
      registration: "",
      otp: "",
    },
  };

  const [state, setState] = useState(initialValues);

  const handleSuccessRegistration = () => {
    if (otpV.otp !== "") {
      setState({ ...state, regLoading: true });
      const form_data = new FormData();
      form_data.append("email", state.email);
      form_data.append("mobile", state.mobile);
      form_data.append("OTP_email", otpV.otp);
      // form_data.append("OTP_mobile", state.otp_mobile);

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

          if (res.data) {
            setState({ ...state, regLoading: false });
          }

          //   localStorage.setItem('companyId',this.props.route.location.invitee_data.fkCompanyId)
          if (props.route.location.invitee_data != undefined) {
            localStorage.setItem(
              "companyId",
              props.route.location.invitee_data.fkCompanyId
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
                        setState({ ...state, regLoading: false });
                        window.location.href =
                          "https://scdjv-stage.teknobuilt.com";
                      } else if (companyCode == "SCDJV") {
                        // this.action.openSnackbar("succesfully verified");
                        // this.action.showSnackbar;
                        // return "https://scdjv-pace.teknobuilt.com"
                        setState({ ...state, regLoading: false });
                        window.location.href =
                          "https://scdjv-pace.teknobuilt.com";
                      } else {
                        // if (
                        //   res.data &&
                        //   res.data.data.results.access_token !== ""
                        // ) {
                        setState({ ...state, regLoading: false });
                        setSuccesPopupOpen(true);
                        // }
                      }
                    }
                  }
                });
              })
              .catch((err) => {
                setState({ ...state, regLoading: false });
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
          if (err.response && err.response.data.status_code == 400) {
            setState({
              ...state,
              errors: { registration: err.response.data.error.error },
            });
            setState({ ...state, regLoading: false });
            setTimeout(() => {
              setState({ ...state, errors: { registration: "" } });
            }, 3000);
          }
        });
    } else {
      setState({
        ...state,
        errors: { otp: "Please fill the otp first" },
      });
      setTimeout(() => {
        setState({ ...state, errors: { otp: "" } });
      }, 3000);
    }
  };
  const handleSuccessPopoupClose = () => {
    setSuccesPopupOpen(false);
    props.route.history.push("/dashboard");
  };

  const routeChange = () => {
    setRegisterVerification(true);
  };

  const checkUpperCase = (string) => {
    let tempArr = [];
    const splitedVal = string.split("");
    splitedVal.forEach((element) => {
      if (
        element === element.toUpperCase() &&
        element !== element.toLowerCase()
      ) {
        tempArr.push(element);
      }
    });
    if (tempArr.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const hasNumber = /\d/;

  const checkHaveNumber = (string) => {
    return hasNumber.test(string);
  };

  const handelRegisterVerifi = (e) => {
    e.preventDefault();
    if (
      state.fullname &&
      state.password &&
      state.password === state.confpassword &&
      state.email &&
      checkUpperCase(state.password) &&
      checkHaveNumber(state.password) &&
      state.password.length > 8
    ) {
      setState({ ...state, regLoading: true });
      const form_data = new FormData();
      form_data.append("name", state.fullname);
      form_data.append("email", state.email);
      form_data.append("mobile", state.mobile);
      form_data.append("password", state.password);
      form_data.append("conf_pass", state.confpassword);

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

          setState({ ...state, regLoading: false });
          setState({
            ...state,
            success: { registration: "One step away for registration!!" },
          });
          setTimeout(() => {
            setState({ ...state, success: { registration: "" } });
            setRegisterVerification(false);
          }, 1500);
          if ("invitee_data" in props.route.location) {
            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/check-user/",
              method: "GET",
              params: {
                username: props.route.location.invitee_data.referralEmail,
              },
            })
              .then((res) => {
                console.log({ result: res });

                const invitee_user_id = res.data.data.results.user;

                console.log({ check_user: invitee_user_id });
                console.log({
                  invitee: props.route.location.invitee_data.users.id,
                });

                const invite_id = props.route.location.invitee_data.id;

                const input = new FormData();

                input.append(
                  "fkAppId",
                  props.route.location.invitee_data.fkAppId
                );
                input.append(
                  "fkGroupId",
                  props.route.location.invitee_data.fkGroupId
                );
                input.append(
                  "fkCompanyId",
                  props.route.location.invitee_data.fkCompanyId
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

          //   this.props.history.push('/login')
        })
        .catch((err) => {
          console.log({ error: err });
          setState({ ...state, regLoading: false });
          if (err.response && err.response.status == 400) {
            console.log(err.response.data.error_description);
            setState({
              ...state,
              errors: { registration: err.response.data.data.results.email },
            });
            setTimeout(() => {
              setState({ ...state, errors: { registration: "" } });
            }, 3000);
            // this.props.history.push('/register')
          }
        });
    } else {
      if (state.password && state.fullname && state.email) {
        if (state.password !== state.confpassword) {
          setState({
            ...state,
            errors: {
              registration: "Confirm password doesn't match",
            },
          });
          setTimeout(() => {
            setState({
              ...state,
              errors: {
                registration: "",
              },
            });
          }, 3000);
        } else if (
          checkUpperCase(state.password) === false ||
          checkHaveNumber(state.password) === false
        ) {
          setState({
            ...state,
            errors: {
              registration: "Please choose a strong password",
            },
          });
          setTimeout(() => {
            setState({
              ...state,
              errors: {
                registration: "",
              },
            });
          }, 3000);
        }
      } else if (
        state.email === "" ||
        state.password === "" ||
        state.fullname === ""
      ) {
        setState({
          ...state,
          errors: {
            registration:
              "Please fill the required fields (Fullname, Email, Password).",
          },
        });
        setTimeout(() => {
          setState({
            ...state,
            errors: {
              registration: "",
            },
          });
        }, 3000);
      }
    }
  };

  useEffect(() => {
    if ("invitee_data" in props.route.location) {
      setState({
        ...state,
        referralEmail: props.route.location.invitee_data.referralEmail,
        referralPhone: props.route.location.invitee_data.referralPhone,
        email: props.route.location.invitee_data.referralEmail,
      });
    }
  }, []);

  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          background: `url(${loginBBg}) no-repeat 100% 100%`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {registerVerification === true ? (
          <Paper
            elevation={3}
            className={clsx(classes.groupSection, classes.signupSection)}
          >
            <Grid item xs={12} sm={12} md={12} align="center">
              <img
                className={classes.pacelogonBox}
                src={PaceLogoImage}
                title="Pace OS"
                alt="Pace OS"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              align="center"
              className={classes.SignUpTopDetailSection}
            >
              <Typography variant="h1" className={classes.signUpTitle}>
                Sign Up
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              align="center"
              className={classes.custommblFild}
            >
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                //autoComplete="email"
                // autoFocus
                className={classes.inputCustmStyl}
                value={state.fullname}
                onChange={(e) =>
                  setState({
                    ...state,
                    fullname: e.target.value,
                    errors: { fullname: "" },
                  })
                }
              />
              {/* <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 29.89 29.89"
                >
                  <path
                    d="M25.513,4.377A14.945,14.945,0,0,0,4.377,25.513,14.945,14.945,0,0,0,25.513,4.377ZM7.492,25.826a7.568,7.568,0,0,1,14.905,0,13.165,13.165,0,0,1-14.905,0Zm2.7-12.757a4.752,4.752,0,1,1,4.752,4.752A4.757,4.757,0,0,1,10.193,13.069ZM23.915,24.611a9.334,9.334,0,0,0-5.426-6.092,6.5,6.5,0,1,0-7.087,0,9.332,9.332,0,0,0-5.426,6.091,13.194,13.194,0,1,1,17.939,0Zm0,0"
                    fill="#f2f2f2"
                  />
                </svg>
              </i> */}
              <img
                src="https://media.pace-os.com/icons/svg/user-name-24x24.svg"
                alt="Name"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              align="center"
              className={classes.custommblFild}
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
                  Boolean(state.referralEmail)
                    ? state.referralEmail
                    : state.email
                }
                onChange={(e) =>
                  setState({
                    ...state,
                    email: e.target.value,
                    errors: { email: "" },
                  })
                }
                type="text"
                disabled={Boolean(state.referralEmail) ? true : false}
              />
              {/* <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </i> */}
              <img
                src="https://media.pace-os.com/icons/svg/mail-24x24.svg"
                alt="Email"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              align="center"
              className={classes.custommblFild}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="mobile"
                label="Mobile"
                name="mobile"
                className={classes.inputCustmStyl}
                value={state.mobile}
                onChange={(e) =>
                  setState({
                    ...state,
                    mobile: e.target.value,
                  })
                }
                type="number"
              />
              {/* <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              </i> */}
              <img
                src="https://media.pace-os.com/icons/svg/mobile-number-24x24.svg"
                alt="Mobile"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.custommblFild}
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
                value={state.password}
                onChange={(e) =>
                  setState({
                    ...state,
                    password: e.target.value,
                    errors: { password: "" },
                  })
                }
              />
              {/* <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 35 33.254"
                >
                  <path
                    d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z"
                    transform="translate(0 0)"
                    fill="#f2f2f2"
                  />
                </svg>
              </i> */}
              <img
                src="https://media.pace-os.com/icons/svg/password-24x24.svg"
                alt="Password"
              />
            </Grid>
            <Grid item xs={12} md={12} className={classes.passwordPolicyStep}>
              <Typography variant="h6" className={classes.title}>
                Password policy:
              </Typography>
              <List>
                <ListItem>
                  <span
                    className={
                      state.password.length < 8
                        ? classes.progresBox
                        : classes.progresBoxSucess
                    }
                  ></span>
                  <ListItemText primary="Minimum 8 characters length." />
                </ListItem>
                <ListItem>
                  <span
                    className={
                      checkUpperCase(state.password) === true &&
                      state.password !== ""
                        ? classes.progresBoxSucess
                        : classes.progresBox
                    }
                  ></span>
                  <ListItemText primary="Must have at least one UPPERCASE character." />
                </ListItem>
                <ListItem>
                  <span
                    className={
                      checkHaveNumber(state.password) === true &&
                      state.newPassword !== ""
                        ? classes.progresBoxSucess
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
              className={classes.custommblFild}
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
                className={classes.inputCustmStyl}
                value={state.confpassword}
                onChange={(e) =>
                  setState({
                    ...state,
                    confpassword: e.target.value,
                    errors: { confpassword: "" },
                  })
                }
                //autoComplete="current-password"
              />
              {/* <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 35 33.254"
                >
                  <path
                    d="M2.869,32.023,0,29.154,16.831,12.323a9.331,9.331,0,1,1,5.846,5.846l-4.017,4.018-2.825.54-.546,2.83-3.8,3.8-2.1.234-.327,2.2-.24.24a4.215,4.215,0,0,1-5.954,0ZM20.528,4.184a7.246,7.246,0,0,0-1.552,7.993l.272.639L2.911,29.154l1.414,1.414a2.155,2.155,0,0,0,2.809.2l.455-3.055,2.959-.328,2.84-2.84.691-3.581,3.573-.682,4.531-4.532.639.272a7.273,7.273,0,1,0-2.3-11.839ZM23,8.878a3,3,0,1,1,3,3A3,3,0,0,1,23,8.878Z"
                    transform="translate(0 0)"
                    fill="#f2f2f2"
                  />
                </svg>
              </i> */}
              <img
                src="https://media.pace-os.com/icons/svg/password-24x24.svg"
                alt="Confirm password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.actionButtonSection}
            >
              <Link
                to="/"
                //onClick={this.toggle}
                className={classes.customWhitBTN}
                variant="contained"
              >
                Sign in instead
              </Link>
              <Button
                variant="contained"
                className={classes.customOrgnBTN}
                //onClick={this.handleContinue}
                onClick={handelRegisterVerifi}
              >
                {state.regLoading ? (
                  <CircularProgress size={18} style={{ color: "#fff" }} />
                ) : (
                  <>
                    Continue <ArrowRightAltIcon />
                  </>
                )}
              </Button>
              {state.success.registration ? (
                <p
                  style={{
                    color: "rgb(1, 223, 8)",
                    fontSize: 14,
                    textAlign: "center",
                    margin: "55px 0 0",
                  }}
                >
                  {state.success.registration}
                </p>
              ) : (
                ""
              )}
              {state.errors.registration ? (
                <p
                  style={{
                    color: "rgb(255, 29, 29)",
                    fontSize: 14,
                    textAlign: "center",
                    margin: "55px 0 0",
                  }}
                >
                  {state.errors.registration}
                </p>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            className={clsx(classes.groupSection, classes.signupSection)}
          >
            <Grid item xs={12} sm={12} md={12} align="center">
              <img
                className={classes.pacelogonBox}
                src={PaceLogoImage}
                title="Pace OS"
                alt="Pace OS"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              align="center"
              className={classes.SignUpTopDetailSection}
            >
              <Typography variant="h1" className={classes.signUpTitle}>
                Verification
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.otpFieldstyle}
            >
              <Typography component="body1" variant="body1">
                Enter the 6-digit OTP sent to your Email:{" "}
                {state.email.slice(0, 4)}*****
                {state.email.slice(-4)}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.otpFieldstyle}
            >
              <OtpInput
                className={clsx(
                  classes.otpFieldstyle,
                  classes.inputCustmStylOTP
                )}
                onChange={(val) => {
                  setOtpV({ otp: val });
                }}
                value={otpV.otp}
                numInputs={6}
                otpType="number"
                name="otp"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Typography
                component="body1"
                variant="body1"
                className={classes.resendForgotOTPLink}
              >
                {" "}
                Didn't received a code? <Link to="#"> Resend OTP</Link>
              </Typography>
              <Typography
                component="body1"
                variant="body1"
                className={classes.resendForgotOTPLink}
              >
                {" "}
                Your OTP will expire in 10 minutes.
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              className={classes.actionButtonSection}
            >
              <Button
                variant="contained"
                className={classes.customWhitBTN}
                onClick={() => routeChange()}
              >
                Back
              </Button>
              <Button
                variant="contained"
                className={classes.customOrgnBTN}
                onClick={handleSuccessRegistration}
              >
                {state.regLoading ? (
                  <CircularProgress size={18} style={{ color: "#fff" }} />
                ) : (
                  <>
                    Continue <ArrowRightAltIcon />
                  </>
                )}
              </Button>

              {state.errors.registration ? (
                <p
                  style={{
                    color: "rgb(255, 29, 29)",
                    fontSize: 14,
                    textAlign: "center",
                    margin: "55px 0 0",
                  }}
                >
                  {state.errors.registration}
                </p>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
        )}
      </Grid>

      {/* Success welcome popup */}
      <Dialog
        maxWidth={maxWidthCP}
        open={succesPopupOpen}
        // onClose={handleSuccessPopoupClose}
        className={classes.dailogBoxCustomStyle}
      >
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.successMessgBox}
              >
                <Typography variant="body1" align="center">
                  <img
                    src="https://media.pace-os.com/icons/svg/done-72x72.svg"
                    alt="Thanks"
                  />
                </Typography>
                <Typography
                  variant="h2"
                  className={classes.successMessTitle}
                  align="center"
                >
                  Congratulations
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.successMessContent}
                  align="center"
                >
                  Account has been created successfully
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.wellComeBox}
              >
                <Typography
                  variant="h6"
                  className={classes.wellComeText}
                  align="center"
                >
                  Welcome to PACE
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="center"
                className={classes.actionSection}
              >
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.buttonStyle}
                  onClick={handleSuccessPopoupClose}
                >
                  OK
                </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* End success welcome popup */}

      <Grid container>
        <Grid item md={12} xs={12} className={classes.footerCopyRight}>
          <p>Copyright © 2022, Teknobuilt Ltd. | All rights are reserved</p>
        </Grid>
      </Grid>
    </Fragment>
  );
};

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
