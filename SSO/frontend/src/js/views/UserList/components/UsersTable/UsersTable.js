import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import { debounceSearchRender } from "mui-datatables";
import {
  Grid,
  Typography,
  Link,
  TextField,
  List,
  ListItem,
  ListItemText,
  CloseIcon,
  Menu,
  MenuItem,
  CircularProgress,
  ListItemAvatar,
  Divider,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  FormLabel,
  FormGroup,
  Avatar,
} from "@material-ui/core";
import { withRouter } from "react-router";
import { UserActions } from "../../../../user/UserActions";
import { connect } from "react-redux";
import moment from "moment";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Page from "../../../../../components/Page";
import { getPermissions } from "../../../../../helpers";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tooltip from "@material-ui/core/Tooltip";
import PersonIcon from "@material-ui/icons/Person";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import SettingsIcon from "@material-ui/icons/Settings";
import VisibilityIcon from "@material-ui/icons/Visibility";
import dateFormat from "../../../../../helpers/dateFormat";
import debounce from "lodash.debounce";
import inactive from "../../../../../../public/static/images/inactive.svg";
import active from "../../../../../../public/static/images/active.svg";
import success_72x72 from "../../../../../../public/static/images/success-72x72.svg";
import Close from "@material-ui/icons/Close";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
  DateTimePicker,
} from "@material-ui/pickers";

class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
    this.state = {
      users: [["Loading Data..."]],
      openPerm: false,
      applications: [],
      user: {},
      permissions: [],
      roleName: "",
      rowsPerPage: 10,
      isLoading: false,
      page: 0,
      count: 0,
      totalUsersCount: 0,
      anchorEl: null,
      deleteAddress: false,
      clickedEye: false,
      dialogStatus: "",
      searchText: "",
      sortOrder: "",
      userName: "",
      mobileAppDetails: false,
      activUsersCount: 0,
      appUsersCount: 0,
      iOSPlatform: [],
      androidPlatform: [],
      clickedPlatform: "",
      activeTab: 0,
      status: "",
      last_login: "",
      UnsubscribedUsersCount: 0,
      filter_status: "",
      filter_last_login: "",
      statusFilterOptions: "",
    };
  }

  handleAction = (id, name, companies, avatar) => {
    // // console.log({ companies: companies });

    localStorage.setItem("user_apps", JSON.stringify(companies));
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_id", id);
    localStorage.setItem("user_avatar", avatar);

    this.props.history.push({
      pathname: "/usersubscriptions",
      user_apps: companies,
      user_name: name,
      user_id: id,
      user_avatar: avatar,
    });
  };

  openPermission = async (user_id) => {
    this.setState({ roleName: "", permissions: [] });

    let data = await axios
      .get(
        process.env.API_URL + process.env.API_VERSION + "/user/" + user_id + "/"
      )
      .then(function (res) {
        // // console.log({ user: res });
        return res.data.data.results;
      })
      .catch(function (error) {
        // // console.log(error);
      });

    this.setState({ user: data });
    // alert(user_id)
    // // console.log({ userstate: this.state.user });

    // console.log({ perm: this.state.openPerm });
    this.setState({ openPerm: true });
    // console.log({ perm: this.state.openPerm });
  };

  handleChangeApplication = async (e) => {
    const appId = e.target.value;
    // alert(appId)
    // console.log({ userinapp: this.state.user.companies });

    let roles = [];
    this.state.user.companies.map((company) =>
      // // console.log({code_in:module})

      {
        roles = [...roles];
        if (company.companyId == localStorage.getItem("companyId")) {
          // console.log(company);
          company.subscriptions.map((app) => {
            // console.log(app.appId);
            if (app.appId == appId) {
              // console.log(app.roles[0]);
              roles.push(app.roles);
            }
          });
        }

        // this.setState({ codes: codes })
      }
    );
    const aclUrl = roles[0][0]["aclUrl"];

    const roleName = roles[0][0]["name"];
    await this.setState({ roleName: roleName });
    // console.log({ roleNaames: this.state.roleName });
    let data = await axios
      .get(process.env.ACL_BASE_URL + aclUrl)
      .then(function (res) {
        // console.log({ permissions: res.data.data.results.permissions });
        return res.data.data.results.permissions;
      })
      .catch(function (error) {
        // console.log(error);
      });
    this.setState({ permissions: data[0] });
    // console.log({ permissions123: this.state.permissions });
  };

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handleClose = () => {
    this.setState({ openPerm: !this.state.openPerm });
  };

  componentDidMount() {
    this.handlePageDataRequest(
      this.state.page,
      this.state.rowsPerPage,
      this.state.sortOrder,
      this.state.searchText,
      "total"
    );
  }
  handleClick = (event) => this.setState({ anchorEl: event.currentTarget });
  handleClose = () => this.setState({ anchorEl: null });

  activeInactiveHandler = async (status, email, activeView) => {
    const companyId = JSON.parse(localStorage.getItem("companyId"));
    const user = JSON.parse(localStorage.getItem("user"));
    if (status === true) {
      const res = await axios
        .put(
          process.env.API_URL +
            process.env.API_VERSION +
            `/user/${user}/${companyId}/profile/`,
          { status: false, email: email }
        )
        .then((res) => {
          if (res) {
            this.changePage(
              this.state.page,
              this.state.rowsPerPage,
              this.state.sortOrder,
              this.state.searchText,
              this.state.status,
              this.state.last_login
            );
            // this.handlePageDataRequest(
            //   this.state.page,
            //   this.state.rowsPerPage,
            //   this.state.sortOrder,
            //   this.state.searchText,
            //   activeView === 0
            //     ? "total"
            //     : activeView === 1
            //       ? "active"
            //       : activeView === 2
            //         ? "mobile"
            //         : activeView === 3
            //           ? "unsub"
            //           : ""
            // );
            // console.log(res.data.data.results, "res.data.data.results");
            if (res.data.data.results.status === false) {
              this.setState({
                userName: res.data.data.results.name,
                dialogStatus: "is Inactivated",
              });
            }
            this.setState({ clickedEye: true });
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    } else {
      const res = await axios
        .put(
          process.env.API_URL +
            process.env.API_VERSION +
            `/user/${user}/${companyId}/profile/`,
          { status: true, email: email }
        )
        .then((res) => {
          if (res) {
            this.changePage(
              this.state.page,
              this.state.rowsPerPage,
              this.state.sortOrder,
              this.state.searchText,
              this.state.status,
              this.state.last_login
            );
            // this.handlePageDataRequest(
            //   this.state.page,
            //   this.state.rowsPerPage,
            //   this.state.sortOrder,
            //   this.state.searchText
            // );
            // console.log(res.data.data.results, "res.data.data.results");
            if (res.data.data.results.status === true) {
              this.setState({
                userName: res.data.data.results.name,
                dialogStatus: "is Activated",
              });
            }
            this.setState({ clickedEye: true });
          }
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  handleCloseDelete = () => {
    this.setState({ deleteAddress: false, clickedEye: false });
    searchTextcomst;
  };

  handlePageDataRequest = (
    page,
    rowsPerPage,
    sortOrder,
    searchText,
    viewName,
    statusFilter = "",
    last_login = ""
  ) => {
    const { classes } = this.props;
    const companyId = localStorage.getItem("companyId");
    const activeFilter = localStorage.getItem("activeFilter");
    this.setState({
      isLoading: true,
      // searchOpen: false,
      filter_last_login: [],
      filter_status: [],
      last_login: "",
      status: "",
      // searchText: "",
      page: 0,
    });

    let payload = {};
    page = 0;
    statusFilter = "";

    if (viewName === "unsub" || activeFilter === "3") {
      this.setState({ statusFilterOptions: ["Active", "Inactive"] });
      payload = {
        page: page,
        limit: rowsPerPage,
        start: page * rowsPerPage,
        searchText: this.state.searchText,
        columnName: sortOrder["name"],
        columnOrder: sortOrder["direction"],
        type: "unsub",
        status: statusFilter,
        last_login: last_login,
      };
      this.setState({ activeTab: 3 });
    } else if (viewName === "mobile" || activeFilter === "2") {
      this.setState({ statusFilterOptions: ["Active", "Inactive"] });
      payload = {
        page: page,
        limit: rowsPerPage,
        start: page * rowsPerPage,
        searchText: this.state.searchText,
        columnName: sortOrder["name"],
        columnOrder: sortOrder["direction"],
        appUser: 1,
        status: statusFilter,
        last_login: last_login,
      };
      this.setState({ activeTab: 2 });
    } else if (viewName === "active" || activeFilter === "1") {
      this.setState({ statusFilterOptions: ["Active"] });
      payload = {
        page: page,
        limit: rowsPerPage,
        start: page * rowsPerPage,
        searchText: this.state.searchText,
        columnName: sortOrder["name"],
        columnOrder: sortOrder["direction"],
        status: true,
        last_login: last_login,
      };
      this.setState({ activeTab: 1 });
    } else if (activeFilter === "0" || activeFilter === null) {
      this.setState({ statusFilterOptions: ["Active", "Inactive"] });
      payload = {
        page: page,
        limit: rowsPerPage,
        start: page * rowsPerPage,
        searchText: this.state.searchText,
        columnName: sortOrder["name"],
        columnOrder: sortOrder["direction"],
        status: statusFilter,
        last_login: last_login,
      };
      this.setState({ activeTab: 0 });
    }

    // const payload = {
    //   page: page,
    //   limit: rowsPerPage,
    //   start: page * rowsPerPage,
    //   searchText: searchText,
    //   columnName: sortOrder["name"],
    //   columnOrder: sortOrder["direction"],
    // };

    axios({
      //url: process.env.API_URL + process.env.API_VERSION + '/user/userList/'+companyId+'/?limit='+limit+'&start='+page,
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/user/userList/" +
        companyId +
        "/",
      method: "POST",
      data: payload, // you are sending body instead
      headers: {
        // 'Authorization': `bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log({ result: res.data.data.results }, "usertable map");
        // console.log({ meta: res.data.data.metadata });
        const user_data = res.data.data.results.map((user) => {
          let department = "NA";
          if (user.companies.length > 0) {
            user.companies.map((company) => {
              if (company.companyId == companyId) {
                if (company.departments.length > 0) {
                  // department = company.departments[0].departmentName;
                  var arrayLength = company.departments.length;
                  department = "";
                  for (var i = 0; i < arrayLength; i++) {
                    department =
                      department + company.departments[i].departmentName + ", ";
                  }
                  department = department.replace(/,\s*$/, "");
                }
              }
            });
          }
          // console.log(user, "user table");
          const { anchorEl } = this.state;

          if (this.state.clickedEye === true) {
            this.setState({ deleteAddress: true });
          }
          let checkIos = [],
            checkAndroid = [],
            notAny = false;
          if (user.devices) {
            checkIos = user.devices.filter((one) => one.platform === "iOS");
            checkAndroid = user.devices.filter(
              (one) => one.platform === "Android"
            );
          } else {
            notAny = true;
          }
          return {
            "": (
              <>
                {user.avatar !== null ? (
                  <Avatar
                    style={{ border: "1px solid rgb(179, 179, 179)" }}
                    src={user.avatar}
                  />
                ) : (
                  <Avatar
                    style={{ border: "1px solid rgb(179, 179, 179)" }}
                    // src="https://picsum.photos/20/30"
                    alt={user.name}
                  />
                )}
              </>
            ),
            Name: this.Capitalize(user.name),
            Email: user.email,
            Mobile: user.mobile,
            AppStatus: (
              <>
                <Tooltip
                  title="Android APP"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    disabled={notAny || checkAndroid.length === 0}
                    className={classes.dataTableAppIconAndroBTN}
                    aria-label="edit"
                    onClick={this.handleMobileAppDetails.bind(this, [
                      user.devices,
                      "android",
                    ])}
                  >
                    <img
                      src="https://media.pace-os.com/icons/Mobile/android-24x24.svg"
                      alt="Mobile App"
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip
                  title="IOS APP"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    disabled={notAny || checkIos.length === 0}
                    className={classes.dataTableAppIconIosBTN}
                    aria-label="edit"
                    onClick={this.handleMobileAppDetails.bind(this, [
                      user.devices,
                      "ios",
                    ])}
                  >
                    <img
                      src="https://media.pace-os.com/icons/Mobile/ios-24x24.svg"
                      alt="Mobile App"
                    />
                  </IconButton>
                </Tooltip>
              </>
            ),
            Department: user.department || department,
            "Last Login": user.last_login ? dateFormat(user.last_login) : "-",
            Status:
              user.status === true ? (
                <span style={{ color: "#009908", fontWeight: 500 }}>
                  Active
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: 500 }}>Inactive</span>
              ),
            Actions: (
              <>
                <Tooltip
                  title="Edit Permissions"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    disabled={getPermissions(
                      "applications.change_userappaccess"
                    )}
                    className={classes.dataTableActionBtn}
                    aria-label="edit"
                    onClick={() =>
                      this.handleAction(
                        user.id,
                        user.name,
                        user.companies,
                        user.avatar
                      )
                    }
                  >
                    {/* <EditIcon /> */}
                    <SettingsIcon />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip
                  title="Permission"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    edge="add"
                    aria-label="plush"
                    onClick={() => this.openPermission(user.id)}
                    className={classes.dataTableActionBtn}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip> */}
                <Tooltip
                  title="Update profile"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    className={classes.dataTableActionBtn}
                    aria-label="edit"
                    href="/user/user-profile"
                    onClick={() => {
                      localStorage.setItem("userClicked", JSON.stringify(user));
                      localStorage.setItem(
                        "activeFilter",
                        this.state.activeTab
                      );
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={user.status === false ? "Activate" : "Inactivate"}
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    className={classes.dataTableActionBtn}
                    aria-label="edit"
                    onClick={() => {
                      this.activeInactiveHandler(
                        user.status,
                        user.email,
                        this.state.activeTab
                      );
                    }}
                  >
                    {user.status === false ? (
                      <>
                        <img src={inactive} width={15} alt="inactive icon" />
                      </>
                    ) : (
                      <img src={active} width={15} alt="active icon" />
                    )}
                  </IconButton>
                </Tooltip>
                {/* <Tooltip
                  title="Subscriptions"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    className={classes.dataTableActionBtn}
                    aria-label="subscriptions"
                    href="/usersubscriptions"
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip> */}
                {/* <Tooltip
                title="Active"
                arrow
                classes={{
                  tooltip: classes.customTooltip,
                  arrow: classes.customArrow,
                }}
              >
                <IconButton className={classes.dataTableActionBtn} aria-label="edit">
                  <VisibilityIcon />
                </IconButton>
              </Tooltip> */}
              </>
            ),
          };
        });
        // console.log({ user_data: user_data }, "user_data");
        // setTimeout(() => {
        //   this.setState({
        //     users: user_data,
        //     isLoading: false,
        //     count: res.data.data.metadata.count,
        //   });
        // }, 1000);
        this.setState({
          users: user_data,
          isLoading: false,
          count: res.data.data.metadata.count,
          totalUsersCount: res.data.data.metadata.totalUsersCount,
          appUsersCount: res.data.data.metadata.appUsersCount,
          activUsersCount: res.data.data.metadata.activUsersCount,
          UnsubscribedUsersCount: res.data.data.metadata.UnsubscribedUsersCount,
        });

        localStorage.removeItem("activeFilter");
      })
      .catch((err) => {
        // console.log({ error: err });
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
        // console.log({ user: res });

        res.data.data.results.data.companies.map((company) => {
          this.setState({ applications: company.subscriptions });
        });
        this.setState({ companies: res.data.data.results.data.companies });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  changePage = debounce(
    (page, rowsPerPage, sortOrder, searchText, statusFilter, last_login) => {
      const { classes } = this.props;
      const companyId = localStorage.getItem("companyId");
      this.setState({ users: [["Loading Data..."]], isLoading: true });
      let payload = {};
      if (this.state.activeTab === 0) {
        payload = {
          page: page,
          limit: rowsPerPage,
          start: page * rowsPerPage,
          searchText: searchText,
          columnName: sortOrder["name"],
          columnOrder: sortOrder["direction"],
          status: statusFilter,
          last_login: last_login,
        };
      } else if (this.state.activeTab === 2) {
        payload = {
          page: page,
          limit: rowsPerPage,
          start: page * rowsPerPage,
          searchText: searchText,
          columnName: sortOrder["name"],
          columnOrder: sortOrder["direction"],
          appUser: 1,
          status: statusFilter,
          last_login: last_login,
        };
      } else if (this.state.activeTab === 1) {
        payload = {
          page: page,
          limit: rowsPerPage,
          start: page * rowsPerPage,
          searchText: searchText,
          columnName: sortOrder["name"],
          columnOrder: sortOrder["direction"],
          status: true,
          last_login: last_login,
        };
      } else if (this.state.activeTab === 3) {
        payload = {
          page: page,
          limit: rowsPerPage,
          start: page * rowsPerPage,
          searchText: searchText,
          columnName: sortOrder["name"],
          columnOrder: sortOrder["direction"],
          type: "unsub",
          status: statusFilter,
          last_login: last_login,
        };
      }

      axios({
        //url: process.env.API_URL + process.env.API_VERSION + '/user/userList/'+companyId+'/?page='+page+'&limit='+rowsPerPage+'&start='+page * rowsPerPage,
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/userList/" +
          companyId +
          "/",
        method: "POST",
        data: payload, // you are sending body instead
        headers: {
          // 'Authorization': `bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // console.log({ result: res.data.data.results });

          const user_data = res.data.data.results.map((user) => {
            let department = "NA";
            if (user.companies.length > 0) {
              user.companies.map((company) => {
                if (company.companyId == companyId) {
                  if (company.departments.length > 0) {
                    // department = company.departments[0].departmentName;
                    var arrayLength = company.departments.length;
                    department = "";
                    for (var i = 0; i < arrayLength; i++) {
                      department =
                        department +
                        company.departments[i].departmentName +
                        ", ";
                    }
                    department = department.replace(/,\s*$/, "");
                  }
                }
              });
            }
            // console.log(department);
            const { anchorEl } = this.state;

            if (this.state.clickedEye === true) {
              this.setState({ deleteAddress: true });
            }

            let checkIos = [],
              checkAndroid = [],
              notAny = false;
            if (user.devices) {
              checkIos = user.devices.filter((one) => one.platform === "iOS");
              checkAndroid = user.devices.filter(
                (one) => one.platform === "Android"
              );
            } else {
              notAny = true;
            }
            return {
              "": (
                <>
                  {user.avatar !== null ? (
                    <Avatar
                      style={{ border: "1px solid rgb(179, 179, 179)" }}
                      src={user.avatar}
                    />
                  ) : (
                    <Avatar
                      style={{ border: "1px solid rgb(179, 179, 179)" }}
                      alt={user.name}
                    />
                  )}
                </>
              ),
              Name: this.Capitalize(user.name),
              Email: user.email,
              Mobile: user.mobile,
              AppStatus: (
                <>
                  <Tooltip
                    title="Android APP"
                    arrow
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                  >
                    <IconButton
                      disabled={notAny || checkAndroid.length === 0}
                      className={classes.dataTableAppIconAndroBTN}
                      aria-label="edit"
                      onClick={this.handleMobileAppDetails.bind(this, [
                        user.devices,
                        "android",
                      ])}
                    >
                      <img
                        src="https://media.pace-os.com/icons/Mobile/android-24x24.svg"
                        alt="Mobile App"
                      />
                    </IconButton>
                  </Tooltip>

                  <Tooltip
                    title="IOS APP"
                    arrow
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                  >
                    <IconButton
                      disabled={notAny || checkIos.length === 0}
                      className={classes.dataTableAppIconIosBTN}
                      aria-label="edit"
                      onClick={this.handleMobileAppDetails.bind(this, [
                        user.devices,
                        "ios",
                      ])}
                    >
                      <img
                        src="https://media.pace-os.com/icons/Mobile/ios-24x24.svg"
                        alt="Mobile App"
                      />
                    </IconButton>
                  </Tooltip>
                </>
              ),
              Department: department,
              "Last Login": user.last_login ? dateFormat(user.last_login) : "-",
              Status:
                user.status === true ? (
                  <span style={{ color: "#009908", fontWeight: 500 }}>
                    Active
                  </span>
                ) : (
                  <span style={{ color: "red", fontWeight: 500 }}>
                    Inactive
                  </span>
                ),
              Actions: (
                <>
                  <Tooltip
                    title="Edit Permissions"
                    arrow
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                  >
                    <IconButton
                      disabled={getPermissions(
                        "applications.change_userappaccess"
                      )}
                      className={classes.dataTableActionBtn}
                      aria-label="edit"
                      onClick={() =>
                        this.handleAction(
                          user.id,
                          user.name,
                          user.companies,
                          user.avatar
                        )
                      }
                    >
                      {/* <EditIcon /> */}
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip
                  title="Permission"
                  arrow
                  classes={{
                    tooltip: classes.customTooltip,
                    arrow: classes.customArrow,
                  }}
                >
                  <IconButton
                    edge="add"
                    aria-label="plush"
                    onClick={() => this.openPermission(user.id)}
                    className={classes.dataTableActionBtn}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Tooltip> */}
                  <Tooltip
                    title="Update profile"
                    arrow
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                  >
                    <IconButton
                      className={classes.dataTableActionBtn}
                      aria-label="edit"
                      href="/user/user-profile"
                      onClick={() => {
                        localStorage.setItem(
                          "userClicked",
                          JSON.stringify(user)
                        );
                        localStorage.setItem(
                          "activeFilter",
                          this.state.activeTab
                        );
                      }}
                    >
                      <PersonIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={user.status === false ? "Activate" : "Inactivate"}
                    arrow
                    classes={{
                      tooltip: classes.customTooltip,
                      arrow: classes.customArrow,
                    }}
                  >
                    <IconButton
                      className={classes.dataTableActionBtn}
                      aria-label="edit"
                      onClick={() => {
                        this.activeInactiveHandler(
                          user.status,
                          user.email,
                          this.state.activeTab
                        );
                      }}
                    >
                      {user.status === false ? (
                        // <VisibilityOffIcon />
                        <img src={inactive} alt="inactive icon" />
                      ) : (
                        // <VisibilityIcon />
                        <img src={active} alt="active icon" />
                      )}
                    </IconButton>
                  </Tooltip>
                  {/* <Tooltip
                title="Active"
                arrow
                classes={{
                  tooltip: classes.customTooltip,
                  arrow: classes.customArrow,
                }}
              >
                <IconButton className={classes.dataTableActionBtn} aria-label="edit">
                  <VisibilityIcon />
                </IconButton>
              </Tooltip> */}
                </>
              ),
            };
          });

          // console.log({ user_data: user_data });

          this.setState({
            users: user_data,
            isLoading: false,
            rowsPerPage: rowsPerPage,
            count: res.data.data.metadata.count,
            searchText: searchText,
            sortOrder: sortOrder,
            page: page,
            totalUsersCount: res.data.data.metadata.totalUsersCount,
            appUsersCount: res.data.data.metadata.appUsersCount,
            activUsersCount: res.data.data.metadata.activUsersCount,
            status: statusFilter,
            last_login: last_login,
          });
        })
        .catch((err) => {
          // console.log({ error: err });
        });
    },
    500
  );

  handleClosemobileAppDetails = () => {
    this.setState({ mobileAppDetails: false });
  };

  handleMobileAppDetails = (args) => {
    this.setState({ mobileAppDetails: true });
    // // console.log(args, "app status args");
    this.setState({ clickedPlatform: args[1] });
    let tempIos = [];
    let tempAndroid = [];
    args[0].forEach((element) => {
      if (element.platform.toLowerCase() === "ios") {
        tempIos.push(element);
      } else if (element.platform.toLowerCase() === "android") {
        tempAndroid.push(element);
      }
    });
    // console.log(tempAndroid, tempIos, "Platforms");
    this.setState({ iOSPlatform: tempIos, androidPlatform: tempAndroid });
  };

  render() {
    this.columns = [
      {
        name: "",
        options: {
          filter: false,
          setCellProps: () => ({
            style: { minWidth: "0px", maxWidth: "10px", width: "10px" },
          }),
        },
      },
      {
        name: "Name",
        options: {
          filter: false,
          sort: true,
          searchText: this.state.searchText,
        },
      },
      {
        name: "Email",
        options: {
          filter: false,
          sort: true,
          searchText: this.state.searchText,
        },
      },
      {
        name: "Mobile",
        options: {
          filter: false,
          sort: true,
          searchText: this.state.searchText,
        },
      },
      {
        name: "AppStatus",
        label: "Device",
        options: {
          filter: false,
          sort: false,
        },
      },
      {
        name: "Department",
        options: {
          filter: false,
          sort: false,
          searchText: this.state.searchText,
        },
      },
      {
        name: "Last Login",
        options: {
          filter: true,
          filterType: "custom",
          filterOptions: {
            display: (filterList, onChange, index, column) => (
              <div>
                <FormGroup row>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      label="Last Login"
                      format="yyyy-MM-dd"
                      value={filterList[index][0]}
                      InputProps={{ readOnly: true }}
                      onChange={(e) => {
                        console.log(e, "value");
                        filterList[index][0] = moment(e).format("DD-MMM-YYYY");
                        onChange(filterList[index], index, column);
                      }}
                      maxDate={new Date()}
                    />
                  </MuiPickersUtilsProvider>
                </FormGroup>
              </div>
            ),
          },
          filterList: this.state.filter_last_login,
          sort: true,
        },
      },
      {
        name: "Status",
        options: {
          filter: true,
          filterType: "dropdown",
          sort: false,
          filterOptions: this.state.statusFilterOptions,
          filterList: this.state.filter_status,
          // filterOptions: {
          //   display: (filterList, onChange, index, column) => {
          //     return (
          //       <FormControl>
          //         <InputLabel htmlFor="select-multiple-chip">
          //           Location
          //         </InputLabel>
          //         <Select
          //           value={filterList[index]}
          //           renderValue={(selected) => selected.join(", ")}
          //           onChange={(event) => {
          //             filterList[index] = event.target.value;
          //             onChange(filterList[index], index, column);
          //           }}
          //         >
          //           <MenuItem value="Active">Active</MenuItem>
          //           <MenuItem value="Inactive">Inactive</MenuItem>
          //           <MenuItem value="Unsubscribed">Unsubscribed</MenuItem>
          //         </Select>
          //       </FormControl>
          //     );
          //   },
          // },
        },
      },

      {
        name: "Actions",
        options: {
          filter: false,
          sort: false,
        },
      },
    ];
    const options = {
      responsive: "vertical",
      //responsive: 'horizontal',
      print: false,
      //hover: false,
      filter: true,
      download: false,
      selectableRowsHideCheckboxes: false,
      selectableRowsHeader: false,
      selectableRowsOnClick: false,
      viewColumns: false,
      selectableRows: false,
      rowsPerPage: this.state.rowsPerPage,
      page: this.state.page,
      serverSide: true,
      pagination: true,
      // searchText: this.state.searchText,
      customSearchRender: debounceSearchRender(500),
      count: this.state.count,
      rowsPerPageOptions: [10, 15, 20],
      onTableChange: (action, tableState) => {
        // a developer could react to change on an action basis or
        // examine the state as a whole and do whatever they want
        // console.log({ "action:": action });
        // console.log({ "tableState:": tableState });
        switch (action) {
          case "changePage":
            this.changePage(
              tableState.page,
              tableState.rowsPerPage,
              tableState.sortOrder,
              tableState.searchText,
              this.state.status,
              this.state.last_login
            );
            break;
          case "changeRowsPerPage":
            this.changePage(
              tableState.page,
              tableState.rowsPerPage,
              tableState.sortOrder,
              tableState.searchText,
              this.state.status,
              this.state.last_login
            );
            break;
          case "search":
            this.changePage(
              tableState.page,
              tableState.rowsPerPage,
              tableState.sortOrder,
              tableState.searchText,
              this.state.status,
              this.state.last_login
            );

            break;
          case "sort":
            this.changePage(
              tableState.page,
              tableState.rowsPerPage,
              tableState.sortOrder,
              tableState.searchText,
              this.state.status,
              this.state.last_login
            );
            break;
          // case 'onSearchClose':
          //   this.changePage(tableState.page, tableState.rowsPerPage, null,null);
          // break;
          default:
          // console.log("action not handled.");
        }
      },
      onFilterChange: (columnChanged, filterList, type) => {
        // console.log(`onFilterChange columnChanged: ${columnChanged}`);
        console.log(`filterList:, ${filterList}`);
        if (type !== "reset") {
          if (columnChanged == "Status") {
            if (filterList[7] == "Active") {
              this.state.status = true;
            } else if (filterList[7] == "Inactive") {
              this.state.status = false;
            } else {
              this.state.status = "";
            }
            this.setState({ filter_status: filterList[7] });
            this.changePage(
              this.state.page,
              this.state.rowsPerPage,
              this.state.sortOrder,
              this.state.searchText,
              this.state.status,
              this.state.last_login
            );
          } else {
            this.state.last_login = String(filterList[6]);
            this.setState({ filter_last_login: filterList[6] });
            this.changePage(
              this.state.page,
              this.state.rowsPerPage,
              this.state.sortOrder,
              this.state.searchText,
              this.state.status,
              this.state.last_login
            );
          }
        } else {
          setTimeout(() => {
            this.setState(
              {
                isLoading: false,
                filter_last_login: [],
                filter_status: [],
                last_login: "",
                status: "",
                page: 0,
              },
              function () {
                // console.log(this.state.last_login, 'last_login');
                this.changePage(
                  this.state.page,
                  this.state.rowsPerPage,
                  this.state.sortOrder,
                  this.state.searchText,
                  this.state.status,
                  this.state.last_login
                );
              }
            );
          }, 10);
        }
      },
    };

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

    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {/* {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
                </IconButton>
            ) : null} */}
        </MuiDialogTitle>
      );
    });
    const { classes } = this.props;
    const { openPerm, permissions, roleName } = this.state;

    // console.log({ renderperm12345678: roleName });
    return (
      <Fragment>
        <Page title="Users">
          <div className={classes.userListSection}>
            <Grid container>
              <Grid item md={12} xs={12} className={classes.contentSection}>
                <Typography className={classes.contentTitle} varient="h1">
                  PACE Users
                </Typography>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.userOverViewSection}
              >
                <List>
                  <ListItem
                    onClick={() => {
                      this.handlePageDataRequest(
                        0,
                        this.state.rowsPerPage,
                        this.state.sortOrder,
                        "",
                        "total"
                      );
                    }}
                    style={
                      this.state.activeTab === 0
                        ? {
                            border: "1px solid #f47607",
                            cursor: "pointer",
                          }
                        : {
                            cursor: "pointer",
                          }
                    }
                  >
                    <ListItemAvatar>
                      <img
                        src="https://media.pace-os.com/icons/svg/total-users-32x32.svg "
                        alt="Total users"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Total users"
                      secondary={this.state.totalUsersCount}
                      // onClick={() => {
                      //   this.handlePageDataRequest(
                      //     0,
                      //     this.state.rowsPerPage,
                      //     this.state.sortOrder,
                      //     "",
                      //     "total"
                      //   );
                      // }}
                      //style={{ cursor: "pointer" }}
                    />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      this.handlePageDataRequest(
                        0,
                        this.state.rowsPerPage,
                        this.state.sortOrder,
                        "",
                        "active"
                      );
                    }}
                    style={
                      this.state.activeTab === 1
                        ? {
                            border: "1px solid #f47607",
                            cursor: "pointer",
                          }
                        : {
                            cursor: "pointer",
                          }
                    }
                  >
                    <ListItemAvatar>
                      <img
                        src="https://media.pace-os.com/icons/svg/active-user-32x32.svg"
                        alt="Active users"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Active users"
                      secondary={this.state.activUsersCount}
                      // onClick={() => {
                      //   this.handlePageDataRequest(
                      //     0,
                      //     this.state.rowsPerPage,
                      //     this.state.sortOrder,
                      //     "",
                      //     "active"
                      //   );
                      // }}
                      // style={{ cursor: "pointer" }}
                    />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      this.handlePageDataRequest(
                        0,
                        this.state.rowsPerPage,
                        this.state.sortOrder,
                        "",
                        "mobile"
                      );
                    }}
                    style={
                      this.state.activeTab === 2
                        ? {
                            border: "1px solid #f47607",
                            cursor: "pointer",
                          }
                        : {
                            cursor: "pointer",
                          }
                    }
                  >
                    <ListItemAvatar>
                      <img
                        src="https://media.pace-os.com/icons/svg/user-using-mobile-32x32.svg"
                        alt="user using mobile aap"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Mobile app. users"
                      secondary={this.state.appUsersCount}
                      // onClick={() => {
                      //   this.handlePageDataRequest(
                      //     0,
                      //     this.state.rowsPerPage,
                      //     this.state.sortOrder,
                      //     "",
                      //     "mobile"
                      //   );
                      // }}
                      // style={{ cursor: "pointer" }}
                    />
                  </ListItem>
                  <ListItem
                    onClick={() => {
                      this.handlePageDataRequest(
                        0,
                        this.state.rowsPerPage,
                        this.state.sortOrder,
                        "",
                        "unsub"
                      );
                    }}
                    style={
                      this.state.activeTab === 3
                        ? {
                            border: "1px solid #f47607",
                            cursor: "pointer",
                          }
                        : {
                            cursor: "pointer",
                          }
                    }
                  >
                    <ListItemAvatar>
                      {/* <img
                        src="https://media.pace-os.com/icons/svg/user-using-mobile-32x32.svg"
                        alt="user using mobile aap"
                      /> */}
                      <SettingsIcon
                        style={{ color: "#06425c", fontSize: "32px" }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Unsubscribed users"
                      secondary={this.state.UnsubscribedUsersCount}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item md={12} xs={12} className={classes.table}>
                <Typography variant="h6">
                  {this.state.isLoading && (
                    <CircularProgress
                      size={40}
                      style={{
                        position: "absolute",
                        top: "51%",
                        left: "50%",
                        zIndex: "101",
                      }}
                    />
                  )}
                </Typography>
                <MUIDataTable
                  className={classes.tableHead}
                  // className={classes.simpleTableDesign}
                  //title="Employee list"
                  data={this.state.users}
                  columns={this.columns}
                  options={options}
                />
              </Grid>
            </Grid>
          </div>
        </Page>

        <Dialog
          maxWidth={"md"}
          onClose={this.handleCloseDelete}
          aria-labelledby="customized-dialog-title"
          open={this.state.deleteAddress}
        >
          <DialogContent>
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.topMessageDilog}
              >
                <Typography variant="h3" align="center">
                  <img src={success_72x72} alt="success" />
                </Typography>
                <Typography variant="h2" align="center">
                  Done
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
                <Typography variant="h6" align="center">
                  User : {this.state.userName} {this.state.dialogStatus}{" "}
                  successfully
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog
          onClose={this.handleClose}
          className={classes.dialogSection}
          aria-labelledby="customized-dialog-title"
          open={openPerm}
        >
          <DialogTitle
            className={classes.popLableSection}
            id="customized-dialog-title"
            onClose={this.handleClose}
          ></DialogTitle>
          <DialogContent>
            <Grid
              container
              className={classes.selectUserBtnSection}
              spacing={2}
            >
              <Grid item md={6} xs={12} className={classes.formBox}>
                <TextField
                  label="Application"
                  margin="dense"
                  name="appId"
                  id="appId"
                  onChange={(e) => {
                    this.handleChangeApplication(e);
                  }}
                  select
                  fullWidth
                  value={this.state.appId}
                  variant="outlined"
                >
                  {this.state.applications
                    .filter((application) => application.appCode != "accounts")
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
              <Grid item md={12} xs={12}>
                <Typography className={classes.permisionLabel}>
                  {" "}
                  Role
                </Typography>
                <TextField
                  //multiline
                  fullWidth
                  disabled
                  variant="outlined"
                  //rows="1"
                  id="description"
                  //label="Role"
                  value={roleName}
                  // defaultValue="Admin"
                  className={classes.formControl}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <Typography className={classes.permisionLabel}>
                  {" "}
                  Permission
                </Typography>
                <List className={classes.permiListBox}>
                  {Object.keys(permissions).length > 0
                    ? Object.keys(permissions).map((index) => (
                        // // console.log(permissions[index])
                        // alert(index)
                        <div>
                          {index == "workmanagement" ||
                          index == "engineeringmanagement" ||
                          index == "cockpitview" ||
                          index == "listview" ||
                          index == "kanbanmaterial" ||
                          index == "decisioncontrol" ||
                          index == "scm" ||
                          index == "visualplanning" ? (
                            <ListItem>
                              <ListItemText
                                style={{ fontSize: 18 }}
                                primary={index}
                              />
                            </ListItem>
                          ) : (
                            ""
                          )}

                          {Object.keys(permissions[index]).length > 0
                            ? Object.keys(permissions[index]).map((perm) =>
                                permissions[index][perm] ? (
                                  <ListItem>
                                    <ListItemText secondary={perm} />{" "}
                                  </ListItem>
                                ) : (
                                  ""
                                )
                              )
                            : ""}
                        </div>
                      ))
                    : ""}
                </List>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

        <Dialog
          maxWidth={"sm"}
          onClose={this.handleClosemobileAppDetails}
          aria-labelledby="customized-dialog-title"
          open={this.state.mobileAppDetails}
          className={classes.mobileAppDialog}
        >
          <DialogTitle
            className={classes.mobileAppTitle}
            id="customized-dialog-title"
            onClose={this.handleClosemobileAppDetails}
          >
            Mobile device details
            <IconButton
              onClick={this.handleClosemobileAppDetails}
              className={classes.closePopup}
            >
              <Close fontSize="small" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.appDetailsContent}
              >
                {/* <Typography variant="h4" style={{ marginBottom: 12 }}>
                  Mobile device details
                </Typography> */}
                {this.state.clickedPlatform === "ios" &&
                this.state.iOSPlatform.length > 0 ? (
                  <>
                    {this.state.iOSPlatform.map((one) => {
                      return (
                        <>
                          <List>
                            {/* <ListItem>
                              <ListItemText
                                primary="Platform: "
                                secondary={one.platform}
                              />
                            </ListItem> */}
                            <ListItem>
                              <ListItemText
                                primary="Device name: "
                                secondary={one.deviceBrand}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Operating system name and version: "
                                secondary={one.osVersion}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Last login: "
                                secondary={
                                  one.last_login !== null
                                    ? moment(one.last_login).format(
                                        "DD-MMM-YYYY"
                                      )
                                    : "-"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Installed on: "
                                secondary={
                                  one.appInstalledDate !== null
                                    ? moment(one.appInstalledDate).format(
                                        "DD-MMM-YYYY"
                                      )
                                    : "-"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Mobile app version: "
                                secondary={
                                  one.appVersion ? one.appVersion : "-"
                                }
                              />
                            </ListItem>
                          </List>
                          {this.state.iOSPlatform[
                            this.state.iOSPlatform.length - 1
                          ] !== one && (
                            <Divider className={classes.custmDivider} />
                          )}
                        </>
                      );
                    })}
                  </>
                ) : this.state.clickedPlatform === "android" &&
                  this.state.androidPlatform.length > 0 ? (
                  <>
                    {this.state.androidPlatform.map((one) => {
                      return (
                        <>
                          <List>
                            {/* <ListItem>
                              <ListItemText
                                primary="Platform: "
                                secondary={one.platform}
                              />
                            </ListItem> */}
                            <ListItem>
                              <ListItemText
                                primary="Device name: "
                                secondary={one.deviceBrand}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Operating system name and version: "
                                secondary={one.osVersion}
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Last login: "
                                secondary={
                                  one.last_login !== null
                                    ? moment(one.last_login).format(
                                        "DD-MMM-YYYY"
                                      )
                                    : "-"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Installed on: "
                                secondary={
                                  one.appInstalledDate !== null
                                    ? moment(one.appInstalledDate).format(
                                        "DD-MMM-YYYY"
                                      )
                                    : "-"
                                }
                              />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Mobile app version: "
                                secondary={
                                  one.appVersion ? one.appVersion : "-"
                                }
                              />
                            </ListItem>
                          </List>
                          {this.state.androidPlatform[
                            this.state.androidPlatform.length - 1
                          ] !== one && (
                            <Divider className={classes.custmDivider} />
                          )}
                        </>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </Grid>
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.appDialogAction}
              >
                <Button
                  size="medium"
                  variant="contained"
                  className={classes.custmCancelBtn}
                  onClick={this.handleClosemobileAppDetails}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

UsersTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const useStyles = (theme) => ({
  userListSection: {
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
      "&:nth-child(2)": {
        margin: "0px",
      },
      "& .MuiChip-root": {
        margin: "0px 8px 8px 0px",
      },
    },
    "& .MuiCircularProgress-root": {
      color: "#f47607",
    },
    // "& table": {
    //   "& td": {
    //     wordBreak: "keep-all",
    //   },
    //   [theme.breakpoints.down("md")]: {
    //     "& td": {
    //       height: 60,
    //       overflow: "hidden",
    //       textOverflow: "ellipsis",
    //     },
    //   },
    // },
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
          color: "white",
          padding: "8px 15px",
          "&:first-child": {
            borderTopLeftRadius: "8px",
          },
          "&:last-child": {
            borderTopRightRadius: "8px",
          },
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
  // simpleTableDesign: {
  //   '& table': {
  //     margin: '0px',
  //   },
  //   boxShadow: '0 0 0 1px rgb(63 63 68 / 5%), 0 1px 3px 0 rgb(63 63 68 / 15%)',
  //   borderRadius: '10px',
  //   '& .MuiOutlinedInput-input': {
  //     padding: '15px',
  //   },
  //   '& fieldset': {
  //     borderRadius: '0px',
  //   },
  //   '& thead tr th': {
  //     backgroundColor: '#06425c',
  //     color: '#ffffff',
  //     padding: '1rem',
  //     whiteSpace: 'nowrap',
  //     fontFamily: 'Montserrat-Medium',
  //     '& button': {
  //       backgroundColor: '#06425c',
  //       color: '#ffffff',
  //       padding: '0',
  //       whiteSpace: 'nowrap',
  //       fontFamily: 'Montserrat-Medium',
  //       margin: '0px',
  //       '& .MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon, div': {
  //         color: '#ffffff',
  //         fontSize: '14px',
  //         margin: '0px',
  //       },
  //       '& .MuiTableSortLabel-root.MuiTableSortLabel-root .MuiTableSortLabel-icon, div': {
  //         fontSize: '14px',
  //         margin: '0px',
  //         fontFamily: 'Montserrat-Medium',
  //         fontWeight: '400',
  //       },
  //     },
  //     '&:first-child': {
  //       borderTopLeftRadius: '8px',
  //     },
  //     '&:last-child': {
  //       borderTopRightRadius: '8px',
  //       width: '100px',
  //       '&>span': {
  //         float: 'right',
  //       },
  //     },
  //   },
  //   '& tbody tr td': {
  //     minWidth: '72px !important',
  //     padding: '5px 16px',
  //     fontFamily: 'Montserrat-Medium !important',
  //     color: 'rgba(0, 0, 0, 0.87)',
  //     '& .MuiFormGroup-root .MuiFormControlLabel-root': {
  //       marginLeft: '0px',
  //       marginRight: '0px',
  //       marginBottom: '0px',
  //       '& .MuiSwitch-sizeSmall': {
  //         width: '50px',
  //         height: '25px',
  //         padding: '6px',
  //         '& .MuiSwitch-track': {
  //           backgroundColor: 'rgba(0, 0, 0, 0.54)',
  //           opacity: '1',
  //         },
  //         '& .MuiSwitch-switchBase.Mui-checked': {
  //           transform: 'translateX(25px)',
  //           color: '#ffffff',
  //         },
  //         '& .Mui-checked + .MuiSwitch-track': {
  //           backgroundColor: '#F28705',
  //         },
  //       },
  //       '& .MuiSwitch-thumb': {
  //         boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 0.54), 0px 1px 1px 0px rgb(0 0 0 / 0.54), 0px 1px 3px 0px rgb(0 0 0 / 0.54)',
  //       },
  //     },
  //     '& a': {
  //       cursor: 'pointer',
  //       float: 'right',
  //       marginRight: '8px',
  //       '&:hover': {
  //         color: 'rgba(0, 0, 0, 0.54)',
  //       },
  //       '& svg': {
  //         fontSize: '20px',
  //       },
  //     },
  //     '& button': {
  //       // float: 'left',
  //       display: 'inline-block',
  //       borderRadius: '50px',
  //       padding: '10px',
  //       minWidth: '20px',
  //       color: '#757575',
  //       '& .MuiButton-label': {
  //         width: 'auto',
  //       },
  //       '& svg': {
  //         fontSize: '20px',
  //       },
  //     },
  //   },
  //   '& .MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters': {
  //     '& div>div': {
  //       '& > .MuiSvgIcon-root': {
  //         color: '#ffffff',
  //         marginTop: '0px',
  //         marginRight: '0px',
  //         height: '49px',
  //         width: '48px',
  //         padding: '6px 10px',
  //         backgroundColor: '#06425c',
  //         borderBottomLeftRadius: '10px',
  //         borderTopLeftRadius: '10px',
  //       },
  //       '& .MuiFormControl-root .MuiInputBase-root.MuiInput-root': {
  //         height: '48px',
  //         paddingLeft: '15px',
  //         '& input': {
  //           height: '32px',
  //           fontFamily: 'Montserrat-Regular',
  //         },
  //         '&:before': {
  //           borderTop: '1px solid #06425c',
  //           height: '48px',
  //           borderBottom: '1px solid #06425c',
  //         },
  //         '&:hover:not(.Mui-disabled):before': {
  //           borderBottom: '1px solid #06425c',
  //         },
  //         '&:after': {
  //           borderBottom: '1px solid #06425c',
  //         },
  //       },
  //       '& .MuiButtonBase-root': {
  //         borderBottomRightRadius: '10px',
  //         borderTopRightRadius: '10px',
  //         color: '#ffffff',
  //         backgroundColor: '#517b8d',
  //         borderBottomLeftRadius: '0px',
  //         borderTopLeftRadius: '0px',
  //         '&:hover': {
  //           backgroundColor: '#ff8533',
  //           color: '#ffffff',
  //         },
  //       },
  //     },
  //     '& .MuiButtonBase-root': {
  //       '&:focus': {
  //         color: '#ff8533 !important',
  //       },
  //       '&:hover': {
  //         color: '#ff8533',
  //       },
  //     },
  //   },
  //   // '& .MuiPaper-root.MuiPopover-paper': {
  //   //   boxShadow: 'rgb(0 0 0 / 27%) 0px 0px 30px -2px',
  //   //   '&>div': {
  //   //     backgroundColor: '#ffffff',
  //   //   },
  //   // },
  // },
  dataTableActionBtn: {
    padding: "8px",
    color: "#06374a",
    "& svg": {
      fontSize: "18px",
    },
    "&:hover": {
      color: "#f28705 !important",
    },
  },
  customTooltip: {
    backgroundColor: "rgba(6, 66, 92, 0.8)",
    padding: "8px",
    fontFamily: "Montserrat-Regular",
  },
  customArrow: {
    color: "rgba(6, 66, 92, 0.8)",
  },
  topMessageDilog: {
    "& h2": {
      fontSize: "30px",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "37px",
      color: "#06425C",
    },
  },
  deleteMassBox: {
    "& h6": {
      fontSize: "16px",
      lineHeight: "19px",
      fontFamily: "Montserrat-Medium",
      color: "#666666",
      paddingBottom: "10px",
    },
    "& div": {
      paddingBottom: "22px",
      paddingTop: "10px",
    },
  },
  customTooltip: {
    backgroundColor: "rgba(6, 66, 92, 0.8)",
    padding: "8px",
    fontFamily: "Montserrat-Regular",
  },
  customArrow: {
    color: "rgba(6, 66, 92, 0.8)",
  },
  dataTableAppIconAndroBTN: {
    padding: "8px",
    "& img": {
      width: "18px",
    },
    "&:hover img": {
      content:
        "url(https://media.pace-os.com/icons/svg/android-active-24x24.svg)",
    },
    "&:disabled": {
      opacity: 0.5,
    },
  },
  dataTableAppIconIosBTN: {
    padding: "8px",
    "& img": {
      width: "18px",
    },
    "&:hover img": {
      content: "url(https://media.pace-os.com/icons/svg/ios-active-24x24.svg)",
    },
    "&:disabled": {
      opacity: 0.5,
    },
  },
  mobileAppDialog: {
    color: "#ccc",
    "& .MuiPaper-root": {
      width: "100%",
    },
  },
  appDetailsContent: {
    "& ul li": {
      padding: "0px",
      "& span": {
        float: "left",
        display: "inline-block",
        fontSize: "0.938rem",
        fontFamily: "Montserrat-Medium",
        paddingRight: "0.875rem",
        color: "#263238",
      },
      "& p": {
        float: "left",
        display: "inline-block",
        fontSize: "0.938rem",
        fontFamily: "Montserrat-Regular",
      },
    },
  },
  userOverViewSection: {
    "& ul": {
      "& li": {
        width: "auto",
        display: "inline-block",
        padding: "15px",
        margin: "0px 12px 8px 0px",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        boxShadow: "rgb(0 0 0 / 16%) 0px 1px 4px",
        border: "1px solid #ffffff",
        "&:hover": {
          borderColor: "#f47607",
        },
        "& .MuiListItemAvatar-root": {
          display: "inline-block",
          float: "left",
          minWidth: "45px",
        },
        "& .MuiListItemText-root": {
          display: "inline-block",
          float: "left",
          "& span": {
            fontSize: "16px",
            color: "#06374a",
            fontFamily: "Montserrat-Medium",
          },
          "& p": {
            fontSize: "28px",
            lineHeight: "28px",
            paddingTop: "5px",
            fontFamily: "Montserrat-Medium",
            color: "#f47607",
          },
        },
      },
    },
  },
  custmDivider: {
    backgroundColor: "#b3afaf",
  },
  appDialogAction: {
    marginBottom: "10px",
  },
  mobileAppTitle: {
    borderBottom: "1px solid #eeeeee",
    "& h6": {
      color: "#06425C !important",
      fontSize: "18px !important",
      fontFamily: "Montserrat-SemiBold",
      lineHeight: "22px",
    },
  },
  closePopup: {
    position: "absolute",
    right: "10px",
    top: "6px",
    color: "#7890A4",
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
  )(withStyles(useStyles, { withTheme: true })(UsersTable))
);