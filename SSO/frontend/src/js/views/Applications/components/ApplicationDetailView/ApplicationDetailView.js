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
  logo: {
    maxWidth: "80px",
    marginLeft: 0
  },


});



class ApplicationDetailView extends React.Component {
  state = {
    application: [],
  }

  componentDidMount() {

    const appId = this.props.route.match.params.appId
    console.log(appId)
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ application: res.data.data.results })

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
    const application = this.state.application;

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
                title="Application Details"
                action={


                  <Button

                    component={this.CustomRouterLink}
                    to={"/applications/editapplication/" + application.appId}
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
                        <ListItemText primary="Application Name" secondary={application.appName} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Application Code" secondary={application.appCode} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="App Description" secondary={application.appDesc} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="App URL" secondary={application.appURL} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>
                        AppLogo<img alt='AppLogo' src={`http://localhost:8003/media/applogos/${application.appId}/${application.appLogoName}`} className={classes.logo}></img>
                        {/* <ListItemText primary="App Logo" secondary={`http://localhost:8003/media/applogos/${application.appLogoName}`} /> */}
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="active" secondary={String(application.active)} />
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

ApplicationDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ApplicationDetailView);
