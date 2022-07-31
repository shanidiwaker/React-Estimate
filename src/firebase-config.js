// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZHnsTVvypPk2RP7q2Z_wK1iZeTBQUebI",
    authDomain: "estimate-react.firebaseapp.com",
    projectId: "estimate-react",
    storageBucket: "estimate-react.appspot.com",
    messagingSenderId: "877653988037",
    appId: "1:877653988037:web:4e4fde471e7101d38ad6ac",
    measurementId: "G-GYGKZVWTV9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);