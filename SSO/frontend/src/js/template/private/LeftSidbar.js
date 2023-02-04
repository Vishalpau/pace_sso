import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import PaceLogoHeader from "../../user/auth/img/PaceLogoHeader.png";
import SidebarNav from "../../template/private/components/Sidebar/components/SidebarNav/SidebarNav";
import Topbar from "../../template/private/components/Topbar/Topbar";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Grid, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DialogContentText from "@material-ui/core/DialogContentText";

import ProjectSelection from "../../user/auth/ProjectSelection";

import PACEWhite from "../../user/auth/img/PACEWhite.png";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import SecurityQuestions from "../../views/UserProfile/SecurityQuestions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "800px",
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    "& button": {
      outline: "none",
    },
    "& button:focus": {
      outline: "none !important",
    },
  },
  mainContentSection: {
    "& .MuiContainer-maxWidthLg": {
      maxWidth: "100%",
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    //backgroundColor: '#06374a',
    backgroundColor: "#06425C",
    "& .MuiIconButton-colorInherit": {
      marginLeft: "-5px",
      padding: "10px",
      [theme.breakpoints.down("sm")]: {
        marginLeft: "0px",
      },
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "& $menuButton": {
      boxShadow: "none",
      backgroundColor: "transparent",
    },
  },

  appBarShift: {
    marginLeft: 0,
    width: "100%",
    backgroundColor: "#06425C",
    "& .MuiIconButton-colorInherit": {
      //marginLeft: '-50px',
      marginLeft: "-5px",
      boxShadow: "0 2px 40px -5px #06425c",
      backgroundColor: "#074d6c",
      padding: "10px",
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    "& $menuButton": {
      boxShadow: "0 2px 40px -5px #06425c",
      backgroundColor: "#074d6c",
    },
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: drawerWidth,
    //   width: `calc(100% - ${drawerWidth}px)`,
    // },
  },
  headerSectionBox: {
    padding: "0px 10px",
  },
  menuButton: {
    //marginLeft: '-50px',
    marginRight: "10px",
    //backgroundColor: '#d5d5d5',
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },

    //backgroundColor: '#ff8533',
    "&:focus": {
      outline: "none",
    },
    "& svg": {
      fontSize: "1.2rem",
    },
    "& svg": {
      fontSize: "1.2rem",
    },

    // '&:hover': {
    //   backgroundColor: '#ff8533',
    // },
  },

  projectBreadcrumbs: {
    fontSize: 12,
    color: theme.palette.secondary.contrastText,
    paddingLeft: "15px",
  },
  drawerPaper: {
    //width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up("md")]: {
      position: "relative",
    },
  },
  drawerPaperClose: {
    overflowX: "hidden",
    "&:hover": {
      width: "240px",
    },
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 70,
    [theme.breakpoints.up("sm")]: {
      width: 70,
    },
    // '& .MuiList-padding': {
    //   '&:hover': {
    //     width: '240px',
    //   },
    // },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    minHeight: "70px",
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //padding: theme.spacing(3),
  },
  pacelogonBox: {
    display: "block",
    position: "relative",
    padding: theme.spacing(0, 7, 0, 0),
  },
  leftNav: {
    marginBottom: theme.spacing(2),
    "& li": {
      "& a": {
        padding: "10px 8px 10px 20px",
        "&:hover span": {
          color: "#ff8533",
        },
        "&:hover .leftMenuIcon": {
          backgroundPositionY: "-364px",
        },
        "& span": {
          color: "#06425c",
          fontSize: "16px",
          lineHeight: "32px",
          fontFamily: "Montserrat-Regular",
          whiteSpace: "nowrap",
          "& div": {
            marginRight: "25px",
          },
        },
      },
    },
  },
  projectSelectBtn: {
    "& svg": {
      color: "#ffffff",
      fontSize: "40px",
    },
  },
  dialogSection: {
    "& .MuiPaper-root": {
      width: "100%",
    },
    "& .MuiDialogTitle-root": {
      minHeight: "auto",
      display: "block",
      "& .MuiTypography-root": {
        color: "#06374a",
        fontSize: "20px",
        lineHeight: "30px",
        fontFamily: "xolonium",
        display: "inline-block",
      },
    },
    "& button": {
      float: "right",
      padding: "5px",
    },
    "& button:focus": {
      outline: "none",
    },
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
  cardContentBox: {
    minWidth: "260px",
  },
  cardActionAreaBox: {
    "&:hover .MuiCardMedia-root": {
      webkitTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      transform: "scale(1.2)",
      webkitFilter: "grayscale(0%)",
      filter: "grayscale(0%)",
    },
    "&:focus": {
      outline: "none",
    },
  },
  cardMediaBox: {
    overflow: "hidden",
    height: "300px",
  },
  media: {
    height: "300px",
    webkitTransition: "all 1.5s ease",
    mozTransition: "all 1.5s ease",
    msTransition: "all 1.5s ease",
    oTransition: "all 1.5s ease",
    transition: "all 1.5s ease",
    webkitFilter: "grayscale(100%)",
    filter: "grayscale(100%)",
  },
  projectSelectionTitle: {
    fontSize: "14px",
    color: "#06425c",
    whiteSpace: "normal",
    lineHeight: "22px",
    fontFamily: "Montserrat-Regular",
  },
  projectSelectionCode: {
    fontSize: "13px",
    color: "#333333",
    fontFamily: "Montserrat-Regular",
  },
  // actionBttmArea: {
  //   float: 'right',
  //   '& button:focus': {
  //     outline: 'none',
  //   },
  // },
  projectLevel: {
    fontSize: "15px",
    // [theme.breakpoints.down("sm")]: {
    //   fontSize: '13px',
    // },
    paddingLeft: "0px",
    paddingRight: "5px",
    color: "#ffffff",
    fontFamily: "Montserrat-Regular",
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "15px",
    },
  },
  projectName: {
    fontSize: "15px",
    // [theme.breakpoints.down("sm")]: {
    //   fontSize: '13px',
    // },
    paddingLeft: "0px",
    paddingRight: "5px",
    color: "#ffffff",
    fontFamily: "Montserrat-Medium",
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "20px",
    },
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
});

function LeftSidbar(props) {
  const { children } = props;
  const [open, setOpen] = useState(true);
  const [openProject, setOpenProject] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [singleProject, setSingleProject] = React.useState([]);
  const userActions = props.userActions;
  const [projectOpen, setProjectOpen] = React.useState(undefined);
  const [code, setCode] = React.useState("");
  const [securityQuestionPopupOpen, setSecurityQuestionPopupOpen] = useState();
  const [questErr, setQuestErr] = useState("");
  const handleCloseSnackbar = () => {
    setQuestErr("");
  };

  const handleCloseAssignDepartment = () => {
    setSecurityQuestionPopupOpen(false);
  };

  const getSecQuestionsData = async () => {
    const loggedInId = JSON.parse(localStorage.getItem("verifiedUserId"));
    if (window.location.pathname.includes("dashboard")) {
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          loggedInId +
          "/securityquestions/",
        method: "GET",
      })
        .then((res) => {
          console.log(res.data.data.results, "sec_questions124");
        })
        .catch((err) => {
          console.log(
            err.response.data.data.results,
            err.response.status,
            "err.response"
          );
          if (err.response && err.response.status === 400) {
            // setSecurityQuestionPopupOpen(true);
            setQuestErr(err.response.data.data.results);
          }
        });
    }
  };

  useEffect(() => {
    const cookies = document.cookie.split(";");
    let temparr = { previuosPath: "" };
    cookies.forEach((element) => {
      if (element.includes("previouspath")) {
        // temparr.push(element.trim());
        temparr.previuosPath = element.split("=")[1].trim();
      }
    });
    if (
      projectOpen === false ||
      temparr.previuosPath.includes("selectsinglecompany")
    ) {
      getSecQuestionsData();
    }
  }, [projectOpen]);
  //const [closeProject, setCloseProject] = React.useState(false);

  // const DialogTitle = withStyles(styles)((props) => {
  //   const { children, classes, onClose, ...other } = props;
  //   return (
  //     <MuiDialogTitle disableTypography className={classes.root} {...other}>
  //       <Typography variant="h6">{children}</Typography>
  //       {onClose ? (
  //         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
  //           <CloseIcon />
  //         </IconButton>
  //       ) : null}
  //     </MuiDialogTitle>
  //   );
  // });

  const DialogTitle = withStyles(styles)((props) => {
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
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const handleClickOpen = () => {
    setOpenProject(true);
  };

  const handleClose = () => {
    setOpenProject(false);
  };

  // handleClose = () => {
  //   this.setState({open:!this.state.open})
  // };

  const resize = () => {
    // setOpen(window.innerWidth >= 760);
    setOpen(window.innerWidth <= 760);
  };

  useEffect(() => {
    getAllProjects();
    console.log({ projects: projects });
    const projectId = localStorage.getItem("ssoProjectId");

    if (projectId == undefined || projectId == "") {
      setProjectOpen(true);
    } else {
      getSingleProject();
    }

    // get single project

    // get list of all projects

    window.addEventListener("resize", resize.bind(this));
    resize();
  }, []);

  const getAllProjects = async () => {
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
        console.log({ dataProjects: res.data.data.results });
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    // return data
    setProjects(data);
  };

  const getSingleProject = async () => {
    // alert(12345678)
    const companyId = localStorage.getItem("companyId");
    const projectId = localStorage.getItem("ssoProjectId");
    console.log({ singlecompany: companyId });
    console.log({ singleproject: projectId });
    let data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/projects/" +
          projectId +
          "/"
      )
      .then(function (res) {
        console.log({ data: res.data.data.results });
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log({ consoledata: data });
    setSingleProject(data);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProjectOpen = () => {
    setProjectOpen(true);
  };

  const handleProjectClose = () => {
    setProjectOpen(false);
  };

  const pages_one = [
    {
      title: "Home",
      href: "/dashboard",
      icon: <span className="leftHomeMenuIcon leftMenuIcon" />,
      permission: "",
      ssoRole: "",
    },
    // {
    // 	title: 'Addresses',
    // 	href: '/addresses',
    // 	icon: <ListAltIcon />
    // },
    // {
    // 	title: 'Subscriptions',
    // 	href: '/subscriptions',
    // 	icon: <ListAltIcon />
    // },
    {
      title: "Projects",
      href: "/project",
      icon: <span className="leftProjectMenuIcon leftMenuIcon" />,
      permission: "companies.view_projects",
      ssoRole: "",
    },
    {
      title: "Users",
      href: "/users",
      icon: <span className="leftUserMenuIcon leftMenuIcon" />,
      permission: "user.view_users",
      ssoRole: localStorage.getItem("ssoRole"),
    },
    {
      title: "Invite Users",
      href: "/invitelist",
      icon: <span className="leftInviteUserMenuIcon leftMenuIcon" />,
      permission: "user.view_userinvites",
      ssoRole: localStorage.getItem("ssoRole"),
    },
    // {
    // 	title: 'Applications',
    // 	href: '/applications',
    // 	icon: <AppsIcon />
    // },
    {
      title: "Organization",
      href: "/companies/" + localStorage.getItem("companyId"),
      icon: <span className="leftOrganizationMenuIcon leftMenuIcon" />,
      permission: "companies.view_companies",
      ssoRole: "",
    },
    {
      title: "Subscriptions",
      href: "/subscriptions",
      icon: <span className="leftSubscriptionMenuIcon leftMenuIcon" />,
      permission: "applications.view_userappaccess",
      ssoRole: localStorage.getItem("ssoRole"),
    },
    {
      title: "Departments",
      href: "/department",
      icon: <span className="leftDepartmentsMenuIcon leftMenuIcon" />,
      permission: "companies.view_department",
      ssoRole: localStorage.getItem("ssoRole"),
    },
    {
      title: "Operating Locations",
      href: "/operating-location",
      icon: <span className="leftOperatingLocationMenuIcon leftMenuIcon" />,
      ssoRole: localStorage.getItem("ssoRole"),
    },
    // {
    //   title: 'Subscriptions',
    //   href: '/subscriptions',
    //   icon: <SubscriptionsIcon />
    // },
    // {
    // 	title: 'Application Roles',
    // 	href: '/roles',
    // 	icon: <DehazeIcon />
    // },
    // {
    // 	title: 'User Profile',
    // 	href: '/UserProfile',
    // 	icon: <PeopleAltIcon />
    // },
  ];

  const Component = props.component;
  //console.log({props:props});
  const route = props.route;

  const mainContainer = (
    <div>
      <Component route={route} />
    </div>
  );

  const { classes } = props;

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img
          className={classes.pacelogonBox}
          src={PaceLogoHeader}
          title="Pace OS"
          alt="Pace OS"
        />
      </div>
      {/* <Divider /> */}

      <SidebarNav className={classes.leftNav} pages={pages_one} />
      {/*       
      <List>Dashboard</List>
      <List>Project</List>
      <List>User</List> */}
    </div>
  );

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        // className={classNames(classes.appBar, open && classes.appBarShift)}
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.headerSectionBox}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            // open={false}
            onClick={() => handleDrawerToggle()}
            className={classNames(classes.menuButton)}
          > */}
          <Fab
            size="small"
            color="inherit"
            aria-label="Menu"
            className={classes.menuButton}
            onClick={() => handleDrawerToggle()}
          >
            <MenuIcon />
          </Fab>
          {/* </IconButton> */}
          <img src={PACEWhite} className={classes.mLeft30} />
          <Hidden smUp>
            <Tooltip title="Project selection" arrow>
              <IconButton
                aria-label="Project selection"
                variant="outlined"
                clickable
                size="small"
                className={classes.projectName}
                onClick={handleProjectOpen}
              >
                <SwapHorizIcon />
              </IconButton>
            </Tooltip>
          </Hidden>
          <Hidden xsDown>
            <Typography className={classes.projectName} display="inline">
              Project:
            </Typography>
            <IconButton
              aria-label="control tower"
              variant="outlined"
              clickable
              size="small"
              className={classes.projectName}
              //label=""
              onClick={handleProjectOpen}
            >
              {singleProject != undefined ? singleProject.projectName : ""}{" "}
              <SwapHorizIcon />
            </IconButton>
            {console.log("came here")}
            {!window.location.pathname.includes("control-tower") ? (
              <div className="projectBreadcrumbsSection">
                {runCallback(() => {
                  const row = [];

                  if (localStorage.getItem("selectedProjectStructure")) {
                    const selectedProjectStructure = JSON.parse(
                      localStorage.getItem("selectedProjectStructure")
                    );
                    for (var i = 0; i < selectedProjectStructure.length; i++) {
                      row.push(
                        <Chip
                          size="small"
                          label={selectedProjectStructure[i].name}
                        />
                      );
                    }
                    return (
                      <Breadcrumbs
                        className={classes.projectBreadcrumbs}
                        separator={<NavigateNextIcon fontSize="small" />}
                      >
                        {row}
                      </Breadcrumbs>
                    );
                  }
                })}
              </div>
            ) : (
              ""
            )}
          </Hidden>
          <Topbar userActions={userActions} />
        </Toolbar>
      </AppBar>

      <Dialog
        className={classes.projectDialog}
        fullScreen
        scroll="paper"
        open={projectOpen}
        onClose={handleProjectClose}
      >
        <DialogTitle
          className={classes.projecDialogHeadTitle}
          onClose={handleProjectClose}
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
              projectListData={projects}
              closeProjectDilog={handleProjectClose}
              switchProject={getSingleProject}
            />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <SecurityQuestions
        assignDepartment={securityQuestionPopupOpen}
        handleCloseAssignDepartment={handleCloseAssignDepartment}
        view="dashboard"
      />

      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={() => handleDrawerToggle()}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !open && classes.drawerPaperClose
            ),
          }}
          open={open}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography noWrap>Your App Content</Typography> */}
        <div className={classes.mainContentSection}>{mainContainer}</div>
        {/* <div>
            <Component route={route} />
          </div> */}
      </main>
      {/* <Footer /> */}

      <Snackbar
        open={questErr !== ""}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {questErr}{" "}
          {questErr !==
          "The account is blocked for 24 hours after 6 wrong attempts"
            ? "Please go to User Profile to setup your security question answers"
            : ""}
        </Alert>
      </Snackbar>
    </div>
  );
}

LeftSidbar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

// export default LeftSidbar

export default withStyles(styles, { withTheme: true })(LeftSidbar);
