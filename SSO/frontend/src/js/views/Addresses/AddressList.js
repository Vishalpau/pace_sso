import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { ListAddresses, AddressToolbar } from './components';


const styles = theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
});

class AddressList extends React.Component {

  state = {
    user: ""
  }



  componentDidMount() {


  }

  render() {
    const { classes } = this.props;
    const addresses = this.state.addresses
    console.log({ updated: addresses })
    return (

      <div className={classes.root} >
        <AddressToolbar user={this.props.route.match.params.uuid} />
        <div className={classes.content}>
          <ListAddresses user={this.props.route.match.params.uuid} />

        </div>

      </div>
    );
  }
}

AddressList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressList);
