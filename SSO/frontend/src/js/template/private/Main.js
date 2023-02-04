import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { Sidebar, Topbar, Footer } from './components';
import registerServiceWorker from '../../registerServiceWorker';
import ContentArea from '../../../../src/js/template/private/components/ContentArea/ContentArea';
import LeftSidbar from './LeftSidbar';

const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%',
        minHeight: '595px',
    }
}));

const Main = props => {
    const { children } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    useEffect(() => {
        registerServiceWorker()
    }, [])

    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    const shouldOpenSidebar = isDesktop ? true : openSidebar;
    const Component = props.component;
    console.log({props:props});
    const route = props.route;
    const user = props.user;
    const userActions = props.userActions;

    return (
        <div
            // className={clsx({
            //     [classes.root]: true,
            //     [classes.shiftContent]: isDesktop
            // })}
        >
            {/* <LeftSidbar /> */} 
            {/* <Topbar onSidebarOpen={handleSidebarOpen} userActions={userActions} />
            <Sidebar 
                onClose={handleSidebarClose}
                open={shouldOpenSidebar}
                variant={isDesktop ? 'persistent' : 'temporary'}
            /> */}
            {/* <main className={classes.content}>
                <Component route={route} />
            </main> */}
            {/* <Footer /> */}
        </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;