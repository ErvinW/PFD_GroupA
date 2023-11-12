var transfer_keybind = document.querySelector('#transferkb-btn');

transfer_keybind.addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#transferkb').innerHTML = ``;
    alert("Click on the keys you want for keybind")
    document.querySelector('#transferkb-btn').style.display = "none";
    document.querySelector('#confirm-transferkb-btn').style.display = "block";
    select_keys();
    

    function select_keys() {
        var key_letters = document.querySelectorAll('.key--letter');

        // Remove existing click event listeners from keys
        key_letters.forEach(function (key) {
            key.removeEventListener('click', letterClicked);
        });

        for (var i = 0; i < key_letters.length; i++) {
            var key = key_letters[i];
            key.addEventListener('click', letterClicked);
        }

        function letterClicked(event) {
            tempElement = document.querySelector('#transferkb').innerHTML;
            // Check if the letter exists 
            tempElement.includes(`<kbd>${event.target.textContent}</kbd>`)
                ? null // Letter already exists, do nothing
                : document.querySelector('#transferkb').innerHTML += `<kbd>${event.target.textContent}</kbd>`;

        }
    }
});