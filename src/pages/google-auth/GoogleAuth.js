import { useEffect } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "./GoogleAuth.scss";

const GoogleAuth = ({ auth }) => {
  useEffect(() => {
    const authUI =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    authUI.start(".firebase-auth-container-form", {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
      signInSuccessUrl: "/view-clients",
    });
  }, [auth]);

  return (
    <div className="firebase-auth d-flex justify-content-center align-items-center">
      <div className="firebase-auth-container d-flex justify-content-center align-items-center">
        <div className="firebase-auth-container-form"></div>
      </div>
    </div>
  );
};

export default GoogleAuth;
