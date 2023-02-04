import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import clsx from 'clsx';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Grid,
    Typography,
    IconButton,
    TextField,
    Button,
    Card
} from '@material-ui/core';
import { withFormik, Formik } from "formik";
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SetupAccount extends Component {
    

    state= {
        snackbarOpen: false,
        person: []
    }

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    


    componentDidMount() {
        console.log(this.props)
        const person_id = this.props.route.match.params.path
    
        axios({
          url: '/user/person/'+ person_id+'/',
          method: 'GET',
        }).then((res) => {
          this.setState({ person: res.data })
          console.log(this.state.person)
        }).catch((err) => {
          console.log(err)
        })
    
        
      }

    handleCloseSnackbar = (event, reason) => {
        
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({snackbarOpen: false});
    }

    handleSignUp = (event) => {
        event.preventDefault();
        history.push('/');
    };

    
    validationSchema = Yup.object().shape({
        // first_name: Yup.string().required("Please specify First Name"),
        // last_name: Yup.string().required("Please specify the Last Name"),
        // email: Yup.string().required("Please specify the Email Address"),
        password: Yup.string().required("Please enter the password"),

        conf_password: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Password and Confirm password field does not match"
            )
        }),

        // company_name: Yup.string().required("Please specify the Company Name"),
        // phone: Yup.string().required("Please enter the Phone Number"),
        // address: Yup.string().required("Please specify the address"),
        // state: Yup.string().required("Please specify the state"),
        // country: Yup.string().required("Please specify the country"),
    })

    render() {
        // const { classes } = this.props
        const {
            classes,
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
            setFieldError
        } = this.props;
        return (
            <div>


<Grid
                    className={classes.grid}
                    container
                >
                    
                    <Grid
                        className={classes.content}
                        item
                        lg={12}
                        md={12}
                        xs={12}
                    >
                        <div className={classes.content} >
                            <div className="col-lg-8 offset-lg-2 col-12 p-4 card my-5"
                        style={{ boxShadow: "0 25px 75px rgba(16,30,54,.25)", borderRadius: "6px" }} >
                               <Formik
      initialValues={this.state.person}
      validationSchema={this.validationSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        const person = this.state.person
        console.log({instate: this.props})
        axios({
            url: '/user/register/',
            method: 'POST',
            data: {
                email: person.email,
                password: values.password,
                conf_pass: values.conf_password,
                first_name: person.first_name,
                last_name: person.last_name,
                phone: person.phone,
                address: values.address,
                country: person.country,
                state: person.state,
                company_id: person.company_id
            }
        }).then((res) => {
            
            setStatus(true) 
            resetForm({values: ''})
            this.props.route.history.push("/login")
            this.setState({snackbarOpen:true})
        }).catch((err) => {
            console.log(err)
            // const errData = err.response.data

            // var tifOptions = Object.keys(errData).map(function (key) {
            //     return setFieldError(`${key}`, `${errData[key][0]}`)
            // });

        })



        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 1000);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => ( <form
                                    autoComplete="off"
                                    noValidate
                                    className={classes.form}
                                    onSubmit={handleSubmit}
                                >
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        Create new account
                </Typography>
                                    <Typography
                                        color="textSecondary"
                                        gutterBottom
                                    >
                                        Use your email to create new account
                </Typography>

                                    <Grid
                                        container
                                        spacing={1}
                                    >
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                margin="dense"
                                                id="first_name"
                                                value={values.first_name || ''}
                                                label="First Name"
                                                helperText={touched.first_name ? errors.first_name : ""}
                                                type="text"
                                                fullWidth
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.first_name && Boolean(errors.first_name)}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                helperText={touched.last_name ? errors.last_name : ""}
                                                margin="dense"
                                                fullWidth
                                                id="last_name"
                                                label="Last name"
                                                name="last_name"
                                                value={values.last_name || ''}
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.last_name && Boolean(errors.last_name)}
                                                variant="outlined"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                disabled
                                                helperText={touched.email ? errors.email : ""}
                                                margin="dense"
                                                fullWidth
                                                id="email"
                                                label="Email address"
                                                name="email"
                                                onChange={this.handleChange}
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.email && Boolean(errors.email)}
                                                variant="outlined"
                                                value={values.email || ''}
                                            />
                                        </Grid>
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                helperText={touched.password ? errors.password : ""}
                                                margin="dense"
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                name="password"
                                                onChange={this.handleChange}
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.password && Boolean(errors.password)}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                helperText={touched.conf_password ? errors.conf_password : ""}
                                                margin="dense"
                                                fullWidth
                                                id="conf_password"
                                                label="Confirm Password"
                                                name="conf_password"
                                                onChange={this.handleChange}
                                                type="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.conf_password && Boolean(errors.conf_password)}
                                                variant="outlined"
                                            />
                                        </Grid>
                                        
                                       
                                        <Grid

                                            item
                                            lg={6}
                                            md={6}
                                            xs={12}
                                        >
                                            <TextField
                                                
                                                helperText={touched.address ? errors.address : ""}
                                                margin="dense"
                                                fullWidth
                                                id="address"
                                                label="address"
                                                name="address"
                                                onChange={this.handleChange}
                                                type="text"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.address && Boolean(errors.address)}
                                                variant="outlined"
                                                value={values.address || ''}
                                            />
                                        </Grid>

                                    </Grid>
                                    <Button
                                        className={classes.signUpButton}
                                        color="primary"
                                        // disabled={!formState.isValid}
                                        fullWidth
                                        // size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign up now
                </Button>
                                    <Typography
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        Have an account?{' '}
                                        <Link className="p-0" to={"/login" + this.props.route.location.search}>Log In now</Link>
                                    </Typography>
                                </form>
                                )}
                                </Formik>
                            </div>
                        </div>
                        
                    </Grid>

                </Grid>

                <Snackbar open={this.state.snackbarOpen} autoHideDuration={6000} onClose={this.handleCloseSnackbar}>
          <Alert onClose={this.handleCloseSnackbar} severity="success">
            Category Added Successfully!
            </Alert>
        </Snackbar>
      
            </div>
        );
    }
}

const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },


    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        },
        
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 550,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
});

const adduser = withFormik({
    mapStateToProps:({
        first_name
    }) => {
        return {
            first_name: 'Viraj'
        }
    },
    mapPropsToValues: ({
        first_name,
        last_name,
        email,
        password,
        conf_password,
        company_name,
        phone,
        address,
        state,
        country
    }) => {
        return {
            first_name: first_name || "",
            last_name: last_name || '',
            email: email || '',
            password: password || '',
            conf_password: conf_password || '',
            company_name: company_name || '',
            phone: phone || '',
            address: address || '',
            state: state || '',
            country: country || '',
        };
    },


    handleSubmit: (values, { props, setStatus, setFieldError, resetForm }) => {
        console.log({propdtosubmit: props})

        // axios({
        //     url: '/user/register/',
        //     method: 'POST',
        //     data: {
        //         email: values.email,
        //         password: values.password,
        //         conf_pass: values.conf_password,
        //         first_name: values.first_name,
        //         last_name: values.last_name,
        //         phone: values.phone,
        //         address: values.address,
        //         country: values.country,
        //         state: values.state,
        //         company_name: values.company_name
        //     }
        // }).then((res) => {
            
        //     setStatus(true) 
        //     resetForm({values: ''})
        //     props.route.history.push("/login")
        //     // this.showSnack("User have beeen registered successfully")
        // }).catch((err) => {

        //     const errData = err.response.data

        //     var tifOptions = Object.keys(errData).map(function (key) {
        //         return setFieldError(`${key}`, `${errData[key][0]}`)
        //     });

        // })

    },
})(SetupAccount);


function mapStateToProps(state, props) { return { person: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }





export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(adduser));





