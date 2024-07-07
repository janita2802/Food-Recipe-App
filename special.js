import nav from "./nav.js";

const navbar = document.getElementById("navbar");
navbar.innerHTML = nav;

async function fetchData() {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await response.json();
    console.log("API Response:", data);

    displayData(data.meals); // Pass data for initial display
  } catch (error) {
    console.error("Error while fetching meals", error);
  }
}

const meals_container = document.getElementById("main-content");
function displayData(data) {
  meals_container.innerHTML = ""; // Clear previous content before displaying new data

  data.forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = element.strMeal;

    const image = document.createElement("img");
    image.src = element.strMealThumb;
    image.alt = element.title;

    const detailsbtn = document.createElement("button");
    detailsbtn.textContent = "See More Options";

    card.append(title, image, detailsbtn);
    meals_container.append(card);
  });

  const mealId = data[0].idMeal; // Assuming data contains an array of meals, access the first one
  console.log("Meal ID:", mealId);

  fetchMealDetails(mealId); // Call after data is displayed
}

async function fetchMealDetails(mealId) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    console.log("Lookup Response:", data);

    if (data.meals) {
      displayDetails(data.meals[0]); // Assuming data contains an array of meals, access the first one
    } else {
      console.error("No details found for this meal.");
    }
  } catch (error) {
    console.error("Error while fetching meal details", error);
  }
}

const detailsdiv = document.getElementById("details");

function displayDetails(mealData) {
  const detailsCard = document.createElement("div");
  detailsCard.className = "details-card";

  const category = document.createElement("p");
  category.textContent = `Category: ${mealData.strCategory}`; // Use mealData instead of element

  const area = document.createElement("p");
  area.textContent = `Area: ${mealData.strArea}`; // Use mealData instead of element

    const youtubeLink = document.createElement("a");
    youtubeLink.href = mealData.strYoutube;
    youtubeLink.textContent = "Watch Recipe Video";
    youtubeLink.target = "_blank"; // Open link in new tab

    const instructions = document.createElement("p");
    instructions.textContent = `Instructions: ${mealData.strInstructions}`;



  detailsCard.append(category, area,  instructions, youtubeLink);
  detailsdiv.appendChild(detailsCard);
}

fetchData();
