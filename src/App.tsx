import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/users";
import { APP_ROUTES } from "./utils/constants";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/auth/Login";
import Tasks from "./pages/tasks";
import Settings from "./pages/settings";
import Home from "./pages/home";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={APP_ROUTES.Login} element={<Login />} />
        <Route path={APP_ROUTES.SignUp} element={<SignUp />} />
        <Route path={APP_ROUTES.Home} element={<Home />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={APP_ROUTES.Dashboard} element={<Dashboard />} />
          <Route path={APP_ROUTES.Tasks} element={<Tasks />} />
          <Route path={APP_ROUTES.Users} element={<Users />} />
          <Route path={APP_ROUTES.Settings} element={<Settings />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={APP_ROUTES.Home} />} />
      </Routes>
    </Router>
  );
}

export default App;
