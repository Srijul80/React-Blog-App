import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKN1zi6YWAbSe25CEZ9xmo54zYJvmBXo8",
  authDomain: "reactblogapp-2190c.firebaseapp.com",
  projectId: "reactblogapp-2190c",
  storageBucket: "reactblogapp-2190c.firebasestorage.app",
  messagingSenderId: "195439262482",
  appId: "1:195439262482:web:4dd6210229805151c311cb",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, app, auth };
