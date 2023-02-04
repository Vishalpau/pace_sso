import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import GenericNotFound from "../components/common/GenericNotFound";
import Login from "../user/auth/Login";
import LoginNew from "../user/auth/LoginNew";
import { UserActions } from "../user/UserActions";
import PrivateLayout from "./private";
import PublicLayout from "./public";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import sessionRoutes from "./routes/sessionRoutes";

class Template extends Component {
  constructor(props) {
    super(props);
    this.userActions = new UserActions(this.props.dispatch);
    this.userActions.verify();
  }

  render() {
    const user = this.props.user;
    if (!user.verified) {
      return <div>Loading...</div>;
    }
    return (
      <BrowserRouter>
        <Switch>
          {_.map(publicRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={(route) => (
                  <PublicLayout
                    component={component}
                    route={route}
                    user={user}
                  />
                )}
              />
            );
          })}

          {_.map(privateRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={(route) =>
                  user.logged ? (
                    <PrivateLayout
                      component={component}
                      route={route}
                      user={user}
                      userActions={this.userActions}
                    />
                  ) : (
                    <PublicLayout
                      component={LoginNew}
                      route={route}
                      user={user}
                    />
                  )
                }
              />
            );
          })}

          {_.map(sessionRoutes, (route, key) => {
            const { component, path } = route;
            return (
              <Route
                exact
                path={path}
                key={key}
                render={(route) =>
                  user.logged ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <PublicLayout
                      component={component}
                      route={route}
                      user={user}
                    />
                  )
                }
              />
            );
          })}

          <Route component={GenericNotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state, props) {
  return { user: state };
}
function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(Template);
