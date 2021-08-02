import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyDDsa0jFVTxfAPkD3-q5giBnDW8_GMDDZk",
    authDomain: "bayanihan-news.firebaseapp.com",
    databaseURL: "https://bayanihan-news.firebaseio.com",
    projectId: "bayanihan-news",
    storageBucket: "bayanihan-news.appspot.com",
    messagingSenderId: "130380717704",
    appId: "1:130380717704:web:88b5e6362ece177aae893d",
    measurementId: "G-FK1S55WVGY"
};
firebase.initializeApp(firebaseConfig)

export default firebase;