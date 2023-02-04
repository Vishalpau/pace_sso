import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import {
  Grid,
  Typography,
  CardContent,
  Card,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { UserActions } from "../../../../user/UserActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import Page from "../../../../../components/Page";
import { getPermissions } from "../../../../../helpers";
//import UserProfile from '../../../UserProfile';

const useStyles = (theme) => ({
  inviteUserSection: {
    padding: "24px;",
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
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& .MuiPaper-root > div": {
      padding: "0px 24px",
    },
    "& table": {
      "& td": {
        wordBreak: "keep-all",
      },
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 60,
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
      },
    },
  },
  orange: {
    color: "#ffffff",
    backgroundColor: "#ff8533",
  },
  nameAvatr: {
    "& .MuiAvatar-circle": {
      display: "inline-flex",
    },
  },
  tableHead: {
    "& button:focus": {
      outline: "none !important",
    },
    "& button.MuiIconButton-root": {
      color: "#06374a",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "1px solid #06374a",
    },
    "& table": {
      "& thead": {
        "& th": {
          backgroundColor: "#06374a",
          padding: "8px 15px",
          "& button:focus": {
            outline: "none !important",
          },
          "& .MuiButton-label div": {
            color: "#ffffff",
            "& .MuiTableSortLabel-root svg": {
              color: "#ffffff !important",
            },
          },
        },
      },
      "& tbody": {
        "& td": {
          padding: "8px 15px",
        },
      },
    },
    "& .MuiInput-underline:after": {
      borderBottom: "1px solid #06374a",
    },
  },
  formBoxSection: {
    marginBottom: "40px",
  },
  custmSubmitBtn: {
    textTransform: "capitalize",
    fontFamily: "Montserrat-Medium",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: "#06374a",
      color: "#ffffff",
    },
    "& .MuiCircularProgress-root": {
      color: "#f47607",
    },
  },
  formBox: {
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#06374a",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#06374a",
    },
  },
});
const options = {
  filterType: "dropdown",
  responsive: "vertical",
  print: false,
  filter: false,
  download: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: false,
  selectableRowsHeader: false,
  selectableRowsOnClick: false,
  viewColumns: false,
  selectableRows: false,
  rowsPerPage: 10,
  page: 0,
  // customRowRender:() => {
  //         return (<Button  variant="outlined" size="medium">
  //                 Re-Invite
  //         </Button>)
  //       }
};

class InviteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      companies: [],
      applications: [],
      invites: [["Loading Data..."]],
      roles: [],
      appId: "",
      roleId: "",
      email: "",
      mobile: "",
      companyId: "",
      touched: {},
      errors: {},
      role_dropdown: true,
      useravailability: {},
      isLoading: false,
      loading: false,
      selectedreinviteId: 0,
    };
    this.action = new UserActions(this.props.dispatch);

    const { classes } = this.props;

    this.columns = [
      {
        name: "Email",
        options: {
          filter: true,
        },
      },
      {
        name: "Mobile",
        options: {
          filter: true,
        },
      },
      {
        name: "Application",
        options: {
          filter: true,
        },
      },
      {
        name: "Role",
        options: {
          filter: true,
        },
      },
      {
        name: "Status",
        options: {
          filter: true,
        },
      },
      {
        name: "Invited Date",
        options: {
          filter: true,
        },
      },
      {
        name: "Actions",
        options: {
          filter: false,
          // customBodyRender: (id) => {
          //   return (<Button  onClick={this.handleReInvite(id)} variant="outlined" size="medium" className={classes.custmSubmitBtn}>
          //           Re-Invite
          //   </Button>)
          // }
        },
      },
    ];
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getInviteList = () => {
    const user_id = localStorage.getItem("user");
    const companyId = parseInt(localStorage.getItem("companyId"));
    this.setState({ isLoading: true });
    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/" +
        user_id +
        "/" +
        companyId +
        "/invites/",
      method: "GET",
    })
      .then((res) => {
        console.log({ result: res });
        const { classes } = this.props;

        const invites_data = res.data.data.results.map((invite) => {
          return {
            Email: invite.referralEmail,
            Mobile: invite.referralPhone,
            Application: invite.application,
            Role: this.Capitalize(invite.role_name),
            Status: this.Capitalize(invite.inviteeStatus),
            "Invited Date": moment(invite.created).fromNow(),
            Actions:
              invite.inviteeStatus != "joined" ? (
                <Button
                  id={this.state.selectedreinviteId}
                  onClick={() => this.handleReInvite(invite.id)}
                  variant="outlined"
                  size="medium"
                  className={classes.custmSubmitBtn}
                >
                  Re-Invite
                  {this.state.selectedreinviteId == invite.id && (
                    <CircularProgress size={20} />
                  )}
                </Button>
              ) : (
                <Button
                  disabled={true}
                  onClick={() => this.handleReInvite(invite.id)}
                  variant="outlined"
                  size="medium"
                  className={classes.custmSubmitBtn}
                >
                  Re-Invite
                </Button>
              ),
          };
        });
        this.setState({ invites: invites_data, isLoading: false });
        console.log({ invites: this.state.invites });
      })
      .catch((err) => {
        console.log({ error: err });
        if (err.response && err.response.data.status_code == 403) {
          this.action.openSnackbar(
            "You are not authorized. Please contact your Admin",
            true
          );
          this.action.showSnackbar;
        }
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
        console.log({ user: res });

        res.data.data.results.data.companies.map((company) => {
          this.setState({ applications: company.subscriptions });
        });
        this.setState({ companies: res.data.data.results.data.companies });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount = () => {
    this.getInviteList();
  };

  formValidation = () => {
    const { email, mobile, appId, roleId } = this.state;
    let isValid = true;
    const errors = {};

    if (email == "") {
      errors.email = "Email should be specified";
      isValid = false;
    } else if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) == null) {
      errors.email = "Please enter valid Email";
      isValid = false;
    }

    if (!/^\d{10,11}$/.test(mobile) && mobile != "") {
      errors.mobile = "Please enter valid mobile number";
      isValid = false;
    }

    if (appId == "") {
      errors.appId = "Please specify the application";
      isValid = false;
    }
    if (roleId == "") {
      errors.roleId = "Please specify the role";
      isValid = false;
    }

    this.setState({ errors }, () => console.log({ errors: this.state.errors }));

    return isValid;
  };

  handleChangeCompany = (e) => {
    // const companyId=e.target.value
    this.setState({ companyId: e.target.value });
  };

  handleChangeApplication = (e) => {
    console.log({ event: e });
    this.setState({ role_dropdown: false });
    const appId = e.target.value;
    this.setState({ appId: e.target.value }, () =>
      console.log({ appId: this.state.appId })
    );

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
        console.log({ roles: res });
        this.setState({
          roles: res.data.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChangeRole = (e) => {
    this.setState({ roleId: e.target.value });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleReInvite = async (id) => {
    this.getInviteList();
    this.setState({ selectedreinviteId: id });
    const user_id = localStorage.getItem("user");
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/' + user_id + '/reinvite/' + id + '/',
      method: 'GET',
    }).then((res) => {
      this.getInviteList();
      setTimeout(() => {
        this.setState({ selectedreinviteId: 0 });
        this.action.openSnackbar('User has been re-invited succesfully')
        this.action.showSnackbar
      }, 1000);
    }).catch((err) => {
      console.log(err)
      this.getInviteList();
      setTimeout(() => {
        this.setState({ selectedreinviteId: 0 });
        this.action.openSnackbar('Something went wrong, please try again later.', true)
        this.action.showSnackbar
      }, 1000);
    });
  };



  handleTouch = (e) => {
    let { touched } = this.state;
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched }, () =>
        console.log({ touched: this.state.touched })
      );
    }
  };

  handleAddSubscriptions = (userId, input) => {
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

        this.action.openSnackbar("User has been invited succesfully");
        this.action.showSnackbar;
        this.handleClose();
        this.getInviteList();
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
  };

  handleInvite = () => {
    const isValid = this.formValidation();
    if (isValid) {
      this.setState({ loading: true });
      axios({
        url: process.env.API_URL + process.env.API_VERSION + "/user/get-user/",
        method: "GET",
        params: {
          username: this.state.email,
        },
      })
        .then((res) => {
          console.log({ result_invite: res });
          console.log(res.data.data.results.userId);
          if (res.data.data.results.useravailable) {
            const input = new FormData();
            const appId = this.state.appId;
            const userId = res.data.data.results.userId;
            const companyId = localStorage.getItem("companyId");

            // console.log({roleId:this.state.roleId})
            input.append("fkCompanyId", companyId);
            input.append("fkAppId", appId);
            input.append("fkGroupId", this.state.roleId);
            input.append("active", true);
            //added for subscribe Accounts application from here
            input.append("action", "invite_user");

            this.handleAddSubscriptions(userId, input);
            this.getInviteList();
          }
        })
        .catch((err) => {
          console.log({ err: err });
          if ("useravailable" in err.response.data.error) {
            if (!err.response.data.error["useravailable"]) {
              const user_id = localStorage.getItem("user");
              const fkCompanyId = localStorage.getItem("companyId");
              const input = new FormData();

              input.append("fkAppId", this.state.appId);
              input.append("fkGroupId", this.state.roleId);
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
                  console.log({ result: res });
                  this.setState({ loading: false });
                  this.action.openSnackbar("User has been invited succesfully");
                  this.action.showSnackbar;
                  this.setState({ email: "" });
                  this.setState({ mobile: "" });
                  this.setState({ appId: "" });
                  this.setState({ roleId: "" });
                  this.getInviteList();
                })
                .catch((err) => {
                  //alert('error');
                  console.log({ err: err });
                  this.setState({ loading: false });
                  if (err.response && err.response.status == 400) {
                    this.action.openSnackbar(
                      err.response.data.data.results,
                      true
                    );
                    this.action.showSnackbar;
                  } else if (
                    err.response &&
                    err.response.data.status_code == 403
                  ) {
                    this.action.openSnackbar(
                      "You are not authorized. Please contact your Admin",
                      true
                    );
                    this.action.showSnackbar;
                  } else {
                    this.action.openSnackbar(
                      "Something went wrong, please try again later.",
                      true
                    );
                    this.action.showSnackbar;
                  }
                });
            } else {
              const userId = err.response.data.error["userId"];
              const input = new FormData();
              const appId = this.state.appId;
              // const userId=res.data.data.results.userId
              const companyId = localStorage.getItem("companyId");

              // console.log({roleId:this.state.roleId})
              input.append("fkCompanyId", companyId);
              input.append("fkAppId", appId);
              input.append("fkGroupId", this.state.roleId);
              input.append("active", true);

              this.handleAddSubscriptions(userId, input);
              this.getInviteList();
            }
          }
        });
    }
    // console.log({available:this.state.useravailability})
    else {
      this.setState({
        touched: {
          email: true,
          mobile: true,
          appId: true,
          roleId: true,
        },
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { touched, errors } = this.state;
    console.log({ applications: this.state.applications });

    return (
      <Fragment>
        <Page title="Invites">
          <div className={classes.inviteUserSection}>
            <Grid item md={12} xs={12} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">
                Invite User
              </Typography>
            </Grid>
            <Card className={classes.formBoxSection}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Email"
                      margin="dense"
                      name="email"
                      id="email"
                      type="text"
                      helperText={
                        touched.email && Boolean(errors.email)
                          ? errors.email
                          : ""
                      }
                      onChange={(event) => {
                        this.handleChange(event);
                        this.formValidation();
                      }}
                      error={touched.email && Boolean(errors.email)}
                      onBlur={(e) => {
                        this.handleTouch(e);
                        this.formValidation();
                      }}
                      fullWidth
                      value={this.state.email}
                      variant="outlined"
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Mobile"
                      margin="dense"
                      name="mobile"
                      id="mobile"
                      helperText={
                        touched.mobile && Boolean(errors.mobile)
                          ? errors.mobile
                          : ""
                      }
                      onBlur={(e) => {
                        this.handleTouch(e);
                        this.formValidation();
                      }}
                      error={touched.mobile && Boolean(errors.mobile)}
                      onChange={(event) => {
                        this.handleChange(event);
                        this.formValidation();
                      }}
                      fullWidth
                      value={this.state.mobile}
                      variant="outlined"
                      className={classes.formControl}
                    />
                  </Grid>
                  {/* <Grid
                  item
                  md={6}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                    label="Company"
                    margin="dense"
                    name="companies"
                    id="Company"
                    onChange={(e)=>{this.handleChangeCompany(e)}}
                    select
                    fullWidth
                    value={this.state.companyId}
                    variant="outlined"
                  >
                    {this.state.companies.map((company) => (
                      <MenuItem key={company.companyId} value={company.companyId}>
                        {company.companyName}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                </Grid> */}
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Application"
                      margin="dense"
                      name="appId"
                      id="appId"
                      helperText={
                        touched.appId && Boolean(errors.appId)
                          ? errors.appId
                          : ""
                      }
                      error={touched.appId && Boolean(errors.appId)}
                      onBlur={(e) => {
                        this.handleTouch(e);
                        this.formValidation();
                      }}
                      onChange={(e) => {
                        this.handleChangeApplication(e);
                        this.formValidation();
                      }}
                      select
                      fullWidth
                      value={this.state.appId}
                      variant="outlined"
                    >
                      {this.state.applications
                        .filter(
                          (application) => application.appCode != "accounts"
                        )
                        .map((application) => (
                          <MenuItem
                            key={application.appId}
                            value={application.appId}
                          >
                            {application.appName}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.formBox}>
                    <TextField
                      label="Role"
                      margin="dense"
                      name="roleId"
                      id="roleId"
                      disabled={this.state.role_dropdown}
                      helperText={
                        touched.roleId && Boolean(errors.roleId)
                          ? errors.roleId
                          : ""
                      }
                      error={touched.roleId && Boolean(errors.roleId)}
                      onBlur={(e) => {
                        this.handleTouch(e);
                        this.formValidation();
                      }}
                      onChange={(e) => {
                        this.handleChangeRole(e);
                        this.formValidation();
                      }}
                      select
                      fullWidth
                      value={this.state.roleId}
                      variant="outlined"
                    >
                      {this.state.roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <br></br>
                <Grid item md={6} xs={12}>
                  <Button
                    disabled={getPermissions("user.add_userinvites")}
                    onClick={this.handleInvite}
                    variant="outlined"
                    size="medium"
                    className={classes.custmSubmitBtn}
                  >
                    Invite User
                    {this.state.loading && <CircularProgress size={20} />}
                  </Button>
                </Grid>
              </CardContent>
            </Card>

            <Grid item md={12} xs={12} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">
                Invite Users
              </Typography>
            </Grid>
            <Grid item md={12} xs={12} className={classes.table}>
              <Typography variant="h6">
                {this.state.isLoading && (
                  <CircularProgress
                    size={40}
                    style={{
                      position: "absolute",
                      top: "80%",
                      left: "50%",
                      zIndex: "101",
                    }}
                  />
                )}
              </Typography>
              <MUIDataTable
                className={classes.tableHead}
                data={this.state.invites}
                columns={this.columns}
                options={options}
              />
            </Grid>
          </div>
        </Page>
      </Fragment>
    );
  }
}

InviteList.propTypes = {
  classes: PropTypes.object.isRequired,
};

// InviteList.propTypes = {
//   className: PropTypes.string,
//   // addresses: PropTypes.array.isRequired
// };

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(mapDispatchToProps)(
    withStyles(useStyles, { withTheme: true })(InviteList)
  )
);
