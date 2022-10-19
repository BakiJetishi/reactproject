import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDtLTeFeTL1MkiqF17G_dRh9LifobFhajc",
    authDomain: "react-http-403d2.firebaseapp.com",
    databaseURL: "https://react-http-403d2-default-rtdb.firebaseio.com",
    projectId: "react-http-403d2",
    storageBucket: "react-http-403d2.appspot.com",
    messagingSenderId: "494533548892",
    appId: "1:494533548892:web:dd1accf00a69e8faf43f99",
    measurementId: "G-RW70EEWEYD"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

