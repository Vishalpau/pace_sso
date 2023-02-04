import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  UsersByDevice,
  LatestOrders,
} from "./components";
import { withStyles } from "@material-ui/styles";
// import ContentArea from '../../template/private/components/ContentArea/ContentArea';
// import Dashboards from '../../template/private/components/ContentArea/Dashboards';

import Portfolio from "../../template/private/components/ContentArea/Portfolio";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
});

class Dashboard extends React.Component {
  state = {
    user: [],
  };

  componentDidMount() {
    axios({
      url: process.env.API_URL + process.env.API_VERSION + "/user/self/",
      method: "GET",
    })
      .then((res) => {
        this.setState({
          user: res.data.data.results.data,
        });
        console.log({ user: res.data.data.results.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      // <ContentArea user={this.state.user} />
      // <Dashboards user={this.state.user} />
      <Portfolio />

      /* <div className={classes.root}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={12}
            sm={12}
            xl={3}
            xs={12}
          >
            <div><h1>You are logged in {this.state.user.name}</h1></div>
            <div>Name: {this.state.user.name}</div>
            <div>Email: {this.state.user.email}</div>
            {/* <Budget asset_count={this.state.asset_count} ready_assets_count={this.state.ready_assets_count} assigned_assets_count={this.state.assigned_assets_count} />
          </Grid>
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalUsers no_of_users={this.state.no_of_users} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress branches_count={this.state.branches_count} departments_count={this.state.departments_count} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit asset_purchase_cost={this.state.asset_purchase_cost} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders logs={this.state.logs} />
          </Grid>
          {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>


        </Grid>
      </div> */
    );
  }
}
export default withStyles(styles)(Dashboard);
// export default Dashboard;
