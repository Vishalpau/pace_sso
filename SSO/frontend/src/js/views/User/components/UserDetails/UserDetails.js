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
const styles = () => ({
  root: {}
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
    name: Yup.string().required("Please specify Name"),
    mobile: Yup.string().required("Please specify mobile"),
    state: Yup.string().required("Please specify the State"),
    country: Yup.string().required("Please specify country"),

  })

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
      <div>
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
                url: process.env.API_URL + process.env.API_VERSION + '/user/' + localStorage.getItem('user') + '/account/',
                method: 'PATCH',
                data: {
                  name: values.addressLineOne,
                  mobile: values.addressTag,
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
                      id="name"
                      value={values.name}
                      label="Name"
                      helperText={touched.name ? errors.name : ""}
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
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
                      id="mobile"
                      value={values.mobile}
                      label="Phone Number"
                      helperText={touched.mobile ? errors.mobile : ""}
                      type="text"
                      fullWidth
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobile && Boolean(errors.mobile)}
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
