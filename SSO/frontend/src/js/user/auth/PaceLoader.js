import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { Component, Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import PaceLoaderImg from '../../../../public/static/images/PaceLogoLoader.png';

class PaceLoader extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Box position="relative" display="inline-flex" className={classes.paceLoaderSection}>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress className={classes.paceLoaderBox} />
                        <Avatar alt="PaceLoader" className={classes.paceLoaderBoxIcon} src={`/${PaceLoaderImg}`} />
                    </Backdrop>
                </Box>
            </Fragment>
        );
    }
}

const useStyles = theme => ({
    paceLoaderSection: {
        width: '100%',
    },
    backdrop: {
        top: '45%',
        left: '45%',
        bottom: 'auto',
        zIndex: '1',
        position: 'absolute',
        backgroundColor: 'transparent',
        right: 'auto',
    },
    paceLoaderBox: {
        color: '#ff8533',
        width: '60px !important',
        height: '60px !important',
        //backgroundImage: `url(/${PaceLoaderImg})`, 
    },
    paceLoaderBoxIcon: {
        position: 'absolute',
    },
});

export default (withStyles(useStyles, { withTheme: true })(PaceLoader));