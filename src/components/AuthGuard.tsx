import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsAuthenticated,
  selectIsAuthLoading,
} from "../redux/features/authSlice";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(isAuthenticated);
  const isLoading = useSelector(selectIsAuthLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default AuthGuard;
