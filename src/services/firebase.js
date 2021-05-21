import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCwmUfZxmfZqvcvi4IeJqKHGiVq1yVPq50",
    authDomain: "redux-realtime-example.firebaseapp.com",
    databaseURL: "https://redux-realtime-example-default-rtdb.firebaseio.com",
    projectId: "redux-realtime-example",
    storageBucket: "redux-realtime-example.appspot.com",
    messagingSenderId: "559051874594",
    appId: "1:559051874594:web:2d799acf38eca4f45b857b"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
