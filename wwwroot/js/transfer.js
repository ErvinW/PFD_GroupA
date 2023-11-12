// Get references to the select element and the arrow span
const currencySelect = document.getElementById('currency');
const currencyArrow = document.getElementById('currency-arrow');

// Add an event listener to the select element
currencySelect.addEventListener('change', () => {
    // Check if the selected option's value is not empty
    if (currencySelect.value !== '') {
        // If a currency is selected, add the "arrow-up" class to show the arrow up
        currencyArrow.classList.add('arrow-up');
    } else {
        // If no currency is selected, remove the "arrow-up" class to show the arrow down
        currencyArrow.classList.remove('arrow-up');
    }
});

