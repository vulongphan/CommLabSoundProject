document.addEventListener('DOMContentLoaded', () => {
    let intro = document.querySelector(".intro");
    let bsmith = document.querySelector('.blacksmith');
    intro.addEventListener('click', () => {
        intro.classList.add("fade");
        setTimeout(() => {
            bsmith.classList.add("reveal");
        }, 1000);
    })    
});