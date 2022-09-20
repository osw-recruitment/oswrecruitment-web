import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { collection } from "firebase/firestore";

let firebaseConfig = {};

switch (process.env.STAGE) {
  case "dev":
    firebaseConfig = {
      apiKey: "AIzaSyDEl5J8mUZJyeOjmET2duuFu6pK3DJj3N0",
      authDomain: "dev-oswrecruitment.firebaseapp.com",
      projectId: "dev-oswrecruitment",
      storageBucket: "dev-oswrecruitment.appspot.com",
      messagingSenderId: "803693770410",
      appId: "1:803693770410:web:6015b86d1c1ea1143282d3",
      measurementId: "G-FVCHQG89JK",
    };
    break
  case "stage":
    firebaseConfig = {
      apiKey: "AIzaSyDIYxRNfmrfO9zO--nMwYo8zPwOIANy_B0",
      authDomain: "stage-oswrecruitment.firebaseapp.com",
      projectId: "stage-oswrecruitment",
      storageBucket: "stage-oswrecruitment.appspot.com",
      messagingSenderId: "773222030671",
      appId: "1:773222030671:web:7eecccd2997c2d73c2393a",
      measurementId: "G-NFEBKKPWYD",
    };
    break
  case "prod":
    firebaseConfig = {
      apiKey: "AIzaSyCz28C38Xr_ypgpBmANeDM4YQ49zz01G74",
      authDomain: "oswrecruitment.firebaseapp.com",
      projectId: "oswrecruitment",
      storageBucket: "oswrecruitment.appspot.com",
      messagingSenderId: "262112760219",
      appId: "1:262112760219:web:ced3ac838f8477d94d113e",
      measurementId: "G-7RQ8ZSB9ZX",
    };
    break
  default:
    firebaseConfig = {
      apiKey: "AIzaSyDEl5J8mUZJyeOjmET2duuFu6pK3DJj3N0",
      authDomain: "dev-oswrecruitment.firebaseapp.com",
      projectId: "dev-oswrecruitment",
      storageBucket: "dev-oswrecruitment.appspot.com",
      messagingSenderId: "803693770410",
      appId: "1:803693770410:web:6015b86d1c1ea1143282d3",
      measurementId: "G-FVCHQG89JK",
    };
}

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
export const auth = getAuth(app);
export const clientRef = collection(database, "clients");
