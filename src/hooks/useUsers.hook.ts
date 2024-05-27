import { useQuery } from "react-query";
import { getUsers } from "../api/services/users.service";

export const useUsers = () => {
  const users = useQuery("users", getUsers, {
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });

  return {
    users: users.data,
    isLoading: users.isLoading,
    isError: users.isError,
  };
};
