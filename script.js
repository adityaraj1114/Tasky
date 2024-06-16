const cardContainer = document.querySelector(".card-container");
// const deleteButton = document.querySelector('.btn btn-outline-danger');

const generateNewCard = (taskData) => `
  <div id= ${taskData.id} class="card-container bg-body-secondary p-2 rounded m-2" style="width: 16rem;">
        <div class="container p-2 d-flex justify-content-end column-gap-2">
          <button type="button" class="btn btn-outline-success m"><i class="fal fa-pencil" name=${taskData.id}></i></button>
          <button onclick="deleteTaskAndCard('${taskData.id}')" type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt" name=${taskData.id}></i></button>
        </div>

        <img src="${taskData.imageUrl}" class="card-img-top" style="height: 14rem; alt="no image">

        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskType}</p>
          <p class="card-text">${taskData.taskDescription}</p>
          <a href="card.html" class="btn btn-primary">Go somewhere</a>
        </div>     
  </div>`;
//   ----------------------------------------------global storage---------------------------------------------------

// creating array to store objects of taskdata
const globalStorage = []; //array of objects

// --------------------------------------------delete card--------------------------------------------

const deleteTaskAndCard = (taskData) => {

  // Confirm before deleting
  const confirmDelete = confirm("Delete Permanently?");
  if (confirmDelete) {
    // Get the tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem("taskyId")) || { cards: [] };

    // Filter out the task to be deleted
    tasks.cards = tasks.cards.filter((task) => task.id !== taskData);
    // console.log(tasks);
    // console.log(tasks.cards);

    // Update localStorage with the new tasks array
    localStorage.setItem("taskyId", JSON.stringify(tasks));

    // Remove card from DOM
    const cardToRemove = document.getElementById(taskData);
    if (cardToRemove) {
      cardToRemove.remove();
    }

    // Update globalStorage
    globalStorage = globalStorage.filter((task) => task.id !== taskData);
    // console.log(globalStorage);
  }
};

// ----------------------------------------on load------------------------------------------------------
const loadInitialCardData = () => {
  const getCardData = localStorage.getItem("taskyId"); //object of array of objects
   //we use destructuring to get card object data
  const { cards } = JSON.parse(getCardData);
  // console.log(cards);

  cards.map((cardObject) => {
    cardContainer.insertAdjacentHTML("afterend", generateNewCard(cardObject));
    globalStorage.push(cardObject);
  });
};

// ---------------------------------------Save changes-------------------------------------------------------
const saveChanges = () => {
  // Get the values from the form and store them in an object
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("image-url").value,
    taskTitle: document.getElementById("task-title").value,
    taskType: document.getElementById("task-type").value,
    taskDescription: document.getElementById("task-description").value,
  };

  cardContainer.insertAdjacentHTML("afterend", generateNewCard(taskData));

  // pushing data in globalstorage array
  globalStorage.push(taskData);

  localStorage.setItem("taskyId", JSON.stringify({ cards: globalStorage }));
};
// -----------------------------------------------------------------------------------------------

// -----------------------------------------card-----------------------------------------

const title = document.querySelector(".title");
title.innerHTML = generateTitle(taskData);


const generateTitle = (taskData) => `
  <h2 class="mx-5">${taskData.taskTitle}</h2>`;
// title.innerHTML = `${taskData.taskTitle}`;

// const taskData = {
//     id: `${Date.now()}`,
//     imageUrl: document.getElementById("image-url").value,
//     taskTitle: document.getElementById("task-title").value,
//     taskType: document.getElementById("task-type").value,
//     taskDescription: document.getElementById("task-description").value,
//   };

// const title = document.querySelector('.title');

// title.addEventListener("click", myFunction);

// function myFunction() {

//     return `<div class="title">
// <h2>${taskData.taskTitle}</h2>
// </div>`;

//   document.write("hello");
// title.innerHTML = heading(taskData);
