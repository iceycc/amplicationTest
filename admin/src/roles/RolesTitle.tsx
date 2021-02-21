import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Roles } from "../api/roles/Roles";

type Props = { id: string };

export const RolesTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Roles,
    AxiosError,
    [string, string]
  >(["get-/api/roles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/roles"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/roles"}/${id}`} className="entity-id">
      {data?.name && data?.name.length ? data.name : data?.id}
    </Link>
  );
};
