import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCDAcVCwGTb6FmapTKux7FRsHqXM3KMFTA",
  authDomain: "clone2-498fd.firebaseapp.com",
  projectId: "clone2-498fd",
  storageBucket: "clone2-498fd.appspot.com",
  messagingSenderId: "313694121684",
  appId: "1:313694121684:web:2d82a14289c1ee178b5541"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
export default db;