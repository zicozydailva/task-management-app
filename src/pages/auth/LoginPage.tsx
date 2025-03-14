import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div>
      <div>
        <h2>Welcome to Admin Panel</h2>
        <button>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
