import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsForm from "./pages/details-form/DetailsForm";
import Home from "./pages/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.scss";
import SubmitCv from "./pages/submit-cv/SubmitCv";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/contact-form" element={<DetailsForm />} />
        <Route path="/submit-cv" element={<SubmitCv />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
