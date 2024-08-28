import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ResetPassword } from "./pages/Verification";
// import './App.css'
const EmailPage = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.EmailPage,
  }))
);
const Registeration = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.Registeration,
  }))
);
const Login = lazy(() =>
  import("./pages/Verification").then((module) => ({ default: module.Login }))
);
const VerifyEmail = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.VerifyEmail,
  }))
);
const ForgetPassword = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.ForgetPassword,
  }))
);
const ResetPassword = lazy(() =>
  import("./pages/Verification").then((module) => ({
    default: module.ResetPassword,
  }))
);
const AdminHome = lazy(() =>
  import("./pages/Admin").then((module) => ({
    default: module.Home,
  }))
);
const UserHome = lazy(() =>
  import("./pages/Users").then((module) => ({
    default: module.Home,
  }))
);

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route>
              <Route path="/home" element={<UserHome />} />
            </Route>
            <Route>
              <Route path="/authflow/email" element={<EmailPage />} />
            </Route>
            <Route>
              <Route path="/authflow/register" element={<Registeration />} />
            </Route>
            <Route>
              <Route path="/authflow/login" element={<Login />} />
            </Route>
            <Route>
              <Route path="/authflow/verify-email" element={<VerifyEmail />} />
            </Route>
            <Route>
              <Route
                path="/authflow/forgetpassword"
                element={<ForgetPassword />}
              />
            </Route>
            <Route>
              <Route
                path="/authflow/resetpassword"
                element={<ResetPassword />}
              />
            </Route>
            <Route>
              <Route path="/admin" element={<AdminHome />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={100}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            // theme={isDarkMode ? "dark" : "light"}
          />
        </Suspense>
      </Router>
      ;
    </>
  );
}

export default App;
