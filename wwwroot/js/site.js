// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "t") {
        window.location.href = 'User/Transfer';
    }
});

