import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
// import Analytics from "../pages/analytics";
// import Members from "../pages/members";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Guests from "../pages/guests";
// import Employees from "../pages/employees";
import Notifications from "../pages/notifications";
import Login from "../pages/login";
import { useSelector } from "react-redux";
import VehicleParking from "../pages/vehicleParking";
import LocationMeta from "../pages/LocationMeta";
import Facilitie from "../pages/Facilitie";
import Companies from "../pages/Companies";
import Facilities from "../pages/Facil";
import Fac from "../pages/Fac";
import Visitors from "../pages/Visitors";
import Mycompany from "../pages/Mycompany";

const AuthMiddleware = ({ children }) => {
  // Your middleware logic goes here

  // For example, you can check some conditions and redirect if needed
  const { tokens } = useSelector((state) => state.auth);
  console.log({ tokens });
  if (Object.keys(tokens).length == 0) {
    return <Navigate to="/login/" />;
  }

  // If everything is okay, render the children
  return children;
};

const LoginCheckMiddleware = ({ children }) => {
  const { tokens } = useSelector((state) => state.auth);
  if (Object.keys(tokens).length) {
    if (tokens.is_superuser) {
      return <Navigate to="/visitors/" />;
    } else {
      if (tokens.role_id == 4) {
        return <Navigate to="/mycompany/" />;
      }
    }
  }

  // If everything is okay, render the children
  return children;
};

export default function Layoutset() {
  let location = useLocation();
  const { tokens } = useSelector((state) => state.auth);
  const RedirectToVisitors = () => {
    const navigate = useNavigate();

    // Redirect to "/analytics"
    useEffect(() => {
      if (tokens.is_superuser) {
        navigate("/visitors/");
      } else {
        if (tokens.role_id == 4) {
          navigate("/mycompany/");
        }
      }

      // navigate("/visitors/");
    }, []);

    // You can also return null or some loading indicator here
    return null;
  };
  return (
    <>
      {location.pathname != "/login/" ? (
        <>
          <Navbar title={""} />

          <div className="flex h-[calc(100vh-3.5rem)]">
            <div className="w-[17rem] min-w-[17rem]">
              <Sidebar />
            </div>
            <div className="grow-[12] px-12 py-10 overflow-y-auto">
              {/* <RouterProvider router={router} /> */}
              {tokens.is_superuser ? (
                <Routes>
                  <Route
                    path="/"
                    element={
                      <AuthMiddleware>
                        <RedirectToVisitors />
                      </AuthMiddleware>
                    }
                  ></Route>
                  <Route
                    path="/location-meta"
                    element={
                      <AuthMiddleware>
                        <LocationMeta />
                      </AuthMiddleware>
                    }
                  ></Route>
                  <Route
                    path="/visitors"
                    element={
                      <AuthMiddleware>
                        <Visitors />
                      </AuthMiddleware>
                    }
                  ></Route>
                  {/* <Route path="/facilities" element={<AuthMiddleware><Facilitie /></AuthMiddleware>}></Route> */}
                  <Route
                    path="/facilities"
                    element={
                      <AuthMiddleware>
                        <Fac />
                      </AuthMiddleware>
                    }
                  ></Route>
                  {/* <Route path="/companies" element={<AuthMiddleware><Companies /></AuthMiddleware>}></Route> */}
                  <Route
                    path="/companies"
                    element={
                      <AuthMiddleware>
                        <Companies />
                      </AuthMiddleware>
                    }
                  ></Route>
                  {/* <Route path="/members" element={<AuthMiddleware><Members /></AuthMiddleware>}></Route>
                  <Route path="/guests" element={<AuthMiddleware><Guests /></AuthMiddleware>}></Route>
                  <Route path="/employees" element={<AuthMiddleware><Employees /></AuthMiddleware>}></Route> */}
                  <Route
                    path="/notifications"
                    element={
                      <AuthMiddleware>
                        <Notifications />
                      </AuthMiddleware>
                    }
                  ></Route>
                  <Route
                    path="/vehicle-parking"
                    element={
                      <AuthMiddleware>
                        <VehicleParking />
                      </AuthMiddleware>
                    }
                  ></Route>
                </Routes>
              ) : tokens.role_id == 4 ? (
                <Routes>
                  <Route
                    path="/"
                    element={
                      <AuthMiddleware>
                        <RedirectToVisitors />
                      </AuthMiddleware>
                    }
                  ></Route>
                  <Route
                    path="/mycompany"
                    element={
                      <AuthMiddleware>
                        <Mycompany />
                      </AuthMiddleware>
                    }
                  ></Route>
                </Routes>
              ) : <Routes>
              <Route
                path="/"
                element={
                  <AuthMiddleware>
                    <RedirectToVisitors />
                  </AuthMiddleware>
                }
              ></Route>
              </Routes>}
            </div>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginCheckMiddleware>
                  <Login />
                </LoginCheckMiddleware>
              }
            ></Route>
          </Routes>
        </>
      )}
    </>
  );
}
