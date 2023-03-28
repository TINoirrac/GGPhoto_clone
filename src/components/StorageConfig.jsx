// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAA-Y3kHqhYRtlWrAjGnTaDbxTjbH0vxJ8",
    authDomain: "cloudphotos-11ef9.firebaseapp.com",
    databaseURL: "https://cloudphotos-11ef9-default-rtdb.firebaseio.com",
    projectId: "cloudphotos-11ef9",
    storageBucket: "cloudphotos-11ef9.appspot.com",
    messagingSenderId: "221892027600",
    appId: "1:221892027600:web:8d38178d864b38ece16ad5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a root reference
export const rootStorage = getStorage(app);
