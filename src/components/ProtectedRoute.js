import React, { Fragment, useContext } from "react";
import { CpeContext } from "../context/cpeContext";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const { cpe } = useContext(CpeContext);
  console.log("protected",cpe)

  return (
    <Fragment>
      {cpe !== null ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
      ) : (
        <Redirect to="/home" />
      )}
    </Fragment>
  );
}