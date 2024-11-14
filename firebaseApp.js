// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDDj3nZXx_c_BjD84X7sxBd-NXX5X7FrTM",
    authDomain: "acdata-a61d3.firebaseapp.com",
    projectId: "acdata-a61d3",
    storageBucket: "acdata-a61d3.firebasestorage.app",
    messagingSenderId: "512434040764",
    appId: "1:512434040764:web:b0342bdbeaf357cfb645b9",
    measurementId: "G-X70VW3H6XS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app};