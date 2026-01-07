import { Route, Routes } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import EmailVerificationScreen from "../components/EmailVerificationScreen";
import EmailSuccessPage from "../pages/EmailSuccessPage";
import Dashboard from "../pages/Dashboard";
import NotFoundPage from "../pages/NotFoundPage";

import PublicRoute from "../context/PublicRoute";
import ProtectedRoute from "../context/ProtectedRoute";

const AppRouters = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/reset-password/:token"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      <Route
        path="/email-verification"
        element={
          <PublicRoute>
            <EmailVerificationScreen />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-email/:token"
        element={
          <PublicRoute>
            <EmailSuccessPage />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default AppRouters;
