import { useMutation } from "react-query";
import { login, signUp } from "../api/services/auth.service";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux.hook";
import { setUser } from "../redux/features/authSlice";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const decodeToken = (token: string) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token", error);
      return null;
    }
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signin = useMutation(
    (data: { email: string; password: string }) => login(data),
    {
      onSuccess: (data) => {
        console.log(data);
        message.success("User logged in successfully");
        const decoded: { id: string; username: string; email: string } =
          decodeToken(data.token) as {
            id: string;
            username: string;
            email: string;
          };
        if (!decoded) throw new Error("Failed to decode token");
        console.log(decoded);
        dispatch(
          setUser({
            token: data.token,
            userId: decoded.id,
            username: decoded.username,
          })
        );
        navigate("/conversation/create");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error.response.data);
        message.error(`Error logging in user ${error.response.data.message}`);
      },
    }
  );

  const register = useMutation(
    (data: {
      email: string;
      password: string;
      username: string;
      dateOfBirth: string;
    }) => {
      console.log("dd", data);
      return signUp(data);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        message.success("User registered successfully");
        navigate("/login");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.log(error);
        message.error(`Error registering user ${error.data.message}`);
      },
    }
  );

  return {
    login: signin.mutate,
    isLoginLoading: signin.isLoading,
    register: register.mutate,
    isRegisterLoading: register.isLoading,
  };
};
