import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Page from '../../../components/Page';
import { Box, Grid, Paper, Typography, TextField, Button, List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import PaceLogo from './PaceLogo';
import '../../../../src/App.css';
import { UserActions } from '../UserActions';


class SelectSingleProject extends Component {

    constructor(props) {
        super(props);
        this.action = new UserActions(this.props.dispatch);
        console.log({props:this.props})
        this.state={
            projects:[]
        }
    }

    componentDidMount=()=> {
        this.getProjects();
    
    }
    
    getProjects = async() => {
        
        const companyId = this.props.match.params.id
        console.log({companyId:companyId})        
        let data = await axios
        .get(process.env.API_URL + process.env.API_VERSION +'/companies/'+companyId+'/projects/')
        .then(function(res) {
            console.log({data:  res.data.data.results})
            return res.data.data.results;
        })
        .catch(function(error) {
        console.log(error);
        });

        this.setState({ projects: data });
        // alert(data.length)
        if(data.length == 1){   
            this.handleClick(data[0]);
        }
        else if(data.length == 0){
            this.action.openSnackbar("Welcome to Dashboard25")
            // this.action.login(this.props.route.location.user_data)
            this.props.history.push('/dashboard')       
        }

    }


    // componentDidMount=()=>{
    //     console.log({project:this.props})
    //     const companyId = this.props.match.params.id
    //     alert(companyId)
    //     axios({
    //         url: process.env.API_URL + process.env.API_VERSION +'/companies/'+companyId+'/projects/',
    //         method: 'GET',
    //       }).then((res) => {
    //         console.log({result:res.data.data.results}) 
    //         this.setState({projects:res.data.data.results})
    //         // this.action.openSnackbar("Please select a project")
    //         // this.action.login(this.props.route.location.user_data)
    //         // this.props.history.push('/selectsingleproject/'+companyId)     
    //       }).catch((err) => {
    //         console.log({error:err})
      
    //       })   

    //       console.log({projects: this.state.projects})
    // }

    handleClick=(project,project_obj)=>{
        console.log({selected:this.props})
        localStorage.setItem('ssoProjectId',project.projectId)
        const projectId=localStorage.getItem('ssoProjectId')
        // console.log({'proj_single':project})
        localStorage.setItem('project', JSON.stringify(project_obj));
        axios({
            url: process.env.API_URL + process.env.API_VERSION +'/user/getprojectid/'+projectId+'/',
            method: 'GET',
          }).then((res) => {
            console.log({result:res}) 
            this.action.openSnackbar("Welcome to Dashboard")
            // this.action.login(this.props.route.location.user_data)
            this.props.history.push('/dashboard')          
          }).catch((err) => {
            console.log({error:err})
      
          })   

    }
 
    render() {
        const { classes } = this.props 
        const email=this.props.location.email
        const password=this.props.location.password
    
        return (
            <Page className={classes.root} title="Select company">
                <Box className={classes.customcontentbox}
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    justifyContent="center"
                >
                    <Grid container component="main" className={classes.root} >
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
                            <Grid container item xs={12} sm={8} md={4}  component={Paper} className={classes.paper} elevation={5}>

                                <Grid item xs={12} sm={12} md={12} align="center"><PaceLogo /></Grid>

                                <Grid item xs={12} sm={12} md={12} align="center">
                                    <Typography component="h1" variant="h5" className={classes.logTitle} >
                                        Select Project
                                    </Typography>
                                </Grid>
                                <form className={classes.form} style={{overflowY:'auto'}} autoComplete="off" noValidate >
                                { this.state.projects.map(project=> {
                                    const projectId=project.projectId
                                    return(

                                    <Grid item xs={12} sm={12} md={12} >
                                        <List >
                                            <ListItem button>
                                                <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText className={classes.companyNameList} primary={project.projectName} secondary={project.projectDescription} id={project.projectId} onClick={()=>this.handleClick({projectId},project)}/>
                                            </ListItem>
                                        </List>
                                        
                                    </Grid>
                                    )})}
                                    {/* <Link to={{
                                        pathname: "/login",
                                        logincheck:true,
                                        email:email,
                                        password:password
                                        }}
                                        // onClick={this.handleBack}
                                        className={classes.BackLinkSty}>
                                        Back
                                    </Link> */}
                                </form>
                                {/* <Grid container className={classes.mT30}>
                                <Grid container item xs={6}></Grid> */}
                                
                                {/* </Grid> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Page>
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
    buttonCustomBack: {
        color: '#054D69',
        width: '90%',
        fontSize: '16px',
        lineHeight: '15px',
        marginRight: '10%',
        paddingTop: '15px',
        borderRadius: '0px',
        paddingBottom: '15px',
        backgroundColor: '#ffffff',
        border: '1px solid #92A6B6',
        boxShadow: 'none',
        fontFamily: 'Montserrat-SemiBold',
        textTransform: 'none',
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#ffffff',
        },
        '&:focus': {
            outline: 'none',
        },
        '& span': {
            verticalAlign: 'top',
            paddingLeft: '10px',
        },
    },
    mT30: {
        marginTop: '30px',
    },
    mainWraper: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 2),
        },
    },
    paper: {
        margin: theme.spacing(6, 2),
        padding: theme.spacing(4, 0),
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
        marginTop: theme.spacing(3),
        height: '200px',
        '& .MuiButtonBase-root': {
            padding: theme.spacing(0, 6),
        },
    },
    logTitle: {
        fontSize: '30px',
        fontFamily: 'Montserrat-Bold',
        color: '#054D69',
        lineHeight: '37px',
    },
    companyNameList: {
        '& .MuiListItemText-primary': {
            fontSize: '14px',
            fontFamily: 'Montserrat-Medium',
            color: '#054D69',
        },
        '& .MuiListItemText-secondary': {
            fontSize: '12px',
            fontFamily: 'Montserrat-Regular',
            color: '#054D69',
        },
    },
    BackLinkSty: {
        color: '#05374A',
        fontSize: '14px',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: '50%'
    },

});

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(SelectSingleProject)));
