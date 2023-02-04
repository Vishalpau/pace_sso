import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  index  from './components/DepartmentList';
import  DepartmentList  from './components/DepartmentList';
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

class Department extends React.Component {


  render() {
    const { classes } = this.props;

    return (
       <div className={classes.content}>
          <DepartmentList />
        {/* <Card className={classes.root}>
         
        </Card> */}
      </div> 
    );
  }
}

Department.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Department);
