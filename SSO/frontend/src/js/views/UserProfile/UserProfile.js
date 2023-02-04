import React, { Component, Fragment, forwardRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  DialogTitle,
  OutlinedInput,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DoneIcon from "@material-ui/icons/Done";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ellipse from "../../../../../static/public/images/LoginImg/ellipse.png";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UserActions } from "../../user/UserActions";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Badge from "@material-ui/core/Badge";
import { getInitials } from "../../../helpers";
import CardActions from "@material-ui/core/CardActions";
import AddIcon from "@material-ui/icons/Add";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import dateFormat from "../../../helpers/dateFormat";
import classNames from "classnames";
import SecurityQuestions from "./SecurityQuestions";

const styles = (theme) => ({
  userProfileSection: {
    padding: "24px;",
  },
  textCenter: {
    textAlign: "center",
  },
  buttonStyleNext: {
    color: "#ffffff !important",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "none",
    backgroundColor: "#06425C",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    float: "right",
    "&:hover": {
      backgroundColor: "#F28705",
      borderColor: "#F28705",
    },
  },
  dialogSection: {
    "& .MuiPaper-root.MuiDialog-paper": {
      width: "650px",
    },
  },
  questionInputLabel: {
    color: "#06425C",
    width: "100%",
    marginBottom: "10px",
    textAlign: "left",
    fontFamily: "Montserrat-SemiBold",
    fontSize: "14px",
    lineHeight: "18px",
    display: "inline-block",
    float: "left",
  },
  securityQuesInput: {
    "& .MuiFormControl-root": {
      "& fieldset": {
        "& legend": {
          width: "auto",
        },
      },
    },
  },
  securityQuesInput: {
    "& .MuiFormControl-root": {
      "& fieldset": {
        "& legend": {
          width: "auto",
        },
      },
    },
  },
  paddTRemove: {
    paddingTop: "0px !important",
  },
  securityQLabel: {
    color: "#06425C",
    fontSize: "16px !important",
    fontFamily: "Montserrat-Medium !important",
    lineHeight: "19px",
    fontWeight: "normal",
  },
  buttonStyle: {
    color: "#ffffff !important",
    padding: "7px 20px",
    fontSize: "14px",
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
  securityQstatus: {
    "& ul": {
      paddingTop: "0px",
      "& li": {
        padding: "0px",
        "& .MuiListItemAvatar-root": {
          marginTop: "5px",
          minWidth: "48px",
        },
        "& .MuiListItemText-root": {
          margin: "0px",
          "& .MuiListItemText-primary": {
            color: "#06425C",
            fontSize: "16px",
            fontFamily: "Montserrat-SemiBold !important",
            lineHeight: "19px",
            whiteSpace: "normal",
          },
        },
      },
    },
  },
  contentTitle: {
    fontSize: "30px",
    lineHeight: "50px",
    fontFamily: "xolonium",
    color: "#054D69",
    paddingBottom: "5px",
    borderBottom: "1px solid #d6d9da",
    marginBottom: "30px",
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      lineHeight: "40px",
    },
  },
  mainGroupShowSection: {
    paddingTop: "6px !important",
  },
  paperSection: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    paddingBottom: "20px",
    boxShadow: "0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
    "& .MuiGrid-root": {
      "& .MuiCard-root": {
        boxShadow:
          "0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)",
      },
    },
  },
  accordionHead: {
    "& .MuiTypography-body1": {
      color: "#05374A",
      fontSize: "22px",
      fontFamily: "Montserrat-SemiBold",
    },
  },
  formBoxSection: {
    marginBottom: "40px",
  },
  editFormBtn: {
    padding: "0px !important",
    "& .MuiIconButton-root": {
      float: "right",
    },
    "& button:focus": {
      outline: "none !important",
    },
    "& .MuiFab-extended": {
      height: "40px",
      padding: "0 9px",
      minWidth: "40px",
      borderRadius: "50px",
      float: "right",
      margin: "0px 5px",
      "& svg": {
        fontSize: "18px",
        color: "#054D69",
      },
    },
  },
  custmSubmitBtn: {
    textTransform: "capitalize",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#06374a",
      color: "#ffffff",
    },
  },
  custmCancelBtn: {
    textTransform: "capitalize",
    marginLeft: "5px",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#f28705",
      color: "#ffffff",
    },
  },
  formBox: {
    position: "relative",
    padding: "5px 12px !important",
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
  verifidIcon: {
    position: "absolute",
    right: "7px",
    top: "8px",
    "&:focus": {
      outline: "none",
    },
  },
  userProfileView: {
    "& .MuiListItemText-primary": {
      fontSize: "13px",
      color: "#06374a",
      fontFamily: "Montserrat-Regular",
    },
    "& .MuiListItemText-secondary": {
      fontSize: "15px",
      color: "#06374a",
      fontFamily: "Montserrat-Medium",
      lineHeight: "26px",
    },
  },
  profileImgBox: {
    "& input": {
      display: "none",
    },
    "& .MuiAvatar-root": {
      width: "80px",
      height: "80px",
      position: "relative",
    },
    "& .MuiButtonBase-root": {
      position: "absolute",
      left: "46px",
      top: "45px",
    },
    "& .MuiSvgIcon-root": {
      color: "#054D69",
    },
  },
  verifBubble: {
    "& .MuiBadge-badge": {
      backgroundColor: "#00c853",
      color: "#ffffff",
      left: "16px",
    },
  },
  notVerifBubble: {
    "& .MuiBadge-badge": {
      backgroundColor: "#e53935",
      color: "#ffffff",
      width: "68px",
      fontSize: "10px",
    },
  },

  addAddCardBox: {
    minHeight: "260px",
    border: "1px dashed #ccc",
    "& .MuiCardContent-root": {
      padding: "0px",
      "& button": {
        width: "100%",
        height: "260px",
        display: "block",
        "& svg": {
          fontSize: "65px",
          color: "#054D69",
        },
        "& .MuiTypography-root": {
          fontSize: "20px",
          color: "#054D69",
          fontFamily: "Montserrat-Medium",
          lineHeight: "30px",
        },
      },
      "& button:focus": {
        outline: "none",
      },
    },
  },
  addressViewBox: {
    minHeight: "260px",
    position: "relative",
  },
  toNameText: {
    fontSize: "16px",
    color: "#054D69",
    fontFamily: "Montserrat-Medium",
    lineHeight: "20px",
  },
  addressTest: {
    fontSize: "14px",
    color: "#000000",
    fontFamily: "Montserrat-Regular",
    lineHeight: "24px",
  },
  addressActionBox: {
    position: "absolute",
    display: "block",
    bottom: "0px",
    width: "100%",
    "& button": {
      fontSize: "16px",
      color: "#054D69",
      fontFamily: "Montserrat-Medium",
      lineHeight: "20px",
    },
    "& button:focus": {
      outline: "none",
    },
  },
  addressTabBox: {
    position: "absolute",
    right: "5px",
    "& svg": {
      color: "#f28705",
    },
  },
  addressFormSection: {
    paddingBottom: "20px",
    paddingTop: "10px",
    "& .MuiGrid-item": {
      float: "left",
      width: "100%",
    },
    "& textarea": {
      padding: "0px !important",
    },
  },
  addressTypeBox: {
    "& .MuiFormControlLabel-root": {
      marginBottom: "0px",
    },
    "& .MuiRadio-colorPrimary.Mui-checked": {
      color: "#f28705",
    },
  },
});

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.action = new UserActions(this.props.dispatch);
    const { classes } = this.props;
  }
  state = {
    expanded: "panel1",
    accountShow: false,
    personalShow: false,
    identityShow: false,
    locationShow: false,
    addressFormShow: false,
    editForm: false,
    open: false,
    addressData: [],
    addressDelete: {},
    gender: "",
    bloodgroop: "",
    country: "",
    cstate: "",
    city: "",
    timezone: "",
    user: {},
    errors: {},
    touched: {},
    account: { name: "", email: "", mobile: "" },
    personal: {
      badgeNo: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      donateBlood: "",
      alternateEmail: "",
      alternateMobile: "",
    },
    identity: { panOrTaxid: "" },
    location: { country: "", state: "", city: "", timeZone: "" },
    address: {
      user_name: "",
      addressLineOne: "",
      addressLineTwo: "",
      landmark: "",
      postalCode: "",
      country: "",
      state: "",
      city: "",
      addressTag: "",
      addressTo: "",
    },
    errors: {},
    touched: {},
    avatar: [],
    isLoad: false,
    imageHash: Date.now(),
    assignDepartment: false,
    securitValuesOne: {
      password: "",
      showPassword: false,
    },
    securityQuestions: [],
  };

  handleCloseAssignDepartment = () => {
    this.setState({ assignDepartment: false });
  };

  handleClickAssignDepartment = async () => {
    this.setState({ assignDepartment: true });
  };

  handleExpand = (panel) => (event, isExpanded) => {
    this.setState({ expanded: isExpanded ? panel : false });
  };
  handleTouch = (e) => {
    let { touched } = this.state;
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched });
    }
  };

  formValidation = () => {
    const { name } = this.state.account;
    let isValid = true;
    const errors = {};

    if (name == "") {
      errors.name = "User Name can not be blank";
      isValid = false;
    }

    this.setState({ errors });
    return isValid;
  };

  genders = [
    {
      value: "select-gender",
      label: "Select Gender",
    },
    {
      value: "Male",
      label: "Male",
    },
    {
      value: "Female",
      label: "Female",
    },
    {
      value: "Neutral",
      label: "Neutral",
    },
  ];
  bloodgroops = [
    {
      value: "select-bloodgrups",
      label: "Select Blood Group",
    },
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "AB",
      label: "AB",
    },
    {
      value: "O+",
      label: "O+",
    },
  ];
  countries = [
    {
      value: "select-country",
      label: "Select Country",
    },
    {
      value: "India",
      label: "India",
    },
    {
      value: "Nepal",
      label: "Nepal",
    },
    {
      value: "SriLanka",
      label: "Sri Lanka",
    },
    {
      value: "Chin",
      label: "Chin",
    },
    {
      value: "Pakistan",
      label: "Pakistan",
    },
  ];
  cstates = [
    {
      value: "select-contrystate",
      label: "Select State",
    },
    {
      value: "Maharashtra",
      label: "Maharashtra",
    },
    {
      value: "Uttar Pradesh",
      label: "Uttar Pradesh",
    },
    {
      value: "Delhi",
      label: "Delhi",
    },
    {
      value: "Gujrat",
      label: "Gujrat",
    },
    {
      value: "Madhya Pradesh",
      label: "Madhya Pradesh",
    },
  ];
  cities = [
    {
      value: "select-cities",
      label: "Select City",
    },
    {
      value: "Mumbai",
      label: "Mumbai",
    },
    {
      value: "Delhi",
      label: "Delhi",
    },
    {
      value: "Indore",
      label: "Indore",
    },
    {
      value: "Surat",
      label: "Surat",
    },
    {
      value: "Lakhnau",
      label: "Lakhnau",
    },
  ];
  timezones = [
    {
      value: "select-time-zone",
      label: "Select Time Zone",
    },
    {
      value: "India",
      label: "India",
    },
    {
      value: "Nepal",
      label: "Nepal",
    },
    {
      value: "SriLanka",
      label: "Sri Lanka",
    },
    {
      value: "Chin",
      label: "Chin",
    },
    {
      value: "Europe",
      label: "Europe",
    },
  ];

  handleEdit = () => {
    console.log({ accountShow: this.state.accountShow });
    this.setState({ accountShow: !this.state.accountShow });
  };
  handleEditPersonal = () => {
    console.log({ personalShow: this.state.personalShow });
    this.setState({ personalShow: !this.state.personalShow });
  };
  handleEditIdentity = () => {
    console.log({ identityShow: this.state.identityShow });
    this.setState({ identityShow: !this.state.identityShow });
  };
  handleEditLocation = () => {
    console.log({ locationShow: this.state.locationShow });
    this.setState({ locationShow: !this.state.locationShow });
  };

  handleEditAddressFormShow = (id) => {
    console.log({ id: id });

    this.setState({ addressFormShow: !this.state.addressFormShow });
    this.setState({ editForm: true });
    const user = localStorage.getItem("user");

    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/addresses/" +
        id +
        "/",
      method: "GET",
      // data:this.state.address,
    })
      .then((res) => {
        console.log({ result: res });

        this.setState({ address: res.data.data.results });
        console.log({ addressData: this.state.address });
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  handleAddressFormShow = () => {
    this.setState({ addressFormShow: !this.state.addressFormShow });
    this.setState({ editForm: false });
  };

  handleChangeAddress = (e) => {
    e.persist();
    console.log(e.target.id);

    this.setState((prevState) => ({
      address: { ...prevState.address, [e.target.name]: e.target.value },
    }));
  };

  onAddressTagChange = (tag) => {
    // alert(tag)
    // e.persist();
    this.setState((prevState) => ({
      address: { ...prevState.address, addressTag: tag },
    }));
    console.log(this.state.address);
  };

  handleToggle = (index) => {
    console.log({ inddex_data: this.state.addressData[index] });
    const addressremove = this.state.addressData[index];
    this.setState({ addressDelete: addressremove });
    console.log({ addressde: addressremove });

    this.setState({
      open: !this.state.open,
    });
  };

  handleYes = () => {
    this.setState({ open: false });
    const user = localStorage.getItem("user");
    const id = this.state.addressDelete.id;
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/addresses/" +
        id +
        "/",
      method: "DELETE",
    })
      .then((res) => {
        console.log({ result: res });
        this.action.openSnackbar("Adress deleted succesfully");
        this.handleListCard();
        this.action.showSnackbar;
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  handleNo = () => {
    this.setState({ open: false });
  };

  handleAddressFormSave = () => {
    const isValid = this.formValidation();
    // const input = new FormData()
    if (isValid) {
      this.setState({ addressFormShow: !this.state.addressFormShow });
      const user = localStorage.getItem("user");
      var data = this.state.address;
      const id = this.state.address.id;
      console.log({ data: this.state.address });

      if (!this.state.editForm) {
        axios({
          url:
            process.env.API_URL +
            process.env.API_VERSION +
            "/user/" +
            user +
            "/addresses/",
          method: "POST",
          data: this.state.address,
        })
          .then((res) => {
            console.log({ result: res });
            this.action.openSnackbar("Address Added succesfully");
            this.handleListCard();
            this.action.showSnackbar;
          })
          .catch((err) => {
            console.log({ err: err });
            this.setState({ loading: false });
            if (err.response && err.response.status == 400) {
              this.action.openSnackbar(err.response.data.data.results, true);
              this.action.showSnackbar;
            }
          });
      } else {
        axios({
          url:
            process.env.API_URL +
            process.env.API_VERSION +
            "/user/" +
            user +
            "/addresses/" +
            id +
            "/",
          method: "PUT",
          data: this.state.address,
        })
          .then((res) => {
            console.log({ result: res });
            this.action.openSnackbar("Address Updated succesfully");
            this.handleListCard();
            this.action.showSnackbar;
            this.setState({ address: res.data.data.results });
            console.log({ addressData: this.state.address });
          })
          .catch((err) => {
            console.log({ error: err });
          });
      }
    } else {
      this.setState({
        touched: {
          user_name: true,
          landmark: true,
          addressLineOne: true,
          addressLineTwo: true,
          city: true,
          postalCode: true,
          country: true,
          state: true,
          // 'addressTag': true,
        },
      });
    }
  };

  formValidation = () => {
    const { address } = this.state;
    let isValid = true;
    const errors = {};

    if (address.user_name == "") {
      errors.user_name = "Name should be specified";
      isValid = false;
    }

    if (address.landmark == "") {
      errors.landmark = "Landmark should be specified";
      isValid = false;
    }

    if (address.addressLineOne == "") {
      errors.addressLineOne = "Address One should be specified";
      isValid = false;
    }

    if (address.addressLineTwo == "") {
      errors.addressLineTwo = "Address Two should be specified";
      isValid = false;
    }

    if (address.city == "") {
      errors.city = "City should be specified";
      isValid = false;
    }

    if (address.postalCode == "") {
      errors.postalCode = "Postal Code should be specified";
      isValid = false;
    }

    if (address.country == "") {
      errors.country = "Country should be specified";
      isValid = false;
    }

    if (address.state == "") {
      errors.state = "State should be specified";
      isValid = false;
    }

    // if(address.addressTag==""){
    //   errors.addressTag = "Address Tag should be specified"
    //   isValid = false
    // }

    this.setState({ errors }, () => console.log({ errors: this.state.errors }));

    return isValid;
  };

  handleImageUpload = (e) => {
    console.log({ data: e.target.files[0] });
    const input = new FormData();
    input.append("avatar", e.target.files[0]);
    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/avatar/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        this.setState({
          avatar: res.data.data.results.avatar,
        });
        this.setState({
          imageHash: Date.now(),
        });
        localStorage.setItem("avatar", res.data.data.results.avatar);
        localStorage.setItem("imageHash", Date.now());
        this.action.openSnackbar(
          "User Profile Image details successfully updated"
        );
        // this.setState({locationShow:false})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  newAddressHandler = (e) => {
    e.persist();
    this.setState((prevState) => ({
      address: { ...prevState.address, [e.target.id]: e.target.value },
    }));
    console.log({ newhandleraddress: this.state.address });
  };

  handleChangeAccount = (e) => {
    this.setState({
      account: { [e.target.id]: e.target.value },
    });
    console.log({ account: this.state.account });
  };

  handleChangePersonal = (e) => {
    e.persist();
    console.log(e.target.id);

    this.setState((prevState) => ({
      personal: { ...prevState.personal, [e.target.name]: e.target.value },
    }));
  };

  handleChangeIdentity = (e) => {
    e.persist();
    console.log(e.target.id);

    this.setState((prevState) => ({
      identity: { ...prevState.identity, [e.target.name]: e.target.value },
    }));
  };

  handleChangeLocation = (e) => {
    e.persist();
    console.log(e.target.id);

    this.setState((prevState) => ({
      location: { ...prevState.location, [e.target.name]: e.target.value },
    }));
  };

  handleChange = (e) => {
    this.setState({
      account: { [e.target.id]: e.target.value },
    });
    console.log({ account: this.state.account });
  };

  handleSaveAccountDetails = (e) => {
    if (this.state.account.name == "") {
      this.setState({ account: { name: this.state.user.name } });
      return false;
    }
    const user = localStorage.getItem("user");
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/account/",
      method: "PATCH",
      data: {
        name: this.state.account.name,
        email: this.state.user.email,
        mobile: this.state.user.mobile,
      },
    })
      .then((res) => {
        // this.action.updateUser({user:{email:"virajkaulkar@teknobuilt.com"}})
        console.log({ res: res });
        console.log({ account: res.data.data.results.data });
        this.setState({
          account: res.data.data.results,
        });
        this.action.openSnackbar("User Account details successfully updated");
        this.setState({ accountShow: false });
        console.log({ user: this.state.user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSavePersonalDetails = (e) => {
    this.setState({ isLoad: true });
    const user = localStorage.getItem("user");
    var data = this.state.personal;
    console.log({ data: this.state.personal });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/personal/",
      method: "PATCH",
      data: this.state.personal,
    })
      .then((res) => {
        this.setState({
          personal: res.data.data.results,
        });
        this.action.openSnackbar("User Personal details successfully updated");
        this.setState({ personalShow: false });
        this.setState({ isLoad: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSaveIdentityDetails = (e) => {
    const user = localStorage.getItem("user");
    var data = this.state.identity;
    console.log({ data: this.state.identity });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/identity/",
      method: "PATCH",
      data: this.state.identity,
    })
      .then((res) => {
        this.setState({
          identity: res.data.data.results,
        });
        this.action.openSnackbar("User Identification successfully updated");
        this.setState({ identityShow: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSaveLocationDetails = (e) => {
    const user = localStorage.getItem("user");
    var data = this.state.location;
    console.log({ data: this.state.location });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/location/",
      method: "PATCH",
      data: this.state.location,
    })
      .then((res) => {
        this.setState({
          location: res.data.data.results,
        });
        this.action.openSnackbar("User Location details successfully updated");
        this.setState({ locationShow: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleImageUpload = (e) => {
    console.log({ data: e.target.files[0] });
    const input = new FormData();
    input.append("avatar", e.target.files[0]);
    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/avatar/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        this.setState({
          avatar: res.data.data.results.avatar,
        });
        localStorage.setItem("avatar", res.data.data.results.avatar);
        this.action.openSnackbar(
          "User Profile Image details successfully updated"
        );
        // this.setState({locationShow:false})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeCheckbox = (e) => {
    this.setState({
      personal: { donateBlood: !this.state.personal.donateBlood },
    });
  };
  componentDidMount() {
    const user = localStorage.getItem("user");

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/self/",
      method: "GET",
    })
      .then((res) => {
        console.log({ user: res.data.data.results.data });
        console.log({ user: res.data.data.results.data.name });
        this.setState({
          account: { name: res.data.data.results.data.name },
        });
        this.setState({
          personal: {
            badgeNo: res.data.data.results.data.badgeNo,
            dateOfBirth: res.data.data.results.data.dateOfBirth,
            gender: res.data.data.results.data.gender,
            bloodGroup: res.data.data.results.data.bloodGroup,
            donateBlood: res.data.data.results.data.donateBlood,
            alternateEmail: res.data.data.results.data.alternateEmail,
            alternateMobile: res.data.data.results.data.alternateMobile,
          },
        });
        this.setState({
          location: {
            country: res.data.data.results.data.country,
            state: res.data.data.results.data.state,
            city: res.data.data.results.data.city,
            timeZone: res.data.data.results.data.timeZone,
          },
        });
        this.setState({
          identity: { panOrTaxid: res.data.data.results.data.panOrTaxid },
        });
        this.setState({
          user: res.data.data.results.data,
        });
        this.setState({ avatar: res.data.data.results.data.avatar });
        console.log({ avatar: res.data.data.results.data.avatar });
      })
      .catch((err) => {
        console.log(err);
      });

    this.handleListCard();
  }

  handleListCard = (e) => {
    const user = localStorage.getItem("user");
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user +
        "/addresses/",
      method: "GET",
      // data:this.state.address,
    })
      .then((res) => {
        console.log({ result: res });
        this.setState({ addressData: res.data.data.results });
        console.log({ addressData: this.state.addressData });
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  render() {
    const { classes } = this.props;
    const { touched, errors } = this.state;
    const { addressTag } = this.state;
    console.log({ personal: this.state.personal });
    return (
      <Fragment>
        {/* <PaceLoader /> */}
        <div className={classes.userProfileSection}>
          <Grid item md={12} xs={12} className={classes.contentSection}>
            <Typography className={classes.contentTitle} varient="h1">
              User Profile
            </Typography>
          </Grid>

          <Accordion
            expanded={this.state.expanded === "panel1"}
            onChange={this.handleExpand("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>Account</Typography>
              {/* <Typography className={classes.secondaryHeading}> </Typography> */}
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={6} xs={6} className={classes.formBox}>
                  <Grid item md={12} xs={12} className={classes.profileImgBox}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="icon-button-file"
                      name="avatar"
                      type="file"
                      onChange={(e) => {
                        this.handleImageUpload(e);
                      }}
                    />
                    <label htmlFor="icon-button-file">
                      {this.state.avatar ? (
                        <Avatar
                          alt="profile image "
                          src={`${this.state.avatar}?${this.state.imageHash}`}
                        />
                      ) : (
                        <Avatar className={classes.orange}>
                          {this.state.avatar
                            ? this.state.avatar
                            : getInitials(localStorage.getItem("name"))}
                        </Avatar>
                      )}
                      {/* <Avatar className={classes.orange}>{(this.state.avatar) ? this.state.avatar : getInitials(localStorage.getItem('name'))}</Avatar> */}
                      {/* <Avatar alt="profile image " src={this.state.avatar} /> */}
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Grid>
                </Grid>

                <Grid item md={6} xs={12} className={classes.editFormBtn}>
                  <Tooltip title="Edit" aria-label="edit">
                    <Fab
                      variant="outlined"
                      onClick={this.handleEdit}
                      className={classes.fabEditBtn}
                    >
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip
                    title="Save"
                    aria-label="save"
                    hidden={!this.state.accountShow}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <SaveIcon onClick={this.handleSaveAccountDetails} />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item md={4} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.accountShow}
                    primary="Full Name"
                    secondary={
                      this.state.account.name ? this.state.account.name : "NA"
                    }
                  />
                  <TextField
                    label="Full Name"
                    margin="dense"
                    name="name"
                    id="name"
                    fullWidth
                    variant="outlined"
                    helperText={touched.name ? errors.name : ""}
                    value={this.state.account.name}
                    onChange={(e) => {
                      this.handleChangeAccount(e);
                      this.formValidation();
                    }}
                    onBlur={(e) => {
                      this.handleTouch(e);
                      this.formValidation();
                    }}
                    error={touched.name && Boolean(errors.name)}
                    hidden={!this.state.accountShow}
                    className={classes.formControl}
                  />
                </Grid>
                <Grid item md={4} xs={12} className={classes.formBox}>
                  <Badge
                    badgeContent={
                      this.state.user.emailVerified
                        ? "Verified"
                        : "Not Verified"
                    }
                    className={
                      this.state.user.emailVerified
                        ? classes.verifBubble
                        : classes.notVerifBubble
                    }
                    Button
                    hidden={this.state.accountShow}
                  >
                    <ListItemText
                      className={classes.userProfileView}
                      hidden={this.state.accountShow}
                      primary="Email"
                      secondary={
                        this.state.user.email ? this.state.user.email : "NA"
                      }
                    />
                  </Badge>
                  {/* <ListItemText className={classes.userProfileView} hidden={this.state.accountShow} primary="Email" secondary={(this.state.user.email) ? this.state.user.email : 'NA'} /> */}
                  <TextField
                    label="Email"
                    margin="dense"
                    name="email"
                    id="email"
                    variant="outlined"
                    disabled={true}
                    value={this.state.user.email}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    // // onBlur={(e) => { this.handleTouch(e); }}
                    hidden={!this.state.accountShow}
                    className={classes.formControl}
                  />

                  {/* <IconButton aria-label="Email Verified" hidden={!this.state.accountShow} className={classes.verifidIcon}>
                                <DoneIcon />
                            </IconButton> */}
                </Grid>
                {/* <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                        >

                          <ListItemText className={classes.userProfileView} hidden={this.state.accountShow} primary="Profile Image" secondary={<Avatar alt="Ashutosh " src={`/${ellipse}`} />} />
                           <TextField
                                id="date"
                                label="Profile Image"
                                margin="dense"
                                type="file"
                                variant="outlined"
                                hidden={!this.state.accountShow}
                                onChange={(e) => { this.handleChange(e); }}
                                // // onBlur={(e) => { this.handleTouch(e); }}
                                className={classes.formControl}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid> */}
                <Grid item md={4} xs={12} className={classes.formBox}>
                  {/* <Badge badgeContent={(this.state.user.mobileVerified) ? 'Verified' : 'Not Verified'} className={(this.state.user.mobileVerified) ? classes.verifBubble : classes.notVerifBubble } hidden={this.state.accountShow}>
                          <ListItemText className={classes.userProfileView} hidden={this.state.accountShow} primary="Mobile" secondary={(this.state.user.mobile) ? (this.state.user.mobile) : "NA"} />
                        </Badge> */}
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.accountShow}
                    primary="Mobile"
                    secondary={
                      this.state.user.mobile ? this.state.user.mobile : "NA"
                    }
                  />
                  <TextField
                    label="Mobile"
                    margin="dense"
                    name="mobile"
                    id="mobile"
                    disabled={true}
                    value={this.state.user.mobile}
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                    hidden={!this.state.accountShow}
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                  />
                  {/* <IconButton aria-label="Mobile Verified" hidden={!this.state.accountShow} className={classes.verifidIcon}>
                            <DoneIcon />
                            </IconButton> */}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.expanded === "panel2"}
            onChange={this.handleExpand("panel2")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>
                Personal Details
              </Typography>
              {/* <Typography className={classes.secondaryHeading}></Typography> */}
            </AccordionSummary>

            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} className={classes.editFormBtn}>
                  <Tooltip
                    title="Edit"
                    onClick={this.handleEditPersonal}
                    aria-label="edit"
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip
                    title="Save"
                    aria-label="save"
                    hidden={!this.state.personalShow}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <SaveIcon onClick={this.handleSavePersonalDetails} />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Badge No."
                    secondary={
                      this.state.personal.badgeNo
                        ? this.state.personal.badgeNo
                        : "NA"
                    }
                  />
                  <TextField
                    label="Badge No."
                    margin="dense"
                    name="badgeNo"
                    id="badgeNo"
                    variant="outlined"
                    value={this.state.personal.badgeNo}
                    hidden={!this.state.personalShow}
                    className={classes.formControl}
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Date of Birth"
                    secondary={
                      this.state.personal.dateOfBirth
                        ? dateFormat(this.state.personal.dateOfBirth)
                        : "NA"
                    }
                  />
                  <TextField
                    id="dateOfBirth"
                    label="Date of Birth"
                    margin="dense"
                    type="date"
                    variant="outlined"
                    name="dateOfBirth"
                    value={this.state.personal.dateOfBirth}
                    hidden={!this.state.personalShow}
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                    //defaultValue="2017-05-24"
                    className={classes.formControl}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Gender"
                    secondary={
                      this.state.personal.gender
                        ? this.state.personal.gender
                        : "NA"
                    }
                  />
                  <TextField
                    label="Gender"
                    margin="dense"
                    name="gender"
                    id="gender"
                    hidden={!this.state.personalShow}
                    select
                    fullWidth
                    value={this.state.personal.gender}
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  >
                    {this.genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Blood Group"
                    secondary={
                      this.state.personal.bloodGroup
                        ? this.state.personal.bloodGroup
                        : "NA"
                    }
                  />
                  <TextField
                    label="Blood Group"
                    margin="dense"
                    name="bloodGroup"
                    id="bloodGroup"
                    hidden={!this.state.personalShow}
                    select
                    fullWidth
                    value={this.state.personal.bloodGroup}
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                    variant="outlined"
                  >
                    {this.bloodgroops.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Donate Blood"
                    secondary={this.state.personal.donateBlood ? "Yes" : "No"}
                  />
                  <FormControlLabel
                    hidden={!this.state.personalShow}
                    control={
                      <Checkbox
                        onChange={this.handleChangeCheckbox}
                        checked={this.state.personal.donateBlood}
                        name="checkedG"
                      />
                    }
                    label="Donate Blood"
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Alternate Email"
                    secondary={
                      this.state.personal.alternateEmail
                        ? this.state.personal.alternateEmail
                        : "NA"
                    }
                  />
                  <TextField
                    label="Alternate Email"
                    margin="dense"
                    name="alternateEmail"
                    id="alternateEmail"
                    variant="outlined"
                    value={this.state.personal.alternateEmail}
                    hidden={!this.state.personalShow}
                    className={classes.formControl}
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  />
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.personalShow}
                    primary="Alternate Mobile"
                    secondary={
                      this.state.personal.alternateMobile
                        ? this.state.personal.alternateMobile
                        : "NA"
                    }
                  />
                  <TextField
                    label="Alternate Mobile"
                    margin="dense"
                    name="alternateMobile"
                    id="alternateMobile"
                    fullWidth
                    variant="outlined"
                    value={this.state.personal.alternateMobile}
                    className={classes.formControl}
                    hidden={!this.state.personalShow}
                    onChange={(e) => {
                      this.handleChangePersonal(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.expanded === "panel3"}
            onChange={this.handleExpand("panel3")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>
                Identification
              </Typography>
              {/* <Typography className={classes.secondaryHeading}></Typography> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} className={classes.editFormBtn}>
                  <Tooltip
                    title="Edit"
                    aria-label="edit"
                    onClick={this.handleEditIdentity}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip
                    title="Save"
                    aria-label="save"
                    hidden={!this.state.identityShow}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <SaveIcon onClick={this.handleSaveIdentityDetails} />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.identityShow}
                    primary="ID"
                    secondary={
                      this.state.identity.panOrTaxid
                        ? this.state.identity.panOrTaxid
                        : "NA"
                    }
                  />
                  <TextField
                    label="ID"
                    margin="dense"
                    name="panOrTaxid"
                    id="panOrTaxid"
                    value={this.state.identity.panOrTaxid}
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                    hidden={!this.state.identityShow}
                    onChange={(e) => {
                      this.handleChangeIdentity(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.expanded === "panel4"}
            onChange={this.handleExpand("panel4")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>Location</Typography>
              {/* <Typography className={classes.secondaryHeading}></Typography> */}
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12} className={classes.editFormBtn}>
                  <Tooltip
                    title="Edit"
                    aria-label="edit"
                    onClick={this.handleEditLocation}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <EditIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip
                    title="Save"
                    aria-label="save"
                    hidden={!this.state.locationShow}
                  >
                    <Fab variant="outlined" className={classes.fabEditBtn}>
                      <SaveIcon onClick={this.handleSaveLocationDetails} />
                    </Fab>
                  </Tooltip>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.locationShow}
                    primary="Country"
                    secondary={
                      this.state.location.country
                        ? this.state.location.country
                        : "NA"
                    }
                  />
                  <TextField
                    label="Country"
                    margin="dense"
                    name="country"
                    id="country"
                    hidden={!this.state.locationShow}
                    select
                    fullWidth
                    value={this.state.location.country}
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChangeLocation(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  >
                    {this.countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.locationShow}
                    primary="State"
                    secondary={
                      this.state.location.state
                        ? this.state.location.state
                        : "NA"
                    }
                  />
                  <TextField
                    label="State"
                    margin="dense"
                    name="state"
                    id="state"
                    hidden={!this.state.locationShow}
                    select
                    fullWidth
                    value={this.state.location.state}
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChangeLocation(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  >
                    {this.cstates.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.locationShow}
                    primary="City"
                    secondary={
                      this.state.location.city ? this.state.location.city : "NA"
                    }
                  />
                  <TextField
                    label="City"
                    margin="dense"
                    name="city"
                    id="city"
                    hidden={!this.state.locationShow}
                    select
                    fullWidth
                    value={this.state.location.city}
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChangeLocation(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  >
                    {this.cities.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item md={3} xs={12} className={classes.formBox}>
                  <ListItemText
                    className={classes.userProfileView}
                    hidden={this.state.locationShow}
                    primary="Time Zone"
                    secondary={
                      this.state.location.timeZone
                        ? this.state.location.timeZone
                        : "NA"
                    }
                  />
                  <TextField
                    label="Time Zone"
                    margin="dense"
                    name="timeZone"
                    id="timeZone"
                    hidden={!this.state.locationShow}
                    select
                    fullWidth
                    value={this.state.location.timeZone}
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChangeLocation(e);
                    }}
                    // onBlur={(e) => { this.handleTouch(e); }}
                  >
                    {this.timezones.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.expanded === "panel5"}
            onChange={this.handleExpand("panel5")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>Addresses </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={3}
                hidden={this.state.addressFormShow}
                className={classes.addressViewSection}
              >
                {!(this.state.addressData.length === 0) &&
                  this.state.addressData.map((address, index) => {
                    return (
                      <Fragment>
                        <Dialog
                          className={classes.dialogSection}
                          aria-labelledby="customized-dialog-title"
                          open={this.state.open}
                        >
                          <DialogContent>
                            <ListItemText
                              className={classes.dialogTitle}
                              primary="Are you sure to delete Address ?"
                            />
                            <DialogActions>
                              <Button
                                onClick={() => this.handleYes(index)}
                                variant="outlined"
                                className={classes.popupBtn}
                              >
                                Yes
                              </Button>
                              <Button
                                onClick={this.handleNo}
                                variant="outlined"
                                className={classes.popupBtn}
                              >
                                No
                              </Button>
                            </DialogActions>
                          </DialogContent>
                        </Dialog>

                        <Grid
                          item
                          md={3}
                          xs={12}
                          //className={classes.formBox}
                        >
                          <Card className={classes.addressViewBox}>
                            <CardContent>
                              <Typography
                                className={classes.toNameText}
                                gutterBottom
                              >
                                {address.user_name}
                              </Typography>
                              <Typography className={classes.addressTest}>
                                {address.addressLineOne}
                              </Typography>
                              <Typography className={classes.addressTest}>
                                {address.addressLineTwo}
                              </Typography>
                              <Typography className={classes.addressTest}>
                                {address.landmark}
                              </Typography>
                              <Typography className={classes.addressTest}>
                                {address.postalCode}
                              </Typography>
                              <Typography className={classes.addressTest}>
                                {address.country}
                              </Typography>
                            </CardContent>
                            <CardActions className={classes.addressActionBox}>
                              <IconButton aria-label="edit">
                                <EditIcon
                                  onClick={() =>
                                    this.handleEditAddressFormShow(address.id)
                                  }
                                />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => this.handleToggle(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                className={classes.addressTabBox}
                                aria-label="delete"
                              >
                                <Tooltip title="Home" placement="top">
                                  <LocalOfferIcon />
                                </Tooltip>
                              </IconButton>
                            </CardActions>
                          </Card>
                        </Grid>
                      </Fragment>
                    );
                  })}
                <Grid
                  item
                  md={3}
                  xs={12}
                  //className={classes.formBox}
                >
                  <Card className={classes.addAddCardBox}>
                    <CardContent>
                      <Button onClick={this.handleAddressFormShow}>
                        <AddIcon />
                        <Typography
                          variant="h5"
                          component="h2"
                          className={classes.addAddressBtn}
                        >
                          New Address
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={3}
                hidden={!this.state.addressFormShow}
                className={classes.addressFormSection}
              >
                <Grid md={8} xs={12}>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Name"
                      margin="dense"
                      name="user_name"
                      id="user_name"
                      fullWidth
                      variant="outlined"
                      helperText={touched.user_name ? errors.user_name : ""}
                      value={this.state.address.user_name}
                      onChange={(e) => {
                        this.newAddressHandler(e);
                      }}
                      onBlur={(e) => {
                        this.handleTouch(e);
                      }}
                      error={touched.user_name && Boolean(errors.user_name)}
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Landmark"
                      margin="dense"
                      name="landmark"
                      id="landmark"
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.landmark ? errors.landmark : ""}
                      value={this.state.address.landmark}
                      onChange={(e) => {
                        this.newAddressHandler(e);
                      }}
                      onBlur={(e) => {
                        this.handleTouch(e);
                      }}
                      error={touched.landmark && Boolean(errors.landmark)}
                      className={classes.formControl}
                      // hidden={!this.state.addressFormShow}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.formBox}>
                    <TextField
                      label="Address Line One"
                      margin="dense"
                      name="addressLineOne"
                      id="addressLineOne"
                      multiline
                      rows={2}
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={
                        touched.addressLineOne ? errors.addressLineOne : ""
                      }
                      value={this.state.address.addressLineOne}
                      onChange={(e) => {
                        this.newAddressHandler(e);
                      }}
                      onBlur={(e) => {
                        this.handleTouch(e);
                      }}
                      error={
                        touched.addressLineOne && Boolean(errors.addressLineOne)
                      }
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow}
                    />
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.formBox}>
                    <TextField
                      label="Address Line Two"
                      margin="dense"
                      name="addressLineTwo"
                      id="addressLineTwo"
                      multiline
                      rows={2}
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={
                        touched.addressLineTwo ? errors.addressLineTwo : ""
                      }
                      value={this.state.address.addressLineTwo}
                      onChange={(e) => {
                        this.newAddressHandler(e);
                      }}
                      onBlur={(e) => {
                        this.handleTouch(e);
                      }}
                      error={
                        touched.addressLineTwo && Boolean(errors.addressLineTwo)
                      }
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <ListItemText
                      className={classes.userProfileView}
                      hidden={this.state.addressFormShow}
                      primary="City"
                      secondary={
                        this.state.address.city ? this.state.address.city : "NA"
                      }
                    />

                    <TextField
                      label="City"
                      margin="dense"
                      name="city"
                      id="city"
                      fullWidth
                      variant="outlined"
                      value={this.state.address.city}
                      onChange={(e) => {
                        this.handleChangeAddress(e);
                      }}
                      className={classes.formControl}
                      error={touched.city && Boolean(errors.city)}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Postal Code"
                      margin="dense"
                      name="postalCode"
                      id="postalCode"
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.postalCode ? errors.postalCode : ""}
                      value={this.state.address.postalCode}
                      onChange={(e) => {
                        this.newAddressHandler(e);
                      }}
                      onBlur={(e) => {
                        this.handleTouch(e);
                      }}
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <ListItemText
                      className={classes.userProfileView}
                      hidden={this.state.addressFormShow}
                      primary="Country"
                      secondary={
                        this.state.address.country
                          ? this.state.address.country
                          : "NA"
                      }
                    />

                    <TextField
                      label="Country"
                      margin="dense"
                      name="country"
                      id="country"
                      select
                      fullWidth
                      variant="outlined"
                      value={this.state.address.country}
                      onChange={(e) => {
                        this.handleChangeAddress(e);
                      }}
                      error={touched.country && Boolean(errors.country)}
                      hidden={!this.state.addressFormShow}
                    >
                      {this.countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <ListItemText
                      className={classes.userProfileView}
                      hidden={this.state.addressFormShow}
                      primary="State"
                      secondary={
                        this.state.address.state
                          ? this.state.address.state
                          : "NA"
                      }
                    />

                    <TextField
                      label="State"
                      margin="dense"
                      name="state"
                      id="state"
                      select
                      fullWidth
                      variant="outlined"
                      value={this.state.address.state}
                      onChange={(e) => {
                        this.handleChangeAddress(e);
                      }}
                      error={touched.state && Boolean(errors.state)}
                    >
                      {this.countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <FormControl
                      margin="dense"
                      component="fieldset"
                      className={classes.addressTypeBox}
                    >
                      <FormLabel component="legend">Address Tag</FormLabel>
                      <RadioGroup
                        row
                        aria-label="position"
                        name="position"
                        defaultValue="top"
                      >
                        <FormControlLabel
                          value="home"
                          onChange={() => this.onAddressTagChange("home")}
                          control={<Radio color="primary" />}
                          label="Home"
                        />
                        <FormControlLabel
                          value="work"
                          onChange={() => this.onAddressTagChange("work")}
                          control={<Radio color="primary" />}
                          label="Work"
                        />
                        <FormControlLabel
                          value="billing"
                          onChange={() => this.onAddressTagChange("biiling")}
                          control={<Radio color="primary" />}
                          label="Billing"
                        />
                        <FormControlLabel
                          value="other"
                          onChange={() => this.onAddressTagChange("other")}
                          control={<Radio color="primary" />}
                          label="Other"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={12} xs={12} className={classes.formBox}>
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.custmSubmitBtn}
                      onClick={this.handleAddressFormSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      size="medium"
                      className={classes.custmCancelBtn}
                      onClick={this.handleAddressFormShow}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={this.state.expanded === "panel6"}
            onChange={this.handleExpand("panel6")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
              className={classes.accordionHead}
            >
              <Typography className={classes.heading}>
                Security Questions{" "}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                spacing={3}
                hidden={this.state.addressFormShow}
                className={classes.addressViewSection}
                style={{ marginTop: 10 }}
              >
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.mainGroupShowSection}
                >
                  <Paper elevation={1} className={classes.paperSection}>
                    {/* <Grid container spacing={3}>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.securityQstatus}
                      >
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <img
                                src="https://media.pace-os.com/icons/svg/security-alert-32x32.svg"
                                alt="Set security question"
                              />
                            </ListItemAvatar>
                            <ListItemText primary="Set your security questions" />
                          </ListItem>
                        </List>
                        <Typography
                          variant="h6"
                          className={classes.securityQLabel}
                        >
                          Set your security questions / answers to retrieve the
                          password.
                        </Typography>
                      </Grid>
                      <Grid item md={12} sm={12} xs={12}>
                        <Button
                          size="medium"
                          variant="contained"
                          className={classes.buttonStyle}
                          onClick={this.handleClickAssignDepartment}
                        >
                          Set question & answer
                        </Button>
                      </Grid>
                    </Grid> */}

                    {/* Update sequrity section */}
                    <Grid container spacing={3}>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.securityQstatus}
                      >
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <img
                                src="https://media.pace-os.com/icons/svg/security-done-32x32.svg"
                                alt="Password retrieval"
                              />
                            </ListItemAvatar>
                            <ListItemText primary="Password retrieval security questions / answers are configured." />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.paddTRemove}
                      >
                        <Button
                          size="medium"
                          variant="contained"
                          className={classes.buttonStyle}
                          onClick={this.handleClickAssignDepartment}
                        >
                          Update your security question
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </div>

        <SecurityQuestions
          assignDepartment={this.state.assignDepartment}
          handleCloseAssignDepartment={this.handleCloseAssignDepartment}
          view="userProfile"
        />
      </Fragment>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(
    //mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(UserProfile))
);
