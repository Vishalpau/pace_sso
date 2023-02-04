import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { ListSubscriptions } from './components';


const styles = theme => ({
  root: {
    //padding: theme.spacing(3)
  },
  content: {
    //marginTop: theme.spacing(2)
  }
});

class Subscriptions extends React.Component {

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root} >
        {/* <SubscriptionToolbar user={this.props.route.match.params.uuid} /> */}
        <div className={classes.content}>
          <ListSubscriptions user={this.props.route.match.params.uuid} />
        </div>

      </div>
    );
  }
}

Subscriptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subscriptions);
