import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/database'
import 'firebase/auth'; 

var firebaseConfig = {
    apiKey: "AIzaSyCBrb-QNYm6apeRo3-Azn39ywjumAv4QJg",
    authDomain: "uw-course-and-degree-planner.firebaseapp.com",
    databaseURL: "https://uw-course-and-degree-planner.firebaseio.com",
    projectId: "uw-course-and-degree-planner",
    storageBucket: "uw-course-and-degree-planner.appspot.com",
    messagingSenderId: "31187806032",
    appId: "1:31187806032:web:7b80302ff8a7d968dcae55",
    measurementId: "G-LD4FY5MY42"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
