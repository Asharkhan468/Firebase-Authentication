import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";



//Firestore some cdn

const logOutBtn = document.querySelector("#logoutBtn");

//User display image

const userImage = document.getElementById("user-image");
const userName = document.getElementById("user-name");

//profile

const userProfile = document.querySelector("#modal-user-image");
const userDisplayName = document.querySelector("#modal-user-name");
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    let userPhoto = user.photoURL;
    userImage.src = `${userPhoto}`;
    userName.innerHTML = `${user.displayName}`;
    userProfile.src = `${userPhoto}`;
    userDisplayName.innerHTML = `${user.displayName}`;
  } else {
    window.location = "login.html";
  }
});

//Logout function

logOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("You are Logout Sucessfully");
      window.location = "login.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

//Navbar functionality

// JavaScript code for handling modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const userProfile = document.getElementById("userProfile");
  const userModal = document.getElementById("userModal");
  const closeBtn = document.getElementById("closeBtn");

  userProfile.addEventListener("click", () => {
    userModal.classList.add("show");
    document.querySelector(".modal-content").classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    userModal.classList.remove("show");
    document.querySelector(".modal-content").classList.remove("show");
  });

  userModal.addEventListener("click", (e) => {
    if (e.target === userModal) {
      userModal.classList.remove("show");
      document.querySelector(".modal-content").classList.remove("show");
    }
  });
});

//Todo app script started

let form = document.querySelector("#form");
let todo = document.querySelector("#todo");
let ul = document.querySelector("#ul");

let arr = [];

async function getData() {
  const querySnapshot = await getDocs(collection(db, "todo"));
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), id: doc.id });
    console.log(doc.data());
  });

  render();
}

getData();


function render() {
  if (arr.length === 0) {
    ul.innerHTML = `<p class="mt-6 no-item">No Todo Found....</p>`;
    return;
  }

  ul.innerHTML = "";

  arr.map((item) => {
    ul.innerHTML += `<li class="todo-item mt-6 ">
            <span class="todo-text">${item.todo}</span>
            <div class="todo-actions">
                <button class="todo-edit-btn edit-btn"><i class="fas fa-edit"></i> Edit</button>
                <button class="todo-delete-btn delete-btn"><i class="fas fa-trash"></i> Delete</button>
            </div>
        </li>`;
  });

  const deleteBtn = document.querySelectorAll(".delete-btn");
  const editBtn = document.querySelectorAll(".edit-btn");

  deleteBtn.forEach((btn, index) => {
    btn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "todo", arr[index].id));
      arr.splice(index, 1);

      render();
    });
  });

  editBtn.forEach((btn, index) => {
    const updateTodo = doc(db, "todo", arr[index].id);

    btn.addEventListener("click", async () => {
      let updatedValue=prompt('enter Updated value')
      await updateDoc(updateTodo, {
        todo: arr[index].todo = updatedValue
      });
      render()
    });
  });
}


//Todo delete and edit button

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const docRef = await addDoc(collection(db, "todo"), {
      todo: todo.value,
    });

    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo: todo.value,
      id: docRef.id,
    });
    render();
    todo.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
