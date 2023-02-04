import React, { Component, forwardRef, Fragment } from 'react';
import { Grid, Typography, Button, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { withStyles } from '@material-ui/styles';
// import LinkedInIcon from '@material-ui/icons/Linkedin';
import { NavLink as RouterLink } from 'react-router-dom';
import teknobuiltLogo from './img/teknobuilt.svg';
// import IconSimpleFacebook from './img/IconSimpleFacebook.svg';
// import { connect } from 'react-redux';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		const { classes } = this.props
		return (
			<Fragment>
				<Grid container className={classes.footerSection}>
					<Grid item md={12} xs={12} spacing={2}>
						<Typography text-align="right">Powered by <img className={classes.footerLogo} spacing={3} src={`/${teknobuiltLogo}`} title="Company Logo" alt="Company Logo" /></Typography>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}


const useStyles = theme => ({
	footerSection: {
		backgroundColor: '#f2f2f2',
		padding: '15px 40px',
		textAlign: 'right',
	},
});

export default withStyles(useStyles)(Footer);