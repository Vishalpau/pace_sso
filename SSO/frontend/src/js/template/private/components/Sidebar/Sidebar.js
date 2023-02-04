import { Divider, Drawer, Hidden } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Profile, SidebarNav, Reports, SidebarNavTwo } from './components';
import CategoryIcon from '@material-ui/icons/Category';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import BusinessIcon from '@material-ui/icons/Business';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import AppsIcon from '@material-ui/icons/Apps';
import DehazeIcon from '@material-ui/icons/Dehaze';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';


const useStyles = makeStyles(theme => ({
	drawer: {
		width: 240,
		[theme.breakpoints.up('lg')]: {
			marginTop: 64,
			height: 'calc(100% - 64px)'
		}
	},
	root: {
		//backgroundColor: theme.palette.white,
		backgroundColor: '#06374a',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		//padding: theme.spacing(2),
		'& ul': {
			paddingTop: '16px',
			paddingBottom: '0px',
		},
		'& .MuiButton-text': {
			color: '#efefef',
			width: '100%',
			padding: '16px 16px',
			borderRadius: '0px',
		},
		'& .MuiButton-text div': {
			color: '#efefef',
		},
		'& .MuiButtonBase-root.active': {
			color: '#F8F8F8',
			backgroundColor: '#f28705',
		},
		'& .MuiButton-root:hover': {
			textDecoration: 'none',
			backgroundColor: '#f28705',
		},
	},
	leftSideContainer: {
		//	backgroundColor: '#06374a',
	},
	divider: {
		margin: theme.spacing(2, 0)
	},

	override_divider: {
		margin: 0
	},
	leftNav: {
		marginBottom: theme.spacing(2),
		'& li': {
			'& a': {
				padding: '10px 8px 10px 20px',
			},
		},
	},
}));
const setStorage = () => {
	axios({
		url: process.env.API_URL + process.env.API_VERSION + '/user/self/',
		method: 'GET',
	}).then((res) => {
		console.log({ result: res })
		localStorage.setItem('user', res.data.data.results.data.id)
		localStorage.setItem('email', res.data.data.results.data.email)
		localStorage.setItem('name', res.data.data.results.data.name)
		localStorage.setItem('avatar', res.data.data.results.data.avatar)

	}).catch((err) => {
		console.log(err)

	})
}
const Sidebar = props => {
	// setStorage()
	// console.log({localstorage: localStorage.getItem('company_id')})
	const { open, variant, onClose, className } = props;

	const classes = useStyles();

	const pages_one = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <CategoryIcon />
		},
		// {
		// 	title: 'Addresses',
		// 	href: '/addresses',
		// 	icon: <ListAltIcon />
		// },
		// {
		// 	title: 'Subscriptions',
		// 	href: '/subscriptions',
		// 	icon: <ListAltIcon />
		// },
		{
			title: 'Project',
			href: '/project',
			icon: <BusinessIcon />
		},
		{
			title: 'Users',
			href: '/users',
			icon: <PeopleAltIcon />
		},
		// {
		// 	title: 'Applications',
		// 	href: '/applications',
		// 	icon: <AppsIcon />
		// },
		{
			title: 'Organization',
			href: '/companies/'+localStorage.getItem('companyId'),
			icon: <BusinessIcon />
		},
		
		// {
		// 	title: 'Application Roles',
		// 	href: '/roles',
		// 	icon: <DehazeIcon />
		// },
		{
			title: 'Subscriptions',
			href: '/subscriptions',
			icon: <SubscriptionsSharpIcon />
		},
		{
			title: 'Invite User',
			href: '/invitelist',
			icon: <InsertInvitationIcon />
		},
		// {
		// 	title: 'User Profile',
		// 	href: '/UserProfile',
		// 	icon: <PeopleAltIcon />
		// },
	];

	const pages_two = [
		{
			title: 'Users',
			href: '/users',
			icon: <PeopleAltIcon />
		},
		{
			title: 'Applications',
			href: '/applications',
			icon: <AppsIcon />
		},
		{
			title: 'Companies',
			href: '/companies',
			icon: <BusinessIcon />
		},
		{
			title: 'Application Roles',
			href: '/roles',
			icon: <DehazeIcon />
		},
		// {
		// 	title: 'Company',
		// 	href: '/company',
		// 	icon: <BusinessIcon />
		// },
		// {
		// 	title: 'Categories',
		// 	href: '/categories',
		// 	icon: <CategoryIcon />
		// },


	];

	const pages_three = [
		{
			title: 'Companies',
			href: '/companies',
			icon: <BusinessIcon />
		},
	];

	const pages_four = [
		{
			title: 'Applications',
			href: '/applications',
			icon: <AppsIcon />
		},



	];
	const pages_five = [
		{
			title: 'Application Roles',
			href: '/roles',
			icon: <DehazeIcon />
		},
	];


	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div
				className={clsx(classes.root, className)}
			>
				<Hidden lgUp>
					<Profile />
					<Divider className={classes.divider} />
				</Hidden>
				<SidebarNav
					className={classes.leftNav}
					pages={pages_one}
				/>
				{/* <Divider className={classes.override_divider} />
				<SidebarNavTwo
					className={classes.nav}
					pages={pages_two}
				/> */}
				<Divider className={classes.override_divider} />
				{/* <SidebarNavTwo
					className={classes.nav}
					pages={pages_three}
				/>
				<Divider className={classes.override_divider} />
				<SidebarNavTwo
					className={classes.nav}
					pages={pages_four}
				/>
				<Divider className={classes.override_divider} />
				<SidebarNavTwo
					className={classes.nav}
					pages={pages_five}
				/> */}
				{/* <Reports className={classes.nav}
					pages={pages_one} /> */}
				{/* <UpgradePlan /> */}

			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default Sidebar;
