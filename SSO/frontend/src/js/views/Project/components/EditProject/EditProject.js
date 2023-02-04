import React, { useState, forwardRef } from 'react';
import { Grid, Typography, CardContent, Card, TextField, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import { Checkbox } from 'react-advanced-form-addons';
import { Link, NavLink as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  contentTitle: {
    fontSize: '30px',
    lineHeight: '50px',
    fontFamily: 'xolonium',
    color: '#054D69',
    paddingBottom: '5px',
    borderBottom: '1px solid #d6d9da',
    marginBottom: '30px',
    [theme.breakpoints.down("md")]: {
      fontSize: '22px',
      lineHeight: '40px',
    },
  },
  custmSubmitBtn: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Medium',
    marginTop: '25px',
    '&:focus':{
      outline: 'none',
    },
    '&:hover':{
      backgroundColor: '#06374a',
      color: '#ffffff',
    }
  },
  formBox: {
    position: 'relative',
    padding: '5px 12px !important',
    '& .MuiTextField-root': {
        width: '100%',
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#06374a',
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#06374a',
    },
    '& .MuiBadge-badge': {
      left: '0px',
      right: 'auto',
      borderRadius: '3px',
    },
  },
  formControl: {
      '& .MuiOutlinedInput-input': {
        //padding: '10.5px 14px',
      },
  },
  custmCancelBtn: {
    textTransform: 'capitalize',
    marginLeft: '5px',
    marginTop: '25px',
    backgroundColor: '#ffffff',
    color: '#f28705',
    padding: '0px',
    '& a': {
      backgroundColor: '#ffffff',
      color: '#263238',
      padding: '5px 15px',
      borderRadius: '4px',
      fontFamily: 'Montserrat-Medium',
    },
    '& a:hover': {
      backgroundColor: '#f28705',
      color: '#ffffff !important',
    },
  },
});
class EditProject extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid item md={12} xs={12} className={classes.contentSection}>
          <Typography className={classes.contentTitle} varient="h1">Edit Project</Typography>
        </Grid>
        <Card className={classes.formBoxSection}>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid       
                md={6}
                xs={12}
              >
                <Grid
                  item
                  md={12}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                    label="Department Name"
                    margin="dense"
                    name="departmentname"
                    id="departmentname"
                    type="text"
                    fullWidth
                    value=""
                    variant="outlined"
                    className={classes.formControl}
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                  className={classes.formBox}
                >
                <TextField
                    label="Department Description"
                    margin="dense"
                    name="departmentdescription"
                    id="departmentdescription"
                    multiline
                    rows={2}
                    defaultValue=""
                    fullWidth 
                    variant="outlined"
                    className={classes.formControl}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid 
              item
              md={6}
              xs={12}
            >
              <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Update</Button>
              <Button variant="outlined" size="medium" className={classes.custmCancelBtn}><Link to="/project">Cancel </Link></Button>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
};



// UserDetails.propTypes = {
//   className: PropTypes.string
// };

//function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(EditProject)));