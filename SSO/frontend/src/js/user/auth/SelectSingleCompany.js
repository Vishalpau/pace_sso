import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Page from "../../../../src/components/Page";

import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import PaceLogo from "./PaceLogo";
import "../../../../src/App.css";
import { UserActions } from "../UserActions";
import ProjectSelection from "../../user/auth/ProjectSelection";
import SelectProject from "../../user/auth/SelectProject";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import loginBBg from "../../../../../static/public/images/LoginImg/logbeforebg.png";
import CloseIcon from "@material-ui/icons/Close";
import Hexagon3D from "../../views/Hexagon/Hexagon3D";
import LeftSidbar from "../../template/private/LeftSidbar";

const DialogTitle = withStyles(useStyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle
      disableTypography
      className={classes.dialogTitleBox}
      {...other}
    >
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.projectCloseButton}
          onClick={onClose}
          disable={true}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
class SelectSingleCompany extends Component {
  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
    console.log({ props: this.props });
    this.state = {
      companies: [],
      projectOpen: false,
      projects: [],
      showCompanies: false,
    };
  }

  componentDidMount = () => {
    console.log({ companies: this.props });
    this.setState({
      companies: this.props.route.location.companies_data,
      showCompanies: true,
    });

    if (this.props.route.location.companies_data == undefined) {
      let companies = [];

      console.log({
        storage_data: JSON.parse(localStorage.getItem("userdata")).user,
      });
      companies = [
        ...companies,
        JSON.parse(localStorage.getItem("userdata")).user.companies,
      ];

      console.log({ companies_data111: companies[0].length });

      if (companies[0].length > 1) {
        this.setState({ companies: companies[0], showCompanies: true });
        // history.push({ pathname: '/selectsinglecompany', user_data: JSON.parse(localStorage.getItem('userdata')),companies_data: companies[0] });
      }
    }
  };

  getClassicOnlySub = async () => {
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
          console.log({ res_classic: res.data.data.results });
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

  handleClick = (company, id) => {
    console.log({ id: id });
    localStorage.setItem("companyId", id);
    localStorage.setItem("companyCode", JSON.stringify(company));
    this.getClassicOnlySub();
    const companyId = localStorage.getItem("companyId");
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/getcompanyid/" +
        companyId +
        "/",
      method: "GET",
    })
      .then((res) => {
        console.log({ result: res });

        // get role of user for accounts application and save it in localstorage
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
            console.log({
              result_self:
                res.data.data.results.data.companies[0].subscriptions,
            });

            const subscriptions =
              res.data.data.results.data.companies[0].subscriptions;

            subscriptions.map((subscription) => {
              if (subscription.appCode == "accounts") {
                console.log(subscription.roles[0].name);

                localStorage.setItem("ssoRole", subscription.roles[0].name);
              }
            });
          })
          .catch((err) => {
            console.log({ error: err });
          });

        this.getProjects();
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  getProjects = async () => {
    const companyId = localStorage.getItem("companyId");
    let data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/projects/"
      )
      .then(function (res) {
        console.log({ data: res.data.data.results });
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ projects: data });
    this.setState({ projectOpen: true });
    this.action.openSnackbar("Please select a project");
    // alert(data.length)
    // if (data.length > 1) {
    //     this.setState({ projectOpen: true })
    //     this.action.openSnackbar("Please select a project")
    // }
    // else {

    //     localStorage.setItem('ssoProjectId', data[0].projectId)
    //     localStorage.setItem('project',JSON.stringify(data[0]))
    //     this.switchProject();
    // }

    // if(data.length == 1){
    //     this.handleClick(data[0]);
    // }
    // else if(data.length == 0){
    //     this.action.openSnackbar("Welcome to Dashboard")
    //     this.action.login(this.props.route.location.user_data)
    //     this.props.history.push('/dashboard')
    // }
  };

  handleProjectClose = () => {
    this.setState({ projectOpen: false });
  };

  switchProject = () => {
    console.log({ userdata: this.props.route.location.user_data });
    this.setState({ projectOpen: false });
    console.log({ projectOpen: this.state.projectOpen });
    this.action.openSnackbar("Welcome to Dashboard");
    // this.action.login(this.props.route.location.user_data)
    this.props.history.push("/dashboard");
  };

  handleClose = () => {
    this.setState({ showCompanies: false });
  };

  render() {
    const { classes } = this.props;
    console.log({ props_data: this.props });
    const email = this.props.location.email;
    const password = this.props.location.password;

    return (
      <Page className={classes.root} title="Select company">
        <Box
          className={classes.customcontentbox}
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          <Dialog
            className={classes.projectDialog}
            maxWidth="md"
            open={this.state.showCompanies}
            // onClose={(event, reason) => {
            //   if (reason !== "backdropClick") {
            //     this.handleClose(event, reason);
            //   }
            // }}
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Grid container spacing={4}>
                  <Grid item md={12} sm={12}>
                    {/* className={classNames(classes.groupSection, classes.companySelection)} */}
                    <Grid item xs={12} sm={12} md={12} align="center">
                      <PaceLogo />
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
                        Select Company
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.companyListBox}
                    >
                      {this.state.companies.length > 0 && (
                        <Grid container spacing={3}>
                          {this.state.companies.map((selectValues, key) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              md={6}
                              className={classes.companyList}
                              key={key}
                              onClick={() =>
                                this.handleClick(
                                  selectValues,
                                  selectValues.companyId
                                )
                              }
                            >
                              <Card className={classes.companyCardBox}>
                                <CardMedia className={classes.companyLogo}>
                                  {selectValues.logo && (
                                    <img
                                      className={classes.companyLogoIcon}
                                      src={selectValues.logo}
                                      title="Pace OS"
                                      alt={selectValues.companyName}
                                    />
                                  )}
                                </CardMedia>
                                <CardContent>
                                  <Typography className={classes.companyTag}>
                                    {selectValues.businessVertical}
                                  </Typography>
                                  <Typography className={classes.companyName}>
                                    Company:{" "}
                                    <span>{selectValues.companyName}</span>
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </DialogContentText>
            </DialogContent>
          </Dialog>

          <Dialog
            className={classes.projectDialog}
            fullScreen
            scroll="paper"
            open={this.state.projectOpen}
            onClose={this.handleProjectClose}
          >
            <DialogTitle
              className={classes.projecDialogHeadTitle}
              onClose={this.handleProjectClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <g id="Select-Project-40" transform="translate(-0.985)">
                  <g id="Layer_1_22_" transform="translate(0.985)">
                    <g id="Group_6914" data-name="Group 6914">
                      <path
                        id="Path_6934"
                        data-name="Path 6934"
                        d="M5.372,32.774V4.37H28.409V28.224l4.389-3.61V2.185A2.189,2.189,0,0,0,30.6,0H3.178A2.189,2.189,0,0,0,.985,2.185V34.958a2.189,2.189,0,0,0,2.193,2.185H22.324l-3.1-4.369Z"
                        transform="translate(-0.985)"
                        fill="#e5e9ec"
                      />
                      <path
                        id="Path_6935"
                        data-name="Path 6935"
                        d="M42.225,27.558a1.1,1.1,0,0,0-1.451-.049L30.711,35.826,24,31.8a1.1,1.1,0,0,0-1.46,1.574l7.268,10.284a1.1,1.1,0,0,0,.886.464h.01a1.093,1.093,0,0,0,.884-.449L42.358,29A1.1,1.1,0,0,0,42.225,27.558Z"
                        transform="translate(-2.569 -4.125)"
                        fill="#e5e9ec"
                      />
                      <path
                        id="Path_6936"
                        data-name="Path 6936"
                        d="M24.689,8.988H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                        transform="translate(-1.68 -1.342)"
                        fill="#e5e9ec"
                      />
                      <path
                        id="Path_6937"
                        data-name="Path 6937"
                        d="M24.689,16.691H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                        transform="translate(-1.68 -2.492)"
                        fill="#e5e9ec"
                      />
                      <path
                        id="Path_6938"
                        data-name="Path 6938"
                        d="M24.689,24.4H11.523a2.194,2.194,0,0,0,0,4.388H24.688a2.194,2.194,0,0,0,0-4.388Z"
                        transform="translate(-1.68 -3.643)"
                        fill="#e5e9ec"
                      />
                    </g>
                  </g>
                </g>
              </svg>{" "}
              Switch to a different project
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <ProjectSelection
                  projects={this.state.projects}
                  closeProjectDilog={this.handleProjectClose}
                  switchProject={this.switchProject}
                />
                {/* <SelectProject projects={this.state.projects} closeProjectDilog={this.handleProjectClose} switchProject={this.switchProject}/> */}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>
      </Page>
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
  buttonCustomBack: {
    color: "#054D69",
    width: "90%",
    fontSize: "16px",
    lineHeight: "15px",
    marginRight: "10%",
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
    "& span": {
      verticalAlign: "top",
      paddingLeft: "10px",
    },
  },
  mT30: {
    marginTop: "30px",
  },
  mainWraper: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  paper: {
    margin: theme.spacing(6, 2),
    padding: theme.spacing(4, 0),
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
    marginTop: theme.spacing(3),
    height: "200px",
    "& .MuiButtonBase-root": {
      padding: theme.spacing(0, 6),
    },
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  companyNameList: {
    "& .MuiListItemText-primary": {
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      color: "#054D69",
    },
    "& .MuiListItemText-secondary": {
      fontSize: "12px",
      fontFamily: "Montserrat-Regular",
      color: "#054D69",
    },
  },
  BackLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
    marginLeft: "50%",
  },
  dialogTitleBox: {
    "& h6": {
      display: "inline",
      fontSize: "20px",
      color: "#06425c",
      fontFamily: "xolonium",
      lineHeight: "48px",
    },
    "& button": {
      float: "right",

      "&:focus": {
        outline: "none",
      },
    },
  },
  loginTopDetailSection: {
    marginBottom: "30px",
  },
  selectCompTitle: {
    color: "#06425C",
    fontSize: "22px",
    fontFamily: "Montserrat-SemiBold !important",
    lineHeight: "22px",
  },
  companyCardBox: {
    borderRadius: "10px",
    boxShadow:
      "0px 0px 5px 1px rgb(142 142 142 / 20%), 0px 10px 15px 15px rgb(243 243 243 / 14%), 0px 0px 8px 0px rgb(204 204 204 / 12%)",
    "& a": {
      border: "1px solid #ffffff",
      display: "inline-block",
      width: "100%",
      float: "left",
      position: "relative",
      borderRadius: "10px",
      textDecoration: "none",
      "&:hover": {
        borderColor: "#F28705",
      },
    },
  },
  companyTag: {
    fontSize: "16px",
    color: "#06425C",
    fontFamily: "Montserrat-SemiBold !important",
    lineHeight: "21px",
  },
  companyName: {
    color: "#666666",
    fontSize: "16px",
    fontFamily: "Montserrat-Regular !important",
    lineHeight: "21px",
    "& span": {
      fontFamily: "Montserrat-Medium",
    },
  },
  noPadding: {
    paddingTop: "0 !important",
    paddingBottom: "0 !important",
    [theme.breakpoints.up("sm")]: {
      padding: "0 !important",
    },
  },
  companyLogo: {
    paddingTop: "24px",
    paddingLeft: "16px",
    paddingRight: "16px",
  },
  companyLogoIcon: {
    height: "4rem",
  },
  pacelogonBox: {
    height: "2.5rem",
    marginBottom: "16px",
  },
  projecDialogHeadTitle: {
    marginBottom: "0px",
    "& h6": {
      color: "#fff",
      display: "flex",
      alignItems: "center",
      padding: "15px 15px 12px 15px",
      backgroundColor: "#06425C",
      borderRadius: "10px",
      fontFamily: "Montserrat-Medium !important",
      fontWeight: "normal",
      fontSize: "18px !important",
      "& svg": {
        marginRight: "10px",
      },
    },
    "& button": {
      top: "26px",
      color: "#ffffff",
      right: "24px",
      position: "absolute",
    },
  },
  projectDialog: {
    minWidth: 600,
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
  )(withStyles(useStyles, { withTheme: true })(SelectSingleCompany))
);
