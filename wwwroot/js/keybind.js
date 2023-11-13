var transfer_keybind = document.querySelector('#transferkb-btn');

transfer_keybind.addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#transferkb').innerHTML = ``;
    alert("Click on the keys you want for keybind")
    document.querySelector('#transferkb-btn').style.display = "none";
    document.querySelector('#confirm-transferkb-btn').style.display = "block";
    select_keys();

    var selectedKeys = []; // Array to store selected keys

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
            var clickedKey = event.target.textContent;

            // Check if the key already exists in the array
            if (!selectedKeys.includes(clickedKey)) {
                selectedKeys.push(clickedKey);
                updateTransferKB(); // Update the displayed keys
            }
        }

        function updateTransferKB() {
            // Display the selected keys in the #transferkb element
            document.querySelector('#transferkb').innerHTML = selectedKeys.map(function (key) {
                return `<kbd>${key}</kbd>`;
            }).join(' ');
        }
    }

    var confirmButton = document.querySelector('#confirm-transferkb-btn');

    confirmButton.addEventListener('click', function () {
        // Assuming you are using the Fetch API for simplicity
        // You may need to adjust the URL and payload structure based on your server implementation
        fetch('/User/Keybind', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keys: selectedKeys }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server if needed
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
