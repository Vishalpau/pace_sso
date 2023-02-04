import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import AddUser from '../AddUser';
import SearchInput from '../../../../components/common/SearchInput';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
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

const UsersToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [snackbarOpen, snackbarSetOpen] = React.useState(false);

  const handleSnackbarOpen = () => {
    snackbarSetOpen(true);
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarSetOpen(false);
  }

  const handleClickOpen = () => {
    window.open('/add-user')
  };

  const handleClose = () => {
    setOpen(false);
    snackbarSetOpen(true);
  };

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
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        {/* <Button
						
						component={CustomRouterLink}
            to="add-user"
            color="primary"
            variant="contained"
					>
					Add User
					</Button> */}

        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            User Added Successfully!
            </Alert>
        </Snackbar>
      </div>
      {/* <div className={classes.row}> 
        <SearchInput
          className={classes.searchInput}
          placeholder="Search category"
        />
      </div> */}
    </div>
  );
};
// }
UsersToolbar.propTypes = {
  className: PropTypes.string
};

export default UsersToolbar;
