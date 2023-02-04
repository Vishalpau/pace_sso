import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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


class RolesList extends React.Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    open: false,
    roles: [],
    app_id: ""

  }
  handlePageChange = (event, page) => {
    alert(page)
    this.setState({ page: page });
  };

  handleRowsPerPageChange = event => {
    this.setState({ rowPerPage: event.target.value });
  };



  componentDidMount() {

    console.log({ props: this.props })
    const appId = this.props.match.params.appId
    this.setState({ app_id: this.props.match.params.appId })

    axios({
      url: process.env.API_URL + process.env.API_VERSION + '/applications/' + appId + '/roles/',
      method: 'GET',
    }).then((res) => {
      this.setState({ roles: res.data.data.results })
      console.log({ ' roles data': this.state.roles })

    }).catch((err) => {
      console.log(err)

    })
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
              to={'/addrole/' + this.state.app_id}
            >
              Add Roles
        </Button>
            <PerfectScrollbar>
              <div className={classes.inner}>

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Application</TableCell>
                      <TableCell>Role Name</TableCell>
                      <TableCell>Role Description</TableCell>
                      <TableCell>Scope</TableCell>
                      <TableCell>IsDefault</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.roles.slice(0, (this.state.rowsPerPage)).map(role => (
                      <TableRow
                        className={classes.tableRow}
                        hover
                        key={role.roleId}
                      >
                        <TableCell>{role.app_name}</TableCell>

                        <TableCell>
                          <div className={classes.nameContainer}>
                            <Button
                              component={this.CustomRouterLink}
                              to={"/roles/" + this.state.app_id + '/' + role.roleId}
                            >
                              {role.roleName}
                            </Button>
                            {/* <Typography variant="body1">{address.name}</Typography> */}
                          </div>
                        </TableCell>
                        <TableCell>{role.roleDesc}</TableCell>
                        <TableCell>{role.scope}</TableCell>
                        <TableCell>
                          {(String(role.isaDefault) ? String(role.isaDefault) : "NA")}
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
              count={this.state.roles.length}
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

// RolesList.propTypes = {
//   className: PropTypes.string,
// };

function mapDispatchToProps(dispatch) { return { dispatch }; }

export default withRouter(connect(
  //mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(RolesList)));