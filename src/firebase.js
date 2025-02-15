import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnhsdxiiWyji28STAdJsuQgsW8WZRB9oI",
  authDomain: "fodins-d60da.firebaseapp.com",
  projectId: "fodins-d60da",
  storageBucket: "fodins-d60da.firebasestorage.app",
  messagingSenderId: "123211979780",
  appId: "1:123211979780:web:98d32bdb0fb2ed4a056951",
  measurementId: "G-KL2RNPKC5W",
  databaseURL: "https://fodins-d60da-default-rtdb.firebaseio.com",
};

// Inicializa Firebase con un nombre único
const appPrincipal = initializeApp(firebaseConfig, "appPrincipal");
const database = getDatabase(appPrincipal);

export { database, ref, set, onValue, get };