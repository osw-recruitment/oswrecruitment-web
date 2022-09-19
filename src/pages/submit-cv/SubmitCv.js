import React, { useReducer, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { clientRef, storage } from "../../firebase";
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
    currentCountry: {
      label: "What country are you currently working in ?",
      value: "",
      required: true,
    },
    currentJob: {
      label: "Current job title",
      value: "",
      required: true,
    },
    experience: {
      label: "How long have been in this role ?",
      value: "",
      required: true,
    },
    qualifications: {
      label: "Do you have qualifications ?",
      value: "",
      required: true,
    },
    typeOfQualification: {
      label: "What kind of qualification ?",
      value: "",
      required: true,
    },
    otherQualification: {
      label: "If other, please describe ?",
      value: "",
      required: true,
    },
    beforeInNZ: {
      label: "Have you ever been to New Zealand",
      value: "",
      required: true,
    },
    interestInNZ: {
      label: "What job/s would you be interested in when you move to New Zealand",
      value: "",
      required: true,
    },
    interestedRoles: {
      label: "If the role you are interested in isn't exactly listed above, please describe",
      value: "",
      required: true,
    },
    reasonToWorkInNZ: {
      label: "Why do you want to come to New Zealand to work?",
      value: "",
      required: true,
    },
    isBringFamilyMembers: {
      label: "Will you be bringing family members with you ?",
      value: "",
      required: true,
    },
    isInitiallyOnlyYou: {
      label: "If yes, who will initially be coming with you?",
      value: "",
      required: true,
    },
    durationInNZ: {
      label: "How long do you want to stay in New Zealand?",
      value: "",
      required: true,
    },
    checkedOnQualifications: {
      label: "Have you checked to see if your qualifications transfer to New Zealand’s qualification framework levels for your trade or profession?",
      value: "",
      required: true,
    },
    topThreeCities: {
      label: "Please name the 3 top towns or cities where you would prefer to work and explain why? You must enter at least 3 options.",
      value: "",
      required: true,
    },
    friendsInNZ: {
      label: "Do you have any friends, family or colleagues who might like to come to New Zealand to work?",
      value: "",
      required: true,
    },
    specificLocationToLiveInNZ: {
      label: "Do you have somewhere to live when you arrive in New Zealand?",
      value: "",
      required: true,
    },
    otherInfo: {
      label: "Anything else you want to share with us about what you are looking for?",
      value: "",
      required: true,
    },
    durationToArrive: {
      label: "If you were successful obtaining a job offer – how long before you could arrive in New Zealand and start work?",
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
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event, field) => {
    let curr = form[field];
    curr.value =
      field !== "curriculumVitae"
        ? event?.target?.value
        : event?.target?.files[0];
    setForm({ [field]: curr });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      handleImageUpload();
      setIsLoading(true);
    }
    setIsValid(true);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setForm(initialFormState);
    setIsValid(false);
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
              const currClient = {
                firstName: form?.firstName?.value,
                lastName: form?.lastName?.value,
                email: form?.email?.value,
                cvUrl: urlRes,
              };
              handleSaveData(currClient);
              handleSendEmail(currClient);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleSaveData = (details) => {
    addDoc(clientRef, details).catch((err) => console.error(err));
  };

  const handleSendEmail = (formDetails) => {
    emailjs
      .send(
        "service-osw-sender",
        "client-details",
        formDetails,
        "oSRDHY9ilSEasOTaZ"
      )
      .then((res) => (window.location.href = "/"))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header />
      <div className="submit-cv">
        <div className="submit-cv-container d-flex flex-column align-items-center py-5">
          <p className="submit-cv-container-title">Submit Details</p>
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
                {isLoading && (
                  <div class="spinner-border text-light" role="status"></div>
                )}
              </Button>
              <Button type="reset" className="btn btn-secondary">
                Reset
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SubmitCv;
