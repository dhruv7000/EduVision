// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFyxxS45kiJy2U8eOVILWzajwzQMHWUJ8",
  authDomain: "fir-demo-9608d.firebaseapp.com",
  projectId: "fir-demo-9608d",
  storageBucket: "fir-demo-9608d.appspot.com",
  messagingSenderId: "709888875842",
  appId: "1:709888875842:web:478a40bc5ebc0a37a5fcdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export default storage;
