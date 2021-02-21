import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Roles } from "../api/roles/Roles";
import { RolesCreateInput } from "../api/roles/RolesCreateInput";

const INITIAL_VALUES = {} as RolesCreateInput;

export const CreateRoles = (): React.ReactElement => {
  useBreadcrumbs("/roles/new", "Create Roles");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Roles,
    AxiosError,
    RolesCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/roles", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/roles"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: RolesCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Roles"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
