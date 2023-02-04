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
  Input,
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

class GenerateApiKey extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      values: [],
      company_id: "",
      companies: [],
      applications: [],
      oauthclients: [],
      apikeys: {
        companyId: "",
        OauthClientId: "",
        applicationId: "",
        expiredAt: "",
        clientType: "",
        clientAppVersions: "",
      },
    };
  }

  componentDidMount() {
    console.log({ props: this.props });

    const companyId = this.props.route.match.params.companyId;
    //const keyId = this.props.route.match.params.locationId;
    this.setState({ company_id: this.props.route.match.params.companyId });
    //this.setState({ loc_id: this.props.route.match.params.locationId })

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
      url: process.env.API_URL + process.env.API_VERSION + "/applications/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ applications: res.data.data.results });
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url:
        process.env.API_URL +
        process.env.API_VERSION +
        "/companies/oauth2applications/",
      method: "GET",
    })
      .then((res) => {
        this.setState({ oauthclients: res.data.data.results });
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

  validationSchema = Yup.object().shape({
    companyId: Yup.string().required("Please Specify your category"),
    OauthClientId: Yup.string().required("Please Specify your category"),
    applicationId: Yup.string().required("Please Specify your category"),
    clientType: Yup.string().required("Please Specify your category"),
    clientAppVersions: Yup.string().required("Please Specify your category"),
    expiredAt: Yup.date().required("Please Specify expired date"),
  });
  render() {
    const { classes } = this.props;
    const companyId = this.props.route.match.params.companyId;

    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <Card
            // {...rest}
            // className={clsx(classes.root, className)}
            >
              <Formik
                initialValues={this.state.apikeys}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                  axios({
                    url:
                      process.env.API_URL +
                      process.env.API_VERSION +
                      "/companies/" +
                      this.state.company_id +
                      "/xkeys/",
                    method: "POST",
                    data: {
                      OauthClientId: values.OauthClientId,
                      companyId: values.companyId,
                      applicationId: values.applicationId,
                      clientType: values.clientType,
                      clientAppVersions: values.clientAppVersions,
                      // revoked: values.revoked,
                      expiredAt: values.expiredAt,
                    },
                  })
                    .then((res) => {
                      this.props.history.push(
                        "/apikeys/" + this.state.company_id
                      );
                    })
                    .catch((err) => {
                      console.log({ error: err });
                      return;
                      const errData = err.response.data;

                      var tifOptions = Object.keys(errData).map(function (key) {
                        return setFieldError(`${key}`, `${errData[key][0]}`);
                      });
                    });
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
                      title="APIKeys"
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select Company"
                            margin="dense"
                            name="companyId"
                            id="companyId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.companyId}
                            variant="outlined"
                            helperText={
                              touched.companyId ? errors.companyId : ""
                            }
                            onBlur={handleBlur}
                            error={
                              touched.companyId && Boolean(errors.companyId)
                            }
                          >
                            {this.state.companies
                              .filter((option) => option.companyId == companyId)
                              .map((option) => (
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
                            label="Select Application"
                            margin="dense"
                            name="applicationId"
                            id="applicationId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.applicationId}
                            variant="outlined"
                            helperText={
                              touched.applicationId ? errors.applicationId : ""
                            }
                            onBlur={handleBlur}
                            error={
                              touched.applicationId &&
                              Boolean(errors.applicationId)
                            }
                          >
                            {this.state.applications.map((option) => (
                              <option key={option.appId} value={option.appId}>
                                {option.appName}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            label="Select Device"
                            margin="dense"
                            name="OauthClientId"
                            id="OauthClientId"
                            onChange={handleChange}
                            select
                            fullWidth
                            value={values.OauthClientId}
                            variant="outlined"
                            helperText={
                              touched.OauthClientId ? errors.OauthClientId : ""
                            }
                            onBlur={handleBlur}
                            error={
                              touched.OauthClientId &&
                              Boolean(errors.OauthClientId)
                            }
                          >
                            {this.state.oauthclients.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="clientType"
                            value={values.clientType}
                            label="clientType"
                            helperText={
                              touched.clientType ? errors.clientType : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.clientType && Boolean(errors.clientType)
                            }
                            variant="outlined"
                            shrink={values.clientType ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="clientAppVersions"
                            value={values.clientAppVersions}
                            label="clientAppVersions"
                            helperText={
                              touched.clientAppVersions
                                ? errors.clientAppVersions
                                : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.clientAppVersions &&
                              Boolean(errors.clientAppVersions)
                            }
                            variant="outlined"
                            shrink={values.clientAppVersions ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            id="expiredAt"
                            label="Expired At"
                            type="date"
                            name="expiredAt"
                            value={values.expiredAt}
                            className={classes.textField}
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={
                              touched.expiredAt ? errors.expiredAt : ""
                            }
                            error={
                              touched.expiredAt && Boolean(errors.expiredAt)
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          {/* <TextField
                          margin="dense"
                          id="expiredAt"
                          value={values.expiredAt}
                          label="expiredAt"
                          helperText={touched.expiredAt ? errors.expiredAt : ""}
                          type="date"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.expiredAt && Boolean(errors.expiredAt)}
                          variant="outlined"
                          placeholder="expiredAt"
                        /> */}
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button color="primary" variant="contained" type="submit">
                        Save APIKey
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
            APIKey generated Successfully!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

// UserDetails.propTypes = {
//   className: PropTypes.string
// };

//function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default withRouter(
  connect(
    //mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles, { withTheme: true })(GenerateApiKey))
);
