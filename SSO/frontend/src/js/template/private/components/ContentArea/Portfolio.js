import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import Page from "../../../../../components/Page";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import "../../../../../../../frontend/src/App.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ThreeDHexagon from "../../../../views/Hexagon/ThreeDHexagon";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: 0,
    padding: theme.spacing(2),
  },
  PortfolioLegendSection: {
    // position: 'sticky',
    // bottom: '50px',
    // padding: '0px 12px',
  },
  PortfolioLegend: {
    display: "block",
    width: "100%",
    float: "left",
    padding: "0px",
    "& li .MuiListItemText-root .MuiListItemText-primary": {
      fontSize: "16px",
      fontFamily: "Montserrat-Regular",
      lineHeight: "19px",
      color: "#666666",
    },
    "& li:nth-child(1)": {
      width: "110px",
      float: "left",
    },
    "& li:nth-child(2)": {
      width: "120px",
      float: "left",
    },
    "& li:nth-child(3)": {
      width: "200px",
      float: "left",
    },
  },
  legendIconBox: {
    padding: "10px",
    display: "block",
    borderRadius: "3px",
    width: "10px",
    height: "10px",
    backgroundColor: "#ddd",
    marginRight: "10px",
    float: "left",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
            <Typography>{children}</Typography>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const Portfolio = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(1);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Page title="Dashboard" className={classes.root}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12}>
                <AppBar position="static" className="tabSection">
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                  >
                    <Tab
                      className="customTabLebl"
                      square
                      label="APE"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className="customTabLebl"
                      square
                      label="HSE"
                      {...a11yProps(1)}
                    />
                    <Tab
                      className="customTabLebl"
                      square
                      label="QCX"
                      {...a11yProps(2)}
                    />
                    <Tab
                      className="customTabLebl"
                      square
                      label="OCS"
                      {...a11yProps(3)}
                    />
                    <Tab
                      className="customTabLebl"
                      square
                      label={
                        <Fragment>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <g
                              id="setting-white-24"
                              transform="translate(-1041 -51)"
                            >
                              <g id="Group_5797" data-name="Group 5797">
                                <g id="Group_5785" data-name="Group 5785">
                                  <g id="Group_5770" data-name="Group 5770">
                                    <g
                                      id="Group_5756"
                                      data-name="Group 5756"
                                      transform="translate(227)"
                                    >
                                      <g
                                        id="Group_5753"
                                        data-name="Group 5753"
                                        transform="translate(814 51)"
                                      >
                                        <g
                                          id="Group_5746"
                                          data-name="Group 5746"
                                          transform="translate(0)"
                                        >
                                          <g
                                            id="Group_5744"
                                            data-name="Group 5744"
                                          >
                                            <g
                                              id="Group_5742"
                                              data-name="Group 5742"
                                            >
                                              <rect
                                                id="Rectangle_1883"
                                                data-name="Rectangle 1883"
                                                width="24"
                                                height="24"
                                                fill="none"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                                <g
                                  id="noun_setting_4423294"
                                  transform="translate(985.516 -154)"
                                >
                                  <g
                                    id="Group_5759"
                                    data-name="Group 5759"
                                    transform="translate(56.485 206)"
                                  >
                                    <g id="Group_5757" data-name="Group 5757">
                                      <path
                                        id="Path_6426"
                                        data-name="Path 6426"
                                        d="M80.011,235.279a1.125,1.125,0,0,0-.926-.949,12.174,12.174,0,0,0-4.45,0,1.125,1.125,0,0,0-.926.949l-.246,1.956a9.1,9.1,0,0,0-2.085,1.146l-1.9-.776a1.194,1.194,0,0,0-1.325.288,10.884,10.884,0,0,0-2.227,3.668,1.068,1.068,0,0,0,.4,1.236l1.658,1.182a8.046,8.046,0,0,0,0,2.291s-1.658,1.181-1.658,1.181a1.068,1.068,0,0,0-.4,1.236,10.884,10.884,0,0,0,2.227,3.668,1.194,1.194,0,0,0,1.325.288l1.9-.776a9.1,9.1,0,0,0,2.085,1.146l.246,1.957a1.125,1.125,0,0,0,.926.949,12.175,12.175,0,0,0,4.45,0,1.125,1.125,0,0,0,.926-.949l.246-1.957a9.1,9.1,0,0,0,2.085-1.146l1.9.776a1.194,1.194,0,0,0,1.325-.288,10.884,10.884,0,0,0,2.227-3.668,1.068,1.068,0,0,0-.4-1.236l-1.658-1.182a8.045,8.045,0,0,0,0-2.291S87.4,242.8,87.4,242.8a1.068,1.068,0,0,0,.4-1.236,10.884,10.884,0,0,0-2.227-3.668,1.194,1.194,0,0,0-1.325-.288l-1.9.776a9.1,9.1,0,0,0-2.085-1.146Zm-2.191,1.093.226,1.8a1.117,1.117,0,0,0,.8.919,6.728,6.728,0,0,1,2.513,1.38,1.2,1.2,0,0,0,1.237.2l1.749-.713a8.646,8.646,0,0,1,.96,1.582l-1.523,1.085a1.073,1.073,0,0,0-.436,1.12,6.031,6.031,0,0,1,0,2.76,1.073,1.073,0,0,0,.436,1.12l1.523,1.085a8.646,8.646,0,0,1-.96,1.582l-1.749-.713a1.2,1.2,0,0,0-1.237.2,6.729,6.729,0,0,1-2.513,1.38,1.117,1.117,0,0,0-.8.919l-.226,1.8a9.755,9.755,0,0,1-1.92,0l-.226-1.8a1.117,1.117,0,0,0-.8-.919,6.729,6.729,0,0,1-2.513-1.38,1.2,1.2,0,0,0-1.237-.2l-1.749.713a8.645,8.645,0,0,1-.96-1.582l1.523-1.085a1.073,1.073,0,0,0,.436-1.12,6.031,6.031,0,0,1,0-2.76,1.073,1.073,0,0,0-.436-1.12l-1.523-1.085a8.645,8.645,0,0,1,.96-1.582l1.749.713a1.2,1.2,0,0,0,1.237-.2,6.728,6.728,0,0,1,2.513-1.38,1.117,1.117,0,0,0,.8-.919l.226-1.8a9.753,9.753,0,0,1,1.92,0Z"
                                        transform="translate(-65.86 -234.125)"
                                        fill="#fff"
                                        fill-rule="evenodd"
                                      />
                                    </g>
                                    <g
                                      id="Group_5758"
                                      data-name="Group 5758"
                                      transform="translate(7.159 7.159)"
                                    >
                                      <path
                                        id="Path_6427"
                                        data-name="Path 6427"
                                        d="M138.675,46.5a3.841,3.841,0,1,0,3.841,3.841A3.843,3.843,0,0,0,138.675,46.5Zm0,2.2a1.646,1.646,0,1,1-1.646,1.646A1.648,1.648,0,0,1,138.675,48.7Z"
                                        transform="translate(-134.834 -46.5)"
                                        fill="#fff"
                                        fill-rule="evenodd"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </g>
                          </svg>
                          PACE ADMIN
                        </Fragment>
                      }
                      {...a11yProps(4)}
                    />
                  </Tabs>
                </AppBar>
              </Grid>

              <Grid item md={12} sm={12} xs={12} className="marginT10">
                {/* <Grid container spacing={3}>
                                    <Grid item md={12} sm={12} xs={12}> */}
                <TabPanel className="tabContentArea" value={value} index={0}>
                  APE
                </TabPanel>
                <TabPanel className="tabContentArea" value={value} index={1}>
                  <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12}>
                      <ThreeDHexagon />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel className="tabContentArea" value={value} index={2}>
                  QCX
                </TabPanel>
                <TabPanel className="tabContentArea" value={value} index={3}>
                  OCS
                </TabPanel>
                <TabPanel className="tabContentArea" value={value} index={4}>
                  Pace admin
                </TabPanel>
                {/* </Grid>
                                </Grid> */}
              </Grid>

              <Grid
                item
                md={12}
                sm={12}
                xs={12}
                className={classes.PortfolioLegendSection}
              >
                <List className={classes.PortfolioLegend}>
                  <ListItem>
                    <span
                      className={classes.legendIconBox}
                      style={{ backgroundColor: "#06425C" }}
                    ></span>
                    <ListItemText primary="Active" />
                  </ListItem>
                  <ListItem>
                    <span
                      className={classes.legendIconBox}
                      style={{ backgroundColor: "#CECECE" }}
                    ></span>
                    <ListItemText primary="Inactive" />
                  </ListItem>
                  <ListItem>
                    <span
                      className={classes.legendIconBox}
                      style={{ backgroundColor: "#99ABBA" }}
                    ></span>
                    <ListItemText primary="Access restricted" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </Fragment>
  );
};

export default Portfolio;
