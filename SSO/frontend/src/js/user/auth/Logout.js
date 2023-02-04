import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component, Fragment, forwardRef } from 'react';
import { connect } from 'react-redux';
import { Link, Route, NavLink, BrowserRouter as Router } from 'react-router-dom';
import { UserActions } from '../UserActions';
import { SnackbarActions } from '../../reducers/SnackbarActions';
import queryString from 'query-string';
import Page from '../../../../src/components/Page';
import { Box, Grid, Paper, Typography, TextField, Button, Popper, NativeSelect } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import OtpInput from 'react-otp-input';
import SuccessSnackbar from '../../../components/successSnackbar';
import PaceLogo from './PaceLogo';
import SocialAccount from './SocialAccount';
import '../../../../src/App.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Autocomplete } from "@material-ui/lab";

import countries from '../../../../src/js/data/country';
import { NavLink as RouterLink } from 'react-router-dom';


const CountryCodeList = (props) => {
    return <Popper {...props} style={{ width: "300px" }} placement="bottom-start" />;
};


const CustomRouterLink = forwardRef((props, ref) => (
    <div
        ref={ref}
    // style={{ flexGrow: 1 }}
    >
        <RouterLink {...props} />
    </div>
));

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout:false
        };
        console.log({props_new:this.props})
        this.action = new UserActions(this.props.dispatch);
    }



    componentDidMount() {
        const values = queryString.parse(this.props.route.location.search)
        console.log({logout: values})
        // console.log(this.props.route.location.search.client_id)
        // return;

        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/session/',
            method: 'GET',
        }).then((res) => {
            
            axios({
                url: process.env.API_URL + process.env.API_VERSION + '/user/logout/',
                method: 'GET',
            }).then((res) => {
                if(values.client_id){
                    window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+values.client_id+'&response_type=code';    
                }
                else{
                    window.location.href = '/';
                }
                localStorage.clear()
                console.log({logout: this.state.logout})
            }).catch((err) => {
                localStorage.clear()
                this.setState({ loading: false })
                if(values.client_id){
                    window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+values.client_id+'&response_type=code';    
                }
                else{
                    window.location.href = '/';
                }
                localStorage.clear()
            })
        }).catch((err) => {
            this.setState({ loading: false })
            if(values.client_id){
                window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id='+values.client_id+'&response_type=code';    
            }
            else{
                window.location.href = '/';
            }
            
            
        })
        
        this.setState({logout:true})
    }

    
   

    render() {
        const { classes } = this.props
        const { touched, errors, result } = this.state

        return (
            <Fragment>
                <Page className={classes.root} title="Login">
                    {this.state.logout}
                </Page>


            </Fragment>
        );
    }       
}


function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles({ withTheme: true })(Logout));