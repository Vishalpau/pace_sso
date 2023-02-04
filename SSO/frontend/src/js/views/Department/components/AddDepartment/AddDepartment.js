import React, { useState, forwardRef } from 'react';
import { Grid, Typography, CardContent, Card, TextField, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link, NavLink as RouterLink } from 'react-router-dom';
import { UserActions } from '../../../../user/UserActions';

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


class AddDepartment extends React.Component {

  constructor(props) {
    super(props);
    this.action = new UserActions(this.props.dispatch);
  }

  state = {
    departmentname : '' ,
    departmentdescription : '',
    touched:{},
    errors:{},
}


  newDepartmentHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  submitHandler = () => {
    const isValid = this.formValidation();
    // const input = new FormData()
    if(isValid){
    const fkCompanyId=localStorage.getItem('companyId')

    // input.append('departmentname', this.state.departmentname)
    // input.append('departmentdescription',this.state.departmentdescription) 
    let payload = {
      departmentName : this.state.departmentname ,
      departmentDescription : this.state.departmentdescription
    }
    console.log(payload)

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/'+fkCompanyId+'/departments/',
      method: 'POST',
      data: payload,
  }).then((res) => {
      console.log({ result: res})
      this.action.openSnackbar('Department has been Created succesfully')
      this.action.showSnackbar
      this.props.history.push('/department')
  }).catch((err) => {
      //alert('error');
      console.log({err:err})
      this.setState({ loading: false })
      if (err.response && err.response.status == 400) {
          this.action.openSnackbar(err.response.data.data.results, true)
          this.action.showSnackbar
      }
  })
}
else{
  this.setState({
    touched:  {
        'departmentname': true,
        'departmentdescription': true
    }
  } )   

}
}

formValidation = () => {
  const { departmentname,departmentdescription } = this.state
  let isValid = true
  const errors = {};
  
  if (departmentname == "") {
    errors.departmentname = "Department name should be specified"
    isValid = false
  }

  if(departmentdescription==""){
    errors.departmentdescription = "Department description name should be specified"
    isValid = false
  }
  
  this.setState({ errors },()=>console.log({errors:this.state.errors}));

  return isValid;
}


  render() {
    const { classes } = this.props;
    const { touched, errors } = this.state

    return (
      <div className={classes.root}>
        <Grid item md={12} xs={12} className={classes.contentSection}>
          <Typography className={classes.contentTitle} varient="h1">New Department</Typography>
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
                    helperText={touched.departmentname && Boolean(errors.departmentname) ? errors.departmentname : ""}
                    error={touched.departmentname && Boolean(errors.departmentname)}
                    fullWidth
                    value={this.state.departmentname}
                    variant="outlined"
                    onChange={(e)=> this.newDepartmentHandler(e)}
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
                    helperText={touched.departmentdescription && Boolean(errors.departmentdescription) ? errors.departmentdescription : ""}
                    error={touched.departmentdescription && Boolean(errors.departmentdescription)}
                    fullWidth
                    value={this.state.departmentdescription}
                    variant="outlined"
                    onChange={(e)=> this.newDepartmentHandler(e)}
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
              <Button variant="outlined" size="medium" onClick={this.submitHandler} className={classes.custmSubmitBtn}>Save </Button>
              <Button variant="outlined" size="medium" className={classes.custmCancelBtn}><Link to="/department">Cancel </Link></Button>
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
)(withStyles(styles, { withTheme: true })(AddDepartment)));