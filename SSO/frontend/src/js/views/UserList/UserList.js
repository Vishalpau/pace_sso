import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { UsersToolbar, UsersTable } from './components';
import Page from '../../../components/Page';
import Page from '../../../../../components/Page';
// import mockData from './data';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class UserList extends React.Component {

  state = {
    users: []
  }

  componentDidMount() {
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/',
      method: 'GET',
    }).then((res) => {
      console.log({ 'data': res.data.data.results })
      this.setState({ users: res.data.data.results })
      console.log({ 'state': this.state.users })

    }).catch((err) => {
      console.log(err)

    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Page title="Users">
        <div className={classes.content}>
          <UsersTable users={this.state.users} />
        </div>
      </Page>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
