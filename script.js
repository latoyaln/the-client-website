// This code will run when the HTML document is fully loaded and ready.
document.addEventListener("DOMContentLoaded", function() {
    onDocumentReady();
});

// Here I create an object to store references to various DOM elements.
var el = {
    filters: null,
    filtersList: null,
    list: null,
    items: null,
    heading: null,
};

// This function checks if a number is within a specified range.
function inRange(num, range) {
    return (num >= range.split('-')[0] && num <= range.split('-')[1]);
}

// Here I use this function to count how many cards match a specific filter key and value.
function matches(key, value) {
    var count = 0;
    Array.from(el.items).forEach(item => {
        switch(key) {
            case 'price':
                if (item.getAttribute('data-price') === value) {
                    count++;
                }
                break;
            case 'person':
                if (item.getAttribute('data-person') === value) {
                    count++;
                }
                break;
            case 'categ':
                if (item.getAttribute('data-categ') === value) {
                    count++;
                }
                break;
        }
    });
    return count;
}

// I check if if a card matches the selected filter options.
function match(item) {
    var match = {
        "price": [],
        "person": [],
        "categ": []
    };

 // I check through the filter options and select the match object.
    Array.from(el.filtersList).forEach(input => {
        if (input.checked) {
            switch(input.name) {
                case 'price':
                    match.price.push(item.getAttribute('data-price') === input.value);
                    break;
                case 'person':
                    match.person.push(item.getAttribute('data-person') === input.value);
                    break;
                case 'categ':
                    match.categ.push(item.getAttribute('data-categ') === input.value);
                    break;
            }
        }
    });
    return match;
}

// Automatically update the displayed count of matching cards in the heading.

function renderCount(count) {
    el.heading.innerHTML = `${count} Matches`;
}

// I use this function to filter and display the cards that match the selected filter options.
function applyFilter() {
    Array.from(el.items).forEach(item => {
        var result = match(item);
        var matches = [];
        item.classList.remove('selected');

        if (result.price.length) {
            if (result.price.includes(true)) {
                matches.push(true);
            } else {
                matches.push(false);
            }
        }

        if (result.person.length) {
            if (result.person.includes(true)) {
                matches.push(true);
            } else {
                matches.push(false);
            }
        }

        if (result.categ.length) {
            if (result.categ.includes(true)) {
                matches.push(true);
            } else {
                matches.push(false);
            }
        }

        var count = 0;
        for (var i = 0; i < matches.length; ++i) {
            if (matches[i] == true) count++;
        }

        if (matches.length && matches.length == count) {
            item.classList.add('selected');
            item.style.display = 'block'; // Show the matching card
        } else {
            item.classList.remove('selected');
            item.style.display = 'none'; // Hide the non-matching card
        }
    });

    renderCount(el.list.querySelectorAll('.selected').length);
}


function isFilter() {
    var filter = false;
    Array.from(el.filtersList).some(input => {
        if (input.checked) {
            filter = true;
        }
    });
    return filter;
}

function onFilterChange(input) {
    var filtered = false;
    if (input.checked) {
        filtered = true;
    } else {
        filtered = isFilter();
    }

    if (filtered) {
        el.list.classList.add('filtered');
        applyFilter();
    } else {
        el.list.classList.remove('filtered');
        renderCount(el.items.length);
    }
}

function onDocumentReady() {
    el.filters = document.querySelector('.sidebar');
    el.filtersList = el.filters.querySelectorAll('input[type="checkbox"]');
    el.list = document.querySelector('.initiatieven-cards');
    el.items = el.list.querySelectorAll('.card');
    el.heading = document.querySelector('header h1');

    renderCount(el.items.length);

    Array.from(el.filtersList).forEach(input => {
        input.addEventListener('change', (event) => {
            onFilterChange(event.target);
        });
    });
}
function renderMatchCount(count) {
    var matchCountElement = document.getElementById("match-count");
    if (matchCountElement) {
        matchCountElement.textContent = `${count} Matches`;
    }
}

// Update the renderCount function to call renderMatchCount
function renderCount(count) {
    renderMatchCount(count);
}
