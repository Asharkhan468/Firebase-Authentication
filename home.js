import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


import { auth } from "./config.js";

const logOutBtn = document.querySelector("#log-out-btn");

// const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
   window.location="login.html"
  }
});


logOutBtn.addEventListener('click' , ()=>{
signOut(auth)
  .then(() => {
    alert('You are Log Out sucessfully!')
    window.location="login.html"
  })
  .catch((error) => {
    console.log(error);
  });


})