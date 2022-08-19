function changeNav(){
    var navbar = document.getElementById('scrolly');
    var scrollVal = window.scrollY;
    if (scrollVal < 150) {
        navbar.classList.remove('scrolled');
    } else {
        navbar.classList.add('scrolled')
    }

}

window.addEventListener('scroll', changeNav);
