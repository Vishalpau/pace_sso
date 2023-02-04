import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Grid, Card, Typography, CardContent, TextField, Button, ListItemText } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { UserActions } from '../../user/UserActions';



const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  contentTitle: {
    fontSize: '30px',
    lineHeight: '50px',
    fontFamily: 'xolonium',
    color: '#054D69',
    paddingBottom: '5px',
    borderBottom: '1px solid #d6d9da',
    marginBottom: '5px',
    [theme.breakpoints.down("md")]: {
      fontSize: '22px',
      lineHeight: '40px',
    },
  },


  custmSubmitBtn: {
    textTransform: 'capitalize',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: '#06374a',
      color: '#ffffff',
    }
  },
  custmCancelBtn: {
    textTransform: 'capitalize',
    marginLeft: '5px',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: '#f28705',
      color: '#ffffff',
    }
  },
  formBox: {
    position: 'relative',
    padding: '5px 12px !important',
    '& .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#06374a',
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#06374a',
    },
    '& .MuiBadge-badge': {
      left: '0px',
      right: 'auto',
      borderRadius: '3px',
    },
  },
  formControl: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px',
    },
  },

  addressCardSection: {
    padding: '16px',
  },
  addAddCardBox: {
    minHeight: '260px',
    border: '1px dashed #ccc',
    '& .MuiCardContent-root': {
      padding: '0px',
      '& button': {
        width: '100%',
        height: '260px',
        display: 'block',
        '& svg': {
          fontSize: '65px',
          color: '#054D69',
        },
        '& .MuiTypography-root': {
          fontSize: '20px',
          color: '#054D69',
          fontFamily: 'Montserrat-Medium',
          lineHeight: '30px',
        },
      },
      '& button:focus': {
        outline: 'none',
      },
    },
  },
  addressViewBox: {
    minHeight: '260px',
    position: 'relative',
  },
  toNameText: {
    fontSize: '16px',
    color: '#054D69',
    fontFamily: 'Montserrat-Medium',
    lineHeight: '20px',
  },
  addressTest: {
    fontSize: '14px',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: '24px',
  },
  addressActionBox: {
    position: 'absolute',
    display: 'block',
    bottom: '0px',
    width: '100%',
    '& button': {
      fontSize: '16px',
      color: '#054D69',
      fontFamily: 'Montserrat-Medium',
      lineHeight: '20px',
    },
    '& button:focus': {
      outline: 'none',
    },
  },

  addressFormSection: {
    paddingBottom: '20px',
    paddingTop: '10px',
    '& .MuiGrid-item': {
      float: 'left',
      width: '100%',
    },
    '& textarea': {
      padding: '0px !important',
    },
  },
  addressTypeBox: {
    '& .MuiFormControlLabel-root': {
      marginBottom: '0px',
    },
    '& .MuiRadio-colorPrimary.Mui-checked': {
      color: '#f28705',
    },
  },
  companyOperatingView: {
    '& .MuiListItemText-primary': {
      fontSize: '13px',
      color: '#06374a',
      fontFamily: 'Montserrat-Regular',
    },
    '& .MuiListItemText-secondary': {
      fontSize: '15px',
      color: '#06374a',
      fontFamily: 'Montserrat-Medium',
      lineHeight: '26px',
    },
  },
});



class Company extends React.Component {

  constructor(props) {
    super(props);


    this.action = new UserActions(this.props.dispatch);
  }

  state = {
    addressFormShow: false,
    editForm: false,
    open: false,
    addressData: [],
    addressDelete: {},
    address: { locationId: "", companyId: "", addressLineOne: "", addressLineTwo: "", locationName: "", landmark: "", postalCode: "", country: "", state: "", city: "", panOrTaxid: "", gstNo: "", },
    errors: {},
    touched: {},
    user: {},



  }

  countries = [
    {
      value: 'select-country',
      label: 'Select Country',
    },
    {
      value: 'India',
      label: 'India',
    },
    {
      value: 'Nepal',
      label: 'Nepal',
    },
    {
      value: 'SriLanka',
      label: 'Sri Lanka',
    },
    {
      value: 'Chin',
      label: 'Chin',
    },
    {
      value: 'Pakistan',
      label: 'Pakistan',
    },
  ];
  cstates = [
    {
      value: 'select-contrystate',
      label: 'Select State',
    },
    {
      value: 'Maharashtra',
      label: 'Maharashtra',
    },
    {
      value: 'Uttar Pradesh',
      label: 'Uttar Pradesh',
    },
    {
      value: 'Delhi',
      label: 'Delhi',
    },
    {
      value: 'Gujrat',
      label: 'Gujrat',
    },
    {
      value: 'Madhya Pradesh',
      label: 'Madhya Pradesh',
    },
  ];
  cities = [
    {
      value: 'select-cities',
      label: 'Select City',
    },
    {
      value: 'Mumbai',
      label: 'Mumbai',
    },
    {
      value: 'Delhi',
      label: 'Delhi',
    },
    {
      value: 'Indore',
      label: 'Indore',
    },
    {
      value: 'Surat',
      label: 'Surat',
    },
    {
      value: 'Lakhnau',
      label: 'Lakhnau',
    },
  ];

  handleLocationForm = () => {
    this.setState({errors: {}})
    this.setState({address: { locationId: "", companyId: "", addressLineOne: "", addressLineTwo: "", locationName: "", landmark: "", postalCode: "", country: "", state: "", city: "", panOrTaxid: "", gstNo: "", }})
    this.setState({ addressFormShow: !this.state.addressFormShow })
    console.log({form:this.state.editForm})

    this.setState({ editForm: false })
    console.log({formnew:this.state.editForm})


  }

  handleTouch = (e) => {
    let { touched } = this.state
    if (e.target.name && touched[e.target.name] != true) {
      touched[e.target.name] = true;
      this.setState({ touched })
    }
  }

  newAddressHandler = (e) => {
    e.persist();
    this.setState(prevState => ({
      address: { ...prevState.address, [e.target.name]: e.target.value }
    }))
    console.log({ newhandleraddress: this.state.address })

  }

  handleEditLocationFormShow = (index) => {
    this.setState({errors: {}})
    console.log({ id: index })
    this.setState({ editForm: true })
    console.log({formedit:this.state.editForm})
    this.setState({ addressFormShow: !this.state.addressFormShow })
    const locationEdit = this.state.addressData[index]
    // console.log({ getid: locationEdit })

    const fkCompanyId = localStorage.getItem('companyId')


    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + fkCompanyId + '/locations/' + locationEdit.locationId + '/',
      method: 'GET',
      // data:this.state.address,
    }).then((res) => {
      console.log({ result: res })

      this.setState({ address: res.data.data.results })
      console.log({ addressData: this.state.address })

    }).catch((err) => {
      console.log({ error: err })

    })

  }

  handleToggle = (index) => {
    console.log({ inddex_data: this.state.addressData[index] })
    const addressremove = this.state.addressData[index]
    this.setState({ addressDelete: addressremove })
    console.log({ addressde: addressremove })


    this.setState({
      open: !this.state.open
    })
  }

  handleYes = () => {
    this.setState({ open: false })
    const fkCompanyId = localStorage.getItem('companyId')
    const id = this.state.addressDelete.locationId
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + fkCompanyId + '/locations/' + id + '/',
      method: 'DELETE',
    }).then((res) => {
      +
        console.log({ result: res })
      this.action.openSnackbar('Adress deleted succesfully')
      this.handleListCard()
      this.action.showSnackbar
    }).catch((err) => {
      console.log({ err: err })
    })

  }

  handleNo = () => {
    this.setState({ open: false })
  }

  handleLocationFormSave = (locationId) => {
    const isValid = this.formValidation();
    if (isValid) {
      this.setState({ addressFormShow: !this.state.addressFormShow })
      var data = this.state.address
      const fkCompanyId = localStorage.getItem('companyId')

      console.log({ data: this.state.address })

      if (!this.state.editForm) {
        axios({
          url: process.env.API_URL + process.env.API_VERSION + '/companies/' + fkCompanyId + '/locations/',
          method: 'POST',
          data: this.state.address,
        }).then((res) => {
          console.log({ result: res })
          this.action.openSnackbar('Location Added succesfully')
          this.handleListCard()
          this.action.showSnackbar
        }).catch((err) => {
          console.log({ err: err })
          this.setState({ loading: false })
          if (err.response && err.response.status == 400) {
            this.action.openSnackbar(err.response.data.data.results, true)
            this.action.showSnackbar
          }
        })
      }
      else {

        axios({
          url: process.env.API_URL + process.env.API_VERSION + '/companies/' + fkCompanyId + '/locations/' + locationId + '/',
          method: 'PUT',
          data: this.state.address,
        }).then((res) => {
          console.log({ result: res })
          this.action.openSnackbar('Location Updated succesfully')
          this.handleListCard()
          this.action.showSnackbar
          this.setState({ address: res.data.data.results })
          console.log({ addressData: this.state.address })

        }).catch((err) => {
          console.log({ error: err })

        })

      }
    }
    else {
      this.setState({
        touched: {
          'addressLineOne': true,
          'addressLineTwo': true,
          'locationName': true,
          'landmark': true,
          'city': true,
          'postalCode': true,
          'country': true,
          'state': true,
          'panOrTaxid': true,
          'gstNo': true,


        }
      })

    }
  }

  formValidation = () => {
    const { address } = this.state
    let isValid = true
    const errors = {};

    if (address.locationName == "") {
      errors.locationName = "Location name should be specified"
      isValid = false
    }

    if (address.landmark == "") {
      errors.landmark = "Landmark should be specified"
      isValid = false
    }

    if (address.addressLineOne == "") {
      errors.addressLineOne = "Address One should be specified"
      isValid = false
    }

    if (address.addressLineTwo == "") {
      errors.addressLineTwo = "Address Two should be specified"
      isValid = false
    }


    if (address.city == "") {
      errors.city = "City should be specified"
      isValid = false
    }

    if (address.postalCode == "") {
      errors.postalCode = "Postal Code should be specified"
      isValid = false
    }

    if (address.country == "") {
      errors.country = "Country should be specified"
      isValid = false
    }

    if (address.state == "") {
      errors.state = "State should be specified"
      isValid = false
    }

    if (address.panOrTaxid == "") {
      errors.panOrTaxid = "panOrTaxid Tag should be specified"
      isValid = false
    }
    if (address.gstNo == "") {
      errors.gstNo = "panOrTaxid Tag should be specified"
      isValid = false
    }
    this.setState({ errors }, () => console.log({ errors: this.state.errors }));

    return isValid;
  }

  componentDidMount() {

    this.handleListCard()

  }

  handleListCard = (e) => {
    const fkCompanyId = localStorage.getItem('companyId')
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + fkCompanyId + '/locations/',
      method: 'GET',
      // data:this.state.address,
    }).then((res) => {
      console.log({ result: res })
      this.setState({ addressData: res.data.data.results })
      console.log({ addressData: this.state.addressData })

    }).catch((err) => {
      console.log({ error: err })

    })


  }

  render() {
    const { classes } = this.props;
    const { touched, errors, addressData } = this.state
    // console.log({ addressdata: this.state.addressData })
    return (
      <Fragment>
        <Dialog className={classes.dialogSection} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogContent>
            <ListItemText className={classes.dialogTitle} primary="Are you sure to delete Address ?" />
            <DialogActions>
              <Button onClick={() => this.handleYes(this.state.address.locationId)} variant="outlined" className={classes.popupBtn}>
                Yes
              </Button>
              <Button onClick={this.handleNo} variant="outlined" className={classes.popupBtn}>
                No
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
        <div className={classes.root}>
          <Grid
            container
            spacing={4}
          >
            <Grid item md={12} xs={12} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">Operating Location</Typography>
            </Grid>
            <Grid item md={12} xs={12}>
              <Card className={classes.addressCardSection}>
                <Grid
                  container
                  spacing={4}
                  hidden={this.state.addressFormShow}
                  className={classes.addressViewSection}
                >
                  {addressData.map((address, index) => (
                    // console.log({address:address})
                    <Grid
                      item
                      md={3}
                      xs={12}
                    //className={classes.formBox}
                    >
                      <Card className={classes.addressViewBox}>
                        <CardContent>
                          <Typography className={classes.toNameText} gutterBottom >{address.locationName}</Typography>
                          <Typography className={classes.addressTest} >{address.addressLineOne}</Typography>
                          <Typography className={classes.addressTest} >{address.addressLineTwo}</Typography>
                          <Typography className={classes.addressTest} >{address.landmark}</Typography>
                          <Typography className={classes.addressTest} >{address.postalCode}</Typography>
                          <Typography className={classes.addressTest} >{address.country}</Typography>
                        </CardContent>
                        <CardActions className={classes.addressActionBox}>
                          <IconButton aria-label="edit">
                            <EditIcon onClick={() => this.handleEditLocationFormShow(index)} />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={() => this.handleToggle(index)}>
                            <DeleteIcon />
                          </IconButton>
                          {/* <IconButton className={classes.addressTabBox} aria-label="delete">
                                    <Tooltip title="Home" placement="top">
                                    <LocalOfferIcon />
                                    </Tooltip>
                                </IconButton> */}
                        </CardActions>
                      </Card>

                    </Grid>

                  ))}
                  <Grid
                    item
                    md={3}
                    xs={12}
                  //className={classes.formBox}
                  >
                    <Card className={classes.addAddCardBox}>
                      <CardContent>
                        <Button onClick={this.handleLocationForm}>
                          <AddIcon />
                          <Typography variant="h5" component="h2" className={classes.addAddressBtn}>New Location</Typography>
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={4}
                  hidden={!this.state.addressFormShow}
                  className={classes.addressFormSection}
                >
                  <Grid
                    item
                    md={12}
                    xs={12}
                    className={classes.formBox}
                  >
                    <ListItemText className={classes.companyOperatingView}/>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="address Line One*"
                      margin="dense"
                      name="addressLineOne"
                      id="addressLineOne"
                      multiline
                      rows={2}
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.addressLineOne ? errors.addressLineOne : ""}
                      value={this.state.address.addressLineOne}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.addressLineOne && Boolean(errors.addressLineOne)}
                      hidden={!this.state.addressFormShow}
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="address Line Two"
                      margin="dense"
                      name="addressLineTwo"
                      id="addressLineTwo"
                      multiline
                      rows={2}
                      // defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.addressLineTwo ? errors.addressLineTwo : ""}
                      value={this.state.address.addressLineTwo}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.addressLineTwo && Boolean(errors.addressLineTwo)}
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="Location Name*"
                      margin="dense"
                      name="locationName"
                      id="locationName"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.locationName ? errors.locationName : ""}
                      value={this.state.address.locationName}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.locationName && Boolean(errors.locationName)}
                      className={classes.formControl}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="Landmark"
                      margin="dense"
                      name="landmark"
                      id="landmark"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.landmark ? errors.landmark : ""}
                      value={this.state.address.landmark}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.landmark && Boolean(errors.landmark)}
                      className={classes.formControl} />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="Country*"
                      margin="dense"
                      name="country"
                      id="country"
                      select
                      fullWidth
                      variant="outlined"
                      value={this.state.address.country}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      error={touched.country && Boolean(errors.country)}

                      hidden={!this.state.addressFormShow}
                    >
                      {this.countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="State*"
                      margin="dense"
                      name="state"
                      id="state"
                      select
                      fullWidth
                      variant="outlined"
                      value={this.state.address.state}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      error={touched.state && Boolean(errors.state)}
                    >
                      {this.cstates.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="City*"
                      margin="dense"
                      name="city"
                      id="city"
                      select
                      fullWidth
                      variant="outlined"
                      value={this.state.address.city}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      className={classes.formControl}
                      error={touched.city && Boolean(errors.city)}
                    >
                      {this.cities.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="Postal Code*"
                      margin="dense"
                      name="postalCode"
                      id="postalCode"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.postalCode ? errors.postalCode : ""}
                      value={this.state.address.postalCode}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow} />
                  </Grid>
                  {/* <Grid
                                item
                                md={6}
                                xs={12}
                                className={classes.formBox}
                            >
                                <FormControl margin="dense" component="fieldset" className={classes.addressTypeBox}>
                                <FormLabel component="legend">Address Tag</FormLabel>
                                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                    <FormControlLabel value="home" control={<Radio color="primary" />} label="Home" />
                                    <FormControlLabel value="work" control={<Radio color="primary" />} label="Work" />
                                    <FormControlLabel value="billing" control={<Radio color="primary" />} label="Billing" />
                                    <FormControlLabel value="other" control={<Radio color="primary" />} label="Other" />
                                </RadioGroup>
                                </FormControl>
                            </Grid> */}
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="Pan Or Tax ID"
                      margin="dense"
                      name="panOrTaxid"
                      id="panOrTaxid"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.panOrTaxid ? errors.panOrTaxid : ""}
                      value={this.state.address.panOrTaxid}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.panOrTaxid && Boolean(errors.panOrTaxid)}
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow} />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={classes.formBox}
                  >
                    <TextField
                      label="GST No"
                      margin="dense"
                      name="gstNo"
                      id="gstNo"
                      defaultValue=""
                      fullWidth
                      variant="outlined"
                      helperText={touched.gstNo ? errors.gstNo : ""}
                      value={this.state.address.gstNo}
                      onChange={(e) => { this.newAddressHandler(e); }}
                      onBlur={(e) => { this.handleTouch(e); }}
                      error={touched.gstNo && Boolean(errors.gstNo)}
                      className={classes.formControl}
                      hidden={!this.state.addressFormShow} />
                  </Grid>
                  <Grid
                    item
                    md={12}
                    xs={12}
                    className={classes.formBox}
                  >
                    <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={() => this.handleLocationFormSave(this.state.address.locationId)}>Save</Button>
                    <Button variant="outlined" size="medium" className={classes.custmCancelBtn} onClick={this.handleLocationForm}>Cancel</Button>
                  </Grid>

                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}


Company.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Company)));