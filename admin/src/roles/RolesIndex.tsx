import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { RolesList } from "./RolesList";
import { CreateRoles } from "./CreateRoles";
import { Roles } from "./Roles";

export const RolesIndex = (): React.ReactElement => {
  useBreadcrumbs("/roles/", "Roles");

  return (
    <Switch>
      <PrivateRoute exact path={"/roles/"} component={RolesList} />
      <PrivateRoute path={"/roles/new"} component={CreateRoles} />
      <PrivateRoute path={"/roles/:id"} component={Roles} />
    </Switch>
  );
};
