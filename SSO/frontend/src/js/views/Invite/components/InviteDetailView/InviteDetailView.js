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



class InviteDetailView extends React.Component {
  state = {
    invites: [],
    invite_id: ""
  }

  componentDidMount() {
    console.log({ props: this.props })
    const userid = localStorage.getItem('user')
    const inviteid = this.props.route.match.params.id
    this.setState({ invite_id: this.props.route.match.params.id })

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/' + userid + '/invites/' + inviteid + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ invites: res.data.data.results })

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
    const invites = this.state.invites;

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
                title="Invite Details"
                action={


                  <Button

                    component={this.CustomRouterLink}
                    to={"/invitelist"}
                    color="primary"
                  // variant="contained"
                  > Back

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
                        <ListItemText primary="User" secondary={invites.user_name} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Referral Email Name" secondary={invites.referralEmail} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Referral Phone" secondary={invites.referralPhone} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Referral Code" secondary={invites.referralCode} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Is Invite Sent" secondary={String(invites.isInviteSent)} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="referredUserId" secondary={String(invites.referredUserId)} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >

                      <ListItem>

                        <ListItemText primary="Reminder Count" secondary={invites.reminderCount} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >

                      <ListItem>

                        <ListItemText primary="Created On" secondary={invites.created} />
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Updated On" secondary={invites.updated} />
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

InviteDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(InviteDetailView);
