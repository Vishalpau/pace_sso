import { Avatar, CircularProgress, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content'
	},
	avatar: {
		width: 60,
		height: 60
	},
	name: {
		marginTop: theme.spacing(1)
	}
}));

const Profile = props => {
	const { className } = props;

	const classes = useStyles();

	const [profile, setProfile] = React.useState({});

	React.useEffect(() => {
		setProfile({
			name: localStorage.getItem('name'),
			avatar: ""
		})
	}, []);

	return (
		<div
			className={clsx(classes.root, className)}
		>
			<Avatar
				alt={profile.name}
				className={classes.avatar}
				component={RouterLink}
				src={profile.avatar}
				to="/users/profile"
			/>
			<Typography
				className={classes.name}
				variant="h4"
			>
				{profile.name}
			</Typography>
		</div>
	);
};

Profile.propTypes = {
	className: PropTypes.string
};

export default Profile;
