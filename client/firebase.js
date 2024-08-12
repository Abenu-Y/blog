// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apikey,
  authDomain: "blog-595d3.firebaseapp.com",
  projectId: "blog-595d3",
  storageBucket: "blog-595d3.appspot.com",
  messagingSenderId: "451433714238",
  appId: "1:451433714238:web:cc414ee1ab5b2f6250f76f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);