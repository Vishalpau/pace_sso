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


class ApiKeysList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rowsPerPage: 10,
      page: 0,
      open: false,
      apikeys: [],
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
        url: process.env.API_URL + process.env.API_VERSION + '/companies/' + companyId + '/xkeys/',
        method: 'GET',
      }).then((res) => {
        this.setState({ apikeys: res.data.data.results }),
          console.log("apikeys details: " + this.state.apikeys)

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
              to={'/generateapikeys/' + this.state.company_id}
            >
              Generate API Key
        </Button>
            <PerfectScrollbar>
              <div className={classes.inner}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>API Key</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Application</TableCell>
                      <TableCell>Device</TableCell>
                      <TableCell>Client Type</TableCell>
                      <TableCell>Client App Versions</TableCell>
                      <TableCell>Revoked</TableCell>
                      <TableCell>createdAt</TableCell>
                      <TableCell>expiredAt</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.apikeys.slice(0, (this.state.rowsPerPage)).map(apikey => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={apikey.keyId}
                      >
                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/apikeys/" + this.state.company_id + "/" + apikey.keyId}
                            >
                              {apikey.apiKey}
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{apikey.company_name}</TableCell>
                        <TableCell>{apikey.app_name}</TableCell>
                        <TableCell>{apikey.oauthclient}</TableCell>
                        <TableCell>{apikey.clientType}</TableCell>
                        <TableCell>{apikey.clientAppVersions}</TableCell>
                        <TableCell>{String(apikey.revoked)}</TableCell>
                        <TableCell>{apikey.createdAt}</TableCell>
                        <TableCell>{apikey.expiredAt}</TableCell>

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
              count={this.state.apikeys.length}
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
)(withStyles(styles, { withTheme: true })(ApiKeysList)));