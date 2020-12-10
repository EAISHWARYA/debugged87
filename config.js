import firebase from 'firebase';
require('@firebase/firestore')

const  firebaseConfig = {
  apiKey: "AIzaSyCpz-Rh8qtHIQz5nSK0biNOXKtCrOLHSz8",
  authDomain: "bkc82-f8b9f.firebaseapp.com",
  databaseURL: "https://bkc82-f8b9f.firebaseio.com",
  projectId: "bkc82-f8b9f",
  storageBucket: "bkc82-f8b9f.appspot.com",
  messagingSenderId: "531740981040",
  appId: "1:531740981040:web:bb4662a9376054fee93af5"
};


// Initialize Firebase
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
