import React, { useReducer, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import emailjs from "@emailjs/browser";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../components/header/Header";
import "./SubmitCv.scss";

const SubmitCv = () => {
  const initialFormState = {
    email: {
      label: "Email Address",
      value: "",
      required: true,
    },
    firstName: {
      label: "First Name",
      value: "",
      required: true,
    },
    lastName: {
      label: "Last Name",
      value: "",
      required: true,
    },
    curriculumVitae: {
      label: "Curriculum Vitae",
      value: "",
      required: true,
    },
  };
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialFormState
  );

  const handleOnChange = (event, field) => {
    let curr = form[field];
    curr.value =
      field !== "curriculumVitae"
        ? event?.target?.value
        : event?.target?.files[0];
    setForm({ [field]: curr });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleImageUpload();
    setIsValid(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm(initialFormState);
  };

  const handleImageUpload = () => {
    if (form?.curriculumVitae?.value !== null) {
      const pdfRef = ref(
        storage,
        `curriculum-vitae/${
          form?.curriculumVitae?.value?.name + "_" + new Date().toISOString()
        }`
      );
      uploadBytes(pdfRef, form?.curriculumVitae?.value)
        .then((res) => {
          getDownloadURL(pdfRef)
            .then((urlRes) => {
              handleSendEmail({
                firstName: form?.firstName?.value,
                lastName: form?.lastName?.value,
                email: form?.email?.value,
                cvUrl: urlRes,
              });
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSendEmail = (formDetails) => {
    emailjs
      .send(
        "service-osw-sender",
        "client-details",
        formDetails,
        "oSRDHY9ilSEasOTaZ"
      )
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      <div className="submit-cv">
        <div className="submit-cv-container d-flex flex-column align-items-center py-5">
          <p className="submit-cv-container-title">Title Here!</p>
          <Form
            className="submit-cv-container-form needs-validation"
            noValidate
            validated={isValid}
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.email?.label}`}
                className="form-label"
              >
                {form?.email?.label}
              </Form.Label>
              <Form.Control
                required={form?.email?.required}
                type="email"
                id={`input-${form?.email?.label}`}
                value={form?.email?.value}
                placeholder={form?.email?.label}
                onChange={(e) => handleOnChange(e, "email")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.email?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.firstName?.label}`}
                className="form-label"
              >
                {form?.firstName?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.firstName?.required}
                id={`input-${form?.firstName?.label}`}
                value={form?.firstName?.value}
                placeholder={form?.firstName?.label}
                onChange={(e) => handleOnChange(e, "firstName")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.firstName?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.lastName?.label}`}
                className="form-label"
                required={true}
              >
                {form?.lastName?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.lastName?.required}
                id={`input-${form?.lastName?.label}`}
                value={form?.lastName?.value}
                placeholder={form?.lastName?.label}
                onChange={(e) => handleOnChange(e, "lastName")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.lastName?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.curriculumVitae?.label}`}
                className="form-label"
              >
                {form?.curriculumVitae?.label}
              </Form.Label>
              <Form.Control
                type="file"
                required={form?.curriculumVitae?.required}
                id={`input-${form?.curriculumVitae?.label}`}
                placeholder={form?.curriculumVitae?.label}
                className="form-control"
                onChange={(e) => handleOnChange(e, "curriculumVitae")}
              />
              <Form.Control.Feedback type="invalid">{`Please submit ${form?.curriculumVitae?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section d-flex flex-row justify-content-between mt-4">
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
              <Button type="reset" className="btn btn-secondary">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default SubmitCv;
