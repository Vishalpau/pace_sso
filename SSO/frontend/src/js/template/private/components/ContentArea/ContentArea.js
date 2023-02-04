import React, { Component, forwardRef, Fragment } from "react";
import {
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  Container,
  CardActions,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import EditIcon from "@material-ui/icons/Edit";
import ellipse from "../../../../../../public/LoginImg/ellipse.png";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import "../../../../../../src/App.css";
import PaceLoader from "../../../../user/auth/PaceLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiCardContent-root": {
      backgroundColor: "#f8f8f8",
      padding: "30px",
      [theme.breakpoints.down("md")]: {
        padding: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "15px",
      },
    },
  },
  contentSection: {
    marginTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "40px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
      marginTop: "35px",
    },
  },
  contentTitle: {
    fontSize: "30px",
    lineHeight: "50px",
    fontFamily: "Montserrat-SemiBold",
    color: "#16384F",
    [theme.breakpoints.down("md")]: {
      fontSize: "22px",
      lineHeight: "40px",
    },
  },
  cardUserDetail: {
    "& img": {
      float: "left",
    },
  },
  cardUserTitlBox: {
    paddingTop: "10px",
    float: "left",
    paddingLeft: "20px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "10px",
    },
    "& p": {
      fontFamily: "Montserrat-Medium",
      fontSize: "24px",
      lineHeight: "28px",
      [theme.breakpoints.down("md")]: {
        fontSize: "20px",
      },
    },
    "& p span": {
      fontFamily: "Montserrat-Regular",
      fontSize: "16px",
      lineHeight: "18px",
      [theme.breakpoints.down("md")]: {
        fontSize: "14px",
      },
    },
  },
  editBtnBox: {
    float: "right",
    [theme.breakpoints.down("sm")]: {
      padding: "8px 0px",
    },
  },
  editBtnstyle: {
    backgroundColor: "#f28705",
    textTransform: "capitalize",
    padding: "8px 12px",
    color: "#ffffff",
    [theme.breakpoints.down("md")]: {
      padding: "2px 8px",
    },
  },
  listViewContent: {
    color: "#fff",
    paddingTop: "20px",
    [theme.breakpoints.down("md")]: {
      paddingTop: "5px",
    },
    "& .MuiListItem-root": {
      [theme.breakpoints.down("md")]: {
        paddingLeft: "0px",
        paddingRight: "0px",
      },
    },
    "& .MuiListItem-root span": {
      fontSize: "16px",
      fontFamily: "Montserrat-Medium",
      [theme.breakpoints.down("md")]: {
        fontSize: "13px",
      },
    },
    "& .MuiListItem-root p": {
      fontSize: "20px",
      fontFamily: "Montserrat-Medium",
      lineHeight: "40px",
      [theme.breakpoints.down("md")]: {
        fontSize: "16px",
        lineHeight: "22px",
      },
    },
  },
}));

const ContentArea = (props) => {
  const classes = useStyles();
  const user = props.user;
  // console.log({ userdata: user.data })
  // console.log({ username: user.name })
  return (
    <Fragment>
      <PaceLoader hidden={isLoading} />
      <Container className={classes.root}>
        <Grid
          item
          md={12}
          xs={12}
          spacing={2}
          className={classes.contentSection}
        >
          <Typography className={classes.contentTitle} varient="h1">
            Profile
          </Typography>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item md={6} xs={10}>
                  <Typography className={classes.cardUserDetail}>
                    <img
                      className={classes.large}
                      src={`/${ellipse}`}
                      title="User pic"
                      alt="User pic"
                    />
                    <div className={classes.cardUserTitlBox}>
                      <Typography varient="h3">{props.user.email}</Typography>
                      <Typography varient="body2">
                        <span>{props.user.email}</span>
                      </Typography>
                    </div>
                  </Typography>
                </Grid>
                <Grid item md={6} xs={2}>
                  <CardActions className={classes.editBtnBox}>
                    <Button
                      variant="contained"
                      //color="primary"
                      //size="small"
                      className={classes.editBtnstyle}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
                className={classes.listViewContent}
              >
                <Grid item md={4} xs={6}>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Full Name"
                        secondary={props.user.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Gender" secondary="Male " />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Language" secondary="English " />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item md={6} xs={6}>
                  <List>
                    <ListItem>
                      <ListItemText primary="Nick Name" secondary="Doe " />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Country/Region"
                        secondary="India"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Time zone"
                        secondary="(+5:30) India Standard Time (Asia/Kolkata)"
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/*<Typography text-align="right">Powered by <img className={classes.footerLogo} spacing={3} src={`/${teknobuiltLogo}`} title="Company Logo" alt="Company Logo" /></Typography>*/}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ContentArea;
