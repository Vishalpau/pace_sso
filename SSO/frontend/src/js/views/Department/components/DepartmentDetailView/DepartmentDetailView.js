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
import PaceLoader from '../../../../user/auth/PaceLoader';
import { Fragment } from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

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
    '& .MuiAvatar-root': {
      width: '80px',
      height: '80px',
      position: 'relative',
    },
    '& .MuiButtonBase-root': {
      position: 'absolute',
      left: '46px',
      top: '45px',
    },
    '& .MuiSvgIcon-root': {
      color: '#054D69',
    },
  },

});



class DepartmentDetailView extends React.Component {
  state = {
    company: [],
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

    return (
      <Fragment>
      {/* <PaceLoader /> */}
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
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <Avatar className={classes.large}>{company.logo ? company.logo : 'NA'}</Avatar>
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
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
                          <SaveIcon  onClick={this.handleSaveAccountDetails }/>
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
                  <ListItemText className={classes.userProfileView} primary="GSTNo." secondary={company.gstNo ? company.gstNo : 'NA'} />
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
                  <ListItemText className={classes.userProfileView} primary="address Line One" secondary={company.addressLine1 ? company.addressLine1 : 'NA'} />
                </Grid>
                <Grid
                    item
                    md={4}
                    xs={12}
                    className={classes.formBox}
                >
                  <ListItemText className={classes.userProfileView} primary="address Line Two" secondary={company.addressLine2 ? company.addressLine2 : 'NA'} />
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
                  <ListItemText className={classes.userProfileView} primary="State" secondary={(company.state) ? company.state : 'NA' } />
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
                <Grid
                    item
                    md={4}
                    xs={12}
                    className={classes.formBox}
                >
                  <ListItemText className={classes.userProfileView} primary="Is Active" secondary={String(company.Active)} />
                </Grid>
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
      </Fragment>
    );
  }
}

DepartmentDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(DepartmentDetailView);
