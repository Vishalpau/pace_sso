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
import { Formik } from "formik";
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

class UserDetails extends React.Component {

  state = {
    user: {
      name: "",
      state: "",
      mobile: "",
      country: ""
    },
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

  componentDidMount() {


    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/1/',
      method: 'GET',
    }).then((res) => {
      this.setState({ user: res.data.data.results })

    }).catch((err) => {
      console.log(err)

    })

  }



  validationSchema = Yup.object().shape({
    dateOfBirth: Yup.string().required("Please specify Name"),
    alternateMobile: Yup.string().required("Please specify mobile"),
    alternateEmail: Yup.string().required("Please specify the State"),
    state: Yup.string().required("Please specify country"),

  })

  render() {
    // const classes = useStyles();
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
            md={8}
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


                  axios({
                    url: process.env.API_URL + process.env.API_VERSION + '/user/' + localStorage.getItem('user') + '/personal/',
                    method: 'PATCH',
                    data: {
                      dateOfBirth: values.dateOfBirth,
                      alternateMobile: values.alternateMobile,
                      alternateEmail: values.alternateEmail,
                      state: values.state,

                      country: values.country,
                    }


                  }).then((res) => {
                    this.props.history.push('/dashboard')
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
                }) => (<form
                  autoComplete="off"
                  noValidate
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <CardHeader
                    subheader="The information can be edited"
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
                          // hidden={status ? true : false}
                          hidden={false}
                          margin="dense"
                          id="dateOfBirth"
                          value={values.dateOfBirth}
                          label="Date Of Birth"
                          helperText={touched.dateOfBirth ? errors.dateOfBirth : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="state"
                          value={values.state ? values.state : ""}
                          label="State"
                          helperText={touched.state ? errors.state : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.state && Boolean(errors.state)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="country"
                          value={values.country ? values.country : ""}
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
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="alternateMobile"
                          value={values.alternateMobile}
                          label="Alternate Phone Number"
                          helperText={touched.alternateMobile ? errors.alternateMobile : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.alternateMobile && Boolean(errors.alternateMobile)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="alternateEmail"
                          value={values.alternateEmail}
                          label="Alternate Email Address"
                          helperText={touched.alternateEmail ? errors.alternateEmail : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.alternateEmail && Boolean(errors.alternateEmail)}
                          variant="outlined"
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
                      Save details
          </Button>
                  </CardActions>
                </form>
                  )}
              </Formik>
            </Card>
            <Snackbar open={this.state.snackbarOpen || this.props.status} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
              <Alert onClose={this.handleCloseSnackbar} severity="success">
                Employee Added Successfully!
      </Alert>
            </Snackbar>
          </Grid>
        </Grid>
      </div>
    );
  }
};



// UserDetails.propTypes = {
//   className: PropTypes.string
// };

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(UserDetails)));
