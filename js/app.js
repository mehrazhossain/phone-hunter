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

// display search result
const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  console.log(phones);
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
            <button class="btn btn-outline-primary fw-bold w-75 mx-auto mb-3">Explore</button>
        </div>
    
        `;
      searchResult.appendChild(div);
    }
  }
};
