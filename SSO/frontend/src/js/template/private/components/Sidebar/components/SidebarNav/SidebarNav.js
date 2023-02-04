/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, colors } from '@material-ui/core';
import { getPermissions } from '../../../../../../../helpers';
import { getRole } from '../../../../../../../helpers';
const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	button: {
		color: colors.blueGrey[800],
		padding: '10px 8px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '100%',
		fontWeight: theme.typography.fontWeightMedium
	},
	icon: {
		color: theme.palette.icon,
		width: 24,
		height: 24,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(1)
	},
	active: {
		// color: theme.palette.primary.main,
		color: '#ff8533',
		fontWeight: theme.typography.fontWeightMedium,
		'& .leftMenuIcon': {
			backgroundPositionY: '-364px',
		},
		'&:hover span': {
			color: '#ff8533',
		},
		'& span': {
			color: '#ff8533 !important',
		},
		'& $icon': {
			//color: theme.palette.primary.main,
			color: '#ff8533',
		},
	}
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style={{ flexGrow: 1 }}
	>
		<RouterLink {...props} />
	</div>
));




const SidebarNav = props => {
	const { pages, className } = props;

	const classes = useStyles();

	
// React.useEffect(() => {
    
	// window.addEventListener('storage', () => {
		// alert(123456)
	  // When local storage changes, dump the list to
	  // the console.
	//    setCart(JSON.parse(localStorage.getItem('myCart')) || [])  
	// console.log(localStorage.getItem('permissions')) 
	// });
	
	   
	// }, [])

	return (
		<List
			className={clsx(classes.root, className)}
		>
			{pages.map(page => (
				// console.log(page.title, getPermissions(page.permission))
				<ListItem
					className={classes.item}
					disableGutters
					key={page.title}
					// disabled={getPermissions(page.permission)}
					// disabled={getRole(page.ssoRole)}
					hidden={getRole(page.ssoRole)}
				>
					<Button
						activeClassName={classes.active}
						className={classes.button}
						component={CustomRouterLink}
						to={page.href}
						// disabled={getPermissions(page.permission)}
						// disabled={getRole(page.ssoRole)}
						hidden={getRole(page.ssoRole)}
					>
						<div className={classes.icon}>{page.icon}</div>
						{page.title}
					</Button>
				</ListItem>
			
			))}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
