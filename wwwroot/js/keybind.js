document.addEventListener('DOMContentLoaded', function () {
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

            // keyboard keys
            for (var i = 0; i < key_letters.length; i++) {
                var key = key_letters[i];
                key.addEventListener('click', letterClicked);
            }

            function letterClicked(event) {
                var clickedKey = event.target.textContent;
                console.log(clickedKey)

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
            var pageName = doneButton.parentElement.previousElementSibling.previousElementSibling.textContent;
            sendKeysToServer(selectedKeys, pageName);
        });

        function sendKeysToServer(keys, pageName) {
            // Include pageName in the data object
            var dataToSend = {
                keys: keys,
                pageName: pageName
            };

            // Make an AJAX request to the server
            $.ajax({
                url: '/User/Keybind',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(dataToSend), // Send the updated data object
                success: function (response) {
                    console.log(response);
                    // Handle the response from the server if needed
                },
                error: function (error) {
                    console.error('Error sending keys to the server', error);
                }
            });

            window.location.href = '/User/Index';

        }

    }





    // DELETE //
    // Add an event listener to the delete button
    // Select all delete buttons
    var deleteButtons = document.querySelectorAll('.delete-kb-btn');

    // Attach click event handler to each delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', deleteButtonClicked);
    });

    function deleteButtonClicked(event) {
        event.preventDefault();

        // Confirm the deletion with the user if needed
        var confirmation = confirm("Are you sure you want to delete?");
        if (!confirmation) {
            return;
        }
        //var pageName = event.parentElement.previousElementSibling.previousElementSibling.textContent;
        var pageName = "HomePage"
        // Make an AJAX request to the server to call the Delete action
        $.ajax({
            url: '/User/Delete', // Replace with the actual URL of your Delete action
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(pageName), // Send the itemId to the server
            success: function (response) {
                // Handle the success response if needed
                console.log(response);
                // Redirect to another page or update the UI as necessary
                window.location.href = '/User/Index'; // Redirect to the Index page, for example
            },
            error: function (error) {
                console.error('Error deleting data', error);
            }
        });
    }


});

