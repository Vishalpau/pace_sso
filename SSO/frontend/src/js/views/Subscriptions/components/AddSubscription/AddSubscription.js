import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { withFormik, Formik } from "formik";
import * as Yup from "yup";
import { withStyles } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddSubscription extends React.Component {
  state = {
    user: [],
    snackbarOpen: false,
    values: [],
    branches: [],
    departments: [],
    categories: [],
    subscriptiones: [],
    subscription: {
      fkApplicationId: "",
      fkUserId: "",
      fkCompanyId: "",
      fkRoleId: "",
    },
    touched: { fkApplicationId: false },
    errors: { fkApplicationId: "" },
    subscription_id: "",
    fkApplicationId: "",
    applications: [],
    users: [],
    roles: [],
    companies: [],
  };

  componentDidMount() {
    const userId = this.props.route.match.params.uuid;
    const subscriptionId = this.props.route.match.params.id;
    this.setState({ subscription_id: this.props.route.match.params.id });

    console.log({ props: this.props });

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/applications/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ applications: res.data.data.results });
        console.log({ applications: this.state.applications });
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/companies/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ companies: res.data.data.results });
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ users: res.data.data.results });
      })
      .catch((err) => {
        console.log(err);
      });

    //  this.getRoles()

    if (subscriptionId) {
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/user/" +
          userId +
          "subscriptions/" +
          subscriptionId +
          "/",
        method: "GET",
      })
        .then((res) => {
          this.setState({ subscription: res.data.data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getRoles(appId) {
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
        this.setState({ roles: res.data.data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackbarSetOpen(false);
    props.setStatus(false);
  };

  handleTouch = (e) => {
    let { touched } = this.state;
    // console.log(touched)
    // console.log(e.target.name)
    // console.log(touched[e.target.name])
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched }, () =>
        console.log({ touched: this.state.touched })
      );
    }
  };

  formValidation = () => {
    console.log({ state: this.state });

    const { fkApplicationId } = this.state;
    let isValid = true;
    const errors = {};

    if (fkApplicationId == "") {
      errors.fkApplicationId = "Please select application";
      isValid = false;
    }
    this.setState({ errors });
    return isValid;
  };

  handleChange = (event) => {
    this.setState({ fkApplicationId: event.target.value });
    this.getRoles(event.target.value);
  };

  validationSchema = Yup.object().shape({
    fkApplicationId: Yup.string().required("Please specify the category"),
    fkCompanyId: Yup.string().required("Please specify the category"),
    fkRoleId: Yup.string().required("Please specify the category"),
    fkUserId: Yup.string().required("Please specify the category"),
  });

  render() {
    const {
      classes,
      values,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
    } = this.props;
    const userId = this.props.route.match.params.uuid;
    const { touched, errors } = this.state;
    console.log({ state: this.state });
    const isTouched_application = touched.fkApplicationId;
    console.log(isTouched_application);
    const errors_application = errors.fkApplicationId;
    console.log(errors_application);

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Card
            // {...rest}
            // className={clsx(classes.root, className)}
            >
              <Formik
                initialValues={this.state.subscription}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                  const data = new FormData();

                  if (!this.state.subscription_id) {
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/" +
                        userId +
                        "/subscriptions/",
                      method: "POST",
                      data: {
                        fkAppId: this.state.fkApplicationId,
                        fkCompanyId: values.fkCompanyId,
                        fkRoleId: values.fkRoleId,
                        fkUserId: values.fkUserId,
                      },
                    })
                      .then((res) => {
                        this.props.history.push(
                          "/" + userId + "/subscriptions"
                        );
                      })
                      .catch((err) => {
                        console.log({ error: err });
                        return;
                        const errData = err.response.data;

                        var tifOptions = Object.keys(errData).map(function (
                          key
                        ) {
                          return setFieldError(`${key}`, `${errData[key][0]}`);
                        });
                      });
                  } else {
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/user/" +
                        userId +
                        "/subscriptions/" +
                        this.state.subscription_id +
                        "/",
                      method: "PUT",
                      data: {
                        fkAppId: this.state.fkApplicationId,
                        fkCompanyId: values.fkCompanyId,
                        fkRoleId: values.fkRoleId,
                        fkuserId: values.fkuserId,
                      },
                    })
                      .then((res) => {
                        this.props.history.push("/subscriptiones");
                      })
                      .catch((err) => {
                        console.log({ error: err });
                        return;
                        const errData = err.response.data;

                        var tifOptions = Object.keys(errData).map(function (
                          key
                        ) {
                          return setFieldError(`${key}`, `${errData[key][0]}`);
                        });
                      });
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    <CardHeader
                      subheader="The information can be edited"
                      title="subscription"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select Application"
                            margin="dense"
                            name="fkApplicationId"
                            id="fkApplicationId"
                            onChange={(e) => {
                              this.handleChange(e);
                              this.formValidation();
                            }}
                            select
                            fullWidth
                            value={
                              (values.fkApplicationId = this.state
                                .fkApplicationId
                                ? this.state.fkApplicationId
                                : values.fkApplicationId)
                            }
                            variant="outlined"
                            onBlur={(e) => {
                              this.handleTouch(e);
                              this.formValidation();
                            }}
                            helperText={
                              touched.fkApplicationId
                                ? errors.fkApplicationId
                                : ""
                            }
                            error={
                              touched.fkApplicationId &&
                              Boolean(errors.fkApplicationId)
                            }
                          >
                            {this.state.applications.map((option) => (
                              <option key={option.appId} value={option.appId}>
                                {option.appName}
                              </option>
                            ))}
                          </TextField>
                          {/* {isTouched_application?
                      (errors_application!=''?<span style={{ color: "red", fontSize: '12px' }}>{this.state.errors.fkApplicationId}</span>:<span></span>)
                      :false} 
                      {!(isTouched_application||touched.fkuserId||touched.fkCompanyId||touched.fkRoleId)
                      ?<span style={{ color: "red", fontSize: '12px' }}>{this.state.errors.fkApplicationId}</span>
                      :''}                   */}
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select User"
                            margin="dense"
                            name="fkUserId"
                            id="fkUserId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.fkUserId}
                            variant="outlined"
                            helperText={touched.fkUserId ? errors.fkUserId : ""}
                            onBlur={handleBlur}
                            error={touched.fkUserId && Boolean(errors.fkUserId)}
                          >
                            <option label="------" value=""></option>
                            {this.state.users
                              .filter((option) => option.id == userId)
                              .map((option) => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select Company"
                            margin="dense"
                            name="fkCompanyId"
                            id="fkCompanyId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.fkCompanyId}
                            variant="outlined"
                            helperText={
                              touched.fkCompanyId ? errors.fkCompanyId : ""
                            }
                            onBlur={handleBlur}
                            error={
                              touched.fkCompanyId && Boolean(errors.fkCompanyId)
                            }
                          >
                            {this.state.companies.map((option) => (
                              <option
                                key={option.companyId}
                                value={option.companyId}
                              >
                                {option.companyName}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select Role"
                            margin="dense"
                            name="fkRoleId"
                            id="fkRoleId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.fkRoleId}
                            variant="outlined"
                            helperText={touched.fkRoleId ? errors.fkRoleId : ""}
                            onBlur={handleBlur}
                            error={touched.fkRoleId && Boolean(errors.fkRoleId)}
                          >
                            {this.state.roles.map((option) => (
                              <option key={option.roleId} value={option.roleId}>
                                {option.roleName}
                              </option>
                            ))}
                          </TextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button color="primary" variant="contained" type="submit">
                        Save details
                      </Button>
                    </CardActions>
                  </form>
                )}
              </Formik>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          open={this.state.snackbarOpen || this.props.status}
          autoHideDuration={6000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Employee Added Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

// UserDetails.propTypes = {
//   className: PropTypes.string
// };

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
  )(withStyles(styles, { withTheme: true })(AddSubscription))
);

// export default withRouter(connect(
//   mapStateToProps,
//   {...actions}
// )(App));
