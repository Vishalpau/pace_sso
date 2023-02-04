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
  }
});


class ListAddresses extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    open: false,
    addresses: [],

  }
  handlePageChange = (event, page) => {
    alert(page)
    this.setState({ page: page });
    // setPage(page);
  };

  handleRowsPerPageChange = event => {
    this.setState({ rowPerPage: event.target.value });
  };



  getAddresses = (user) => {
    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/user/' + user + '/addresses/',
      method: 'GET',
    }).then((res) => {
      this.setState({ addresses: res.data.data.results })
      console.log({ 'statein comp': this.state.addresses })

    }).catch((err) => {
      console.log(err)

    })
  }


  componentDidMount() {
    console.log({ listprops: this.props })
    this.getAddresses(this.props.user)
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
    return (

      < div >
        <Card
          // {...rest}
          className={(classes.root)}
        >
          <CardContent className={classes.content}>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell>Address Tag</TableCell>
                      <TableCell>Address To</TableCell>

                      <TableCell>Address Line One</TableCell>
                      <TableCell>Address Line Two</TableCell>
                      <TableCell>Landmark</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Postal Code</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.addresses.slice(0, (this.state.rowsPerPage)).map(address => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={address.id}

                      >

                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/" + this.props.user + "/addresses/" + address.id}

                            >
                              {address.addressTag}
                            </Button>
                            {/* <Typography variant="body1">{address.name}</Typography> */}
                          </div>
                        </TableCell>
                        <TableCell>
                          {(address.addressTo ? address.addressTo : "NA")}
                        </TableCell>
                        <TableCell>{(address.addressLineOne ? address.addressLineOne : "NA")}</TableCell>
                        <TableCell>
                          {(address.addressLineTwo ? address.addressLineTwo : "NA")}
                        </TableCell>
                        <TableCell>
                          {(address.landmark ? 'address.landmark' : "NA")}
                        </TableCell>
                        <TableCell >
                          {address.state}
                        </TableCell>
                        <TableCell>
                          {address.city}
                        </TableCell>
                        <TableCell>
                          {address.postalCode}
                        </TableCell>

                        <TableCell>
                          <span className={classes.link_button}>
                            <Link

                              component={this.CustomRouterLink}
                              to={"/" + this.props.user + "/addresses/update/" + address.id}
                              color="primary"
                            // variant="contained"

                            >
                              <span className="material-icons">
                                create
                            </span>
                            </Link>

                            <Link
                              component={this.CustomRouterLink}
                              to={"/" + this.props.user + "/addresses/" + address.id}
                              color="primary"
                            // variant="contained"

                            >
                              <span className="material-icons">
                                info
                          </span>
                            </Link>


                          </span>
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
              count={this.state.addresses.length}
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

ListAddresses.propTypes = {
  className: PropTypes.string,
  // addresses: PropTypes.array.isRequired
};

export default withStyles(styles)(ListAddresses);
