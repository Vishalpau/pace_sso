import React, { Fragment, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { Link, NavLink as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import {
  Typography,
  Grid,
  ListItemText,
  TextField,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserActions } from '../../../../user/UserActions';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';



import Page from '../../../../../components/Page';

const styles = theme => ({
  root: {},
  DepartmentListSection: {
    padding: '24px;',
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
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& .MuiPaper-root > div':{
      padding: '0px 24px',
    },
    '& table': {
      '& td': {
        wordBreak: 'keep-all'
      },
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 60,
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  },
  tableHead: {
    '& button:focus': {
      outline: 'none !important',
    },
    '& button.MuiIconButton-root': {
      color: '#06374a',
    },
    '& button:hover': {
      color: '#06374a',
    },
    '& button.MuiIconButton-root': {
      '& a':{
        color: '#546e7a',
      },
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid #06374a',
    },
    '& table': {
      '& thead': {
        '& th': {
          backgroundColor: '#06374a',
          padding: '8px 15px',
          '& button:focus': {
            outline: 'none !important',
          },
          '& .MuiButton-label div': {
            color: '#ffffff',
            '& .MuiTableSortLabel-root svg': {
              color: '#ffffff !important',
            },
          },
        },
      },
      '& tbody': {
        '& td': {
          padding: '8px 15px',
        },
      },
    },
    '& .MuiInput-underline:after': {
      borderBottom: '1px solid #06374a',
    },
    '& th:nth-child(3)': {
      width: '140px',
    },
  },
  dataTableActionBtn: {
    padding: '5px',
    '& svg': {
      fontSize: '18px',
    }
  },
  custmSubmitBtn: {
    borderBottom: '1px solid #d6d9da',
    marginBottom: '30px',
    '&button':{
      textTransform: 'capitalize',
      float: 'right',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      padding: '5px 15px',
      fontSize: '14px',
      minWidth: '64px',
      boxSizing: 'border-box',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontFamily: 'Montserrat-Medium',
      fontWeight: '500',
      lineHeight: '1.75',
      borderRadius: '4px',
      color: '#263238',
      '&:focus':{
        outline: 'none',
      },
    },
    '& a':{
      textTransform: 'capitalize',
      float: 'right',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      padding: '5px 15px',
      fontSize: '14px',
      minWidth: '64px',
      boxSizing: 'border-box',
      transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontFamily: 'Montserrat-Medium',
      fontWeight: '500',
      lineHeight: '1.75',
      borderRadius: '4px',
      color: '#263238',
      '&:focus':{
        outline: 'none',
      },
    },
    '& a:hover':{
      backgroundColor: '#06374a',
      color: '#ffffff',
    },
  },
  custmAssignBtn: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular',
    textTransform: 'capitalize',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#06374a',
    },
  },
  dialogSection: {
    '& .MuiDialog-paper': {
        width: '100%',
    },
    '& .MuiDialogTitle-root': {
        '& .MuiTypography-root': {
            color: '#06374a',
            fontSize: '20px',
            lineHeight: '30px',
            fontFamily: 'xolonium',
            display: 'inline-block',
        },
    },
    '& button:focus': {
      outline: 'none',
  },
  },
  applicationName: {
    margin: '0px',
    '& .MuiListItemText-primary': {
        color: '#06374a',
        display: 'inline-block',
        fontSize: '13px',
        fontFamily: 'Montserrat-Regular',
    },
    '& .MuiListItemText-secondary': {
        color: '#06374a',
        display: 'inline-block',
        fontSize: '13px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '26px',
        display: 'inline-block',
        paddingLeft: '10px',
    },
  },
  formBox: {
    //padding: '5px 8px !important',
    '& .MuiOutlinedInput-root.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#06374a',
      },
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#06374a',
    },
    '& .MuiInputLabel-formControl': {
        fontSize: '14px',
        fontFamily: 'Montserrat-Regular',
    },
  },
  dialogHeadBox: {
    '& button': {
      float: 'right',
      padding: '5px',
      '& svg': {
        fontSize: '20px',
      },
    },
  },
});

const options = {
  filterType: 'dropdown',
  responsive: 'vertical',
  print: false,
  filter: false,
  download: false,
  viewColumns: false,
  selectableRowsHideCheckboxes: false,
  selectableRowsHeader: false,
  selectableRowsOnClick: false,
  viewColumns: false,
  selectableRows: false,
  rowsPerPage: 10,
  page: 0,

};

// const rows = [
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
//   { DepartmentName: 'HR', DepartmentDescription: 'Department Description' },
// ];

// const userList = [
//   { title: 'Ashutosh'},
//   { title: 'Saddam' },
//   { title: 'Mayank' },
// ];


class DepartmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data:[],
      departments:[],
      userList:[],
      open: false,
      openDel: false,
      departmentname : '' ,
      departmentdescription : '',
      companyName:"",
      touched:{},
      errors:{},
      departmentId: "",
      userId: "",
  

    }
    this.action = new UserActions(this.props.dispatch);

    const {classes} =this.props

    this.columns = [
      {
        name: 'Department Name',
         options: {
           filter: true,
       }
       },
       {
         name: 'Department Description',
         options: {
          filter: true,
         }
        },
        {
          name: 'Actions',
          options: {
          filter: false,
          }
        },
        ];

  }

  handleEdit=(departmentName,departmentDescription,departmentId)=>{
    console.log({props:this.props})
    this.props.history.push({pathname:'/editdepartment', departmentName,departmentDescription, departmentId})

  }
  handleToggle = () =>{
    this.setState({
        open: !this.state.open
    })
  }
  handleToggleAlert = () =>{
    this.setState({
      openDel: !this.state.openDel
    })
  }
  componentDidMount=()=> {
    const fkCompanyId=localStorage.getItem('companyId')

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/'+fkCompanyId+'/departments/',
      method: 'GET',
    }).then((res) => {
      console.log("responseE ",res) ;
      const {classes}=this.props
      const departments_data= res.data.data.results.map((department=>{
        console.log("department",department.id) ;

        this.setState({departNameVal :department.departmentName})
        return {
          "Department Name":department.departmentName,
          "Department Description":department.departmentDescription,
          "Actions":(
            <div>
              <IconButton className={classes.dataTableActionBtn} aria-label="edit"><button onClick={()=>this.handleEdit(department.departmentName,department.departmentDescription , department.id)}><EditIcon /></button></IconButton>
              {/* <IconButton className={classes.dataTableActionBtn} aria-label="delete" onClick={this.handleToggleAlert}><DeleteIcon /></IconButton> */}
              <IconButton className={classes.dataTableActionBtn} aria-label="userassign"><PersonAddIcon onClick={()=>this.handleClickOpen(department.departmentName,department.company_name, department.id)} /></IconButton>
            </div>
          )

        }
      }))
      this.setState({departments:departments_data})
      console.log({departments:this.state.departments})

    }).catch((err) => {
      console.log({error:err})

    })
    axios({
      url: process.env.API_URL + process.env.API_VERSION +'/companies/'+localStorage.getItem('companyId')+'/company-users/',
      // url: process.env.API_URL + process.env.API_VERSION +'/user/',
      method: 'GET',
    }).then((res) => {
      console.log({result:res.data.data.results})
      const userList=res.data.data.results.users.map(user=>({'id':user.id,"name":user.name}))
      console.log({user_list:userList})
      this.setState({userList:userList})
    }).catch((err) => {
      console.log({error:err})

    })


  }

  handleAssignUser=()=>{

    const fkCompanyId=localStorage.getItem('companyId')
    const fkUserId= this.state.userId
    let payload = {
      fkUserId : fkUserId,
      departmentID : this.state.departmentId,
      fkCompanyId :fkCompanyId
    }
    console.log(payload,'pay')
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/companies/'+fkCompanyId+'/departments/'+this.state.departmentId+'/users/',
      method: 'POST',
      data: payload,
  }).then((res) => {
      console.log({ result: res})
      this.action.openSnackbar('Department assign to User succesfully')
      this.setState({open: false})
      this.action.showSnackbar
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

  handleClickOpen = (departmentName,companyName, departmentId) => {
    this.setState({departmentname:departmentName})
    this.setState({companyName:companyName})
    this.setState({departmentId: departmentId})
    this.setState({open:!this.state.open})
  };
  handleClose = () => {
        this.setState({open:!this.state.open})   
  };

  handleSearchChange=(e,newValue)=>{
    console.log({event:newValue})
    if(newValue){
    this.setState({userId:newValue.id},()=>console.log({userId:this.state.userId}))
    }
}

  render() {
    const { classes } = this.props;

    const DialogTitle = withStyles(styles)((props) => {
      const { children, classes, onClose, ...other } = props;
      return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
          <Typography variant="h6">{children}</Typography>
          {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
              <CloseIcon />
            </IconButton>
          ) : null}
        </MuiDialogTitle>
      );
    });

    const columns = [
      {
        name: 'Department Name',
        options: {
          filter: true
        }
      },
      {
        name: 'Department Description',
        options: {
          filter: true,
        }
      },
      {
        name: 'Action',
        options: {
          filter: false,
          // customBodyRender: (value) => (
          //   <div>
          //     {console.log("value",value)}
          //     <IconButton className={classes.dataTableActionBtn} aria-label="edit"><Link to="/editdepartment"  ><EditIcon /></Link></IconButton>
          //     <IconButton className={classes.dataTableActionBtn} aria-label="delete"><DeleteIcon /></IconButton>
          //     <IconButton className={classes.dataTableActionBtn} aria-label="userassign"><PersonAddIcon onClick={this.handleClickOpen} /></IconButton>
          //   </div>
          // )
        }
      },
    ];
    
     return (
      <Fragment>
        <Page title="Departments">
        <div className={classes.DepartmentListSection} >
        <Dialog className={classes.dialogSection} aria-labelledby="customized-dialog-title" openDel={this.state.openDel}>
              <DialogContent>
                  <ListItemText className={classes.dialogTitle} primary="Are you sure to unsubscribe ?" />
                  <DialogActions>
                      <Button  variant="outlined" className={classes.popupBtn}>
                          Yes
                      </Button>
                      <Button  variant="outlined" className={classes.popupBtn}>
                          No
                      </Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
        <Dialog onClose={this.handleClose} className={classes.dialogSection} aria-labelledby="customized-dialog-title" open={this.state.open}>
        <DialogTitle id="customized-dialog-title" className={classes.dialogHeadBox} onClose={this.handleClose}>
                Assign Department
            </DialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    className={classes.selectUserBtnSection}
                    spacing={2}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                    >
                        <ListItemText className={classes.applicationName} primary="Department Name : " secondary={this.state.departmentname}/>
                    </Grid>
                    <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                    >
                        <ListItemText className={classes.applicationName} primary="Company Name : " secondary={this.state.companyName} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={6}
                      className={classes.formBox}
                    >                                                    
                      <Autocomplete
                        freeSolo
                        fullWidth
                        id='id'
                        name='id'
                        //disableClearable
                        className={classes.formControl}
                        options={this.state.userList}
                        onChange={(e,newValue)=>{this.handleSearchChange(e,newValue)}}
                        getOptionLabel={
                          option=>option.name
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Search User"
                            margin="dense"
                            variant="outlined"
                            helperText={this.state.touched.userId && Boolean(errors.userId) ? errors.userId : ""}

                            InputProps={{ ...params.InputProps, type: 'search' }}/>
                        )}
                      />
                    </Grid>
                    <Grid 
                      item
                      md={12}
                      xs={12}
                    >
                      <Button variant="outlined" size="medium" className={classes.custmAssignBtn} onClick={() => this.handleAssignUser()}>
                          Assign User
                      </Button>
                    </Grid>
                </Grid>
              </DialogContent>
        </Dialog>

          <Grid container >
            <Grid item md={10} xs={9} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">Departments</Typography>
            </Grid>
            <Grid item md={2} xs={3} className={classes.custmSubmitBtn}>
              <Link to="/adddepartment" variant="outlined" button size="medium">New Department</Link>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} className={classes.table}>
            <MUIDataTable className={classes.tableHead}
              data={this.state.departments}
              columns={this.columns}
              options={options}
            />
          </Grid>
        </div>
        </Page>
      </Fragment>
    );
  };
};

DepartmentList.propTypes = {
  className: PropTypes.string,
  // addresses: PropTypes.array.isRequired
};

function mapDispatchToProps(dispatch) { return { dispatch }; }


export default withRouter(connect(
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(DepartmentList)));

// export default withStyles(styles)(DepartmentList);
