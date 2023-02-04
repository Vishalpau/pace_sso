import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Divider,
} from "@material-ui/core";
//import InputIcon from '@material-ui/icons/Input';
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import { makeStyles, withStyles } from "@material-ui/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@material-ui/core";
import LogoImage from "../../../../../../public/LoginImg/logo.png";
import Ellipse from "../../../../../../public/LoginImg/ellipse.png";
import productIcon from "../../../../../../public/LoginImg/productIcon.svg";
import questionCircle from "../../../../../../public/LoginImg/questionCircle.svg";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import { getInitials } from "../../../../../helpers";
import { connect } from "react-redux";
import { Fragment } from "react";
import AppsIcon from "@material-ui/icons/Apps";
import HelpIcon from "@material-ui/icons/Help";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Drawer from "@material-ui/core/Drawer";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {
  useParams,
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserActions } from "../../../../user/UserActions";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";

//import typography from 'src/js/theme/typography';
/*
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    animation: '$ripple 1.2s infinite ease-in-out',
    border: '1px solid currentColor',
    content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
    transform: 'scale(.8)',
    opacity: 1,
    },
    '100%': {
    transform: 'scale(2.4)',
    opacity: 0,
    },
  },
}))(Badge); */

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
  customHeaderColor: {
    backgroundColor: "#ffffff",
    webkitBoxShadow: "0px 4px 10px -6px rgba(0,0,0,0.75)",
    mozBoxShadow: "0px 4px 10px -6px rgba(0,0,0,0.75)",
    boxShadow: "0px 4px 10px -6px rgba(0,0,0,0.75)",
    "& .MuiAvatar-img": {
      width: "auto",
      height: "auto",
    },
    "& .MuiToolbar-root": {
      [theme.breakpoints.down("md")]: {
        paddingTop: "5px",
        paddingBottom: "5px",
      },
    },
  },
  projectBreadcrumbs: {
    fontSize: 12,
    color: theme.palette.secondary.contrastText,
    paddingLeft: "15px",
  },
  toglIconStyl: {
    paddingRight: "0px",
    "& MuiIconButton-label MuiSvgIcon-root": {
      color: "#16384F",
    },
  },
  logoBoxStyle: {
    width: "55px",
    height: "55px",
    position: "relative",
    borderRadius: "100px",
    marginBottom: "0px",
    backgroundColor: "#16384F",
    float: "left",
  },
  logoImg: {
    maxWidth: "100%",
    top: 22,
    display: "block",
    position: "absolute",
  },
  photo: {
    height: "200px",
    width: "200px",
  },
  logoBoxHeader: {
    "& span": {
      float: "left",
      lineHeight: "55px",
      fontSize: "30px",
      paddingLeft: "22px",
      color: "#16384F",
      fontFamily: "Montserrat-SemiBold",
      [theme.breakpoints.down("sm")]: {
        fontSize: "22px",
        paddingLeft: "12px",
      },
    },
  },
  divider: {
    margin: theme.spacing(2, 0, 0),
  },
  dropwidth: {
    width: "350px",
    boxShadow:
      "0px 5px 5px -3px rgb(80 80 80 / 20%), 0px 8px 10px 1px rgb(80 80 80 / 14%), 0px 3px 14px 2px rgb(80 80 80 / 12%)",
    borderRadius: "8px",
  },
  appDrawerSection: {
    left: "auto !important",
    right: "0px",
    height: "100%",
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    zIndex: "1",
    "& a:hover": {
      color: "inherit",
    },
  },
  appDropWidth: {
    width: 350,
    height: "100%",
    overflowY: "auto",
    flexDirection: "column",
    top: "0px",
    "& .MuiListItem-root": {
      paddingTop: "8px",
      paddingBottom: "8px",
    },
  },
  appDrawerLable: {
    paddingLeft: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: "#f7f7f7",
    margin: "0px",
    fontSize: "14px",
    color: "#333333",
    "& span": {
      fontSize: "14px",
      color: "#333333",
      fontFamily: "Montserrat-Regular",
    },
  },
  appDrawerLink: {
    paddingLeft: "35px",
    "& svg": {
      marginRight: "10px",
      color: "#06425c",
    },
    "& .MuiListItemText-root": {
      flex: "1 1 auto",
      minWidth: "0",
      marginTop: "4px",
      marginBottom: "4px",
      marginLeft: "12px",

      "& span": {
        fontSize: "15px",
        fontWeight: "400",
        color: "#06425c",
        fontFamily: "Montserrat-Medium",
      },
    },
  },
  profilePicImg: {
    textAlign: "center",
    padding: "16px",
    "& h2": {
      fontSize: "18px",
      lineHeight: "19px",
      color: "#06425C",
      fontFamily: "Montserrat-SemiBold",
      margin: "8px 0px 2px 0px",
    },
    "& h6": {
      // fontFamily: 'Montserrat-Regular',
      // lineHeight: '22px',
      fontSize: "16",
      color: "#666666",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
      padding: "2px",
    },
    "& img": {
      width: "57px",
      height: "56px",
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "0px auto",
  },
  image: {
    //width: '100px',
    height: "40px",
    //marginRight: '20px'
    backgroundColor: "#ffffff",
    padding: "2px",
    borderRadius: "2px",
  },
  profileList: {
    padding: "0px",
    "& .MuiMenuItem-root": {
      borderBottom: "1px solid #e0e0e0",
      fontFamily: "Montserrat-Regular",
      padding: "16px 16px 16px 30px",
      fontSize: "16px",
      color: "#666666",
      "& img": {
        marginRight: "8px",
      },
    },
    "& .MuiListItem-button:hover": {
      backgroundColor: "transparent",
    },
  },
  logoutStylBtn: {
    justifyContent: "center",
    textAlign: "center",
    cursor: "default",
  },
  topHeaderMenuIcon: {
    padding: "0px",
    marginLeft: "15px",
    // [theme.breakpoints.down("sm")]: {
    // 	marginLeft: '15px',
    // },
    "& svg": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "33px",
      },
      fontSize: "47px",
      color: "#ffffff",
    },
  },
  topHeaderMenuHelpIcon: {
    [theme.breakpoints.down("sm")]: {
      padding: "10px 2px",
    },
    "& svg": {
      fontSize: "32px",
      color: "#ffffff",
    },
  },
  clientHeadLogo: {
    color: "#ffffff",
    fontFamily: "Montserrat-Regular",
    fontSize: "18px",
    paddingRight: "15px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "13px",
    },
  },
  appListBox: {
    "& li": {
      width: "33%",
      float: "left",
      display: "block",
      textAlign: "center",
      padding: "5px",
      margin: "5px 0px",
      "& .MuiListItemAvatar-root .MuiAvatar-root": {
        margin: "0px auto",
      },
      "& button": {
        padding: "0px",
        "& .MuiIconButton-label": {
          display: "grid",
        },
        "&:hover": {
          backgroundColor: "transparent",
        },
        "& .MuiListItemText-root .MuiTypography-root": {
          color: "#06425c",
          fontSize: "16px",
          fontFamily: "Montserrat-Regular",
          lineHeight: "32px",
        },
      },
    },
  },
  dialogSection: {
    "& .MuiPaper-root": {
      width: "450px",
    },
    "& .MuiDialogActions-root": {
      justifyContent: "flex-start",
      padding: "16px 24px !important",
    },
  },
  dialogTitileBox: {
    marginBottom: "0px !important",
    "& h6": {
      color: "#06425C !important",
      fontSize: "1rem !important",
      fill: "#06425C !important",
      lineHeight: "19px",
      fontFamily: "Montserrat-SemiBold",
    },
    "& button": {
      "& svg": {
        fontSize: "1rem !important",
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
  buttonStyle: {
    fontSize: "1rem !important",
    textTransform: "none !important",
    color: "#ffffff !important",
    padding: "6px 25px !important",
    backgroundColor: "#06425c",
    borderRadius: "30px",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#ff8533",
    },
  },
  custmCancelBtn: {
    fontSize: "1rem !important",
    textTransform: "none !important",
    color: "#06425c !important",
    padding: "6px 25px !important",
    backgroundColor: "#ffffff",
    borderRadius: "30px",
    border: "1px solid #06425c",
    "&:hover": {
      backgroundColor: "#ff8533",
      borderColor: "#ff8533",
      color: "#ffffff !important",
    },
    "&:focus": {
      outline: "none",
    },
  },
  formBox: {
    position: "relative",
    //padding: '5px 12px !important',
    "& .MuiTextField-root": {
      width: "100%",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
    "& .MuiBadge-badge": {
      left: "0px",
      right: "auto",
      borderRadius: "3px",
    },
  },
  formControl: {
    "& .MuiOutlinedInput-input": {
      padding: "10.5px 14px",
    },
  },

  passwordPolicyStep: {
    // marginTop: '10px',
    paddingTop: "0px !important",
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
  successText: {
    color: "#06425C",
    fontSize: "24px",
    fontFamily: "xolonium",
    paddingTop: "15px",
  },
  successMessage: {
    color: "#666666",
    fontSize: "16px",
    fontFamily: "Montserrat-SemiBold",
    // paddingBottom: '60px',
    // paddingTop: '15px',
  },
  successSymbol: {
    paddingTop: "30px",
  },
  btnToLogin: {
    paddingBottom: "40px",
    paddingTop: "40px",
  },
  textCenter: { justifyContent: "center", marginLeft: "15px" },
  toolTitle: {
    fontSize: "16px",
    fontFamily: "Montserrat-Medium",
  },
  toolSubName: {
    fontSize: "14px",
    fontFamily: "Montserrat-Regular",
  },
  buttonStyleDropdown: {
    backgroundColor: "#7890A4",
    fontSize: "0.875rem",
    textTransform: "none",
    color: "#ffffff",
    padding: "0.313rem 1.25rem",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#F28705",
    },
  },
}));

// const useQuery = () => {

//     return new URLSearchParams(useLocation().search)

// }

const styles = (theme) => ({
  root: {
    margin: 0,
    //padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    //padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const Topbar = (props) => {
  //// console.log({reducerprops:props})
  // console.log({ 'avdvdvd': localStorage.getItem('avatar') })
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar"));
  const [name, setName] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [classicSub, setClassicSub] = useState([]);
  const [user, setUser] = useState([]);
  const [modules, setModules] = useState([]);
  const [codes, setCodes] = useState([]);
  const [apps, setApps] = useState([]);
  const [company, setCompany] = useState([]);
  const [pace10hexagon, setPace10hexagon] = useState(false);

  // toggleDrawer = (side, open) => () => {
  // 	setState({
  // 	  [side]: open,
  // 	});
  //   };

  // console.log({ avatar: avatar })
  // console.log({ name: name })

  // setStorage()
  React.useEffect(() => {
    setStorage();
    getClassicOnlySub();
    getSubscriptions();
    getSubscribedApps();
  }, [codes]);

  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();

  const setStorage = async () => {
    const companyId = query.get("companyId");
    const projectStructure = query.get("projectStructure");
    const projectId = query.get("projectId");

    if (projectId) {
      localStorage.setItem("ssoProjectId", projectId);
    }

    if (projectStructure) {
      localStorage.setItem("selectedProjectStructure", projectStructure);
    }

    if (companyId) {
      localStorage.setItem("companyId", companyId);

      let companies = [];

      // console.log({ 'storage_data': JSON.parse(localStorage.getItem('userdata')).user })
      companies = [
        ...companies,
        JSON.parse(localStorage.getItem("userdata")).user.companies,
      ];

      companies.map((company) => {
        if (company.companyId == localStorage.getItem("companyId")) {
          localStorage.setItem("companyCode", company.companyCode);
        }
      });
    }

    if (localStorage.getItem("companyId") != undefined) {
      let companies = [];

      // console.log({ 'storage_data': JSON.parse(localStorage.getItem('userdata')).user })
      companies = [
        ...companies,
        JSON.parse(localStorage.getItem("userdata")).user.companies,
      ];

      companies.map((company) => {
        if (company.companyId == localStorage.getItem("companyId")) {
          localStorage.setItem("companyCode", company.companyCode);
        }
      });
    } else {
      let companies = [];

      // console.log({ 'storage_data': JSON.parse(localStorage.getItem('userdata')).user })
      companies = [
        ...companies,
        JSON.parse(localStorage.getItem("userdata")).user.companies,
      ];

      // console.log({ company: companies[0] })

      if (companies[0].length > 1) {
        history.push({
          pathname: "/selectsinglecompany",
          user_data: JSON.parse(localStorage.getItem("userdata")),
          companies_data: companies[0],
        });
      } else {
        localStorage.setItem("companyId", companies[0][0].companyId);
        localStorage.setItem("companyCode", JSON.stringify(companies[0][0]));
      }
    }

    // alert(33333)
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
        // console.log({ result_storage: res })
        localStorage.setItem("user", res.data.data.results.data.id);
        localStorage.setItem("email", res.data.data.results.data.email);
        localStorage.setItem("name", res.data.data.results.data.name);

        // localStorage.setItem('avatar', res.data.data.results.data.avatar)
        // setAvatar(res.data.data.results.data.avatar)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const getClassicOnlySub = async () => {
    const companyId = localStorage.getItem("companyId");

    let classic_data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/subscriptions/"
      )
      .then(function (res) {
        // console.log({ res_classic: res.data.data.results })
        const applications = res.data.data.results;
        // console.log({ applications: applications })
        return applications;
      })
      .catch(function (error) {
        // console.log(error);
      });

    // console.log({ 'classic_data_only': classic_data })
    if (classic_data.some((subscription) => subscription.appCode === "gis")) {
      if (
        classic_data.filter((subscription) => subscription.appCode != "gis")
          .length == 1
      ) {
        const classic_sub = classic_data
          .filter((subscription) => subscription.appCode != "gis")
          .map((subscription) => subscription);
        if (classic_sub[0].appCode == "classic") {
          setPace10hexagon(true);
          localStorage.setItem("pace10hexagon", true);
        }
      }
    } else {
      if (classic_data.length == 1) {
        const classic_sub = classic_data.map((subscription) => subscription);
        if (classic_sub[0].appCode == "classic") {
          setPace10hexagon(true);
          localStorage.setItem("pace10hexagon", true);
        }
      }
    }
  };

  const getSubscriptions = async () => {
    setAvatar(localStorage.getItem("avatar"));
    setName(localStorage.getItem("name"));
    const companyId = localStorage.getItem("companyId");
    let company = {};
    let companydata = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/"
      )
      .then(function (res) {
        // console.log({ company: res.data.data.results })
        company = res.data.data.results;
        return company;
      })
      .catch(function (error) {
        // console.log(error);
      });
    setCompany(companydata);

    let subscriptionData = {};
    let data = await axios
      .get(process.env.API_URL + process.env.API_VERSION + "/applications/")
      .then(function (res) {
        // console.log({ applications: res.data.data.results })
        subscriptionData = res.data.data.results;
        return subscriptionData;
      })
      .catch(function (error) {
        // console.log(error);
      });

    // console.log({ sub_data: data })

    setSubscriptions(data);
    // console.log({ subscriptions2: subscriptions })

    // const modules2 = data.map(subscription => subscription.modules)
    // var temp = []

    // // console.log({ modules_in: modules2 })
    // modules2.map(module =>
    // 	{
    // 		temp=[...temp]
    // 		if (module.length > 0) {
    // 			const mod=module.map(mod =>
    // 				{
    // 					temp.push(mod.moduleCode)
    // 					setModules(temp)
    // 				}
    // 			)
    // 		}
    // 	}
    // 	)

    // modules.map(module =>
    // {
    // 	if (module.length > 0) {
    // 		setSubscriptions(module.map(mod =>
    // 		{
    // 			return mod.moduleCode
    // 		}
    // 		))
    // 	}
    // }

    // )
  };

  const getSubscribedApps = async () => {
    const companyId = localStorage.getItem("companyId");
    let subscriptionData = {};
    let data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/user/self/" +
          companyId +
          "/"
      )
      .then(function (res) {
        // console.log({ data: res.data.data.results.data.companies })
        subscriptionData =
          res.data.data.results.data.companies[0].subscriptions;
        // setSubscriptions(subscriptionData);
        return subscriptionData;
      })
      .catch(function (error) {
        // console.log(error);
      });

    //   if(localStorage.getItem('permissions') == undefined)
    //   {
    // var ssoApp = subscriptionData.map((appDetails) => {
    // 	if (appDetails.appCode == "SSO") {
    // 		return appDetails;
    // 	}
    // })

    // Object.keys(ssoApp).forEach(key => ssoApp[key] == undefined && delete ssoApp[key]);

    // await localStorage.setItem('app', JSON.stringify(ssoApp[0]))

    // const aclUrl = process.env.BASE_URL  + ssoApp[0].roles[0].aclUrl
    // // console.log({ aclUrl: aclUrl })

    // Object.keys(ssoApp).forEach(key => ssoApp[key] == undefined && delete ssoApp[key]);

    // await localStorage.setItem('app', JSON.stringify(ssoApp[0]))

    // const aclUrl = "https://dev-accounts-api.paceos.io" + ssoApp[0].roles[0].aclUrl
    // // console.log({ aclUrl: aclUrl })

    // let acldata = await axios
    // 	.get(aclUrl)
    // 	.then(function (res) {
    // 		return res.data.data.results.permissions

    // 	})
    // 	.catch(function (error) {
    // 		// console.log(error);
    // 	});
    // // console.log({ acldata: acldata })
    // await localStorage.setItem('permissions', JSON.stringify(acldata))
    // //   }

    const modules = data.map((subscription) => subscription.modules);

    // console.log({ modules: modules })

    // console.log('i m here')

    let classic_data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/subscriptions/"
      )
      .then(function (res) {
        // console.log({ res_classic: res.data.data.results })
        const applications = res.data.data.results;
        return applications;
      })
      .catch(function (error) {
        // console.log(error);
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
          let classic = [];
          classic = [...classic, classic_sub[0]];
          // console.log({ classic_if: classic })
          setClassicSub(classic);
        }
      }
    } else {
      if (classic_data.length == 1) {
        const classic_sub = classic_data.map((subscription) => subscription);
        if (classic_sub[0].appCode == "classic") {
          let classic = [];
          classic = [...classic, classic_sub[0]];
          // console.log({ classic_else: classic })
          setClassicSub(classic);
        }
      }
    }

    if (
      data.filter((subscription) => subscription.appCode != "accounts")
        .length == 1
    ) {
      const classic_sub = data
        .filter((subscription) => subscription.appCode != "accounts")
        .map((subscription) => subscription);
      // console.log({ classic_sub: classic_sub[0].appCode })
      if (classic_sub[0].appCode == "classic") {
        // console.log({ Sub: classic_sub[0] })
        let classic = [];
        classic = [...classic, classic_sub[0]];
        // console.log({ classic: classic })
        setClassicSub(classic);
      }
    }

    var temp = [];

    modules.map((module) =>
      // // console.log({code_in:module})
      {
        temp = [...temp];
        if (module.length > 0) {
          module.map((mod) => {
            // console.log({ code_in: mod })
            if (mod.subscriptionStatus == "active") {
              temp.push(mod.moduleCode);
              // console.log({ temp: temp })
              setApps(temp);
              return temp;
            }
          });
        }
      }
    );

    // console.log({ active_modules: apps })

    //   const apps = data.map(app=>app.appId)
    //   this.getModules(apps)
  };

  //   getModules = async(apps) => {

  // 	let data = await axios
  // 	  .post(process.env.API_URL + process.env.API_VERSION + '/applications/modules/',  data = {"fkAppId": apps})
  // 	  .then(function(res) {
  // 		// // console.log({data:  })
  // 		return res.data.data.results;
  // 	  })
  // 	  .catch(function(error) {
  // 		// console.log(error);
  // 	  });

  // 	return data
  // 	//   setModules(data)
  // 	//   const codes =  data.map(module=>module.moduleCode)

  // 	//   setCodes(codes)

  // 	//   // console.log({codes: codes})
  //   }

  const { className, onSidebarOpen, userActions } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openA, setOpena] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(true);
  const anchorRefa = React.useRef(null);
  // const [selectedStructure, setSelectedStructure]=React.useState([]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleTogglet = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleTogga = () => {
    setOpena((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  const handleClosea = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpena(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function ListItemLink(props) {
    return (
      <ListItem
        button
        classes={{ button: classes.menuListItem }}
        component="a"
        {...props}
      />
    );
  }

  const handleLinkClick = async (appCode) => {
    // alert(appCode)
    let data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/applications/modules/" +
          appCode +
          "/" +
          localStorage.getItem("companyId") +
          "/"
      )
      .then(function (res) {
        // console.log({ data: res.data.data.results })
        return res.data.data.results;
      })
      .catch(function (error) {
        // console.log(error);
      });
    // console.log({ 'hostings': data.hostings })
    if (data.hostings != undefined) {
      const targetPage = data.modules ? data.modules.targetPage : "";
      // alert(localStorage.getItem('companyId'))
      const clientId = data.hostings.clientId;

      const phaseId = localStorage.getItem("phaseId")
        ? localStorage.getItem("phaseId")
        : 1;
      const unitId = localStorage.getItem("unitId")
        ? localStorage.getItem("unitId")
        : 1;

      const firstlevel = localStorage.getItem("firstlevel")
        ? localStorage.getItem("firstlevel")
        : "";
      const secondlevel = localStorage.getItem("secondlevel")
        ? localStorage.getItem("secondlevel")
        : "";
      const lastlevel = localStorage.getItem("lastlevel")
        ? localStorage.getItem("lastlevel")
        : "";

      const projectStructure = firstlevel + ":" + secondlevel + ":" + lastlevel;

      if (data.modules.moduleCode == "HSE") {
        window.open(
          process.env.API_URL +
            process.env.API_VERSION +
            "/user/auth/authorize/?client_id=" +
            clientId +
            "&response_type=code&targetPage=" +
            targetPage +
            "&companyId=" +
            localStorage.getItem("companyId") +
            "&projectId=" +
            JSON.parse(localStorage.getItem("project")).vendorReferenceId +
            "&phaseId=" +
            phaseId +
            "&unitId=" +
            unitId +
            "&moduleType=" +
            1,
          "_blank"
        );
      } else if (data.modules.moduleCode == "ProjectInfo") {
        window.open(
          process.env.API_URL +
            process.env.API_VERSION +
            "/user/auth/authorize/?client_id=" +
            clientId +
            "&response_type=code&targetPage=" +
            targetPage +
            "&companyId=" +
            localStorage.getItem("companyId") +
            "&projectId=" +
            JSON.parse(localStorage.getItem("project")).vendorReferenceId +
            "&phaseId=" +
            phaseId +
            "&unitId=" +
            unitId +
            "&moduleType=" +
            2,
          "_blank"
        );
      } else if (data.modules.moduleCode == "gis") {
        window.open(
          process.env.API_URL +
            process.env.API_VERSION +
            "/user/auth/authorize/?client_id=" +
            process.env.client_id_gis +
            "&response_type=code&targetPage=gis_setup" +
            "&companyId=" +
            localStorage.getItem("companyId") +
            "&projectId=" +
            localStorage.getItem("ssoProjectId"),
          "_blank"
        );
      } else {
        window.open(
          process.env.API_URL +
            process.env.API_VERSION +
            "/user/auth/authorize/?client_id=" +
            clientId +
            "&response_type=code&targetPage=" +
            targetPage +
            "&companyId=" +
            localStorage.getItem("companyId") +
            "&projectId=" +
            localStorage.getItem("ssoProjectId") +
            "&projectStructure=" +
            localStorage.getItem("selectedProjectStructure"),
          "_blank"
        ); // <- This is what makes it open in a new window.
      }
    }
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  // console.log({ apps: apps })
  // // console.log({subscriptions__:subscriptions})
  // console.log({ modules: modules })

  const runCallback = (cb) => {
    return cb();
  };

  const [changePassword, setChangePassword] = React.useState(false);
  const [successDialog, setSuccessDialog] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("md");
  const [currentpwd, setCurrentpwd] = React.useState("");
  const [newpwd, setNewpwd] = React.useState("");
  const [newpwd2, setNewpwd2] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});
  const [passwordLengthCheck, setPasswordLengthCheck] = React.useState(false);
  const [capitalLetterCheck, setCapitalLetterCheck] = React.useState(false);
  const [numberCheck, setNumberCheck] = React.useState(false);

  const handleClickChangePassword = () => {
    setTouched({});
    setErrors({});
    setCurrentpwd("");
    setNewpwd("");
    setNewpwd2("");
    setPasswordLengthCheck(false);
    setCapitalLetterCheck(false);
    setNumberCheck(false);
    setChangePassword(true);
  };
  const handleCloseChangePass = () => {
    setTouched({});
    setErrors({});
    setCurrentpwd("");
    setNewpwd("");
    setNewpwd2("");
    setPasswordLengthCheck(false);
    setCapitalLetterCheck(false);
    setNumberCheck(false);
    setChangePassword(false);
  };

  const handleCloseSuccessdialog = () => {
    setSuccessDialog(false);
  };

  const handleTouch = (e) => {
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      // console.log({ touched: touched })
      setTouched(touched);
    }
  };

  const handlePwdValidation = (e) => {
    setNewpwd(e.target.value);

    let password = e.target.value;
    if (password.length >= 8) {
      setPasswordLengthCheck(true);
    } else {
      setPasswordLengthCheck(false);
    }
    if (password.match(/[A-Z]/) != null) {
      setCapitalLetterCheck(true);
    } else {
      setCapitalLetterCheck(false);
    }
    if (password.match(/[0-9]/) != null) {
      setNumberCheck(true);
    } else {
      setNumberCheck(false);
    }
  };

  const handleChangePassword = (e) => {
    if (e.target.id == "currentpass") {
      setCurrentpwd(e.target.value);
    }

    if (e.target.id == "reenterpass") {
      setNewpwd2(e.target.value);
    }
  };
  const formValidation = () => {
    // console.log('in formvalidation')
    // console.log(errors)
    let isValid = true;
    const errors = {};

    if (currentpwd == "") {
      errors.currentpwd = "Please enter your current password";
      isValid = false;
    }

    if (newpwd == "") {
      errors.newpwd = "New password should be specified";
      isValid = false;
    } else if (newpwd.length < 8) {
      errors.newpwd = "New password should have minimum of 8 characters";
      isValid = false;
    } else if (newpwd.match(/[A-Z]/) == null) {
      errors.newpwd = "New password must have atleast one UPPERCASE letter";
      isValid = false;
    } else if (newpwd.match(/[0-9]/) == null) {
      errors.newpwd = "New password must have number";
      isValid = false;
    }
    if (newpwd2 == "") {
      errors.newpwd2 = "Please re-enter your password";
      isValid = false;
    }
    if (newpwd != newpwd2) {
      errors.newpwd2 = "Entered passwords do not match";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const action = new UserActions(props.dispatch);

  const handleChangePwd = () => {
    let isValid = formValidation();

    if (isValid) {
      if (currentpwd == newpwd) {
        action.openSnackbar(
          "Current password and New password should not be same",
          true
        );
        action.showSnackbar;
      } else {
        const user = localStorage.getItem("user");

        axios({
          url:
            process.env.API_URL +
            process.env.API_VERSION +
            "/user/" +
            user +
            "/changepass/",
          method: "PUT",
          data: {
            old_password: currentpwd,
            new_password: newpwd,
          },
        })
          .then((res) => {
            // console.log({ result_pwd: res })
            setSuccessDialog(true);
            setChangePassword(false);
          })
          .catch((err) => {
            // // console.log({ error_changepass: err.response.data.data.results })
            // // console.log({props:props})
            // // console.log(err.response.data.data.results.old_password[0])
            action.openSnackbar(
              err.response.data.data.results.old_password[0],
              true
            );
            action.showSnackbar;
          });
      }
    } else {
      const touched = {
        currentpass: true,
        newpassword: true,
        reenterpass: true,
      };

      setTouched(touched);
    }
  };

  // console.log({ touched_return: touched })
  // console.log({ errors_return: errors })
  // console.log({ subbbb: subscriptions })
  // console.log({ subbb2: classicSub })

  return (
    // // console.log({"dcfgvhbjn":subscriptions})

    <Fragment>
      {/* <div>
      {
        runCallback(() => {
          const row = [];
		  const selectedStructure=JSON.parse(localStorage.getItem('selectedStructureList'))
          for (var i = 0; i < selectedStructure.length; i++) {
            row.push(<Chip size="small" label={selectedStructure[i]} />);
          }
          return (<Breadcrumbs

			className={classes.projectBreadcrumbs}
			separator={<NavigateNextIcon fontSize="small" />}
		>{row}</Breadcrumbs>);
        })
      }
    </div> */}

      {/* <Chip size="small" label="Phase 1" /> */}

      {/* </Breadcrumbs> */}
      {/* <div
			// 	//className={clsx(classes.root, className)}
			// 	className={clsx(classes.customHeaderColor)}
			// > */}
      {/* <Toolbar> */}
      {/* <RouterLink to="/dashboard">
						<Typography className={classes.logoBoxHeader}><div className={classes.logoBoxStyle}><img className={classes.logoImg} src={LogoImage} title="Company" alt="Company" /></div> <span>Pace Account</span></Typography>
					</RouterLink> */}
      <div className={classes.flexGrow} />
      {/* <Hidden mdDown> */}
      {/* <IconButton className={classes.topHeaderMenuHelpIcon} aria-label="Help">
				<HelpIcon />
			</IconButton> */}

      <Tooltip title="Apps" placement="bottom" arrow>
        <IconButton
          className={classes.topHeaderMenuIcon}
          aria-label="Help"
          ref={anchorRef}
          aria-controls={openA ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleTogga}
        >
          <img
            src="https://media.pace-os.com/icons/svg/app-drawer-24x24.svg"
            alt="Apps"
          />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        className={classes.appDrawerSection}
        open={openA}
        role={undefined}
        transition
        disablePortal
      >
        <div elevation={3} className={classes.appDropWidth}>
          <ClickAwayListener onClickAway={handleClosea}>
            <List component="nav">
              {classicSub.length > 0
                ? classicSub.map((subscription) =>
                    subscription.modules.length > 0 ? (
                      <div>
                        <ListItemText
                          className={classes.appDrawerLable}
                          primary={subscription.appName}
                        />
                        <Divider />
                        <List>
                          {subscription.modules.map((module) => (
                            // // console.log({moduleIcon:module.moduleIcon})

                            <div>
                              <ListItemLink
                                disabled={!apps.includes(module.moduleCode)}
                                onClick={() =>
                                  handleLinkClick(module.moduleCode)
                                }
                                rel="noopener noreferrer"
                                target="_blank"
                                className={classes.appDrawerLink}
                              >
                                {Boolean(module.moduleIcon) ? (
                                  <img src={module.moduleIcon} />
                                ) : (
                                  <AssignmentIcon />
                                )}

                                {/* <AssignmentIcon /> */}

                                <ListItemText primary={module.moduleWebName} />
                              </ListItemLink>
                            </div>
                          ))}
                        </List>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : subscriptions.map((subscription) =>
                    subscription.modules.length > 0 ? (
                      <div>
                        <ListItemText
                          className={classes.appDrawerLable}
                          primary={subscription.appName}
                        />
                        <Divider />
                        <List>
                          {subscription.modules.map((module) => (
                            // // console.log({moduleIcon:module.moduleIcon})

                            <div>
                              <ListItemLink
                                disabled={!apps.includes(module.moduleCode)}
                                onClick={() =>
                                  handleLinkClick(module.moduleCode)
                                }
                                rel="noopener noreferrer"
                                target="_blank"
                                className={classes.appDrawerLink}
                              >
                                {Boolean(module.moduleIcon) ? (
                                  <img src={module.moduleIcon} />
                                ) : (
                                  <AssignmentIcon />
                                )}

                                {/* <AssignmentIcon /> */}

                                <ListItemText primary={module.moduleWebName} />
                              </ListItemLink>
                            </div>
                          ))}
                        </List>
                      </div>
                    ) : (
                      ""
                    )
                  )}

              <Divider />
              {/* <ListItemText
									className={classes.appDrawerLable}
									disableTypography
									primary="People"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Competency" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="People Networks" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Identity &amp; Access" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Daily Access" />
									</ListItemLink>
									</List>
									<Divider />
									<ListItemText
									className={classes.appDrawerLable}
									disableTypography
									primary="Asset &amp; Equipment"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Assets" />
									</ListItemLink>
									</List>
									<Divider />
									<ListItemText
									className={classes.appDrawerLable}
									disableTypography
									primary="Safety Management"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Assessments" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Observations" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Compliance &amp; Audits" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Permits" />
									</ListItemLink>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Incidents" />
									</ListItemLink>
									</List>
									<Divider />
									<ListItemText
									className={classes.appDrawerLable}
									disableTypography
									primary="Action Tracker"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
									<AssignmentIcon /><ListItemText primary="Actions" />
									</ListItemLink>
									</List>
									<Divider />
									<ListItemText
									className={classes.appDrawerLable}
									disableTypography
									primary="Digital Command &amp; Control Tower"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Digital Control Tower" />
									</ListItemLink>
									</List>
									<Divider />
									<ListItemText
										className={classes.appDrawerLable}
										disableTypography
										primary="Knowledge"
									/>
									<Divider />
									<List>
									<ListItemLink href="#" className={classes.appDrawerLink}>
										<AssignmentIcon /><ListItemText primary="Orientation &amp; Learnings" />
									</ListItemLink>
									</List> */}
            </List>
          </ClickAwayListener>
        </div>
      </Drawer>

      <Hidden smDown>
        <Tooltip title={company.companyName} placement="bottom" arrow>
          <span className={classes.textCenter}>
            {Boolean(company.logo) ? (
              <img className={classes.image} src={company.logo} />
            ) : (
              <span className={classes.clientHeadLogo}>
                {company.companyName}
              </span>
            )}
          </span>
        </Tooltip>
      </Hidden>
      <Tooltip
        title={
          <>
            <h2 className={classes.toolTitle}>PACE account</h2>
            <span className={classes.toolSubName}>
              {localStorage.getItem("name")}
            </span>
          </>
        }
        placement="bottom"
        arrow
      >
        <IconButton
          className={classes.topHeaderMenuIcon}
          aria-label="Profile"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {/* {Boolean(company.logo) ?
						<img className={classes.image} src={company.logo} />
						: <span className={classes.clientHeadLogo}>{company.companyName}</span>
					}

					{// console.log({ 'avvv': avatar })} */}

          {avatar ? (
            <Avatar alt="profile image " src={avatar} />
          ) : (
            <Avatar className={classes.orange}>
              {avatar ? avatar : getInitials(name)}
            </Avatar>
          )}
          {/* <Avatar className={classes.orange} src={(localStorage.getItem('avatar') != 'null') ? localStorage.getItem('avatar') : getInitials(name)}></Avatar> */}
          {/* <Avatar className={classes.orange}>{getInitials(localStorage.getItem('name'))}</Avatar> */}

          {/* <Avatar alt="Remy Sharp" src={Ellipse} /> */}
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.dropwidth}>
              <ClickAwayListener onClickAway={handleClose}>
                <div
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <div className={classes.profilePicImg}>
                    {/* { ((avatar) ?
									(<Avatar className={classes.large} alt="profile image " src={avatar} />)
									: (<Avatar className={classes.large}>{(avatar) ? avatar : getInitials(name)}</Avatar>)
								) } */}

                    {avatar ? (
                      <Avatar
                        className={classes.large}
                        alt="profile image "
                        src={avatar}
                      />
                    ) : (
                      <Avatar className={classes.large}>
                        {avatar ? avatar : getInitials(name)}
                      </Avatar>
                    )}
                    {/* <Avatar className={classes.large}>{getInitials(localStorage.getItem('name'))}</Avatar> */}
                    {/* <Avatar alt="Remy Sharp" src={Ellipse} className={classes.large} /> */}
                    <Typography variant="h2">
                      {localStorage.getItem("name")}
                    </Typography>
                    <Typography variant="h6">
                      {localStorage.getItem("email")}
                    </Typography>
                  </div>
                  {/* <Divider className={classes.divider} /> */}
                  <MenuList className={classes.profileList}>
                    <RouterLink to="/userprofile">
                      <MenuItem onClick={handleClose}>
                        <img
                          src="https://media.pace-os.com/icons/svg/profile-24x24.svg"
                          alt="Profile"
                        />{" "}
                        Profile
                      </MenuItem>
                    </RouterLink>
                    <RouterLink>
                      <MenuItem onClick={handleClickChangePassword}>
                        <img
                          src="https://media.pace-os.com/icons/svg/change-passwrod-teal-24x24.svg"
                          alt="Change password"
                        />{" "}
                        Change password
                      </MenuItem>
                    </RouterLink>
                    {/* <RouterLink to="/changepassword">
											<MenuItem onClick={handleClose}>Change Password</MenuItem>
										</RouterLink> */}

                    <MenuItem className={classes.logoutStylBtn}>
                      <Button
                        size="medium"
                        variant="contained"
                        className={classes.buttonStyleDropdown}
                        onClick={() => {
                          document.cookie =
                            "mypassword=" + "" + ";path=" + process.env.API_URL;
                          document.cookie =
                            "previouspath=" +
                            "" +
                            ";path=" +
                            process.env.API_URL;
                          userActions.logout();
                          // history.push("/user/logout");
                        }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </MenuList>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {/* </Hidden>
					<Hidden lgUp>
						<IconButton
							//color="inherit"
							onClick={onSidebarOpen}
							className={classes.toglIconStyl}
						>
							<MenuIcon />
						</IconButton>
					</Hidden> */}
      {/* </Toolbar> */}
      {/* </div> */}

      <Dialog
        maxWidth={maxWidth}
        onClose={handleCloseChangePass}
        aria-labelledby="customized-dialog-title"
        className={classes.dialogSection}
        open={changePassword}
      >
        <DialogTitle
          id="customized-dialog-title"
          className={classes.dialogTitileBox}
          onClose={handleCloseChangePass}
        >
          Change password
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
              <TextField
                id="currentpass"
                label="Current password"
                variant="outlined"
                name="currentpass"
                type="password"
                value={currentpwd}
                helperText={
                  touched.currentpass && Boolean(errors.currentpwd)
                    ? errors.currentpwd
                    : ""
                }
                onChange={(e) => {
                  handleChangePassword(e);
                  formValidation();
                }}
                onBlur={(e) => {
                  handleTouch(e);
                  formValidation();
                }}
                error={touched.currentpass && Boolean(errors.currentpwd)}
                //className={classes.formControl}
                fullWidth
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
              <TextField
                id="newpassword"
                label="New password"
                variant="outlined"
                name="newpassword"
                type="password"
                value={newpwd}
                onChange={(e) => {
                  handlePwdValidation(e);
                  formValidation();
                }}
                helperText={
                  touched.newpassword && Boolean(errors.newpwd)
                    ? errors.newpwd
                    : ""
                }
                onBlur={(e) => {
                  handleTouch(e);
                  formValidation();
                }}
                error={touched.newpassword && Boolean(errors.newpwd)}
                fullWidth
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
                      passwordLengthCheck
                        ? classes.progresBoxSucess
                        : newpwd.length > 0
                        ? classes.progresBoxWarning
                        : classes.progresBox
                    }
                  ></span>
                  <ListItemText primary="Minimum 8 characters length." />
                </ListItem>
                <ListItem>
                  <span
                    className={
                      capitalLetterCheck
                        ? classes.progresBoxSucess
                        : newpwd.length > 0
                        ? classes.progresBoxWarning
                        : classes.progresBox
                    }
                  ></span>
                  <ListItemText primary="Must have at least one UPPERCASE character." />
                </ListItem>
                <ListItem>
                  <span
                    className={
                      numberCheck
                        ? classes.progresBoxSucess
                        : newpwd.length > 0
                        ? classes.progresBoxWarning
                        : classes.progresBox
                    }
                  ></span>
                  <ListItemText primary="Must have number." />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
              <TextField
                id="reenterpass"
                label="Re-enter password"
                variant="outlined"
                name="reenterpass"
                type="password"
                value={newpwd2}
                onChange={(e) => {
                  handleChangePassword(e);
                  formValidation();
                }}
                helperText={
                  touched.reenterpass && Boolean(errors.newpwd2)
                    ? errors.newpwd2
                    : ""
                }
                onBlur={(e) => {
                  handleTouch(e);
                  formValidation();
                }}
                error={touched.reenterpass && Boolean(errors.newpwd2)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            className={classes.buttonStyle}
            onClick={handleChangePwd}
          >
            Change password
          </Button>
          <Button
            autoFocus
            className={classes.custmCancelBtn}
            onClick={handleCloseChangePass}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth={maxWidth}
        aria-labelledby="customized-dialog-title"
        className={classes.dialogSection}
        open={successDialog}
      >
        <DialogTitle
          id="customized-dialog-title"
          className={classes.dialogTitileBox}
          onClose={handleCloseSuccessdialog}
        ></DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} xs={12}>
              <Typography
                variant="h2"
                align="center"
                className={classes.successSymbol}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                >
                  <path
                    id="noun-success-3113542"
                    d="M62.3,44.557a1.428,1.428,0,0,1,0,2.028L49.445,59.443a1.428,1.428,0,0,1-1.014.414h-.086a1.429,1.429,0,0,1-1.029-.543L41.6,52.172A1.429,1.429,0,1,1,43.83,50.4l4.714,5.886L60.274,44.557a1.428,1.428,0,0,1,2.028,0ZM72,52a20,20,0,1,1-5.858-14.142A20,20,0,0,1,72,52Zm-2.857,0a17.142,17.142,0,1,0-5.021,12.122A17.145,17.145,0,0,0,69.145,52Z"
                    transform="translate(-32.002 -32)"
                    fill="#06425c"
                  />
                </svg>
              </Typography>
              <Typography
                variant="h2"
                align="center"
                className={classes.successText}
              >
                Success!
              </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12} align="center">
              <Typography
                variant="h6"
                className={classes.successMessage}
                align="center"
              >
                Your password has been changed!
              </Typography>
              <Typography
                variant="h6"
                className={classes.successMessage}
                align="center"
              >
                Please login with new password
              </Typography>
              <div className={classes.btnToLogin}>
                <Button
                  autoFocus
                  color="primary"
                  className={classes.buttonStyle}
                  onClick={() => userActions.logout()}
                >
                  OK
                </Button>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

function mapStateToProps(state, props) {
  return { user: state };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);

// const mapStateToProps = state => {
// 	return {
// 	  user: state
// 	};
//   };
// export default connect(mapStateToProps)(Topbar);

// export default Topbar;
