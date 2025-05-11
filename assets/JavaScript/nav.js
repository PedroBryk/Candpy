const toggleBtn = document.querySelector('.toggle');

const menu = document.querySelector('nav.menu');

toggleBtn.addEventListener('click', function(){

    menu.classList.toggle('active');
    
});