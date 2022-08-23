function changeNav(){
    var navbar = document.getElementById('scrolly');
    var scrollVal = window.scrollY;
    if (scrollVal < 150) {
        navbar.classList.remove('scrolled');
    } else {
        navbar.classList.add('scrolled')
    }

}

function navbarAdjustments() {
    var navbar = document.getElementById('scrolly');
    var scrollVal = window.scrollY;
    if (scrollVal < 151) {
        console.log("ok, blue")
        navbar.classList.contains('scrolled') ? navbar.classList.remove('scrolled') : navbar.classList.add('scrolled')
    }else {
        console.log("no color change")
    }
    
}


window.addEventListener('scroll', changeNav);