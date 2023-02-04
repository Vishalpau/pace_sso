import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
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
  Input
} from '@material-ui/core';
import { withFormik, Formik } from "formik";
import * as Yup from 'yup';
import { withStyles } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddRole extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      snackbarOpen: false,
      values: [],
      roles: [],
      role: {
        roleName: "",
        roleDesc: "",
        scope: ""
      },
      role_id: "",
      app_id: "",
      checked: true,
      application: { appName: "" }
    }

  }


  componentDidMount() {

    console.log({ props: this.props })

    const appId = this.props.route.match.params.appId;
    const roleId = this.props.route.match.params.roleId;
    this.setState({ role_id: this.props.route.match.params.roleId })
    this.setState({ app_id: this.props.route.match.params.appId })

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ application: res.data.data.results })
      console.log('application details: ' + application)

    }).catch((err) => {
      console.log(err)
    })

    if (roleId) {
      axios({
        url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/roles/' + roleId + '/',
        method: 'GET',
      }).then((res) => {
        this.setState({ role: res.data.data.results })

      }).catch((err) => {
        console.log(err)

      })
    }
  }

  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked })
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarSetOpen(false);
    props.setStatus(false);
  }


  validationSchema = Yup.object().shape({
    roleName: Yup.string().required("role name field is Required"),
    scope: Yup.string().required("scope field is Required"),
  })
  render() {
    const { classes } = this.props;
    console.log('role: ' + this.state.role)

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >

          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <Card
            // {...rest}
            // className={clsx(classes.root, className)}
            >

              <Formik
                initialValues={this.state.role}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {

                  //  const data = new FormData()

                  if (!this.state.role_id) {
                    axios({
                      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + this.state.app_id + '/roles/',
                      method: 'POST',
                      data: {
                        fkAppId: Number(this.state.app_id),
                        roleName: values.roleName,
                        roleDesc: values.roleDesc,
                        scope: values.scope,
                        isaDefault: this.state.checked
                      }

                    }).then((res) => {
                      resetForm({ values: '' })
                      this.props.history.push('/roles/' + this.state.app_id)
                    }).catch((err) => {
                      console.log({ "error": err })
                      return
                      const errData = err.response.data

                      var tifOptions = Object.keys(errData).map(function (key) {
                        return setFieldError(`${key}`, `${errData[key][0]}`)
                      });

                    })
                  }
                  else {
                    axios({
                      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + this.state.app_id + '/roles/' + this.state.role_id + '/',
                      method: 'PUT',
                      data: {
                        fkAppId: values.appId,
                        roleName: values.roleName,
                        roleDesc: values.roleDesc,
                        scope: values.scope,
                        isaDefault: this.state.checked

                      }


                    }).then((res) => {
                      this.props.history.push('/roles/' + this.state.app_id)
                    }).catch((err) => {
                      console.log({ "error": err })
                      return
                      const errData = err.response.data

                      var tifOptions = Object.keys(errData).map(function (key) {
                        return setFieldError(`${key}`, `${errData[key][0]}`)
                      });

                    })
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
                  isSubmitting
                }) => (<form
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >

                  <CardHeader
                    subheader="The information can be edited"
                    title="Roles"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          variant="outlined"
                          value={this.state.application.appName}
                          helperText={touched.appName ? errors.appName : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.appName && Boolean(errors.appName)}
                          id="appName"
                          label="appName"
                          name="appName"
                          // shrink={(values.appName) ? true : false}
                          InputProps={{ readOnly: true, }}
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >

                        <TextField
                          margin="dense"
                          variant="outlined"
                          value={values.roleName}
                          helperText={touched.roleName ? errors.roleName : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.roleName && Boolean(errors.roleName)}
                          id="roleName"
                          label="RoleName"
                          name="roleName"
                        //shrink={(values.roleName) ? 1 : 0}
                        />

                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          variant="outlined"
                          color="secondary"
                          id="roleDesc"
                          label="Role Description"
                          name="roleDesc"
                          margin="dense"
                          value={values.roleDesc}
                          helperText={touched.roleDesc ? errors.roleDesc : ""}
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.roleDesc && Boolean(errors.roleDesc)}
                          fullWidth
                        //shrink={(values.roleDesc) ? true : false}
                        />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="scope"
                          value={values.scope}
                          label="Scope"
                          helperText={touched.scope ? errors.scope : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.scope && Boolean(errors.scope)}
                          variant="outlined"
                        // shrink={(values.scope) ? true : false}
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        Is Default <Checkbox
                          id="isadefault"
                          name="isadefault"
                          label="Is a Default"
                          checked={this.state.checked}
                          onChange={this.handleCheckboxChange}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />

                      </Grid>

                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Save Role
                </Button>
                  </CardActions>
                </form>
                  )}
              </Formik>

            </Card>
          </Grid>
        </Grid>
        <Snackbar open={this.state.snackbarOpen || this.props.status} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Role Added Successfully!
      </Alert>
        </Snackbar>
      </div>
    );
  }
};


function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddRole)));