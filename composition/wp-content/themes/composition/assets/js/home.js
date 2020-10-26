document.addEventListener('DOMContentLoaded', function() {
    let home = document.getElementsByClassName('menu-item-home')[0].firstChild;

    home.innerHTML = '<img src="./wp-content/themes/composition/assets/img/home-minimal.svg">';

    console.log(home);
});