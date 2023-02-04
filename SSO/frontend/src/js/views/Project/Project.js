import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import index from "./components/ProjectList";
import ProjectList from "./components/ProjectList";
//import { UsersToolbar, UsersTable } from './components';
// import mockData from './data';
import { Card, Grid } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
});

class Project extends React.Component {
  state = {
    projects: [],
  };
  componentDidMount = () => {
    this.getProjects();
  };

  getProjects = async () => {
    const companyId = localStorage.getItem("companyId");

    let data = await axios
      .get(
        process.env.API_URL +
          process.env.API_VERSION +
          "/companies/" +
          companyId +
          "/projects/"
      )
      .then(function (res) {
        console.log({ data: res.data.data.results });
        return res.data.data.results;
      })
      .catch(function (error) {
        console.log(error);
      });

    this.setState({ projects: data });
  };
  render() {
    const { classes } = this.props;
    // console.log({projectsmain: this.state.projects})
    return (
      <div className={classes.content}>
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }
}

Project.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Project);
