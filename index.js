import nav from "./nav.js";

const navbar = document.getElementById("navbar");
navbar.innerHTML = nav;

async function FetchData(){
 try{
    const response = await fetch("https:/www.themealdb.com/api/json/v1/1/filter.php?a=Indian");
    const data = await response.json();
    console.log(data);
    DisplayData(data);

 }
 catch(error){
    console.error("Error while fetching meals", error);
 }
}

FetchData(`https:/www.themealdb.com/api/json/v1/1/filter.php?a=Indian`);

const meals_container = document.getElementById("main-content");
function DisplayData(data){
   data.meals.forEach(element => {
      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("h2");
      title.textContent = element.strMeal;

      const image = document.createElement("img");
      image.src= element.strMealThumb;
      image.alt = element.title;

      const detailsbtn = document.createElement("button");
      detailsbtn.textContent = "View Details"

      card.append(title, image, detailsbtn);
      meals_container.append(card);
 
   });
}

// const formaction = document.getElementById("searchform");
// formaction.addEventListener("submit", async function(event){
//     event.preventDefault();
//     const searchterm = document.getElementById("searchInput").value;
//     if(!searchterm){
//         alert("Please enter a recipe's name!!")
//         return;
//     }
//     try{
//         const response = await fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${searchterm}`);
//         const data = await response.json();
//         console.log(data);

//     }
//     catch(error){
//         console.error("Error while finding the recipe", error);
//         alert("An error occurred while searching for recipes. Please try again later.");
//     }
// })


