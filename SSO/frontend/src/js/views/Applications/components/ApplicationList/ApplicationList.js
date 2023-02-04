import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Grid,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Link
} from '@material-ui/core';

const styles = theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050,
    overflowX: "auto"
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  link_button: {
    display: 'inline-flex'
  },
  logo: {
    maxWidth: "80px",
    marginLeft: 0
  },

});


class ApplicationList extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    open: false,
    applications: [],
  }
  handlePageChange = (event, page) => {
    alert(page)
    this.setState({ page: page });
    // setPage(page);
  };

  handleRowsPerPageChange = event => {
    this.setState({ rowPerPage: event.target.value });
  };



  getCompanies = () => {

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/applications/',
      method: 'GET',
    }).then((res) => {
      this.setState({ applications: res.data.data.results })
      console.log({ ' applications data': this.state.applications })

    }).catch((err) => {
      console.log(err)

    })
  }


  componentDidMount() {
    this.getCompanies()
  }

  CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
    // style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));


  render() {
    const { classes } = this.props;
    //console.log({prop:this.props})
    return (

      < div >
        <Card
          // {...rest}
          className={(classes.root)}
        >
          <CardContent className={classes.content}>
            <Button
              color="primary"
              className="float-right"
              variant="contained"
              component={forwardRef((props, ref) => <div
                ref={ref}
                style={{ flexGrow: 1 }}
              >
                <RouterLink {...props} />
              </div>)}
              to={'/addapplication'}
            >
              Add Application
        </Button>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell>Application Name</TableCell>
                      <TableCell>App Code</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>App URL</TableCell>
                      <TableCell>App Logo</TableCell>
                      <TableCell>Is Active</TableCell>
                      <TableCell>Created On</TableCell>
                      <TableCell>Application Roles</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.applications.slice(0, (this.state.rowsPerPage)).map(application => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={application.appId}
                      >
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/applications/" + application.appId}
                            >
                              {application.appName}
                            </Button>
                            {/* <Typography variant="body1">{address.name}</Typography> */}
                          </div>
                        </TableCell>
                        <TableCell>{application.appCode}</TableCell>
                        <TableCell>{application.appDesc}</TableCell>
                        <TableCell>
                          {(application.appURL ? application.appURL : "NA")}
                        </TableCell>
                        <TableCell>
                          <img src={application.appLogo} className={classes.logo}></img>
                        </TableCell>
                        <TableCell>
                          {(String(application.active) ? String(application.active) : "NA")}
                        </TableCell>
                        <TableCell>{application.created_at}</TableCell>
                        <TableCell>
                          <Link
                            component={this.CustomRouterLink}
                            to={"/roles/" + application.appId}
                            color="primary"
                          // variant="contained"
                          >
                            <i className="material-icons">
                              dehaze
                        </i>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={this.state.applications.length}
              onChangePage={this.handlePageChange}
              onChangeRowsPerPage={this.handleRowsPerPageChange}
              page={this.state.page}
              rowsPerPage={this.state.rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />

          </CardActions>
        </Card>
      </div >
    );
  };
};

ApplicationList.propTypes = {
  className: PropTypes.string,
  // addresses: PropTypes.array.isRequired
};

export default withStyles(styles)(ApplicationList);
