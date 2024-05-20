// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX3AO9FCjTf7tHqxJ9cGMdVwEFNI4F5ww",
  authDomain: "contacts-app-6c98b.firebaseapp.com",
  projectId: "contacts-app-6c98b",
  storageBucket: "contacts-app-6c98b.appspot.com",
  messagingSenderId: "736159009069",
  appId: "1:736159009069:web:43a0ada3487b65bc31aba4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
