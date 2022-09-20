import React, { useReducer, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc } from "firebase/firestore";
import { clientRef, storage } from "../../firebase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../../components/header/Header";
import "./SubmitCv.scss";
import { allJobs, allQualifications } from "../../constants/form-data";

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
      value: false,
      required: true,
    },
    typeOfQualification: {
      label: "What kind of qualification ?",
      value: [],
      required: true,
    },
    otherQualification: {
      label: "If other, please describe ?",
      value: "",
      required: true,
    },
    beforeInNZ: {
      label: "Have you ever been to New Zealand",
      value: false,
      required: true,
    },
    interestInNZ: {
      label:
        "What job/s would you be interested in when you move to New Zealand",
      value: "",
      required: true,
    },
    interestedRoles: {
      label:
        "If the role you are interested in isn't exactly listed above, please describe",
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
      value: false,
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
      label:
        "Have you checked to see if your qualifications transfer to New Zealand’s qualification framework levels for your trade or profession?",
      value: false,
      required: true,
    },
    topThreeCities: {
      label:
        "Please name the 3 top towns or cities where you would prefer to work and explain why? You must enter at least 3 options.",
      value: "",
      required: true,
    },
    friendsInNZ: {
      label:
        "Do you have any friends, family or colleagues who might like to come to New Zealand to work?",
      value: false,
      required: true,
    },
    specificLocationToLiveInNZ: {
      label: "Do you have somewhere to live when you arrive in New Zealand?",
      value: false,
      required: true,
    },
    otherInfo: {
      label:
        "Anything else you want to share with us about what you are looking for?",
      value: "",
      required: true,
    },
    durationToArrive: {
      label:
        "If you were successful obtaining a job offer – how long before you could arrive in New Zealand and start work?",
      value: "",
      required: true,
    },
    curriculumVitae: {
      label: "Curriculum Vitae",
      value: "",
      required: true,
    },
    coverLetter: {
      label: "Cover Letter",
      value: "",
      required: true,
    },
    qualificationDoc: {
      label: "Qualifications",
      value: "",
      required: true,
    },
    proofOfExp: {
      label: "Proof of Experience",
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
    curr.value = event?.target?.value;
    setForm({ [field]: curr });
  };

  const handleOnChangeFile = (event, field) => {
    let curr = form[field];
    curr.value = event?.target?.files[0];
    setForm({ [field]: curr });
  };

  const handleOnChangeCheck = (event, field) => {
    let curr = form[field];
    curr.value = event?.target?.checked;
    setForm({ [field]: curr });
  };

  const handelOnChangeDropdown = (event, field) => {
    let curr = form[field];
    curr.value =
      allJobs.find((job) => job.code === event?.target?.value).name ?? "";
    setForm({ [field]: curr });
  };

  const handleOnChangeCheckBox = (event, field, code) => {
    let curr = form[field];
    const newValue =
      allQualifications.find((qul) => qul.code === code).name ?? "";
    if (curr?.value?.includes(newValue)) {
      const newArr = curr?.value?.filter((c) => c !== newValue);
      curr.value = newArr;
    } else {
      curr?.value?.push(newValue);
    }
    setForm({ [field]: curr });
  };

  const buildVO = () => {
    const details = {};
    Object.keys(form).forEach((k) => {
      details[k] = form[k]?.value ?? "";
    });
    return details;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formObj = event.currentTarget;
    if (formObj.checkValidity() === false) {
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

  const handleFirebaseUpload = (ref, field) => {
    return uploadBytes(ref, form[field].value);
  };

  const handleFirebaseUrl = (ref) => {
    return getDownloadURL(ref);
  };

  const handleImageUpload = () => {
    if (form?.curriculumVitae?.value !== null) {
      const cvRef = ref(
        storage,
        `curriculum-vitae/${
          form?.curriculumVitae?.value?.name + "_" + new Date().toISOString()
        }`
      );
      const clRef = ref(
        storage,
        `cover-letter/${
          form?.coverLetter?.value?.name + "_" + new Date().toISOString()
        }`
      );
      const qulRef = ref(
        storage,
        `qualification/${
          form?.qualifications?.value?.name + "_" + new Date().toISOString()
        }`
      );
      const poeRef = ref(
        storage,
        `proof-of-exp/${
          form?.proofOfExp?.value?.name + "_" + new Date().toISOString()
        }`
      );
      const currClient = buildVO();
      handleFirebaseUpload(cvRef, "curriculumVitae").then((res) => {
        handleFirebaseUrl(cvRef).then((cvSrc) => {
          currClient["curriculumVitae"] = cvSrc ?? null;
          handleFirebaseUpload(clRef, "coverLetter").then((res) => {
            handleFirebaseUrl(clRef).then((clSrc) => {
              currClient["coverLetter"] = clSrc ?? null;
              handleFirebaseUpload(qulRef, "qualificationDoc").then((res) => {
                handleFirebaseUrl(qulRef).then((quSrc) => {
                  currClient["qualificationDoc"] = quSrc ?? null;
                  handleFirebaseUpload(poeRef, "proofOfExp").then((res) => {
                    handleFirebaseUrl(poeRef).then((poeSrc) => {
                      currClient["proofOfExp"] = poeSrc ?? null;
                      handleSaveData(currClient);
                    }).catch(err => console.error(err))
                  }).catch(err => console.error(err))
                }).catch(err => console.error(err))
              }).catch(err => console.error(err))
            }).catch(err => console.error(err))
          }).catch(err => console.error(err))
        }).catch(err => console.error(err))
      }).catch(err => console.error(err))
    }
  };

  const handleSaveData = (details) => {
    addDoc(clientRef, details)
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
                htmlFor={`input-${form?.currentCountry?.label}`}
                className="form-label"
                required={true}
              >
                {form?.currentCountry?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.currentCountry?.required}
                id={`input-${form?.currentCountry?.label}`}
                value={form?.currentCountry?.value}
                placeholder={form?.currentCountry?.label}
                onChange={(e) => handleOnChange(e, "currentCountry")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.currentCountry?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.currentJob?.label}`}
                className="form-label"
                required={true}
              >
                {form?.currentJob?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.currentJob?.required}
                id={`input-${form?.currentJob?.label}`}
                value={form?.currentJob?.value}
                placeholder={form?.currentJob?.label}
                onChange={(e) => handleOnChange(e, "currentJob")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.experience?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.experience?.label}`}
                className="form-label"
                required={true}
              >
                {form?.experience?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.experience?.required}
                id={`input-${form?.experience?.label}`}
                value={form?.experience?.value}
                placeholder={form?.experience?.label}
                onChange={(e) => handleOnChange(e, "experience")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.experience?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.qualifications?.label}`}
                className="form-label"
                required={true}
              >
                {form?.qualifications?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.qualifications?.label}`}
                value={form?.qualifications?.value}
                onChange={(e) => handleOnChangeCheck(e, "qualifications")}
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.currentJob?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.typeOfQualification?.label}`}
                className="form-label"
                required={true}
              >
                {form?.typeOfQualification?.label}
              </Form.Label>
              {allQualifications.map((q, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={`input-${form?.typeOfQualification?.label}`}
                  value={q.code}
                  onChange={(e) =>
                    handleOnChangeCheckBox(e, "typeOfQualification", q?.code)
                  }
                  label={q.name}
                />
              ))}
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.typeOfQualification?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.otherQualification?.label}`}
                className="form-label"
                required={true}
              >
                {form?.otherQualification?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.otherQualification?.required}
                id={`input-${form?.otherQualification?.label}`}
                value={form?.otherQualification?.value}
                placeholder={form?.otherQualification?.label}
                onChange={(e) => handleOnChange(e, "otherQualification")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.otherQualification?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.beforeInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.beforeInNZ?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.beforeInNZ?.label}`}
                value={form?.beforeInNZ?.value}
                onChange={(e) => handleOnChangeCheck(e, "beforeInNZ")}
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.beforeInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.interestInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.interestInNZ?.label}
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handelOnChangeDropdown(e, "interestInNZ")}
              >
                {allJobs.map((job, index) => (
                  <option value={job.code} key={index}>
                    {job.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.interestInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.interestedRoles?.label}`}
                className="form-label"
                required={true}
              >
                {form?.interestedRoles?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.interestedRoles?.required}
                id={`input-${form?.interestedRoles?.label}`}
                value={form?.interestedRoles?.value}
                placeholder={form?.interestedRoles?.label}
                onChange={(e) => handleOnChange(e, "interestedRoles")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.interestedRoles?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.reasonToWorkInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.reasonToWorkInNZ?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.reasonToWorkInNZ?.required}
                id={`input-${form?.reasonToWorkInNZ?.label}`}
                value={form?.reasonToWorkInNZ?.value}
                placeholder={form?.reasonToWorkInNZ?.label}
                onChange={(e) => handleOnChange(e, "reasonToWorkInNZ")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.reasonToWorkInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.isBringFamilyMembers?.label}`}
                className="form-label"
                required={true}
              >
                {form?.isBringFamilyMembers?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.isBringFamilyMembers?.label}`}
                value={form?.isBringFamilyMembers?.value}
                onChange={(e) => handleOnChangeCheck(e, "isBringFamilyMembers")}
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.isBringFamilyMembers?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>

            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.isInitiallyOnlyYou?.label}`}
                className="form-label"
                required={true}
              >
                {form?.isInitiallyOnlyYou?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.isInitiallyOnlyYou?.required}
                id={`input-${form?.isInitiallyOnlyYou?.label}`}
                value={form?.isInitiallyOnlyYou?.value}
                placeholder={form?.isInitiallyOnlyYou?.label}
                onChange={(e) => handleOnChange(e, "isInitiallyOnlyYou")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.isInitiallyOnlyYou?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.durationInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.durationInNZ?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.durationInNZ?.required}
                id={`input-${form?.durationInNZ?.label}`}
                value={form?.durationInNZ?.value}
                placeholder={form?.durationInNZ?.label}
                onChange={(e) => handleOnChange(e, "durationInNZ")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.durationInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.checkedOnQualifications?.label}`}
                className="form-label"
                required={true}
              >
                {form?.checkedOnQualifications?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.checkedOnQualifications?.label}`}
                value={form?.checkedOnQualifications?.value}
                onChange={(e) =>
                  handleOnChangeCheck(e, "checkedOnQualifications")
                }
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.checkedOnQualifications?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>

            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.topThreeCities?.label}`}
                className="form-label"
                required={true}
              >
                {form?.topThreeCities?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.topThreeCities?.required}
                id={`input-${form?.topThreeCities?.label}`}
                value={form?.topThreeCities?.value}
                placeholder={form?.topThreeCities?.label}
                onChange={(e) => handleOnChange(e, "topThreeCities")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter top three towns or cities where you prefer to work`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.friendsInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.friendsInNZ?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.friendsInNZ?.label}`}
                value={form?.friendsInNZ?.value}
                onChange={(e) => handleOnChangeCheck(e, "friendsInNZ")}
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.friendsInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.specificLocationToLiveInNZ?.label}`}
                className="form-label"
                required={true}
              >
                {form?.specificLocationToLiveInNZ?.label}
              </Form.Label>
              <Form.Check
                type="switch"
                id={`input-${form?.specificLocationToLiveInNZ?.label}`}
                value={form?.specificLocationToLiveInNZ?.value}
                onChange={(e) =>
                  handleOnChangeCheck(e, "specificLocationToLiveInNZ")
                }
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.specificLocationToLiveInNZ?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.otherInfo?.label}`}
                className="form-label"
                required={true}
              >
                {form?.otherInfo?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.otherInfo?.required}
                id={`input-${form?.otherInfo?.label}`}
                value={form?.otherInfo?.value}
                placeholder={form?.otherInfo?.label}
                onChange={(e) => handleOnChange(e, "otherInfo")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.otherInfo?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.durationToArrive?.label}`}
                className="form-label"
                required={true}
              >
                {form?.durationToArrive?.label}
              </Form.Label>
              <Form.Control
                type="text"
                required={form?.durationToArrive?.required}
                id={`input-${form?.durationToArrive?.label}`}
                value={form?.durationToArrive?.value}
                placeholder={form?.durationToArrive?.label}
                onChange={(e) => handleOnChange(e, "durationToArrive")}
                className="form-control"
              />
              <Form.Control.Feedback type="invalid">{`Please enter ${form?.durationToArrive?.label?.toLowerCase()}`}</Form.Control.Feedback>
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
                onChange={(e) => handleOnChangeFile(e, "curriculumVitae")}
              />
              <Form.Control.Feedback type="invalid">{`Please submit ${form?.curriculumVitae?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.coverLetter?.label}`}
                className="form-label"
              >
                {form?.coverLetter?.label}
              </Form.Label>
              <Form.Control
                type="file"
                required={form?.coverLetter?.required}
                id={`input-${form?.coverLetter?.label}`}
                placeholder={form?.coverLetter?.label}
                className="form-control"
                onChange={(e) => handleOnChangeFile(e, "coverLetter")}
              />
              <Form.Control.Feedback type="invalid">{`Please submit ${form?.coverLetter?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.qualificationDoc?.label}`}
                className="form-label"
              >
                {form?.qualificationDoc?.label}
              </Form.Label>
              <Form.Control
                type="file"
                required={form?.qualificationDoc?.required}
                id={`input-${form?.qualificationDoc?.label}`}
                placeholder={form?.qualificationDoc?.label}
                className="form-control"
                onChange={(e) => handleOnChangeFile(e, "qualificationDoc")}
              />
              <Form.Control.Feedback type="invalid">{`Please submit ${form?.qualificationDoc?.label?.toLowerCase()}`}</Form.Control.Feedback>
            </div>
            <div className="submit-cv-container-form-section">
              <Form.Label
                htmlFor={`input-${form?.proofOfExp?.label}`}
                className="form-label"
              >
                {form?.proofOfExp?.label}
              </Form.Label>
              <Form.Control
                type="file"
                required={form?.proofOfExp?.required}
                id={`input-${form?.proofOfExp?.label}`}
                placeholder={form?.proofOfExp?.label}
                className="form-control"
                onChange={(e) => handleOnChangeFile(e, "proofOfExp")}
              />
              <Form.Control.Feedback type="invalid">{`Please submit ${form?.proofOfExp?.label?.toLowerCase()}`}</Form.Control.Feedback>
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
