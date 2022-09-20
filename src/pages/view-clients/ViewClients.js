import { getDocs } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/header/Header";
import { AUTH_USER, NOT_FOUND } from "../../constants/index";
import { clientRef } from "../../firebase";
import Accordion from "react-bootstrap/Accordion";
import { Table } from "react-bootstrap";
import "./ViewClient.scss";
import { errorNotification, warningNotification } from "../../components/notification/Notification";

const ViewClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem(AUTH_USER) === NOT_FOUND) {
      window.location.href = "/auth";
    }
    getDocs(clientRef)
      .then((snap) => {
        const allClients = [];
        snap.docs.forEach((doc) => {
          allClients.push({ ...doc.data(), id: doc.id });
        });
        setClients(allClients);
      })
      .catch((err) => {
        if (err?.code === "permission-denied") {
          warningNotification("You don't have permission to view clients")
          window.location.href = "/auth";
        } else {
          errorNotification("Sorry! Unable view clients")
          console.error(err);
        }
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="view-client-container my-4 mx-5">
        <p>
          All Clients <span>( {new Date().toDateString()} )</span>
        </p>
        <div className="accordion" id="client-accordion">
          {clients.length !== 0 &&
            clients?.map((client, index) => (
              <Accordion defaultActiveKey="0" key={index}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header className="view-client-accordion-header">{`${client?.firstName} ${client?.lastName}`}</Accordion.Header>
                  <Accordion.Body>
                    <Table striped bordered>
                      <tbody>
                        <tr>
                          <th className="view-client-table-title">
                            Email Address
                          </th>
                          <th className="view-client-table-content">
                            {client?.email}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            First Name
                          </th>
                          <th className="view-client-table-content">
                            {client?.firstName}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">Last Name</th>
                          <th className="view-client-table-content">
                            {client?.firstName}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            What country are you currently working in ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.currentCountry}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Current job title
                          </th>
                          <th className="view-client-table-content">
                            {client?.currentJob}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            How long have been in this role ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.experience}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Do you have qualifications ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.qualifications ? "Yes" : "No"}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            What kind of qualification ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.typeOfQualification}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            If other, please describe ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.otherQualification}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Have you ever been to New Zealand
                          </th>
                          <th className="view-client-table-content">
                            {client?.beforeInNZ}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            What job/s would you be interested in when you move
                            to New Zealand
                          </th>
                          <th className="view-client-table-content">
                            {client?.interestInNZ}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            If the role you are interested in isn't exactly
                            listed above, please describe
                          </th>
                          <th className="view-client-table-content">
                            {client?.interestedRoles}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Why do you want to come to New Zealand to work?
                          </th>
                          <th className="view-client-table-content">
                            {client?.reasonToWorkInNZ}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Will you be bringing family members with you ?
                          </th>
                          <th className="view-client-table-content">
                            {client?.isBringFamilyMembers ? "Yes" : "No"}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            If yes, who will initially be coming with you?
                          </th>
                          <th className="view-client-table-content">
                            {client?.isInitiallyOnlyYou}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            How long do you want to stay in New Zealand?
                          </th>
                          <th className="view-client-table-content">
                            {client?.durationInNZ}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Have you checked to see if your qualifications
                            transfer to New Zealand’s qualification framework
                            levels for your trade or profession?
                          </th>
                          <th className="view-client-table-content">
                            {client?.checkedOnQualifications ? "Yes" : "No"}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Please name the 3 top towns or cities where you
                            would prefer to work and explain why? You must enter
                            at least 3 options.
                          </th>
                          <th className="view-client-table-content">
                            {client?.topThreeCities}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Do you have any friends, family or colleagues who
                            might like to come to New Zealand to work?
                          </th>
                          <th className="view-client-table-content">
                            {client?.friendsInNZ ? "Yes" : "No"}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Do you have somewhere to live when you arrive in New
                            Zealand?
                          </th>
                          <th className="view-client-table-content">
                            {client?.specificLocationToLiveInNZ ? "Yes" : "No"}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Anything else you want to share with us about what
                            you are looking for?
                          </th>
                          <th className="view-client-table-content">
                            {client?.otherInfo}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            If you were successful obtaining a job offer – how
                            long before you could arrive in New Zealand and
                            start work?
                          </th>
                          <th className="view-client-table-content">
                            {client?.durationToArrive}
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Curriculum Vitae
                          </th>
                          <th className="view-client-table-content">
                            <a href={client?.curriculumVitae}>Download file</a>
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Cover Letter
                          </th>
                          <th className="view-client-table-content">
                            <a href={client?.coverLetter}>Download file</a>
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Qualifications
                          </th>
                          <th className="view-client-table-content">
                            <a href={client?.qualificationDoc}>Download file</a>
                          </th>
                        </tr>
                        <tr>
                          <th className="view-client-table-title">
                            Proof of Experience
                          </th>
                          <th className="view-client-table-content">
                            <a href={client?.proofOfExp}>Download file</a>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewClients;
