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

const styles = theme => ({
  root: {
    // width: '100%',
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4)
  },

});



class LocationDetailView extends React.Component {
  state = {
    location: [],
    company_id: ""
  }

  componentDidMount() {
    console.log({ props: this.props })
    const companyId = this.props.route.match.params.companyId
    const locationId = this.props.route.match.params.locationId
    this.setState({ company_id: this.props.route.match.params.companyId })

    console.log(companyId)
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/locations/' + locationId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ location: res.data.data.results })

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
    const location = this.state.location;

    return (
      <div className={classes.root}>

        <Grid
          container
          spacing={4}
        >

          <Grid
            item
            lg={7}
            md={6}
            xl={8}
            xs={12}
          >
            <Card>
              <CardHeader
                title="Location Details"
                action={


                  <Button

                    component={this.CustomRouterLink}
                    to={"/locations/editlocations/" + this.state.company_id + "/" + location.locationId}
                    color="primary"
                  // variant="contained"
                  > Edit

                  </Button>
                }
              />
              <CardContent className={classes.content}>

                <List >
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
                        <ListItemText primary="Location Name" secondary={location.LocationName} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Address Line one" secondary={location.addressLineOne} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Address Line Two" secondary={location.addressLineTwo} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="landmark" secondary={location.landmark} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="city" secondary={location.city} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="state" secondary={location.state} />
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="postalCode" secondary={location.postalCode} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="country" secondary={location.country} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="latitude" secondary={location.latitude} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="longitude" secondary={location.longitude} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="panOrTaxid" secondary={location.panOrTaxid} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="gstNo" secondary={location.gstNo} />
                      </ListItem>
                    </Grid>

                  </Grid>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>





      </div >
    );
  }
}

LocationDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LocationDetailView);
