import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";

export default function AuthenticatedRoute({
  component: C,
  appProps,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.isAuthenticated ? (
          <>
            <SideMenu />
            <Header />
            <C {...props} {...appProps} />
          </>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
}
