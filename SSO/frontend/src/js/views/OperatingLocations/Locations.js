import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  LocationsList  from './components/LocationsList';
import { Card } from '@material-ui/core';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class Locations extends React.Component {


  render() {
    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <Card className={classes.root}>
      <LocationsList />
      </Card>
    </div>
);
  }
}

Locations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Locations);
