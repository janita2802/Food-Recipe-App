// import nav from "./nav.js";

// const navbar = document.getElementById("navbar");
// navbar.innerHTML = nav;

// let currentPage = 1; 
// const limit = 6; 

// async function FetchData(offset = 0){
//  try{
//     const response = await fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?a=American&_o=${offset}&_l=${limit}`);
//     const data = await response.json();
//     console.log(data);
  
//     if (data.meals) {
//       DisplayData(data.meals);
//       pagination(data.meals.length); 
//     } else {
//       console.error("No meals found");
//     }
//  }
//  catch(error){
//     console.error("Error while fetching meals", error);
//  }
// }

// const meals_container = document.getElementById("main-content");
// function DisplayData(data){
//    meals_container.innerHTML ="";
//    data.forEach(element => {
//       const card = document.createElement("div");
//       card.className = "card";

//       const title = document.createElement("h2");
//       title.textContent = element.strMeal;

//       const image = document.createElement("img");
//       image.src= element.strMealThumb;
//       image.alt = element.title;

//       const detailsbtn = document.createElement("button");
//       detailsbtn.textContent = "View Details"

//       card.append(title, image, detailsbtn);
//       meals_container.append(card);
 
//    });
// }

// const paginationdiv = document.getElementById("pagination");

// function pagination(totalMeals){
//    paginationdiv.innerHTML="";
//    let nbtns = Math.ceil(totalMeals/limit);

   
//    for(let i = 1; i<= nbtns; i++){
//       const btn = document.createElement("button");
//       btn.textContent = i;
//       btn.style = "border:1px solid black";

//       const offset = (i - 1) * limit;

//       btn.addEventListener("click", () => {
//          FetchData(offset); 
//        })
//      paginationdiv.append(btn);
//    } 
// }

// FetchData();

import nav from "./nav.js";

const navbar = document.getElementById("navbar");
navbar.innerHTML = nav;

let currentPage = 1;
const limit = 6;
let allMealsData; 

async function fetchData() {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=American`);
    const data = await response.json();
    console.log("API Response:", data);

    if (data.meals) {
      allMealsData = data.meals; // Store data in global variable
      displayData(data.meals); // Pass data for initial display
      pagination(data.meals.length);
    } else {
      console.error("No meals found");
    }
  } catch (error) {
    console.error("Error while fetching meals", error);
  }
}

const meals_container = document.getElementById("main-content");
function displayData(data) {
  meals_container.innerHTML = ""; // Clear previous content before displaying new data

  // Client-side pagination logic
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const slicedData = data.slice(startIndex, endIndex);

  slicedData.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = element.strMeal;

    const image = document.createElement("img");
    image.src = element.strMealThumb;
    image.alt = element.title;

    const detailsbtn = document.createElement("button");
    detailsbtn.textContent = "View Details";

    card.append(title, image, detailsbtn);
    meals_container.append(card);
  });
}

const paginationdiv = document.getElementById("pagination");

function pagination(totalMeals) {
  paginationdiv.innerHTML = "";
  let nbtns = Math.ceil(totalMeals / limit);

  for (let i = 1; i <= nbtns; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style = "border:1px solid black";

    btn.addEventListener("click", () => {
      console.log(i, "clicked");
      currentPage = i; // Update current page
      displayData(allMealsData); // Re-render data with updated page
    });
    paginationdiv.append(btn);
  }
}

fetchData(); // Initial fetch of all data

const formaction = document.getElementById("searchform");
formaction.addEventListener("submit", async function(event){
    event.preventDefault();
    const searchterm = document.getElementById("searchInput").value;
    if(!searchterm){
        alert("Please enter a recipe's name!!")
        return;
    }
    try{
        const response = await fetch(`https:/www.themealdb.com/api/json/v1/1/search.php?s=${searchterm}`);
        const data = await response.json();
        console.log(data);
        displayData(data.meals);

    }
    catch(error){
        console.error("Error while finding the recipe", error);
        alert("An error occurred while searching for recipes. Please try again later.");
    }
})


