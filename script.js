// script.js
document.addEventListener('DOMContentLoaded', () => {
    const dropdowns = document.querySelectorAll('.navbar li');
    dropdowns.forEach(drop => {
        drop.addEventListener('mouseenter', () => {
            const submenu = drop.querySelector('ul');
            if(submenu) submenu.style.display = 'block';
        });
        drop.addEventListener('mouseleave', () => {
            const submenu = drop.querySelector('ul');
            if(submenu) submenu.style.display = 'none';
        });
    });
});