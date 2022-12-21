import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAB9yKn-uZ_YnjswNN6uT97M7zRnKihPe8",
  authDomain: "gadget-shop-65d7a.firebaseapp.com",
  projectId: "gadget-shop-65d7a",
  storageBucket: "gadget-shop-65d7a.appspot.com",
  messagingSenderId: "632141002666",
  appId: "1:632141002666:web:92ef37c5f9f13b1a1f1dd3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage }