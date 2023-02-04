import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useHistory } from "react-router-dom";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import AddInviteUser from "./AddInviteUser";

const useStyles = makeStyles((theme) => ({
  DepartmentListSection: {
    padding: "10px 24px;",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px 15px;",
      marginTop: "0px",
    },
  },
  contentTitle: {
    fontSize: "24px",
    lineHeight: "50px",
    fontFamily: "xolonium",
    color: "#054D69",
    paddingBottom: "5px",
    borderBottom: "1px solid #d6d9da",
    marginBottom: "30px",
    "& svg": {
      verticalAlign: "middle",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      lineHeight: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  mainGroupSection: {
    paddingTop: "0px !important",
  },
  paperSection: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  iconGroupTitle: {
    paddingBottom: "2px !important",
    paddingTop: "0px !important",
    "& h6": {
      color: "#06425C",
      fontSize: "16px",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "19px",
      paddingTop: "8px",
      "& svg": {
        verticalAlign: "middle",
      },
    },
  },
  buttonActionArea: {
    marginTop: "20px",
  },
  buttonStyle: {
    marginRight: "15px",
    fontSize: "14px",
    textTransform: "none",
    padding: "6px 20px",
    backgroundColor: "#06425C",
    color: "#ffffff !important",
    border: "1px solid #06425C",
    borderRadius: "20px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "1px solid #ff8533",
    },
  },
  custmCancelBtn: {
    fontSize: "14px",
    textTransform: "none",
    padding: "6px 20px",
    backgroundColor: "#ffffff",
    color: "#06425C",
    border: "1px solid #06425C",
    borderRadius: "20px",
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      color: "#ffffff",
      border: "1px solid #ff8533",
    },
  },
  formControl: {
    width: "100%",
  },
  multiSelectChek: {
    "& .MuiInputLabel-shrink": {
      backgroundColor: "#fafafa",
      paddingRight: "0.313rem",
      paddingLeft: "0.188rem",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
  },
  increasActionArea: {
    padding: "8px 0px !important",
    marginTop: "11px",
    "& button": {
      padding: "8px",
      "&:hover": {
        color: "#F28705",
      },
    },
  },
  increasActionAreaPlus: {
    padding: "0px 0px !important",
    float: "right",
    "& button": {
      padding: "8px",
      float: "right",
      "&:hover": {
        color: "#F28705",
      },
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
  formBoxFunctionalRol: {
    position: "relative",
    paddingTop: "24px",
    "& .MuiTextField-root": {
      width: "calc(100% - 78px)",
      paddingRight: "15px",
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
  },
  subGroupTitle: {
    fontSize: "14px",
    color: "#666666",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "19px",
  },
  subGroupTitleB: {
    fontSize: "14px",
    color: "#666666",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "19px",
    marginTop: "5px",
  },
  simpleTableDesign: {
    "& thead tr th": {
      backgroundColor: "#06425c",
      color: "#ffffff",
      padding: "1rem",
      whiteSpace: "nowrap",
      fontFamily: "Montserrat-Medium",
      "& button": {
        backgroundColor: "#06425c",
        color: "#ffffff",
        padding: "0",
        whiteSpace: "nowrap",
        fontFamily: "Montserrat-Medium",
        margin: "0px",
        "& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon, div":
          {
            color: "#ffffff",
            fontSize: "14px",
            margin: "0px",
          },
        "& .MuiTableSortLabel-root.MuiTableSortLabel-root .MuiTableSortLabel-icon, div":
          {
            fontSize: "14px",
            margin: "0px",
          },
      },
      "&:first-child": {
        borderTopLeftRadius: "8px",
        width: "60px",
      },
      "&:last-child": {
        borderTopRightRadius: "8px",
        width: "100px",
        "&>span": {
          float: "right",
        },
      },
    },
    "& tbody tr td": {
      //minWidth: '120px',
      padding: "12px 16px",
      fontFamily: "Montserrat-Regular",
      color: "rgba(0, 0, 0, 0.87)",
      "& .MuiFormGroup-root .MuiFormControlLabel-root": {
        marginLeft: "0px",
        marginRight: "0px",
        marginBottom: "0px",
        display: "block",
        "& .MuiSwitch-sizeSmall": {
          width: "50px",
          height: "25px",
          padding: "6px",
          "& .MuiSwitch-track": {
            backgroundColor: "rgba(0, 0, 0, 0.54)",
            opacity: "1",
          },
          "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(25px)",
            color: "#ffffff",
          },
          "& .Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#F28705",
          },
        },
        "& .MuiSwitch-thumb": {
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 0.54), 0px 1px 1px 0px rgb(0 0 0 / 0.54), 0px 1px 3px 0px rgb(0 0 0 / 0.54)",
        },
      },
      "& a": {
        cursor: "pointer",
        float: "right",
        marginRight: "8px",
        "&:hover": {
          color: "rgba(0, 0, 0, 0.54)",
        },
        "& svg": {
          fontSize: "20px",
        },
      },
      "& button": {
        // float: 'left',
        display: "inline-block",
        borderRadius: "50px",
        padding: "10px",
        minWidth: "20px",
        color: "#757575",
        "& .MuiButton-label": {
          width: "auto",
        },
        "& svg": {
          fontSize: "20px",
        },
      },
    },
  },
  tabSectionDesign: {
    "& header": {
      // backgroundColor: "transparent",
      backgroundColor: "#7890A4",
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      // boxShadow: "none",
      boxShadow:
        "0px 0px 0px -1px rgb(0 0 0 / 20%), 0px 0px 5px 0px rgb(0 0 0 / 14%), 0px 1px 4px 0px rgb(0 0 0 / 12%)",
      "& button": {
        fontSize: "14px",
        textTransform: "none",
        fontFamily: "MontSerrat-Medium",
        color: "#ffffff",
        padding: "14px",
        opacity: "1",
        "&.MuiTab-textColorInherit": {
          // borderRadius: "5px",
          // backgroundColor: "#517b8d",
          // color: "#ffffff",
          // marginRight: "16px",
          // padding: '8px 15px',
          // minHeight: '42px',
          // lineHeight: '19px',
          // minWidth: 'auto',
          // "&:hover": {
          //   backgroundColor: "#f47607",
          // },
          "&.Mui-selected": {
            // backgroundColor: "#f47607",
            // "&:hover": {
            //   backgroundColor: "#f47607",
            // },
            backgroundColor: "#ffffff",
            color: "#06425c",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          },
        },
      },
    },
  },
  tabContentSection: {
    boxShadow:
      "0px 1px 5px -2px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px 1px 6px 0px rgb(0 0 0 / 12%)",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    "& .MuiBox-root": {
      padding: "15px",
    },
  },
  buttonAddStyle: {
    fontSize: "14px",
    textTransform: "none",
    color: "#ffffff",
    padding: "8px 15px 7px 10px",
    backgroundColor: "#7890A4",
    color: "#ffffff",
    border: "1px solid #7890A4",
    borderRadius: "20px",
    marginTop: "6px",
    "& svg": {
      fontSize: "21px",
    },
    "&:hover": {
      backgroundColor: "#ff8533",
      color: "#ffffff",
      border: "1px solid #ff8533",
    },
  },

  backPaperAccordianMTNone: {
    // border: "0rem solid #06425c",
    // borderRadius: "8px !important",
    // boxShadow: "0rem 0rem 0rem 0.063rem #7890a4 !important",
    // marginBottom: "15px !important",
    boxShadow: "none",
    borderBottom: "1px solid #ccc",
    borderBottomLeftRadius: "0px !important",
    borderBottomRightRadius: "0px !important",
    marginBottom: "5px",
    "&.Mui-expanded": {
      borderBottom: "none",
      marginBottom: "5px !important",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px",
    },
    "& .accordionHeaderSection.Mui-expanded": {
      borderRadius: "0rem",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      // minHeight: "55px !important",
      // marginBottom: "15px !important",
      // borderBottomLeftRadius: "0px !important",
      // borderBottomRightRadius: "0px !important",
      padding: "0px",
    },
  },
  accordionHeaderSection: {
    // backgroundColor: "#7890A4",
    color: "#06425C",
    padding: "0px",
    // borderRadius: "8px !important",
    //marginBottom: '0.938rem',
    marginBottom: "5px",
    "& .MuiButtonBase-root": {
      color: "#06425C !important",
    },
    "& .MuiAccordionSummary-content": {
      margin: "0rem 0rem",
      "&:before": {
        content: "none",
      },
      "&.Mui-expanded": {
        borderTopLeftRadius: "8px !important",
        borderTopRightRadius: "8px !important",
        "&:before": {
          content: "none",
        },
      },
    },
    "& .MuiAccordionSummary-expandIcon": {
      color: "#ffffff",
      "&.Mui-expanded": {
        transform: "rotate(180deg)!important",
        color: "#ffffff",
      },
    },
  },
  heading: {
    width: "100%",
    "& p": {
      fontWeight: "500",
    },
    "& span": {
      color: "#06425C",
      opacity: "1",
      fontSize: "15px",
      fontFamily: "MontSerrat-SemiBold",
      textTransform: "none",
    },
  },
  accordingHeaderContentLeft: {
    display: "inline-block",
    width: "auto",
    padding: "0rem",
  },

  viewLabel: {
    fontSize: "0.875rem",
    fontFamily: "Montserrat-Regular",
    color: "#7692A4",
    lineHeight: "1.125rem",
  },
  viewLabelValue: {
    fontSize: "0.875rem",
    fontFamily: "Montserrat-Medium",
    color: "#666666",
    lineHeight: "1.125rem",
  },
  customTooltip: {
    backgroundColor: "rgba(6, 66, 92, 0.8)",
    padding: "8px",
    fontFamily: "Montserrat-Regular",
  },
  customArrow: {
    color: "rgba(6, 66, 92, 0.8)",
  },
  custmSubmitBtn: {
    borderBottom: "1px solid #d6d9da",
    marginBottom: "30px",
    "&button": {
      //textTransform: 'capitalize',
      float: "right",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      padding: "5px 15px",
      fontSize: "14px",
      minWidth: "64px",
      boxSizing: "border-box",
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      fontFamily: "Montserrat-Medium",
      fontWeight: "500",
      lineHeight: "1.75",
      borderRadius: "4px",
      color: "#263238",
      "&:focus": {
        outline: "none",
      },
    },
    "& a": {
      //textTransform: 'capitalize',
      float: "right",
      //border: '1px solid rgba(0, 0, 0, 0.23)',
      padding: "8px 15px",
      fontSize: "14px",
      minWidth: "64px",
      boxSizing: "border-box",
      transition:
        "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      fontFamily: "Montserrat-Medium",
      fontWeight: "500",
      lineHeight: "1.75",
      borderRadius: "4px",
      color: "#ffffff",
      backgroundColor: "#06425c",
      "&:focus": {
        outline: "none",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "8px",
        fontSize: "12px",
        minWidth: "90px",
      },
    },
    "& a:hover": {
      backgroundColor: "#ff8533",
      color: "#ffffff",
    },
  },
  tabHeadSection: {
    color: "#ccc",
  },
  popActionArea: {
    padding: "16px 22px !important",
  },
  viewLabel: {
    fontSize: "14px",
    fontFamily: "Montserrat-Regular",
    color: "#7692A4",
    lineHeight: "18px",
  },
  viewLabelValue: {
    fontSize: "14px",
    fontFamily: "Montserrat-Medium",
    color: "#666666",
    lineHeight: "18px",
  },
  dialogSection: {
    "& .MuiDialog-paperWidthSm": {
      minWidth: "550px",
    },
  },
  viewListBox: {
    marginBottom: "15px",
  },
  dailogBoxCustomStyle: {
    "& .MuiPaper-root": {
      maxWidth: "520px",
      width: "100%",
    },
    "& .MuiDialogContentText-root": {
      marginBottom: "0px",
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
  actionSection: {
    marginTop: "20px",
    "& $buttonStyle": {
      marginRight: "0px",
    },
  },
  mobileViewSection: {
    borderBottom: "2px solid #ccc",
  },
  customBtn: {
    //textTransform: 'capitalize',
    float: "right",
    padding: "8px 15px",
    fontSize: "14px",
    minWidth: "64px",
    boxSizing: "border-box",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontFamily: "Montserrat-Medium",
    fontWeight: "500",
    lineHeight: "1.75",
    borderRadius: "4px",
    color: "#ffffff",
    backgroundColor: "#06425c",
    //marginTop: '6px',
    "& svg": {
      verticalAlign: "middle",
    },
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#ff8533",
      color: "#ffffff",
    },
  },
}));

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`simple-tabpanel-${index}`}
//             aria-labelledby={`simple-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

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
    "& svg": {
      fontSize: "16px",
    },
  },
  dialogTitileBox: {
    color: "#666666",
    fontSize: "16px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "19px",
  },
});

// const DialogTitle = withStyles(styles)((props) => {
//     const { children, classes, onClose, ...other } = props;

//     return (
//         <MuiDialogTitle disableTypography className={classes.root} {...other}>
//             <Typography className={classes.dialogTitileBox} variant="h6">{children}</Typography>
//             {onClose ? (
//                 <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
//                     <CloseIcon />
//                 </IconButton>
//             ) : null}
//         </MuiDialogTitle>
//     );
// });

const DialogContent = withStyles((theme) => ({
  root: {
    //padding: theme.spacing(2),
  },
}))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//     root: {
//         margin: 0,
//         padding: theme.spacing(1),
//     },
// }))(MuiDialogActions);

// function a11yProps(index) {
//     return {
//         id: `simple-tab-${index}`,
//         "aria-controls": `simple-tabpanel-${index}`,
//     };
// }

export default function InviteUser() {
  const classes = useStyles();

  // const [value, setValue] = useState(0);
  // const [value2, setValue2] = useState(0);
  // const [value3, setValue3] = useState(0);

  // const [checked, setChecked] = useState(false);
  // const [checked2, setChecked2] = useState(true);
  // const [changePassword, setChangePassword] = useState(false);
  // const [assignDepartment, setAssignDepartment] = useState(false);

  // const toggleChecked = () => {
  //     setChecked((prev) => !prev);
  // };
  // const toggleChecked2 = () => {
  //     setChecked2((prev) => !prev);
  // };
  // const handleChange = (event, newValue) => {
  //     setValue(newValue);
  // };
  // const handleChange2 = (event, newValue) => {
  //     setValue2(newValue);
  // };
  // const handleChange3 = (event, newValue) => {
  //     setValue3(newValue);
  // };

  const [newInviteRecipient, setNewInviteRecipient] = useState([{}]);

  const history = useHistory();

  const handleNewInviteRecipient = () => {
    let temp = [...newInviteRecipient];
    temp.push({});
    setNewInviteRecipient(temp);
  };
  const handleCloseNewInviteRecipient = (indexOne) => {
    console.log("close", indexOne);
    let temp = [...newInviteRecipient];
    let newData = temp.filter((item, key) => key !== indexOne);
    setNewInviteRecipient(newData);
    // console.log('closeclick', newData)
  };

  // const [inviteRecipient, setinviteRecipient] = useState([{}]);

  // const handleMoreQuestionCatgry = () => {
  //     let temp = [...inviteRecipient];
  //     temp.push({});
  //     setinviteRecipient(temp);
  // };
  // const handleCloseCatgry = (indexOne) => {
  //     console.log("close", indexOne);
  //     let temp = [...inviteRecipient];
  //     let newData = temp.filter((item, key) => key !== indexOne);
  //     setinviteRecipient(newData);
  //     // console.log('closeclick', newData)
  // };

  const ITEM_HEIGHT = 56;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    variant: "menu",
  };

  // const application = ["Safety", "Action tracker", "PACE classic"];

  // const module = ["Observation", "Compliance", "Assessments"];
  // const departmentAss = ['Mechanical', 'Civil']
  // const [applicationSelected, setApplicationSelected] = useState([]);
  // const [moduleSelected, setModuleSelected] = useState([]);

  // const [dpartmentAssign, setDpartmentAssign] = useState([]);

  // const isAllSelectedApplication =
  //     application.length > 0 && applicationSelected.length === application.length;
  // const isAllSelectedDepartment =
  //     departmentAss.length > 0 && dpartmentAssign.length === departmentAss.length;
  // const isAllSelectedModule =
  //     module.length > 0 && moduleSelected.length === module.length;

  // const handleApplicationSelectChange = (event) => {
  //     const value = event.target.value;
  //     if (value[value.length - 1] === "all") {
  //         setApplicationSelected(
  //             applicationSelected.length === application.length ? [] : application
  //         );
  //         return;
  //     }
  //     setApplicationSelected(value);
  // };
  // const handleModuleSelectChange = (event) => {
  //     const value = event.target.value;
  //     if (value[value.length - 1] === "all") {
  //         setModuleSelected(moduleSelected.length === module.length ? [] : module);
  //         return;
  //     }
  //     setModuleSelected(value);
  // };
  // const handleDepartmentSelectChange = (event) => {
  //     const value = event.target.value;
  //     if (value[value.length - 1] === "all") {
  //         setDpartmentAssign(dpartmentAssign.length === departmentAss.length ? [] : departmentAss);
  //         return;
  //     }
  //     setDpartmentAssign(value);
  // };

  // const [initialNotifTableView, setInitialNotifTableView] = useState("panel1");
  // const handleTDChange = (panel) => (event, isExpanded) => {
  //     setInitialNotifTableView(isExpanded ? panel : false);
  // };

  // const handleClickChangePassword = () => {
  //     setChangePassword(true);
  // };
  // const handleCloseChangePass = () => {
  //     setChangePassword(false);
  // };

  // const handleClickAssignDepartment = () => {
  //     setAssignDepartment(true);
  // }

  // const handleCloseAssignDepartment = () => {
  //     setAssignDepartment(false);
  // };

  const [succesAllInvitePopupOpen, setSuccesAllInvitePopupOpen] =
    useState(false);
  const [maxWidthCP, setMaxWidthCP] = useState("sm");

  const handleSuccessAllInvitPopoup = () => {
    setSuccesAllInvitePopupOpen(true);
  };
  const handlesuccesAllInvitePopupOpenClose = () => {
    setSuccesAllInvitePopupOpen(false);
  };

  const handleGoBack = () => {
    history.push("/invitelist");
  };

  return (
    <>
      {/* First project selection  */}
      <div className={classes.DepartmentListSection}>
        <Grid container spacing={0}>
          <Grid item md={10} sm={10} xs={9}>
            <Typography className={classes.contentTitle} varient="h1">
              <img
                src="https://media.pace-os.com/icons/svg/invite-user-40x40.svg"
                alt="Invite new"
              />{" "}
              Invite New Users
            </Typography>
          </Grid>
          <Grid item md={2} sm={2} xs={3} className={classes.custmSubmitBtn}>
            <Link
              to="/invite-bulk-list"
              variant="outlined"
              button
              size="medium"
            >
              Import data
            </Link>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            className={classes.mainGroupSection}
          >
            <Paper elevation={1} className={classes.paperSection}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                      <Link
                        className={classes.customBtn}
                        onClick={() => handleNewInviteRecipient()}
                        variant="outlined"
                        button
                        size="medium"
                      >
                        <AddCircleOutlineIcon fontSize="small" /> Add another
                        user
                      </Link>
                    </Grid>

                    {/* Add another user list section */}
                    {newInviteRecipient.map((value, indexOne) => (
                      <>
                        <Grid
                          item
                          md={newInviteRecipient.length > 1 ? 12 : 12}
                          sm={newInviteRecipient.length > 1 ? 12 : 12}
                          xs={newInviteRecipient.length > 1 ? 12 : 12}
                        >
                          <AddInviteUser />
                        </Grid>

                        {/* {newInviteRecipient.length > 1 ? (
                                                    <>
                                                        <Grid
                                                            item
                                                            md={1}
                                                            sm={1}
                                                            xs={1}
                                                            className={classes.increasActionArea}
                                                        >
                                                            <Tooltip
                                                                title="Delete this user group"
                                                                arrow
                                                                classes={{
                                                                    tooltip: classes.customTooltip,
                                                                    arrow: classes.customArrow,
                                                                }}
                                                            >
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    onClick={() =>
                                                                        handleCloseNewInviteRecipient(indexOne)
                                                                    }
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </>
                                                ) : null} */}
                      </>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            className={classes.buttonActionArea}
          >
            <Button
              size="medium"
              variant="contained"
              className={classes.buttonStyle}
              onClick={handleSuccessAllInvitPopoup}
            >
              Invite
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={handleGoBack}
              className={classes.custmCancelBtn}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

        {/* Success popup */}
        <Dialog
          maxWidth={maxWidthCP}
          open={succesAllInvitePopupOpen}
          onClose={handlesuccesAllInvitePopupOpenClose}
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
                      src="https://media.pace-os.com/icons/svg/success-72x72.svg"
                      alt="Thanks"
                    />
                  </Typography>
                  <Typography
                    variant="h2"
                    className={classes.successMessTitle}
                    align="center"
                  >
                    Successful
                  </Typography>
                  <Typography
                    variant="h6"
                    className={classes.successMessContent}
                    align="center"
                  >
                    All users has been invited successfully
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
                    onClose={handlesuccesAllInvitePopupOpenClose}
                  >
                    OK
                  </Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* End success popup */}
      </div>
    </>
  );
}
