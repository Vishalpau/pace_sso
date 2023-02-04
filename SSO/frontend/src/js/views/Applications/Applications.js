import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  ApplicationList  from './components/ApplicationList';
//import { UsersToolbar, UsersTable } from './components';
// import mockData from './data';
import { Card } from '@material-ui/core';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});


class Applications extends React.Component {


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
      <Card className={classes.root}>

      <ApplicationList />
      </Card>

    </div>
);
  }
}

Applications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Applications);
