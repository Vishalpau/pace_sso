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
  Link,
  LinkButton
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


class CompanyList extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    open: false,
    companies: [],

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
      url: process.env.API_URL + process.env.API_VERSION + '/companies/',
      method: 'GET',
    }).then((res) => {
      this.setState({ companies: res.data.data.results })
      console.log({ ' company data': this.state.companies })

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
              to={'/addcompany'}
            >
              Add Company
        </Button>

            <PerfectScrollbar>
              <div className={classes.inner} >
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell>Company Name</TableCell>
                      <TableCell>Company Code</TableCell>
                      <TableCell>Business Vertical</TableCell>
                      <TableCell>PAN Or Tax id</TableCell>
                      <TableCell>GSTNo.</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Company Logo</TableCell>
                      <TableCell>Address Line 1</TableCell>
                      <TableCell>Address Line 2</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Postal Code</TableCell>
                      <TableCell>Is Active</TableCell>
                      <TableCell>Operating Locations</TableCell>
                      <TableCell>API Key</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.companies.slice(0, (this.state.rowsPerPage)).map(company => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={company.companyId}
                      >
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/companies/" + company.companyId}
                            >
                              {company.companyName}
                            </Button>
                            {/* <Typography variant="body1">{address.name}</Typography> */}
                          </div>
                        </TableCell>
                        <TableCell>{company.companyCode}</TableCell>
                        <TableCell>{company.businessVertical}</TableCell>
                        <TableCell>
                          {(company.panOrTaxid ? company.panOrTaxid : "NA")}
                        </TableCell>
                        <TableCell>
                          {(company.gstNo ? company.gstNo : "NA")}
                        </TableCell>
                        <TableCell>
                          {(company.description ? company.description : "NA")}
                        </TableCell>
                        <TableCell>
                          <img src={company.logo} className={classes.logo} />
                        </TableCell>
                        <TableCell>
                          {(company.addressLine1 ? company.addressLine1 : "NA")}
                        </TableCell>
                        <TableCell>
                          {(company.addressLine2 ? company.addressLine2 : "NA")}
                        </TableCell>
                        <TableCell >
                          {company.state}
                        </TableCell>
                        <TableCell>
                          {company.city}
                        </TableCell>
                        <TableCell >
                          {company.country}
                        </TableCell>
                        <TableCell>
                          {(company.zipCode ? company.zipCode : "NA")}
                        </TableCell>
                        <TableCell>
                          {String(company.Active)}
                        </TableCell>
                        <TableCell>
                          <Link
                            component={this.CustomRouterLink}
                            to={"/locations/" + company.companyId}
                            color="primary"
                          // variant="contained"
                          >
                            <i className="material-icons">
                              location_on
                        </i>
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            component={this.CustomRouterLink}
                            to={"/apikeys/" + company.companyId}
                            color="primary"
                          // variant="contained"
                          >
                            <i className="material-icons">
                              vpn_key
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
              count={this.state.companies.length}
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

CompanyList.propTypes = {
  className: PropTypes.string,
  // addresses: PropTypes.array.isRequired
};

export default withStyles(styles)(CompanyList);
