import * as fbapp from 'firebase/app'
import 'firebase/firestore'

import * as fbui from 'firebaseui'


const firebaseConfig = {
    apiKey: "AIzaSyAPKM3f9aySJnlcuSIxSLEvWj_xsLn9PlY",
    authDomain: "senior-poll.firebaseapp.com",
    projectId: "senior-poll",
    storageBucket: "senior-poll.appspot.com",
    messagingSenderId: "1018956315686",
    appId: "1:1018956315686:web:be20251abf0a2944123ae7",
    measurementId: "G-4WS7LQ0N0F"
};

const firebase = fbapp.default


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const FieldValue = firebase.firestore.FieldValue
export const firestore = firebase.firestore()
export const auth = firebase.auth()

export const firebaseUI = new fbui.auth.AuthUI(auth)

export function setupLoginUI() {
    firebaseUI.start('#firebase-auth-container', {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (authRes, redirectURL) => {
                return false
            }
        }
    })
}
