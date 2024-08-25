import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Suspense } from "react";
import Loader from "./components/Loader";
import { ToastContainer } from "react-toastify";
// import './App.css'
const EmailPage = lazy(() =>
  import("./pages").then((module) => ({ default: module.EmailPage }))
);
const Registeration = lazy(() =>
  import("./pages").then((module) => ({ default: module.Registeration }))
);
const Login = lazy(() =>
  import("./pages").then((module) => ({ default: module.Login }))
);
const VerifyEmail = lazy(() =>
  import("./pages").then((module) => ({ default: module.VerifyEmail }))
);

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
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
