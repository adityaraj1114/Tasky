const cardContainer = document.querySelector(".card-container");
const deleteButton = document.querySelector('.btn btn-outline-danger');

const generateNewCard = (taskData) => `
  <div id= ${
    taskData.id
  } class="card-container bg-body-secondary p-2 rounded m-2" style="width: 16rem;">
        <div class="container p-2 d-flex justify-content-end column-gap-2">
          <button type="button" class="btn btn-outline-success m"><i class="fal fa-pencil" name=${
            taskData.id
          }></i></button>
          <button onClick= ${"clearLocalStorage()"} type="button" class="btn btn-outline-danger"><i class="far fa-trash-alt" name=${
  taskData.id
}></i></button>
        </div>

        <img src="${
          taskData.imageUrl
        }" class="card-img-top" style="height: 14rem; alt="no image">

        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDesctiption}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>     
  </div>`;
//   ----------------------------------------------global storage---------------------------------------------------

// creating array to store objects of taskdata
const globalStorage = []; //array of objects


// --------------------------------------------delete card--------------------------------------------
const clearLocalStorage = () => {
    deleteButton.document.addEventListner('click', function() {
        console.log("helloooo");
        console.log("nooooooo");
    });
  // localStorage.removeItem("taskyId");
};


// ----------------------------------------on load------------------------------------------------------
const loadInitialCardData = () => {
  const getCardData = localStorage.getItem("taskyId"); //object of array of objects

  const { cards } = JSON.parse(getCardData); //we use destructuring to get card object data

  cards.map((cardObject) => {
    cardContainer.insertAdjacentHTML("afterend", generateNewCard(cardObject));
    globalStorage.push(cardObject);
  });
};


// ---------------------------------------Save changes-------------------------------------------------------
const saveChanges = () => {
  // Get the values from the form and store them in a object
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("image-url").value,
    taskTitle: document.getElementById("task-title").value,
    taskType: document.getElementById("task-type").value,
    taskDiscription: document.getElementById("task-discription").value,
  };

  cardContainer.insertAdjacentHTML("afterend", generateNewCard(taskData));

  // pushing data in globalstorage array
  globalStorage.push(taskData);

  localStorage.setItem("taskyId", JSON.stringify({ cards: globalStorage }));
};
// -----------------------------------------------------------------------------------------------

