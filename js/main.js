var canvasWidth = 400;
var canvasHeight = 400;

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas");
}

var points = [];
var top_left_x = 100,
  top_left_y = 100;
var player_x = top_left_x,
  player_y = top_left_y;
var player_size = 35;
var cells_num = 3;
var cell_width = 100,
  step = 100;
var point_size = 20;
var visited = [{ x: player_x, y: player_y }];

// positions of 9 locations
// var locations = {
//   0_0: 'The Hill',
//   0_1: 'The Camp',
//   0_2: 'The Cave',
//   1_0: 'The Blacksmith',
//   1_1: 'The Town Square',
//   1_2: 'The Forest',
//   2_0: 'The Tavern',
//   2_1: 'Starting Point',
//   2_2: 'The Market'
// }

var order = [];

// populate points
for (let i = 0; i < cells_num; i++) {
  for (let j = 0; j < cells_num; j++) {
    points.push([top_left_x + cell_width * i, top_left_y + cell_width * j]);
  }
}

// console.log(points);

function draw() {
  background(0);
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    if (visited.some((pos) => pos.x === x && pos.y === y)) {
      fill("red");
    } else {
      noFill();
      stroke('white');
    }
    ellipse(x, y, point_size, point_size);
  }
  fill("purple");
  ellipse(player_x, player_y, player_size);
}

function updateVisitedArray() {
  if (!visited.some((pos) => pos.x === player_x && pos.y === player_y)) {
    visited.push({ x: player_x, y: player_y });
  }
}

function control() {
  let left_arrow = document.getElementById("left");
  let right_arrow = document.getElementById("right");
  let up_arrow = document.getElementById("up");
  let down_arrow = document.getElementById("down");

  left_arrow.addEventListener("click", () => {
    if (player_x > top_left_x) player_x -= step;
    updateVisitedArray();
  });
  right_arrow.addEventListener("click", () => {
    if (player_x < top_left_x + cell_width * (cells_num - 1)) player_x += step;
    updateVisitedArray();
  });
  up_arrow.addEventListener("click", () => {
    if (player_y > top_left_y) player_y -= step;
    updateVisitedArray();
  });
  down_arrow.addEventListener("click", () => {
    if (player_y < top_left_y + cell_width * (cells_num - 1)) player_y += step;
    updateVisitedArray();
  });
}

let dialogues = [];
let userDialogues = [
    
]

for (let i = 0; i < 20; i++) {
    let audio = {
        file: new Audio("dialogues/r"+1+".m4a"),
        played: false
    };
    dialogues.push(audio);
}

let dialogueCounter = 0;

// function fadeOut(element) {
//     element.classList
// }
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
                    let canvas = document.getElementById("canvas");
                    // canvas.classList.add("reveal");
                    canvas.style.opacity = 1;
                    
                })
            }
        }, 1000);
    })    

    control();


});
