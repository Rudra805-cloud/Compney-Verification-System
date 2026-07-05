import { Routes, Route } from "react-router-dom";

import CompanyValidatorLanding from "../pages/Landing.page";
import LoginPage from "../pages/Login.page";
import DashboardPage from "../pages/Dashboard.page";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CompanyValidatorLanding />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
