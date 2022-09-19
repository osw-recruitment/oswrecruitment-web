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
          window.location.href = "/auth";
        } else {
          console.error(err);
        }
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="view-client-container my-4 mx-5">
        <p>All Clients <span>( {new Date().toDateString()} )</span></p>
        <div className="accordion" id="client-accordion">
          {clients.length !== 0 &&
            clients?.map((client, index) => (
              <Accordion defaultActiveKey="0" key={index}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{`${client?.firstName} ${client?.lastName}`}</Accordion.Header>
                  <Accordion.Body>
                    <Table striped>
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
                            Curriculum Vitae
                          </th>
                          <th className="view-client-table-content">
                            <a href={client?.cvUrl}>Download file</a>
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
