import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { auth } from "./config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#Password");
const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('You have sucessfully login !')
      window.location="home.html"
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(`${errorMessage}`)
    });
});
