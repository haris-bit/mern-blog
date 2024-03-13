// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-5031d.firebaseapp.com",
  projectId: "mern-blog-5031d",
  storageBucket: "mern-blog-5031d.appspot.com",
  messagingSenderId: "160209531446",
  appId: "1:160209531446:web:91bdb98038674958d19e97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);