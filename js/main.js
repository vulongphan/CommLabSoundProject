let dialogues = [];

for (let i = 0; i < 20; i++) {
    let audio = {
        file: new Audio("dialogues/r"+1+".m4a"),
        played: false
    };
    dialogues.push(audio);
}

let dialogueCounter = 0;

// console.log(sounds);

// universal event listener
document.addEventListener('DOMContentLoaded', () => {
    let intro = document.querySelector(".intro");
    let bsmith = document.querySelector('.blacksmith');
    let controls = document.querySelector(".controls");

    intro.addEventListener('click', () => {
        intro.classList.add("fade");
        setTimeout(() => {
            intro.remove();
        }, 1000);
        setTimeout(() => {
            bsmith.classList.add("reveal");
            if (!dialogues[dialogueCounter].played) {
                dialogues[dialogueCounter].file.play();
                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                    controls.classList.add("reveal");
                    dialogues[dialogueCounter].played = true;
                })
            }
        }, 1000);
    })    


});