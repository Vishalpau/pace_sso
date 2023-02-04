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

class EditCompany extends React.Component {

  state = {
    snackbarOpen: false,
    logo: null,
    companies: {
      companyName: "",
      companyCode: "",
      businessVertical: "",
      state: "",
      city: "",
      country: "",
      addressLine1: "",
      addressLine2: "",
      description: "",
      gstNo: "",
      panOrTaxid: "",
      zipCode: "",
      Active: false
    },
    errors: {},
    touched: {}
  }

  componentDidMount = () => {

    const companyId = this.props.route.match.params.companyId;
    axios.get(process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/')
      .then(res => {
        this.setState({ companies: res.data.data.results })
        console.log(companies)
          ;
      })
      .catch(err => console.log(err))
  }

  handleCheckboxChange = (event) => {
    event.preventDefault();
    const { companies } = this.state
    //console.log("value"+[companies.active])
    this.setState({ [companies.Active]: event.target.checked })
    this.state.companies.Active = event.target.checked
    //console.log("value2"+[application.active])

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
      companies: { ...prevState.companies, [e.target.name]: e.target.value }
    }))

  }
  handleTouch = (e) => {
    let { touched } = this.state
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched })
    }
  }

  formValidation = () => {
    const { companyCode, companyName, businessVertical, city, state, country } = this.state.companies
    let isValid = true
    const errors = {};

    if (companyName == "") { errors.companyName = "companyName should be specified"; isValid = false }
    if (companyCode == "") { errors.companyCode = "company code should be specified"; isValid = false }
    if (businessVertical == "") { errors.businessVertical = "businessVertical should be specified"; isValid = false }
    if (city == "") { errors.city = "city should be specified"; isValid = false }
    if (state == "") { errors.state = "State should be specified"; isValid = false }
    if (country == "") { errors.country = "Country should be specified"; isValid = false }

    this.setState({ errors });
    return isValid;
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
      const companyId = this.props.route.match.params.companyId;

      const form_data = new FormData();

      if (this.state.logo != null) {
        form_data.append('logo', this.state.logo, this.state.logo.name);
      }
      form_data.append('companyName', this.state.companies.companyName);
      form_data.append('companyCode', this.state.companies.companyCode);
      form_data.append('businessVertical', this.state.companies.businessVertical);
      form_data.append('panOrTaxid', this.state.companies.panOrTaxid);
      form_data.append('gstNo', this.state.companies.gstNo);
      form_data.append('description', this.state.companies.description);
      form_data.append('addressLine1', this.state.companies.addressLine1);
      form_data.append('addressLine2', this.state.companies.addressLine2);
      form_data.append('state', this.state.companies.state);
      form_data.append('city', this.state.companies.city);
      form_data.append('country', this.state.companies.country);
      form_data.append('zipCode', this.state.companies.zipCode);
      form_data.append('Active', this.state.companies.Active);

      const url = process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/';
      axios.put(url, form_data, {
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
    else {
      alert("invalid form")
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
                  title="Companies"
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
                        value={this.state.companies.companyName}
                        helperText={touched.companyName ? errors.companyName : ""}
                        type="text"
                        fullWidth
                        onChange={(e) => { this.handleChange(e); this.formValidation(); }}
                        onBlur={(e) => { this.handleTouch(e); this.formValidation(); }}
                        error={touched.companyName && Boolean(errors.companyName)}
                        id="companyName"
                        label="companyName"
                        name="companyName"
                      //shrink={(this.state.companyName) ? true : false}
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
                        label="companyCode"
                        name="companyCode"
                        margin="dense"
                        value={this.state.companies.companyCode}
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
                        value={this.state.companies.businessVertical}
                        label="businessVertical"
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
                        value={this.state.companies.panOrTaxid}
                        label="panOrTaxid"
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
                      <TextField
                        margin="dense"
                        id="gstNo"
                        name="gstNo"
                        value={this.state.companies.gstNo}
                        label="gstNo"
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
                      <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        value={this.state.companies.description}
                        label="description"
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
                      <img
                        id="logo"
                        name="logo"
                        label="logo"
                        src={this.state.companies.logo}
                        aria-readonly
                        class={classes.logo}
                      />
                      <TextField
                        id="logo"
                        name="logo"
                        label="Company logo"
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
                        value={this.state.companies.addressLine1}
                        label="addressLine1"
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
                      <TextField
                        margin="dense"
                        id="addressLine2"
                        name="addressLine2"
                        value={this.state.companies.addressLine2}
                        label="addressLine2"
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
                      <TextField
                        margin="dense"
                        id="state"
                        name="state"
                        value={this.state.companies.state}
                        label="state"
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
                        value={this.state.companies.city}
                        label="city"
                        helperText={touched.city ? errors.city : ""}
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
                        value={this.state.companies.country}
                        label="country"
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
                        value={this.state.companies.zipCode}
                        label="zipCode"
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
                      Is_Active <Checkbox
                        id="active"
                        name="Active"
                        label="Is Active"
                        checked={this.state.companies.Active}
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
                    Edit Company
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
            Company details updated Successfully!
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
)(withStyles(styles, { withTheme: true })(EditCompany)));