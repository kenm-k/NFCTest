
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDj3nZXx_c_BjD84X7sxBd-NXX5X7FrTM",
    authDomain: "acdata-a61d3.firebaseapp.com",
    projectId: "acdata-a61d3",
    storageBucket: "acdata-a61d3.firebasestorage.app",
    messagingSenderId: "512434040764",
    appId: "1:512434040764:web:7e5cdd1c14d032fdb645b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };