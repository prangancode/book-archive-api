document.getElementById('error-message').style.display = 'none';


const errorSearch = document.getElementById('error-search');
const totalSearchVisibility = document.getElementById('total-search-visibility');
const resultsFoundVisibility = document.getElementById('results-found-visibility');

errorSearch.style.display = 'none';
totalSearchVisibility.style.display = 'none';
resultsFoundVisibility.style.display = 'none';

// toggle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('book-spinner').style.display = displayStyle;
}


// search the book
const searchBook = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;

    const searchResult = document.getElementById('search-result');
    const totalSearch = document.getElementById('total-search');

    toggleSpinner('block');



    // Error handling for No Input search
    if (searchText === '') {
        errorSearch.style.display = 'block';
        toggleSpinner('none');
        totalSearchVisibility.style.display = 'none';
        resultsFoundVisibility.style.display = 'none';
        searchResult.innerHTML = '';
        totalSearch.innerText = '0';
    }

    // showing results

    else {
        totalSearchVisibility.style.display = 'block';
        resultsFoundVisibility.style.display = 'block';
        // Clear Data
        searchField.value = '';
        searchResult.innerHTML = '';
        totalSearch.innerText = '';
        errorSearch.style.display = 'none';

        // Load Data

        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResultsFound(data.docs.length));
        fetch(url)
            .then(res => res.json())
            .then(data => displayTotalSearch(data.numFound));
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
            .catch(error => displayError(error));
    }

}

const displayError = error => {
    toggleSpinner('none');
    totalSearchVisibility.style.display = 'none';
    resultsFoundVisibility.style.display = 'none';
    document.getElementById('error-message').style.display = 'block';
}


// Display Search Result

const displaySearchResult = books => {

    const searchResult = document.getElementById("search-result");
    searchResult.textContent = '';


    books.forEach(book => {
        console.log(book);

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="card ">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top p-2" alt="..."  height="400">
                
                <div class="row g-0">
                    <div class="col-6 col-md-4 text-center border border-primary fw-bolder p-1"> BOOK NAME </div>
                    <div class="col-sm-6 col-md-8 text-center border border-primary fw-bolder fst-italic text-info p-1">${book.title}</div>
                </div>
                <div class="row g-0">
                    <div class="col-6 col-md-4 text-center border border-primary fw-bolder p-1"> AUTHOR NAME </div>
                    <div class="col-sm-6 col-md-8 text-center border border-primary fw-bolder fst-italic text-info p-1">${book.author_name}</div>
                </div>
                <div class="row g-0">
                    <div class="col-6 col-md-4 text-center border border-primary fw-bolder p-1"> PUBLISHER </div>
                    <div class="col-sm-6 col-md-8 text-center border border-primary fw-bolder fst-italic text-info p-1">${book.publisher}</div>
                </div>
                <div class="row g-0">
                    <div class="col-6 col-md-4 text-center border border-primary fw-bolder p-1"> FIRST PUBLISH YEAR </div>
                    <div class="col-sm-6 col-md-8 text-center border border-primary fw-bolder fst-italic text-info p-1">${book.first_publish_year}</div>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
    });
    toggleSpinner('none');

}
// Total Search Result
const displayTotalSearch = totalNo => {
    const totalSearch = document.getElementById('total-search');
    totalSearch.innerText = `${totalNo}`;
}
// Results shown
const displayResultsFound = totalNo => {
    const resultsFound = document.getElementById('results-found');
    resultsFound.innerText = `${totalNo}`;
}