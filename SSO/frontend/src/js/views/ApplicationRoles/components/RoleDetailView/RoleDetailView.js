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



class RoleDetailView extends React.Component {
  state = {
    role: [],
    app_id: ""
  }

  componentDidMount() {

    const appId = this.props.route.match.params.appId
    const roleId = this.props.route.match.params.roleId

    this.setState({ app_id: this.props.route.match.params.appId })
    console.log(roleId)
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/roles/' + roleId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ role: res.data.data.results })
      console.log(role)

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
    const role = this.state.role;

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
                title="Role Details"
                action={

                  <Button

                    component={this.CustomRouterLink}
                    to={"/roles/editroles/" + this.state.app_id + '/' + role.roleId}
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
                        <ListItemText primary="Role Name" secondary={role.roleName} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Role Description" secondary={role.roleDesc} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Scope" secondary={role.scope} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Is Default" secondary={String(role.isaDefault)} />
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

RoleDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(RoleDetailView);
