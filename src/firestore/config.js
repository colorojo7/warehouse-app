// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-CA3cg0hK5B0KYNnMIjlKqUwV6JrRSbA",
    authDomain: "anj-app.firebaseapp.com",
    projectId: "anj-app",
    storageBucket: "anj-app.appspot.com",
    messagingSenderId: "710817134257",
    appId: "1:710817134257:web:8f5cb741058abdc8801490"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirestore = () => app
