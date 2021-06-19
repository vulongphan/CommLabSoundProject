var canvasWidth = 400;
var canvasHeight = 400;

function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent("canvas");
}

var points = [];
var top_left_x = 100,
  top_left_y = 100;
var text_offset_x = 25, text_offset_y = 45, textbox_width = 75;

var player_size = 35;
var cells_num = 3;
var cell_width = 100,
  step = 100;
var player_x = top_left_x + 1 * cell_width,
player_y = top_left_y + 2 * cell_width;
var point_size = 20;
var visited = [{ x: player_x, y: player_y }]; // array of coordinates of correctly visited locations

// positions of 9 locations
var locations = {
  x0_y0: 'The Hill',
  x1_y0: 'The Camp',
  x2_y0: 'The Cave',
  x0_y1: 'The Blacksmith',
  x1_y1: 'The Town Square',
  x2_y1: 'The Forest',
  x0_y2: 'The Tavern',
  x1_y2: 'Starting Point',
  x2_y2: 'The Market'
}

// note that Town Square is not part of the order
var order = [[1,2],[0,1],[2,1],[0,2],[2,2],[2,0],[1,0],[0,0]];

var progress = 0; // index of current position in order array


// populate points
for (let i = 0; i < cells_num; i++) {
  for (let j = 0; j < cells_num; j++) {
    points.push([top_left_x + cell_width * i, top_left_y + cell_width * j]);
  }
}

console.log(points);

function draw() {
  background(0);
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    let x_next = top_left_x + cell_width * order[progress][0]; // x value of the next position to be visited in order
    let y_next = top_left_y + cell_width * order[progress][1]; // y value of the next position to be visited in order
    let coordinates_att = 'x'+ ((x-top_left_x)/cell_width).toString()+'_'+'y'+((y-top_left_y)/cell_width).toString();
    let location_name = locations[coordinates_att];

    if (player_x == x_next && player_y == y_next) { // if player reaches the next location in the order to be visited
      progress += 1; // update progress
      updateVisitedArray(); // update visited array
      console.log("Correct location visited!!!!");
    }
    if ((visited.some((pos) => pos.x === x && pos.y === y))){ // if this location has been visited in the correct order
      fill("red");
    } else {
      noFill();
      stroke('white');
    }
    text(location_name, x-text_offset_x, y-text_offset_y, textbox_width);
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
  });
  right_arrow.addEventListener("click", () => {
    if (player_x < top_left_x + cell_width * (cells_num - 1)) player_x += step;
  });
  up_arrow.addEventListener("click", () => {
    if (player_y > top_left_y) player_y -= step;
  });
  down_arrow.addEventListener("click", () => {
    if (player_y < top_left_y + cell_width * (cells_num - 1)) player_y += step;
  });
}

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
                    let canvas = document.getElementById("canvas");
                    // canvas.classList.add("reveal");
                    canvas.style.opacity = 1;
                    
                })
            }
        }, 1000);
    })    

    control();


});
