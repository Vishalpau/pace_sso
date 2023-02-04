import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { colors } from '@material-ui/core';
import clsx from 'clsx';
import AssessmentIcon from '@material-ui/icons/Assessment';

const useStyles = makeStyles((theme) => ({
	root: {
		// width: '100%',
		// maxWidth: 360,
		// backgroundColor: theme.palette.background.paper,
	},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	nested: {
		// paddingLeft: theme.spacing(4),
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
		color: theme.palette.primary.main,
		fontWeight: theme.typography.fontWeightMedium,
		'& $icon': {
			color: theme.palette.primary.main
		}
	}
}));

export default function Reports(props) {
	const { pages, className } = props;
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	const downloadAssets = () => {
		axios({
			url: '/assets/download-pdf/',
			method: 'POST',
			data: []

		}).then((res) => {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'assets.pdf');
			document.body.appendChild(link);
			link.click();
		}).catch((err) => {
			console.log({ "error": err })
			return
			const errData = err.response.data

			var tifOptions = Object.keys(errData).map(function (key) {
				return setFieldError(`${key}`, `${errData[key][0]}`)
			});

		})
	}

	const downloadUsers = () => {
		axios({
			url: '/user/download-pdf/',
			method: 'POST',
			data: []

		}).then((res) => {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'users.pdf');
			document.body.appendChild(link);
			link.click();
		}).catch((err) => {
			console.log({ "error": err })
			return
			const errData = err.response.data

			var tifOptions = Object.keys(errData).map(function (key) {
				return setFieldError(`${key}`, `${errData[key][0]}`)
			});

		})
	}
	return (
		<List
			className={clsx(classes.root, className)}
		>

			<ListItem onClick={handleClick} className={classes.item}
				disableGutters>
				<div className={classes.icon}><AssessmentIcon /></div>
				Reports
        {open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={!open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem className={classes.item} disableGutters>
						<Button
							activeClassName={classes.active}
							className={classes.button}
							onClick={downloadAssets}
						>

							Asset Reports
					</Button>
					</ListItem>
					<ListItem className={classes.item} disableGutters>
						<Button
							activeClassName={classes.active}
							className={classes.button}
							onClick={downloadUsers}
						>

							User Reports
					</Button>
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
}
