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



class ApiKeyDetailView extends React.Component {
  state = {
    apikey: [],
    company_id: ""
  }

  componentDidMount() {
    console.log({ props: this.props })
    const companyId = this.props.route.match.params.companyId
    const keyId = this.props.route.match.params.keyId
    this.setState({ company_id: this.props.route.match.params.companyId })

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/xkeys/' + keyId + '/',
      method: 'GET',
    }).then((res) => {
      this.setState({ apikey: res.data.data.results })

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
    const apikey = this.state.apikey;

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
                title="APIKey Details"
                action={


                  <Button

                    component={this.CustomRouterLink}
                    to={"/apikeys/resetapikey/" + this.state.company_id + "/" + apikey.keyId}
                    color="primary"
                  // variant="contained"
                  > Reset APIKey

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
                        <ListItemText primary="Company Name" secondary={apikey.company_name} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Application Name" secondary={apikey.app_name} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Device" secondary={apikey.oauthclient} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="ClientType" secondary={apikey.clientType} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="clientAppVersions" secondary={apikey.clientAppVersions} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Revoked" secondary={String(apikey.revoked)} />
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Created On" secondary={apikey.createdAt} />
                      </ListItem>
                    </Grid>

                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <ListItem>

                        <ListItemText primary="Expired On" secondary={apikey.expiredAt} />
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

ApiKeyDetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ApiKeyDetailView);
