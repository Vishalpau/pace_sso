import { withStyles } from "@material-ui/styles";
import React, { Component, Fragment, forwardRef } from "react";
import { connect } from "react-redux";
import { Link, BrowserRouter as Router, useLocation } from "react-router-dom";
import { UserActions } from "../UserActions";
import queryString from "query-string";
import Page from "../../../../src/components/Page";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Popper,
} from "@material-ui/core";
import OtpInput from "react-otp-input";
import PaceLogo from "./PaceLogo";
import "../../../../src/App.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { NavLink as RouterLink } from "react-router-dom";
import loginBBg from "../../../../../static/public/images/LoginImg/logbeforebg.png";

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    // style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      type: "password",
      loading: false,
      passwordField: false,
      countryCode: true,
      otp: "",
      otpField: true,
      open: false,
      passwordPage: true,
      errors: {},
      // touched:{password:true},
      touched: {},
      result: {},
      phone_code: "",
      referralEmal: null,
      referralPhone: null,
      invitee_user_id: null,
      companies: [],
      projects: [],
      projectOpen: false,
      next: "",
      response_type: "",
    };

    this.action = new UserActions(this.props.dispatch);
  }

  handleChangeOtp = (e) => {
    this.setState({ otp: e });
  };

  handleOptionChange = (event, value) => {
    this.setState({ phone_code: value.code });
  };

  handleProjectClose = () => {
    this.setState({ projectOpen: false });
  };

  switchProject = () => {
    this.setState({ projectOpen: false });
    this.action.openSnackbar("Welcome to Dashboard");
    this.props.history.push("/dashboard");
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    if ([e.target.name] == "email") {
      let email = e.target.value;
      this.setState({ email: e.target.value.toLowerCase().trim() });
      if (email.match(/^[0-9]+$/) == null) {
        this.setState({ countryCode: true });
      } else {
        this.setState({ countryCode: true });
      }
    }
  };

  handleTouch = (e) => {
    let { touched } = this.state;

    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched });
    }
  };

  fieldValidation = (e) => {
    let isValid = true;
    let errors = {};

    if ([e.target.name] == "email") {
      let email = e.target.value;
      if (email == "") {
        this.setState({ passwordPage: true });
        errors.email = "Please enter Email";
        isValid = false;
      } else {
        if (this.state.countryCode) {
          if (email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/) == null) {
            this.setState({ passwordPage: true });
            errors.email = "Please enter valid Email";
            isValid = false;
          }
        } else {
          if (email.match(/^[0-9]{10}$/) == null) {
            errors.email = "Please enter valid mobile number";
            isValid = false;
          }
        }
      }
    }

    if (e.target.name == "password") {
      let password = e.target.value;
      if (password == "") {
        errors.password = "Please enter Password";
        isValid = false;
      }
    }
    if ([e.target.name] == "otp") {
      let otp = e.target.value;
      if (otp == "") {
        errors.otp = "Please enter OTP received";
        isValid = false;
      }
    }

    this.setState({ errors });

    return isValid;
  };

  handleClick = () => {
    this.setState({ otpField: true });
    this.setState({ passwordField: !this.state.passwordField });
  };
  handleClickOTP = () => {
    this.setState({ passwordField: true });
    this.setState({ otp: "" });
    if (this.state.otpField) this.setState({ otpField: !this.state.otpField });

    const input = new FormData();
    if (isNaN(this.state.email)) {
      input.append("email", this.state.email);
      input.append("receiver", "login-otp");
    } else {
      input.append("mobile", this.state.email);
      input.append("receiver", "login-otp");
    }

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/send-otp/",
      method: "PATCH",
      data: input,
    })
      .then((res) => {
        this.setState({ result: res.data.data.results });
        this.action.openSnackbar("OTP has been sent on Email address provided");
        this.action.showSnackbar;
      })
      .catch((err) => {
        this.setState({ loading: false });
        if (err.response && err.response.status == 400) {
          this.action.openSnackbar("Error: Records not Found", true);
          this.action.showSnackbar;
          return;
        }
      });
  };
  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  };

  handleKeypress = (e) => {
    if (e.keyCode === 13) {
      this.handleContinue();
    }
  };

  handleContinue = (e) => {
    e.preventDefault();

    let isValid = this.formValidation();
    if (isValid) {
      axios({
        url: process.env.API_URL + process.env.API_VERSION + "/user/get-user/",
        method: "GET",
        params: {
          username: this.state.email,
        },
      })
        .then((res) => {
          const values = queryString.parse(this.props.route.location.search);

          if (values.next) {
            const client_id = queryString.parse(values.next)[
              "/api/v1/user/auth/authorize/?client_id"
            ];

            axios({
              url:
                process.env.API_URL +
                process.env.API_VERSION +
                "/user/check_subscription_with_clientId/",
              method: "GET",
              params: {
                client_id: client_id,
                username: this.state.email,
              },
            })
              .then((res) => {
                this.setState({ passwordPage: false });
              })
              .catch((err) => {
                this.action.openSnackbar(err.response.data.data.results, true);
                this.action.showSnackbar;
              });
          } else {
            this.setState({ passwordPage: false });
          }
        })
        .catch((err) => {
          const errData = err.response.data.error;
          var error_message = "";
          var error_object = [];

          if (!errData.verification) {
            error_object.push(
              <span>
                {errData.error}. Please click
                {
                  <Link
                    to={{
                      pathname: "/emailMobileVerification",
                      metaprops: {
                        email: this.state.email,
                        email_otp: this.state.countryCode,
                      },
                      color: "primary",
                    }}
                  >
                    <span> here </span>
                  </Link>
                }
                to verify{" "}
              </span>
            );
          } else {
            error_message = errData.error;
            error_object.push(<span>{error_message}</span>);
          }
          this.setState({
            errors: {
              email: <span>{error_object}</span>,
            },
          });
        });
    } else {
      this.setState({ passwordPage: true });
      this.setState({
        touched: {
          email: true,
        },
      });
    }
  };

  handleBack = () => {
    if (!this.state.otpField) {
      this.setState({ passwordField: false });
      this.setState({ otpField: true });
      this.setState({ errors: { otp: "" } });
      this.setState({ password: "" });
      this.setState({ result: {} });
    } else {
      this.setState({ passwordPage: true });
    }
  };

  useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  componentDidMount() {
    if ("logincheck" in this.props.route.location) {
      this.setState({ passwordPage: false });
      this.setState({
        email: this.props.route.location.email.toLowerCase().trim(),
      });
      this.setState({ password: this.props.route.location.password });
    }

    if ("invitee_data" in this.props.route.location) {
      this.setState({
        referralEmail: this.props.route.location.invitee_data.referralEmail
          .toLowerCase()
          .trim(),
      });
      this.setState({
        referralPhone: this.props.route.location.invitee_data.referralPhone,
      });
      this.setState({
        email: this.props.route.location.invitee_data.referralEmail,
      });
    }
    const values = queryString.parse(this.props.route.location.search);

    let params = new URLSearchParams(this.props.route.location.search);

    let query = params.get("next");
    let vars = new URLSearchParams(query);
    let response_type = vars.get("response_type");

    this.setState({ response_type: response_type });

    const code = values.code;
    const next = values.next;
    this.setState({ next: next });
    console.log({ client_id: values.client_id });
  }

  formValidation = () => {
    let isValid = true;
    let errors = {};
    if (this.state.passwordPage) {
      if (this.state.email == "") {
        errors.email = "Please enter Email/Phone";
        isValid = false;
      }
    } else {
      if (!this.state.passwordField) {
        if (this.state.password == "") {
          errors.password = "Please enter Password";
          isValid = false;
        }
      }
      if (!this.state.otpField) {
        if (this.state.otp == "") {
          errors.otp = "Please enter OTP received";
          isValid = false;
        } else if (this.state.otp.match(/[0-9]{6}/) == null) {
          errors.otp = "Please enter valid OTP";
          isValid = false;
        }
      }
    }
    this.setState({ errors });
    return isValid;
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

  loginUserUpdated = () => {
    let isValid = this.formValidation();
    if (isValid) {
      const values = queryString.parse(this.props.route.location.search);
      const code = values.code;
      const next = values.next;
      const client_id = values.client_id;

      if (!this.state.passwordField) {
        if ("invitee_data" in this.props.route.location) {
          const invitee_user_id =
            this.props.route.location.invitee_data.users.id;
          const invite_id = this.props.route.location.invitee_data.id;

          const input = new FormData();

          input.append(
            "fkAppId",
            this.props.route.location.invitee_data.fkAppId
          );
          input.append(
            "fkGroupId",
            this.props.route.location.invitee_data.fkGroupId
          );
          input.append(
            "fkCompanyId",
            this.props.route.location.invitee_data.fkCompanyId
          );
          input.append("active", true);

          axios({
            url:
              process.env.API_URL +
              process.env.API_VERSION +
              "/user/" +
              invitee_user_id +
              "/invitee_subscriptions/",
            method: "POST",
            data: input,
          })
            .then((res) => {
              axios({
                url:
                  process.env.API_URL +
                  process.env.API_VERSION +
                  "/user/updateinvite/" +
                  invite_id +
                  "/",
                method: "GET",
              })
                .then((res) => {
                  console.log({ result: res });
                })
                .catch((err) => {
                  console.log({ err: err });
                });
            })
            .catch((err) => {
              console.log({ err: err });
            });
        }
        axios({
          url:
            process.env.API_URL + process.env.API_VERSION + "/user/auth/token/",
          method: "POST",
          data: {
            username: this.state.email,
            password: this.state.password,
            client_id: process.env.client_id_client,
            client_secret: process.env.client_secret_client,
            grant_type: "password",
          },
        })
          .then((res) => {
            if (values.next) {
              const token = res.data.access_token;
              var fullToken = "Bearer " + token;

              axios.defaults.headers.common["Authorization"] = fullToken;
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("userdata", JSON.stringify(res.data));
              localStorage.setItem("user", res.data.user.id);
              localStorage.setItem("name", res.data.user.name);
              localStorage.setItem("avatar", res.data.user.avatar);
              window.location.href = values.next;

              return;
            } else {
              // const companies=res.data.data.results.companies
              const token = res.data.access_token;
              var fullToken = "Bearer " + token;
              axios.defaults.headers.common["Authorization"] = fullToken;

              this.setState({ companies: res.data.user.companies });
              const companies = this.state.companies;

              if (this.props.route.location.invitee_data != undefined) {
                this.action.login(res.data);
                localStorage.setItem(
                  "companyId",
                  this.props.route.location.invitee_data.fkCompanyId
                );
                // get role of user for accounts application and save it in localstorage
                axios({
                  url:
                    process.env.API_URL +
                    process.env.API_VERSION +
                    "/user/self/" +
                    localStorage.getItem("companyId") +
                    "/",
                  method: "GET",
                })
                  .then((res) => {
                    const subscriptions =
                      res.data.data.results.data.companies[0].subscriptions;

                    subscriptions.map((subscription) => {
                      if (subscription.appCode == "accounts") {
                        localStorage.setItem(
                          "ssoRole",
                          subscription.roles[0].name
                        );
                      }
                    });
                  })
                  .catch((err) => {
                    console.log({ error: err });
                  });
              }
              if (this.state.response_type != "code") {
                if (companies.length > 1) {
                  this.action.login(res.data);
                  this.props.route.history.push({
                    pathname: "/selectsinglecompany",
                    user_data: res.data,
                    email: this.state.email,
                    password: this.state.password,
                    companies_data: companies,
                  });
                } else {
                  if (companies != undefined) {
                    localStorage.setItem("companyId", companies[0].companyId);
                    localStorage.setItem(
                      "companyCode",
                      JSON.stringify(companies[0])
                    );
                    this.getClassicOnlySub();
                    // get role of user for accounts application and save it in localstorage
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/self/" +
                        localStorage.getItem("companyId") +
                        "/",
                      method: "GET",
                    })
                      .then((res) => {
                        const subscriptions =
                          res.data.data.results.data.companies[0].subscriptions;

                        subscriptions.map((subscription) => {
                          if (subscription.appCode == "accounts") {
                            localStorage.setItem(
                              "ssoRole",
                              subscription.roles[0].name
                            );
                          }
                        });
                      })
                      .catch((err) => {
                        console.log({ error: err });
                      });
                  }

                  if (companies[0].projects.length <= 1) {
                    this.action.login(res.data);
                    this.props.route.history.push({ pathname: "/dashboard" });
                  } else {
                    this.action.login(res.data);
                    this.props.route.history.push({ pathname: "/dashboard" });
                  }
                }
              }
            }
          })
          .catch((err) => {
            this.setState({ loading: false });
            if (err.response && err.response.status == 400) {
              this.action.openSnackbar(
                err.response.data.error_description,
                true
              );
              this.action.showSnackbar;
            }
          });
      }

      if (!this.state.otpField) {
        axios({
          url: process.env.API_URL + process.env.API_VERSION + "/user/login/",
          method: "POST",
          data: {
            username: this.state.email,
            authOTP: this.state.otp,
            client_id: process.env.client_id_client,
            client_secret: process.env.client_secret_client,
          },
        })
          .then((res) => {
            if ("invitee_data" in this.props.route.location) {
              const invitee_user_id =
                this.props.route.location.invitee_data.users.id;
              const invite_id = this.props.route.location.invitee_data.id;

              const input = new FormData();

              input.append(
                "fkAppId",
                this.props.route.location.invitee_data.fkAppId
              );
              input.append(
                "fkGroupId",
                this.props.route.location.invitee_data.fkGroupId
              );
              input.append(
                "fkCompanyId",
                this.props.route.location.invitee_data.fkCompanyId
              );
              input.append("active", true);

              axios({
                url:
                  process.env.API_URL +
                  process.env.API_VERSION +
                  "/user/" +
                  invitee_user_id +
                  "/invitee_subscriptions/",
                method: "POST",
                data: input,
              })
                .then((res) => {
                  axios({
                    url:
                      process.env.API_URL +
                      process.env.API_VERSION +
                      "/user/updateinvite/" +
                      invite_id +
                      "/",
                    method: "GET",
                  })
                    .then((res) => {
                      console.log({ result: res });
                    })
                    .catch((err) => {
                      //alert('error');
                      console.log({ err: err });
                    });
                })
                .catch((err) => {
                  //alert('error');
                  console.log({ err: err });
                });
            }

            if (values.next) {
              const token = res.data.data.results.access_token;
              var fullToken = "Bearer " + token;
              axios.defaults.headers.common["Authorization"] = fullToken;
              window.location.href = values.next;
              localStorage.setItem("token", res.data.data.results.access_token);
              localStorage.setItem(
                "userdata",
                JSON.stringify(res.data.data.results)
              );
              localStorage.setItem("user", res.data.data.results.user.id);
              localStorage.setItem("name", res.data.data.results.user.name);
              localStorage.setItem("avatar", res.data.data.results.user.avatar);
              // this.action.login(res.data.data.results)
              // this.action.openSnackbar("Welcome! Login successful")
              // this.action.showSnackbar
            } else {
              // const companies=res.data.data.results.companies
              const token = res.data.data.results.access_token;
              var fullToken = "Bearer " + token;
              axios.defaults.headers.common["Authorization"] = fullToken;

              this.setState({
                companies: res.data.data.results.user.companies,
              });
              const companies = this.state.companies;
              // this.action.login(res.data.data.results)

              if (this.props.route.location.invitee_data != undefined) {
                this.action.login(res.data.data.results);
                localStorage.setItem(
                  "companyId",
                  this.props.route.location.invitee_data.fkCompanyId
                );

                // get role of user for accounts application and save it in localstorage
                axios({
                  url:
                    process.env.API_URL +
                    process.env.API_VERSION +
                    "/user/self/" +
                    localStorage.getItem("companyId") +
                    "/",
                  method: "GET",
                })
                  .then((res) => {
                    const subscriptions =
                      res.data.data.results.data.companies[0].subscriptions;

                    subscriptions.map((subscription) => {
                      if (subscription.appCode == "accounts") {
                        localStorage.setItem(
                          "ssoRole",
                          subscription.roles[0].name
                        );
                      }
                    });
                  })
                  .catch((err) => {
                    console.log({ error: err });
                  });
              }

              if (this.state.response_type != "code") {
                if (companies.length > 1) {
                  this.action.login(res.data.data.results);
                  this.props.route.history.push({
                    pathname: "/selectsinglecompany",
                    user_data: res.data,
                    email: this.state.email,
                    password: this.state.password,
                    companies_data: companies,
                  });
                } else {
                  if (companies != undefined) {
                    localStorage.setItem("companyId", companies[0].companyId);
                    localStorage.setItem(
                      "companyCode",
                      JSON.stringify(companies[0])
                    );
                    this.getClassicOnlySub();
                    // get role of user for accounts application and save it in localstorage
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/self/" +
                        localStorage.getItem("companyId") +
                        "/",
                      method: "GET",
                    })
                      .then((res) => {
                        const subscriptions =
                          res.data.data.results.data.companies[0].subscriptions;

                        subscriptions.map((subscription) => {
                          if (subscription.appCode == "accounts") {
                            localStorage.setItem(
                              "ssoRole",
                              subscription.roles[0].name
                            );
                          }
                        });
                      })
                      .catch((err) => {
                        console.log({ error: err });
                      });
                  }
                  if (companies[0].projects.length <= 1) {
                    this.action.login(res.data.data.results);

                    this.props.route.history.push({ pathname: "/dashboard" });
                  } else {
                    this.action.login(res.data.data.results);

                    this.props.route.history.push({ pathname: "/dashboard" });
                  }
                }
              }
            }
          })
          .catch((err) => {
            this.setState({ loading: false });
            if (err.response && err.response.data.status_code == 400) {
              this.action.openSnackbar(err.response.data.error.error, true);
              this.action.showSnackbar;
            }
          });
      }

      this.setState({ loading: true });
    } else {
      this.setState(
        {
          touched: {
            password: true,
          },
        },
        () => console.log({ touched: this.state.touched })
      );
    }
  };

  onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      this.handleContinue(e);
    }
  };

  onKeyDownLoginHandler = (e) => {
    // e.preventDefault()
    if (e.keyCode === 13) {
      this.loginUserUpdated();
    }
  };

  render() {
    const { classes } = this.props;
    const { touched, errors, result } = this.state;

    return (
      <Fragment>
        <Grid container className={classes.logoSection}>
          <Grid item xs={12} sm={12} md={12} align="center">
            <PaceLogo />
          </Grid>
        </Grid>
        <Page className={classes.root} title="Login">
          <Box
            className={classes.customcontentbox}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            hidden={!this.state.passwordPage}
          >
            <Grid
              container
              component="main"
              className={classes.root}
              style={{
                background: `url(${loginBBg}) no-repeat 50% 100%`,
                backgroundSize: "contain",
                paddingBottom: "170px",
              }}
            >
              <Grid
                //item
                xs={12}
                sm={12}
                md={12}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.mainWraper}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  component={Paper}
                  className={classes.paper}
                  elevation={5}
                >
                  <Grid item xs={12} sm={12} md={12} align="center">
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.logTitle}
                    >
                      Sign in
                    </Typography>
                  </Grid>
                  <form
                    className={classes.form}
                    autoComplete="off"
                    noValidate
                    onKeyDown={this.onKeyDownHandler}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={
                        this.state.countryCode
                          ? classes.customUsernamFild
                          : classes.custommblFild
                      }
                    >
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        helperText={touched.email ? errors.email : ""}
                        id="email"
                        // label="Email or Phone"
                        label="Email"
                        name="email"
                        // onKeyPress={event => {
                        //     console.log({event:event})
                        //     if (event.key === 'Enter') {
                        //         {(event) => { this.handleContinue(event) }}
                        //     }
                        //   }}

                        value={
                          Boolean(this.state.referralEmail)
                            ? this.state.referralEmail
                            : this.state.email
                        }
                        disabled={
                          Boolean(this.state.referralEmail) ? true : false
                        }
                        onChange={(e) => {
                          this.handleChange(e);
                          this.fieldValidation(e);
                        }}
                        onBlur={(e) => {
                          this.handleTouch(e);
                          this.fieldValidation(e);
                        }}
                        className={classes.inputCustmStyl}
                        error={touched.email && Boolean(errors.email)}
                        // onClick={this.handleClick}
                      />
                      {/* <NativeSelect id="select" className={classes.cuntryCodePhone} hidden={this.state.countryCode}>
                                                    <option value="10">+91</option>
                                                    <option value="20">+92</option>
                                                    <option value="20">+93</option>
                                                    <option value="20">+94</option>
                                                    <option value="20">+95</option>
                                                    <option value="10">+96</option>
                                                    <option value="20">+97</option>
                                                    <option value="20">+98</option>
                                                    <option value="20">+99</option>
                                                    <option value="20">+100</option>
                                                    <option value="20">+101</option>
                                                </NativeSelect> */}
                      {/* <div className={classes.cuntryCodePhone} hidden={this.state.countryCode}>
                                                <Autocomplete
                                                    id="country-code"
                                                    options={countries}
                                                    defaultValue={countries.find(option => option.code == "+91")}
                                                    autoHighlight
                                                    closeIcon=""
                                                    // value={this.state.phone_code}
                                                    PopperComponent={CountryCodeList}
                                                    getOptionLabel={(option) => option.code}
                                                    // getOptionSelected={(option)=>option.code}
                                                    onChange={this.handleOptionChange}
                                                    renderOption={(option) => (
                                                        <React.Fragment>
                                                            {option.code + " " + option.name}
                                                        </React.Fragment>
                                                    )}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            color="secondary"
                                                        />
                                                    )}
                                                />
                                            </div>
 */}

                      {/* <Link to="/login" className={classes.forgotLinkSty}>Forgot username?</Link> */}

                      {/* <i><svg xmlns="http://www.w3.org/2000/svg" width="24.427" height="35" viewBox="0 0 24.427 35">
                                                <path id="emailPhone" d="M1635.09-692.437a3.6,3.6,0,0,1-1.087-2.576v-27.7a3.581,3.581,0,0,1,1.1-2.578,3.733,3.733,0,0,1,2.613-1.071h11.823a3.655,3.655,0,0,1,3.655,3.647v3.7a10.577,10.577,0,0,0-1.7-.3v-1.847h-15.583v24.333H1651.5v-1.578a10.382,10.382,0,0,0,1.683-.3v3.688a3.654,3.654,0,0,1-3.654,3.645l-11.843.013A3.675,3.675,0,0,1,1635.09-692.437Zm6.8-1.652a1.639,1.639,0,0,0,1.636,1.637,1.638,1.638,0,0,0,1.636-1.637,1.638,1.638,0,0,0-1.636-1.636,1.639,1.639,0,0,0-1.632,1.635ZM1639.86-724a.556.556,0,0,0-.158.389.548.548,0,0,0,.158.385.563.563,0,0,0,.389.161.555.555,0,0,0,.385-.161.549.549,0,0,0,.161-.385.554.554,0,0,0-.161-.389.541.541,0,0,0-.385-.153.55.55,0,0,0-.385.152Zm1.515.373a.547.547,0,0,0,.546.547h3.431a.548.548,0,0,0,.547-.547.548.548,0,0,0-.547-.546h-3.431a.548.548,0,0,0-.543.545Zm5.147,22.184a6.526,6.526,0,0,1-2.552-1.521,6.253,6.253,0,0,1-1.532-2.513,9.776,9.776,0,0,1-.428-3.488,9.809,9.809,0,0,1,.736-3.347,8.181,8.181,0,0,1,1.773-2.659,8.116,8.116,0,0,1,2.7-1.755,9.21,9.21,0,0,1,3.5-.636,9.654,9.654,0,0,1,3.395.551,6.648,6.648,0,0,1,2.451,1.551,6.221,6.221,0,0,1,1.453,2.395,8.352,8.352,0,0,1,.394,3.087,7.739,7.739,0,0,1-.3,1.838,5.065,5.065,0,0,1-.787,1.614,4.02,4.02,0,0,1-1.337,1.148,4.088,4.088,0,0,1-1.95.436,3.071,3.071,0,0,1-1.411-.313,2.307,2.307,0,0,1-.953-.887,3.135,3.135,0,0,1-2.557,1.165,2.85,2.85,0,0,1-1.275-.283,2.57,2.57,0,0,1-.957-.806,3.359,3.359,0,0,1-.554-1.261,4.922,4.922,0,0,1-.073-1.644,7.075,7.075,0,0,1,.553-2.015,5.392,5.392,0,0,1,1.021-1.543,4.28,4.28,0,0,1,1.4-.984,4.243,4.243,0,0,1,1.707-.344,5.767,5.767,0,0,1,1.021.079,4.56,4.56,0,0,1,.793.215,4.51,4.51,0,0,1,.656.314c.2.117.4.239.6.362l-.5,5.175a1.556,1.556,0,0,0,.014.606.821.821,0,0,0,.2.373.75.75,0,0,0,.331.2,1.323,1.323,0,0,0,1.161-.208,2.29,2.29,0,0,0,.623-.718,4.351,4.351,0,0,0,.419-1.08,6.808,6.808,0,0,0,.184-1.346,7.818,7.818,0,0,0-.233-2.514,4.826,4.826,0,0,0-1.026-1.945,4.749,4.749,0,0,0-1.839-1.252,7.278,7.278,0,0,0-2.679-.445,6.426,6.426,0,0,0-2.65.524,6,6,0,0,0-2.013,1.452,6.782,6.782,0,0,0-1.318,2.183,9.008,9.008,0,0,0-.555,2.721,8.247,8.247,0,0,0,.283,2.776,4.853,4.853,0,0,0,1.119,1.99,4.7,4.7,0,0,0,1.9,1.2,7.948,7.948,0,0,0,2.615.4,9.928,9.928,0,0,0,1.716-.167c.284-.051.552-.113.807-.181a6.7,6.7,0,0,0,.7-.226l.359,1.464a4.21,4.21,0,0,1-.779.349,8.22,8.22,0,0,1-.919.241,9.875,9.875,0,0,1-1.921.194,11,11,0,0,1-3.488-.523Zm3.623-10.324a1.906,1.906,0,0,0-.71.612,3.414,3.414,0,0,0-.471,1.006,7.776,7.776,0,0,0-.267,1.376h0a3.181,3.181,0,0,0,.2,1.732,1.032,1.032,0,0,0,.985.586,1.186,1.186,0,0,0,.337-.057,1.224,1.224,0,0,0,.389-.211,1.974,1.974,0,0,0,.394-.431,3.178,3.178,0,0,0,.362-.729l.388-4.021a2.567,2.567,0,0,0-.6-.072,2.258,2.258,0,0,0-1,.213Z" transform="translate(-1634.003 726.366)" fill="#f2f2f2" />
                                            </svg></i> */}
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="29.891"
                          height="29.891"
                          viewBox="0 0 29.891 29.891"
                        >
                          <path
                            d="M21.26,18.457a2.627,2.627,0,1,0,2.627,2.627A2.63,2.63,0,0,0,21.26,18.457Z"
                            transform="translate(-6.256 -6.197)"
                            fill="#f2f2f2"
                          />
                          <path
                            d="M14.887,0a14.945,14.945,0,0,0,0,29.891,15.1,15.1,0,0,0,15-15A15,15,0,0,0,14.887,0Zm6.247,19.265a3.5,3.5,0,0,1-2.862-1.494,4.381,4.381,0,1,1-.641-6.365v-.022a.876.876,0,0,1,1.751,0v4.379a1.751,1.751,0,0,0,3.5,0c0-5.861-3.878-8.757-7.881-8.757a7.881,7.881,0,0,0,0,15.763,7.8,7.8,0,0,0,4.791-1.623.876.876,0,0,1,1.067,1.389A9.539,9.539,0,0,1,15,24.52,9.633,9.633,0,0,1,15,5.254c4.84,0,9.633,3.569,9.633,10.508A3.506,3.506,0,0,1,21.134,19.265Z"
                            fill="#f2f2f2"
                          />
                        </svg>
                      </i>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.submitLinkBtn}
                    >
                      <Button
                        // hidden={this.state.passwordField}
                        variant="contained"
                        // color="default"
                        className={classes.buttonCustomContinu}
                        //startIcon={<LockIcon />}
                        onClick={(e) => {
                          this.handleContinue(e);
                        }}
                        //onKeyDown={(e) => {this._handleKeyDown(e) }}
                        //onKeyPress={(e) => this._handleKeyDown(e) }
                      >
                        <span>Continue</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14.358"
                          height="15.506"
                          viewBox="0 0 14.358 15.506"
                        >
                          <g
                            id="right-arrow"
                            transform="translate(0.814 0.814)"
                          >
                            <path
                              id="Path_389"
                              data-name="Path 389"
                              d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z"
                              transform="translate(-7.592 -0.005)"
                              fill="#f2f2f2"
                              stroke="#f2f2f2"
                              stroke-width="1.5"
                            />
                            <path
                              id="Path_390"
                              data-name="Path 390"
                              d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z"
                              transform="translate(-1.312 0)"
                              fill="#f2f2f2"
                              stroke="#f2f2f2"
                              stroke-width="1.5"
                            />
                          </g>
                        </svg>
                      </Button>
                    </Grid>
                    {/* <Grid item xs={12} sm={12} md={12} className={classes.submitLinkWhitBtn}>
                                            <Link
                                                to="/register"
                                                fullWidth
                                                variant="contained"
                                            >
                                                Create new account
                                            </Link>
                                        </Grid> */}
                    {/* <Typography component="h5" variant="h5" className={classes.signinLabel} align="center" >
                        Enterprise AD Login
                    </Typography> */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      className={classes.submitLinkWhitBtn}
                    >
                      <Link
                        // hidden={this.state.passwordField}
                        variant="contained"
                        // color="default"
                        fullwidth
                        to="/selectcompany"
                        // className={classes.buttonCustomContinu}
                        //startIcon={<LockIcon />}
                        // onClick={(e) => { this.handleActiveDirectory(e) }}
                      >
                        <span>Enterprise AD Login</span>{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14.358"
                          height="15.506"
                          viewBox="0 0 14.358 15.506"
                        ></svg>
                      </Link>
                    </Grid>
                    {/* <SocialAccount /> */}
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                <p>
                  Copyright © 2022, Teknobuilt Ltd. | All rights are reserved
                </p>
              </Grid>
            </Grid>
          </Box>

          <Box
            className={classes.customcontentbox}
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            hidden={this.state.passwordPage}
          >
            <Grid
              container
              component="main"
              className={classes.root}
              style={{
                background: `url(${loginBBg}) no-repeat 50% 100%`,
                backgroundSize: "contain",
                paddingBottom: "170px",
              }}
            >
              <Grid
                //item
                xs={12}
                sm={12}
                md={12}
                //component={Paper}
                //elevation={5}
                //spacing={5}
                container
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.mainWraper}
              >
                <Grid
                  container
                  item
                  xs={12}
                  sm={8}
                  md={4}
                  component={Paper}
                  className={classes.paper}
                  elevation={5}
                >
                  {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}

                  <Grid item xs={12} sm={12} md={12} align="center">
                    <Typography
                      component="h1"
                      variant="h5"
                      className={classes.logTitle}
                    >
                      Sign in
                    </Typography>
                  </Grid>

                  <form
                    className={classes.form}
                    autoComplete="off"
                    noValidate
                    onKeyDown={this.onKeyDownLoginHandler}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      align="center"
                      className={classes.userLogDetail}
                    >
                      <Typography component="h5" variant="h5">
                        <AccountCircleIcon /> {this.state.email}
                      </Typography>
                    </Grid>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        className={classes.customPasswordFild}
                        hidden={this.state.passwordField}
                      >
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Enter your password"
                          type="password"
                          id="password"
                          autoFocus={true}
                          helperText={touched.password ? errors.password : ""}
                          className={classes.inputCustmStyl}
                          value={this.state.password}
                          onChange={(e) => {
                            this.handleChange(e);
                            this.fieldValidation(e);
                          }}
                          onBlur={(e) => {
                            this.handleTouch(e);
                            this.fieldValidation(e);
                          }}
                          error={touched.password && Boolean(errors.password)}
                        />
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="26.773"
                            height="31.89"
                            viewBox="0 0 26.773 31.89"
                          >
                            <path
                              id="padlock"
                              d="M29.052,11.959H27.936V7.972c0-4.4-4-7.972-8.924-7.972s-8.924,3.576-8.924,7.972v3.986H8.972a3.187,3.187,0,0,0-3.347,2.99V28.9a3.187,3.187,0,0,0,3.347,2.99h20.08A3.187,3.187,0,0,0,32.4,28.9V14.948A3.187,3.187,0,0,0,29.052,11.959ZM13.062,7.972c0-2.931,2.668-5.315,5.95-5.315s5.95,2.384,5.95,5.315v3.986h-11.9ZM20.5,22.219v3.027a1.5,1.5,0,0,1-2.975,0V22.219a2.615,2.615,0,0,1-1.487-2.288,2.832,2.832,0,0,1,2.975-2.658,2.832,2.832,0,0,1,2.975,2.658A2.615,2.615,0,0,1,20.5,22.219Z"
                              transform="translate(-5.625)"
                              fill="#f2f2f2"
                            />
                          </svg>
                        </i>
                        <Link
                          to={{
                            pathname: "/recoveryPassword",
                            state: {
                              email: this.state.email,
                              next: this.props.route.location.search,
                            },
                          }}
                          onClick={this.toggle}
                          className={classes.forgotLinkSty}
                        >
                          Forgot Password?
                        </Link>

                        <Link
                          to={{
                            pathname: "/login",
                          }}
                          onClick={this.handleBack}
                          className={classes.BackLinkSty}
                        >
                          Back
                        </Link>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        hidden={this.state.otpField}
                      >
                        <Grid
                          item
                          xs={12}
                          className={classes.otpFieldstyle}
                          hidden={
                            !(Boolean(result.email) || Boolean(result.mobile))
                          }
                        >
                          {/* <Typography component="body1" variant="body1" >
                                                        Enter the 6-digit OTP sent to your
                                                        {String(result.mobile).substring(0, 2)}******{String(result.mobile).slice(-3)}
                                                        / {String(result.email).substring(0, 2)}******{String(result.email).slice(-4)}  mobile number and email id.
                                                    </Typography> */}
                          <Typography component="body1" variant="body1">
                            Enter the 6-digit OTP sent to your Email:
                            {String(result.email).substring(0, 2)}******
                            {String(result.email).slice(-4)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.otpFieldstyle}>
                          <TextField
                            hidden={this.state.otpField}
                            variant="outlined"
                            required
                            //fullWidth
                            name="otp"
                            //label="Enter OTP"
                            type="otp"
                            id="otp"
                            //fullWidth
                            className={classes.inputCustmStyl}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                              endAdornment: (
                                <OtpInput
                                  //style={{ padding: "10px" }}
                                  className={classes.otpFieldstyle}
                                  value={this.state.otp}
                                  onChange={(e) => {
                                    this.handleChangeOtp(e);
                                  }}
                                  onBlur={(e) => {
                                    this.handleTouch(e);
                                  }}
                                  numInputs={6}
                                  otpType="number"
                                  disabled={false}
                                  name="otp"
                                  //className={classes.inputCustmStyl}
                                  //inputStyle={{
                                  //   'padding': '8px'
                                  //}}
                                />
                              ),
                            }}
                          />
                        </Grid>
                        {touched.otp || Boolean(errors.otp) ? (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.otp}
                          </span>
                        ) : (
                          ""
                        )}
                        <Grid item xs={12} sm={12} align="right">
                          <Link
                            onClick={this.handleClickOTP}
                            className={classes.forgotLinkSty}
                          >
                            Resend OTP
                          </Link>
                        </Grid>
                        {/*<Grid item xs={6} sm={6} align="right">
                                                    <Link align="left" href="#" className={classes.forgotLinkSty}>
                                                        Sign in with password
                                                    </Link>
                                                </Grid> */}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.mT30}>
                      <Grid container item xs={6}>
                        <Button
                          hidden={this.state.passwordField}
                          variant="contained"
                          color="default"
                          className={classes.buttonCustomotp}
                          //startIcon={<LockIcon />}
                          onClick={this.handleClickOTP}
                        >
                          Login with OTP
                        </Button>
                        <Button
                          hidden={this.state.otpField}
                          variant="contained"
                          color="default"
                          className={classes.buttonCustomotpBack}
                          //startIcon={<LockIcon />}
                          onClick={this.handleBack}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14.358"
                            height="15.496"
                            viewBox="0 0 14.358 15.496"
                          >
                            <g transform="translate(0.814 0.803)">
                              <path
                                d="M20.018,13.948a.3.3,0,0,0,.215-.518L13.779,6.977,20.233.523A.3.3,0,0,0,19.8.095L13.136,6.763a.3.3,0,0,0,0,.429L19.8,13.859A.3.3,0,0,0,20.018,13.948Z"
                                transform="translate(-13.048 -0.005)"
                                fill="#054d69"
                                stroke="#054d69"
                                stroke-width="1.5"
                              />
                              <path
                                d="M8.283,13.943a.3.3,0,0,0,.215-.518L2.044,6.971,8.5.518A.3.3,0,0,0,8.068.089L1.4,6.757a.3.3,0,0,0,0,.429l6.668,6.668A.3.3,0,0,0,8.283,13.943Z"
                                transform="translate(4.143 0)"
                                fill="#054d69"
                                stroke="#054d69"
                                stroke-width="1.5"
                              />
                            </g>
                          </svg>
                          <span>Back</span>
                        </Button>
                      </Grid>
                      <Grid container item xs={6}>
                        <Button
                          variant="contained"
                          //color="default"
                          className={classes.buttonCustom}
                          onClick={this.loginUserUpdated}
                          //startIcon={<LockIcon />}
                        >
                          Login
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                <p>
                  Copyright © 2022, Teknobuilt Ltd. | All rights are reserved
                </p>
              </Grid>
            </Grid>
          </Box>
        </Page>
      </Fragment>
    );
  }
}

const useStyles = (theme) => ({
  root: {
    "& .MuiPaper-root": {
      borderRadius: "1px",
      //backgroundColor: "transparent",
      //backgroundImage: `url(/${PaceLogo})`,
    },
    //height: '100vh',
    //backgroundImage: `url(/${GradientBG})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "100%",
  },

  paperRoot: {
    backgroundColor: "transparent",
  },
  mainWraper: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2, 2),
    },
  },
  logoSection: {
    margin: theme.spacing(4, 0, 1, 0),
  },
  paper: {
    margin: theme.spacing(1, 2, 6, 2),
    padding: theme.spacing(4, 6),
    maxWidth: "485px",
    width: "100%",
    minHeight: "358px",
    borderRadius: "5px !important",
    //background: `url(/${PaceLogo})`,
    //background: [PaceLogo],
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
    marginTop: theme.spacing(1),
  },

  submitBtn: {
    margin: theme.spacing(3, 0, 1, 0),
    backgroundColor: "#054D69",
    fontSize: "14px",
    fontFamily: "Montserrat-Bold",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#054D69",
    },
  },
  submitLinkBtn: {
    "& a": {
      margin: theme.spacing(5, 0, 1, 0),
      backgroundColor: "#054D69",
      display: "block",
      textAlign: "center",
      color: "#ffffff",
      fontSize: "16px",
      lineHeight: "17px",
      fontFamily: "Montserrat-SemiBold",
      padding: "15px",
      textDecoration: "none",
      "& span": {
        verticalAlign: "top",
        paddingRight: "10px",
      },
    },
  },
  submitLinkWhitBtn: {
    "& a": {
      margin: theme.spacing(3, 0, 1, 0),
      backgroundColor: "transparent",
      border: "1px solid #92A6B6",
      display: "block",
      textAlign: "center",
      color: "#054D69",
      fontSize: "14px",
      lineHeight: "15px",
      fontFamily: "Montserrat-SemiBold",
      padding: "15px",
      textDecoration: "none",
    },
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  logoBoxStyle: {
    backgroundColor: "#16384F",
    height: 115,
    width: 115,
    borderRadius: 100,
    marginBottom: 35,
    position: "relative",
  },
  inputCustmStyl: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#054D69",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#92A6B6",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#F28705",
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#f28705",
    },
  },
  customUsernamFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "16px",
      padding: "14px 10px 4px 10px",
      //backgroundColor: '#16384f',
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      borderRight: "1px solid #92A6B6",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 5px 0px 58px",
      borderColor: "#92A6B6",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 45px",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      padding: "0px 0px 0px 66px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 60px",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiFormHelperText-root": {
      "& span": {
        "& span": {
          "& a": {
            color: "#054D69",
            "& span": {
              color: "#054D69",
            },
          },
        },
      },
    },
  },
  cuntryCodePhone: {
    left: "44px",
    borderRight: "1px solid #92A6B6",
    top: "16px",
    position: "absolute",
    "& .MuiNativeSelect-select.MuiInputBase-input": {
      padding: "18.5px 20px 18.5px 10px",
      borderBottom: "none",
      backgroundColor: "transparent",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
      lineHeight: "19px",
    },
    "& .MuiNativeSelect-icon": {
      color: "#92A6B6",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none",
    },
    "& .MuiInput-underline:before": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none",
    },
    "& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot":
      {
        paddingRight: "0px",
        borderBottom: "none",
        height: "52px",
        paddingLeft: "8px",
        width: "72px",
      },
    "& .MuiAutocomplete-inputRoot[class*='MuiInput-root'] .MuiAutocomplete-input:first-child":
      {
        padding: "4px 20px 0px 0px",
        textAlign: "center",
      },
  },
  forgotLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
    float: "left",
  },

  BackLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
    float: "right",
    //marginLeft: '50%'
  },
  hidDestopView: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  hidMobileView: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  otpFieldstyle: {
    "& input": {
      width: "2em !important",
      margin: theme.spacing(0.5, 1),
      height: "2rem",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #F28705",
    },
    "& .MuiInputBase-formControl > input": {
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      paddingRight: "0px",
    },
    "& .MuiOutlinedInput-root div": {
      margin: "0px auto",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
    },
    "& .MuiFormLabel-root": {
      color: "#F28705",
    },
    padding: "8px 0px",
    border: "none",
    borderRadius: "4px",
  },

  submitBtn: {
    margin: theme.spacing(3, 0, 1, 0),
    backgroundColor: "#054D69",
    fontSize: "14px",
    fontFamily: "Montserrat-Bold",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#054D69",
    },
  },
  logTitle: {
    fontSize: "30px",
    fontFamily: "Montserrat-Bold",
    color: "#054D69",
    lineHeight: "37px",
  },
  logoBoxStyle: {
    backgroundColor: "#16384F",
    height: 115,
    width: 115,
    borderRadius: 100,
    marginBottom: 35,
    position: "relative",
  },
  buttonCustomContinu: {
    position: "relative",
    width: "100%",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "19px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#054D69",
    // marginLeft: '10%',
    border: "1px solid #054D69",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    marginTop: "40px",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#054D69",
    },
    "&:focus": {
      outline: "none",
    },
    "& span > span": {
      paddingRight: "10px",
    },
  },
  buttonCustom: {
    position: "relative",
    width: "100%",
    color: "#ffffff",
    fontSize: "13px",
    fontFamily: "Montserrat-Medium",
    lineHeight: "19px",
    paddingTop: "15px",
    paddingBottom: "15px",
    borderRadius: "0px",
    backgroundColor: "#054D69",
    // marginLeft: '10%',
    border: "1px solid #054D69",
    boxShadow: "none",
    fontFamily: "Montserrat-SemiBold",
    textTransform: "none",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#054D69",
    },
    "&:focus": {
      outline: "none",
    },
    "& span > span": {
      paddingRight: "10px",
    },
  },
  buttonCustomotp: {
    color: "#054D69",
    width: "95%",
    fontSize: "13px",
    lineHeight: "15px",
    marginRight: "5%",
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
  },
  buttonCustomotpBack: {
    color: "#054D69",
    width: "90%",
    fontSize: "13px",
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
  inputCustmStyl: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#054D69",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#92A6B6",
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#F28705",
    },
    "& .MuiFormLabel-root.Mui-error": {
      color: "#f28705",
    },
    ".MuiOutlinedInput-notchedOutline": {
      paddingLeft: "52px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      "& legend": {
        "& span": {
          paddingLeft: "12px",
          paddingRight: "8px",
        },
      },
    },
  },
  // customUsernamFild: {
  //     position: 'relative',
  //     "& > i": {
  //         position: 'absolute',
  //         left: '0px',
  //         top: '15px',
  //         padding: '10px 10px 4px 10px',
  //         backgroundColor: '#16384f',
  //         borderTopLeftRadius: '3px',
  //         borderBottomLeftRadius: '3px',
  //     },
  //     "& .MuiOutlinedInput-notchedOutline": {
  //         padding: '0px 8px 0px 52px',
  //         borderColor: '#92A6B6',
  //     },
  //     "& .MuiInputLabel-animated": {
  //         padding: '0px 0px 0px 52px',
  //         color: '#05374A',
  //         fontFamily: 'Montserrat-Medium',
  //     },
  //     "& .MuiInputLabel-shrink": {
  //         padding: '0px 0px 0px 60px',
  //     },
  //     "& .MuiInputBase-input": {
  //         padding: '18.5px 14px 18.5px 60px',
  //         fontFamily: 'Montserrat-Medium',
  //     },
  // },
  custommblFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "15px",
      padding: "10px 10px 4px 10px",
      //backgroundColor: '#16384f',
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      borderRight: "1px solid #92A6B6",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 130px",
      borderColor: "#92A6B6",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 110px",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      padding: "0px 0px 0px 160px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 130px",
      fontFamily: "Montserrat-Medium",
    },
    "& .Login-cuntryCodePhone-16": {
      left: "47px",
      paddingRight: "5px",
      borderRight: "1px solid #c2c2c2",
      top: "16px",
      position: "absolute",
    },
    "& .MuiFormHelperText-root": {
      "& span": {
        "& span": {
          "& a": {
            color: "#054D69",
            "& span": {
              color: "#054D69",
            },
          },
        },
      },
    },
  },
  customPasswordFild: {
    position: "relative",
    "& > i": {
      position: "absolute",
      left: "0px",
      top: "16px",
      padding: "9px 10px 3px 10px",
      //backgroundColor: '#16384f',
      borderTopLeftRadius: "3px",
      borderBottomLeftRadius: "3px",
      fontSize: "27px",
      color: "#ffffff",
      borderRight: "1px solid #92A6B6",
      "& svg": {
        "& path": {
          fill: "#92A6B6",
        },
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      padding: "0px 8px 0px 52px",
      borderColor: "#92A6B6",
    },
    "& .MuiInputLabel-animated": {
      padding: "0px 0px 0px 52px",
      color: "#05374A",
      fontFamily: "Montserrat-Medium",
    },
    "& .MuiInputLabel-shrink": {
      padding: "0px 0px 0px 60px",
    },
    "& .MuiInputBase-input": {
      padding: "18.5px 14px 18.5px 60px",
      fontFamily: "Montserrat-Medium",
    },
  },
  forgotLinkSty: {
    color: "#05374A",
    fontSize: "14px",
    fontFamily: "Montserrat-SemiBold",
    float: "left",
  },
  hidDestopView: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  hidMobileView: {
    display: "block",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  otpFieldstyle: {
    padding: "8px 0px",
    border: "none",
    borderRadius: "4px",
    "& .MuiInputBase-formControl > input": {
      display: "none",
    },
    "& input": {
      width: "35px !important",
      height: "36px",
      fontSize: "1rem",
      borderRadius: "0px",
      border: "1px solid #92A6B6",
      outline: "none",
      fontFamily: "Montserrat-Medium",
      color: "#05374A",
    },
    "& .MuiOutlinedInput-root > div > div": {
      margin: "0px auto",
      margin: "5px 18px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "12px !important",
    },
    "& .MuiOutlinedInput-root > div > div:nth-child(1)": {
      marginLeft: "0px !important",
    },
    "& .MuiOutlinedInput-root > div > div:nth-child(6)": {
      marginRight: "0px !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F28705",
      border: "none",
      padding: "0px !important",
    },
    "& .MuiFormLabel-root": {
      color: "#F28705",
    },
    "& .MuiTypography-root": {
      color: "#05374A",
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
  userLogDetail: {
    margin: theme.spacing(3, 0, 2, 0),
    "& h5": {
      color: "#16384F",
      fontSize: "15px",
      lineHeight: "19px",
      display: "inline-block",
      padding: "3px 32px",
      borderRadius: "18px",
      border: "1px solid #E3E3E3",
      backgroundColor: "#F2F2F2",
      "& svg": {
        verticalAlign: "middle",
        marginRight: "8px",
        color: "#054D69",
      },
    },
  },
  footerCopyRight: {
    padding: "5px 15px 5px 15px",
    display: "block",
    textAlign: "center",
    "& p": {
      marginBottom: "0px",
      fontSize: "12px",
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
)(withStyles(useStyles, { withTheme: true })(Login));
