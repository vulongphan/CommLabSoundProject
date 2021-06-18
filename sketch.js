function setup() {
  createCanvas(400, 400);
}

var points = [];
var top_left_x = 100,
  top_left_y = 100;
var player_x = top_left_x,
  player_y = top_left_y;
var player_size = 25;
var cells_num = 3;
var cell_width = 100,
  step = 100;
var point_size = 20;
var visited = [{x:player_x, y:player_y}];

// populate points
for (let i = 0; i < cells_num; i++) {
  for (let j = 0; j < cells_num; j++) {
    points.push([top_left_x + cell_width * i, top_left_y + cell_width * j]);
  }
}

function draw() {
  background(220);
  for (let i = 0; i < points.length; i++) {
    let x = points[i][0];
    let y = points[i][1];
    if (visited.some(pos => pos.x === x && pos.y === y)) stroke("red");
    else noStroke();
    ellipse(x, y, point_size, point_size);
  }
  stroke("purple");
  ellipse(player_x, player_y, player_size);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && player_x > top_left_x) {
    player_x -= step;
  } else if (
    keyCode === RIGHT_ARROW &&
    player_x < top_left_x + cell_width * (cells_num - 1)
  ) {
    player_x += step;
  } else if (keyCode === UP_ARROW && player_y > top_left_y) {
    player_y -= step;
  } else if (
    keyCode === DOWN_ARROW &&
    player_y < top_left_y + cell_width * (cells_num - 1)
  ) {
    player_y += step;
  }
  // update visited array
  if (!visited.some(pos => pos.x === player_x && pos.y === player_y)) {
    visited.push({x:player_x, y:player_y});
  }
}
