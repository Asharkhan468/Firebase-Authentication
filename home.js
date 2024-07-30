import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 



import { auth , db  } from "./config.js";

//Firestore some cdn


const logOutBtn = document.querySelector("#logoutBtn");

//User display image



const userImage = document.getElementById("user-image");
const userName = document.getElementById("user-name");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
   userImage.src=`${user.photoURL}`;
   userName.innerHTML=`${user.displayName}`
  } else {
   window.location="login.html"
  }
});

//Logout function

// const popup= document.querySelector('#popup')


logOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {

    alert('You are Logout Sucessfully');
    window.location="login.html"

    })
    .catch((error) => {
      console.log(error);
    });
});





 


  



    
    
   
    








//Navbar functionality


// JavaScript code for handling modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.getElementById('userProfile');
    const userModal = document.getElementById('userModal');
    const closeBtn = document.getElementById('closeBtn');

    userProfile.addEventListener('click', () => {
        userModal.classList.add('show');
        document.querySelector('.modal-content').classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        userModal.classList.remove('show');
        document.querySelector('.modal-content').classList.remove('show');
    });

    userModal.addEventListener('click', (e) => {
        if (e.target === userModal) {
            userModal.classList.remove('show');
            document.querySelector('.modal-content').classList.remove('show');
        }
    });
});



//Todo app script started

let form = document.querySelector('#form');
let todo = document.querySelector('#todo');
let submitBtn = document.querySelector("#btn-submit");
let ul = document.querySelector("#ul");

let arr=[];

async function getData(){
const querySnapshot = await getDocs(collection(db, "todo"));
querySnapshot.forEach((doc) => {
  arr.push(doc.data())
  console.log(doc.data());
});

render()


}

getData()






function render(){

   if (arr.length === 0) {
     ul.innerHTML = `<p class="mt-6 no-item">No Todo Found....</p>`;
     return;
   }

    ul.innerHTML = "";

    arr.map((item) => {
      ul.innerHTML += `<li class="todo-item mt-6 ">
            <span class="todo-text">${item.todo}</span>
            <div class="todo-actions">
                <button class="todo-edit-btn"><i class="fas fa-edit"></i> Edit</button>
                <button class="todo-delete-btn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </li>`;
    });
  }


form.addEventListener('submit'  , async (event)=>{

  event.preventDefault();

  arr.push({
    todo:todo.value
  });

  render()


  
try {
  const docRef = await addDoc(collection(db, "todo"), {
    todo:todo.value
  });

  todo.value=""
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

  



    
  


  
  

})


