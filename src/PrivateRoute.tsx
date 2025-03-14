import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = true;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
