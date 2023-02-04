import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
  Link,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { UserActions } from "../../../../user/UserActions";
import moment from "moment";
import { Paper, Input } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import SaveIcon from "@material-ui/icons/Save";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import { TextField, Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Avatar from "@material-ui/core/Avatar";
import dateFormat from "../../../../../helpers/dateFormat";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@mui/material/Alert";
import DefAppLogo from "../../../../../../../frontend/public/static/images/application-default-icon.svg";

class UserSubscriptions extends Component {
  constructor(props) {
    super(props);

    console.log({ props: this.props });
    this.action = new UserActions(this.props.dispatch);
    this.state = {
      roleShow: {},
      open: false,
      subscriptions: [],
      unsubscription: [],
      applications: [],
      roles: [],
      user_id: "",
      role_name: {},
      openDialog: false,
      addAppDialog: {
        applications: [],
      },
      dialogModules: [],
      EditOpenDialog: false,
      subscriptionName: "",
      openSnack: {
        bool: false,
        message: "",
      },
      unsubscribeOne: [],
      modelUnsub: false,
      addAppRoles: [],
      appId: undefined,
      roleId: undefined,
      appRolePermissions: {},
      loading: false,
      setindex: 0,
      unsubscribing: [],
      modelUnsubSuccess: false,
    };
  }

  handleCloseSnackbar = (event, reason) => {
    this.setState({ openSnack: { bool: false } });
  };

  getSubscriptions = async () => {
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
        const applications = res.data.data.results;
        return applications;
      })
      .catch(function (error) {
        console.log(error);
      });

    const user_apps = this.props.location.user_apps
      ? this.props.location.user_apps
      : JSON.parse(localStorage.getItem("user_apps"));

    if (user_apps) {
      user_apps.map((company) =>
        this.setState({ subscriptions: company.subscriptions })
      );
      const mySubs = user_apps.map((company) => company.subscriptions);

      const unsubscribed = classic_data.filter(
        (item1) => !mySubs[0].some((item2) => item2.appCode === item1.appCode)
      );

      this.setState({ unsubscription: unsubscribed });
    }
  };

  handleEdit = (subs, index) => {
    console.log(subs, index, "edit");
    this.setState({ setindex: index });
    const appId = this.state.subscriptions[index].appId;

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
        this.setState({
          subscriptionName: subs.appName,
          EditOpenDialog: true,
        });
        let { roleShow } = this.state;

        if (roleShow[index] == true) {
          roleShow[index] = false;
        } else {
          roleShow[index] = true;
        }
        this.setState({ roleShow }, () =>
          console.log({ roleShow: this.state.roleShow })
        );
        this.setState({
          roles: res.data.data.results,
        });
      })
      .catch((err) => {
        console.log({ error: err });

        if (err.response && err.response.status == 403) {
          this.setState({
            openSnack: {
              bool: true,
              message: err.response.data.data.results.detail,
            },
          });
        }
      });
  };

  handleSave = (subs, index) => {
    console.log(subs, this.state.setindex, "save");

    if (this.state.roleId == undefined) {
      console.log({ props_save: this.props });
      this.action.openSnackbar("Please specify the role", true);
      this.action.showSnackbar;
    } else {
      const userId = this.props.location.user_id
        ? this.props.location.user_id
        : localStorage.getItem("user_id");

      const companyId = localStorage.getItem("companyId");
      this.state.subscriptions[this.state.setindex].subscription_details.map(
        (subscription_detail) => {
          const appId = this.state.subscriptions[this.state.setindex].appId;
          const subscriptionId = subscription_detail.id;
          // console.log({ subscriptionId: subscriptionId });
          // console.log({ user_id: userId });
          // console.log({ companyId: companyId });
          // console.log({ appId: appId });
          // console.log({ roleId: this.state.roleId });

          const input = new FormData();

          input.append("fkCompanyId", companyId);
          input.append("fkUserId", userId);
          input.append("fkAppId", appId);
          input.append("fkGroupId", this.state.roleId);
          input.append("active", true);

          axios({
            url:
              process.env.API_URL +
              process.env.API_VERSION +
              "/user/" +
              userId +
              "/subscriptions/" +
              subscriptionId +
              "/",
            method: "PUT",
            data: input,
          })
            .then((res) => {
              console.log({ result: res });

              let { role_name } = this.state;
              role_name[this.state.setindex] = res.data.data.results.role_name;
              this.setState({ role_name });
              // console.log({ roleshow_save: this.state.roleShow[index] });

              let { roleShow } = this.state;
              roleShow[this.state.setindex] =
                !this.state.roleShow[this.state.setindex];
              this.setState({ roleShow });
              var subs = JSON.parse(localStorage.getItem("user_apps"));

              if (subs[0].subscriptions[this.state.setindex].roles.length > 0) {
                subs[0].subscriptions[this.state.setindex].roles[0].name =
                  this.state.role_name[this.state.setindex];

                localStorage.setItem("user_apps", JSON.stringify(subs));

                this.action.openSnackbar(
                  "User role has been changed successfully"
                );
                this.action.showSnackbar;
                setTimeout(() => {
                  this.setState({ EditOpenDialog: false, roleId: "" });
                  window.location.reload();
                }, 1000);
              } else {
                subs[0].subscriptions[this.state.setindex].roles.push({
                  name: this.state.role_name[this.state.setindex],
                });

                localStorage.setItem("user_apps", JSON.stringify(subs));

                this.action.openSnackbar(
                  "User role has been changed successfully"
                );
                this.action.showSnackbar;
                setTimeout(() => {
                  this.setState({ EditOpenDialog: false, roleId: "" });
                  window.location.reload();
                }, 1000);
              }
            })
            .catch((err) => {
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
              }
            });
        }
      );
    }
  };

  handleChangeRole = (e) => {
    this.setState({ roleId: e.target.value });
  };

  componentDidMount = () => {
    this.getSubscriptions();
  };

  handleToggle = (subs, index) => {
    const unsub = this.state.subscriptions[index].subscription_details;
    this.setState({ unsubscribeOne: unsub, unsubscribing: subs });
    this.setState({
      modelUnsub: !this.state.modelUnsub,
    });
  };
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  handleYes = (subs, index) => {
    this.setState({ open: false });

    this.state.unsubscribeOne.map((subscription_detail) => {
      console.log({ subscriptionId: subscription_detail.id });
      const subscriptionId = subscription_detail.id;
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          "unsubscribe/" +
          subscriptionId +
          "/",
        method: "PUT",
        data: { active: false },
      })
        .then((res) => {
          console.log({ result: res });
          // this.action.openSnackbar("User Unsubscribed succesfully");
          // this.action.showSnackbar;
          this.setState({ modelUnsubSuccess: true, modelUnsub: false });

          setTimeout(() => {
            // this.props.history.push("/users");
            if (this.state.subscriptions.length <= 1) {
              this.props.history.push("/users");
            } else {
              const filteredSubs = this.state.subscriptions.filter((one) => {
                return one !== this.state.unsubscribing;
              });
              let locStItem = JSON.parse(localStorage.getItem("user_apps"));
              locStItem[0].subscriptions = filteredSubs;
              localStorage.setItem("user_apps", JSON.stringify(locStItem));
              // this.setState({ subscriptions: filteredSubs, modelUnsub: false });
              window.location.reload();
              // window.location.reload()
            }
          }, 2000);
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
          }
        });
    });
  };

  handleUnsubSuccessClose = () => {
    this.setState({ modelUnsubSuccess: false });
  };

  handleNo = () => {
    this.setState({ modelUnsub: false });
  };

  handleOpenDialog = () => {
    this.setState({
      openDialog: true,
    });
    let tempArr = [];
    let tempArrMods = [];

    this.state.unsubscription.forEach((element) => {
      tempArr.push(element.appName);
      element.modules.forEach((one) => {
        tempArrMods.push(one);
      });
    });

    this.setState({
      addAppDialog: { applications: tempArr, modules: tempArrMods },
    });
  };

  handleCloseDialog = () => {
    this.setState({
      openDialog: false,
      addAppDialog: { applications: [] },
      dialogModules: [],
      addAppRoles: [],
      appRolePermissions: {},
      loading: false,
    });
  };

  handleApplicationChange = (value) => {
    const filtered = this.state.unsubscription.filter(
      (one) => one.appName === value
    );
    console.log(filtered, "filtered");
    this.setState({
      dialogModules: filtered[0].modules,
      addAppRoles: filtered[0].roles,
      appRolePermissions: {},
    });
  };

  handleRoleChange = (value) => {
    this.setState({ loading: true });
    const filtered = this.state.addAppRoles.filter((one) => one.name === value);
    console.log(filtered, "filtered role");
    this.setState({
      appId: filtered[0].fkAppId,
      roleId: filtered[0].id,
    });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/applications/" +
        filtered[0].fkAppId +
        "/roles/" +
        filtered[0].id +
        "/",
      method: "GET",
    })
      .then((res) => {
        console.log(
          res.data.data.results.permissions[0],
          Object.keys(res.data.data.results.permissions[0]).length,
          "permissions"
        );
        this.setState({
          appRolePermissions: res.data.data.results.permissions[0],
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleEditApplicationCloseDialog = () => {
    this.setState({
      EditOpenDialog: false,
    });
  };

  // getPermissions = (value) => {
  //   const filtered = this.state.roles.filter((one) => one.name === value);
  //   axios({
  //     url:
  //       process.env.API_URL +
  //       process.env.API_VERSION +
  //       "/applications/" +
  //       filtered[0].fkAppId +
  //       "/roles/" +
  //       filtered[0].id +
  //       "/",
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       console.log(res.data.data.results.permissions, "permission res");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  render() {
    const { classes } = this.props;
    const user_name = this.props.location.user_name
      ? this.props.location.user_name
      : localStorage.getItem("user_name");

    const { roleShow } = this.state;

    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
      <Fragment>
        <div className={classes.unSubscribeSection}>
          <Grid container>
            <Grid item md={12} xs={12} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">
                <img src="https://media.pace-os.com/icons/svg/user-subscription-40x40.svg" />{" "}
                User Subscriptions
              </Typography>
            </Grid>

            <Paper elevation={3} className={classes.width_hundPer}>
              <Grid container spacing={2}>
                <Grid
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  className={classes.userNameSection}
                >
                  <Typography className={classes.subscribedTitle} varient="h1">
                    <img
                      src={
                        localStorage.getItem("user_avatar") !== "null"
                          ? localStorage.getItem("user_avatar")
                          : "https://media.pace-os.com/icons/svg/user-large-72x72.svg"
                      }
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "contain",
                        marginRight: 10,
                        border: "1px solid rgb(181, 181, 181)",
                        borderRadius: "50%",
                      }}
                      alt="User logo"
                    />{" "}
                    {user_name}'s Subscription
                  </Typography>
                </Grid>
                {!(this.state.subscriptions.length === 0) ? (
                  <Fragment>
                    {this.state.subscriptions.map((subscription, index2) => {
                      return (
                        <Fragment>
                          <Grid item md={6} sm={12} xs={12}>
                            <span className={classes.userSubscriptionList}>
                              <Grid container spacing={2}>
                                <Grid item md={10} sm={10} xs={12}>
                                  <span className={classes.moduleIconSection}>
                                    {subscription.appLogo === null ? (
                                      <img
                                        src={DefAppLogo}
                                        style={{
                                          width: 120,
                                          height: 120,
                                          borderRadius: "50%",
                                        }}
                                        alt="Module icon"
                                      />
                                    ) : (
                                      <img
                                        src={subscription.appLogo}
                                        style={{
                                          width: 120,
                                          height: 120,
                                          borderRadius: "50%",
                                        }}
                                        alt="Module icon"
                                      />
                                    )}
                                  </span>
                                  <span
                                    className={classes.moduleContentSection}
                                  >
                                    <Typography
                                      variant="h2"
                                      className={classes.moduleTitle}
                                    >
                                      {subscription.appName}
                                    </Typography>
                                    <List className={classes.subscribeListBox}>
                                      {subscription.roles.map((role) => (
                                        <ListItem>
                                          <ListItemText
                                            className={
                                              classes.subscribLableTitle
                                            }
                                            primary="Role:"
                                            secondary={role.name}
                                          />
                                        </ListItem>
                                      ))}

                                      {subscription.subscription_details.map(
                                        (subscription_detail) => (
                                          <ListItem>
                                            <ListItemText
                                              className={
                                                classes.subscribLableTitle
                                              }
                                              primary="Joined:"
                                              secondary={moment(
                                                subscription_detail.createdAt
                                              ).format("D  MMMM  Y")}
                                            />
                                          </ListItem>
                                        )
                                      )}
                                    </List>
                                  </span>
                                </Grid>
                                <Grid
                                  item
                                  md={2}
                                  sm={2}
                                  xs={12}
                                  className={classes.subscriptionActionSection}
                                >
                                  <Tooltip
                                    arrow
                                    title="Edit"
                                    aria-label="edit"
                                    className={classes.editBtn}
                                  >
                                    <IconButton
                                      edge="end"
                                      aria-label="edit"
                                      onClick={() =>
                                        this.handleEdit(subscription, index2)
                                      }
                                      className={classes.fabEditBtn}
                                    >
                                      <img
                                        src="https://media.pace-os.com/icons/svg/edit-24x24.svg"
                                        alt="Edit application"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip
                                    arrow
                                    title="Remove application"
                                    aria-label="Remove application"
                                    className={classes.deleteBtn}
                                  >
                                    <IconButton
                                      edge="end"
                                      aria-label="delete"
                                      onClick={() =>
                                        this.handleToggle(subscription, index2)
                                      }
                                    >
                                      <img
                                        src="https://media.pace-os.com/icons/svg/remove-circle-24x24.svg"
                                        alt="Remove application"
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                <Dialog
                                  open={this.state.EditOpenDialog}
                                  onClose={
                                    this.handleEditApplicationCloseDialog
                                  }
                                  className={classes.dailogBoxCustomStyle}
                                >
                                  <DialogTitle>
                                    Edit application{" "}
                                    <CloseIcon
                                      className={classes.closeDialog}
                                      onClick={
                                        this.handleEditApplicationCloseDialog
                                      }
                                    />
                                  </DialogTitle>
                                  <DialogContent>
                                    <Grid container spacing={2}>
                                      <Grid
                                        item
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        className={classes.viewListBox}
                                      >
                                        <Typography
                                          variant="label"
                                          gutterBottom
                                          className={classes.viewLabel}
                                        >
                                          Application
                                        </Typography>
                                        <Typography
                                          className={classes.viewLabelValue}
                                        >
                                          {this.state.subscriptionName}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        className={classes.formBox}
                                      >
                                        <FormControl
                                          variant="outlined"
                                          fullWidth
                                          required
                                        >
                                          <InputLabel id="project-name-label">
                                            Role
                                          </InputLabel>
                                          <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="Role"
                                            value={this.state.roleId}
                                            onChange={(e) =>
                                              this.setState({
                                                roleId: e.target.value,
                                              })
                                            }
                                          >
                                            {this.state.roles.map((one) => {
                                              return (
                                                <MenuItem value={one.id}>
                                                  {one.name}
                                                </MenuItem>
                                              );
                                            })}
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid
                                        item
                                        md={12}
                                        sm={12}
                                        xs={12}
                                        align="left"
                                        className={classes.actionSection}
                                      >
                                        <Button
                                          size="medium"
                                          variant="contained"
                                          className={classes.buttonStyle}
                                          onClick={() =>
                                            this.handleSave(
                                              subscription,
                                              index2
                                            )
                                          }
                                        >
                                          Update
                                        </Button>
                                        <Button
                                          size="medium"
                                          variant="contained"
                                          className={classes.custmCancelBtn}
                                          onClick={
                                            this
                                              .handleEditApplicationCloseDialog
                                          }
                                        >
                                          Cancel
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </DialogContent>
                                </Dialog>

                                <Dialog
                                  className={classes.dialogSection}
                                  aria-labelledby="customized-dialog-title"
                                  open={this.state.modelUnsub}
                                  onClose={this.handleNo}
                                >
                                  <DialogContent>
                                    <Grid
                                      item
                                      md={12}
                                      sm={12}
                                      xs={12}
                                      className={classes.topMessageDilog}
                                    >
                                      <Typography
                                        variant="h3"
                                        align="center"
                                        className={classes.successSymbol}
                                      >
                                        <img
                                          src="https://media.pace-os.com/icons/svg/are-you-sure-72x72.svg"
                                          alt="Alert"
                                        />
                                      </Typography>
                                      <Typography
                                        variant="h6"
                                        className={classes.successMessage}
                                        align="center"
                                      >
                                        Are you sure to unsubscribe this
                                        application?
                                      </Typography>
                                    </Grid>

                                    <Grid
                                      item
                                      md={12}
                                      sm={12}
                                      xs={12}
                                      align="center"
                                      className={classes.deleteMassBox}
                                    >
                                      <Button
                                        size="medium"
                                        variant="contained"
                                        className={classes.buttonStyle}
                                        onClick={() =>
                                          this.handleYes(subscription, index2)
                                        }
                                      >
                                        Yes
                                      </Button>
                                      <Button
                                        size="medium"
                                        variant="contained"
                                        className={classes.custmCancelBtn}
                                        onClick={this.handleNo}
                                      >
                                        No
                                      </Button>
                                    </Grid>

                                    {/* <ListItemText className={classes.dialogTitle} primary="Are you sure to unsubscribe?" /> */}
                                  </DialogContent>
                                </Dialog>

                                <Dialog
                                  className={classes.dialogSection}
                                  aria-labelledby="customized-dialog-title"
                                  open={this.state.modelUnsubSuccess}
                                  onClose={this.handleUnsubSuccessClose}
                                >
                                  <DialogContent>
                                    <Grid
                                      item
                                      md={12}
                                      sm={12}
                                      xs={12}
                                      className={classes.topMessageDilog}
                                    >
                                      <Typography
                                        variant="h3"
                                        align="center"
                                        className={classes.successSymbol}
                                      >
                                        <img
                                          src="https://media.pace-os.com/icons/svg/success-72x72.svg"
                                          alt="Alert"
                                        />
                                      </Typography>
                                      <Typography
                                        variant="h6"
                                        className={classes.successMessage}
                                        align="center"
                                      >
                                        Application unsubscribed successfully.
                                      </Typography>
                                    </Grid>

                                    {/* <ListItemText className={classes.dialogTitle} primary="Are you sure to unsubscribe?" /> */}
                                  </DialogContent>
                                </Dialog>
                              </Grid>
                            </span>
                          </Grid>
                        </Fragment>
                      );
                    })}
                    {/* {this.state.subscriptions.length < 6 && (
                      <Grid item md={6} sm={12} xs={12}>
                        <span className={classes.userSubscriptionAdd}>
                          <Grid container spacing={2}>
                            <Grid item md={12} sm={12} xs={12}>
                              <Button onClick={this.handleOpenDialog}>
                                <img
                                  src="https://media.pace-os.com/icons/svg/add-72x72.svg"
                                  alt="Add icon"
                                />
                                <Typography variant="h5" component="h2">
                                  Add more application
                                </Typography>
                              </Button>
                            </Grid>
                          </Grid>
                        </span>
                      </Grid>
                    )} */}
                  </Fragment>
                ) : (
                  <>
                    <Grid
                      container
                      className={classes.contentBoxContainerNoApp}
                    >
                      {console.log(
                        JSON.parse(localStorage.getItem("user_apps")),
                        JSON.parse(localStorage.getItem("user_apps")).length,
                        "JSON.parse(localStorage)"
                      )}
                      {JSON.parse(localStorage.getItem("user_apps")).length >
                      0 ? (
                        <Typography
                          gutterBottom
                          className={classes.noAppSection}
                          variant="body1"
                          component="h2"
                          style={{ textAlign: "center" }}
                        >
                          <CircularProgress size={20} />
                        </Typography>
                      ) : JSON.parse(localStorage.getItem("user_apps"))
                          .length === 0 ? (
                        <Typography
                          gutterBottom
                          className={classes.noAppSection}
                          variant="body1"
                          component="h2"
                          style={{ textAlign: "center" }}
                        >
                          No PACE applications were subscribed.
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
        </div>

        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          className={classes.dailogBoxCustomStyle}
        >
          <DialogTitle>
            Add application{" "}
            <CloseIcon
              className={classes.closeDialog}
              onClick={this.handleCloseDialog}
            />
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="project-name-label">Application</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Application"
                    onChange={(e) =>
                      this.handleApplicationChange(e.target.value)
                    }
                  >
                    {this.state.addAppDialog.applications.map((one) => {
                      return <MenuItem value={one}>{one}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>

              {this.state.dialogModules.length > 0 && (
                <>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.formBox}
                  >
                    <FormLabel
                      className={classes.popSubTitle}
                      component="legend"
                    >
                      Select modules
                    </FormLabel>
                    <FormGroup row className={classes.customCheckBoxSection}>
                      {this.state.dialogModules.map((one) => {
                        return (
                          <FormControlLabel
                            className={classes.customCheckBox}
                            control={<Checkbox />}
                            label={one.moduleWebName}
                            value={one.moduleWebName}
                          />
                        );
                      })}
                    </FormGroup>
                  </Grid>
                </>
              )}

              {this.state.addAppRoles.length > 0 && (
                <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                  <FormControl variant="outlined" fullWidth required>
                    <InputLabel id="project-name-label">Role</InputLabel>
                    <Select
                      id="project-name"
                      labelId="project-name-label"
                      label="Role"
                      onChange={(e) => this.handleRoleChange(e.target.value)}
                    >
                      {this.state.addAppRoles.map((one) => {
                        return <MenuItem value={one.name}>{one.name}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              <Grid container alignItems="center" justifyContent="center">
                {this.state.loading && <CircularProgress size={22} />}
              </Grid>

              {Object.keys(this.state.appRolePermissions).length > 0 && (
                <>
                  <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.formBox}
                  >
                    <FormLabel
                      className={classes.popSubTitle}
                      component="legend"
                    >
                      Role Permissions
                    </FormLabel>
                    <div style={{ maxHeight: 300, overflow: "auto" }}>
                      {Object.entries(this.state.appRolePermissions).map(
                        (one) => {
                          return (
                            <>
                              <p style={{ margin: "10px 0 10px" }}>{one[0]}</p>
                              {Object.entries(one[1]).map((single) => {
                                return (
                                  <>
                                    <Chip
                                      style={
                                        single[1] === false
                                          ? {
                                              background:
                                                "rgba(161, 0, 0, 0.15)",
                                              fontSize: 12,
                                            }
                                          : {
                                              background:
                                                "rgba(0, 129, 22, 0.15)",
                                              fontSize: 12,
                                            }
                                      }
                                      label={single[0]
                                        .replace("_", " ")
                                        .toUpperCase()}
                                      className={classes.permissionList}
                                    />
                                  </>
                                );
                              })}
                            </>
                          );
                        }
                      )}
                    </div>
                  </Grid>
                </>
              )}
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                align="left"
                className={classes.actionSection}
              >
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.buttonStyle}
                >
                  Save
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.custmCancelBtn}
                  onClick={this.handleCloseDialog}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={this.state.openSnack.bool}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="error">
            {this.state.openSnack.message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  contentBoxContainerNoApp: {
    padding: theme.spacing(2, 1, 2, 1),
  },
  userSubscriptionAdd: {
    height: "152px",
    border: "1px dashed #ccc",
    display: "block",
    borderRadius: "10px",
    padding: "0px",
    "& button": {
      width: "100%",
      height: "152px",
      display: "block",
      "& img": {
        width: "65px",
      },
      "& .MuiTypography-root": {
        fontSize: "18px",
        color: "#06425C",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: "22px",
        paddingTop: "15px",
        textTransform: "none",
      },
    },
    "& button:focus": {
      outline: "none",
    },
  },
  unSubscribeSection: {
    padding: "24px",
  },
  noAppSection: {
    display: "block",
    textAlign: "center",
    padding: "20px",
    width: "100%",
    margin: "0",
    fontSize: "20px",
    fontFamily: "Montserrat-Medium",
    color: "#054D69",
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
  subscribeListBox: {
    paddingBottom: "0px",
    "& li": {
      padding: "0px",
    },
    "& button:focus": {
      outline: "none",
    },
  },
  subscribLableTitle: {
    margin: "0px",
    "& span": {
      fontSize: "14px",
      fontFamily: "Montserrat-Regular",
      color: "#7692A4",
      display: "inline-block",
      float: "left",
      lineHeight: "26px",
      marginRight: "10px",
    },
    "& p": {
      display: "inline-block",
      fontSize: "15px",
      fontFamily: "Montserrat-Medium",
      color: "#666666",
      lineHeight: "22px",
    },
  },
  lableTextBox: {
    display: "inline-block",
    color: "#06374a",
    fontSize: "13px",
    fontFamily: "Montserrat-Regular",
    "& span": {
      color: "#06374a",
      fontSize: "13px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "26px",
    },
  },
  editBtnBox: {
    padding: "0px",
    minWidth: "22px",
    minHeight: "22px",
    height: "22px",
    marginLeft: "10px",
    "& span": {
      "& svg": {
        fontSize: "15px",
      },
    },
  },
  saveBtnBox: {
    padding: "0px",
    minWidth: "22px",
    minHeight: "22px",
    height: "22px",
    marginLeft: "10px",
    "& span": {
      "& svg": {
        fontSize: "15px",
      },
    },
  },
  rollSection: {
    "& .MuiTextField-root": {
      width: "155px",
    },
  },
  popupBtn: {
    padding: "0px",
    fontSize: "12px",
    textTransform: "capitalize",
    color: "#06374a",
    borderColor: "#06374a",
    fontFamily: "Montserrat-Regular",
    "&:focus": {
      outline: "0px",
    },
  },
  dialogTitle: {
    "& .MuiListItemText-primary": {
      color: "#06374a",
      fontSize: "15px",
      fontFamily: "Montserrat-Regular",
    },
  },
  tableActionIcon: {
    color: "#06374a",
  },
  width_hundPer: {
    width: "100% !important",
    boxShadow:
      "0px 1px 3px 0px rgb(142 142 142 / 20%), 0px 1px 1px 0px rgb(243 243 243 / 14%), 0px 2px 1px -1px rgb(204 204 204 / 12%)",
    borderRadius: "10px",
    padding: "16px",
  },
  subscribedTitle: {
    fontSize: "22px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "24px",
    color: "#06425C",
    //backgroundColor: '#7890A4',
    padding: "0px",
    //borderRadius: '10px',
    [theme.breakpoints.down("md")]: {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
  userSubscriptionList: {
    border: "1px solid #DBDBDB",
    padding: "15px",
    float: "left",
    width: "100%",
    borderRadius: "10px",
    backgroundColor: "#f5f6f8",
    height: "100%",
    [theme.breakpoints.down("md")]: {
      padding: "10px",
    },
  },
  moduleContentSection: {
    width: "calc(100% - 140px)",
    float: "left",
    paddingTop: "15px",
    [theme.breakpoints.down("xs")]: {
      width: "calc(100% - 85px)",
      paddingTop: "10px",
    },
  },
  moduleIconSection: {
    // padding: "24px",
    height: "120px",
    width: "120px",
    float: "left",
    display: "block",
    position: "relative",
    borderRadius: "100px",
    backgroundColor: "#ffffff",
    marginRight: "20px",
    [theme.breakpoints.down("md")]: {
      padding: "19px",
      height: "110px",
      width: "110px",
      marginRight: "15px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "13px",
      height: "72px",
      width: "72px",
      marginRight: "10px",
    },
    "& img": {
      [theme.breakpoints.down("xs")]: {
        width: "45px",
      },
    },
  },
  moduleTitle: {
    fontSize: "18px",
    fontFamily: "Montserrat-SemiBold",
    lineHeight: "26px",
    color: "#06425C",
  },
  subscriptionActionSection: {
    textAlign: "right",
    "& button": {
      marginLeft: "10px",
      [theme.breakpoints.down("md")]: {
        padding: "8px",
      },
      "& img": {
        width: "20px",
        [theme.breakpoints.down("md")]: {
          width: "18px",
        },
      },
    },
  },
  dailogBoxCustomStyle: {
    "& .MuiDialogTitle-root": {
      borderBottom: "1px solid #eeeeee",
      "& h2": {
        color: "#06425C",
        fontSize: "18px",
        fontFamily: "Montserrat-SemiBold",
        lineHeight: "22px",
      },
    },
    "& .MuiPaper-root": {
      maxWidth: "800px",
      width: "100%",
      //minWidth: '550px',
      borderRadius: "15px",
      "& .MuiDialogContent-root": {
        marginTop: "15px",
        paddingBottom: "20px",
        //borderBottom: '1px solid #eeeeee',
      },
    },
  },
  closeDialog: {
    top: "10px",
    color: "#7890A4",
    right: "10px",
    position: "absolute",
    fontSize: "38px",
    padding: "10px",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    borderRadius: "50%",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.03)",
      cursor: "pointer",
      color: "#ff7171",
    },
  },
  popSubTitle: {
    color: "#06425C",
    fontSize: "16px",
    lineHeight: "22px",
    fontFamily: "Montserrat-Medium",
    marginTop: "10px",
  },
  customCheckBoxSection: {
    marginBottom: "10px",
  },
  permissionList: {
    margin: "3px 5px 3px 0px",
  },
  actionSection: {
    marginTop: "15px",
  },
  buttonStyle: {
    color: "#ffffff !important",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
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
  custmCancelBtn: {
    color: "#06425C",
    padding: "5px 20px",
    fontSize: "16px",
    marginRight: "15px",
    textTransform: "none",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    boxShadow: "none",
    border: "1px solid #06425C",
    "&:hover": {
      backgroundColor: "#F28705",
      color: "#ffffff",
      borderColor: "#F28705",
    },
  },
  viewListBox: {
    marginBottom: "5px",
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
  customCheckBox: {
    marginBottom: "0px",
    marginLeft: "-7px !important",
    marginRight: "18px !important",
    "& > span": {
      padding: "5px",
      "&.Mui-checked": {
        color: "#06425C",
      },
    },
    "& .MuiTypography-root": {
      color: "#000000",
      fontSize: "15px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
  },
  dialogSection: {
    "& .MuiPaper-root": {
      minWidth: "350px",
    },
  },
  topMessageDilog: {
    "& h2": {
      fontSize: "30px",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "37px",
      color: "#06425C",
      paddingTop: "15px",
    },
  },
  deleteMassBox: {
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  successMessage: {
    fontSize: "20px",
    lineHeight: "24px",
    fontFamily: "Montserrat-Medium",
    color: "#737373",
    paddingBottom: "10px",
    paddingTop: "12px",
  },
  successSymbol: {
    "& svg": {
      width: "72px",
      height: "72px",
    },
  },
});

export default withRouter(
  connect()(withStyles(useStyles, { withTheme: true })(UserSubscriptions))
);
