import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UserActions } from '../UserActions';

class LoginAD extends Component {

    constructor(props) {
        super(props);
        this.action = new UserActions(this.props.dispatch);
    }


    componentDidMount=()=>{
    axios({
        url: process.env.API_URL + process.env.API_VERSION + '/user/create_AD_user/',
        method: 'GET',
    }).then((res) => {
        console.log({result:res})
        this.action.login(res.data.data.results)
        const token=res.data.data.results.access_token
        console.log({user_AD:res.data.data.results.user})
        var fullToken = 'Bearer ' + token
        axios.defaults.headers.common['Authorization'] = fullToken;
        // localStorage.setItem('companyId',res.data.data.results.user.companies[0].companyId)
        localStorage.setItem('email',res.data.data.results.user.email)
        localStorage.setItem('name',res.data.data.results.user.name)
        localStorage.setItem('avatar',res.data.data.results.user.avatar)
        localStorage.setItem('user', res.data.data.results.user.id);

        console.log({props:this.props})
        this.props.route.history.push('/dashboard');
        // window.location.href = 'dashboard'


    }).catch((err) => {
        // alert('error')
        console.log({ error: err })
    })
}

render(){return (null);
}
}

function mapDispatchToProps(dispatch) { return { dispatch }; }
export default connect(
    mapDispatchToProps
)(LoginAD);