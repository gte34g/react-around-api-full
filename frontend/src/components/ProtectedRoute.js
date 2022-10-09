import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children, ...props }) {
  return (
    <Route {...props}>
      {isLoggedIn ? children : <Redirect to={"/signin"} />}
    </Route>
  );
}
