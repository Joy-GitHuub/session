// ALL ID Tag
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const errorDiv = document.getElementById('error');
const countryContainer = document.getElementById('country-container')
const countryDetails = document.getElementById('country-details');
const spinner = document.getElementById('spinner');

// Button Event Listener
searchBtn.addEventListener('click', function () {
  const search = searchInput.value;
  console.log(search);

  // Empty
  if (search === "") {
    alert("No Input is Hare")
    errorDiv.innerHTML = `
    <h2 class=" container  bg-dark text-white my-5 p-5">Please Find SomeThing</h2>
    `
    return;
  }
  // All Country API
  countryDetails.innerHTML = "";

  // Spinner Remove D-NONE
  spinner.classList.remove("d-none");
  fetch(`https://restcountries.eu/rest/v2/name/${search}`)
    .then(res => res.json())
    .then(data => showData(data));

  // Spinner Timer
  setTimeout(() => {
    spinner.classList.add("d-none");
    showData(data);
  }, 1500);
  // Clear Search Field
  errorDiv.innerText = "";
  searchInput.value = "";
  countryContainer.innerHTML = "";

});

const showData = (data) => {

  if (data.message === "Not Found") {
    errorDiv.innerHTML = `
 <h2 class=" container   bg-dark text-white my-5 p-5">Not Found</h2>
    `
  }
  else {
    errorDiv.innerText = "";
  }

  // Loop 
  for (const food of data) {
    console.log(food);

    const card = document.createElement('div');
    card.classList.add('col-md-3')
    card.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
        <img
          src="${food.flag}"
          class="w-100"
          alt=""
        />
      </div>
      <!-- Body -->
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        "
      >
        <h3>${food.name}</h3>
        <button onclick="loadDetails('${food.alpha3Code}')" class="btn btn-dark">Learn More</button>
      </div>
      `;


    countryContainer.appendChild(card);
  }
};

const loadDetails = (alpha3Code) => {
  fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then(res => res.json())
    .then(data => displayDetails(data))

};

const displayDetails = (all) => {
  console.log(all)

  countryDetails.innerHTML = `
    <div class="col-md-12">
    <h1>${all.name}</h1>
    <p>Capital: ${all.name}</p>
    <p>Currency Name: ${all.currencies[0].name}</p>

    <p>Currency Symbol: ${all.currencies[0].symbol}</p>
        </div>
    
    `;



}