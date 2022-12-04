import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDUm9AQL75aVUiaizdtjrlvPqInROJ2-Hs",
    authDomain: "nwitter-221aa.firebaseapp.com",
    projectId: "nwitter-221aa",
    storageBucket: "nwitter-221aa.appspot.com",
    messagingSenderId: "124731719475",
    appId: "1:124731719475:web:df8754461c203035de8846"
};
const app = initializeApp(firebaseConfig);


export const authService = getAuth();

export const dbService = getFirestore();

export const storageService = getStorage();