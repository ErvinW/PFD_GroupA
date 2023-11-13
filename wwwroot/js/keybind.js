var addbuttons = document.querySelectorAll('.add-keybind');

for (var i = 0; i < addbuttons.length; i++) {
    var addbutton = addbuttons[i];
    addbutton.addEventListener('click', addbuttonclicked);
}

function addbuttonclicked(event) {
    event.preventDefault();
    alert("Click on the keys you want for keybind");
    var button = event.target
    key_display = button.parentElement.previousElementSibling
    button.parentElement.previousElementSibling.innerHTML = ``
    button.style.display = "none";
    button.previousElementSibling.style.display = "block";
    var selectedKeys = [];
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
            var clickedKey = event.target.textContent;

            // Check if the key already exists in the array
            if (!selectedKeys.includes(clickedKey)) {
                selectedKeys.push(clickedKey);
                console.log(selectedKeys)
                addKeyDisplay(); // Update the displayed keys
            }
        }

        function addKeyDisplay() {
            // Display the selected keys in the #transferkb element
            key_display.innerHTML = selectedKeys.map(function (key) {
                return `<kbd>${key}</kbd>`;
            }).join(' ');
        }
    }


    var doneButton = button.parentElement.querySelector('.done-keybind');
    doneButton.addEventListener('click', function () {
        sendKeysToServer(selectedKeys);
    });

    function sendKeysToServer(keys) {
        // Make an AJAX request to the server
        $.ajax({
            url: '/User/Keybind',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(keys),
            success: function (response) {
                console.log(response);
                // Handle the response from the server if needed
            },
            error: function (error) {
                console.error('Error sending keys to the server', error);
            }
        });
    }
}



