// Rayan Hayle, Rah2236
document.addEventListener('DOMContentLoaded', function () {
  const cityData = {
      "San Francisco": {
          city: "San Francisco",
          average_income: "$100,000",
          cost_of_living_index: 150,
          job_market: "very strong",
          housing_cost: "$3,000/month",
          summary: "San Francisco has a thriving tech industry, but high living costs.",
          similar_cities: ["San Diego", "New York", "Los Angeles"]
      },
      "New York": {
          city: "New York",
          average_income: "$80,000",
          cost_of_living_index: 120,
          job_market: "strong",
          housing_cost: "$2,500/month",
          summary:  "New York City offers a robust job market, especially in tech and finance, but the cost of living is high.",
          similar_cities: ["San Francisco", "Los Angeles", "Chicago"]
      },

      "Los Angeles": {
          city: "Los Angeles",
          average_income: "$75,000",
          cost_of_living_index: 110,
          job_market: "good",
          housing_cost: "$2,200/month",
          summary: "Los Angeles is known for its entertainment industry.",
          similar_cities: ["San Francisco", "San Diego", "Phoenix"]
      }
  };

  // Prevents excessive function calls by delaying execution (used for autocomplete).
  function debounce(func, delay) {
      let timeoutId;
      return function(...args) {
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
              func.apply(null, args);
          }, delay);
      };
  }

  //  Generates HTML cards displaying city details
  function generateCityCard(city) {
      return `
          <div class="col-md-4">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${city.city}</h5>
                      <p><strong>Average Income:</strong> ${city.average_income}</p>
                      <p><strong>Cost of Living Index:</strong> ${city.cost_of_living_index}</p>
                      <p><strong>Job Market:</strong> ${city.job_market}</p>
                      <p><strong>Housing Cost:</strong> ${city.housing_cost}</p>
                      <p><strong>Summary:</strong> ${city.summary}</p>
                      <h6>Similar Cities:</h6>
                      <ul>
                          ${city.similar_cities.map(similarCity => 
                              `<li><a href="/city/${similarCity.toLowerCase()}">${similarCity}</a></li>`
                          ).join('')}
                      </ul>
                  </div>
              </div>
          </div>
      `;
  }

  //Automatically displays all cities from cityData on page load.
  const citiesContainer = document.getElementById("cities-container");
  Object.keys(cityData).forEach(cityName => {
      citiesContainer.innerHTML += generateCityCard(cityData[cityName]);
  });

  // Function to search cities and display results
  document.getElementById('search-form').addEventListener('submit', function(e) {
      e.preventDefault();  // Prevent the default form submission

      const query = document.getElementById('search-input').value.trim();
      const resultsContainer = document.getElementById("cities-container");
      resultsContainer.innerHTML = '';  // Clear previous results

      // Listens for a form submission.
  //Fetches city search results from the server (/search).
  // Updates the display with matching city cards.
      fetch(`/search?query=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
              if (data.length > 0) {
                  data.forEach(city => {
                      resultsContainer.innerHTML += generateCityCard(city);
                  });
              } else {
                  resultsContainer.innerHTML = '<p>No results found.</p>';
              }
          });
  });

  
  // Clear suggestions on input focus out
  inputField.addEventListener('blur', function() {
      setTimeout(() => {
          document.getElementById("suggestions").innerHTML = ""; // Clear suggestions after clicking away
      }, 100); // Delay to allow for click event on suggestion
  });
});