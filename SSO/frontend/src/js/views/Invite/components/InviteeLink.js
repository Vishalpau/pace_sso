import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../../../../../src/js/user/UserActions';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class InviteeLink extends Component {

    constructor(props) {
        super(props);
        this.action = new UserActions(this.props.dispatch);
        this.state={
            open:false,
            error:""
        }
    }

    handleClose=()=>{
        this.setState({open:true})
        // console.log({props:this.props})
        this.props.route.history.push('/login')
    }

    componentDidMount=()=>{
    
    const referralCode=this.props.route.match.params.referralCode
    axios({
        url: process.env.API_URL + process.env.API_VERSION + '/user/invitewrtreferralcode/'+referralCode+'/',
        method: 'GET',
    }).then((res) => {
        console.log({result:res})
        const action=res.data.data.results.action

        const invitee_data=res.data.data.results

        if (action=='login'){
            this.props.route.history.push({ 
                pathname: '/login',
                invitee_data: invitee_data
               })
        }
        else if(action=='register'){
            this.props.route.history.push({ 
                pathname: '/register',
                invitee_data: invitee_data
               })
        }
    }).catch((err) => {
    
    console.log({ error: err })
    
    this.setState({error:err.response.data.error.error})

        // alert(err.response.data.error)
        
    })
}

render(){
  // console.log({error:this.state.error})
  return (

    (this.state.error)?
    (<div>
        <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Invitation Link!!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {this.state.error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            OK
          </Button> */}
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
</div>):null
);
}
}

function mapDispatchToProps(dispatch) { return { dispatch }; }
export default connect(
    mapDispatchToProps
)(InviteeLink);