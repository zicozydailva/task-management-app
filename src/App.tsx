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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path={APP_ROUTES.Login} element={<Navigate to="auth/login" />} />
        <Route path={APP_ROUTES.Home} element={<Navigate to="/dashboard" />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path={APP_ROUTES.Dashboard} element={<Dashboard />} />
          <Route path={APP_ROUTES.Tasks} element={<Tasks />} />
          <Route path={APP_ROUTES.Users} element={<Users />} />
          <Route path={APP_ROUTES.Settings} element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
