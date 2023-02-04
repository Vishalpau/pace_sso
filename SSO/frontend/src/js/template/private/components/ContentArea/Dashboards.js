import React, { Component, forwardRef, Fragment } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Container,
  CardActions,
  CardMedia,
  Paper,
  TextField,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import producticon from "../../../../../../public/LoginImg/producticon.png";
import "../../../../../../src/App.css";
import { connect } from "react-redux";
import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { UserActions } from "../../../../../../src/js/user/UserActions";
import PaceLoader from "../../../../user/auth/PaceLoader";
import Hexagon from "../../../../views/Hexagon/Hexagon";
import Hexagon3D from "../../../../views/Hexagon/Hexagon3D";
import { LaptopWindows } from "@material-ui/icons";
import Page from "../../../../../components/Page";

import { LeftSidbar } from "../../../../../js/template/private/LeftSidbar";
import SecurityQuestions from "../../../../views/UserProfile/SecurityQuestions";

// import {LeftSidbar} from './LeftSidbar';

class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      subscriptions: [],
      userList: [],
      applications: {},
      open: false,
      roles: [],
      userId: "",
      existingUserShow: false,
      newUserShow: false,
      noOfSubscribers: "",
      email: "",
      mobile: "",
      roleId: "",
      touched: {},
      errors: {},
      roleId_new: "",
      isLoaded: false,
    };
    // console.log({props:this.props})
    this.action = new UserActions(this.props.dispatch);
  }

  componentDidMount = () => {
    // console.log({store:this.props})
    // console.log({props_dash:this.props})
    const companyId = localStorage.getItem("companyId");

    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/self/" +
        companyId +
        "/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ isLoaded: true });
        this.setState({
          user: res.data.data.results.data,
        });
        this.setState({
          subscriptions: res.data.data.results.data.companies.map(
            (company) => company.subscriptions
          ),
        });

        //   console.log({subscriptions:this.state.subscriptions})
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        console.log(err);
      });

    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/self/" +
        companyId +
        "/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ isLoaded: true });
        this.setState({
          user: res.data.data.results.data,
        });
        this.setState({
          subscriptions: res.data.data.results.data.companies.map(
            (company) => company.subscriptions
          ),
        });

        //   console.log({subscriptions:this.state.subscriptions})
      })
      .catch((err) => {
        this.setState({ isLoaded: true });
        console.log(err);
      });

    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/userList/" +
        companyId +
        "/",
      method: "POST",
    })
      .then((res) => {
        // console.log({result:res.data.data.results})
        const userList = res.data.data.results.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
        // console.log({user_list:userList})
        this.setState({ userList: userList });
      })
      .catch((err) => {
        console.log({ error: err });
      });

    this.setState({ isLoaded: true });
    // console.log({loaded:this.state.isLoaded})
  };

  handleTouch = (e) => {
    // console.log({event:e.target.name})
    let { touched } = this.state;
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched }, () =>
        console.log({ touched: this.state.touched })
      );
    }
  };

  formValidation = () => {
    const { email, mobile, userId, roleId, roleId_new } = this.state;
    let isValid = true;
    const errors = {};

    if (this.state.existingUserShow) {
      if (email == "") {
        errors.email = "Email should be specified";
        isValid = false;
      } else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) == null) {
        errors.email = "Please enter valid Email";
        isValid = false;
      }

      if (mobile.match(/^[0-9]{10}$/) == null && mobile != "") {
        errors.mobile = "Please enter valid mobile number";
        isValid = false;
      }
      if (roleId_new == "") {
        errors.roleId_new = "Please select the role";
        isValid = false;
      }
    } else {
      if (userId == "") {
        errors.userId = "Please select the user";
        isValid = false;
      }

      if (roleId == "") {
        errors.roleId = "Please select the role";
        isValid = false;
      }
    }

    this.setState({ errors }, () => console.log({ errors: this.state.errors }));
    return isValid;
  };

  handleChangeRole = (e) => {
    this.setState({ roleId: e.target.value });
  };

  handleChangeRoleNew = (e) => {
    this.setState({ roleId_new: e.target.value });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleToggle = (index) => {
    // console.log({index:index})
    this.state.subscriptions.map((application) => {
      this.setState({ applications: application[index] });
      const appId = application[index].appId;
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/applications/" +
          appId +
          "/roles/",
        method: "GET",
      })
        .then((res) => {
          // console.log({ roles: res})
          this.setState({ open: !this.state.open });
          this.setState({
            roles: res.data.data.results,
          });
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data.status_code == 403) {
            this.action.openSnackbar(
              "You are not authorized. Please contact your Admin",
              true
            );
            this.action.showSnackbar;
          }
        });
    });
  };

  handleSubscribeExistingUser = () => {
    const isValid = this.formValidation();

    if (isValid) {
      const input = new FormData();
      const appId = this.state.applications.appId;
      const userId = this.state.userId;
      const companyId = localStorage.getItem("companyId");

      // console.log({roleId:this.state.roleId})
      input.append("fkCompanyId", companyId);
      input.append("fkAppId", appId);
      input.append("fkGroupId", this.state.roleId);
      input.append("active", true);

      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          userId +
          "/subscriptions/",
        method: "POST",
        data: input,
      })
        .then((res) => {
          //   console.log({ result: res})
          this.setState({ role_name: res.data.data.results.role_name });
          this.setState({ roleShow: !this.state.roleShow });

          this.action.openSnackbar("User Subscribed succesfully");
          this.action.showSnackbar;
          this.handleClose();
        })
        .catch((err) => {
          //alert('error');
          console.log({ err: err });
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            this.action.openSnackbar(err.response.data.data.results, true);
            this.action.showSnackbar;
          } else if (err.response && err.response.data.status_code == 403) {
            this.action.openSnackbar(
              "You are not authorized. Please contact your Admin",
              true
            );
            this.action.showSnackbar;
            this.handleClose();
          }
        });
    } else {
      this.setState(
        {
          touched: {
            roleId: true,
            userId: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  handleSubscribeNewUser = () => {
    const isValid = this.formValidation();
    if (isValid) {
      const user_id = localStorage.getItem("user");
      const fkCompanyId = localStorage.getItem("companyId");
      const input = new FormData();

      input.append("fkAppId", this.state.applications.appId);
      input.append("fkGroupId", this.state.roleId_new);
      input.append("fkCompanyId", fkCompanyId);
      input.append("referralEmail", this.state.email);
      input.append("referralPhone", this.state.mobile);

      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          user_id +
          "/invites/",
        method: "POST",
        data: input,
      })
        .then((res) => {
          //   console.log({ result: res})
          this.action.openSnackbar("User has been invited succesfully");
          this.action.showSnackbar;
          this.handleClose();
        })
        .catch((err) => {
          //alert('error');
          //   console.log({err:err})
          this.setState({ loading: false });
          if (err.response && err.response.status == 400) {
            this.action.openSnackbar(err.response.data.data.results, true);
            this.action.showSnackbar;
          }
        });
    } else {
      this.setState(
        {
          touched: {
            email: true,
            mobile: true,
            roleId_new: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  handleExistingUser = () => {
    //console.log({existingUserShow:this.state.existingUserShow})
    this.setState({ existingUserShow: !this.state.existingUserShow });
    // this.setState({errors:{}})
    // this.setState({touched:{}})
    // this.setState({roleId:""})
  };

  handleSearchChange = (event, newValue) => {
    // console.log({event:newValue})
    if (newValue) {
      this.setState({ userId: newValue.id }, () =>
        console.log({ userId: this.state.userId })
      );
    }
  };

  getStarted = (clientId) => {
    if (clientId) {
      window.open(
        (window.location.href =
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/auth/authorize/?client_id=" +
          clientId +
          "&response_type=code"),
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  };

  render() {
    // const classes = useStyles();
    const { classes } = this.props;
    const { classNames } = this.props;

    // const subscriptions= this.state.subscriptions
    // console.log({state:this.state.user.name})

    const styles = (theme) => ({
      root: {
        margin: 0,
        padding: theme.spacing(2),
      },
      closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
      },
    });

    // searchUser =[
    //     { title: 'Viraj' },
    //     { title: 'Ashutosh' },
    //     { title: 'Vani' },
    //     { title: 'Vishal'},
    //     { title: 'Saddam'},
    //   ]

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

    const { open } = this.state;

    const { touched, errors } = this.state;

    const { isLoaded } = this.state;
    const companyCode = JSON.parse(localStorage.getItem("companyCode"));
    const pace10hexagon = localStorage.getItem("pace10hexagon");
    // const subscriptions= this.state.subscriptions
    console.log({ dash_companyCode: companyCode });
    return (
      <Fragment>
        <Page title="Dashboard">
          {isLoaded ? "" : <PaceLoader />}
          <Container className={classes.root}>
            {/* <Grid item md={12} xs={12} className={classes.contentSection}>
                     <Typography className={classes.contentTitle} varient="h1">Profile</Typography> 
                    <Card>
                        <CardContent>
                            <Grid container >
                                <Grid item md={12} xs={12} >
                                    <Typography className={classes.userName} style={{ textTransform: 'capitalize'}} > Hi {this.state.user.name}!</Typography>
                                    <Typography className={classes.userWelcomeText}><span>Welcome to PACE OS</span></Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid> */}

            <Grid item md={12} xs={12}>
              {/* <Hexagon subscriptions={this.state.subscriptions} companyCode={companyCode!=undefined?companyCode:''}pace10hexagon={pace10hexagon!=undefined?pace10hexagon:false} /> */}
              <Hexagon3D
                subscriptions={this.state.subscriptions}
                companyCode={companyCode != undefined ? companyCode : ""}
                pace10hexagon={
                  pace10hexagon != undefined ? pace10hexagon : false
                }
              />
            </Grid>
          </Container>
        </Page>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    marginTop: "65px",
    float: "left",
    "& .MuiCardContent-root": {
      backgroundColor: "#ffffff",
      padding: "12px 20px",
      [theme.breakpoints.down("md")]: {
        padding: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
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
)(withStyles(useStyles, { withTheme: true })(Dashboards));
