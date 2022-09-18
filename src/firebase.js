// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDEl5J8mUZJyeOjmET2duuFu6pK3DJj3N0",
  authDomain: "dev-oswrecruitment.firebaseapp.com",
  projectId: "dev-oswrecruitment",
  storageBucket: "dev-oswrecruitment.appspot.com",
  messagingSenderId: "803693770410",
  appId: "1:803693770410:web:6015b86d1c1ea1143282d3",
  measurementId: "G-FVCHQG89JK"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)