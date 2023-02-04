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
    companyName: "",
    companyCode: "",
    businessVertical: "",
    panOrTaxid: "",
    gstNo: "",
    description: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    country: "",
    zipCode: "",
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
      this.setState({ touched })
    }
  }

  formValidation = () => {
    const { companyCode, companyName, businessVertical, city, state, country } = this.state
    let isValid = true
    const errors = {};

    if (companyName == "") { errors.companyName = "Company Name should be specified"; isValid = false }
    if (companyCode == "") { errors.companyCode = "Company Code should be specified"; isValid = false }
    if (businessVertical == "") { errors.businessVertical = "Business Vertical should be specified"; isValid = false }
    if (city == "") { errors.city = "City should be specified"; isValid = false }
    if (state == "") { errors.state = "State should be specified"; isValid = false }
    if (country == "") { errors.country = "Country should be specified"; isValid = false }

    this.setState({ errors });
    return isValid;
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.formValidation();

    if (isValid) {
      const form_data = new FormData();

      if (this.state.logo != null) {
        form_data.append('logo', this.state.logo, this.state.logo.name);
      }

      form_data.append('Company Name', this.state.companyName);
      form_data.append('Company Code', this.state.companyCode);
      form_data.append('Business Vertical', this.state.businessVertical);
      form_data.append('Pan Or Taxid', this.state.panOrTaxid);
      form_data.append('Gst No', this.state.gstNo);
      form_data.append('Description', this.state.description);
      form_data.append('Address Line1', this.state.addressLine1);
      form_data.append('Address Line2', this.state.addressLine2);
      form_data.append('State', this.state.state);
      form_data.append('City', this.state.city);
      form_data.append('Country', this.state.country);
      form_data.append('Zip Code', this.state.zipCode);
      form_data.append('Active', this.state.checked);

      const url = process.env.API_URL + process.env.API_VERSION + '/companies/';
      axios.post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
        .then(res => {
          console.log(res.data);
          this.props.history.push('/companies')
        })
        .catch(err => console.log(err))
    }
  };


  render() {
    const { classes } = this.props;
    const { touched, errors } = this.state

    const isTouched_companyName=touched.companyName
    const errors_companyName=errors.companyName
    
    const isTouched_companyCode=touched.companyCode
    const errors_companyCode=errors.companyCode

    const isTouched_vertical=touched.businessVertical
    const errors_vertical=errors.businessVertical

    const isTouched_state=touched.state
    const errors_state=errors.state

    const isTouched_city=touched.city
    const errors_city=errors.city

    const isTouched_country=touched.country
    const errors_country=errors.country

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
            <Card>
              <form onSubmit={this.handleSubmit}>

                <CardHeader
                  subheader="The information can be edited"
                  title="Company"
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
                        value={this.state.companyName}
                        helperText={touched.companyName ? errors.companyName : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.companyName && Boolean(errors.companyName)}
                        id="companyName"
                        label="Company Name"
                        name="companyName"
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
                        id="companyCode"
                        label="Company Code"
                        name="companyCode"
                        margin="dense"
                        value={this.state.companyCode}
                        helperText={touched.companyCode ? errors.companyCode : ""}
                        type="text"
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.companyCode && Boolean(errors.companyCode)}
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
                        id="businessVertical"
                        name="businessVertical"
                        value={this.state.businessVertical}
                        label="Business Vertical"
                        helperText={touched.businessVertical ? errors.businessVertical : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.businessVertical && Boolean(errors.businessVertical)}
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
                        id="panOrTaxid"
                        name="panOrTaxid"
                        value={this.state.panOrTaxid}
                        label="Pan Or Taxid"
                        helperText={touched.appURL ? errors.appURL : ""}
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
                      <TextField
                        margin="dense"
                        id="gstNo"
                        name="gstNo"
                        value={this.state.gstNo}
                        label="Gst No."
                        helperText={touched.appURL ? errors.appURL : ""}
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
                      <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        value={this.state.description}
                        label="Description"
                        helperText={touched.appURL ? errors.appURL : ""}
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
                      Company Logo <TextField
                        id="Logo"
                        name="Logo"
                        label="Company Logo"
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
                      <TextField
                        margin="dense"
                        id="addressLine1"
                        name="addressLine1"
                        value={this.state.addressLine1}
                        label="Address Line 1"
                        helperText={touched.appURL ? errors.appURL : ""}
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
                      <TextField
                        margin="dense"
                        id="addressLine2"
                        name="addressLine2"
                        value={this.state.addressLine2}
                        label="Address Line 2"
                        helperText={touched.appURL ? errors.appURL : ""}
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
                      <TextField
                        margin="dense"
                        id="state"
                        name="state"
                        value={this.state.state}
                        label="State"
                        helperText={touched.state ? errors.state : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.state && Boolean(errors.state)}
                        variant="outlined"
                      //   shrink={(values.appURL) ? true : false}
                      />
                  
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        value={this.state.city}
                        label="City"
                        // helperText={touched.city ? errors.city : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.city && Boolean(errors.city)}
                        variant="outlined"
                      //   shrink={(values.appURL) ? true : false}
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
                        name="country"
                        value={this.state.country}
                        label="Country"
                        helperText={touched.country ? errors.country : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.country && Boolean(errors.country)}
                        variant="outlined"
                      //   shrink={(values.appURL) ? true : false}
                      />
                  
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        margin="dense"
                        id="zipCode"
                        name="zipCode"
                        value={this.state.zipCode}
                        label="Zip Code"
                        helperText={touched.appURL ? errors.appURL : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        //error={touched.appURL && Boolean(errors.appURL)}
                        variant="outlined"
                      //   shrink={(values.appURL) ? true : false}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      Is_Active <Checkbox
                        id="active"
                        name="Active"
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
                    Save Company
                </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    component={this.CustomRouterLink}
                    to={"/companies"}

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
)(withStyles(styles, { withTheme: true })(AddApplication)));