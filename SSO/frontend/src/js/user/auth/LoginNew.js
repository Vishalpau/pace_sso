//import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Popper,
  CircularProgress,
} from "@material-ui/core";
import loginBBg2 from "../../../../public/static/images/logbeforebg2.png";
import { UserActions } from "../UserActions";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import PaceLogoImage from "../../../../../static/public/images/LoginImg/PACEWhite.png";
// import PaceLogoImageCompany from "../../../../../static/public/js/static/public/images/LoginImg/PaceLogoImageColor.png";
// import CCZJVLogo from "./img/CCZJVLogo.png";
// import NationalThermalPowerLogo from "./img/NationalThermalPowerLogo.png";
// import TeknobuiltLogo from "./img/TeknobuiltLogo.png";
// import RiddellLogo from "./img/RiddellLogo.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import queryString from "query-string";

// import "./BeforeLoginCSS.css";
// import LoginSample from './LoginSample';

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import OtpInput from "react-otp-input";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  groupSection: {
    padding: "28px 35px 31px 35px",
  },
  loginSection: {
    maxWidth: "415px",
    background: "rgba(6,66,92, 0.95)",
    borderRadius: "10px",
    width: "100%",
    border: "1px solid #FFFFFF",
    position: "relative",
  },
  companySelection: {
    maxWidth: "800px",
    background: "rgba(255,255,255, 0.65)",
    borderRadius: "10px",
    width: "100%",
    border: "1px solid #FFFFFF",
  },
  pacelogonBox: {
    marginBottom: "30px",
  },
  companyLogoIcon: {
    width: "auto",
    height: "60px",
  },
  loginTopDetailSection: {
    // marginBottom: "20px",
  },
  loginTitle: {
    fontFamily: "xolonium",
    color: "#F28705",
    fontSize: "22px",
    lineHeight: "22px",
  },
  welcomeText: {
    fontFamily: "Montserrat-Medium",
    color: "#ffffff",
    fontSize: "16px",
    lineHeight: "19px",
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
  custommblFild: {
    position: "relative",
    marginBottom: "5px",
    // "& > i": {
    //     position: 'absolute',
    //     left: '10px',
    //     top: '30px',
    //     '& svg': {
    //         '& path': {
    //             fill: '#92A6B6',
    //         },
    //     },
    // },
    "& > img": {
      position: "absolute",
      left: "10px",
      top: "32px",
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
      padding: "18px 14px 18.5px 45px",
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
  customPassFild: {
    position: "relative",
    margin: "25px 0px 8px 0px",
    "& > i": {
      position: "absolute",
      left: "12px",
      top: "32px",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 44px",
      borderColor: "transparent",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 0px",
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
      padding: "18.5px 14px 18.5px 15px",
      fontFamily: "Montserrat-Medium",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      backgroundColor: "#ffffff",
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
  customSecurityFild: {
    position: "relative",
    margin: "15px 0px 8px 0px",
    "& > i": {
      position: "absolute",
      left: "12px",
      top: "32px",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 44px",
      borderColor: "transparent",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 0px",
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
      padding: "18.5px 14px 18.5px 15px",
      fontFamily: "Montserrat-Medium",
      backgroundColor: "#ffffff",
      borderRadius: "7px",
    },
    "& .MuiOutlinedInput-adornedEnd": {
      backgroundColor: "#ffffff",
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
  actionButtonSectionSecurity: {
    paddingTop: "22px",
    "& button:nth-child(1)": {
      width: "auto",
      marginRight: "17px",
      // float: 'left',
    },
    "& button:nth-child(2)": {
      width: "auto",
      marginRight: "18px",
      // float: 'right',
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
  customOrgnBTNFullWidth: {
    width: "100%",
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
    width: "100%",
    float: "left",
    backgroundColor: "#ffffff",
    borderRadius: "36px",
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "18px",
    textTransform: "initial",
    color: "#06425C",
    padding: "10px",
    // marginTop: '5px',
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff",
    },
  },
  orBox: {
    color: "#E4E4E4",
    backgroundColor: "transparent",
    border: "1px solid #E4E4E4",
    fontSize: "12px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "15px",
    width: "32px",
    height: "32px",
    margin: "15px auto",
    display: "inline-flex",
  },
  userLogDetail: {
    margin: theme.spacing(3, 0, 2, 0),
    "& h5": {
      color: "#16384F",
      fontSize: "15px",
      lineHeight: "19px",
      display: "inline-block",
      padding: "3px 15px",
      borderRadius: "18px",
      border: "1px solid #E3E3E3",
      backgroundColor: "#F2F2F2",
      "& svg": {
        verticalAlign: "middle",
        marginRight: "2px",
        color: "#054D69",
      },
    },
  },
  rememberCheck: {
    width: "50%",
    float: "left",
    margin: "0px",
    "& .MuiFormControlLabel-label": {
      color: "#ffffff",
      fontFamily: "Montserrat-Medium",
      fontSize: "14px",
      lineHeight: "18px",
    },
    "& .MuiCheckbox-root": {
      color: "#ffffff",
      padding: "0px 10px 0px 0px",
    },
  },
  forgotPassLink: {
    color: "#ffffff",
    width: "50%",
    float: "left",
    margin: "0px",
    textAlign: "right",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    lineHeight: "18px",
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
  questionInputLabel: {
    color: "#ffffff",
    width: "100%",
    marginBottom: "10px",
    textAlign: "left",
    fontFamily: "Montserrat-Regular",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
  },
  otherChangOTP: {
    color: "#ffffff",
    width: "100%",
    marginBottom: "10px",
    marginTop: "25px",
    textAlign: "center",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
  },
  anotherMethodLink: {
    color: "#ffffff",
    width: "50%",
    marginBottom: "20px",
    textAlign: "left",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
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
  selectCompTitle: {
    color: "#06425C",
    fontSize: "22px",
    fontFamily: "xolonium",
    lineHeight: "22px",
  },
  companyLogo: {
    padding: "16px 16px 0px 16px",
  },
  companyTag: {
    fontSize: "16px",
    color: "#06425C",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "21px",
  },
  companyName: {
    color: "#666666",
    fontSize: "16px",
    fontFamily: "Montserrat-Regular",
    lineHeight: "21px",
    "& span": {
      fontFamily: "Montserrat-Medium",
    },
  },
  companyCardBox: {
    borderRadius: "10px",
    "& a": {
      border: "1px solid #ffffff",
      display: "inline-block",
      width: "100%",
      float: "left",
      position: "relative",
      borderRadius: "10px",
      "&:hover": {
        borderColor: "#F28705",
      },
    },
  },
  companyListBox: {
    padding: "0px 16px 12px 16px",
    overflow: "overlay",
  },
  companyList: {
    maxHeight: "370px",
  },
  alertMessageSection: {
    position: "absolute",
    width: "415px",
    left: "0px",
    bottom: "-75px",
    borderRadius: "10px",
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
  inputCustmStylOTP: {
    marginRight: "16px",
    "&:nth-last-child": {
      marginRight: "0px !important",
    },
  },
  securityQarea: {
    float: "left",
    width: "100%",
    textAlign: "center",
    paddingBottom: "20px",
    "& button": {
      float: "none !important",
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [otpV, setOtpV] = useState({
    otp: "",
  });

  const initState = {
    email: "",
    password: "",
    otp: "",
    touched: {},
    referralEmail: "",
    referralPhone: "",

    errors: {
      email: "",
      password: "",
      otp: "",
      adError: "",
      newPassword: "",
      questionOne: "",
    },
    success: {
      newPassword: "",
      otp: "",
      questionOne: "",
    },
    AdcompanyId: undefined,
    selectedAdCompany: "",
    response_type: "",
    next: "",
    companies: [],
    emailLoading: false,
    passwordLoading: false,
    result: {},
    newPassword: "",
    confNewPassword: "",
    securityQuestOne: "",
    securityQuestOneId: "",
    securityQuestTwo: "",
    securityQuestTwoId: "",
  };
  const [state, setState] = useState(initState);

  const handleChangeOtp = (prop) => (value) => {
    setOtpV({ ...otpV, [prop]: value });
  };

  const [emailLogin, setEmailLogin] = useState(true);
  const [loginOTP, setLoginOTP] = useState(true);
  const [loginAD, setLoginAD] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(true);
  const [securityQuestion, setSecurityQuestion] = useState(true);
  const [reCreatePassword, setReCreatePassword] = useState(true);
  const [securityQuestionNext, setSecurityQuestionNext] = useState(true);
  const [cookieData, setCookieData] = useState({
    username: "",
    password: "",
  });

  const [selectCompany, setSelectCompany] = useState(true);

  const [remember, setRemember] = useState();

  const [securityErrorMessage, setSecurityErrorMessage] = useState("");
  const [isLoadingSecurtyQuiz, setIsLoadingSecurtyQuiz] = useState(false);

  const action = new UserActions(props.dispatch);

  useEffect(() => {
    if ("logincheck" in props.route.location) {
      setEmailLogin(true);
      setState({
        ...state,
        email: props.route.location.email.toLowerCase().trim(),
        password: props.route.location.password,
      });
    }

    if ("invitee_data" in props.route.location) {
      setState({
        ...state,
        referralEmail: props.route.location.invitee_data.referralEmail
          .toLowerCase()
          .trim(),
        referralPhone: props.route.location.invitee_data.referralPhone,
        email: props.route.location.invitee_data.referralEmail,
      });
    }
    const values = queryString.parse(props.route.location.search);

    let params = new URLSearchParams(props.route.location.search);

    let query = params.get("next");
    let vars = new URLSearchParams(query);
    let response_type = vars.get("response_type");

    const code = values.code;
    const next = values.next;
    setState({ ...state, next: next, response_type: response_type });
    console.log({ client_id: values.client_id }, document.cookie, "cookie");

    const cookies = document.cookie.split(";");
    let temparr = { username: "", password: "" };
    cookies.forEach((element) => {
      if (element.includes("myusername")) {
        // temparr.push(element.trim());
        temparr.username = element.split("=")[1].trim();
      } else if (element.includes("mypassword")) {
        temparr.password = element.split("=")[1].trim();
      }
    });
    if (temparr.username !== "" && temparr.password !== "") {
      setCookieData({ username: temparr.username, password: temparr.password });
      return;
    } else if (temparr.username !== "") {
      setCookieData({ username: temparr.username, password: "" });
    }
  }, []);

  useEffect(() => {
    if (cookieData.username !== "") {
      setState({ ...state, email: cookieData.username });
    }
  }, [cookieData]);

  useEffect(() => {
    if (cookieData.username !== "" && state.email === cookieData.username) {
      setEmailLogin(false);
      setRemember(true);
      handelEmailLogin();
    }
  }, [state.email]);

  useEffect(() => {
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/companies/getadcompanies/",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.data.results, "companies");
        setState({ ...state, companies: res.data.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loginAD]);

  const handelEmailLogin = (e) => {
    if (state.email !== cookieData.username || cookieData.username === "") {
      e.preventDefault();
    }
    if (state.email) {
      setState({ ...state, emailLoading: true });
      //   setEmailLogin(false);
      axios({
        url: process.env.API_URL + process.env.API_VERSION + "/user/get-user/",
        method: "GET",
        params: {
          username: state.email,
        },
      })
        .then((res) => {
          const values = queryString.parse(props.route.location.search);

          localStorage.setItem(
            "verifiedUserId",
            JSON.stringify(res.data.data.results.userId)
          );

          if (values.next) {
            const client_id = queryString.parse(values.next)[
              "/api/v1/user/auth/authorize/?client_id"
            ];

            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/check_subscription_with_clientId/",
              method: "GET",
              params: {
                client_id: client_id,
                username: state.email,
              },
            }).then((res) => {
              setEmailLogin(false);
              setState({ ...state, emailLoading: false });
            });
          } else {
            setEmailLogin(false);
            setState({ ...state, emailLoading: false });
          }
          setEmailLogin(false);
        })
        .catch((err) => {
          //
          const errData = err.response.data.error.error;

          setState({
            ...state,
            errors: {
              email: errData,
            },
          });
        });
    } else {
      setState({ ...state, errors: { email: "Enter a valid email ID" } });
    }
  };

  const getClassicOnlySub = async () => {
    const companyId = localStorage.getItem("companyId");

    if (companyId != undefined) {
      let classic_data = await axios
        .get(
          process.env.API_URL +
            process.env.API_VERSION +
            "/companies/" +
            companyId +
            "/subscriptions/"
        )
        .then(function (res) {
          const applications = res.data.data.results;
          return applications;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (classic_data.some((subscription) => subscription.appCode === "gis")) {
        if (
          classic_data.filter((subscription) => subscription.appCode != "gis")
            .length == 1
        ) {
          const classic_sub = classic_data
            .filter((subscription) => subscription.appCode != "gis")
            .map((subscription) => subscription);
          if (classic_sub[0].appCode == "classic") {
            localStorage.setItem("pace10hexagon", true);
          }
        }
      } else {
        if (classic_data.length == 1) {
          const classic_sub = classic_data.map((subscription) => subscription);
          if (classic_sub[0].appCode == "classic") {
            localStorage.setItem("pace10hexagon", true);
          }
        }
      }
    }
  };

  const loginUserUpdated = async (e) => {
    e.preventDefault();
    setState({ ...state, passwordLoading: true });
    if (state.password && otpV.otp === "" && loginOTP) {
      const values = queryString.parse(props.route.location.search);

      if (!emailLogin) {
        if ("invitee_data" in props.route.location) {
          const invitee_user_id = props.route.location.invitee_data.users.id;
          const invite_id = props.route.location.invitee_data.id;

          const input = new FormData();

          input.append("fkAppId", props.route.location.invitee_data.fkAppId);
          input.append(
            "fkGroupId",
            props.route.location.invitee_data.fkGroupId
          );
          input.append(
            "fkCompanyId",
            props.route.location.invitee_data.fkCompanyId
          );
          input.append("active", true);

          await axios({
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
                  console.log({ err: err });
                });
            })
            .catch((err) => {
              console.log({ err: err });
            });
        }

        axios({
          url:
            process.env.API_URL + process.env.API_VERSION + "/user/auth/token/",
          method: "POST",
          data: {
            username: state.email,
            password: state.password,
            client_id: process.env.client_id_client,
            client_secret: process.env.client_secret_client,
            grant_type: "password",
          },
        })
          .then((res) => {
            if (values.next) {
              const token = res.data.access_token;
              var fullToken = "Bearer " + token;

              axios.defaults.headers.common["Authorization"] = fullToken;
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("userdata", JSON.stringify(res.data));
              localStorage.setItem("user", res.data.user.id);
              localStorage.setItem("name", res.data.user.name);
              localStorage.setItem("avatar", res.data.user.avatar);
              window.location.href = values.next;

              return;
            } else {
              // const companies=res.data.data.results.companies
              const token = res.data.access_token;
              var fullToken = "Bearer " + token;
              axios.defaults.headers.common["Authorization"] = fullToken;

              setState({ ...state, companies: res.data.user.companies });
              const companies = state.companies;

              if (props.route.location.invitee_data != undefined) {
                action.login(res.data);
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
                  .then((res) => {
                    const subscriptions =
                      res.data.data.results.data.companies[0].subscriptions;

                    subscriptions.map((subscription) => {
                      if (subscription.appCode == "accounts") {
                        localStorage.setItem(
                          "ssoRole",
                          subscription.roles[0].name
                        );
                      }
                    });
                  })
                  .catch((err) => {
                    console.log({ error: err });
                  });
              }
              if (state.response_type != "code") {
                if (res.data.user.companies.length > 1) {
                  action.login(res.data);
                  setState({ ...state, passwordLoading: false });
                  props.route.history.push({
                    pathname: "/selectsinglecompany",
                    user_data: res.data,
                    email: state.email,
                    password: state.password,
                    companies_data: res.data.user.companies,
                  });
                } else {
                  if (res.data.user.companies != undefined) {
                    localStorage.setItem(
                      "companyId",
                      res.data.user.companies[0].companyId
                    );
                    localStorage.setItem(
                      "companyCode",
                      JSON.stringify(res.data.user.companies[0])
                    );
                    getClassicOnlySub();
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
                      .then((res) => {
                        const subscriptions =
                          res.data.data.results.data.companies[0].subscriptions;

                        subscriptions.map((subscription) => {
                          if (subscription.appCode == "accounts") {
                            localStorage.setItem(
                              "ssoRole",
                              subscription.roles[0].name
                            );
                          }
                        });
                      })
                      .catch((err) => {
                        console.log({ error: err });
                      });
                  }

                  if (res.data.user.companies[0].projects.length <= 1) {
                    action.login(res.data);
                    props.route.history.push({ pathname: "/dashboard" });
                  } else {
                    action.login(res.data);
                    props.route.history.push({ pathname: "/dashboard" });
                  }
                }
              }
            }
          })
          .catch((err) => {
            if (err.response && err.response.status == 400) {
              setState({
                ...state,
                errors: { password: err.response.data.error_description },
              });
            }
          });
      }

      // this.setState({ loading: true });
    } else if (state.password === "" && loginOTP) {
      setState({
        ...state,
        errors: { password: "Please enter your password" },
      });
    }

    if (otpV.otp && !loginOTP) {
      const values = queryString.parse(props.route.location.search);
      const code = values.code;
      const next = values.next;
      const client_id = values.client_id;

      await axios({
        url: process.env.API_URL + process.env.API_VERSION + "/user/login/",
        method: "POST",
        data: {
          username: state.email,
          authOTP: otpV.otp,
          client_id: process.env.client_id_client,
          client_secret: process.env.client_secret_client,
        },
      })
        .then((res) => {
          if ("invitee_data" in props.route.location) {
            const invitee_user_id = props.route.location.invitee_data.users.id;
            const invite_id = props.route.location.invitee_data.id;

            const input = new FormData();

            input.append("fkAppId", props.route.location.invitee_data.fkAppId);
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
          }

          if (values.next) {
            const token = res.data.data.results.access_token;
            var fullToken = "Bearer " + token;
            axios.defaults.headers.common["Authorization"] = fullToken;
            window.location.href = values.next;
            localStorage.setItem("token", res.data.data.results.access_token);
            localStorage.setItem(
              "userdata",
              JSON.stringify(res.data.data.results)
            );
            localStorage.setItem("user", res.data.data.results.user.id);
            localStorage.setItem("name", res.data.data.results.user.name);
            localStorage.setItem("avatar", res.data.data.results.user.avatar);
            // action.login(res.data.data.results)
            // action.openSnackbar("Welcome! Login successful")
            // action.showSnackbar
          } else {
            // const companies=res.data.data.results.companies
            const token = res.data.data.results.access_token;
            var fullToken = "Bearer " + token;
            axios.defaults.headers.common["Authorization"] = fullToken;

            setState({
              ...state,
              companies: res.data.data.results.user.companies,
            });
            const companies = res.data.data.results.user.companies;
            // action.login(res.data.data.results)

            if (props.route.location.invitee_data != undefined) {
              action.login(res.data.data.results);
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
                .then((res) => {
                  const subscriptions =
                    res.data.data.results.data.companies[0].subscriptions;

                  subscriptions.map((subscription) => {
                    if (subscription.appCode == "accounts") {
                      localStorage.setItem(
                        "ssoRole",
                        subscription.roles[0].name
                      );
                    }
                  });
                })
                .catch((err) => {
                  console.log({ error: err });
                });
            }

            if (state.response_type != "code") {
              if (companies.length > 1) {
                action.login(res.data.data.results);
                setState({ ...state, passwordLoading: false });
                this.props.route.history.push({
                  pathname: "/selectsinglecompany",
                  user_data: res.data,
                  email: this.state.email,
                  password: this.state.password,
                  companies_data: companies,
                });
              } else {
                if (companies != undefined) {
                  localStorage.setItem("companyId", companies[0].companyId);
                  localStorage.setItem(
                    "companyCode",
                    JSON.stringify(companies[0])
                  );
                  // this.getClassicOnlySub();
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
                    .then((res) => {
                      const subscriptions =
                        res.data.data.results.data.companies[0].subscriptions;

                      subscriptions.map((subscription) => {
                        if (subscription.appCode == "accounts") {
                          localStorage.setItem(
                            "ssoRole",
                            subscription.roles[0].name
                          );
                        }
                      });
                    })
                    .catch((err) => {
                      console.log({ error: err });
                    });
                }
                if (companies[0].projects.length <= 1) {
                  action.login(res.data.data.results);

                  props.route.history.push({ pathname: "/dashboard" });
                } else {
                  action.login(res.data.data.results);

                  props.route.history.push({ pathname: "/dashboard" });
                }
              }
            }
          }
        })
        .catch((err) => {
          if (err.response && err.response.data.status_code == 400) {
            setState({
              ...state,
              errors: { otp: err.response.data.error.error },
            });
            setTimeout(() => {
              setState({ ...state, errors: { otp: "" } });
            }, 1500);
          }
        });

      // this.setState({ loading: true });
    } else if (!loginOTP && otpV.otp === "") {
      setState({
        ...state,
        errors: { otp: "Enter the OTP first." },
      });
      setTimeout(() => {
        setState({
          ...state,
          errors: { otp: "" },
        });
      }, 2000);
    }
  };

  const handleContinue = () => {
    const companyId = state.AdcompanyId;
    console.log(companyId);

    if (state.AdcompanyId !== "" || state.AdcompanyId !== undefined) {
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/setADconfig/" +
          companyId +
          "/",
        method: "GET",
      })
        .then((res) => {
          console.log({ result: res });
          localStorage.setItem("companyId", state.AdcompanyId);
          window.location.href =
            process.env.API_URL + process.env.API_VERSION + "/sign_in";
        })
        .catch((err) => {
          console.log({ error: err });
          if (err.response && err.response.status == 400) {
            setState({
              ...state,
              errors: { adError: "Azure AD has not set up for the company" },
            });
          }
        });
    } else {
      this.setState(
        {
          touched: {
            companyId: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  const handleClickOTP = async () => {
    setState({ ...state, otp: "", errors: { otp: "" } });
    const input = new FormData();
    if (isNaN(state.email)) {
      input.append("email", state.email);
      input.append("receiver", "forgot-password");
    } else {
      input.append("mobile", state.email);
      input.append("receiver", "forgot-password");
    }
    await axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/send-otp/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        setState({
          ...state,
          result: res.data.data.results,
          success: { otp: "OTP sent successfully." },
        });
        setTimeout(() => {
          setState({
            ...state,
            success: { otp: "" },
          });
        }, 2000);
      })
      .catch((err) => {
        console.log({ error_Desc: err });
        if (err.response && err.response.status == 400) {
          setState({
            ...state,
            result: res.data.data.results,
            errors: { otp: "OTP sent successfully." },
          });
          setTimeout(() => {
            setState({
              ...state,
              errors: { otp: "" },
            });
          }, 2000);
          return;
        }
      });
  };

  const handleClickVerify = async (e) => {
    e.preventDefault();

    if (otpV.otp !== "") {
      const form_data = new FormData();
      if (isNaN(state.email)) {
        form_data.append("email", state.email);
        form_data.append("authOTP", otpV.otp);
      } else {
        form_data.append("email", state.mobile);
        form_data.append("authOTP", otpV.otp);
      }
      const url =
        process.env.API_URL + process.env.API_VERSION + "/user/verifyotp/";
      await axios
        .put(url, form_data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log({ result: res });
          // this.setState({ enterPasswordPage: false });
          setState({ ...state, success: { otp: "OTP Verfied successfully." } });
          setTimeout(() => {
            setSecurityQuestion(false);
            setReCreatePassword(false);
            setState({ ...state, success: { otp: "" } });
          }, 1500);
        })
        .catch((err) => {
          console.log({ error: err });
          if (err.response && err.response.status == 400) {
            console.log(err.response.data.error);
            setState({
              ...state,
              errors: { otp: err.response.data.error.error },
            });
            setTimeout(() => {
              setState({ ...state, errors: { otp: "" } });
            }, 1500);
          }
        });
    } else {
      setState({ ...state, errors: { otp: "Enter the OTP first." } });
      setTimeout(() => {
        setState({ ...state, errors: { otp: "" } });
      }, 2000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      checkUpperCase(state.newPassword) === true &&
      checkHaveNumber(state.newPassword) === true &&
      state.newPassword.length > 8
    ) {
      if (state.newPassword === state.confNewPassword) {
        const input = new FormData();

        if (isNaN(state.email)) {
          input.append("email", state.email);
        } else {
          input.append("mobile", state.email);
        }
        if (otpV.otp !== "" && forgotPassword === false) {
          input.append("authOTP", otpV.otp);
        } else {
          input.append("authOTP", null);
        }
        input.append("password", state.newPassword);

        const url =
          process.env.API_URL + process.env.API_VERSION + "/user/resetpass/";
        await axios
          .put(url, input, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            setState({
              ...state,
              success: { newPassword: "Password changed succesfully!!" },
            });
            setTimeout(() => {
              setState({
                ...state,
                success: { newPassword: "" },
              });
              // setEmailLogin(true);
              // window.location.reload();
            }, 2000);
          })
          .catch((err) => {
            console.log({ error: err });
            // this.setState({ loading: false });
            if (err.response && err.response.status == 400) {
              // this.setState({ enterPasswordPage: false });
              console.log(err.response.data.error.error);
              setState({
                ...state,
                errors: { newPassword: err.response.data.error.error },
              });
              setTimeout(() => {
                setState({
                  ...state,
                  errors: { newPassword: "" },
                });
                // setEmailLogin(true);
                // window.location.reload();
              }, 2000);
            }
          });
      } else {
        setState({
          ...state,
          errors: { newPassword: "Confirm Password didn't match." },
        });
        setTimeout(() => {
          setState({
            ...state,
            errors: { newPassword: "" },
          });
        }, 2000);
      }
    } else {
      setState({
        ...state,
        errors: { newPassword: "Please create a strong password." },
      });
      setTimeout(() => {
        setState({
          ...state,
          errors: { newPassword: "" },
        });
      }, 2000);
    }
  };

  const handelOTPLogin = (e) => {
    setLoginOTP(false);

    setTimeout(() => {
      handleClickOTP();
    }, 200);
  };
  const handelADLogin = (e) => {
    setLoginAD(false);
  };
  const handelForgotPassword = (e) => {
    setForgotPassword(false);

    setTimeout(() => {
      handleClickOTP();
    }, 200);
  };
  const handelSelectCompany = (e) => {
    setSelectCompany(false);
  };
  const verifiedUserId = JSON.parse(localStorage.getItem("verifiedUserId"));
  const handelSecurityQ = (e) => {
    setIsLoadingSecurtyQuiz(true);
    setSecurityQuestion(false);
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        verifiedUserId +
        "/securityquestions/?show=random",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.data.results, "companies");
        setState({
          ...state,
          securityQuestOne: res.data.data.results.question,
          securityQuestOneId: res.data.data.results.id,
        });
        setIsLoadingSecurtyQuiz(false);
      })
      .catch((err) => {
        setIsLoadingSecurtyQuiz(false);
        setSecurityErrorMessage(
          "There was a problem while fetching the security questions"
        );
        console.log(err.response.data.error, "errorrrr");
        if (err.response && err.response.status == 400) {
          setSecurityErrorMessage(err.response.data.error.error);
        }
      });
  };

  const handleSwapQuestion = (questionView) => {
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        verifiedUserId +
        "/securityquestions/?show=random",
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.data.results, "companies");
        if (questionView === "first") {
          setState({
            ...state,
            securityQuestOne: res.data.data.results.question,
            securityQuestOneId: res.data.data.results.id,
          });
        } else if (questionView === "second") {
          setState({
            ...state,
            securityQuestTwo: res.data.data.results.question,
            securityQuestTwoId: res.data.data.results.id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function CountDown({ minutes = 0, seconds = 0 }) {
    const [time, setTime] = React.useState({
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
    });

    const tick = () => {
      if (time.minutes == 0 && time.seconds == 0) setOver(true);
      else if (time.minutes == 0 && time.seconds == 0)
        setTime({
          minutes: 59,
          seconds: 59,
        });
      else if (time.seconds == 0)
        setTime({
          minutes: time.minutes - 1,
          seconds: 59,
        });
      else
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1,
        });
    };

    React.useEffect(() => {
      let timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    return (
      <span>{`${time.minutes.toString().padStart(2, "0")}:${time.seconds
        .toString()
        .padStart(2, "0")}`}</span>
    );
  }

  const handelSecurityQuestionNext = async (e) => {
    if (values.password !== "") {
      await axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          verifiedUserId +
          "/securityquestions/" +
          state.securityQuestOneId +
          "/answer/validate/",
        method: "POST",
        data: { answer: values.password },
      })
        .then((res) => {
          setState({
            ...state,
            success: { questionOne: "Answer matched with originally entered." },
          });
          setTimeout(() => {
            setSecurityQuestionNext(false);
            setState({ ...state, success: { questionOne: "" } });
            setValues({ password: "", showPassword: false });
            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/" +
                verifiedUserId +
                "/securityquestions/?show=random",
              method: "GET",
            })
              .then((res) => {
                console.log(res.data.data.results, "companies");
                setState({
                  ...state,
                  securityQuestTwo: res.data.data.results.question,
                  securityQuestTwoId: res.data.data.results.id,
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }, 1500);
        })
        .catch((err) => {
          setState({
            ...state,
            errors: {
              questionOne: "Answer does not match with originally entered.",
            },
          });
          setTimeout(() => {
            setSecurityQuestionNext(false);
            setState({ ...state, errors: { questionOne: "" } });
          }, 1500);
          console.log({ err: err });
        });
    } else {
      setState({ ...state, errors: { questionOne: "Please fill the answer" } });
      setTimeout(() => {
        setState({ ...state, errors: { questionOne: "" } });
      }, 1500);
    }
  };
  const handelReCreatePass = async (e) => {
    if (values.password !== "") {
      await axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          verifiedUserId +
          "/securityquestions/" +
          state.securityQuestTwoId +
          "/answer/validate/",
        method: "POST",
        data: { answer: values.password },
      })
        .then((res) => {
          setState({
            ...state,
            success: { questionOne: "Answer matched with originally entered." },
          });
          setTimeout(() => {
            setReCreatePassword(false);
            setState({ ...state, success: { questionOne: "" } });
            setValues({ password: "", showPassword: false });
          }, 1500);
        })
        .catch((err) => {
          setState({
            ...state,
            errors: {
              questionOne: "Answer does not match with originally entered.",
            },
          });
          setTimeout(() => {
            setSecurityQuestionNext(false);
            setState({ ...state, errors: { questionOne: "" } });
          }, 1500);
          console.log({ err: err });
        });
    } else {
      setState({ ...state, errors: { questionOne: "Please fill the answer" } });
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleCheckTick = (event) => {
    if (event.target.checked === true) {
      setRemember(true);
      document.cookie =
        "myusername=" + state.email + ";path=" + process.env.API_URL;
      document.cookie =
        "mypassword=" + state.password + ";path=" + process.env.API_URL;
    } else if (event.target.checked === false) {
      setRemember(false);
      document.cookie = "myusername=" + "" + ";path=" + process.env.API_URL;
      document.cookie = "mypassword=" + "" + ";path=" + process.env.API_URL;
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const companySelection = [
    { title: "NTPC" },
    { title: "SCDJV" },
    { title: "Golden pass" },
  ];

  const routeChange = () => {
    history.goBack();
  };
  //history.goBack()

  // const isNumber = e.target.value.match(/^[0-9]*$/);
  // setIsMobileNo(isNumber ? true : false);
  const [isMobileNo, setIsMobileNo] = useState(false);

  const onValueChange = (e) => {
    if (e.target.id === "email") {
      const isNumber =
        (e?.target?.value && e?.target?.value?.match(/^[0-9]*$/)) || false;
      setIsMobileNo(isNumber ? true : false);
      //console.log("🚀 ~ file: Login.js ~ line 677 ~ onValueChange ~ isNumber", e.target.value)
      setState({
        ...state,
        [e.target.id]: e.target.value.toLowerCase().trim(),
        errors: {},
      });
    } else {
      setState({
        ...state,
        [e.target.id]: e.target.value,
        errors: {},
      });
    }
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

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{
          background: `url(${loginBBg2}) no-repeat 100% 100%`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {selectCompany === false ? (
          <>
            <Paper
              elevation={3}
              className={classNames(
                classes.groupSection,
                classes.companySelection
              )}
            >
              <Grid item xs={12} sm={12} md={12} align="center">
                <img
                  className={classes.pacelogonBox}
                  src={PaceLogoImageCompany}
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
                className={classes.loginTopDetailSection}
              >
                <Typography
                  variant="h1"
                  gutterBottom
                  className={classes.selectCompTitle}
                >
                  SELECT COMPANY
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={classes.companyListBox}
              >
                <Grid container spacing={3} className={classes.companyList}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.companyCardBox}>
                      <Link to="">
                        <CardMedia className={classes.companyLogo}>
                          <img
                            className={classes.companyLogoIcon}
                            // src={CCZJVLogo}
                            title="Pace OS"
                            alt="Pace OS"
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography className={classes.companyTag}>
                            CCZJV GOLDEN PASS
                          </Typography>
                          <Typography className={classes.companyName}>
                            Company: <span>GOLDENPASS</span>
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.companyCardBox}>
                      <Link to="">
                        <CardMedia className={classes.companyLogo}>
                          <img
                            className={classes.companyLogoIcon}
                            // src={NationalThermalPowerLogo}
                            title="Pace OS"
                            alt="Pace OS"
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography className={classes.companyTag}>
                            CCZJV GOLDEN PASS
                          </Typography>
                          <Typography className={classes.companyName}>
                            Company: <span>GOLDENPASS</span>
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.companyCardBox}>
                      <Link to="">
                        <CardMedia className={classes.companyLogo}>
                          <img
                            className={classes.companyLogoIcon}
                            // src={TeknobuiltLogo}
                            title="Pace OS"
                            alt="Pace OS"
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography className={classes.companyTag}>
                            CCZJV GOLDEN PASS
                          </Typography>
                          <Typography className={classes.companyName}>
                            Company: <span>GOLDENPASS</span>
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Card className={classes.companyCardBox}>
                      <Link to="">
                        <CardMedia className={classes.companyLogo}>
                          <img
                            className={classes.companyLogoIcon}
                            // src={RiddellLogo}
                            title="Pace OS"
                            alt="Pace OS"
                          />
                        </CardMedia>
                        <CardContent>
                          <Typography className={classes.companyTag}>
                            CCZJV GOLDEN PASS
                          </Typography>
                          <Typography className={classes.companyName}>
                            Company: <span>GOLDENPASS</span>
                          </Typography>
                        </CardContent>
                      </Link>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        ) : (
          <>
            <Paper
              elevation={3}
              className={classNames(classes.groupSection, classes.loginSection)}
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
                className={classes.loginTopDetailSection}
              >
                {loginAD === false ? (
                  <>
                    <Typography
                      variant="h1"
                      gutterBottom
                      className={classes.loginTitle}
                    >
                      CHOOSE COMPANY
                    </Typography>
                  </>
                ) : (
                  <>
                    {forgotPassword === false ? (
                      <>
                        {securityQuestion === false ? (
                          <>
                            {reCreatePassword === false ? (
                              <>
                                <Typography
                                  variant="h1"
                                  gutterBottom
                                  className={classes.loginTitle}
                                >
                                  Create new password
                                </Typography>

                                <span className={classes.userLogDetail}>
                                  <Typography component="h5" variant="h5">
                                    <AccountCircleIcon /> {state.email}
                                  </Typography>
                                </span>
                              </>
                            ) : (
                              <>
                                <Typography
                                  variant="h1"
                                  gutterBottom
                                  className={classes.loginTitle}
                                >
                                  Password recovery secret questions
                                </Typography>

                                <span className={classes.userLogDetail}>
                                  <Typography component="h5" variant="h5">
                                    <AccountCircleIcon /> {state.email}
                                  </Typography>
                                </span>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Typography
                              variant="h1"
                              gutterBottom
                              className={classes.loginTitle}
                            >
                              Retrieve Password
                            </Typography>

                            <span className={classes.userLogDetail}>
                              <Typography component="h5" variant="h5">
                                <AccountCircleIcon /> {state.email}
                              </Typography>
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h1"
                          gutterBottom
                          className={classes.loginTitle}
                          style={{
                            marginBottom: "10px",
                          }}
                        >
                          SIGN IN
                        </Typography>
                        {emailLogin === false ? (
                          <>
                            {cookieData.username !== "" ? (
                              <Typography
                                variant="p"
                                gutterBottom
                                style={{
                                  color: "#fff",
                                  marginBottom: "15px",
                                  display: "block",
                                }}
                              >
                                You are already signed in as222,
                              </Typography>
                            ) : (
                              ""
                            )}
                            <span
                              className={classes.userLogDetail}
                              style={
                                state.email !== ""
                                  ? {
                                      cursor: "pointer",
                                      pointerEvents: "all",
                                      opacity: 1,
                                    }
                                  : {
                                      cursor: "not-allowed",
                                      pointerEvents: "none",
                                      opacity: 0.5,
                                    }
                              }
                              onClick={() => {
                                setEmailLogin(true);
                                setState({
                                  ...state,
                                  errors: { password: "" },
                                });
                                document.cookie =
                                  "myusername=" +
                                  "" +
                                  ";path=" +
                                  process.env.API_URL;
                                setRemember(false);
                                setCookieData({ username: "", password: "" });
                              }}
                            >
                              <Typography component="h5" variant="h5">
                                <AccountCircleIcon />{" "}
                                {state.email === "" ? (
                                  <CircularProgress size={12} />
                                ) : (
                                  <>{state.email}</>
                                )}
                              </Typography>
                            </span>
                          </>
                        ) : (
                          <>
                            <Typography
                              variant="body2"
                              gutterBottom
                              className={classes.welcomeText}
                            >
                              Welcome back to PACE OS
                            </Typography>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </Grid>
              <form noValidate autoComplete="off">
                {emailLogin === false ? (
                  <>
                    {loginOTP === false ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          className={classes.otpFieldstyle}
                          style={{ textAlign: "center" }}
                        >
                          <Typography component="body1" variant="body1">
                            Please enter the OTP sent to your registered email
                            address or mobile number.
                            {/* {state.email.slice(0, 4)}*****
                            {state.email.slice(-4)} */}
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
                            //defaultValue=""
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
                          {/* <Link className={classes.anotherMethodLink} to='#'>Try another method </Link>  */}
                          {state.success.otp ? (
                            <p
                              style={{
                                color: "rgb(1, 223, 8)",
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {state.success.otp}
                            </p>
                          ) : (
                            ""
                          )}
                          {state.errors.otp ? (
                            <p
                              style={{
                                color: "rgb(255, 29, 29)",
                                fontSize: 14,
                                textAlign: "center",
                              }}
                            >
                              {state.errors.otp}
                            </p>
                          ) : (
                            ""
                          )}
                          <Typography
                            component="body1"
                            variant="body1"
                            className={classes.resendForgotOTPLink}
                          >
                            {" "}
                            Didn't receive a code?{" "}
                            <Link
                              href="javascript:void(0)"
                              onClick={() => handelOTPLogin()}
                            >
                              {" "}
                              Resend OTP
                            </Link>
                          </Typography>
                          <Typography
                            component="body1"
                            variant="body1"
                            className={classes.resendForgotOTPLink}
                          >
                            {" "}
                            Your OTP will expire in{" "}
                            <CountDown hours="0" minutes="10" /> minutes
                          </Typography>
                        </Grid>
                      </>
                    ) : (
                      <>
                        {forgotPassword === false ? (
                          <>
                            {securityQuestion === false ? (
                              <>
                                {reCreatePassword === false ? (
                                  <>
                                    <Grid
                                      item
                                      xs={12}
                                      sm={12}
                                      md={12}
                                      className={classes.custommblFild}
                                    >
                                      <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="passwordnew"
                                        label="Enter new password"
                                        name="passwordnew"
                                        type="password"
                                        className={classes.inputCustmStyl}
                                        value={state.newPassword}
                                        onChange={(e) =>
                                          setState({
                                            ...state,
                                            newPassword: e.target.value,
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
                                    <Grid
                                      item
                                      xs={12}
                                      md={12}
                                      className={classes.passwordPolicyStep}
                                    >
                                      <Typography
                                        variant="h6"
                                        className={classes.title}
                                      >
                                        Password policy:
                                      </Typography>
                                      <List>
                                        <ListItem>
                                          <span
                                            //className={clsx(classes.progresBoxSucess, classes.progresBoxWarning, classes.progresBox)}
                                            className={
                                              state.newPassword.length < 8
                                                ? classes.progresBox
                                                : classes.progresBoxSucess
                                            }
                                          ></span>
                                          <ListItemText primary="Minimum 8 characters length." />
                                        </ListItem>
                                        <ListItem>
                                          <span
                                            // className={clsx(classes.progresBoxSucess, classes.progresBoxWarning, classes.progresBox)}
                                            className={
                                              checkUpperCase(
                                                state.newPassword
                                              ) === true &&
                                              state.newPassword !== ""
                                                ? classes.progresBoxSucess
                                                : classes.progresBox
                                            }
                                          ></span>
                                          <ListItemText primary="Must have at least one UPPERCASE character." />
                                        </ListItem>
                                        <ListItem>
                                          <span
                                            //className={clsx(classes.progresBoxSucess, classes.progresBoxWarning, classes.progresBox)}
                                            className={
                                              checkHaveNumber(
                                                state.newPassword
                                              ) === true &&
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
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="confpassword"
                                        label="Confirm password"
                                        name="confpassword"
                                        type="password"
                                        className={classes.inputCustmStyl}
                                        value={state.confNewPassword}
                                        onChange={(e) =>
                                          setState({
                                            ...state,
                                            confNewPassword: e.target.value,
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
                                        alt="Confirm password"
                                      />
                                    </Grid>
                                    {state.success.newPassword ? (
                                      <p
                                        style={{
                                          color: "rgb(1, 223, 8)",
                                          fontSize: 14,
                                          textAlign: "center",
                                          marginBottom: 0,
                                        }}
                                      >
                                        {state.success.newPassword}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    {state.errors.newPassword ? (
                                      <p
                                        style={{
                                          color: "#ffb224",
                                          fontSize: 14,
                                          textAlign: "center",
                                          marginBottom: 0,
                                        }}
                                      >
                                        {state.errors.newPassword}
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {securityQuestionNext === false ? (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          align="center"
                                          className={classes.customSecurityFild}
                                        >
                                          {state.securityQuestTwo ? (
                                            <>
                                              <Typography
                                                component="body1"
                                                variant="body1"
                                                className={
                                                  classes.questionInputLabel
                                                }
                                              >
                                                {state.securityQuestTwo}
                                              </Typography>
                                              <FormControl fullWidth>
                                                <OutlinedInput
                                                  id="outlined-adornment-password"
                                                  type={
                                                    values.showPassword
                                                      ? "text"
                                                      : "password"
                                                  }
                                                  value={values.password}
                                                  onChange={handleChange(
                                                    "password"
                                                  )}
                                                  endAdornment={
                                                    <InputAdornment position="end">
                                                      <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                          handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                          handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                      >
                                                        {values.showPassword ? (
                                                          <Visibility />
                                                        ) : (
                                                          <VisibilityOff />
                                                        )}
                                                      </IconButton>
                                                    </InputAdornment>
                                                  }
                                                  //labelWidth={70}
                                                />
                                              </FormControl>
                                              {state.success.questionOne ? (
                                                <p
                                                  style={{
                                                    color: "rgb(1, 223, 8)",
                                                    fontSize: 14,
                                                    marginTop: 10,
                                                    marginBottom: -5,
                                                    textAlign: "left",
                                                  }}
                                                >
                                                  {state.success.questionOne}
                                                </p>
                                              ) : (
                                                ""
                                              )}
                                              {state.errors.questionOne ? (
                                                <p
                                                  style={{
                                                    color: "rgb(255, 29, 29)",
                                                    fontSize: 14,
                                                    marginTop: 10,
                                                    marginBottom: -5,
                                                    textAlign: "left",
                                                  }}
                                                >
                                                  {state.errors.questionOne}
                                                </p>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          ) : (
                                            <CircularProgress />
                                          )}
                                        </Grid>
                                      </>
                                    ) : (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          align="center"
                                          className={classes.customSecurityFild}
                                        >
                                          {!isLoadingSecurtyQuiz ? (
                                            state.securityQuestOne ? (
                                              <>
                                                <Typography
                                                  component="body1"
                                                  variant="body1"
                                                  className={
                                                    classes.questionInputLabel
                                                  }
                                                >
                                                  {state.securityQuestOne}
                                                </Typography>
                                                <FormControl fullWidth>
                                                  <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={
                                                      values.showPassword
                                                        ? "text"
                                                        : "password"
                                                    }
                                                    value={values.password}
                                                    onChange={handleChange(
                                                      "password"
                                                    )}
                                                    endAdornment={
                                                      <InputAdornment position="end">
                                                        <IconButton
                                                          aria-label="toggle password visibility"
                                                          onClick={
                                                            handleClickShowPassword
                                                          }
                                                          onMouseDown={
                                                            handleMouseDownPassword
                                                          }
                                                          edge="end"
                                                        >
                                                          {values.showPassword ? (
                                                            <Visibility />
                                                          ) : (
                                                            <VisibilityOff />
                                                          )}
                                                        </IconButton>
                                                      </InputAdornment>
                                                    }
                                                    //labelWidth={70}
                                                  />
                                                </FormControl>
                                                {state.success.questionOne ? (
                                                  <p
                                                    style={{
                                                      color: "rgb(1, 223, 8)",
                                                      fontSize: 14,
                                                      marginTop: 10,
                                                      marginBottom: -5,
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {state.success.questionOne}
                                                  </p>
                                                ) : (
                                                  ""
                                                )}
                                                {state.errors.questionOne ? (
                                                  <p
                                                    style={{
                                                      color: "rgb(255, 29, 29)",
                                                      fontSize: 14,
                                                      marginTop: 10,
                                                      marginBottom: -5,
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    {state.errors.questionOne}
                                                  </p>
                                                ) : (
                                                  ""
                                                )}
                                              </>
                                            ) : (
                                              <p
                                                style={{
                                                  color: "rgb(255, 29, 29)",
                                                  fontSize: 14,
                                                  marginTop: 10,
                                                  marginBottom: -5,
                                                  textAlign: "left",
                                                }}
                                              >
                                                {securityErrorMessage}
                                              </p>
                                            )
                                          ) : (
                                            <CircularProgress />
                                          )}
                                        </Grid>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <Grid
                                  item
                                  xs={12}
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
                                    //onChange={(e) => {handleChangeOtp(e) }}
                                    numInputs={6}
                                    otpType="number"
                                    name="otp"
                                  />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  {/* <Link className={classes.anotherMethodLink} to='#'>Try another method </Link>  */}
                                  {state.success.otp ? (
                                    <p
                                      style={{
                                        color: "rgb(1, 223, 8)",
                                        fontSize: 14,
                                        textAlign: "center",
                                      }}
                                    >
                                      {state.success.otp}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  {state.errors.otp ? (
                                    <p
                                      style={{
                                        color: "rgb(255, 29, 29)",
                                        fontSize: 14,
                                        textAlign: "center",
                                      }}
                                    >
                                      {state.errors.otp}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                  <Typography
                                    component="body1"
                                    variant="body1"
                                    className={classes.resendForgotOTPLink}
                                  >
                                    {" "}
                                    Didn't receive a code?{" "}
                                    <Link
                                      href="javascript:void(0)"
                                      onClick={() => handelForgotPassword()}
                                    >
                                      {" "}
                                      Resend OTP
                                    </Link>
                                  </Typography>
                                  <Typography
                                    component="body1"
                                    variant="body1"
                                    className={classes.resendForgotOTPLink}
                                  >
                                    {" "}
                                    Your OTP will expire in{" "}
                                    <CountDown hours="0" minutes="10" /> minutes
                                  </Typography>
                                </Grid>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              align="center"
                              className={classes.customPassFild}
                            >
                              <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="outlined-adornment-password">
                                  Password
                                </InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password"
                                  type={
                                    values.showPassword ? "text" : "password"
                                  }
                                  value={state.password}
                                  onChange={(e) =>
                                    setState({
                                      ...state,
                                      errors: { password: "" },
                                      password: e.target.value,
                                    })
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                      >
                                        {values.showPassword ? (
                                          <Visibility />
                                        ) : (
                                          <VisibilityOff />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  //labelWidth={70}
                                />
                              </FormControl>
                            </Grid>
                            {state.errors.password ? (
                              <p style={{ color: "#ffb224", fontSize: 14 }}>
                                {state.errors.password}
                              </p>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {loginAD === false ? (
                      <>
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          align="center"
                          className={classes.customPassFild}
                        >
                          <Autocomplete
                            id="combo-box-demo"
                            options={state.companies}
                            onChange={(e, newValue) => {
                              if (newValue) {
                                setState({
                                  ...state,
                                  AdcompanyId: newValue.companyId,
                                });
                              }
                            }}
                            onInputChange={(e, newValue) => {
                              setState({
                                ...state,
                                selectedAdCompany: newValue,
                              });
                            }}
                            getOptionLabel={(option) => option.companyName}
                            //style={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select company name"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                        {state.errors.adError ? (
                          <p style={{ color: "#ffb224", fontSize: 14 }}>
                            {state.errors.adError}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
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
                            id="email"
                            name="email"
                            value={state.email || cookieData.username}
                            className={classes.inputCustmStyl}
                            onChange={(e) =>
                              setState({
                                ...state,
                                email: e.target.value,
                                errors: { email: "" },
                              })
                            }
                            label={`Enter your email / Mobile number`}
                          />
                          {!isMobileNo ? (
                            <img
                              alt="Email icon"
                              src="https://media.pace-os.com/icons/svg/mail-24x24.svg"
                            />
                          ) : (
                            <img
                              alt="Mobile icon"
                              src="https://media.pace-os.com/icons/svg/mobile-number-24x24.svg"
                            />
                          )}
                        </Grid>
                        {state.errors.email ? (
                          <p style={{ color: "#ffb224", fontSize: 14 }}>
                            {state.errors.email}
                          </p>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </>
                )}

                {emailLogin === false ? (
                  <>
                    {loginOTP === false ? (
                      <>
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
                            onClick={() => {
                              setLoginOTP(true);
                              setState({ ...state, errors: { otp: "" } });
                              setOtpV({ otp: "" });
                            }}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.customOrgnBTN}
                            onClick={(e) => loginUserUpdated(e)}
                          >
                            Continue <ArrowRightAltIcon />
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <>
                        {forgotPassword === false ? (
                          <>
                            {securityQuestion === false ? (
                              <>
                                {reCreatePassword === false ? (
                                  <>
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
                                        onClick={(e) => {
                                          setReCreatePassword(true);
                                          setSecurityQuestion(true);
                                        }}
                                      >
                                        Back
                                      </Button>
                                      <Button
                                        variant="contained"
                                        className={classes.customOrgnBTN}
                                        onClick={(e) => handleChangePassword(e)}
                                      >
                                        Continue <ArrowRightAltIcon />
                                      </Button>
                                    </Grid>
                                  </>
                                ) : (
                                  <>
                                    {securityQuestionNext === false ? (
                                      <>
                                        {/* <Grid item xs={12} sm={12} md={12} className={clsx(classes.actionButtonSection, classes.securityQarea)}>
                                                                <Button variant="contained" className={classes.customOrgnBTN}>Swap question</Button>
                                                            </Grid> */}
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          className={
                                            classes.actionButtonSectionSecurity
                                          }
                                        >
                                          <Button
                                            variant="contained"
                                            className={classes.customWhitBTN}
                                            onClick={() =>
                                              setSecurityQuestionNext(true)
                                            }
                                          >
                                            Back
                                          </Button>
                                          <Button
                                            variant="contained"
                                            className={classes.customOrgnBTN}
                                            onClick={() =>
                                              handleSwapQuestion("second")
                                            }
                                          >
                                            Swap question
                                          </Button>
                                          <Button
                                            variant="contained"
                                            className={classes.customOrgnBTN}
                                            onClick={(e) =>
                                              handelReCreatePass(e)
                                            }
                                          >
                                            Continue <ArrowRightAltIcon />
                                          </Button>
                                        </Grid>
                                      </>
                                    ) : (
                                      <>
                                        <Grid
                                          item
                                          xs={12}
                                          sm={12}
                                          md={12}
                                          className={
                                            classes.actionButtonSectionSecurity
                                          }
                                        >
                                          <Button
                                            variant="contained"
                                            className={classes.customWhitBTN}
                                            onClick={() =>
                                              setSecurityQuestion(true)
                                            }
                                          >
                                            Back
                                          </Button>
                                          <Button
                                            variant="contained"
                                            className={classes.customOrgnBTN}
                                            onClick={() =>
                                              handleSwapQuestion("first")
                                            }
                                          >
                                            Swap question
                                          </Button>
                                          <Button
                                            variant="contained"
                                            className={classes.customOrgnBTN}
                                            onClick={(e) =>
                                              handelSecurityQuestionNext(e)
                                            }
                                          >
                                            Continue <ArrowRightAltIcon />
                                          </Button>
                                        </Grid>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
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
                                    onClick={() => {
                                      setForgotPassword(true);
                                      setState({
                                        ...state,
                                        errors: { otp: "" },
                                      });
                                      setOtpV({ otp: "" });
                                    }}
                                  >
                                    Back
                                  </Button>
                                  <Button
                                    variant="contained"
                                    className={classes.customOrgnBTN}
                                    onClick={(e) => handleClickVerify(e)}
                                  >
                                    Continue <ArrowRightAltIcon />
                                  </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  <Typography
                                    component="body1"
                                    variant="body1"
                                    className={classes.otherChangOTP}
                                  >
                                    Are you facing any challenges with OTP?
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                  <Button
                                    variant="contained"
                                    className={classes.customOrgnBTNFullWidth}
                                    onClick={(e) => handelSecurityQ(e)}
                                  >
                                    Reset password using secret questions{" "}
                                    <ArrowRightAltIcon />
                                  </Button>
                                </Grid>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Grid item xs={12} sm={12} md={12}>
                              <FormGroup row>
                                <FormControlLabel
                                  className={classes.rememberCheck}
                                  control={
                                    <Checkbox
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      name="checkedI"
                                      onChange={handleCheckTick}
                                      value={remember}
                                      defaultValue={remember}
                                      defaultChecked={remember}
                                      checked={remember}
                                    />
                                  }
                                  label="Remember me"
                                />
                                <Link
                                  className={classes.forgotPassLink}
                                  onClick={(e) => handelForgotPassword(e)}
                                  href="javascript:void(0)"
                                >
                                  Forgot password?{" "}
                                </Link>
                                {/* /recoveryPassword */}
                              </FormGroup>
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
                                className={classes.customOrgnBTN}
                                onClick={(e) => handelOTPLogin(e)}
                              >
                                Login with OTP
                              </Button>
                              <Button
                                variant="contained"
                                className={classes.customOrgnBTN}
                                type="submit"
                                onClick={(e) => loginUserUpdated(e)}
                              >
                                {state.passwordLoading ? (
                                  <CircularProgress
                                    size={18}
                                    style={{ color: "#fff" }}
                                  />
                                ) : (
                                  <>
                                    Login <ArrowRightAltIcon />
                                  </>
                                )}
                              </Button>
                            </Grid>
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {loginAD === false ? (
                      <>
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
                            onClick={(e) => {
                              e.preventDefault();
                              setLoginAD(true);
                            }}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.customOrgnBTN}
                            onClick={() => handleContinue()}
                          >
                            Continue <ArrowRightAltIcon />
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12} sm={12} md={12} align="center">
                          <Button
                            variant="contained"
                            fullWidth
                            className={classes.customOrgnBTN}
                            onClick={(e) => handelEmailLogin(e)}
                            type="submit"
                          >
                            {state.emailLoading ? (
                              <CircularProgress
                                size={18}
                                style={{ color: "#fff" }}
                              />
                            ) : (
                              <>
                                Continue <ArrowRightAltIcon />
                              </>
                            )}
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} align="center">
                          <Avatar className={classes.orBox}>OR</Avatar>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} align="center">
                          <Button
                            variant="contained"
                            className={classes.customWhitBTN}
                            onClick={(e) => handelADLogin(e)}
                          >
                            Enterprise AD Login
                          </Button>
                        </Grid>
                      </>
                    )}
                  </>
                )}
              </form>
              {/* {loginOTP === false ? (
                <>
                  <Alert
                    variant="filled"
                    severity="error"
                    className={classes.alertMessageSection}
                  >
                    You have entered an incorrect code three times and your
                    account is temporaily locked. Plese try again after 1 hour.
                  </Alert>
                </>
              ) : (
                <>
                  {forgotPassword === false ? (
                    <>
                      {securityQuestion === false ? (
                        <>
                          <Alert
                            variant="filled"
                            severity="error"
                            className={classes.alertMessageSection}
                          >
                            You have entered an incorrect code three times and
                            your account is temporaily locked. Plese try again
                            after 1 hour.
                          </Alert>
                        </>
                      ) : (
                        <>
                          <Alert
                            variant="filled"
                            severity="error"
                            className={classes.alertMessageSection}
                          >
                            You have entered an incorrect code 3 times and your
                            account is temporaily locked. Plese try again after
                            1 hour.
                          </Alert>
                        </>
                      )}
                    </>
                  ) : null}
                </>
              )} */}
            </Paper>
          </>
        )}
      </Grid>
    </>
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
)(withStyles(useStyles, { withTheme: true })(Login));
