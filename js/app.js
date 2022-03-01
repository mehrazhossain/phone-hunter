// search phone using input field value
const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  if (searchField.value == '') {
    const searchFieldEmptyError = document.getElementById(
      'search-field-empty-error'
    );
    const div = document.createElement('div');
    div.innerHTML = `<h1>Please Write Something</h1>`;
    searchFieldEmptyError.appendChild(div);
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((allData) => displaySearchResult(allData.data));
  }
  searchField.value = '';
};
// explore more details
const exploreDetails = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => dislplayDetails(data.data));
};

// Toggle display details div
const toggleDetailsDiv = (displayStyle) => {
  document.getElementById('toggle-details-div').style.display = displayStyle;
};

// display details
const dislplayDetails = (phoneDetails) => {
  // Sensor information
  var text = '';
  var sensorData = phoneDetails.mainFeatures.sensors;
  sensorData.forEach(testFunc);
  function testFunc(value) {
    text = text + value + ' ';
  }
  //   explore details
  const exploreDetails = document.getElementById('explore-details');
  exploreDetails.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
        <img style="width: 200px; height: 250px; padding: 10px 0px 10px 10px;" src="${
          phoneDetails.image
        }" class="card-img-top img-fluid" alt="..." />
        <h5 class="card-title">Name: ${phoneDetails.name}</h5>
        <span class="d-block">Brand: ${phoneDetails.brand}</span> 
        <span class="d-block">Release Date: ${
          phoneDetails.releaseDate
            ? phoneDetails.releaseDate
            : 'No release date found'
        }</span>
        <span class="d-block">Storage: ${
          phoneDetails.mainFeatures.storage
        }</span>
        <span class="d-block">Display Size: ${
          phoneDetails.mainFeatures.displaySize
        }</span>
        <span class="d-block">Chipset: ${
          phoneDetails.mainFeatures.chipSet
        }</span>
        <span class="d-block">Memory: ${phoneDetails.mainFeatures.memory}</span>
        <span class="d-block">Sensors: ${text}</span>
        `;
  exploreDetails.appendChild(div);
  toggleDetailsDiv('block');
};

// display search result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  //   clear search result div
  searchResult.textContent = '';
  if (phones == '') {
    const noResultError = document.getElementById('no-result-error');
    const div = document.createElement('div');
    div.innerHTML = `
      <h1>No Result Found</h1>
    `;
    noResultError.appendChild(div);
  } else {
    for (const phone of phones) {
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
        <div class="card h-100">
            <img style="width: 220px; height: 280px; padding: 10px 0px 0px 10px;" src="${phone.image}" class="card-img-top img-fluid" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            </div>
            <button onclick="exploreDetails('${phone.slug}')" class="btn btn-outline-primary fw-bold w-75 mx-auto mb-3">Explore</button>
        </div>
    
        `;
      searchResult.appendChild(div);
    }
  }
};
