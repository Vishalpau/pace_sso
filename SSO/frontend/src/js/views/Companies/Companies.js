import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  index  from './components/CompanyList';
import  CompanyList  from './components/CompanyList';
//import { UsersToolbar, UsersTable } from './components';
// import mockData from './data';
import { Card,Grid } from '@material-ui/core';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class Companies extends React.Component {


  render() {
    const { classes } = this.props;

    return (
       <div className={classes.content}>
        <Card
          // {...rest}
          className={(classes.root)}
        >
       
      <CompanyList />
      </Card>
      </div>
);
  }
}

Companies.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Companies);
