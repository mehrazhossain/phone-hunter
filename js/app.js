const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  //   console.log(searchText);
  searchField.value = '';

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((allData) => displaySearchResult(allData.data));
};

const displaySearchResult = (phones) => {
  const searchResult = document.getElementById('search-result');
  for (const phone of phones) {
    console.log(phone);
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
};
