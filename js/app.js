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
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => dislplayDetails(data.data));
};

// display details
const dislplayDetails = (phoneDetails) => {
  console.log(phoneDetails);
  const exploreDetails = document.getElementById('explore-details');
  const div = document.createElement('div');
  div.innerHTML = `
        <img style="width: 300px; height: 280px; padding: 10px 0px 0px 10px;" src="${
          phoneDetails.image
        }" class="card-img-top img-fluid" alt="..." />
        <h3 class="card-title">Name: ${phoneDetails.name}</h3>
        <h3>Brand: ${phoneDetails.brand}</h3> 
        <h4>Release Date: ${
          phoneDetails.releaseDate ? phoneDetails.releaseDate : 'undefined'
        }</h4>
        `;
  exploreDetails.appendChild(div);
};

// display search result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  //   console.log(phones);
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
      // console.log(phone);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
        <div class="card h-100">
            <img style="padding: 10px 0px 0px 10px;" src="${phone.image}" class="card-img-top h-75 w-75 img-fluid" alt="..." />
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
