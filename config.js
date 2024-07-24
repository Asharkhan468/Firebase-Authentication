import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxVDP6qSZt5e3qdAyKYEf5YwFa4HFsHtM",
  authDomain: "fir-authentication-956b7.firebaseapp.com",
  projectId: "fir-authentication-956b7",
  storageBucket: "fir-authentication-956b7.appspot.com",
  messagingSenderId: "556321944730",
  appId: "1:556321944730:web:f2524902c7a708f7565b23",
  measurementId: "G-FHLZP4ZN7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
