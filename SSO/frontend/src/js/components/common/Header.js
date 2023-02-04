import React, { Component, forwardRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Drawer from 'react-drag-drawer'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { withRouter, NavLink as RouterLink } from 'react-router-dom';
import LogoImage from '../../../../public/LoginImg/logo.png';
// import LogoImage from '../../../../../static/public/images/LoginImg/logo.png';
import { Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
        this.toggle = this.toggle.bind(this)
    }

    // The Header creates links that can be used to navigate
    // between routes.
    toggle() {
        let { toggle } = this.state

        this.setState({ toggle: !toggle })
    }

    render() {
        const { classes } = this.props
        return (
            <header className={classes.customHeaderColor}>
                <nav className="navbar navbar-expand-lg">
                    <Link to="/" className="navbar-brand text-white">
                        {/* <div className={classes.logoBoxStyle}><img className={classes.logoImg} src={LogoImage} title="Sign in" alt="Sign in" /></div>
                         <img src="/static/images/logo-white.png" width="150" alt="AssetGaurd" /> */}

                        <Typography className={classes.logoBoxHeader}><div className={classes.logoBoxStyle}><img className={classes.logoImg} src={`/${LogoImage}`} title="Company" alt="Company" /></div> <span>Pace Account</span></Typography>
                    </Link>

                    <button className="navbar-toggler" type="button" onClick={this.toggle}>
                        <span className="navbar-toggler-icon"><MenuIcon /></span>
                    </button>
                    <Drawer
                        open={this.state.toggle}
                        onRequestClose={this.toggle}
                        direction='left'
                        modalElementClass="drawer" >
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link to="/register" onClick={this.toggle} className="nav-link">Sign Up</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" onClick={this.toggle} className="nav-link">Log in</Link>
                            </li>
                        </ul>
                        {/* <footer>
                            <a href="https://bit.ly/homechef007" className="chef-signup">Sign up as chef</a>
                        </footer> */}
                    </Drawer>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item d-flex align-items-center">
                                <Button
                                    className="nav-link"
                                    component={forwardRef((props, ref) => <div
                                        ref={ref}
                                        style={{ flexGrow: 1 }}
                                    >
                                        <RouterLink {...props} />
                                    </div>)}
                                    to={'/login'}
                                >
                                    Log in
                                </Button>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Button
                                    variant="outlined"
                                    className="nav-link"
                                    component={forwardRef((props, ref) => <div
                                        ref={ref}
                                        style={{ flexGrow: 1 }}
                                    >
                                        <RouterLink {...props} />
                                    </div>)}
                                    to={'/register'}
                                >
                                    Sign Up
                                </Button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

//export default withRouter(Header);
const useStyles = theme => ({
    customHeaderColor: {
        backgroundColor: '#ffffff',
        webkitBoxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        mozBoxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        boxShadow: '0px 4px 10px -6px rgba(0,0,0,0.75)',
        position: 'sticky',
        top: '0',
        zIndex: '2',
        '& .MuiAvatar-img': {
            width: 'auto',
            height: 'auto',
        },
        '& .MuiToolbar-root': {
            [theme.breakpoints.down("md")]: {
                paddingTop: '5px',
                paddingBottom: '5px',
            },
        },
    },
    logoBoxStyle: {
        width: '55px',
        height: '55px',
        position: 'relative',
        borderRadius: '100px',
        marginBottom: '0px',
        backgroundColor: '#16384F',
        float: 'left',
    },
    logoImg: {
        maxWidth: '100%',
        top: 22,
        display: 'block',
        position: 'absolute',
    },
    logoBoxHeader: {
        '& span': {
            float: 'left',
            paddingTop: '15px',
            lineHeight: '28px',
            fontSize: '22px',
            paddingLeft: '22px',
            color: '#16384F',
            fontFamily: 'Montserrat-Medium',
            [theme.breakpoints.down("sm")]: {
                fontSize: '22px',
                paddingLeft: '12px',
            },
        },
    },
});

export default (withRouter(withStyles(useStyles, { withTheme: true })(Header)));

//export default withStyles(useStyles)(Header);
