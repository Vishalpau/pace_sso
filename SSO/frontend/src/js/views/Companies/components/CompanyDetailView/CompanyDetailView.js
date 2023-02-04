import React, { useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import moment from 'moment';
import { connect } from 'react-redux';
// import { UserActions } from '../';
import { UserActions } from '../../../../user/UserActions';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import ReactToPrint from "react-to-print";
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { Fragment } from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Page from '../../../../../components/Page';
import BusinessIcon from '@material-ui/icons/Business';

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4)
  },
  contentTitle: {
    fontSize: '30px',
    lineHeight: '50px',
    fontFamily: 'xolonium',
    color: '#054D69',
    paddingBottom: '5px',
    borderBottom: '1px solid #d6d9da',
    marginBottom: '0px',
    [theme.breakpoints.down("md")]: {
      fontSize: '22px',
      lineHeight: '40px',
    },
  },
  large: {
    width: '60px',
    height: '60px',
  },
  image: {
    width: '100px',
    height: '40px',
  },
  label: {
    width: '120px',
    height: '0px',
  },
  editFormBtn: {
    padding: '0px !important',
    '& .MuiIconButton-root': {
      float: 'right',
    },
    '& button:focus': {
      outline: 'none !important',
    },
    '& .MuiFab-extended': {
      height: '40px',
      padding: '0 9px',
      minWidth: '40px',
      borderRadius: '50px',
      float: 'right',
      margin: '15px 15px 0px 0px',
      '& svg': {
        fontSize: '18px',
        color: '#054D69',
      },
    },
  },
  // companyViewBox: {
  //   marginTop:'40px',
  // },
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
  userProfileView: {
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
  profileImgBox: {
    position: 'relative',
    '& input': {
      display: 'none',
    },
    '& label': {
      position: 'relative',
    },
    '& .MuiAvatar-root': {
      width: 'auto',
      height: '70px',
      position: 'relative',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
    },
    '& .MuiButtonBase-root': {
      position: 'absolute',
      right: '0px',
      top: '30px',
    },
    '& .MuiSvgIcon-root': {
      color: '#054D69',
    },
  },

});



class CompanyDetailView extends React.Component {

  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
    const { classes } = this.props
    console.log({ props: props })
  }

  state = {
    company: [],
    logo: []
  }

  componentDidMount() {

    const companyId = this.props.route.match.params.companyId
    console.log(companyId)
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ company: res.data.data.results })

    }).catch((err) => {
      console.log(err)

    })
  }

  handleLogoUpload = (e) => {
    console.log({ data: e.target.files[0] })
    const companyId = localStorage.getItem('companyId')
    const input = new FormData()
    input.append('logo', e.target.files[0])
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/uploadcompanylogo/',
      method: 'PATCH',
      data: input,
    }).then((res) => {
      this.setState({
        logo: res.data.data.results.logo
      })
      localStorage.setItem('companylogo', res.data.data.results.logo);

      this.action.openSnackbar('Company Logo successfully updated')
      this.action.showSnackbar
      // setTimeout(console.log('i m waiting'), 10000);

      // location.reload();

      // setTimeout(location.reload.bind(location), 60000);




      // this.setState({locationShow:false})

    }).catch((err) => {

      console.log(err)

    })
  }


  CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
    // style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));

  render() {
    const { classes } = this.props;
    const company = this.state.company;
    console.log({ logo: this.state.logo })
    console.log({ company: company })

    return (
      <Fragment>
        <Page title="Organization">
          <div className={classes.root}>
            <Grid
              container
              spacing={4}
            >
              <Grid item md={12} xs={12} className={classes.contentSection}>
                <Typography className={classes.contentTitle} varient="h1">Company Details</Typography>
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                xl={12}
                xs={12}
              >

                <Card>
                  {/* <CardHeader
                title="Company Details"
                action={


                  <Button

                    component={this.CustomRouterLink}
                    to={"/companies/editCompany/" + company.companyId}
                    color="primary"
                  // variant="contained"
                  > Edit a

                  </Button>
                }
              /> */}

                  <CardContent className={classes.content}>
                    <Grid
                      container
                      spacing={2}
                      className={classes.companyViewBox}
                    >
                      <Grid
                        item
                        md={6}
                        xs={6}
                        className={classes.profileImgBox}
                      >
                        {/* <BusinessIcon className={classes.large} src={company.logo ? company.logo : 'NA' }></BusinessIcon> */}
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" name="logo" type="file" onChange={(e) => { this.handleLogoUpload(e); }} />
                        <label htmlFor="icon-button-file" className={classes.label}>
                          {(Boolean(company.logo)||Boolean(this.state.logo.length!==0)) ?
                            (<div>
                              <img className={classes.image} src={Boolean(this.state.logo.length!==0)?this.state.logo:company.logo} />
                            </div>)
                            : (<div><BusinessIcon className={classes.large}></BusinessIcon>
                              <IconButton color="primary" aria-label="upload logo" component="span">
                                <PhotoCamera label='upload logo'/>
                              </IconButton>
                            </div>)}
                        </label>
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={6}
                        spacing={4}
                        className={classes.editFormBtn}
                      >
                        {/* <Tooltip title="Edit" aria-label="edit">
                      <Fab variant="outlined"  onClick={this.handleEdit} className={classes.fabEditBtn}>
                          <EditIcon />
                      </Fab>
                  </Tooltip> */}
                        <Tooltip title="Save" aria-label="save" hidden={!this.state.accountShow}>
                          <Fab variant="outlined" className={classes.fabEditBtn}>
                            <SaveIcon onClick={this.handleSaveAccountDetails} />
                          </Fab>
                        </Tooltip>
                      </Grid>


                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Company Name" secondary={company.companyName ? company.companyName : 'NA'} />
                        {/* <TextField
                      label="Name"
                      margin="dense"
                      name="name"
                      id="name"
                      fullWidth
                      variant="outlined"
                      helperText={touched.name ? errors.name : ""}
                      value={this.state.account.name}
                      onChange={(e) => { this.handleChangeAccount(e); this.formValidation(); }}
                      onBlur={(e) => { this.handleTouch(e);  this.formValidation(); }}
                      error={touched.name && Boolean(errors.name)}
                      hidden={!this.state.accountShow}
                      className={classes.formControl}
                  /> */}
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Company Code" secondary={company.companyCode ? company.companyCode : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Business Vertical" secondary={company.businessVertical ? company.businessVertical : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="PAN or Tax Id" secondary={company.panOrTaxid ? company.panOrTaxid : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="GST No." secondary={company.gstNo ? company.gstNo : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Description" secondary={company.description ? company.description : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Address Line One" secondary={company.addressLine1 ? company.addressLine1 : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Address Line Two" secondary={company.addressLine2 ? company.addressLine2 : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Postal Code" secondary={(company.zipCode) ? company.zipCode : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="State" secondary={(company.state) ? company.state : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="City" secondary={company.city ? company.city : 'NA'} />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        xs={12}
                        className={classes.formBox}
                      >
                        <ListItemText className={classes.userProfileView} primary="Country" secondary={company.country ? company.country : 'NA'} />
                      </Grid>
                      {/* <Grid
                    item
                    md={4}
                    xs={12}
                    className={classes.formBox}
                >
                  <ListItemText className={classes.userProfileView} primary="Is Active" secondary={String(company.Active)} />
                </Grid> */}
                    </Grid>

                    {/* <List >
                  <Grid
                    container
                    spacing={1}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>
                        <ListItemText primary="Company Name" secondary={company.companyName} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Company Code" secondary={company.companyCode} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Business Vertical" secondary={company.businessVertical} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="PAN or Tax Id" secondary={company.panOrTaxid} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="GSTNo." secondary={company.gstNo} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Description" secondary={company.description} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Logo" secondary={company.logo} />
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="address Line One" secondary={company.addressLine1 ? company.addressLine1 : 'NA'} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Address Line Two" secondary={company.addressLine2} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Postal Code" secondary={(company.zipCode) ? company.zipCode : 'NA'} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="State" secondary={company.state} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="City" secondary={company.city} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Country" secondary={company.country} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Is Active" secondary={String(company.Active)} />
                      </ListItem>
                    </Grid>


                  </Grid>
                </List> */}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div >
        </Page>
      </Fragment>
    );
  }
}

CompanyDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) { return { dispatch }; }


export default connect(mapDispatchToProps
)(withStyles(styles)(CompanyDetailView));
