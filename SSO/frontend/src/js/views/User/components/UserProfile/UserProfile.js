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
  FormControlLabel
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
  },

});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class UserProfile extends React.Component {

  state = {
    snackbarOpen: false,
    checked: false,
    user: []
  }

  componentDidMount() {
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/self/',
      method: 'GET',
    }).then((res) => {
      console.log({ user: res.data.data.results.data })
      this.setState({
        user: res.data.data.results.data
      })
      console.log({ user: this.state.user })

    }).catch((err) => {
      console.log(err)

    })
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


  roles = [
    {
      value: 'manager',
      label: 'Manager'
    },
    {
      value: 'auditor',
      label: 'Auditor'
    },

  ];
  render() {
    const {
      classes,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    } = this.props;

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
                initialValues={this.state.user}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                  const data = new FormData()

                  // const data1= {
                  data.append('name', values.name);
                  data.append('category', values.category);
                  data.append('status', values.status);
                  data.append('serial', values.serial);
                  data.append('purchase_date', values.purchase_date);
                  data.append('purchase_cost', values.purchase_cost);
                  data.append('order_no', values.order_no);
                  data.append('warranty_months', values.warranty_months);
                  data.append('company_branch_id', values.branch);
                  data.append('department_id', values.department);
                  data.append('category_id', values.category);
                  data.append('company_id', localStorage.getItem('company'));
                  data.append('parent_id', values.parent);
                  // asset_tag_image: '',
                  data.append('image', this.state.image);
                  // asset_tag: ''
                  // }
                  console.log(data)
                  axios({
                    url: '/assets/',
                    method: 'POST',
                    data: data

                  }).then((res) => {
                    // setStatus(true)
                    // resetForm({values:''})
                    this.props.history.push('/assets')
                  }).catch((err) => {
                    console.log({ "error": err })
                    return
                    const errData = err.response.data

                    var tifOptions = Object.keys(errData).map(function (key) {
                      return setFieldError(`${key}`, `${errData[key][0]}`)
                    });

                  })

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
                }) => (
                    <form
                      autoComplete="off"
                      noValidate
                      onSubmit={handleSubmit}
                    >

                      <CardHeader
                        title="Profile"
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
                              disabled
                              margin="dense"
                              id="first_name"
                              value={this.state.user.first_name || ""}
                              label="First Name"
                              helperText={touched.first_name ? errors.first_name : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.first_name && Boolean(errors.first_name)}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              margin="dense"
                              id="last_name"
                              value={this.state.user.last_name || ""}
                              label="Last Name"
                              helperText={touched.last_name ? errors.last_name : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.last_name && Boolean(errors.last_name)}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              margin="dense"
                              id="email"
                              value={this.state.user.email || ""}
                              label="Email Address"
                              helperText={touched.email ? errors.email : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              margin="dense"
                              id="phone"
                              value={this.state.user.phone || ""}
                              label="Phone Number"
                              helperText={touched.phone ? errors.phone : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.phone && Boolean(errors.phone)}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              margin="dense"
                              id="address"
                              value={this.state.user.address || ""}
                              label="Address"
                              helperText={touched.address ? errors.address : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.address && Boolean(errors.address)}
                              variant="outlined"
                            />
                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              label="State"
                              margin="dense"
                              name="state"
                              id="state"
                              type="text"
                              onChange={handleChange}
                              // eslint-disable-next-line react/jsx-sort-props
                              value={this.state.user.state || ""}
                              variant="outlined"
                              helperText={touched.state ? errors.state : ""}
                              onBlur={handleBlur}
                              error={touched.state && Boolean(errors.state)}
                              fullWidth
                            />

                          </Grid>
                          <Grid
                            item
                            md={6}
                            xs={12}
                          >
                            <TextField
                              disabled
                              margin="dense"
                              id="country"
                              value={this.state.user.country || ""}
                              label="Country"
                              helperText={touched.country ? errors.country : ""}
                              type="text"
                              fullWidth
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.country && Boolean(errors.country)}
                              variant="outlined"
                            />
                          </Grid>

                        </Grid>
                      </CardContent>


                    </form>
                  )}
              </Formik>
            </Card>
          </Grid>
        </Grid>

      </div>
    );
  }
};

const adduser = withFormik({

  mapPropsToValues: ({
    first_name,
    last_name,
    email,
    phone,
    state,
    country,
    job_profile,
    employee_code
  }) => {
    return {
      first_name: first_name || "",
      last_name: last_name || '',
      email: email || '',
      phone: phone || '',
      state: state || '',
      country: country || '',
      job_profile: job_profile || '',
      employee_code: employee_code || '',
    };
  },

  validationSchema: Yup.object().shape({
    first_name: Yup.string().required("Please specify the first name"),
    last_name: Yup.string().required("Please specify the last name"),
    email: Yup.string().required("Please specify the email address"),
    phone: Yup.string().required("Please specify the phone number"),
    state: Yup.string().required("Please specify the state"),
    country: Yup.string().required("Please specify the country"),
    employee_code: Yup.string().required("Please specify the employee code"),
    job_profile: Yup.string().required("Please specify the Job Profile"),
  }),

  handleSubmit: (values, { props, state, setStatus, setFieldError, resetForm }) => {
    const company_id = localStorage.getItem('company')
    axios({
      url: '/user/register-person/',
      method: 'POST',
      data: {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        state: values.state,
        country: values.country,
        job_profile: values.job_profile,
        is_user: values.is_user,
        role: values.role,
        company_id: company_id
      }
    }).then((res) => {
      setStatus(true)
      resetForm({ values: '' })
      props.history.push('/users')
    }).catch((err) => {
      const errData = err.response.data

      var tifOptions = Object.keys(errData).map(function (key) {
        return setFieldError(`${key}`, `${errData[key][0]}`)
      });

    })

  },
})(UserProfile);

// UserDetails.propTypes = {
//   className: PropTypes.string
// };

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(adduser)));

// export default withRouter(connect(
//   mapStateToProps,
//   { ...actions }
// )(App));