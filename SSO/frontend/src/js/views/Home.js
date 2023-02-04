import { Button, Grid, Typography, Card, CardContent, CardHeader, Divider } from '@material-ui/core';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Product1 from '../../../public/static/images/products/product1.png';
const styles = theme => ({
    root: {},
    imageContainer: {
        height: 100,
        width: 100,
        margin: '0 auto',
        // border: `1px solid ${theme.palette.divider}`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%'
    },
    statsItem: {
        display: 'flex',
        alignItems: 'center'
    },
    statsIcon: {
        color: theme.palette.icon,
        marginRight: theme.spacing(1)
    },
    pricingCardHeader: {
        width: '900',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    pricingInfo: {
        margin: '10px',
        padding: '10px'
    },
    innerCard: {
        height: '250px'
    }

});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Grid container alignItems="center">
                        <Grid item
                            md={6}
                            xs={12}
                        >
                            <Grid container alignItems="center" justify="center">
                                <div className="text-center text-lg-left my-2 w-75">
                                    <Typography gutterBottom className="pb-2" variant="h2">PACE Admin Portal</Typography>
                                    <Typography gutterBottom className="pb-2 text-muted" variant="h4" >Take Admin Actions</Typography>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid item
                            md={6}
                            xs={12}
                        >
                            <img src="/static/public/images/intro.png" className="w-100" alt="Manage subsciption with ease" style={{ border: '1px solid ${theme.palette.divider}' }} />
                        </Grid>
                    </Grid>
                </div>
                <divider />




            </div >

        );
    }
}

export default withStyles(styles)(Home);