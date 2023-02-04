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
import { SignalCellularNullOutlined } from '@material-ui/icons';
// import { useForm } from "react-hook-form";

//import { Checkbox } from 'react-advanced-form-addons';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class AddApplication extends React.Component {

  state = {
    snackbarOpen: false,
    checked: true,
    logo: null,
    appName: "",
    appCode: "",
    appDesc: "",
    appURL: "",
    errors: {},
    touched: {}
  }

  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked })
  };

  handleFileChange = (event) => {
    this.setState({
      logo: event.target.files[0]
    })
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleTouch = (e) => {
    let { touched } = this.state
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched },()=>console.log({touched:this.state.touched}))
    }
  }

  formValidation = () => {
    const { appCode,appName } = this.state
    let isValid = true
    const errors = {};

    if (appName == "") {
      errors.appName = "App Name should be specified"
      isValid = false
    }

    if (appCode == "") {
      errors.appCode = "App Code should be specified"
      isValid = false
    }


    this.setState({ errors },()=>console.log(this.state.errors));
    return isValid;
  }

  
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.logo);


    // return

    const isValid = this.formValidation();

    if (isValid) {
      const form_data = new FormData();



      if (this.state.logo != null) {
        form_data.append('appLogo', this.state.logo, this.state.logo.name);
      }

      form_data.append('appName', this.state.appName);
      form_data.append('appCode', this.state.appCode);
      form_data.append('appDesc', this.state.appDesc);
      form_data.append('appURL', this.state.appURL);
      form_data.append('active', this.state.checked);
      // form_data.append('applogo', values.logo)

      const url = process.env.API_URL + process.env.API_VERSION + '/applications/';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res.data);
          this.props.history.push('/applications')
        })
        .catch(err => console.log(err))
    }

  };


  render() {
    const { classes } = this.props;
    // console.log(this.state.logo)
    const logofile = this.state.logo
    const { touched, errors } = this.state
      
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
              <form onSubmit={this.handleSubmit}>

                <CardHeader
                  subheader="The information can be edited"
                  title="Application"
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
                        value={this.state.appName}
                        helperText={touched.appName ? errors.appName : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.appName && Boolean(errors.appName)}
                        id="appName"
                        label="App Name"
                        name="appName"
                      //     shrink={(values.appName) ? true : false}
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
                        id="appCode"
                        label="App Code"
                        name="appCode"
                        margin="dense"
                        value={this.state.appCode}
                        helperText={touched.appCode ? errors.appCode : ""}
                        type="text"
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.appCode && Boolean(errors.appCode)}
                        fullWidth
                      // shrink={(values.appCode) ? true : false}
                      /> 

                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        margin="dense"
                        id="appDesc"
                        value={this.state.appDesc}
                        label="Description"
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                        variant="outlined"
                      //   shrink={(values.appDesc) ? true : false}
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        margin="dense"
                        id="appURL"
                        value={this.state.appURL}
                        label="App URL"
                        //helperText={touched.appURL ? errors.appURL : ""}
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                        //onBlur={handleBlur}
                        // error={touched.appURL && Boolean(errors.appURL)}
                        variant="outlined"
                      //   shrink={(values.appURL) ? true : false}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      App Logo <TextField
                        id="logo"
                        name="logo"
                        label="App logo"
                        type="file"
                        //accept="image/png, image/jpeg"
                        onChange={this.handleFileChange}
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      Is_Active <Checkbox
                        id="active"
                        name="active"
                        label="Is Active"
                        checked={this.state.checked}
                        onChange={this.handleCheckboxChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}

                      //   shrink={(values.active) ? true : false}
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
                    Save Application
                </Button>
                </CardActions>
              </form>
            </Card>
          </Grid>
        </Grid>
        <Snackbar open={this.state.snackbarOpen || this.props.status} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Application Added Successfully!
      </Alert>
        </Snackbar>
      </div>
    );
  }
};



// UserDetails.propTypes = {
//   className: PropTypes.string
// };

//function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddApplication)));