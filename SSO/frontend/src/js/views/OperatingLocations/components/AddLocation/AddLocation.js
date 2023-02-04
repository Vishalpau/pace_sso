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

class AddLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      values: [],
      locations: [],
      loc_id: "",
      company_id: "",
      companies: [],
      location: {
        companyId: "",
        LocationName: "",
        addressLineOne: "",
        addressLineTwo: "",
        landmark: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        panOrTaxid: "",
        gstNo: "",
      },
    };
  }

  //   getCompanies=()=>{
  //     axios({
  //         url: process.env.API_URL + process.env.API_VERSION + '/companies/',
  //         method: 'GET',
  //       }).then((res) => {
  //         this.setState({ company: res.data.data.results })

  //       }).catch((err) => {
  //         console.log(err)

  //       })
  //   }

  componentDidMount() {
    const companyId = this.props.route.match.params.companyId;
    const locationId = this.props.route.match.params.locationId;
    this.setState({ company_id: this.props.route.match.params.companyId });
    this.setState({ loc_id: this.props.route.match.params.locationId });

    console.log({ props: this.props });

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

    if (locationId) {
      axios({
        url:
          process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/locations/" +
          locationId +
          "/",
        method: "GET",
      })
        .then((res) => {
          this.setState({ location: res.data.data.results });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  handleChangeFile = (event) => {
    this.setState({
      logo: event.target.files[0],
    });
  };

  validationSchema = Yup.object().shape({
    companyId: Yup.string().required("company name field is Required"),
    LocationName: Yup.string().required("Location name field is Required"),
    addressLineOne: Yup.string().required("address is required"),
    postalCode: Yup.string().required("postalCode field is Required"),
    city: Yup.string().required("city field is Required"),
    state: Yup.string().required("state field is Required"),
    country: Yup.string().required("country field is Required"),
  });
  render() {
    const { classes } = this.props;
    //const {companies}=this.state;
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
                initialValues={this.state.location}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(
                  values,
                  { setSubmitting, setFieldError, resetForm }
                ) => {
                  const data = new FormData();

                  if (!this.state.loc_id) {
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/companies/" +
                        this.state.company_id +
                        "/locations/",
                      method: "POST",
                      data: {
                        companyId: values.companyId,
                        LocationName: values.LocationName,
                        addressLineOne: values.addressLineOne,
                        addressLineTwo: values.addressLineTwo,
                        landmark: values.landmark,
                        description: values.description,
                        city: values.city,
                        state: values.state,
                        postalCode: values.postalCode,
                        country: values.country,
                        panOrTaxid: values.panOrTaxid,
                        gstNo: values.gstNo,
                      },
                    })
                      .then((res) => {
                        resetForm({ values: "" });
                        this.props.history.push(
                          "/locations/" + this.state.company_id
                        );
                      })
                      .catch((err) => {
                        console.log({ error: err });
                        return;
                        const errData = err.response.data;

                        var tifOptions = Object.keys(errData).map(function (
                          key
                        ) {
                          return setFieldError(`${key}`, `${errData[key][0]}`);
                        });
                      });
                  } else {
                    axios({
                      url:
                        process.env.API_URL +
                        process.env.API_VERSION +
                        "/companies/" +
                        this.state.company_id +
                        "/locations/" +
                        this.state.loc_id +
                        "/",
                      method: "PUT",
                      data: {
                        companyId: values.companyId,
                        LocationName: values.LocationName,
                        addressLineOne: values.addressLineOne,
                        addressLineTwo: values.addressLineTwo,
                        landmark: values.landmark,
                        description: values.description,
                        city: values.city,
                        state: values.state,
                        postalCode: values.postalCode,
                        country: values.country,
                        panOrTaxid: values.panOrTaxid,
                        gstNo: values.gstNo,
                      },
                    })
                      .then((res) => {
                        this.props.history.push(
                          "/locations/" + this.state.company_id
                        );
                      })
                      .catch((err) => {
                        console.log({ error: err });
                        return;
                        const errData = err.response.data;

                        var tifOptions = Object.keys(errData).map(function (
                          key
                        ) {
                          return setFieldError(`${key}`, `${errData[key][0]}`);
                        });
                      });
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
                      title="Locations"
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
                            margin="dense"
                            variant="outlined"
                            value={values.LocationName}
                            helperText={
                              touched.LocationName ? errors.LocationName : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.LocationName &&
                              Boolean(errors.LocationName)
                            }
                            id="LocationName"
                            label="LocationName"
                            name="LocationName"
                            shrink={values.LocationName ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            variant="outlined"
                            color="secondary"
                            id="addressLineOne"
                            label="addressLineOne"
                            name="addressLineOne"
                            margin="addressLineOne"
                            value={values.addressLineOne}
                            helperText={
                              touched.addressLineOne
                                ? errors.addressLineOne
                                : ""
                            }
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.addressLineOne &&
                              Boolean(errors.addressLineOne)
                            }
                            fullWidth
                            shrink={values.addressLineOne ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="addressLineTwo"
                            value={values.addressLineTwo}
                            label="addressLineTwo"
                            helperText={
                              touched.addressLineTwo
                                ? errors.addressLineTwo
                                : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.addressLineTwo &&
                              Boolean(errors.addressLineTwo)
                            }
                            variant="outlined"
                            shrink={values.addressLineTwo ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="landmark"
                            value={values.landmark}
                            label="landmark"
                            helperText={touched.landmark ? errors.landmark : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.landmark && Boolean(errors.landmark)}
                            variant="outlined"
                            shrink={values.landmark ? true : false}
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="city"
                            value={values.city}
                            label="city"
                            helperText={touched.city ? errors.city : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.city && Boolean(errors.city)}
                            variant="outlined"
                            shrink={values.city ? true : false}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="state"
                            value={values.state}
                            label="state"
                            helperText={touched.state ? errors.state : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.state && Boolean(errors.state)}
                            variant="outlined"
                            shrink={values.state ? true : false}
                          />
                        </Grid>
                        {/* <Grid
                        item
                        md={6}
                        xs={12}
                      >
            <TextField
                id="logo"
                label="logo"
                name="logo"
                value={values.logo}
                type="file"
                onChange={this.handleChangeFile}  
            />
                      </Grid> */}

                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="postalCode"
                            value={values.postalCode}
                            label="postalCode"
                            helperText={
                              touched.postalCode ? errors.postalCode : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.postalCode && Boolean(errors.postalCode)
                            }
                            variant="outlined"
                            shrink={values.postalCode ? true : false}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="country"
                            value={values.country}
                            label="country"
                            helperText={touched.country ? errors.country : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.country && Boolean(errors.country)}
                            variant="outlined"
                            shrink={values.country ? true : false}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="panOrTaxid"
                            value={values.panOrTaxid}
                            label="panOrTaxid"
                            helperText={
                              touched.panOrTaxid ? errors.panOrTaxid : ""
                            }
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.panOrTaxid && Boolean(errors.panOrTaxid)
                            }
                            variant="outlined"
                            shrink={values.panOrTaxid ? true : false}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            margin="dense"
                            id="gstNo"
                            value={values.gstNo}
                            label="gstNo"
                            helperText={touched.gstNo ? errors.gstNo : ""}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.gstNo && Boolean(errors.gstNo)}
                            variant="outlined"
                            shrink={values.gstNo ? true : false}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button color="primary" variant="contained" type="submit">
                        Save Location
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
            Location Added Successfully!
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
  )(withStyles(styles, { withTheme: true })(AddLocation))
);
