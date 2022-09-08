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

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

window.addEventListener('scroll', changeNav);

$('.tabgroup > div').hide();
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function(e){
  e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();
  
})
