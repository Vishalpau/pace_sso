import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  ApiKeysList  from './components/ApiKeysList';
import { RemoveCircleSharp } from '@material-ui/icons';
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

class ApiKeys extends React.Component {
 

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
    <Card className={classes.root}>
      <ApiKeysList />
      </Card>
    </div>
);
  }
}

ApiKeys.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApiKeys);
