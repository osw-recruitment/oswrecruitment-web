import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsForm from "./pages/details-form/DetailsForm";
import Home from "./pages/home/Home";
import SubmitCv from "./pages/submit-cv/SubmitCv";
import GoogleAuth from "./pages/google-auth/GoogleAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.scss";
import { auth } from "./firebase";
import { useEffect } from "react";
import ViewClients from "./pages/view-clients/ViewClients";
import { AUTH_USER, NOT_FOUND } from "./constants/index";

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      sessionStorage.setItem(AUTH_USER, user?.uid ?? NOT_FOUND);
    });
    // Sample Cred : emails : viraj@oswrecruitment.com password: Viraj@12#$
  });

  // useEffect(() => {
  //   auth.signOut() && sessionStorage.removeItem(AUTH_USER);
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/auth" element={<GoogleAuth auth={auth} />} />
        <Route path="/contact-form" element={<DetailsForm />} />
        <Route path="/submit-cv" element={<SubmitCv />} />
        <Route path="/view-clients" element={<ViewClients />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
