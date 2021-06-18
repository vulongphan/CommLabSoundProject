function setup() {
	createCanvas(400, 400);
}

var points = [];
var top_left_x = 100, top_left_y = 100;
var cells_num = 3;
var cell_width = 100;
// populate points
for (let i = 0; i < cells_num; i++){
  for (let j = 0; j < cells_num; j++){
    points.push([top_left_x + cell_width*i, top_left_y + cell_width*j]);
  }
}

var point_size = 20;

console.log(points);

function draw() {
	background(220);
	for (let i = 0; i < points.length; i++) {
      let x = points[i][0];
      let y = points[i][1];
      ellipse(x,y, point_size, point_size);
    }
}