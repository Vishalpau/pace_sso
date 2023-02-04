import React, { useEffect, useState, Component, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Typography, CardContent, Card, TextField, Button, MenuItem, Select, FormControl, InputLabel, Menu } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import ProfilePicDefault from '../../../../../static/public/images/LoginImg/profilePicDefault.png';
import Flag from '../../../../../static/public/images/LoginImg/flag.png';
// import UserProfile from '../../../../../static/public/images/LoginImg/userProfile.jpg';
import TeknobiltLogo from '../../../../../static/public/images/LoginImg/teknobiltLogo.png';
import NtpcLogo from '../../../../../static/public/images/LoginImg/ntpcLogo.png';
import QrCode from '../../../../../static/public/images/LoginImg/qrCode.jpg';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import '../../../../../../SSO/frontend/src/App.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import AddIcon from '@material-ui/icons/Add';
import AddIcon from '../../../../../static/public/images/LoginImg/addIcon.svg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import EditIcon from '@material-ui/icons/Edit';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';


import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//   },
allPadding: {
    padding: '24px 24px 0px 24px',
    marginBottom: '10px',
},
paddBRemove: {
    paddingBottom: '0px',
},
contentTitle: {
    fontSize: '26px',
    lineHeight: '29px',
    fontFamily: 'xolonium',
    color: '#06425C',
    paddingBottom: '15px',
    borderBottom: '1px solid #d6d9da',
    // marginBottom: '30px',
    '& svg': {
        verticalAlign: 'middle',
        marginRight: '15px',
    },
    [theme.breakpoints.down("md")]: {
      fontSize: '22px',
      lineHeight: '40px',
    },
},
groupIconSection: {
    marginBottom: '20px',
    paddingLeft: '24px',
    paddingRight: '24px',
},
iconGroupTitle: {
    paddingBottom: '2px !important',
    paddingTop: '0px !important',
    '& h6': {
        color: '#06425C',
        fontSize: '16px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '19px',
        paddingTop: '8px',
        '& svg': {
            verticalAlign: 'middle',
        },
    },
},
mainGroupSection: {
    paddingTop: '0px !important',
},
mainGroupShowSection: {
    paddingTop: '6px !important',
},
paperSection: {
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '20px',
    paddingBottom: '20px',
},
profileImgBox: {
    position: 'relative',
    maxWidth: '270px',
    width: '100%',
    float: 'left',
    '& input': {
      display: 'none',
    },
    '& .MuiAvatar-root': {
      width: '245px',
      height: '245px',
      position: 'relative',
    },
    '& .MuiButtonBase-root': {
      position: 'absolute',
      left: '185px',
      top: '205px',
      padding: '0px',
      '& .MuiIconButton-label': {
        padding: '9px 9px 8px 9px',
        backgroundColor: '#06425C',
        borderRadius: '100%',
      },
    },
    '& .MuiSvgIcon-root': {
      color: '#ffffff',
      fontSize: '20px',
    },
},
viewLabel: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular',
    color: '#7692A4',
    lineHeight: '18px',
},
viewLabelValue: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Medium',
    color: '#666666',
    lineHeight: '18px',
},
formBox: {
    position: 'relative',
    //padding: '5px 12px !important',
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
verifyEmail: {
    position: 'absolute',
    top: '25px',
    right: '20px',
},
emailForm: {
    '& .MuiOutlinedInput-root': {
        paddingRight: '40px',
    },
},
mobileCountry: {
    '& label': {
        paddingLeft: '62px',
        '&.MuiInputLabel-shrink': {
            paddingLeft: '82px',
        },
    },
    '& .MuiOutlinedInput-root input': {
        paddingLeft: '77px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        padding: '0 8px 0px 72px',
    },
},
countryFlag: {
    position: 'absolute',
    left: '13px',
    top: '25px',
    padding: '4px 14px',
    borderRight: '1px solid #D1D1D1',
    display: 'flex',
},
topAlignSection: {
    paddingTop: '50px !important',
},
topAlignViewSection: {
    paddingTop: '28px !important',
},
buttonStyle: {
    color: '#ffffff',
    padding: '5px 20px',
    fontSize: '16px',
    marginRight: '15px',
    textTransform: 'none',
    backgroundColor: '#06425C',
    borderRadius: '25px',
    boxShadow: 'none',
    border: '1px solid #06425C',
    '&:hover': {
        backgroundColor: '#F28705',
        borderColor: '#F28705'
    },
},
custmCancelBtn: {
    color: '#06425C',
    padding: '5px 20px',
    fontSize: '16px',
    marginRight: '15px',
    textTransform: 'none',
    backgroundColor: '#ffffff',
    borderRadius: '25px',
    boxShadow: 'none',
    border: '1px solid #06425C',
    '&:hover': {
        backgroundColor: '#F28705',
        color: '#ffffff',
        borderColor: '#F28705'
    },
},
verifViewIcon: {
    paddingLeft: '8px',
    '& svg': {
        verticalAlign: 'middle',
    },
},
viewListBox: {
    paddingBottom: '6px !important',
    paddingTop: '6px !important',
},
checkRadioLabel: {
    fontSize: '16px',
    color: '#666666',
    fontFamily: 'Montserrat-SemiBold',
    lineHeight: '19px',
    marginBottom: '2px',
    '&.Mui-focused': {
        color: '#666666',
    },
},
selectLabel: {
    marginBottom: '0',
    '& .MuiFormControlLabel-label': {
        fontSize: '14px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '19px',
        color: '#737373',
    },
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
        color: '#06374A',
    },
    '& .MuiRadio-root': {
        color: '#06374A',
    }
},
addAddCardBox: {
    minHeight: '234px',
    border: '1px dashed #ccc',
    '& .MuiCardContent-root': {
      padding: '0px',
      '& button': {
        width: '100%',
        height: '234px',
        display: 'block',
        '& svg': {
          fontSize: '65px',
          color: '#054D69',
        },
        '& .MuiTypography-root': {
          fontSize: '16px',
          color: '#054D69',
          fontFamily: 'Montserrat-Medium',
          lineHeight: '22px',
          paddingTop: '15px',
        },
      },
      '& button:focus': {
        outline: 'none',
      },
    },
},
popperBox: {
    zIndex: '1',
},
popperSection: {
    width: '125px',
    padding: '0px',
    float: 'left',
    display: 'block',
    '& ul': {
        paddingTop: '0px',
        paddingBottom: '0px',
        boxShadow: '0px 1px 3px 0px rgb(142 142 142 / 20%), 0px 1px 1px 0px rgb(243 243 243 / 14%), 0px 2px 1px -1px rgb(204 204 204 / 12%)',
    },
},
actionAddList: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '2px',
    paddingBottom: '2px',
    borderBottom: '0.5px solid #cccccc',
},
actionAddListOne: {
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '2px',
    paddingBottom: '2px',
},
popperListLink: {
    padding: '0px 12px',
    '& .MuiListItemText-primary': {
        '& svg':{
            float: 'right',
            marginTop: '3px',
        },
        '& div': {
            color: '#737373',
            fontSize: '12px',
            fontFamily: 'Montserrat-Medium',
        },
    },
},
addressTagList: {
    '& .MuiListItemText-primary': {
        display: 'inline-block',
        padding: '5px 12px',
        backgroundColor: '#E0EDF2',
        color: '#06425C',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '16px',
        lineHeight: '19px',
        borderRadius: '6px',
    }
},
addressTitleList: {
    '& .MuiListItemText-primary': {
        //display: 'inline-block',
        // padding: '5px 12px',
        // backgroundColor: '#E0EDF2',
        color: '#000000',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '16px',
        lineHeight: '19px',
        //borderRadius: '6px',
    }
},
addressNoList: {
    '& .MuiListItemText-primary': {
        color: '#707070',
        fontFamily: 'Montserrat-Medium',
        fontSize: '16px',
        lineHeight: '19px',
    }
},
addressContntList: {
    paddingRight: '40px',
    '& .MuiListItemText-primary, .MuiListItemText-secondary': {
        color: '#707070',
        fontFamily: 'Montserrat-Medium',
        fontSize: '16px',
        lineHeight: '24px',
    },
},
infoHeadSection: {
    color: '#06425C',
    backgroundColor: '#F5F6F8',
    padding: '20px',
    display: 'block',
    fontSize: '16px',
    fontFamily: 'Montserrat-Medium',
    lineHeight: '20px',
    borderRadius: '9px 9px 0px 0px',
    marginBottom: '3px',
},
compList: {
    borderRadius: '0px 0px 9px 9px',
    backgroundColor: '#F5F6F8',
    '& .MuiListItemSecondaryAction-root img': {
        height: '40px',
    },
},
projList: {
    borderRadius: '0px 0px 9px 9px',
    backgroundColor: '#F5F6F8',
    padding: '8px',
    '& span': {
        maxHeight: '250px',
        overflow: 'auto',
        display: 'block',
    },
    '& .MuiListItem-secondaryAction': {
        paddingRight: '16px',
    },
    '& li': {
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        marginBottom: '3px',
        '&:hover': {
            backgroundColor: '#F28705',
            '& .MuiListItemSecondaryAction-root svg g path': {
                fill: '#ffffff',
            },
            '& .MuiListItem-button .MuiListItemText-root .MuiListItemText-primary': {
                color: '#ffffff',
            },
        },
    },
},
compnyNameTitle: {
    '& .MuiListItemText-primary': {
        color: '#06425C',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: '16px',
        lineHeight: '19px',
    },
},
infoListSection: {
    '& .MuiListItemText-primary': {
        color: '#06425C',
        fontFamily: 'Montserrat-Medium',
        fontSize: '13px',
        lineHeight: '16px',
    },
},
projListNoLink: {
    padding: '8px',
    borderRadius: '0px 0px 9px 9px',
    backgroundColor: '#F5F6F8',
    '& span': {
        maxHeight: '250px',
        overflow: 'auto',
        display: 'block',
    },
    '& li': {
        '& .MuiListItemText-root .MuiListItemText-primary': {
            color: '#6B6B6B',
            fontSize: '13px',
            fontFamily: 'Montserrat-Medium',
            lineHeight: '16px',
        },
    },
},
listActive: {
    backgroundColor: '#F28705',
    borderRadius: '5px',
    '& + .MuiListItemSecondaryAction-root svg g path': {
        fill: '#ffffff',
    },
    '& .MuiListItemText-root .MuiListItemText-primary': {
        color: '#ffffff',
    },
},
notificationListSection: {
    padding: '0px',
    '& li': {
        borderBottom: '1px solid #DBDBDB',
        '& .MuiListItem-root': {
            paddingRight: '0px',
            paddingLeft: '0px',
            '& .MuiListItemText-primary': {
                color: '#707070',
                fontSize: '16px',
                fontFamily: 'Montserrat-Medium',
                lineHeight: '19px',
            },
        },
        '& .MuiListItemSecondaryAction-root': {
            right: '0px',
            '& .MuiSwitch-root': {
                paddingRight: '10px',
            },
        },
        '&:last-child': {
            borderBottom: 'none',
        },
    },
},
switchNo: {
    width: '70px',
    height: '44px',
    '& .MuiIconButton-label': {
        '& .MuiSwitch-thumb': {
            border: '1px solid #06425C',
            width: '15px',
            height: '15px',
        },
    },
    '& .MuiSwitch-track': {
        backgroundColor: '#06425C',
        opacity: '1',
        borderRadius: '60px',
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(28px)',
        color: '#ffffff',
        '& .MuiSwitch-thumb':{
            border: '1px solid #F28705',
        },
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#F28705',
        opacity: '1',
    },
    '& .MuiSwitch-switchBase': {
        top: '5.5px',
        left: '6px',
    },
},
topMessageDilog: {
    '& h2': {
        fontSize: '30px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '37px',
        color: '#06425C',
        paddingTop: '15px',
    },
    '& h3': {
        paddingTop: '20px',
    },
},
deleteMassBox: {
    '& h6': {
        fontSize: '16px',
        lineHeight: '19px',
        fontFamily: 'Montserrat-Medium',
        color: '#666666',
        paddingBottom: '23px',
    },
    '& div': {
        paddingBottom: '22px',
        paddingTop: '10px',
    },
},
barCodeSection: {
    marginTop: '5px',
    '& span': {
        width: '237px',
        height: '237px',
        float: 'right',
        position: 'relative',
        display: 'block',
        '& svg': {
            position: 'absolute',
            top: '0',
        },
    },
},
qrCodeBox: {
    width: '100%',
    height: '100%',
    padding: '10px',
},
}));

const styles = (theme) => ({
	root: {
	  margin: 0,
	},
	closeButton: {
	  position: 'absolute',
	  right: theme.spacing(1),
	  top: theme.spacing(1),
	  color: theme.palette.grey[500],
	},
});

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
  
  const DialogContent = withStyles((theme) => ({
	root: {
	  //padding: theme.spacing(2),
	},
  }))(MuiDialogContent);
  

const NewUserProfile = () => {

    const userdata=JSON.parse(localStorage.getItem('userdata'))

    console.log({'user':userdata})
    const classes = useStyles();



    const [selectedDate, setSelectedDate] = React.useState(new Date('2022-01-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    const [myAccount, setMyAccount] = useState(true);
    const [myAccountInfo, setMyAccountInfo] = useState([]);
    const [personalDetails, setPersonalDetails] = useState(true);
    const [identification, setIdentification] = useState(true);
    const [workLocation, setWorkLocation] = useState(true);
    const [newAddresses, setNewAddresses] = useState(true);
    const [editAddresses, setEditAddresses] = useState(true);
    const [emergencyDetails, setEmergencyDetails] = useState(true);

   
    React.useEffect(() => {
		getUserDetails()
	})


    const getUserDetails=()=>{
        let myAccountInfo=[]
        myAccountInfo=[...myAccountInfo,{'name':userdata.user.name,'email':userdata.user.email,'emailVerified':userdata.user.emailVerified,'mobile':userdata.user.mobile,'avatar':userdata.user.avatar}]
        console.log({myAccountInfo:myAccountInfo[0]})

        setMyAccountInfo(myAccountInfo[0])
        console.log({myAccountInfo:myAccountInfo})
        }


    const handelMyAccountEdit = (e) => {
        setMyAccount(false);
    };
    const handelMyAccountView = (e) => {
        setMyAccount(true);
    };

    const handelPersonalDetailsEdit = (e) => {
        setPersonalDetails(false);
    };
    const handelPersonalDetailsView = (e) => {
        setPersonalDetails(true);
    };

    const handelIdentificationEdit = (e) => {
        setIdentification(false);
    };
    const handelIdentificationView = (e) => {
        setIdentification(true);
    };

    const handelWorkLocationEdit = (e) => {
        setWorkLocation(false);
    };
    const handelWorkLocationView = (e) => {
        setWorkLocation(true);
    };

    const handelNewAddressesAdd = (e) => {
        setNewAddresses(false);
    };
    const handelNewAddressesView = (e) => {
        setNewAddresses(true);
    };

    const handelEditAddressesEdit = (e) => {
        setEditAddresses(false);
    };
    const handelEditAddressesView = (e) => {
        setEditAddresses(true);
    };

    const handelEmergencyDetailsEdit = (e) => {
        setEmergencyDetails(false);
    };
    const handelEmergencyDetailsView = (e) => {
        setEmergencyDetails(true);
    };

    // const [values, setValues] = React.useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    // });
    
    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };
    
    // const handleClickShowPassword = () => {
    //     setValues({
    //       ...values,
    //       showPassword: !values.showPassword,
    //     });
    // };
    
    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };



    const [values, setValues] = React.useState({
        password: "",
        showPassword: false
      });
    
      const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };



    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [placement, setPlacement] = React.useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };



    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };




    const [showRadioUnplanned, setRadioUnplanned] = React.useState(false);
    const onClick = () => setRadioUnplanned(true);


    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChangeSwitch = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // const [open, setOpen] = React.useState(false);
    const [deleteAddress,setDeleteAddress]=React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState('md');

    const handleClickDelete = () => {
		setDeleteAddress(true);
    }
    const handleCloseDelete = () => {
        setDeleteAddress(false);
    }

    return (
        <Fragment>
            <Grid container spacing={3} className={classes.allPadding}>
                <Grid item md={12} xs={12} className={classes.contentSection}>
                    <Typography className={classes.contentTitle} varient="h1">  
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                            <g id="User-40" transform="translate(-260 -83)">
                                <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(260 83)" fill="none" stroke="#06425c" stroke-width="2">
                                <circle cx="20" cy="20" r="20" stroke="none"/>
                                <circle cx="20" cy="20" r="19" fill="none"/>
                                </g>
                                <path id="noun-id-card-1262898-FF9C34" d="M246.351,119.1a5,5,0,1,1-4.825,5A4.914,4.914,0,0,1,246.351,119.1Zm0,12.22c5.921,0,10.722,3.672,10.722,8.887H235.629C235.629,134.989,240.429,131.316,246.351,131.316Z" transform="translate(33.371 -27.097)" fill="#06425c"/>
                            </g>
                        </svg>
                        User Profile
                    </Typography>
                </Grid>
            </Grid>

            {/* Start my account section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="My-account-24" transform="translate(-552 -288)">
                                <g id="User-40" transform="translate(292 205)">
                                <g id="Ellipse_1" data-name="Ellipse 1" transform="translate(260 83)" fill="none" stroke="#06425c" stroke-width="1">
                                    <circle cx="12" cy="12" r="12" stroke="none"/>
                                    <circle cx="12" cy="12" r="11.5" fill="none"/>
                                </g>
                                <path id="noun-id-card-1262898-FF9C34" d="M241.64,119.1a2.8,2.8,0,1,1-2.705,2.8A2.751,2.751,0,0,1,241.64,119.1Zm0,6.833c3.32,0,6.011,2.053,6.011,4.969H235.629C235.629,127.983,238.32,125.93,241.64,125.93Z" transform="translate(30.256 -30.211)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg> My account
                    </Typography>
                </Grid>
                <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" onClick={(e) => handelMyAccountEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                        {myAccount === false ? (
                        <Fragment>
                            <Grid item md={3} sm={4} xs={12} className={classes.profileImgBox}>
                                <input accept="image/*" className={classes.input} id="icon-button-file" name="avatar" type="file"/>
                                <label htmlFor="icon-button-file">
                                    <Avatar alt="profile image " src={ProfilePicDefault} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid item md={8} sm={8} xs={12} className={classes.topAlignSection}>
                                <Grid container spacing={3}>
                                    <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                        <TextField
                                            label="Full name*"
                                            name="clientrepnu"
                                            id="clientrepnu"
                                            defaultValue=""
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                        <TextField
                                            label="Email*"
                                            name="clientrepnu"
                                            id="clientrepnu"
                                            defaultValue=""
                                            fullWidth
                                            variant="outlined"
                                            className={classes.emailForm}
                                        />
                                        <span className={classes.verifyEmail}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28">
                                                <g id="email-check" transform="translate(0 0)">
                                                    <path id="Path_5181" data-name="Path 5181" d="M13.813-793.618a16.218,16.218,0,0,0-1.749.3,2.592,2.592,0,0,1-.271.074,13.1,13.1,0,0,0-1.5.481c-.215.085-.4.156-.416.156-.032,0-.494.216-.98.46a5.146,5.146,0,0,0-.652.361.764.764,0,0,1-.169.1,5.228,5.228,0,0,0-.511.318c-.159.1-.867.612-.881.633a2.443,2.443,0,0,1-.194.163c-.1.078-.2.163-.233.194s-.2.18-.388.336a5.845,5.845,0,0,0-.434.4c-.06.067-.194.212-.3.318a15.689,15.689,0,0,0-1.632,2.09c-.271.435-.261.414-.434.725a13.81,13.81,0,0,0-1.692,5.321,14.514,14.514,0,0,0-.06,2.316c.021.368.049.735.06.813.078.594.254,1.588.3,1.7.018.039.063.205.106.371a14.681,14.681,0,0,0,1.315,3.218c.187.325.55.912.606.979.018.021.116.156.212.293.166.237.391.534.663.866.138.166.4.46.663.732.106.113.208.223.233.247.042.046.395.364.68.619.222.195.663.541.832.658a2.474,2.474,0,0,1,.219.166.264.264,0,0,0,.113.071c.021,0,.046.025.056.053s.035.053.056.053a1.168,1.168,0,0,1,.233.134,14.7,14.7,0,0,0,3.55,1.655,14.883,14.883,0,0,0,2.468.506,15.443,15.443,0,0,0,3.7-.064,14.7,14.7,0,0,0,2.246-.537.3.3,0,0,1,.1-.032,8.448,8.448,0,0,0,.913-.343,16.227,16.227,0,0,0,1.463-.707c.173-.1.987-.6,1.058-.658.046-.035.61-.449.709-.52a15.618,15.618,0,0,0,1.826-1.718,16.391,16.391,0,0,0,1.759-2.454,13.9,13.9,0,0,0,1.788-6.859,13.686,13.686,0,0,0-.829-4.826,11.034,11.034,0,0,0-.617-1.432c-.384-.76-.469-.916-.518-.933s-.2.106-.68.566c-.145.138-.367.346-.494.467l-.229.216.13.258a10.321,10.321,0,0,1,.628,1.425.6.6,0,0,0,.049.134,12.844,12.844,0,0,1,.476,1.7,13.418,13.418,0,0,1,.145,3.925,12.3,12.3,0,0,1-1.128,3.762c-.1.2-.176.368-.176.375s-.109.2-.271.46a1.35,1.35,0,0,0-.092.177.624.624,0,0,1-.106.156.14.14,0,0,0-.06.081,1.576,1.576,0,0,1-.166.269c-.088.131-.2.283-.236.343a16.288,16.288,0,0,1-1.981,2.125c-.346.29-.564.463-.79.619a1.706,1.706,0,0,0-.24.18.052.052,0,0,1-.049.028.484.484,0,0,0-.148.088.453.453,0,0,1-.155.088.055.055,0,0,0-.049.032,1.143,1.143,0,0,1-.257.163c-.134.071-.261.141-.282.159a12.5,12.5,0,0,1-1.622.753,11.625,11.625,0,0,1-1.816.52c-.2.046-.769.134-1.2.184a18.885,18.885,0,0,1-2.45,0,11.058,11.058,0,0,1-1.833-.346,3.705,3.705,0,0,1-.906-.29.19.19,0,0,0-.12-.042,10.381,10.381,0,0,1-2.126-.99c-.187-.11-1.012-.672-1.114-.76-.056-.053-.152-.127-.208-.17a13.053,13.053,0,0,1-1.745-1.7c-.233-.279-.279-.336-.511-.654a14.026,14.026,0,0,1-1.326-2.334,12.943,12.943,0,0,1-.585-1.687,12.213,12.213,0,0,1,.025-6.315,8.37,8.37,0,0,1,.346-1.064,1.41,1.41,0,0,0,.088-.226,11.206,11.206,0,0,1,.846-1.732c.1-.159.2-.318.215-.354a13.513,13.513,0,0,1,1.061-1.407,14.89,14.89,0,0,1,1.551-1.5c.078-.057.162-.124.19-.149.046-.039.539-.389.783-.559a13.014,13.014,0,0,1,2.849-1.368,9.031,9.031,0,0,1,1.833-.431,1.57,1.57,0,0,0,.314-.053,11.255,11.255,0,0,1,2.3-.1,12.556,12.556,0,0,1,2.567.421,13.94,13.94,0,0,1,1.819.675c.035.021.212.106.384.194.36.177.592.3.723.385.49.311.874.573,1.1.75l.275.212.113-.06c.063-.035.3-.2.536-.375s.441-.318.462-.325a2.658,2.658,0,0,0,.472-.325.787.787,0,0,0-.219-.219c-.025-.021-.187-.152-.363-.29a17.653,17.653,0,0,0-1.481-1l-.268-.156c-.176-.106-.843-.435-1.2-.59a12.659,12.659,0,0,0-1.675-.608c-.173-.053-.356-.11-.405-.127s-.134-.039-.194-.049-.3-.06-.529-.11a11.627,11.627,0,0,0-2.662-.251A15.326,15.326,0,0,0,13.813-793.618Z" transform="translate(-1.296 793.659)" fill="#06425c"/>
                                                    <path id="Path_5182" data-name="Path 5182" d="M201.015-744.8a15.012,15.012,0,0,0-3.722.762c-.1.038-.284.1-.4.138s-.27.1-.346.132-.208.1-.294.135a18.039,18.039,0,0,0-1.991,1.025c-.426.273-.918.6-1.1.737a1.039,1.039,0,0,1-.235.145.034.034,0,0,0-.035.028,1.16,1.16,0,0,1-.232.2c-.211.152-.831.654-.876.706-.01.01-.073.062-.138.114-.3.246-1.468,1.378-1.918,1.87-.5.537-1.433,1.62-1.624,1.873a1.888,1.888,0,0,1-.156.19c-.031.024-.27.322-.405.505a1.447,1.447,0,0,1-.142.173,1.6,1.6,0,0,0-.138.173c-.055.076-.107.145-.118.156s-.744.98-1.018,1.35c-1.167,1.568-1.056,1.426-1.111,1.392a2.339,2.339,0,0,1-.267-.336c-.118-.173-.284-.4-.37-.509s-.267-.332-.4-.5a21.208,21.208,0,0,0-2.129-2.264c-.215-.2-.436-.405-.488-.457s-.294-.256-.54-.461-.5-.419-.561-.471a.484.484,0,0,0-.159-.1,5.5,5.5,0,0,0-.7.606c-.021.017-.184.166-.36.329s-.374.339-.429.395l-1.146,1.06a3.813,3.813,0,0,0-.287.28c-.007.017.048.09.125.159s.353.336.616.589a37.805,37.805,0,0,1,4.117,4.543c.076.1.208.274.294.384.319.412,1.523,2.157,1.523,2.206a1.275,1.275,0,0,0,.1.159c.142.211.585.942.627,1.035.021.045.062.125.1.183s.125.211.194.346c.149.27.218.364.28.364s.166-.142.377-.554c.111-.218.232-.436.263-.485s.08-.135.107-.19c.062-.125.357-.651.447-.8.035-.059.107-.19.163-.294.142-.27.859-1.506.945-1.624a.56.56,0,0,0,.069-.118c0-.035.526-.907,1.091-1.807.727-1.16,2.129-3.213,2.282-3.338a.157.157,0,0,0,.055-.08,3.054,3.054,0,0,1,.27-.377c.145-.19.3-.388.336-.44.076-.1.505-.637.537-.665.01-.01.087-.1.173-.208s.215-.263.294-.35.177-.208.225-.267a37.3,37.3,0,0,1,2.718-2.794c.111-.1.26-.225.325-.287.27-.253.665-.589,1.042-.89.142-.114.277-.225.294-.246.042-.042.3-.249.419-.325.042-.028.253-.187.471-.35s.454-.336.53-.381a1.021,1.021,0,0,0,.173-.121c.045-.059,1.25-.862,1.575-1.052a2.585,2.585,0,0,0,.277-.177.194.194,0,0,1,.052-.035c.035-.014.6-.339.814-.474.048-.031.163-.1.26-.145s.26-.142.364-.2.256-.145.339-.187.145-.087.145-.1A10.743,10.743,0,0,0,201.015-744.8Z" transform="translate(-170.59 746.531)" fill="#06425c"/>
                                                </g>
                                            </svg>
                                        </span>
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                        <TextField
                                            label="Mobile*"
                                            name="clientrepnu"
                                            id="clientrepnu"
                                            defaultValue=""
                                            fullWidth
                                            variant="outlined"
                                            className={classes.mobileCountry}
                                        />
                                        {/* <span className={classes.countryFlag} >
                                            <img src={Flag} alt="country flag" />
                                        </span> */}
                                    </Grid>
                                    <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                        <FormControl
                                            variant="outlined"
                                            fullWidth
                                        >
                                            <InputLabel id="project-name-label">Language preferance</InputLabel>
                                            <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="Language preferance"
                                            >
                                                <MenuItem value="english">English</MenuItem>
                                                <MenuItem value="franch">Franch</MenuItem>
                                                <MenuItem value="hindi">Hindi</MenuItem>
                                            </Select>
                                            
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelMyAccountView(e)}>
                                            Save
                                        </Button>
                                        <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelMyAccountView(e)}>
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            </Fragment>
                            ) : 
                            <Fragment>
                                <Grid item md={3} sm={3} xs={12} className={classes.profileImgBox}>
                                    <Avatar alt="profile image " src={myAccountInfo.avatar?myAccountInfo.avatar:ProfilePicDefault} />
                                </Grid> 
                                <Grid item md={6} sm={6} xs={12} className={classes.topAlignViewSection}>
                                    <Grid container spacing={3}>
                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <Typography
                                                variant="label"
                                                gutterBottom
                                                className={classes.viewLabel}
                                            >
                                                Full Name
                                            </Typography>
                                            <Typography className={classes.viewLabelValue}>
                                               {myAccountInfo.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <Typography
                                                variant="label"
                                                gutterBottom
                                                className={classes.viewLabel}
                                            >
                                                Email
                                            </Typography>
                                            <Typography className={classes.viewLabelValue}>
                                                {myAccountInfo.email}
                                                <span className={classes.verifViewIcon} hidden={!myAccountInfo.emailVerified}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 32 28">
                                                        <g id="email-check" transform="translate(0 0)">
                                                            <path id="Path_5181" data-name="Path 5181" d="M13.813-793.618a16.218,16.218,0,0,0-1.749.3,2.592,2.592,0,0,1-.271.074,13.1,13.1,0,0,0-1.5.481c-.215.085-.4.156-.416.156-.032,0-.494.216-.98.46a5.146,5.146,0,0,0-.652.361.764.764,0,0,1-.169.1,5.228,5.228,0,0,0-.511.318c-.159.1-.867.612-.881.633a2.443,2.443,0,0,1-.194.163c-.1.078-.2.163-.233.194s-.2.18-.388.336a5.845,5.845,0,0,0-.434.4c-.06.067-.194.212-.3.318a15.689,15.689,0,0,0-1.632,2.09c-.271.435-.261.414-.434.725a13.81,13.81,0,0,0-1.692,5.321,14.514,14.514,0,0,0-.06,2.316c.021.368.049.735.06.813.078.594.254,1.588.3,1.7.018.039.063.205.106.371a14.681,14.681,0,0,0,1.315,3.218c.187.325.55.912.606.979.018.021.116.156.212.293.166.237.391.534.663.866.138.166.4.46.663.732.106.113.208.223.233.247.042.046.395.364.68.619.222.195.663.541.832.658a2.474,2.474,0,0,1,.219.166.264.264,0,0,0,.113.071c.021,0,.046.025.056.053s.035.053.056.053a1.168,1.168,0,0,1,.233.134,14.7,14.7,0,0,0,3.55,1.655,14.883,14.883,0,0,0,2.468.506,15.443,15.443,0,0,0,3.7-.064,14.7,14.7,0,0,0,2.246-.537.3.3,0,0,1,.1-.032,8.448,8.448,0,0,0,.913-.343,16.227,16.227,0,0,0,1.463-.707c.173-.1.987-.6,1.058-.658.046-.035.61-.449.709-.52a15.618,15.618,0,0,0,1.826-1.718,16.391,16.391,0,0,0,1.759-2.454,13.9,13.9,0,0,0,1.788-6.859,13.686,13.686,0,0,0-.829-4.826,11.034,11.034,0,0,0-.617-1.432c-.384-.76-.469-.916-.518-.933s-.2.106-.68.566c-.145.138-.367.346-.494.467l-.229.216.13.258a10.321,10.321,0,0,1,.628,1.425.6.6,0,0,0,.049.134,12.844,12.844,0,0,1,.476,1.7,13.418,13.418,0,0,1,.145,3.925,12.3,12.3,0,0,1-1.128,3.762c-.1.2-.176.368-.176.375s-.109.2-.271.46a1.35,1.35,0,0,0-.092.177.624.624,0,0,1-.106.156.14.14,0,0,0-.06.081,1.576,1.576,0,0,1-.166.269c-.088.131-.2.283-.236.343a16.288,16.288,0,0,1-1.981,2.125c-.346.29-.564.463-.79.619a1.706,1.706,0,0,0-.24.18.052.052,0,0,1-.049.028.484.484,0,0,0-.148.088.453.453,0,0,1-.155.088.055.055,0,0,0-.049.032,1.143,1.143,0,0,1-.257.163c-.134.071-.261.141-.282.159a12.5,12.5,0,0,1-1.622.753,11.625,11.625,0,0,1-1.816.52c-.2.046-.769.134-1.2.184a18.885,18.885,0,0,1-2.45,0,11.058,11.058,0,0,1-1.833-.346,3.705,3.705,0,0,1-.906-.29.19.19,0,0,0-.12-.042,10.381,10.381,0,0,1-2.126-.99c-.187-.11-1.012-.672-1.114-.76-.056-.053-.152-.127-.208-.17a13.053,13.053,0,0,1-1.745-1.7c-.233-.279-.279-.336-.511-.654a14.026,14.026,0,0,1-1.326-2.334,12.943,12.943,0,0,1-.585-1.687,12.213,12.213,0,0,1,.025-6.315,8.37,8.37,0,0,1,.346-1.064,1.41,1.41,0,0,0,.088-.226,11.206,11.206,0,0,1,.846-1.732c.1-.159.2-.318.215-.354a13.513,13.513,0,0,1,1.061-1.407,14.89,14.89,0,0,1,1.551-1.5c.078-.057.162-.124.19-.149.046-.039.539-.389.783-.559a13.014,13.014,0,0,1,2.849-1.368,9.031,9.031,0,0,1,1.833-.431,1.57,1.57,0,0,0,.314-.053,11.255,11.255,0,0,1,2.3-.1,12.556,12.556,0,0,1,2.567.421,13.94,13.94,0,0,1,1.819.675c.035.021.212.106.384.194.36.177.592.3.723.385.49.311.874.573,1.1.75l.275.212.113-.06c.063-.035.3-.2.536-.375s.441-.318.462-.325a2.658,2.658,0,0,0,.472-.325.787.787,0,0,0-.219-.219c-.025-.021-.187-.152-.363-.29a17.653,17.653,0,0,0-1.481-1l-.268-.156c-.176-.106-.843-.435-1.2-.59a12.659,12.659,0,0,0-1.675-.608c-.173-.053-.356-.11-.405-.127s-.134-.039-.194-.049-.3-.06-.529-.11a11.627,11.627,0,0,0-2.662-.251A15.326,15.326,0,0,0,13.813-793.618Z" transform="translate(-1.296 793.659)" fill="#06425c"/>
                                                            <path id="Path_5182" data-name="Path 5182" d="M201.015-744.8a15.012,15.012,0,0,0-3.722.762c-.1.038-.284.1-.4.138s-.27.1-.346.132-.208.1-.294.135a18.039,18.039,0,0,0-1.991,1.025c-.426.273-.918.6-1.1.737a1.039,1.039,0,0,1-.235.145.034.034,0,0,0-.035.028,1.16,1.16,0,0,1-.232.2c-.211.152-.831.654-.876.706-.01.01-.073.062-.138.114-.3.246-1.468,1.378-1.918,1.87-.5.537-1.433,1.62-1.624,1.873a1.888,1.888,0,0,1-.156.19c-.031.024-.27.322-.405.505a1.447,1.447,0,0,1-.142.173,1.6,1.6,0,0,0-.138.173c-.055.076-.107.145-.118.156s-.744.98-1.018,1.35c-1.167,1.568-1.056,1.426-1.111,1.392a2.339,2.339,0,0,1-.267-.336c-.118-.173-.284-.4-.37-.509s-.267-.332-.4-.5a21.208,21.208,0,0,0-2.129-2.264c-.215-.2-.436-.405-.488-.457s-.294-.256-.54-.461-.5-.419-.561-.471a.484.484,0,0,0-.159-.1,5.5,5.5,0,0,0-.7.606c-.021.017-.184.166-.36.329s-.374.339-.429.395l-1.146,1.06a3.813,3.813,0,0,0-.287.28c-.007.017.048.09.125.159s.353.336.616.589a37.805,37.805,0,0,1,4.117,4.543c.076.1.208.274.294.384.319.412,1.523,2.157,1.523,2.206a1.275,1.275,0,0,0,.1.159c.142.211.585.942.627,1.035.021.045.062.125.1.183s.125.211.194.346c.149.27.218.364.28.364s.166-.142.377-.554c.111-.218.232-.436.263-.485s.08-.135.107-.19c.062-.125.357-.651.447-.8.035-.059.107-.19.163-.294.142-.27.859-1.506.945-1.624a.56.56,0,0,0,.069-.118c0-.035.526-.907,1.091-1.807.727-1.16,2.129-3.213,2.282-3.338a.157.157,0,0,0,.055-.08,3.054,3.054,0,0,1,.27-.377c.145-.19.3-.388.336-.44.076-.1.505-.637.537-.665.01-.01.087-.1.173-.208s.215-.263.294-.35.177-.208.225-.267a37.3,37.3,0,0,1,2.718-2.794c.111-.1.26-.225.325-.287.27-.253.665-.589,1.042-.89.142-.114.277-.225.294-.246.042-.042.3-.249.419-.325.042-.028.253-.187.471-.35s.454-.336.53-.381a1.021,1.021,0,0,0,.173-.121c.045-.059,1.25-.862,1.575-1.052a2.585,2.585,0,0,0,.277-.177.194.194,0,0,1,.052-.035c.035-.014.6-.339.814-.474.048-.031.163-.1.26-.145s.26-.142.364-.2.256-.145.339-.187.145-.087.145-.1A10.743,10.743,0,0,0,201.015-744.8Z" transform="translate(-170.59 746.531)" fill="#06425c"/>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </Typography>
                                            {/* <span className={classes.verifyEmail}>
                                                
                                            </span> */}
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <Typography
                                                variant="label"
                                                gutterBottom
                                                className={classes.viewLabel}
                                            >
                                                Mobile
                                            </Typography>
                                            <Typography className={classes.viewLabelValue}>
                                                {/* <img src={Flag} alt="country flag" />  */}
                                                {myAccountInfo.mobile}
                                            </Typography>
                                            {/* <span className={classes.countryFlag} >
                                                
                                            </span> */}
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <Typography
                                                variant="label"
                                                gutterBottom
                                                className={classes.viewLabel}
                                            >
                                                Language
                                            </Typography>
                                            <Typography className={classes.viewLabelValue}>
                                                NA
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={3} sm={3} xs={12} className={classes.barCodeSection}>
                                    <span>
                                        <Avatar className={classes.qrCodeBox} variant="rounded" alt="profile image " src={QrCode} />
                                        <svg id="qr-code-bg" xmlns="http://www.w3.org/2000/svg" width="236.88" height="236.88" viewBox="0 0 236.88 236.88">
                                            <path id="Path_6548" data-name="Path 6548" d="M7.4,7.4h11.1V0H3.7A3.7,3.7,0,0,0,0,3.7v14.8H7.4Z"/>
                                            <path id="Path_6549" data-name="Path 6549" d="M73.8,0H59V7.4H70.1v11.1h7.4V3.7A3.7,3.7,0,0,0,73.8,0Z" transform="translate(159.374)"/>
                                            <path id="Path_6550" data-name="Path 6550" d="M7.4,59H0V73.8a3.7,3.7,0,0,0,3.7,3.7h14.8V70.1H7.4Z" transform="translate(0 159.374)"/>
                                            <path id="Path_6551" data-name="Path 6551" d="M70.1,70.1H59v7.4H73.8a3.7,3.7,0,0,0,3.7-3.7V59H70.1Z" transform="translate(159.374 159.374)"/>
                                        </svg>
                                    </span>
                                </Grid>
                            </Fragment>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* end my account section */}

            {/* Start personal details section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Personal-details-24" transform="translate(-484 -366)">
                                <g id="outline-assignment-24px" transform="translate(484 366)">
                                <g id="Bounding_Boxes">
                                    <path id="Path_2274" data-name="Path 2274" d="M0,0H24V24H0Z" fill="none"/>
                                </g>
                                <path id="personal-information" d="M9.788,20.458V13.523a1.648,1.648,0,0,1,1.606-1.677h6.3a1.648,1.648,0,0,1,1.606,1.677v6.935a1.648,1.648,0,0,1-1.606,1.677h-6.3a1.648,1.648,0,0,1-1.606-1.677ZM10.26,2.066l3.379,3.305H10.26V2.066ZM3.574,12.5a.376.376,0,0,0-.345.4.385.385,0,0,0,.092.275.353.353,0,0,0,.253.123H7.813v-.8Zm0,2.852a.376.376,0,0,0-.345.4.385.385,0,0,0,.092.275.353.353,0,0,0,.253.123H7.813v-.8Zm0-8.556a.376.376,0,0,0-.345.4.387.387,0,0,0,.093.275.354.354,0,0,0,.252.124h3.92a.376.376,0,0,0,.345-.4.389.389,0,0,0-.093-.274.356.356,0,0,0-.252-.124Zm0-2.852a.376.376,0,0,0-.345.4.385.385,0,0,0,.092.275.353.353,0,0,0,.253.123H5.73a.376.376,0,0,0,.345-.4.387.387,0,0,0-.093-.275.354.354,0,0,0-.252-.124Zm0,5.7a.376.376,0,0,0-.345.4.389.389,0,0,0,.093.274.356.356,0,0,0,.252.124H10.2a.378.378,0,0,0,.345-.4.387.387,0,0,0-.093-.275.354.354,0,0,0-.252-.124Zm11.949-3.8a.584.584,0,0,0-.409-.566L10.131.216A.545.545,0,0,0,9.7,0H1.012A.989.989,0,0,0,.3.309a1.08,1.08,0,0,0-.3.747V19.139a1.076,1.076,0,0,0,.3.748,1,1,0,0,0,.716.308H7.829v-1.18H1.13V1.182h8V5.959a.58.58,0,0,0,.567.593h4.691v3.864h1.133ZM13.406,17.068a1.366,1.366,0,0,1-.285-.58.308.308,0,0,1,.2-.276c0-.162-.016-.33-.016-.494v-.292a.991.991,0,0,1,.476-.771,1.326,1.326,0,0,1,.241-.121c.154-.058.078-.326.245-.33a2.158,2.158,0,0,1,1.285.647,1.069,1.069,0,0,1,.255.672l-.016.721a.221.221,0,0,1,.172.146c.053.227-.172.506-.274.686s-.464.7-.464.706a.146.146,0,0,0,.033.083c.571.82,2.242.3,2.242,1.931H11.578c0-1.621,1.676-1.111,2.242-1.931.028-.043.041-.067.04-.085s-.423-.636-.459-.7h0Z" transform="translate(2.314 0.997)" fill="#06425c" stroke="#06425c" stroke-width="0.3"/>
                                </g>
                                <path id="personal-information-2" data-name="personal-information" d="M22.821,26.954c-.136-.173-.386-.414-.386-.62a.348.348,0,0,1,.271-.294c0-.173-.021-.352-.021-.527V25.2a.893.893,0,0,1,.042-.192,1.169,1.169,0,0,1,.6-.631,2.025,2.025,0,0,1,.327-.129c.208-.062.105-.348.332-.352a3.266,3.266,0,0,1,1.742.691,1.016,1.016,0,0,1,.346.718l-.021.77a.291.291,0,0,1,.234.156c.072.242-.234.541-.372.733s-.629.75-.629.754a.139.139,0,0,0,.044.089c.774.875,3.039.323,3.039,2.063h-8.03c0-1.732,2.272-1.187,3.039-2.063.037-.046.056-.071.054-.09s-.573-.679-.622-.745h0Z" transform="translate(476.531 356.765)" fill="#fff"/>
                            </g>
                        </svg> Personal details
                    </Typography>
                </Grid>
                <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" onClick={(e) => handelPersonalDetailsEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            {personalDetails === false ? (
                            <Fragment>
                                {/* <Grid item md={8} sm={8} xs={12} className={classes.topAlignSection}>
                                    <Grid container spacing={3}> */}
                                        <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker
                                                    inputVariant="outlined"
                                                    label="Date of Birth"
                                                    className="formControl"
                                                    variant="outlined"
                                                    id="date-picker-dialog"
                                                    format="dd/mm/yyyy"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    fullWidth
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel id="project-name-label">Gender</InputLabel>
                                                <Select
                                                id="project-name"
                                                labelId="project-name-label"
                                                label="Gender"
                                                >
                                                    <MenuItem value="english">Male</MenuItem>
                                                    <MenuItem value="franch">Female</MenuItem>
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                            <TextField
                                                label="Alternate email"
                                                name="clientrepnu"
                                                id="clientrepnu"
                                                defaultValue=""
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                            <TextField
                                                label="Alternate mobile no."
                                                name="clientrepnu"
                                                id="clientrepnu"
                                                defaultValue=""
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelPersonalDetailsView(e)}>
                                                Save
                                            </Button>
                                            <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelPersonalDetailsView(e)}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    {/* </Grid>
                                </Grid> */}
                            </Fragment>
                            ) : 
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Date of Birth
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        02-Feb-1990
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Gender
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        Male
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Alternate Email
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Alternate Mobile No
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                            </Fragment>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End personal details section */}

            {/* Start identification section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg id="Identification-24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Group_6082" data-name="Group 6082">
                                <path id="personal-information-5" d="M182.354,89.037h12.273a.7.7,0,1,0,0-1.384H182.354a.7.7,0,1,0,0,1.384Zm17.324-20.989H177.3a.76.76,0,0,0-.813.692V91.356a.76.76,0,0,0,.813.692h22.375a.76.76,0,0,0,.813-.692V68.74A.76.76,0,0,0,199.678,68.048Zm-.813,22.616H178.116V69.431h20.749Zm-16.511-4.793h12.273a.7.7,0,1,0,0-1.384H182.354a.7.7,0,1,0,0,1.384Z" transform="translate(-176.491 -68.048)" fill="#06425c"/>
                            </g>
                            <path id="noun-id-card-1262898-FF9C34" d="M242.224,119.1a2.768,2.768,0,1,1-2.968,2.761A2.87,2.87,0,0,1,242.224,119.1Zm0,6.748c3.643,0,6.6,2.028,6.6,4.908h-13.19C235.629,127.873,238.582,125.845,242.224,125.845Z" transform="translate(-230.224 -116.097)" fill="#06425c"/>
                        </svg> Identification
                    </Typography>
                </Grid>
                <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" onClick={(e) => handelIdentificationEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            {identification === false ? (
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <TextField
                                        label="ID"
                                        name="clientrepnu"
                                        id="clientrepnu"
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <TextField
                                        label="Badge No"
                                        name="clientrepnu"
                                        id="clientrepnu"
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                
                                    <FormControl
                                        className={clsx(classes.margin, classes.textField)}
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Set personal pin
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={values.showPassword ? "text" : "password"}
                                            value={values.password}
                                            onChange={handleChange("password")}
                                            className={classes.outlinedInput}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    >
                                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                                }
                                                // labelWidth={70}
                                                label="Set personal pin"
                                            />
                                        </FormControl>



                                    {/* <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Set personal pin</InputLabel>
                                        <OutlinedInput
                                            // id="outlined-adornment-password"
                                            Id="outlined-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            Value={values.password}
                                            onChange={handleChange('password')}
                                            endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                            }
                                            label="Set personal pin"
                                        />
                                    </FormControl> */}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelIdentificationView(e)}>
                                        Save
                                    </Button>
                                    <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelIdentificationView(e)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Fragment>
                            ) : 
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        ID
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Badge No
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                       Set Personal Pin
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                            </Fragment>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End identification section */}

            {/* Start Work location section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Work-location-24" transform="translate(-5 -15)">
                                <g id="Work-location-24-2" data-name="Work-location-24" transform="translate(-19 -4)">
                                <rect id="Rectangle_2071" data-name="Rectangle 2071" width="24" height="24" transform="translate(24 19)" fill="none"/>
                                <path id="Path_6435" data-name="Path 6435" d="M20.247,76.77l3.7,7.277c.15.3-.008.538-.351.538H.407c-.343,0-.5-.242-.351-.538l3.7-7.277a.43.43,0,0,1,.351-.21H7.271a.452.452,0,0,1,.293.129c.215.238.434.471.652.7s.416.44.623.667H5.079a.43.43,0,0,0-.351.21L2.28,83.088H21.718L19.27,78.268a.43.43,0,0,0-.351-.21H15.15c.207-.227.415-.448.623-.667s.439-.463.655-.7a.452.452,0,0,1,.293-.129H19.9A.43.43,0,0,1,20.247,76.77ZM17.432,71.8c0,3.976-3.453,4.722-5.077,8.543a.4.4,0,0,1-.72,0c-1.465-3.445-4.417-4.39-4.982-7.459a5.364,5.364,0,0,1,4.813-6.27A5.354,5.354,0,0,1,17.432,71.8Zm-2.566,0A2.874,2.874,0,1,0,12,74.55,2.814,2.814,0,0,0,14.867,71.8Z" transform="translate(24 -44.585)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg> Work location
                    </Typography>
                </Grid>
                <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" onClick={(e) => handelWorkLocationEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            {workLocation === false ? (
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel id="project-name-label">Country</InputLabel>
                                        <Select
                                        id="project-name"
                                        labelId="project-name-label"
                                        label="Country"
                                        >
                                            <MenuItem value="india">India</MenuItem>
                                            <MenuItem value="usa">USA</MenuItem>
                                            <MenuItem value="canada">Canada</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel id="project-name-label">State</InputLabel>
                                        <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="State"
                                        >
                                            <MenuItem value="delhi">Delhi</MenuItem>
                                            <MenuItem value="rajasthan">Rajasthan</MenuItem>
                                            <MenuItem value="bihar">Bihar</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel id="project-name-label">City</InputLabel>
                                        <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="City"
                                        >
                                            <MenuItem value="newdelhi">New Delhi</MenuItem>
                                            <MenuItem value="laxminagar">Laxmi nagar</MenuItem>
                                            <MenuItem value="cp">cp</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel id="project-name-label">Time zone</InputLabel>
                                        <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="Time zone"
                                        >
                                            <MenuItem value="ist">IST</MenuItem>
                                            <MenuItem value="cst">CST</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelWorkLocationView(e)}>
                                        Save
                                    </Button>
                                    <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelWorkLocationView(e)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Fragment>
                            ) : 
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Country
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        State
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                       City
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                       Time Zone
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                            </Fragment>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End Work location section */}

            {/* Start Addresses section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Address-24" transform="translate(-283.917 -1589)">
                                <path id="address-svgrepo-com" d="M23.759,6.553l-2.85-2.44a2.29,2.29,0,0,0-.625-.316,2.223,2.223,0,0,0-.68-.131H11.4l.961,6.667H19.6a2.209,2.209,0,0,0,.679-.131,2.349,2.349,0,0,0,.625-.315l2.85-2.443A.557.557,0,0,0,24,7a.564.564,0,0,0-.241-.447ZM10.2,1H9a.636.636,0,0,0-.6.667V6.333h-4a2.169,2.169,0,0,0-.68.132,2.22,2.22,0,0,0-.625.315L.241,9.22a.534.534,0,0,0,0,.893l2.85,2.443a2.291,2.291,0,0,0,.625.313A2.2,2.2,0,0,0,4.4,13h4V24.333A.636.636,0,0,0,9,25h1.2a.636.636,0,0,0,.6-.667V1.667A.636.636,0,0,0,10.2,1Z" transform="translate(283.917 1588)" fill="#06425c"/>
                            </g>
                        </svg> Addresses
                    </Typography>
                </Grid>
                {/* <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid> */}
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupShowSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                <Card className={classes.addAddCardBox}>
                                    <CardContent>
                                        <Button onClick={(e) => handelNewAddressesAdd(e)}>
                                            {/* <AddIcon /> */}
                                            <img src={AddIcon} alt="add icon" />
                                            <Typography variant="h5" component="h2" className={classes.addAddressBtn}>New Address</Typography>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Start add address section */}
                            {newAddresses === false ? ( 
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Fragment>
                                        <Grid item md={12} sm={12} xs={12} className={classes.iconGroupTitle}>
                                            <Typography variant="h6">
                                                Add New Address
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="name"
                                                variant="outlined"
                                                label="Name"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="landmark"
                                                variant="outlined"
                                                label="Landmark"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                multiline
                                                variant="outlined"
                                                rows="4"
                                                id="addresslineone"
                                                label="Address Line One"
                                                className="formControl"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                multiline
                                                variant="outlined"
                                                rows="4"
                                                id="addresslinetwo"
                                                label="Address Line Two"
                                                className="formControl"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="city"
                                                variant="outlined"
                                                label="City"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="postalcode"
                                                variant="outlined"
                                                label="Postal Code"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel id="project-name-label">Country</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-name-label"
                                                    label="Country"
                                                >
                                                    <MenuItem value="india">India</MenuItem>
                                                    <MenuItem value="usa">USA</MenuItem>
                                                    <MenuItem value="china">China</MenuItem>
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel id="project-name-label">State</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-name-label"
                                                    label="State"
                                                >
                                                    <MenuItem value="delhi">Delhi</MenuItem>
                                                    <MenuItem value="bihar">Bihar</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" className={classes.checkRadioLabel}>Address Tag</FormLabel>
                                                <RadioGroup row aria-label="addressTag" name="addressTag" onChange={handleChange}>
                                                    <FormControlLabel value="home" className={classes.selectLabel} control={<Radio />} label="Home" />
                                                    <FormControlLabel value="work" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Work" />
                                                    <FormControlLabel value="billing" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Billing" />
                                                    <FormControlLabel value="posted" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Posted" />
                                                    <FormControlLabel value="other" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Other" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12}>
                                            <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelNewAddressesView(e)}>
                                                Save
                                            </Button>
                                            <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelNewAddressesView(e)}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Fragment>
                                </Grid>
                            </Grid>
                            ) : '' }
                            {/* End add address section */}

                            {/* Start address list blog */}
                            <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                <Card className={classes.addressViewBox}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Home"
                                                className={classes.addressTagList}
                                            />
                                             {/*   */}
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={handleClick('bottom-end')}> 
                                                    <MoreVertIcon />
                                                </IconButton>
                                                {/* <IconButton
                                                    onClick={handleClick}
                                                    size="small"
                                                    sx={{ ml: 2 }}
                                                    aria-controls={open ? 'account-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                >
                                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    id="account-menu"
                                                    open={open}
                                                    onClose={handleClose}
                                                    onClick={handleClose}
                                                    PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                        width: 32,
                                                        height: 32,
                                                        ml: -0.5,
                                                        mr: 1,
                                                        },
                                                        '&:before': {
                                                        content: '""',
                                                        display: 'block',
                                                        position: 'absolute',
                                                        top: 0,
                                                        right: 14,
                                                        width: 10,
                                                        height: 10,
                                                        bgcolor: 'background.paper',
                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                        zIndex: 0,
                                                        },
                                                    },
                                                    }}
                                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                >
                                                    <MenuItem>
                                                        <ListItemIcon>
                                                            d
                                                        </ListItemIcon>
                                                        Settings
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <ListItemIcon>
                                                            w
                                                        </ListItemIcon>
                                                        Logout
                                                    </MenuItem>
                                                </Menu> */}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Mukund Chaudhary"
                                                className={classes.addressTitleList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="+91 9122006699"
                                                className={classes.addressNoList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Vaishali Nagar, Near Amrapali, Jaipur, Rajasthan, India,"
                                                secondary="302014."
                                                className={classes.addressContntList}
                                            />
                                        </ListItem>
                                    </List>
                                    
                                    <Popper open={open} anchorEl={anchorEl} placement={placement} transition className={classes.popperBox}
                                        // PaperProps={{
                                        // elevation: 0,
                                        // sx: {
                                        //     overflow: 'visible',
                                        //     filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        //     mt: 1.5,
                                        //     '& .MuiAvatar-root': {
                                        //     width: 32,
                                        //     height: 32,
                                        //     ml: -0.5,
                                        //     mr: 1,
                                        //     },
                                        //     '&:before': {
                                        //     content: '""',
                                        //     display: 'block',
                                        //     position: 'absolute',
                                        //     top: 0,
                                        //     right: 14,
                                        //     width: 10,
                                        //     height: 10,
                                        //     bgcolor: 'background.paper',
                                        //     transform: 'translateY(-50%) rotate(45deg)',
                                        //     zIndex: 0,
                                        //     },
                                        // },
                                        // }}
                                        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        {({ TransitionProps }) => (
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Paper className={classes.popperSection}>
                                                    <List>
                                                        <ListItem button className={classes.actionAddList} onClick={handleClick('bottom-end')}>
                                                            <ListItemText
                                                                className={classes.popperListLink}
                                                                onClick={(e) => handelEditAddressesEdit(e)}
                                                                primary={
                                                                    <div>
                                                                        Edit <svg xmlns="http://www.w3.org/2000/svg" width="16.273" height="16.268" viewBox="0 0 16.273 16.268">
                                                                        <g id="edit-category" transform="translate(-338.363 -109.366)">
                                                                            <path id="Path_5177" data-name="Path 5177" d="M85.551,147.541,77.89,155.2a.569.569,0,1,0,.8.807l7.661-7.661a.571.571,0,0,0,0-.807A.564.564,0,0,0,85.551,147.541Z" transform="translate(263.22 -33.12)" fill="#cad1d6"/>
                                                                            <path id="Path_5178" data-name="Path 5178" d="M302.828,6.453a.568.568,0,0,0,.4-.166l.836-.836a2.474,2.474,0,0,0,0-3.5L302.925.811a2.476,2.476,0,0,0-3.5,0l-.836.836a.571.571,0,0,0,0,.807l3.837,3.837A.579.579,0,0,0,302.828,6.453Zm-2.6-4.843a1.338,1.338,0,0,1,1.892,0l1.142,1.142a1.336,1.336,0,0,1,0,1.889l-.438.438-3.034-3.034Z" transform="translate(49.846 109.279)" fill="#cad1d6"/>
                                                                            <path id="Path_5179" data-name="Path 5179" d="M5.4,102.1l8.082-8.082a.57.57,0,1,0-.807-.807l-7.943,7.95-3.505.471L1.7,98.123l7.588-7.588a.57.57,0,0,0-.807-.807L.765,97.456a.565.565,0,0,0-.163.325L0,102.216a.569.569,0,0,0,.564.644.593.593,0,0,0,.076-.007l4.435-.6A.533.533,0,0,0,5.4,102.1Z" transform="translate(338.364 22.774)" fill="#cad1d6"/>
                                                                        </g>
                                                                        </svg>
                                                                    </div>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <ListItem button className={classes.actionAddListOne} onClick={handleClick('bottom-end')}>
                                                            <ListItemText
                                                                className={classes.popperListLink}
                                                                onClick={handleClickDelete}
                                                                primary={
                                                                    <div>
                                                                        Delete <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18">
                                                                        <g id="delete" transform="translate(-354 -294)">
                                                                            <path id="Path_221" data-name="Path 221" d="M6,19a2.006,2.006,0,0,0,2,2h8a2.006,2.006,0,0,0,2-2V7H6ZM19,4H15.5l-1-1h-5l-1,1H5V6H19Z" transform="translate(349 291)" fill="#cad1d6"/>
                                                                        </g>
                                                                        </svg>
                                                                    </div>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>         
                                                </Paper>
                                            </Fade>
                                        )}
                                    </Popper>

                                </Card>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                <Card className={classes.addressViewBox}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Work"
                                                className={classes.addressTagList}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={handleClick('bottom-end')}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Mukund Chaudhary"
                                                className={classes.addressTitleList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="+91 9122006699"
                                                className={classes.addressNoList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Vaishali Nagar, Near Amrapali, Jaipur, Rajasthan, India,"
                                                secondary="302014."
                                                className={classes.addressContntList}
                                            />
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                            <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                <Card className={classes.addressViewBox}>
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="Billing"
                                                className={classes.addressTagList}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" onClick={handleClick('bottom-end')}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Mukund Chaudhary"
                                                className={classes.addressTitleList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="+91 9122006699"
                                                className={classes.addressNoList}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="Vaishali Nagar, Near Amrapali, Jaipur, Rajasthan, India,"
                                                secondary="302014."
                                                className={classes.addressContntList}
                                            />
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                            {/* End address list blog */}

                            {/* Start edit address section */}
                            {editAddresses === false ? ( 
                            <Grid item md={12} sm={12} xs={12}>
                                <Grid container spacing={3}>
                                    <Fragment>
                                        <Grid item md={12} sm={12} xs={12} className={classes.iconGroupTitle}>
                                            <Typography variant="h6">
                                                Home address
                                            </Typography>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="name"
                                                variant="outlined"
                                                label="Name"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="landmark"
                                                variant="outlined"
                                                label="Landmark"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                multiline
                                                variant="outlined"
                                                rows="4"
                                                id="addresslineone"
                                                label="Address Line One"
                                                className="formControl"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                multiline
                                                variant="outlined"
                                                rows="4"
                                                id="addresslinetwo"
                                                label="Address Line Two"
                                                className="formControl"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="city"
                                                variant="outlined"
                                                label="City"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <TextField
                                                id="postalcode"
                                                variant="outlined"
                                                label="Postal Code"
                                            />
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel id="project-name-label">Country</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-name-label"
                                                    label="Country"
                                                >
                                                    <MenuItem value="india">India</MenuItem>
                                                    <MenuItem value="usa">USA</MenuItem>
                                                    <MenuItem value="china">China</MenuItem>
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={6} sm={6} xs={12} className={classes.formBox}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth
                                            >
                                                <InputLabel id="project-name-label">State</InputLabel>
                                                <Select
                                                    id="project-name"
                                                    labelId="project-name-label"
                                                    label="State"
                                                >
                                                    <MenuItem value="delhi">Delhi</MenuItem>
                                                    <MenuItem value="bihar">Bihar</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend" className={classes.checkRadioLabel}>Address Tag</FormLabel>
                                                <RadioGroup row aria-label="addressTag" name="addressTag" onChange={handleChange}>
                                                    <FormControlLabel value="home" className={classes.selectLabel} control={<Radio />} label="Home" />
                                                    <FormControlLabel value="work" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Work" />
                                                    <FormControlLabel value="billing" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Billing" />
                                                    <FormControlLabel value="posted" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Posted" />
                                                    <FormControlLabel value="other" className={classes.selectLabel} control={<Radio onClick={onClick} />} label="Other" />
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={12} sm={12} xs={12}>
                                            <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelEditAddressesView(e)}>
                                                Update
                                            </Button>
                                            <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelEditAddressesView(e)}>
                                                Cancel
                                            </Button>
                                        </Grid>
                                    </Fragment>
                                </Grid>
                            </Grid>
                            ) : '' }
                            {/* End edit address section */}

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End Addresses section */}

            {/* Start emergency details section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Emergency-details-24" transform="translate(-484 -366)">
                                <g id="outline-assignment-24px" transform="translate(484 366)">
                                <g id="Bounding_Boxes">
                                    <path id="Path_2274" data-name="Path 2274" d="M0,0H24V24H0Z" fill="none"/>
                                </g>
                                <rect id="Rectangle_2066" data-name="Rectangle 2066" width="9" height="10" rx="2" transform="translate(15 14)" fill="#06425c"/>
                                <path id="personal-information" d="M22.473,26.954c-.117-.173-.332-.414-.332-.62a.333.333,0,0,1,.233-.294c0-.173-.018-.352-.018-.527V25.2a1.019,1.019,0,0,1,.036-.192,1.114,1.114,0,0,1,.518-.631,1.6,1.6,0,0,1,.281-.129c.179-.062.09-.348.285-.352a2.6,2.6,0,0,1,1.5.691,1.089,1.089,0,0,1,.3.718l-.018.77a.253.253,0,0,1,.2.156c.062.242-.2.541-.319.733s-.541.75-.541.754a.149.149,0,0,0,.038.089c.665.875,2.612.323,2.612,2.063h-6.9c0-1.732,1.953-1.187,2.612-2.063.032-.046.048-.071.046-.09s-.492-.679-.534-.745h0Z" transform="translate(-4.294 -7.897)" fill="#fff"/>
                                </g>
                                <path id="emergency-phone-svgrepo-com" d="M9.593,13.862a.637.637,0,0,0,.9,0l.9-.9,2.725,2.7-.462.462a2.8,2.8,0,0,1-1.8.875H10.049a2.8,2.8,0,0,1-1.812-.875L1.9,9.787A2.8,2.8,0,0,1,1,7.975V6.162A2.8,2.8,0,0,1,1.9,4.35l.45-.45L5.075,6.612l-.912.912a.637.637,0,0,0,0,.9Zm5.9.475a1.25,1.25,0,0,0,.045-1.767h0l-.045-.045-.9-.9a1.25,1.25,0,0,0-1.767-.045h0l-.045.045Zm-9.1-9.062a1.25,1.25,0,0,0,.045-1.767h0l-.945-.945a1.25,1.25,0,0,0-1.767-.045h0l-.051.045ZM12.249,2V4.5h-2.5V5.75h2.5v2.5H13.5V5.75H16V4.5H13.5V2Z" transform="translate(483 364.808)" fill="#06425c"/>
                            </g>
                        </svg> Emergency Details
                    </Typography>
                </Grid>
                <Grid item md={1} sm={2} xs={2} className={classes.iconGroupTitle} align="right">
                    <IconButton aria-label="delete" size="small" onClick={(e) => handelEmergencyDetailsEdit(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                            <g id="input-edit-icon-32" transform="translate(-1868 -175)">
                                <g id="Edit-32" transform="translate(1868 175)">
                                <circle id="Ellipse_1" data-name="Ellipse 1" cx="16" cy="16" r="16" fill="#cad1d6"/>
                                </g>
                                <g id="form-edit-icon" transform="translate(1877 184)">
                                <path id="Path_5177" data-name="Path 5177" d="M84.375,147.516l-6.51,6.513a.484.484,0,1,0,.683.685l6.51-6.51a.485.485,0,0,0,0-.685A.479.479,0,0,0,84.375,147.516Z" transform="translate(-75.531 -143.22)" fill="#06425c"/>
                                <path id="Path_5178" data-name="Path 5178" d="M302.167,5.5a.483.483,0,0,0,.341-.141l.711-.711a2.1,2.1,0,0,0,0-2.973l-.97-.97a2.1,2.1,0,0,0-2.973,0l-.711.711a.485.485,0,0,0,0,.685l3.261,3.261A.492.492,0,0,0,302.167,5.5Zm-2.206-4.115a1.137,1.137,0,0,1,1.608,0l.97.97a1.136,1.136,0,0,1,0,1.6l-.372.372-2.578-2.578Z" transform="translate(-290.005 -0.087)" fill="#06425c"/>
                                <path id="Path_5179" data-name="Path 5179" d="M4.593,100.214l6.868-6.868a.485.485,0,0,0-.685-.685l-6.75,6.756-2.979.4.4-2.979L7.9,90.389a.485.485,0,0,0-.685-.685L.65,96.27a.48.48,0,0,0-.138.276L0,100.315a.484.484,0,0,0,.48.547.5.5,0,0,0,.065-.006l3.768-.508A.453.453,0,0,0,4.593,100.214Z" transform="translate(0 -87.038)" fill="#06425c"/>
                                </g>
                            </g>
                        </svg>
                    </IconButton>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            {emergencyDetails === false ? (
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <TextField
                                        label="Contact name"
                                        name="clientrepnu"
                                        id="clientrepnu"
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <TextField
                                        label="Mobile number"
                                        name="clientrepnu"
                                        id="clientrepnu"
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <TextField
                                        label="Email"
                                        name="clientrepnu"
                                        id="clientrepnu"
                                        defaultValue=""
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.formBox}>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel id="project-name-label">Blood group</InputLabel>
                                        <Select
                                            id="project-name"
                                            labelId="project-name-label"
                                            label="Blood group"
                                        >
                                            <MenuItem value="o+">O+</MenuItem>
                                            <MenuItem value="o-">O-</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                                    {/* <FormLabel className={classes.checkRadioLabel} component="legend">Group name</FormLabel> */}
                                    <FormGroup className={classes.customCheckBoxList}>
                                        <FormControlLabel
                                            className={classes.selectLabel}
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Donate blood"
                                        />
                                    </FormGroup>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <Button size="medium" variant="contained" className={classes.buttonStyle} onClick={(e) => handelEmergencyDetailsView(e)}>
                                        Save
                                    </Button>
                                    <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClick={(e) => handelEmergencyDetailsView(e)}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </Fragment>
                            ) : 
                            <Fragment>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Contact name
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        Amit choudhary
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                        Mobile number
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                       Email
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        NA
                                    </Typography>
                                </Grid>
                                <Grid item md={4} sm={4} xs={12} className={classes.viewListBox}>
                                    <Typography
                                        variant="label"
                                        gutterBottom
                                        className={classes.viewLabel}
                                    >
                                       Blood Group
                                    </Typography>
                                    <Typography className={classes.viewLabelValue}>
                                        O+
                                    </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                    <FormLabel className={classes.checkRadioLabel} component="legend">Group name</FormLabel>
                                    <FormGroup className={classes.customCheckBoxList}>
                                        <FormControlLabel
                                            className={classes.selectLabel}
                                            control={(
                                                <Checkbox
                                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                                name="checkedI"
                                                checked
                                                onChange={handleChange}
                                                />
                                            )}
                                            label="Donate blood"
                                        />
                                    </FormGroup>
                                </Grid>
                            </Fragment>
                            }
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End emergency details section */}
            
            {/* Start project access information section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={12} sm={12} xs={12} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Project-access-anformation-24" transform="translate(-283.917 -2045)">
                                <g id="Group_Section_Header_above_Group_of_fields_" data-name="Group Section Header  (above Group of fields)" transform="translate(283.917 2045)">
                                <g id="information-info-svgrepo-com">
                                    <g id="Group_6509" data-name="Group 6509">
                                    <g id="Group_6508" data-name="Group 6508">
                                        <path id="Path_6515" data-name="Path 6515" d="M12,0A12,12,0,1,0,24,12,11.986,11.986,0,0,0,12,0Zm0,22.008A10.008,10.008,0,1,1,22.009,12,10.025,10.025,0,0,1,12,22.008Z" fill="#06425c"/>
                                    </g>
                                    </g>
                                    <g id="Group_6511" data-name="Group 6511" transform="translate(10.868 9.077)">
                                    <g id="Group_6510" data-name="Group 6510">
                                        <path id="Path_6516" data-name="Path 6516" d="M231.582,192a1.121,1.121,0,0,0-1.182,1.038v8.409a1.2,1.2,0,0,0,2.365.052v-8.461A1.121,1.121,0,0,0,231.582,192Z" transform="translate(-230.4 -192)" fill="#06425c"/>
                                    </g>
                                    </g>
                                    <g id="Group_6513" data-name="Group 6513" transform="translate(10.767 4.432)">
                                    <g id="Group_6512" data-name="Group 6512">
                                        <path id="Path_6517" data-name="Path 6517" d="M229.449,92.8a1.121,1.121,0,0,0-1.182,1.038v.986a1.121,1.121,0,0,0,1.182,1.038,1.16,1.16,0,0,0,1.182-1.038v-.986A1.121,1.121,0,0,0,229.449,92.8Z" transform="translate(-228.267 -92.8)" fill="#06425c"/>
                                    </g>
                                    </g>
                                </g>
                                </g>
                            </g>
                            </svg> Project Access Information
                    </Typography>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupShowSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            <Grid item md={3} sm={3} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    COMPANY NAME
                                </Typography>

                                <List className={classes.compList}>
                                    <ListItem>
                                        <ListItemText
                                            primary="Teknobuilt"
                                            className={classes.compnyNameTitle}
                                        />
                                        <ListItemSecondaryAction>
                                            <img src={TeknobiltLogo} alt="teknobuilt log" />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item md={3} sm={3} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    PROJECT NAME
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button>
                                            <ListItemText
                                                primary="NTPC Training"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="NTPC Singrauli Power Plant"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    PHASE
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Off-Site"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Stage-I"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    UNIT
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Ash dyke"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    WORK AREA
                                </Typography>

                                <List className={classes.projListNoLink}>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Ash dyke
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Ash recirculation pumphouse
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} >
                                <Divider />
                            </Grid>
                        </Grid>
                        {/* second info row  */}

                        <Grid container spacing={3}>
                            <Grid item md={3} sm={3} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    COMPANY NAME
                                </Typography>

                                <List className={classes.compList}>
                                    <ListItem>
                                        <ListItemText
                                            primary="NTPC"
                                            className={classes.compnyNameTitle}
                                        />
                                        <ListItemSecondaryAction>
                                            <img src={NtpcLogo} alt="teknobuilt log" />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                            <Grid item md={3} sm={3} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    PROJECT NAME
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button className={classes.listActive}>
                                            <ListItemText
                                                primary="NTPC Training"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="NTPC Singrauli Power Plant"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    PHASE
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button className={classes.listActive}>
                                            <ListItemText
                                                primary="Off-Site"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Stage-I"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Stage-II"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    UNIT
                                </Typography>

                                <List className={classes.projList}>
                                    <span>
                                        <ListItem button className={classes.listActive}>
                                            <ListItemText
                                                primary="Ash dyke"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Ash recirculation pumphouse"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Ash slurry pump house"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem button>
                                            <ListItemText
                                                primary="Central Storage"
                                                className={classes.infoListSection}
                                            />
                                            <ListItemSecondaryAction>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="6.191" height="11.103" viewBox="0 0 6.191 11.103">
                                                    <g id="Right-icon" transform="translate(-1279.84 -2494.448)">
                                                        <path id="XMLID_225_" d="M10.854,75.146a.5.5,0,0,0-.707,0L5.5,79.793.854,75.146a.5.5,0,0,0-.707.707l5,5a.5.5,0,0,0,.707,0l5-5A.5.5,0,0,0,10.854,75.146Z" transform="matrix(0.017, -1, 1, 0.017, 1204.852, 2504.138)" fill="#06425c"/>
                                                    </g>
                                                </svg>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </span>
                                </List>
                            </Grid>
                            <Grid item md={2} sm={2} xs={12} className={classes.projectInfoBlog}>
                                <Typography
                                    variant="label"
                                    gutterBottom
                                    className={classes.infoHeadSection}
                                >
                                    WORK AREA
                                </Typography>

                                <List className={classes.projListNoLink}>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Ash dyke
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Ash recirculation pumphouse
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Ash slurry pump house
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                <Fragment>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12.552" height="10.27" viewBox="0 0 12.552 10.27">
                                                        <g id="right-icon" transform="translate(0 -3.543)">
                                                            <path id="XMLID_27_" d="M110.856,80.991h8.774l-2.818,2.818a.856.856,0,1,0,1.21,1.21L122.3,80.74a.856.856,0,0,0,0-1.21l-4.279-4.279a.856.856,0,1,0-1.21,1.21l2.818,2.818h-8.774a.856.856,0,1,0,0,1.712Z" transform="translate(-110 -71.457)" fill="#6b6b6b"/>
                                                        </g>
                                                    </svg> Central Storage
                                                </Fragment>
                                            }
                                            className={classes.infoListSection}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End project access information section */}

            {/* Start notification setting section */}
            <Grid container spacing={3} className={classes.groupIconSection}>
                <Grid item md={11} sm={10} xs={10} className={classes.iconGroupTitle}>
                    <Typography variant="h6" className="sectionHeading">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g id="Notification-setting-24" transform="translate(-286 -2135)">
                                <rect id="Rectangle_2072" data-name="Rectangle 2072" width="24" height="24" transform="translate(286 2135)" fill="none"/>
                                <path id="Path_6524" data-name="Path 6524" d="M13,24.5a2.26,2.26,0,0,0,2.25-2.256h-4.5A2.26,2.26,0,0,0,13,24.5Zm6.75-6.769V12.09c0-3.464-1.834-6.363-5.062-7.13V4.192a1.688,1.688,0,1,0-3.375,0v.767C8.1,5.727,6.25,8.615,6.25,12.09v5.641L4,19.987v1.128H22V19.987ZM17.5,18.859h-9V12.09c0-2.8,1.7-5.077,4.5-5.077s4.5,2.279,4.5,5.077Z" transform="translate(285 2133.5)" fill="#06425c"/>
                            </g>
                        </svg> Notification setting
                    </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className={classes.mainGroupShowSection}>
                    <Paper elevation={1} className={classes.paperSection}>
                        <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className={classes.viewListBox}>
                                <List className={classes.notificationListSection}>
                                    <ListItem>
                                        <ListItemText
                                            primary="New task or work allocation"
                                            className={classes.notificationList}
                                        />
                                        <ListItemSecondaryAction>
                                            <Switch className={classes.switchNo} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="New task or work allocation"
                                            className={classes.notificationList}
                                        />
                                        <ListItemSecondaryAction>
                                            <Switch className={classes.switchNo} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="New task or work allocation"
                                            className={classes.notificationList}
                                        />
                                        <ListItemSecondaryAction>
                                            <Switch className={classes.switchNo} inputProps={{ 'aria-label': 'primary checkbox' }} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Task/work/overdue/updates"
                                            className={classes.notificationList}
                                        />
                                        <ListItemSecondaryAction>
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChangeSwitch}
                                                name="checkedA"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                className={classes.switchNo}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary="Task/work/overdue/updates"
                                            className={classes.notificationList}
                                        />
                                        <ListItemSecondaryAction>
                                            <Switch
                                                checked={state.checkedA}
                                                onChange={handleChangeSwitch}
                                                name="checkedA"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                className={classes.switchNo}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {/* End notification setting section */}

            <Dialog maxWidth={maxWidth} onClose={handleCloseDelete} aria-labelledby="customized-dialog-title" className={classes.dialogSection} open={deleteAddress}>
				<DialogTitle id="customized-dialog-title" className={classes.dialogTitileBox} onClose={handleCloseDelete}>
					
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item md={12} sm={12} xs={12} className={classes.topMessageDilog}>
							<Typography variant="h3" align='center' className={classes.successSymbol}>
                            <svg id="delete-popup-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                                <path id="Path_6522" data-name="Path 6522" d="M17.586,46.414a2,2,0,0,0,2.828,0L32,34.828,43.586,46.414a2,2,0,0,0,2.828-2.828L34.828,32,46.414,20.414a2,2,0,0,0-2.828-2.828L32,29.172,20.414,17.586a2,2,0,0,0-2.828,2.828L29.172,32,17.586,43.586A2,2,0,0,0,17.586,46.414Z" fill="#ff7171"/>
                                <path id="Path_6523" data-name="Path 6523" d="M32,64A32,32,0,0,0,54.626,9.374,32,32,0,1,0,9.374,54.626,31.784,31.784,0,0,0,32,64ZM12.2,12.2A28,28,0,1,1,51.8,51.8,28,28,0,1,1,12.2,12.2Z" fill="#ff7171"/>
                            </svg>
							</Typography>
							<Typography variant="h2" align='center' className={classes.successText}>
                                Are you sure?
							</Typography>
						</Grid>
						<Grid item md={12} sm={12} xs={12} align="center" className={classes.deleteMassBox}>
							<Typography variant="h6" className={classes.successMessage} align='center'>
								You want to delete address.
							</Typography>
							<div className={classes.btnToLogin} >
                                <Button size="medium" variant="contained" className={classes.buttonStyle} onClose={handleCloseDelete}>
                                    Yes
                                </Button>
                                <Button size="medium" variant="contained" className={classes.custmCancelBtn} onClose={handleCloseDelete}>
                                    No
                                </Button>
							</div>
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>

        </Fragment>
    );
};

export default NewUserProfile;