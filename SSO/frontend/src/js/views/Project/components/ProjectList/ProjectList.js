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
import Page from '../../../../../components/Page';
import { getPermissions } from '../../../../../helpers';


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
            fontFamily: 'Montserrat-Medium',
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
  // customRowRender:() => {
  //         return (<Button  variant="outlined" size="medium">
  //                 Re-Invite
  //         </Button>)
  //       }

};


class ProjectList extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      data:[],
      user:[],
      open: false,
      // companies:[],
      // applications:[],
      // invites:[],
      // roles:[],
      // appId:"",
      // roleId:"",
      // email:"",
      // mobile:"",
      // companyId:"",
      // touched:{},
      // errors:{},
      // role_dropdown:true

    }
    //this.action = new UserActions(this.props.dispatch);
  
  }
  user = [
    {
      value: 'select-contrystate',
      label: 'Select State',
    },
    {
      value: 'Maharashtra',
      label: 'Maharashtra',
    },
    {
      value: 'Uttar Pradesh',
      label: 'Uttar Pradesh',
    },
    {
      value: 'Delhi',
      label: 'Delhi',
    },
    {
      value: 'Gujrat',
      label: 'Gujrat',
    },
    {
      value: 'Madhya Pradesh',
      label: 'Madhya Pradesh',
    },
  ];


  
  render() {
    const { classes } = this.props;
    const { projects } = this.props;
    console.log({projects: projects})


    const projectsData= projects.map((project=>{
      return {
        "Project Name":project.projectName,
        "Project Description":project.projectDescription,
        "Project Phase":project.projectPhase,
        "Project Nature":project.projectNature,
        "Actions":(
          <IconButton className={classes.dataTableActionBtn} aria-label="edit" onClick={()=>this.handleAction(user.id,user.name,user.companies)}><EditIcon /></IconButton>
          )
      }
    }))
    
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
        name: 'Project Name',
        options: {
          filter: true
        }
      },
      {
        name: 'Project Description',
        options: {
          filter: true,
        }
      },
      {
        name: 'Project Phase',
        options: {
          filter: true,
        }
      },
      {
        name: 'Project Nature',
        options: {
          filter: true,
        }
      },
      // {
      //   name: 'Action',
      //   options: {
      //     filter: false,
      //     customBodyRender: (value) => (
      //       <div>
      //         <IconButton className={classes.dataTableActionBtn} aria-label="edit" disabled><Link to="/editproject"><EditIcon /></Link></IconButton>
      //         <IconButton className={classes.dataTableActionBtn} aria-label="delete" disabled><DeleteIcon /></IconButton>
      //       </div>
      //     )
      //   }
      // },
    ];
    

    const data = [
      ['NTPC', 'Project Description', 'Project Phase', 'Project Nature' ],
      ['JWIL', 'Project Description', 'Project Phase', 'Project Nature' ],
      ['NTPC', 'Project Description', 'Project Phase', 'Project Nature' ],
      ['JWIL', 'Project Description', 'Project Phase', 'Project Nature' ],
      ['NTPC', 'Project Description', 'Project Phase', 'Project Nature' ],
    ];

    return (
      <Fragment>
        <Page title="Projects">
          <div className={classes.DepartmentListSection} >
          <Grid container >
            <Grid item md={12} xs={12} className={classes.contentSection}>
              <Typography className={classes.contentTitle} varient="h1">Projects</Typography>
            </Grid>
            {/* <Grid item md={2} xs={3} className={classes.custmSubmitBtn}>
              <Link to="/addproject" disabled={getPermissions('companies.add_projects')} variant="outlined" button size="medium">New Project</Link>
            </Grid> */}
          </Grid>
          <Grid item md={12} xs={12} className={classes.table}>
            <MUIDataTable className={classes.tableHead}
              data={projectsData}
              columns={columns}
              options={options}
            />
          </Grid>
        </div>
        </Page></Fragment>
    );
  };
};

ProjectList.propTypes = {
  className: PropTypes.string,
  // addresses: PropTypes.array.isRequired
};

export default withStyles(styles)(ProjectList);