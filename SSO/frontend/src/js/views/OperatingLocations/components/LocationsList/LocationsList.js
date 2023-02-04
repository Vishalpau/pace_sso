import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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


class LocationsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rowsPerPage: 10,
      page: 0,
      open: false,
      locations: [],
      company_id: "",

    }
  }
  handlePageChange = (event, page) => {
    alert(page)
    this.setState({ page: page });
    // setPage(page);
  };

  handleRowsPerPageChange = event => {
    this.setState({ rowPerPage: event.target.value });
  };

  componentDidMount() {

    console.log({ props: this.props })
    const companyId = this.props.match.params.companyId;
    this.setState({ company_id: this.props.match.params.companyId })

    if (companyId) {

      axios({
        url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/locations/',
        method: 'GET',
      }).then((res) => {
        this.setState({ locations: res.data.data.results }),
          console.log("locations details: " + this.state.locations)

      }).catch((err) => {
        console.log(err)

      })
    }
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
    console.log("company id: " + this.state.company_id)
    console.log("locations: " + this.state.locations)
    return (

      < div >
        <Card
          // {...rest}
          className={(classes.root)}
        >
          <CardContent className={classes.content}>
            <Button
              color="primary"
              variant="contained"
              className="float-right"
              component={forwardRef((props, ref) => <div
                ref={ref}
                style={{ flexGrow: 1 }}
              >
                <RouterLink {...props} />
              </div>)}
              to={'/addlocations/' + this.state.company_id}
            >
              Add Location
        </Button>
            <PerfectScrollbar>
              <div className={classes.inner}>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Company Name</TableCell>
                      <TableCell>LocationName</TableCell>
                      <TableCell>addressLineOne</TableCell>
                      <TableCell>addressLineTwo</TableCell>
                      <TableCell>landmark</TableCell>
                      <TableCell>city</TableCell>
                      <TableCell>state</TableCell>
                      <TableCell>postalCode</TableCell>
                      <TableCell>country</TableCell>
                      <TableCell>latitude</TableCell>
                      <TableCell>longitude</TableCell>
                      <TableCell>panOrTaxid</TableCell>
                      <TableCell>gstNo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.locations.slice(0, (this.state.rowsPerPage)).map(location => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={location.locationId}
                      >
                        <TableCell>{location.company_name}</TableCell>

                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/locations/" + this.state.company_id + "/" + location.locationId}
                            >
                              {location.LocationName}
                            </Button>
                          </div>
                        </TableCell>

                        <TableCell>{location.addressLineOne}</TableCell>
                        <TableCell>{location.addressLineTwo}</TableCell>
                        <TableCell>
                          {(location.landmark ? location.landmark : "NA")}
                        </TableCell>
                        <TableCell>
                          {(location.city ? location.city : "NA")}
                        </TableCell>
                        <TableCell>
                          {(location.state ? location.state : "NA")}
                        </TableCell>
                        <TableCell>{location.postalCode}</TableCell>
                        <TableCell>{location.country}</TableCell>
                        <TableCell>{location.latitude}</TableCell>
                        <TableCell>{location.longitude}</TableCell>
                        <TableCell>{location.panOrTaxid}</TableCell>
                        <TableCell>{location.gstNo}</TableCell>
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
              count={this.state.locations.length}
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

// LocationsList.propTypes = {
//   className: PropTypes.string,
//   // addresses: PropTypes.array.isRequired
// };

function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(LocationsList)));