export const USER = {
  login: {
    success: "USER_LOGIN_SUCCESS",
  },
  update: {
    success: "USER_UPDATE_SUCCESS",
  },
  loginCode: {
    success: "USER_LOGIN_CODE_SUCCESS",
  },
  logout: {
    success: "USER_LOGOUT_SUCCESS",
  },
  verify: {
    success: "USER_VERIFY_SUCCESS",
    error: "USER_VERIFY_ERROR",
  },
  open: {
    success: "SNACKBAR_OPEN_SUCCESS",
    message: "SNACKBAR_OPEN_MESSAGE",
    error: "SNACKBAR_OPEN_ERROR",
  },
  close: {
    success: "SNACKBAR_CLOSE_SUCCESS",
  },
  emailStored: {
    success: "EMAILID_STORED_SUCCESS",
  },
};

export class UserActions {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.login = this.login.bind(this);
    this.loginCode = this.loginCode.bind(this);
    this.logout = this.logout.bind(this);
    this.verify = this.verify.bind(this);
    this.open = this.openSnackbar.bind(this);
    this.close = this.closeSnackbar.bind(this);
    this.userToken = "token";
  }

  login(data) {
    console.log({ actionadat: data });
    console.log({ data: data });

    localStorage.setItem(this.userToken, data.access_token);
    localStorage.setItem("userdata", JSON.stringify(data));
    localStorage.setItem("user", data.user.id);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("avatar", data.user.avatar);
    console.log({ data: data });
    return this.dispatch({ type: USER.login.success, data: data });
  }

  loginCode(data) {
    localStorage.setItem(this.userToken, data.access_token);
    return this.dispatch({ type: USER.loginCode.success });
  }
  updateUser(data) {
    console.log(data);
    return this.dispatch({ type: USER.update.success, data: data });
  }
  logout() {
    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/logout/",
      method: "GET",
    }).then((res) => {
      // alert('try logout');
      console.log({ result: res });
      localStorage.clear();
      localStorage.removeItem(this.userToken);
      localStorage.removeItem("user");
      localStorage.removeItem("ssoProjectId");
      axios.defaults.headers.common["Authorization"] = "";
      return this.dispatch({ type: USER.logout.success });
    });
  }
  verify() {
    const user = localStorage.getItem(this.userToken);
    if (user) {
      return this.dispatch({ type: USER.verify.success });
    }
    return this.dispatch({ type: USER.verify.error });
  }
  openSnackbar(message, error) {
    return this.dispatch({
      type: USER.open.success,
      message: message,
      error: error,
    });
  }
  closeSnackbar() {
    return this.dispatch({ type: USER.close.success });
  }
}
