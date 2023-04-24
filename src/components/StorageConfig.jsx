// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

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

// User instance
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a root reference
export const rootStorage = getStorage(app);

export const auth = getAuth(app)

GoogleSignin.configure({
    webClientId: '221892027600-os3ahi2d8gpnhfabasqurmt7bmldhgq7.apps.googleusercontent.com'
})

export const signInWithGoogle = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    const googleCredential = GoogleAuthProvider.credential(idToken)
    // Sign-in the user with the credential
    const user_sign_in = signInWithCredential(auth, googleCredential)
    user_sign_in.then((user) => {
        console.log(user)
    })
        .catch((error) => {
            console.log(error)
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        })
}
