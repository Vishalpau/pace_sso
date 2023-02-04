import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserActions } from '../UserActions';

class LoginCode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            type: 'password',
            loading: false
        };

        console.log({ props: this.props });
        return;
        this.action = new UserActions(this.props.dispatch);
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    showHide = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    loginUser = () => {

        this.setState({ loading: true })

        window.location.href = process.env.API_URL + process.env.API_VERSION + '/user/auth/authorize/?client_id=pace_client&response_type=code';
        return null;

        // return redirect("http://localhost:8002/api/v1/user/auth/authorize/");
        // return;
        axios({
            // url: '/user/auth/token/',
            url: '/api/v1/user/auth/authorize/',
            method: 'GET',
            // data: {

            //     username: this.state.email,
            //     password: this.state.password,
            //     client_id: "Qb2CUGmpifsYbpTC3hyvpGqdYjpZwh6N1vdqA0qt",
            //     client_secret: "AcRVVfhlvYpAL0wkLHZdzAhrWPIHipAoGBRzcqUEQITfbA9T7EKB75GJ4iCrWrNn8BtutBB8rz9NCDmH4cp0CzwwoA9i5gRm3WfmzZwZgACA0fjzkTjcBHrywlF5fSUI",
            //     grant_type: "password"
            // },

            params: {
                client_id: "pace_client",
                response_type: "code"
            }
        }).then((res) => {
            console.log({ result: res });
            return;
            const token = res.data.access_token
            var fullToken = 'Bearer ' + token
            axios.defaults.headers.common['Authorization'] = fullToken;
            this.action.login(res.data)
        }).catch((err) => {
            this.setState({ loading: false })
            if (err.response && err.response.status == 400) {
                var errorKeys = _.keys(err.response.data.errors)
                console.log(errorKeys)
                errorKeys.forEach(element => {
                    var message = element + ': ' + err.response.data.errors[element][0]
                    // display the message in the material snacker
                });
            }
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div style={{ background: "url(static/public/images/login-bg.svg) center bottom/cover no-repeat", overflow: "auto" }} className="py-5 mt-5">
                <div className="container">
                    <div className="col-lg-6 offset-lg-3 col-12 p-4 card my-5"
                        style={{ boxShadow: "0 25px 75px rgba(16,30,54,.25)", borderRadius: "6px" }}>
                        <h4 className="text-dark"><span className="br-primary">Log In With Pace SSO</span></h4>
                        {/* <p className="text-muted font-weight-light">Enter your registered email and password to Log In</p>
                        <div className="border-bottom mb-3"></div> */}
                        {/* {this.state.loading ? <div className="d-flex my-5 align-items-center justify-content-center"><CircularProgress /></div> : <div>
                            <input type="email" className="mb-3 col-12 form-control" placeholder="Email" name="email"
                                value={this.state.email} onChange={this.handleChange} />
                            <div className={clsx(classes.password, "mb-3 col-12 px-0")}>
                                <input type={this.state.type} className="form-control" onChange={this.handleChange} placeholder="Password" name="password" value={this.state.password} />
                                <span className={classes.password__show} onClick={this.showHide}>
                                    {this.state.type === 'input' ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                                </span>
                            </div>
                        </div>} */}
                        <div className="border-bottom mb-3"></div>
                        <button type="button" onClick={() => { this.loginUser() }}
                            className="btn btn-primary text-center btn-block col-10 mx-auto" disabled={this.state.loading ? true : false}>Log In via SSO</button>
                        <p className="text-muted text-center">
                            <small className="d-flex font-weight-light align-items-center flex-wrap justify-content-center mt-1">Don't have an account?&nbsp; <Link className="p-0" to={"/register"}> Register now</Link></small>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const useStyles = theme => ({
    password: {
        display: "block",
        position: "relative",
        textTransform: "uppercase",
        fontWeight: 700,
        width: "100%"
    },
    password__show: {
        cursor: "pointer",
        position: "absolute",
        bottom: "14px",
        height: "16px",
        right: "10px",
        color: "#6d757d",
        fontSize: "0.8rem",
    }
});

function mapStateToProps(state, props) { return { user: state } }
function mapDispatchToProps(dispatch) { return { dispatch }; }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(useStyles, { withTheme: true })(LoginCode));
