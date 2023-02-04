import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Input
} from '@material-ui/core';
import { withFormik, Formik } from "formik";
import * as Yup from 'yup';
import { withStyles } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InviteList from '../InviteList'
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ReminderInvite extends React.Component {


  componentDidMount() {
    const invite_id = this.props.route.match.params.id
    const userid = localStorage.getItem('user')

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/' + userid + '/invites/' + invite_id + '/',
      method: 'POST'

    }).then((res) => {
      this.props.history.push('/invitelist')
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <InviteList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(ReminderInvite)));