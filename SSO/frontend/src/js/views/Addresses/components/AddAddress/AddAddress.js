import React, { useState,forwardRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
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
// import { geolocated } from "react-geolocated";
import { AddAddress } from '..';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

class AddressDetails extends React.Component {
 
  state = {
    user: [],
    snackbarOpen: false,
    values: [],
    addresses: [],
    address: {
      addressTag: '',
      addressLineOne: '',
      addressLineTwo: '',
      state: '',
      city: '',
      country: '',
      postalCode: null,
    },
    address_id: "",
    open:false,
    latitude: '',
    longitude: '',
    details:{
    city:null ,
    state:null,
    country:null,
    postalCode:null
  },
    open:true,
    
}

  // Transition=()=>{
  //    React.forwardRef(function Transition(props, ref) {
  //     return <Slide direction="up" ref={ref} {...props} />;
  //   });
  // }
  

  handleClose = () => {
    this.setState({open:false});
  }

  allowLocation=()=>{
    this.handleClose()
    this.getLocation()
  }


  componentDidMount = () => {
    const addressId = this.props.route.match.params.id;
    this.setState({ address_id: this.props.route.match.params.id })
    const userId = this.props.route.match.params.uuid; 
    console.log({props:this.props}) 
    this.getLocation()

    if (addressId) {
      axios({
        url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/addresses/' + addressId + '/',
        method: 'GET',
      }).then((res) => {
        this.setState({ address: res.data.data.results })

      }).catch((err) => {
        console.log(err)

      })
    }
  }

  // getAddress=(latitude,longitude)=>{
  //   console.log(latitude);
  //   console.log(longitude);     

  // }

  getAddress=(latitude,longitude)=>{

    fetch("https://us1.locationiq.com/v1/reverse.php?key=pk.6e42bf10f16350ae32d146b3b9ae761e&lat="+latitude+"&lon="+longitude+"&format=json")
        .then((response) => response.json())
        .then((responseJson) => {
         const address= JSON.stringify(responseJson.address)
            this.setState({details: JSON.parse(address)})
            // this.setState({state: JSON.stringify(responseJson.address.state)})
            // this.setState({country: JSON.stringify(responseJson.address.country)})
            // this.setState({postalCode: JSON.stringify(responseJson.address.postcode)})
})
   
  }

  getLocation = () => {
    let location = null;
    if (window.navigator && window.navigator.geolocation) {
        location = window.navigator.geolocation
    }
    if (location){
        location.getCurrentPosition(this.showPosition)
      }
    }
    
    showPosition=( position)=> {

           let latitude = position.coords.latitude;
           let longitude= position.coords.longitude;
            console.log(latitude);
            console.log(longitude);     
            this.getAddress(latitude,longitude)

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
    addressTag: Yup.string().required("Please specify Address Tag"),
    addressLineOne: Yup.string().required("Please specify first line of an address"),
    state: Yup.string().required("Please specify the State"),
    city: Yup.string().required("Please specify the City"),
    country: Yup.string().required("Please specify country"),
    postalCode: Yup.number().required("Please specify Postal Code"),
  })

  render() 
  {
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
      setFieldValue,
    } = this.props;
    const userId = this.props.route.match.params.uuid;
    console.log('userid: ' +userId)
    console.log(this.state.details)
    console.log(this.state.details.city)
    console.log(this.state.details.postalCode)



    // const city=this.state.details.city
    // const state=this.state.details.state
    // const country=this.state.details.country
    // const postalCode=this.state.details.postcode
    // console.log(state)
    // console.log(country)
    // console.log(city)
    // console.log(postalCode)

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
                initialValues={this.state.address}
                validationSchema={this.validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting, setFieldError }) => {

                  const data = new FormData()
                  
                  if (!this.state.address_id) {
                    console.log(values)
                    console.log(this.state.details)
                    axios({
                      url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/addresses/',
                      method: 'POST',
                      data: {
                        addressLineOne: values.addressLineOne,
                        addressTag: values.addressTag,
                        addressLineTwo: values.addressLineTwo,
                        state:values.state,
                        city:values.city,
                        country:values.country,
                        postalCode:values.postalCode
                        // state: (this.state.details.state!=''?this.state.details.state:values.state),
                        // city: (this.state.details.city!=''?this.state.details.city:values.city),
                        // country: (this.state.details.country!=''?this.state.details.country:values.country),
                        // postalCode: (this.state.details.postalCode!=null?this.state.details.postalCode:values.postalCode),
                      }


                    }).then((res) => {
                      this.props.history.push('/' + userId + '/addresses')
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
                      url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/addresses/' + this.state.address_id + '/',
                      method: 'PUT',
                      data: {
                        addressLineOne: values.addressLineOne,
                        addressTag: values.addressTag,
                        addressLineTwo: values.addressLineTwo,
                        state:values.state,
                        city:values.city,
                        country:values.country,
                        postalCode:values.postalCode,
                        // state: (this.state.details.state!=''?this.state.details.state:values.state),
                        // city: (this.state.details.city!=''?this.state.details.city:values.city),
                        // country: (this.state.details.country!=''?this.state.details.country:values.country),
                        // postalCode: (this.state.details.postalCode!=null?this.state.details.postalCode:values.postalCode),
                      }
                    }).then((res) => {
                      this.props.history.push('/' + userId + '/addresses')
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
                    title="Address"
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
                          id="addressTag"
                          value={values.addressTag}
                          label="Address Tag"
                          helperText={touched.addressTag ? errors.addressTag : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.addressTag && Boolean(errors.addressTag)}
                          variant="outlined"
                          shrink={(values.addressTag) ? 1 : 0}

                        />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="addressLineOne"
                          value={values.addressLineOne}
                          label="Address Line One"
                          helperText={touched.addressLineOne ? errors.addressLineOne : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.addressLineOne && Boolean(errors.addressLineOne)}
                          variant="outlined"
                          shrink={(values.addressLineOne) ? 1 : 0}
                        />
                      </Grid>

                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="addressLineTwo"
                          value={values.addressLineTwo}
                          label="Address Line Two"
                          helperText={touched.addressLineTwo ? errors.addressLineTwo : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.addressLineTwo && Boolean(errors.addressLineTwo)}
                          variant="outlined"
                          shrink={(values.addressLineTwo) ? 1 : 0}
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
                          value={(values.state=(this.state.details.state!=null?this.state.details.state:values.state))}
                          label="State"
                          helperText={touched.state ? errors.state : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.state && Boolean(errors.state)}
                          variant="outlined"
                          shrink={values.state!='' ? 1 : 0}
                          //disabled={state!=''?true:false}
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
                          value={(values.city=(this.state.details.city!=null?this.state.details.city:values.city))}
                          label="City"
                          helperText={touched.city ? errors.city : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.city && Boolean(errors.city)}
                          variant="outlined"
                          shrink={(values.city) ? 1 : 0}
                         // disabled={city!=''?true:false}
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          margin="dense"
                          id="postalCode"
                          value={(values.postalCode=(this.state.details.postalCode!=null?this.state.details.postalCode:values.postalCode))}
                          label="Postal Code"
                          helperText={touched.postalCode ? errors.postalCode : ""}
                          type="number"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.postalCode && Boolean(errors.postalCode)}
                          variant="outlined"
                          shrink={(values.postalCode) ? 1 : 0}
                         // disabled={postalCode!=''?true:false}
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
                          value={(values.country=(this.state.details.country!=null?this.state.details.country:values.country))}
                          label="Country"
                          helperText={touched.country ? errors.country : ""}
                          type="text"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.country && Boolean(errors.country)}
                          variant="outlined"
                          shrink={(values.country) ? 1 : 0}
                         // disabled={country!=''?true:false}
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
          </Grid>
        </Grid>
        <Snackbar open={this.state.snackbarOpen || this.props.status} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Employee Added Successfully!
      </Alert>
        </Snackbar>
        {/* <div>
      <Dialog
        open={this.state.open}
        //TransitionComponent={this.Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let PACE help apps determine location. This means sending anonymous location data to
            PACE, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={this.allowLocation} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div> */}
      </div>
    );
  }
}



function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }



export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AddressDetails)));

         