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



class SubscriptionDetails extends React.Component {
  state = {
    subscription: [],
  }

  componentDidMount() {

    const id = this.props.route.match.params.id
    const userId = this.props.route.match.params.uuid
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/' + userId + '/subscriptions/' + id + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ subscription: res.data.data.results })

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
    const subscription = this.state.subscription;

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
                title="Subscription Details"
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
                        <ListItemText primary="Application" secondary={subscription.application} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="User" secondary={(subscription.user_name) ? subscription.user_name : 'NA'} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Role" secondary={subscription.role_name} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Company" secondary={subscription.company} />
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

SubscriptionDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SubscriptionDetails);
