import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBmS-Z6QGD0029XqLB4blFZezgzaFeczDg",

  authDomain: "chatapp-d84b1.firebaseapp.com",

  projectId: "chatapp-d84b1",

  storageBucket: "chatapp-d84b1.appspot.com",

  messagingSenderId: "1096997072065",

  appId: "1:1096997072065:web:3a9f1a57d254b97ab43840",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(app);
const database = getFirestore(app);
const storage = getStorage(app);

export { app, auth, analytics, database, storage };
