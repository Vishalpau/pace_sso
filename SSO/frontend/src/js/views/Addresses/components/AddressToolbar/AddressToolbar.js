import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  row2: {
    height: '42px',
    // display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// class UsersToolbar extends React.Component {

const AddressToolbar = props => {
  const { className, branches, departments, categories, ...rest } = props;

  const classes = useStyles();

  const [snackbarOpen, snackbarSetOpen] = React.useState(false);

  const [category, updateCategory] = React.useState("");
  const [branch, updateBranch] = React.useState("");

  const handleSnackbarOpen = () => {
    snackbarSetOpen(true);
  }



  const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
    // style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));
  

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

        <Button
          //onClick={handleClickOpen}
          component={CustomRouterLink}
          to={"/" + props.user + "/addresses/add"}
          color="primary"
          variant="contained"
        >
          Add Address
					</Button>

        
      </div>

    </div >
  );
};
// }
AddressToolbar.propTypes = {
  className: PropTypes.string
};

export default AddressToolbar;
