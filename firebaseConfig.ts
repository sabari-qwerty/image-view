import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, listAll } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCzgFYeJYvrjOvxVlFrPUkYzUBdpE5fHPY",
    authDomain: "chat-app-5ca99.firebaseapp.com",
    projectId: "chat-app-5ca99",
    storageBucket: "chat-app-5ca99.appspot.com",
    messagingSenderId: "602948706449",
    appId: "1:602948706449:web:d6b5f57f445138b32a5f30",
    measurementId: "G-GNCRWJ2Y9D",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage();