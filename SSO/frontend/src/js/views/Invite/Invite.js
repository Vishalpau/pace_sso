import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import  InviteList  from './components/InviteList';
import { Card } from '@material-ui/core';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class Invite extends React.Component {
 

  render() {
    const { classes } = this.props;
    return (
      <Page title="Invites">
      <div className={classes.content}>
      <Card className={classes.root}>
      <InviteList />
      </Card>
    </div>
    </Page>
);
  }
}

Invite.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InviteList);
