import { withStyles } from '@material-ui/styles';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { UserActions } from '../UserActions';
import Page from '../../../../src/components/Page';
import { Box, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PaceLogo from './PaceLogo';
import '../../../../src/App.css';
import loginBBg from '../../../../../static/public/images/LoginImg/logbeforebg.png';



class SelectADCompany extends Component {

    constructor(props) {
        super(props);

        this.state={
            companies: [],
            companyId:'',
            touched:{},
            errors:{},

        }
        this.action = new UserActions(this.props.dispatch);

    }

    componentDidMount=()=>{
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/companies/getadcompanies/',
            method: 'GET',
          }).then((res) => {
            console.log({result:res})
            this.setState({ companies: res.data.data.results })
      
          }).catch((err) => {
            console.log(err)
      
          })
      
    }

    handleTouch = (e) => {
        // console.log({event:e.target.name})
        let { touched } = this.state
        if (e.target.name && touched[e.target.name] != true) {
          touched[e.target.name] = true;
          this.setState({ touched },()=>console.log({touched:this.state.touched}))
        }
      }

    formValidation = () =>{
        const {companyId}=this.state
        let isValid=true
        const errors = {};
        console.log({companyId:companyId})
        if(companyId==""){
            console.log('inside')
            errors.companyId = "Please select the Company"
            isValid = false
          }      
        this.setState({ errors },()=>console.log({errors:this.state.errors}));
        return isValid;
      }

    handleChange=(e,newValue)=>{
        // console.log({newValue:newValue.companyId})
        if(newValue){
            this.setState({companyId:newValue.companyId},()=>console.log({companyId_new:this.state.companyId}))
            }
    }

    handleContinue=()=>{
        const companyId=this.state.companyId
        console.log(companyId)
        const isValid=this.formValidation()
        console.log(isValid)
        if(isValid){
        axios({
            url: process.env.API_URL + process.env.API_VERSION + '/user/setADconfig/'+companyId+'/',
            method: 'GET',
          }).then((res) => {
            console.log({result:res})
            localStorage.setItem('companyId',this.state.companyId)
            window.location.href = process.env.API_URL + process.env.API_VERSION + '/sign_in';      
          }).catch((err) => {
            console.log({error:err})
            if (err.response && err.response.status == 400) {
                this.action.openSnackbar('Azure AD has not set up for the company', true)
                this.action.showSnackbar
            }

          })
        }
        else{
            this.setState({
                touched:  {
                    'companyId':true                }
              },()=>console.log({touched:this.state.touched}) )
        }
    }
    
    render() {
        const { classes } = this.props
        const { touched, errors } = this.state
        // console.log({companies:this.state.companies})
        return (
        <Fragment>
            <Grid container className={classes.logoSection} >
                <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid>
            </Grid>
            <Page className={classes.root} title="Recovery Password">
                <Box className={classes.customcontentbox}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                >
                    <Grid container component="main" className={classes.root} style={{ background: `url(${loginBBg}) no-repeat 50% 100%`, backgroundSize: 'contain', paddingBottom: '170px' }}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            //component={Paper}
                            //elevation={0}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.mainWraper}
                        >
                            <Grid container item xs={12} sm={8} md={4} component={Paper} className={classes.paper} elevation={5}>

                                {/* <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid> */}

                                <Grid item xs={12} sm={12} md={12} align="center">
                                    <Typography component="h1" variant="h5" className={classes.logTitle} >
                                        Choose Company
                                    </Typography>
                                </Grid>
                                <form className={classes.form} autoComplete="off" noValidate>
                                {/* <Grid item xs={12} sm={12} md={12} className={classes.customUsernamFild}>

                                <Autocomplete
                                    id="combo-box-demo"
                                    options={top100Films}
                                    className={classes.mT30}
                                    getOptionLabel={(option) => option.title}
                                    //style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Select Company" variant="outlined" />}
                                /> */}

                                            <Grid item xs={12} sm={12} md={12} className={classes.customUsernamFild}>
                                                    <Autocomplete
                                                        freeSolo
                                                        fullWidth
                                                        id='id'
                                                        name='id'
                                                        options={this.state.companies}
                                                        onChange={(e,newValue)=>{this.handleChange(e,newValue);this.formValidation()}}
                                                        // disableClearable
                                                        getOptionLabel={option => option.companyName}
                                                        renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Search Company"
                                                            margin="dense"
                                                            variant="outlined"
                                                            helperText={touched.companyId && Boolean(errors.companyId) ? errors.companyId : ""}
                                                            error={touched.companyId && Boolean(errors.companyId)}
                                                            onBlur={(e) => { this.handleTouch(e); this.formValidation();}}
                                                            InputProps={{ ...params.InputProps, type: 'search' }}
                                                        />
                                                        )}
                                                    />
                                                </Grid>

                                     {/* <TextField
                                        label="Select Company"
                                        margin="dense"
                                        name="companyId"
                                        id="companyId"
                                        onChange={(e)=>{this.handleChange(e)}}
                                        select
                                        fullWidth
                                        // value={values.companyId}
                                        variant="outlined"
                                        // helperText={touched.companyId ? errors.companyId : ""}
                                        // onBlur={handleBlur}
                                        // error={touched.companyId && Boolean(errors.companyId)}
                                        >
                                        {this.state.companies.map(option => (
                                            <option
                                            key={option.companyId}
                                            value={option.companyId}
                                            >
                                            {option.companyName}
                                            </option>
                                        ))}
                                    </TextField> */}
                                {/* </Grid>  */}
                                <Grid container className={classes.mT30}>
                                        <Grid container item xs={6}>
                                            <Link
                                                to='/login'
                                                variant="contained"
                                                color="default"
                                                className={classes.buttonCustomotp}
                                                //startIcon={<LockIcon />}
                                                onClick={this.handleBackOTP}
                                            >
                                                Back
                                            </Link>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <Button
                                                // type="submit"
                                                fullWidth
                                                variant="contained"
                                                className={classes.buttonCustom}
                                                onClick={this.handleContinue}
                                            >
                                                <span>Continue</span> <svg xmlns="http://www.w3.org/2000/svg" width="14.358" height="15.506" viewBox="0 0 14.358 15.506">
                                                <g id="right-arrow" transform="translate(0.814 0.814)">
                                                    <path id="Path_389" data-name="Path 389" d="M13.351,13.948a.3.3,0,0,1-.215-.518l6.454-6.453L13.137.523a.3.3,0,0,1,.429-.429l6.668,6.668a.3.3,0,0,1,0,.429l-6.668,6.668A.3.3,0,0,1,13.351,13.948Z" transform="translate(-7.592 -0.005)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5"/>
                                                    <path id="Path_390" data-name="Path 390" d="M1.615,13.943a.3.3,0,0,1-.215-.518L7.855,6.971,1.4.518A.3.3,0,0,1,1.83.089L8.5,6.757a.3.3,0,0,1,0,.429L1.83,13.853A.3.3,0,0,1,1.615,13.943Z" transform="translate(-1.312 0)" fill="#f2f2f2" stroke="#f2f2f2" stroke-width="1.5"/>
                                                </g>
                                                </svg>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={12} xs={12} className={classes.footerCopyRight}>
                            <p>Copyright © 2021, Teknobuilt Ltd. | All rights are reserved</p>
                        </Grid>
                    </Grid>
                </Box>
            </Page>
        </Fragment>
        );
    }
}

const useStyles = theme => ({
    root: {
        "& .MuiPaper-root": {
            borderRadius: "1px",
            backgroundColor: "transparent",
        },
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '100%',
    },
    paperRoot: {
        backgroundColor: 'transparent'
    },
    mainWraper: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    logoSection: {
        margin: theme.spacing(4, 0, 1, 0),
    },
    paper: {
        margin: theme.spacing(1, 2, 6, 2),
        padding: theme.spacing(4, 6),
        maxWidth: '485px',
        width: '100%',
        [theme.breakpoints.down("sm")]: {
            //margin: theme.spacing(2, 2),
            //padding: theme.spacing(3, 2),
            justify: 'flex-start',
            alignItems: 'baseline',
        },
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(4, 0),
            padding: theme.spacing(2, 2),
        },
        boxShadow: '0px 3px 5px -1px rgb(22 56 79 / 20%), 0px 5px 8px 0px rgb(22 56 79 / 14%), 0px 1px 14px 0px rgb(22 56 79 / 12%)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    userLogDetail: {
        margin: theme.spacing(2, 0, 3, 0),
        '& h5': {
            color: '#16384F',
            fontSize: '15px',
            lineHeight: '19px',
            display: 'inline-block',
            padding: '3px 32px',
            borderRadius: '18px',
            border: '1px solid #E3E3E3',
            backgroundColor: '#F2F2F2',
            '& svg': {
                verticalAlign: 'middle',
                marginRight: '8px',
                color: '#054D69',
            },
        },
    },
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    customUsernamFild: {
        position: 'relative',
        "& > i": {
            position: 'absolute',
            left: '0px',
            top: '15px',
            padding: '10px 10px 4px 10px',
            backgroundColor: '#16384f',
            borderTopLeftRadius: '3px',
            borderBottomLeftRadius: '3px',
            textAlign: 'center',
            width: '50px',
            height: '55px',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            //padding: '0px 8px 0px 52px',
            borderColor: '#054D69 !important',
        },
        "& .MuiInputLabel-animated": {
            //padding: '0px 0px 0px 52px',
            color: '#054D69',
            fontFamily: 'Montserrat-Medium',
        },
        "& .MuiInputLabel-shrink": {
            //padding: '0px 0px 0px 60px',
        },
        "& .MuiInputBase-input": {
            padding: '18.5px 14px 18.5px 65px',
            fontFamily: 'Montserrat-Medium',
        },
        "& > i svg": {
            verticalAlign: 'text-top',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            '& legend': {
                '& span':{
                    paddingLeft: '12px',
                    paddingRight: '8px',
                },
            },
        },
        '& .Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#054D69',
            },
        },
    },
    mT30mB30: {
        marginTop: '30px',
        marginBottom: '30px',
    },
    inputCustmStyl: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: '#054D69',
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: '#92A6B6',
        },
        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
        },
        "& .MuiFormHelperText-root.Mui-error": {
            color: '#F28705',
        },
        "& .MuiFormLabel-root.Mui-error": {
            color: '#f28705',
        },
    },
    passwordPolicyStep: {
        marginTop: '10px',
        '& .MuiListItem-gutters': {
            paddingTop: '0px',
            paddingBottom: '0px',
        },
        '& .MuiListItemText-root': {
            margin: '0px',
        },
        '& > h6': {
            color: '#054D69',
            fontSize: '10px',
            lineHeight: '19px',
            fontFamily: 'Montserrat-Medium',
        },
        '& .MuiTypography-body1': {
            color: '#054D69',
            fontSize: '9px',
            lineHeight: '19px',
            fontFamily: 'Montserrat-Medium',
        },
    },
    progresBox: {
        width: '10px',
        height: '10px',
        backgroundColor: '#cccccc',
        marginRight: '4px',
        backgroundColor: '#EDEDED',
        borderRadius: '2px',
        border: '1px solid #F2F2F2',
    },
    progresBoxSucess: {
        backgroundColor: '#0EAC01',
        border: '1px solid #0EAC01',
        width: '10px',
        height: '10px',
        marginRight: '4px',
        borderRadius: '2px',
    },
    progresBoxWarning: {
        backgroundColor: '#F28705',
        border: '1px solid #F28705',
        width: '10px',
        height: '10px',
        marginRight: '4px',
        borderRadius: '2px',
    },
    buttonCustomLogin: {
        width: '90%',
        color: '#054D69',
        fontSize: '16px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '17px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        marginRight: '10%',
        backgroundColor: '#ffffff',
        textTransform: 'none',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'center',
        border: '1px solid #ffffff',
        '&:hover': {
            border: '1px solid #054D69',
            color: '#054D69',
        },
    },
    buttonCustomSign: {
        width: '90%',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Montserrat-SemiBold',
        lineHeight: '19px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#054D69',
        textTransform: 'none',
        marginLeft: '10%',
        boxShadow: 'none',
        '& > span > span': {
            verticalAlign: 'top',
            paddingRight: '10px',
        },
        '&.MuiButton-contained:hover': {
            boxShadow: 'none',
            backgroundColor: '#f28705',
        },
        '&.MuiButton-contained:focus': {
            outline: 'none',
        },
        '&:hover': {
            backgroundColor: '#054D69 !important',
        },
    },
    root: {
        "& .MuiPaper-root": {
            borderRadius: "1px",
            backgroundColor: "transparent",
        },
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: '100%',
    },
    paperRoot: {
        backgroundColor: 'transparent'
    },
    mainWraper: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    paper: {
        margin: theme.spacing(1, 2, 6, 2),
        padding: theme.spacing(4, 6, 12, 4),
        maxWidth: '485px',
        width: '100%',
        minHeight: '358px',
        [theme.breakpoints.down("sm")]: {
            //margin: theme.spacing(2, 2),
            //padding: theme.spacing(3, 2),
            justify: 'flex-start',
            alignItems: 'baseline',
        },
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(4, 0),
            padding: theme.spacing(2, 2),
        },
        boxShadow: '0px 3px 5px -1px rgb(22 56 79 / 20%), 0px 5px 8px 0px rgb(22 56 79 / 14%), 0px 1px 14px 0px rgb(22 56 79 / 12%)',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submitBtn: {
        margin: theme.spacing(3, 0, 1, 0),
        backgroundColor: '#054D69',
        fontSize: '14px',
        fontFamily: 'Montserrat-Bold',
        paddingTop: '15px',
        paddingBottom: '15px',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#054D69',
        }
    },
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    buttonCustomotp: {
        color: '#054D69',
        width: '90%',
        fontSize: '16px',
        lineHeight: '18px',
        marginRight: '10%',
        paddingTop: '15px',
        borderRadius: '0px',
        paddingBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #92A6B6',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        textAlign: 'center',
        '&:hover':{
            boxShadow: 'none',
            backgroundColor: '#ffffff',
            color: '#054D69',
        },
        '&:focus': {
            outline: 'none',
        },
    },
    buttonCustom: {
        width: '95%',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Montserrat-Medium',
        lineHeight: '19px',
        paddingTop: '15px',
        paddingBottom: '15px',
        borderRadius: '0px',
        backgroundColor: '#054D69',
        marginLeft: '10%',
        border: '1px solid #054D69',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        '&:hover':{
            boxShadow: 'none',
            backgroundColor: '#054D69',
        },
        '&:focus': {
            outline: 'none',
        },
        '& span': {
            verticalAlign: 'top',
            paddingRight: '10px',
        },
    },
    mT30: {
        marginTop: '30px',
    },
    forgotLinkSty: {
        color: '#05374A',
        fontSize: '14px',
        fontFamily: 'Montserrat-SemiBold',
    },
    otpFieldstyle: {
        padding: '8px 0px',
        border: 'none',
        borderRadius: '4px',
        "& input": {
            width: '35px !important',
            height: '36px',
            fontSize: '1rem',
            borderRadius: '0px',
            border: '1px solid #92A6B6',
            outline: 'none',
            fontFamily: 'Montserrat-Medium',
            color: '#05374A',
        },
        "& .MuiOutlinedInput-root > div > div": {
            margin: '0px auto',
            margin: '5px 18px',
        },
        [theme.breakpoints.down("xs")]: {
            marginRight: '12px !important',
        },
        '& .MuiOutlinedInput-root > div > div:nth-child(1)': {
            marginLeft: '0px !important',
        },
        '& .MuiOutlinedInput-root > div > div:nth-child(6)': {
            marginRight: '0px !important',
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: '#F28705',
            border: 'none',
            padding: '0px !important',
        },
        "& .MuiFormLabel-root": {
            color: '#F28705',
        },
        '& .MuiTypography-root': {
            color: '#05374A',
            fontSize: '12px',
            lineHeight: '20px',
        },
    },
    userLogDetail: {
        margin: theme.spacing(3, 0, 2, 0),
        '& h5': {
            color: '#16384F',
            fontSize: '15px',
            lineHeight: '19px',
            display: 'inline-block',
            padding: '3px 32px',
            borderRadius: '18px',
            border: '1px solid #E3E3E3',
            backgroundColor: '#F2F2F2',
            '& svg': {
                verticalAlign: 'middle',
                marginRight: '8px',
                color: '#054D69',
            },
        },
    },
    footerCopyRight: {
        padding: '5px 15px 5px 15px',
        display: 'block',
        textAlign: 'center',
        '& p': {
            marginBottom: '0px',
            fontSize: '12px',
        },
    },
});

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(SelectADCompany)));
