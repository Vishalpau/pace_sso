import { CircularProgress } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import PaceLogoImage from './img/PaceLogoImage.png';

class PaceLogo extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <img className={classes.pacelogonBox} src={PaceLogoImage} title="Pace OS" alt="Pace OS" />
            </div>
        );
    }
}

const useStyles = theme => ({
    pacelogonBox: {
        display: "block",
        position: "relative",
        padding: theme.spacing(0, 0, 3, 0),

    }
});

export default (withStyles(useStyles, { withTheme: true })(PaceLogo));