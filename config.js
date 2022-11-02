import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnpSW7CVOT6L1oGRNNQGU9vaX0EPBFE9M",
  authDomain: "dan-74a56.firebaseapp.com",
  databaseURL: "https://dan-74a56-default-rtdb.firebaseio.com",
  projectId: "dan-74a56",
  storageBucket: "dan-74a56.appspot.com",
  messagingSenderId: "635768140966",
  appId: "1:635768140966:web:9f1a65426684732d367067",
  measurementId: "G-XQGGXQNDCW"
};

 if (!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
 }

 
export default firebase.firestore()
