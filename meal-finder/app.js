const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

//search from API
function searchMeal(e) {
  e.preventDefault();
  single_mealEl.innerHTML = "";
  const term = search.value;
  if (term.trim()) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(term)}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);

        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `,
            )
            .join("");
        }
        // console.log(mealsEl.innerHTML);
      })
      .catch((error) => {
        // console.error("Something went wrong:", error);
        resultHeading.innerHTML = `<h2>Something went wrong '${error}':</h2>`;
      });

    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

//get meal by id
function getMealById(mealID) {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`,
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

async function getRandomMeals() {
  const promises = Array.from({ length: 8 }, () =>
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then((res) => {
      if (!res.ok) throw new Error("API request failed");
      return res.json();
    }),
  );

  const results = await Promise.all(promises);
  resultHeading.innerHTML = `<h2>Some Meals You May Like</h2>`;
  const meals = results.map((result) => result.meals[0]);
  mealsEl.innerHTML = meals
    .map(
      (meal) => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `,
    )
    .join("");

  console.log(meals);
}

function getRandomMeal() {
  // Clear meals and heading
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
    .catch((error) => console.log(error));
}

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.target.closest(".meal-info");
  // console.log(mealInfo);
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealid");
    getMealById(mealID);
    // console.log(mealID);
  }
});

//all event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);

window.addEventListener("DOMContentLoaded", getRandomMeals);
