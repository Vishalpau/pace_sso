import React, { useState, forwardRef } from 'react';
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
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import { SignalCellularNullOutlined } from '@material-ui/icons';
//import { Checkbox } from 'react-advanced-form-addons';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  logo: {
    maxWidth: "160px",
    marginLeft: 0
  },

});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditApplication extends React.Component {

  state = {
    snackbarOpen: false,
    logo: null,
    application: {
      appName: "",
      appCode: "",
      appDesc: "",
      appURL: "",
      active: false
    },
    errors: {},
    touched: {}
  }

  componentDidMount = () => {

    const appId = this.props.route.match.params.appId;
    axios.get(process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/')
      .then(res => {
        this.setState({ application: res.data.data.results })
        console.log(application)
          ;
      })
      .catch(err => console.log(err))
  }

  handleCheckboxChange = (event) => {
    event.preventDefault();
    const { application } = this.state
    console.log("value" + [application.active])
    this.setState({ [application.active]: event.target.checked })
    this.state.application.active = event.target.checked
  };

  handleFileChange = (event) => {
    console.log(event)

    this.setState({
      logo: event.target.files[0]
    })
  }

  handleChange = e => {
    e.persist();

    this.setState(prevState => ({
      application: { ...prevState.application, [e.target.name]: e.target.value }
    }))

  }

  formValidation = () => {
    const { appName, appCode } = this.state.application
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

    this.setState({ errors });
    return isValid;
  }

  handleTouch = (e) => {
    let { touched } = this.state
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched })
    }
  }

  CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
    // style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));


  handleSubmit = (e) => {
    e.preventDefault();
    //console.log(this.state);
    const isValid = this.formValidation();

    if (isValid) {

      const appId = this.props.route.match.params.appId;

      const form_data = new FormData();

      if (this.state.logo != null) {
        form_data.append('appLogo', this.state.logo, this.state.logo.name);
      }
      form_data.append('appName', this.state.application.appName);
      form_data.append('appCode', this.state.application.appCode);
      form_data.append('appDesc', this.state.application.appDesc);
      form_data.append('appURL', this.state.application.appURL);
      form_data.append('active', this.state.application.active);

      const url = process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/';
      axios.put(url, form_data, {
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
    else {
      alert('Invalid form. App Name and Code required')
    }
  };


  render() {
    const { classes } = this.props;
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
                        value={this.state.application.appName}
                        helperText={touched.appName ? errors.appName : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.appName && Boolean(errors.appName)}
                        id="appName"
                        label="appName"
                        name="appName"
                        shrink={(this.state.appName) ? 1 : 0}
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
                        label="appCode"
                        name="appCode"
                        margin="dense"
                        value={this.state.application.appCode}
                        helperText={touched.appCode ? errors.appCode : ""}
                        type="text"
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.appCode && Boolean(errors.appCode)}
                        fullWidth
                        shrink={(this.state.appCode) ? 1 : 0}
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
                        name="appDesc"
                        value={this.state.application.appDesc}
                        label="Description"
                        // helperText={touched.appDesc ? errors.appDesc : ""}
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                        //onBlur={handleBlur}
                        //error={touched.appDesc && Boolean(errors.appDesc)}
                        variant="outlined"
                        shrink={(this.state.appDesc) ? 1 : 0}
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
                        name="appURL"
                        value={this.state.application.appURL}
                        label="App URL"
                        //helperText={touched.appURL ? errors.appURL : ""}
                        type="text"
                        fullWidth
                        onChange={this.handleChange}
                        //onBlur={handleBlur}
                        // error={touched.appURL && Boolean(errors.appURL)}
                        variant="outlined"
                        shrink={(this.state.appURL) ? 1 : 0}
                      />
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      Is Active <Checkbox
                        id="active"
                        name="active"
                        label="Is Active"
                        checked={Boolean(this.state.application.active)}
                        onChange={this.handleCheckboxChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </Grid>

                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >

                    <img
                      id="logo"
                      name="appLogo"
                      label="app logo"
                      src={`http://localhost:8003/media/applogos/${this.state.application.appId}/${this.state.application.appLogoName}`}
                      aria-readonly
                      class={classes.logo}
                    />
                    <TextField
                      id="logo"
                      name="appLogo"
                      label="app logo"
                      type="file"
                      // style={{visibility:"hidden"}}
                      onChange={this.handleFileChange}
                    />
                  </Grid>
                </CardContent>

                <Divider />
                <CardActions>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                  >
                    Edit Application
                </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    component={this.CustomRouterLink}
                    to={"/applications"}

                  >
                    Cancel
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
)(withStyles(styles, { withTheme: true })(EditApplication)));