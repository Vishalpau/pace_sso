import React, { Component, useState, useEffect } from "react";
import PropTypes, { string } from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import PaceLogoHeader from "../../user/auth/img/PaceLogoHeader.png";

import CategoryIcon from "@material-ui/icons/Category";
import BusinessIcon from "@material-ui/icons/Business";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SidebarNav from "../../template/private/components/Sidebar/components/SidebarNav/SidebarNav";
import Topbar from "../../template/private/components/Topbar/Topbar";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
//import Footer from '../../template/private/components/Footer/Footer';
import SelectAllIcon from "@material-ui/icons/SelectAll";
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Grid, Typography } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import Avatar from "@material-ui/core/Avatar";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DialogContentText from "@material-ui/core/DialogContentText";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
//import CardActions from '@material-ui/core/CardActions';
import ProjectImg from "../../../../../static/public/images/LoginImg/projectimg.jpg";
import ProjectImgOne from "../../../../../static/public/images/LoginImg/projectimgone.jpg";
import { UserActions } from "../UserActions";
import { Link } from "react-router-dom";

class ProjectSelection extends Component {
  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
  }
  state = {
    show: true,
    projects: [],
    level1_allproj: [],
    level2_allproj: [],
    level3_allproj: [],
    level4_allproj: [],
    last_level: [],
    // selectedStructureList: [],
    selectedProjectStructure: [],
    selected1: [],
    selected2: [],
    selected3: [],
    selected4: [],
    gissetupId: [],
    gis_subscribed: false,
    selectedProject: "",
    expanded: false,
    expanded_1: false,
    expanded_2: false,
    expanded_3: false,
    depth: 1,
    open: false,
    changeClass: false,
  };

  handleClickToOpen = () => {
    this.setState({ open: true });
  };

  handleToClose = () => {
    this.setState({ open: true });
  };
  // level-wise handling
  handle1L = (projects) => {
    console.log(projects);

    const level1_allproj = [];
    let level_level1_allproj = [];

    projects.map((structure) => {
      if (structure.breakdown.length > 0) {
        console.log(structure.breakdown[0].structure[0].url);
        axios({
          url: process.env.BASE_URL + structure.breakdown[0].structure[0].url,
          method: "GET",
        })
          .then((res) => {
            console.log({ results: res });
            //   this.setState({isLoaded:true})
            const level1 = res.data.data.results;

            console.log({ level1: level1 });

            for (var i = 0; i < level1.length; i++) {
              level_level1_allproj = [
                ...level_level1_allproj,
                {
                  projectId: level1[i].fkProjectId,
                  id: level1[i].id,
                  structureName: level1[i].structureName,
                  depth: level1[i].depth,
                  lastlevel_depth: structure.breakdown.slice(-1)[0].depth,
                  vendorId: level1[i].vendorReferenceId,
                  structure_name: level1[i].structure_name,
                  aclStatus: level1[i].aclStatus,
                },
              ];
            }

            // localStorage.setItem('level1_allproj', JSON.stringify(level_level1_allproj))
            this.setState({ level1_allproj: level_level1_allproj });
          })
          .catch((err) => {
            //   this.setState({isLoaded:true})
            console.log(err);
          });
      }
      // console.log('innnnnnn')
      // level1_allproj.shift()
      console.log({ level1_allproj: level1_allproj });
      console.log(level_level1_allproj);

      // localStorage.getItem('level1_allproj')
    });
  };

  handleChange_2L =
    (
      panel,
      projectId,
      id,
      vendorId,
      depth,
      structureName,
      structure_name,
      aclStatus
    ) =>
    (event, isExpanded) => {
      this.setState({ changeClass: isExpanded ? true : false });
      console.log("in 2nd level from 1st");
      const { classes } = this.props;

      if (!aclStatus) {
        console.log("innn");
        return console.log("inside");
      }

      this.setState({ level2_allproj: [] });

      // this.setState({ selectedStructureList: [] })
      // this.setState({ selectedProjectStructure: [] })

      // if(this.state.selectedProject==projectId){
      //     this.state.selectedStructureList.push(structureName)
      // }
      // else{
      //     this.setState({selectedStructureList:[]})
      //     this.setState({selectedProject:''})
      // }

      // console.log({ 'handle_2L': this.state.selectedStructureList })
      // localStorage.setItem('firstlevel',depth+String(id))
      localStorage.setItem("phaseId", String(vendorId));

      if (depth == "1L") {
        isExpanded
          ? this.setState({ expanded: panel })
          : this.setState({ expanded: false });
      } else {
        localStorage.setItem("selectedStructure", structureName);
        // localStorage.setItem('selectedProjectStructure', JSON.stringify({ "depth": depth, "id": id, "name": structureName, "label": structure_name }))
        isExpanded
          ? this.setState({ expanded_1: panel })
          : this.setState({ expanded_1: false });
      }
      let level2_allproj = [];
      let last_level = [];
      this.state.projects.map((project) => {
        if (project.breakdown != [] && project.breakdown.length > 0) {
          if (project.projectId == projectId) {
            if (
              project.breakdown[Number(depth.replace("L", ""))].structure[0].url
            ) {
              axios({
                url:
                  process.env.BASE_URL +
                  project.breakdown[Number(depth.replace("L", ""))].structure[0]
                    .url +
                  id,
                method: "GET",
              })
                .then((res) => {
                  console.log({ results_lll: res });
                  console.log({ results_2L: res.data.data.results });
                  const level2 = res.data.data.results;
                  this.setState({ depth: depth + 1 });

                  for (var i = 0; i < level2.length; i++) {
                    level2_allproj = [
                      ...level2_allproj,
                      {
                        projectId: level2[i].fkProjectId,
                        id: level2[i].id,
                        structureName: level2[i].structureName,
                        depth: level2[i].depth,
                        lastlevel_depth: project.breakdown.slice(-1)[0].depth,
                        vendorId: level2[i].vendorReferenceId,
                        structure_name: level2[i].structure_name,
                        aclStatus: level2[i].aclStatus,
                      },
                    ];
                  }

                  console.log({ level2: level2_allproj });
                  this.setState({ level2_allproj: level2_allproj });

                  // this.state.selectedStructureList.push(structureName)
                  // this.state.selectedProjectStructure.push({ "depth": depth, "id": id, "name": structureName, "label": structure_name })

                  // selected 1st level project

                  let selected1 = [];

                  selected1 = [
                    ...selected1,
                    {
                      depth: depth,
                      id: id,
                      name: structureName,
                      label: structure_name,
                    },
                  ];

                  this.setState({ selected1: selected1 });

                  // end

                  this.setState({ selectedProject: projectId });
                  // localStorage.setItem('level2_allproj', level2_allproj)
                  // this.setState({expanded:true})
                })
                .catch((err) => {
                  //   this.setState({isLoaded:true})
                  console.log(err);
                });
            }
          }
        }
      });
    };

  handleChange_3L =
    (panel, projectId, id, vendorId, depth, structureName, structure_name) =>
    (event, isExpanded) => {
      if (this.state.selectedProject == projectId) {
        // this.state.selectedStructureList.push(structureName)
        // this.state.selectedProjectStructure.push({ "depth": depth, "id": id, "name": structureName, "label": structure_name })
      } else {
        // this.setState({ selectedStructureList: [] })
        this.setState({ selectedProjectStructure: [] });
      }

      this.setState({ level3_allproj: [] });
      // this.setState({selectedStructureList: [...this.state.selectedStructureList, structureName]})

      // console.log({ '3L': this.state.selectedStructureList })
      localStorage.setItem("secondlevel", depth + String(id));
      localStorage.setItem("unitId", String(vendorId));

      if (depth == "2L") {
        isExpanded
          ? this.setState({ expanded_1: panel })
          : this.setState({ expanded_1: false });
      } else {
        localStorage.setItem("selectedStructure", structureName);
        // localStorage.setItem('selectedProjectStructure', JSON.stringify({ "depth": depth, "id": id, "name": structureName, "label": structure_name }))

        isExpanded
          ? this.setState({ expanded_2: panel })
          : this.setState({ expanded_2: false });
      }
      let level3_allproj = [];
      this.state.projects.map((project) => {
        if (project.breakdown != [] && project.breakdown.length > 0) {
          if (project.projectId == projectId) {
            if (
              project.breakdown[Number(depth.replace("L", ""))].structure[0].url
            ) {
              axios({
                url:
                  process.env.BASE_URL +
                  project.breakdown[Number(depth.replace("L", ""))].structure[0]
                    .url +
                  id,
                method: "GET",
              })
                .then((res) => {
                  console.log({ results_3L: res.data.data.results });
                  const level3 = res.data.data.results;
                  this.setState({ depth: depth + 1 });

                  for (var i = 0; i < level3.length; i++) {
                    level3_allproj = [
                      ...level3_allproj,
                      {
                        projectId: level3[i].fkProjectId,
                        id: level3[i].id,
                        structureName: level3[i].structureName,
                        depth: level3[i].depth,
                        lastlevel_depth: project.breakdown.slice(-1)[0].depth,
                        vendorId: level3[i].vendorReferenceId,
                        structure_name: level3[i].structure_name,
                        aclStatus: level3[i].aclStatus,
                      },
                    ];
                  }

                  console.log({ level3: level3_allproj });
                  this.setState({ level3_allproj: level3_allproj });
                  // localStorage.setItem('level2_allproj', level2_allproj)
                  // this.setState({expanded:true})

                  // selected 1st level project

                  let selected2 = [];

                  selected2 = [
                    ...selected2,
                    {
                      depth: depth,
                      id: id,
                      name: structureName,
                      label: structure_name,
                    },
                  ];

                  this.setState({ selected2: selected2 });

                  // end
                })
                .catch((err) => {
                  //   this.setState({isLoaded:true})
                  console.log(err);
                });
            }
          }
        }
      });
    };

  handleChange_4L =
    (panel, projectId, id, vendorId, depth, structureName, structure_name) =>
    (event, isExpanded) => {
      if (this.state.selectedProject == projectId) {
        // this.state.selectedStructureList.push(structureName)
        // this.state.selectedProjectStructure.push({ "depth": depth, "id": id, "name": structureName, "label": structure_name })
      } else {
        // this.setState({ selectedStructureList: [] })
        this.setState({ selectedProjectStructure: [] });
      }

      this.setState({ level4_allproj: [] });
      // this.setState({selectedStructureList: [...this.state.selectedStructureList, structureName]})
      // console.log({ '4L': this.state.selectedStructureList })

      localStorage.setItem("thrid level", depth + String(id));
      // localStorage.setItem('unitId_ntpc',String(vendorId))

      if (depth == "3L") {
        isExpanded
          ? this.setState({ expanded_2: panel })
          : this.setState({ expanded_2: false });
      } else {
        localStorage.setItem("selectedStructure", structureName);
        // localStorage.setItem('selectedProjectStructure', JSON.stringify({ "depth": depth, "id": id, "name": structureName, "label": structure_name }))
        isExpanded
          ? this.setState({ expanded_3: panel })
          : this.setState({ expanded_3: false });
      }
      let level4_allproj = [];
      this.state.projects.map((project) => {
        if (project.breakdown != [] && project.breakdown.length > 0) {
          if (project.projectId == projectId) {
            if (
              project.breakdown[Number(depth.replace("L", ""))].structure[0].url
            ) {
              axios({
                url:
                  process.env.BASE_URL +
                  project.breakdown[Number(depth.replace("L", ""))].structure[0]
                    .url +
                  id,
                method: "GET",
              })
                .then((res) => {
                  console.log({ results_4L: res.data.data.results });
                  const level4 = res.data.data.results;
                  this.setState({ depth: depth + 1 });

                  for (var i = 0; i < level4.length; i++) {
                    level4_allproj = [
                      ...level4_allproj,
                      {
                        projectId: level4[i].fkProjectId,
                        id: level4[i].id,
                        structureName: level4[i].structureName,
                        depth: level4[i].depth,
                        lastlevel_depth: project.breakdown.slice(-1)[0].depth,
                        vendorId: level4[i].vendorReferenceId,
                        structure_name: level4[i].structure_name,
                        aclStatus: level4[i].aclStatus,
                      },
                    ];
                  }

                  console.log({ level4: level4_allproj });
                  this.setState({ level4_allproj: level4_allproj });

                  // selected 1st level project

                  let selected3 = [];

                  selected3 = [
                    ...selected3,
                    {
                      depth: depth,
                      id: id,
                      name: structureName,
                      label: structure_name,
                    },
                  ];

                  this.setState({ selected3: selected3 });

                  // end
                })
                .catch((err) => {
                  //   this.setState({isLoaded:true})
                  console.log(err);
                });
            }
          }
        }
      });
    };

  componentDidMount = () => {
    const projectData = this.props.projects;
    console.log({ projprops: this.props });
    console.log({ companyin: projectData });
    const companyId = localStorage.getItem("companyId");

    if (projectData == undefined || projectData.length == 0) {
      this.getAllProjects(companyId);
    } else {
      this.setState({ projects: projectData });
      this.handle1L(projectData);
    }
    if (companyId != undefined) {
      this.checkGISSubscription(companyId);
      this.checkGISSetup(companyId);
    }
  };

  getAllProjects = async (companyId) => {
    // const companyId = localStorage.getItem('companyId')
    console.log({ get_company: companyId });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/companies/" +
        companyId +
        "/projects/",
      method: "GET",
    })
      .then((res) => {
        //   this.setState({isLoaded:true})
        this.setState({ projects: res.data.data.results });
        this.handle1L(res.data.data.results);
      })
      .catch((err) => {
        //   this.setState({isLoaded:true})
        console.log(err);
      });

    console.log({ stateprojects: this.state.projects });
  };

  checkGISSubscription = (companyId) => {
    const user = JSON.parse(localStorage.getItem("userdata"));

    const company = user.user.companies.map((company) => {
      if (company.companyId == companyId) {
        console.log({ subbb: company.subscriptions });
        company.subscriptions.map((subscription) => {
          if (subscription.appCode == "gis") {
            console.log("gisiii", subscription.appCode);
            this.setState({ gis_subscribed: true });
          }
        });
      }
    });
    console.log({ user_data: company });
  };
  checkGISSetup = (companyId) => {
    axios({
      url:
        process.env.GIS_URL +
        process.env.API_VERSION +
        "/companies/" +
        companyId +
        "/projects/status",
      method: "GET",
      params: {
        companyId: companyId,
      },
    })
      .then((res) => {
        // this.setState({ projects: res.data });
        console.log({ gisres: res });
        const gissetupId = res.data.data.map((project) => project.project_id);
        console.log({ gissetupId: gissetupId });
        this.setState({ gissetupId: gissetupId });
      })
      .catch((err) => {
        //   this.setState({isLoaded:true})
        console.log(err);
      });
  };

  handleClick = (
    project,
    project_obj,
    id,
    vendorId,
    depth,
    structureName,
    structure_name,
    aclStatus
  ) => {
    console.log({ in: structureName });
    document.cookie =
      "previouspath=" + window.location.href + ";path=" + process.env.API_URL;

    const { classes } = this.props;
    // if(!aclStatus){
    //     console.log({'inacl':structureName})

    //     return (<
    //         Dialog className={classes.dialogSection} aria-labelledby="customized-dialog-title" open={true}>
    //     <DialogTitle id="customized-dialog-title" onClose={false}>
    //         Unauthorized
    //     </DialogTitle>
    //     <DialogContent>
    //     You are not authorized
    //     </DialogContent>
    //     </Dialog>)

    // }
    if (this.state.selectedProject == project) {
      this.state.selectedProjectStructure.push(
        ...this.state.selected1,
        ...this.state.selected2,
        ...this.state.selected3,
        { depth: depth, id: id, name: structureName, label: structure_name }
      );
    } else {
      // this.setState({ selectedStructureList: [] })
      this.setState({ selectedProjectStructure: [] });
      // this.state.selectedStructureList.push(structureName)
      this.state.selectedProjectStructure.push({
        depth: depth,
        id: id,
        name: structureName,
        label: structure_name,
      });
    }

    // localStorage.setItem('selectedStructureList', JSON.stringify(this.state.selectedStructureList))
    localStorage.setItem(
      "selectedProjectStructure",
      JSON.stringify(this.state.selectedProjectStructure)
    );

    console.log({ projectId: project });
    console.log({ selected: this.props });
    localStorage.setItem("ssoProjectId", project);

    localStorage.setItem("lastlevel", String(depth) + String(id));

    console.log({ project: project_obj });
    if (depth == "1L") {
      localStorage.setItem("phaseId", vendorId);
    } else if (depth == "2L") {
      localStorage.setItem("unitId", vendorId);
    } else {
      localStorage.setItem("waId", vendorId);
    }
    const projectId = localStorage.getItem("ssoProjectId");
    // console.log({'proj_selec':project_obj})
    localStorage.setItem("project", JSON.stringify(project_obj));
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/getprojectid/" +
        projectId +
        "/",
      method: "GET",
    })
      .then((res) => {
        this.props.switchProject();
        // this.action.openSnackbar("Project Changed")
        this.props.history.push({ pathname: "/dashboard" });
        this.props.closeProjectDilog();
        // window.location.reload();
        // this.action.login(this.props.route.location.user_data)
        // this.props.history.push('/dashboard')
      })
      .catch((err) => {
        console.log({ error: err });
      });
  };

  render() {
    const { classes } = this.props;

    const {
      projects,
      level1_allproj,
      level2_allproj,
      level3_allproj,
      level4_allproj,
      last_level,
    } = this.state;

    console.log({ projectsData655465456: projects });

    console.log({ gis_subscribed: this.state.gis_subscribed });

    // console.log({ level2_allproj: level2_allproj })

    // console.log({ level3_allproj: level3_allproj })

    // console.log({ level4_allproj: level4_allproj })

    // console.log({ lastlevel: last_level })

    console.log({ selected1: this.state.selected1 });
    console.log({ selected2: this.state.selected2 });
    console.log({ selected3: this.state.selected3 });
    console.log({ selected4: this.state.selected4 });
    console.log({
      selectedProjectStructurerender: this.state.selectedProjectStructure,
    });

    const selectedStructure = localStorage.getItem("selectedStructure");

    return (
      <Grid container spacing={4}>
        <Grid item md={12} sm={12} xs={12} className={classes.companyNamePsl}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <img
                  width={100}
                  src={JSON.parse(localStorage.getItem("companyCode")).logo}
                  alt=""
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  JSON.parse(localStorage.getItem("companyCode")).companyName
                }
              />
            </ListItem>
          </List>
        </Grid>
        {projects.map((project) => {
          return (
            <Grid item md={4} sm={6} xs={12} className={classes.cardContentBox}>
              {/* <Card onClick={() => this.handleClick(project.projectId, project)}> */}
              <Card>
                <CardContent className={classes.cardActionAreaBox}>
                  <div className={classes.cardMediaBox}>
                    <CardMedia
                      className={classes.media}
                      image={
                        Boolean(project.projectImage)
                          ? project.projectImage
                          : ProjectImg
                      }
                    />
                    <span className={classes.projectTitleSection}>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={classes.projectSelectionTitle}
                      >
                        {project.projectName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="span"
                        className={classes.projectSelectionCode}
                      >
                        <span className={classes.projectCodeTitle}>
                          Code: {project.projectCode}
                        </span>
                      </Typography>
                    </span>
                  </div>

                  <div className={classes.root}>
                    <Grid container>
                      <Grid
                        xs={12}
                        className={
                          this.state.changeClass
                            ? classes.sectionScrollingMax
                            : classes.sectionScrolling
                        }
                      >
                        {level1_allproj.map((level1, index) => {
                          if (
                            level1.projectId == project.projectId &&
                            level1.depth == level1.lastlevel_depth
                          ) {
                            return (
                              <AccordionDetails>
                                <ul className={classes.singleCompanyMenu}>
                                  {/* {this.setState({selectedProject:level1.projectId})} */}
                                  <li>
                                    {" "}
                                    <a
                                      onClick={() =>
                                        this.handleClick(
                                          level1.projectId,
                                          project,
                                          level1.id,
                                          level1.vendorId,
                                          level1.depth,
                                          level1.structureName,
                                          level1.structure_name,
                                          level1.aclStatus
                                        )
                                      }
                                    >
                                      {level1.structureName}
                                    </a>
                                  </li>
                                </ul>
                              </AccordionDetails>
                            );
                          } else if (level1.projectId == project.projectId) {
                            return (
                              <Accordion
                                expanded={Boolean(
                                  this.state.expanded ===
                                    String(level1.id) + index
                                )}
                                className={classes.mainProjectMenuList}
                                onChange={this.handleChange_2L(
                                  String(level1.id) + index,
                                  level1.projectId,
                                  level1.id,
                                  level1.vendorId,
                                  level1.depth,
                                  level1.structureName,
                                  level1.structure_name,
                                  level1.aclStatus
                                )}
                                disabled={level1.aclStatus === false}
                              >
                                <AccordionSummary
                                  aria-controls="panel1bh-content"
                                  id="panel1bh-header"
                                  className={classes.phaseMenuList}
                                >
                                  <Typography className={classes.heading}>
                                    {level1.structureName}
                                  </Typography>
                                </AccordionSummary>

                                {Boolean(level2_allproj.length > 0)
                                  ? level2_allproj.map((level2, index) => {
                                      {
                                        if (
                                          level2.projectId ==
                                            project.projectId &&
                                          level2.depth == level2.lastlevel_depth
                                        ) {
                                          return (
                                            <AccordionDetails>
                                              <ul className={classes.borderTop}>
                                                <li>
                                                  {" "}
                                                  <a
                                                    onClick={() =>
                                                      this.handleClick(
                                                        level2.projectId,
                                                        project,
                                                        level2.id,
                                                        level2.vendorId,
                                                        level2.depth,
                                                        level2.structureName,
                                                        level2.structure_name,
                                                        level2.aclStatus
                                                      )
                                                    }
                                                  >
                                                    {level2.structureName}
                                                  </a>
                                                </li>
                                              </ul>
                                            </AccordionDetails>
                                          );
                                        } else {
                                          return (
                                            <AccordionDetails>
                                              <div
                                                className={classes.borderTop}
                                              >
                                                <Accordion
                                                  expanded={Boolean(
                                                    this.state.expanded_1 ===
                                                      String(level2.id) + index
                                                  )}
                                                  onChange={this.handleChange_3L(
                                                    String(level2.id) + index,
                                                    level2.projectId,
                                                    level2.id,
                                                    level2.vendorId,
                                                    level2.depth,
                                                    level2.structureName,
                                                    level2.structure_name,
                                                    level2.aclStatus
                                                  )}
                                                  disabled={
                                                    level2.aclStatus === false
                                                  }
                                                >
                                                  <AccordionSummary
                                                    // expandIcon={<AddIcon />}
                                                    aria-controls="panel1_1bh-content"
                                                    id="panel1_1bh-header"
                                                    className={
                                                      classes.unitMenuList
                                                    }
                                                  >
                                                    <Typography
                                                      className={
                                                        classes.secondaryHeading
                                                      }
                                                    >
                                                      {level2.structureName}
                                                    </Typography>
                                                  </AccordionSummary>

                                                  {Boolean(
                                                    level3_allproj.length > 0
                                                  )
                                                    ? level3_allproj.map(
                                                        (level3, index) => {
                                                          if (
                                                            level3.projectId ==
                                                              project.projectId &&
                                                            level3.depth ==
                                                              level3.lastlevel_depth
                                                          ) {
                                                            return (
                                                              <AccordionDetails>
                                                                <ul
                                                                  className={
                                                                    classes.borderTop
                                                                  }
                                                                >
                                                                  <li>
                                                                    {" "}
                                                                    <a
                                                                      onClick={() =>
                                                                        this.handleClick(
                                                                          level3.projectId,
                                                                          project,
                                                                          level3.id,
                                                                          level3.vendorId,
                                                                          level3.depth,
                                                                          level3.structureName,
                                                                          level3.structure_name,
                                                                          level3.aclStatus
                                                                        )
                                                                      }
                                                                    >
                                                                      {
                                                                        level3.structureName
                                                                      }
                                                                    </a>
                                                                  </li>
                                                                </ul>
                                                              </AccordionDetails>
                                                            );
                                                          } else {
                                                            return (
                                                              <AccordionDetails>
                                                                <div
                                                                  className={
                                                                    classes.borderTop
                                                                  }
                                                                >
                                                                  <Accordion
                                                                    expanded={Boolean(
                                                                      this.state
                                                                        .expanded_2 ===
                                                                        String(
                                                                          level3.id
                                                                        ) +
                                                                          index
                                                                    )}
                                                                    onChange={this.handleChange_4L(
                                                                      String(
                                                                        level3.id
                                                                      ) + index,
                                                                      level3.projectId,
                                                                      level3.id,
                                                                      level3.vendorId,
                                                                      level3.depth,
                                                                      level3.structureName,
                                                                      level3.structure_name,
                                                                      level3.aclStatus
                                                                    )}
                                                                    disabled={
                                                                      level3.aclStatus ===
                                                                      false
                                                                    }
                                                                  >
                                                                    <AccordionSummary
                                                                      // expandIcon={<AddIcon />}
                                                                      aria-controls="panel1_1bh-content"
                                                                      id="panel1_1bh-header"
                                                                      className={
                                                                        classes.workAreaList
                                                                      }
                                                                    >
                                                                      <Typography
                                                                        className={
                                                                          classes.secondaryHeading
                                                                        }
                                                                      >
                                                                        {
                                                                          level3.structureName
                                                                        }
                                                                      </Typography>
                                                                    </AccordionSummary>

                                                                    {Boolean(
                                                                      level4_allproj.length >
                                                                        0
                                                                    )
                                                                      ? level4_allproj.map(
                                                                          (
                                                                            level4,
                                                                            index
                                                                          ) => {
                                                                            if (
                                                                              level4.projectId ==
                                                                                project.projectId &&
                                                                              level4.depth ==
                                                                                level4.lastlevel_depth
                                                                            ) {
                                                                              return (
                                                                                <AccordionDetails>
                                                                                  <ul
                                                                                    className={
                                                                                      classes.borderTop
                                                                                    }
                                                                                  >
                                                                                    <li>
                                                                                      {" "}
                                                                                      <a
                                                                                        onClick={() =>
                                                                                          this.handleClick(
                                                                                            level4.projectId,
                                                                                            project,
                                                                                            level4.id,
                                                                                            level4.vendorId,
                                                                                            level4.depth,
                                                                                            level4.structureName,
                                                                                            level4.structure_name,
                                                                                            level4.aclStatus
                                                                                          )
                                                                                        }
                                                                                      >
                                                                                        {
                                                                                          level4.structureName
                                                                                        }
                                                                                      </a>
                                                                                    </li>
                                                                                  </ul>
                                                                                </AccordionDetails>
                                                                              );
                                                                            }
                                                                          }
                                                                        )
                                                                      : null}
                                                                  </Accordion>
                                                                </div>
                                                              </AccordionDetails>
                                                            );
                                                          }
                                                        }
                                                      )
                                                    : null}
                                                </Accordion>
                                              </div>
                                            </AccordionDetails>
                                          );
                                        }
                                      }
                                    })
                                  : null}
                              </Accordion>
                            );
                          }
                        })}
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
              {/* </Card> */}
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  root: {
    width: "100%",
    "& .MuiPaper-root": {
      backgroundColor: "transparent !important",
    },
    "& .MuiPaper-elevation1": {
      boxShadow: "0px 0px 0px 0px",
    },
    "& .MuiAccordionDetails-root": {
      padding: "8px 0px 0px 16px !important",
    },
    "& a": {
      textDecoration: "none",
      color: "#06425c",
    },
  },

  dialogSection: {
    "& .MuiDialog-paper": {
      width: "100%",
    },
    "& .MuiDialogTitle-root": {
      "& .MuiTypography-root": {
        color: "#06374a",
        fontSize: "20px",
        lineHeight: "30px",
        fontFamily: "Montserrat-Medium",
      },
    },
    "& button:focus": {
      outline: "none",
    },
  },
  dialogTitle: {
    "& .MuiListItemText-primary": {
      color: "#06374a",
      fontSize: "15px",
      fontFamily: "Montserrat-Regular",
    },
  },
  gis_controltower: {
    float: "right",
  },
  heading: {
    fontSize: "14px",
    // flexBasis: '33.33%',
    flexShrink: "0 !important",
    fontFamily: "Montserrat-Regular",
  },
  secondaryHeading: {
    fontSize: "14px",
    // color: theme.palette.text.secondary,
    fontFamily: "Montserrat-Regular",
  },
  borderTop: {
    // borderTop: '1px solid #ccc',
    paddingTop: "5px",
    marginTop: "-10px",
    width: "100%",
    // paddingLeft: '10px',
    fontSize: "14px",
    fontFamily: "Montserrat-Regular",
    "& ul": {
      borderTop: "0px !important",
      marginBottom: "0rem",
      paddingTop: "5px",
      marginTop: "-10px",

      "&:hover": {
        color: "#fff !important",
      },
    },
    "& ul li": {
      lineHeight: "30px",
      // paddingLeft: '10px',
    },
  },
  rightArrowColor: {
    color: "#6e6e6e",
    marginTop: "-3px",
    fontSize: "15px",
  },
  whiteBack: {
    backgroundColor: "#fff",
    // boxShadow: '1px 2px 8px 0px #ccc',
    maxHeight: "135px",
    minHeight: "90px",
    overflowY: "auto",
    marginTop: "15px",
    paddingBottom: "10px",
    "& ul": {
      borderTop: "0px !important",
      paddingTop: "2px",
      listStyle: "none",
      backgroundColor: "#F0F0F0",
      paddingLeft: "15px",
      borderRadius: "10px",
      color: "#06425C",
      margin: "-5px 0 5px",

      "&:hover": {
        backgroundColor: "orange",
      },

      "& li": {
        cursor: "pointer",

        "& a": {
          display: "block",
        },
      },
    },
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#ccc",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#bababa",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f47607",
      maxHeight: "10px",
      borderRadius: "10px",
    },
  },

  cardContentBox: {
    minWidth: "260px",

    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },

  cardShadowBox: {
    paddingLeft: "0px",
    paddingRight: "0px",
    webkitBoxShadow: "0px 0px 18px -8px rgb(0 0 0 / 75%)",
    mozBoxShadow: "0px 0px 18px -8px rgba(0,0,0,0.75)",
    boxShadow: "0px 0px 18px -8px rgb(0 0 0 / 75%)",
    borderRadius: "10px",
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
    height: "270px",
    position: "relative",
    borderRadius: "10px",
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
    fontSize: "16px",
    color: "#ffffff",
    lineHeight: "19px",
    fontFamily: "Montserrat-Medium !important",
    textAlign: "left",
    marginBottom: "0px",
  },
  projectSelectionCode: {
    fontSize: "14px",
    color: "#333333",
    fontFamily: "Montserrat-Regular",
  },
  // actionBttmArea: {
  //   float: 'right',
  //   '& button:focus': {
  //     outline: 'none',
  //   },
  // },
  projectName: {
    fontSize: "16px",
    paddingLeft: "0px",
    paddingRight: "5px",
    color: "#ffffff",
    fontFamily: "Montserrat-Regular",
    "& .MuiSvgIcon-root": {
      marginLeft: "4px",
      fontSize: "15px",
    },
  },
  cardContentBoxIndexHigh: {
    minWidth: "260px",
    position: "relative",
    height: "450px",
    zIndex: "999",
    "& .MuiPaper-root.MuiCard-root": {
      position: "absolute",
      width: "calc(100% - 32px)",
    },
  },
  cardActionAreaBox: {
    padding: "0px !important",
    "&:hover .MuiCardMedia-root": {
      webkitTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      mozTransform: "scale(1.2)",
      transform: "scale(1.2)",
      webkitFilter: "grayscale(0%)",
      filter: "grayscale(0%)",
    },
  },
  projectTitleSection: {
    width: "100%",
    float: "left",
    position: "absolute",
    bottom: "0px",
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,2))",
    padding: "20px 20px 14px 20px",
  },
  projectCodeTitle: {
    fontSize: "14px",
    color: "#ffffff",
    fontFamily: "Montserrat-Regular !important",
    lineHeight: "32px",
    textAlign: "left",
    width: "60%",
    float: "left",
  },
  phaseMenuList: {
    backgroundColor: "#7890A4",
    color: "#ffffff",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiTypography-root": {
      color: "#ffffff !important",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium !important",
      lineHeight: "19px",
    },
    "& .Mui-expanded": {
      "& .MuiTypography-root": {
        color: "#ffffff !important",
        fontWeight: "400 !important",
      },
      "&:before": {
        color: "#fff !important",
        fontSize: "21px",
        lineHeight: "16px",
      },
    },
    "& svg": {
      fontSize: "16px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
    },
  },
  unitMenuList: {
    backgroundColor: "#DFDFDF",
    color: "#06425C",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiListItemText-primary": {
      color: "#06425C",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "& svg": {
      fontSize: "16px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff !important",
    },
    "&:hover .MuiListItemText-primary, &:hover p": {
      color: "#ffffff !important",
    },
    "& .Mui-expanded": {
      "& .MuiTypography-root": {
        color: "#263238 !important",
        fontWeight: "400 !important",
        width: "100%",

        "&:hover": {
          color: "#fff !important",
        },
      },
      "&:hover:before": {
        color: "#fff !important",
      },
      "&:before": {
        color: "#263238 !important",
        fontSize: "21px",
        lineHeight: "16px",
      },
    },
  },
  workAreaList: {
    backgroundColor: "#F0F0F0",
    color: "#06425C",
    borderRadius: "10px",
    marginBottom: "6px",
    "& .MuiListItemText-primary": {
      color: "#06425C",
      fontSize: "14px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff !important",
    },
    "&:hover .MuiListItemText-primary, &:hover p": {
      color: "#ffffff !important",
    },
    "& .Mui-expanded": {
      "& .MuiTypography-root": {
        color: "#263238 !important",
        fontWeight: "400 !important",
        width: "100%",
        "&:hover": {
          color: "#fff !important",
        },
      },
      "&:hover:before": {
        color: "#fff !important",
      },
      "&:before": {
        color: "#263238 !important",
        fontSize: "21px",
        lineHeight: "16px",
        "&:hover": {
          color: "#fff !important",
        },
      },
    },
  },
  companyNamePsl: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    "& li": {
      padding: "0px",
      "& .MuiListItemText-primary": {
        color: "#06425C",
        fontSize: "20px",
        fontFamily: "Montserrat-Semibold !important",
        textTransform: "Uppercase",
        lineHeight: "22px",
        paddingLeft: "10px",
      },
    },
  },
  sectionScrolling: {
    maxHeight: "135px",
    overflow: "auto",
    marginTop: "8px",
    marginRight: "3px",
    marginBottom: "5px",
    //paddingRight: '5px',
    "& .MuiAccordion-root.Mui-expanded": {
      margin: "0px 0",
      boxShadow: "none",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "100%",
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        "&:before": {
          position: "absolute",
          right: "10px",
        },
        "& ul": {
          padding: "0px",
        },
      },
    },
    "& .MuiAccordion-root:before": {
      height: "0px",
    },
  },
  sectionScrollingMax: {
    maxHeight: "270px",
    overflow: "auto",
    marginTop: "8px",
    marginRight: "3px",
    marginBottom: "5px",
    //paddingRight: '5px',
    "& .MuiAccordion-root.Mui-expanded": {
      margin: "0px 0",
      boxShadow: "none",
      paddingTop: "0px",
      paddingBottom: "0px",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "100%",
      "& .MuiAccordionSummary-content": {
        margin: "0px",
        "&:before": {
          position: "absolute",
          right: "10px",
        },
        "& ul": {
          padding: "0px",
        },
      },
    },
    "& .MuiAccordion-root:before": {
      height: "0px",
    },
    "& ul": {
      borderTop: "0px !important",
      paddingTop: "2px",
      listStyle: "none",
      backgroundColor: "#F0F0F0",
      paddingLeft: "15px",
      borderRadius: "10px",
      color: "#06425C",
      margin: "-5px 0 5px",

      "&:hover": {
        backgroundColor: "orange",
      },

      "& li": {
        cursor: "pointer",

        "& a": {
          display: "block",
        },
      },
    },
  },
  singleCompanyMenu: {
    listStyle: "none",
    backgroundColor: "#7890A4",
    color: "#ffffff",
    borderRadius: "10px",
    marginBottom: "6px",
    padding: "6px 12px",
    marginBottom: 0,
    width: "calc(100% - 14px)",

    "& a": {
      display: "block",
      cursor: "pointer",
    },
  },
  mainProjectMenuList: {
    padding: "0px 8px 0px 8px",
    boxShadow: "none",
    "& .MuiListItemText-root": {
      margin: "0px",
    },
    "& .Mui-expanded": {
      borderRadius: "10px !important",
      "& > ul > .MuiButtonBase-root": {
        backgroundColor: "#F28705",
        color: "#ffffff",
        "& .MuiListItemText-primary": {
          color: "#ffffff",
        },
      },
    },
  },
});

ProjectSelection.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
};

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
  )(withStyles(styles, { withTheme: true })(ProjectSelection))
);
