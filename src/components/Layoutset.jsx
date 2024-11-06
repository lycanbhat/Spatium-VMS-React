import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Outlet
} from "react-router-dom";
import { useSelector } from "react-redux";

// Component imports
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Login from "../pages/login";
import Notifications from "../pages/notifications";
import VehicleParking from "../pages/vehicleParking";
import LocationMeta from "../pages/LocationMeta";
import Fac from "../pages/Fac";
import Companies from "../pages/Companies";
import Visitors from "../pages/Visitors";
import Mycompany from "../pages/Mycompany";
import PreInviteGuest from "../pages/preInviteGuest";
import GenerateLink from "../pages/generateLink";
import GuestForm from "../pages/guestForm";

const AuthMiddleware = ({ children }) => {
  const { tokens } = useSelector((state) => state.auth);
  if (Object.keys(tokens).length === 0) {
    return <Navigate to="/login/" />;
  }
  return children;
};

const LoginCheckMiddleware = ({ children }) => {
  const { tokens } = useSelector((state) => state.auth);
  if (Object.keys(tokens).length) {
    if (tokens.is_superuser) {
      return <Navigate to="/visitors/" />;
    } else if (tokens.role_id === 4) {
      return <Navigate to="/mycompany/" />;
    }
  }
  return children;
};

const AppLayout = () => {
  return (
    <>
      <Navbar title={""} />
      <div className="flex h-[calc(100vh-3.5rem)]">
        <div className="w-[17rem] min-w-[17rem]">
          <Sidebar />
        </div>
        <div className="grow-[12] px-12 py-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const RedirectToVisitors = () => {
  const navigate = useNavigate();
  const { tokens } = useSelector((state) => state.auth);

  useEffect(() => {
    if (tokens.is_superuser) {
      navigate("/visitors/");
    } else if (tokens.role_id === 4) {
      navigate("/mycompany/");
    }
  }, [navigate, tokens]);

  return null;
};

export default function Layoutset() {
  const location = useLocation();
  const { tokens } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Standalone routes */}
      <Route path="/login" element={
        <LoginCheckMiddleware>
          <Login />
        </LoginCheckMiddleware>
      } />
      <Route path="/guest-form" element={<GuestForm />} />

      {/* Routes with the main app layout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={
          <AuthMiddleware>
            <RedirectToVisitors />
          </AuthMiddleware>
        } />

        {/* Common routes for all authenticated users */}
        <Route path="/visitors" element={
          <AuthMiddleware>
            <Visitors />
          </AuthMiddleware>
        } />

        {/* Superuser routes */}
        {tokens.is_superuser && (
          <>
            <Route path="/location-meta" element={
              <AuthMiddleware>
                <LocationMeta />
              </AuthMiddleware>
            } />
            <Route path="/facilities" element={
              <AuthMiddleware>
                <Fac />
              </AuthMiddleware>
            } />
            <Route path="/companies" element={
              <AuthMiddleware>
                <Companies />
              </AuthMiddleware>
            } />
            <Route path="/notifications" element={
              <AuthMiddleware>
                <Notifications />
              </AuthMiddleware>
            } />
            <Route path="/vehicle-parking" element={
              <AuthMiddleware>
                <VehicleParking />
              </AuthMiddleware>
            } />
          </>
        )}

        {/* Role-specific routes (role_id === 4) */}
        {tokens.role_id === 4 && (
          <>
            <Route path="/mycompany" element={
              <AuthMiddleware>
                <Mycompany />
              </AuthMiddleware>
            } />
            <Route path="/pre-visitor" element={
              <AuthMiddleware>
                <PreInviteGuest />
              </AuthMiddleware>
            } />
            <Route path="/generate-link" element={
              <AuthMiddleware>
                <GenerateLink />
              </AuthMiddleware>
            } />
          </>
        )}
      </Route>

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}