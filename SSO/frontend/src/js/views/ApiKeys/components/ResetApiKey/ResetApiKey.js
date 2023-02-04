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

class ResetApiKey extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      snackbarOpen: false,
      values: [],
      apikeys: [],
      apikey: {},
      company_id: "",
      checked: true
    }

  }


  componentDidMount() {

    const companyId = this.props.route.match.params.companyId
    const keyId = this.props.route.match.params.keyId
    this.setState({ company_id: this.props.route.match.params.companyId })

    console.log({ props: this.props })

    if (keyId) {
      axios({
        url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/xkeys/' + keyId + '/',
        method: 'GET',
      }).then((res) => {
        this.setState({ apikey: res.data.data.results })

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


  //   validationSchema= Yup.object().shape({
  //     roleName: Yup.string().required("role name field is Required"),
  //     scope : Yup.string().required("scope field is Required"),
  // })
  render() {
    const { classes } = this.props;
    const keyId = this.props.route.match.params.keyId
    const companyId = this.props.route.match.params.companyId


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
                initialValues={this.state.apikey}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError, resetForm }) => {

                  axios({
                    url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/xkeys/' + keyId + '/',
                    method: 'PUT',
                    data: {
                      reset: this.state.checked
                    }


                  }).then((res) => {
                    this.props.history.push('/apikeys/' + this.state.company_id)
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
                        Reset API Key <Checkbox
                          id="reset"
                          name="reset"
                          label="reset"
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
                      Reset
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
            Reset Successfully!
      </Alert>
        </Snackbar>
      </div>
    );
  }
};


function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ResetApiKey)));