import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


import { auth } from "config.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
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




//Login with google btn functionality

const googleLogin = document.querySelector(".google-login-btn");

const providerGoogle = new GoogleAuthProvider();

export let user

googleLogin.addEventListener('click' , ()=>{

  
signInWithPopup(auth, providerGoogle)
  .then((result) => {
  
     user = result.user;
    window.location="home.html"

    
  })
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });

})




//Login with github


const GitHubLogin = document.querySelector(".github-login-btn");

const providerGitHub = new GithubAuthProvider();

GitHubLogin.addEventListener('click' , ()=>{

  signInWithPopup(auth, providerGitHub)
    .then((result) => {
      const user = result.user;
      console.log(user);
      window.location='home.html'
     
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });

})


