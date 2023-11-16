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
        doneButton.addEventListener('click', function (e) {
            console.log(selectedKeys.join(' '))
            if (keybindsExist(selectedKeys) == false) {
                var pageName = doneButton.parentElement.previousElementSibling.previousElementSibling.textContent;
                sendKeysToServer(selectedKeys, pageName);
            }
            else {
                console.log(doneButton)
                console.log(e.target)
                e.target.style.display = "none";
                doneButton.nextElementSibling.style.display = "block";
                doneButton.parentElement.previousElementSibling.innerHTML = '';
                return
            }

        });
        

        function sendKeysToServer(keys, pageName) {
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

            setTimeout(function () {
                location.reload();
            }, 100);
        }



    }





    // DELETE //

    // Select all delete buttons
    var deleteButtons = document.querySelectorAll('.delete-kb-btn');

    // Attach click event handler to each delete button
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', deleteButtonClicked);
    });

    function deleteButtonClicked(event) {
        event.preventDefault();

        var confirmation = confirm("Are you sure you want to delete?");
        if (!confirmation) {
            return;
        }

        var pageName = event.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        
        // Make an AJAX request to the server to call the Delete action
        $.ajax({
            url: '/User/Delete', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(pageName), 
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.error('Error deleting data', error);
            }
        });

        setTimeout(function () {
            location.reload();
        }, 100);
    }

    // EDIT //

    var editButtons = document.querySelectorAll('.edit-kb-btn');

    editButtons.forEach(function (button) {
        button.addEventListener('click', editButtonClicked);
    });

    function editButtonClicked(event) {
        event.preventDefault();

        alert("Click on the new keys");
        var button = event.target;
        key_display = button.parentElement.previousElementSibling;
        var store = key_display.innerHTML
        button.parentElement.previousElementSibling.innerHTML = ``;
        button.style.display = "none"
        button.nextElementSibling.nextElementSibling.style.display = "none";
        button.nextElementSibling.style.display = "block";
        var selectedKeys = [];
        select_keys();

        var doneEditButton = button.nextElementSibling
        console.log(store)
        doneEditButton.addEventListener('click', function (e) {
            if (keybindsExist(selectedKeys) == false) {
                var pageName = doneEditButton.parentElement.previousElementSibling.previousElementSibling.textContent;
                sendKeysToServer(selectedKeys, pageName);
            }
            else {
                doneEditButton.previousElementSibling.style.display = "inline-block";
                e.target.style.display = "none";
                doneEditButton.nextElementSibling.style.display = "inline-block";
                console.log(store)
                //doneEditButton.parentElement.previousElementSibling.innerHTML = '';
                doneEditButton.parentElement.previousElementSibling.innerHTML = store;
                return
            }
            
        });

        

        function sendKeysToServer(keys, pageName) {
            // Include pageName in the data object
            var dataToSend = {
                keys: keys,
                pageName: pageName
            };
            console.log(pageName)

            // Make an AJAX request to the server
            $.ajax({
                url: '/User/Edit',
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

            setTimeout(function () {
                location.reload();
            }, 100);
        }


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
    }

    function keybindsExist(keybindToCheck) {
        var displaykbElements = document.querySelectorAll(".keybind-display");
        var keybindDisplayList = [];

        displaykbElements.forEach(function (element) {
            var kbdItems = Array.from(element.querySelectorAll("kbd"));
            var keybindText = kbdItems.map(function (kbdItem) {
                return kbdItem.textContent.trim();
            }).join(' ');

            if (keybindText !== "") {
                keybindDisplayList.push(keybindText);
            }
        });

        console.log(keybindDisplayList)
        console.log(keybindToCheck);
        
        for (var x = 0; x < keybindDisplayList.length; x++) {
            temp = keybindDisplayList[x].split(' ')
            if (areListsSimilar(temp, keybindToCheck)) {
                return true
            };
            
            function areListsSimilar(list1, list2) {
                // Check if the length of both lists is the same
                if (list1.length !== list2.length) {
                    return false;
                }

                // Sort the lists and compare the sorted arrays
                var sortedList1 = list1.slice().sort();
                var sortedList2 = list2.slice().sort();

                // Convert the sorted arrays to strings and compare them    
                return sortedList1.join('') === sortedList2.join('');
            }
            

        }
        return false
    }


});

