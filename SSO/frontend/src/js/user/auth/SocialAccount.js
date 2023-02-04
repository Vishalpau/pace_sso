import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import google from './img/google.svg';
import IconSimpleFacebook from './img/IconSimpleFacebook.svg';
import linkedin from './img/linkedin.svg';
import Page from '../../../../src/components/Page';
import { GoogleLogin } from 'react-google-login';


class SocialAccount extends Component {

    handleSignIn = ()=>{
        window.location.href = 'http://localhost:8003/api/v1/user/accounts/google/login/';

    }

    responseGoogle =(response)=>{
        console.log(response)
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <Grid
                    direction="column"
                    justify="center"
                    alignItems="flex-end"
                >
                    <Typography component="h5" variant="h5" className={classes.signinLabel} align="center" >
                        Login with social account
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-end"
                >
                    <Link title="Linkedin Account" alt="Linkedin Account" to="#" className={classes.mLR}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
  <path id="Icon_awesome-linkedin" data-name="Icon awesome-linkedin" d="M23.214,2.25H1.78A1.793,1.793,0,0,0,0,4.052v21.4a1.793,1.793,0,0,0,1.78,1.8H23.214A1.8,1.8,0,0,0,25,25.448V4.052A1.8,1.8,0,0,0,23.214,2.25ZM7.556,23.679H3.85V11.748H7.561V23.679ZM5.7,10.118A2.148,2.148,0,1,1,7.852,7.97,2.149,2.149,0,0,1,5.7,10.118Zm15.742,13.56H17.74v-5.8c0-1.384-.028-3.164-1.925-3.164-1.931,0-2.227,1.507-2.227,3.064v5.9H9.883V11.748h3.555v1.629h.05A3.9,3.9,0,0,1,17,11.452c3.75,0,4.448,2.472,4.448,5.686Z" transform="translate(0 -2.25)" fill="#05374a" opacity="0.998"/>
</svg></Link>

                    <GoogleLogin
                        clientId="126110106984-810r11pmdd9dtii1lr0vinc1atickpg5.apps.googleusercontent.com"
                        render={renderProps => (
                            <Link title="Google Account" alt="Google Account" onClick={renderProps.onClick}
                            className={classes.mLR}><svg xmlns="http://www.w3.org/2000/svg" width="22.004" height="22.365" viewBox="0 0 22.004 22.365">
                             <path id="Icon_awesome-google" data-name="Icon awesome-google" d="M22,12.006c0,6.38-4.369,10.921-10.822,10.921a11.182,11.182,0,0,1,0-22.365,10.754,10.754,0,0,1,7.5,2.926L15.637,6.415c-3.981-3.842-11.385-.956-11.385,5.33a7,7,0,0,0,6.93,7.061,6.047,6.047,0,0,0,6.349-4.82H11.182V10.14H21.828A9.8,9.8,0,0,1,22,12.006Z" transform="translate(0 -0.563)" fill="#054d69"/>
                           </svg></Link>)}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    {/* <Link title="Google Account" alt="Google Account" onClick={this.handleSignIn}
 className={classes.mLR}><svg xmlns="http://www.w3.org/2000/svg" width="22.004" height="22.365" viewBox="0 0 22.004 22.365">
  <path id="Icon_awesome-google" data-name="Icon awesome-google" d="M22,12.006c0,6.38-4.369,10.921-10.822,10.921a11.182,11.182,0,0,1,0-22.365,10.754,10.754,0,0,1,7.5,2.926L15.637,6.415c-3.981-3.842-11.385-.956-11.385,5.33a7,7,0,0,0,6.93,7.061,6.047,6.047,0,0,0,6.349-4.82H11.182V10.14H21.828A9.8,9.8,0,0,1,22,12.006Z" transform="translate(0 -0.563)" fill="#054d69"/>
</svg></Link> */}
                    <Link title="Facebook Account" alt="Facebook Account" onClick={() => window.open("/accounts/facebook/login/")} className={classes.mLR}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25.002" viewBox="0 0 25 25.002">
  <path id="Icon_simple-facebook" data-name="Icon simple-facebook" d="M25,12.577A12.5,12.5,0,1,0,10.547,25V16.213H7.373V12.577h3.174V9.806c0-3.152,1.866-4.893,4.721-4.893a19.109,19.109,0,0,1,2.8.246v3.1H16.49a1.812,1.812,0,0,0-2.037,1.964v2.359H17.92l-.554,3.636H14.453V25A12.557,12.557,0,0,0,25,12.577Z" fill="#05374a"/>
</svg></Link>

                </Grid>
            </div>
        );
    }
}

const useStyles = theme => ({
    mT30: {
        marginTop: '30px',
    },
    mT10: {
        marginTop: '10px',
    },
    signinLabel: {
        color: '#16384F',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        lineHeight: '18px',
        margin: theme.spacing(9, 0, 2, 0),
    },
    mLR: {
        margin: theme.spacing(0, 1),
        padding: '5px',
        border: '1px solid #92A6B6',
        borderRadius: '3px',
        backgroundColor: '#F2F2F2',
        height: '37px',
        width: '37px',
        textAlign: 'center',
        '& svg': {
            verticalAlign: 'bottom',
        },
    },
    socilIconstyle: {
        verticalAlign: 'middle',
        padding: '5px',
    },
});

export default (withStyles(useStyles, { withTheme: true })(SocialAccount));