import { useQuery } from "@tanstack/react-query";
import useDashboardApi from "./dashboard.api";
import { queryKeys } from "../constants";
import { useState } from "react";

export const useFetchTasks = () => {
  const { getTasks } = useDashboardApi();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query = useQuery({
    queryKey: [queryKeys.tasks, page, pageSize],
    queryFn: () => getTasks(),
  });

  return {
    ...query,
    setPage,
    setPageSize,
  };
};

export const useFetchUsers = () => {
  const { getUsers } = useDashboardApi();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const query = useQuery({
    queryKey: [queryKeys.users, page, pageSize],
    queryFn: () => getUsers(),
  });

  return {
    ...query,
    setPage,
    setPageSize,
  };
};
