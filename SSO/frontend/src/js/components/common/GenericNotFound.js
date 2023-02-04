import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    // 404 page
    loaderContainer: {
        background: "url(/static/public/images/404.png) center bottom",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    content: {
        color: "#333",
        textAlign: "center",
        userSelect: "none"
    },
    title: {
        fontSize: "20vh",
        fontWeight: "900",
        opacity: "0.5"
    },
    subtitle: {
        fontSize: "6vh",
        fontWeight: "600",
        paddingBottom: "2vh"
    },
    description: {
        fontSize: "2vh",
        paddingBottom: "4vh"
    }
}));

const GenericNotFound = props => {

    const classes = useStyles();

    return (
        <div className={classes.loaderContainer}>
            <div className={classes.content}>
                <div className={classes.subtitle}>NOTHING FOUND</div>
                <div className={classes.description}>You are on the wrong path. <Link className="text-primary" to="/">Try to navigate to Home</Link></div>
            </div>
        </div>
    )
}

export default GenericNotFound;
