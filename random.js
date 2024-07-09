import nav from "./nav.js";

const navbar = document.getElementById("navbar");
navbar.innerHTML = nav;

async function fetchMultipleMeals(numberOfMeals) {
  const meals = [];
  for (let i = 0; i < numberOfMeals; i++) {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
      const data = await response.json();
      meals.push(data.meals[0]); // Assuming data contains an array of meals, access the first one
    } catch (error) {
      console.error("Error while fetching meal", error);
    }
  }
  return meals;
}

const meals_container = document.getElementById("meals_container");

async function displayRandomMeals(numberOfMeals) {
  const meals = await fetchMultipleMeals(numberOfMeals);
  meals_container.innerHTML = ""; // Clear previous content

  // Create document fragment for faster DOM manipulation
  const fragment = document.createDocumentFragment();

  meals.forEach(data => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("h2");
    title.textContent = data.strMeal;

    const image = document.createElement("img");
    image.src = data.strMealThumb;
    image.alt = data.title;

    card.append(title, image);
    fragment.appendChild(card);
  });

  meals_container.appendChild(fragment); // Append fragment at once
}

displayRandomMeals(10); // Fetch and display 10 random meals
