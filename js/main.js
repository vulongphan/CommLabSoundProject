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
var order = [[1,2],[0,1],[2,1],[0,2],[2,2],[2,0],[1,0],[0,0],[99,99]];


var progress = 0; // index of current position in order array


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
      fill("white");
      text(location_name, x-text_offset_x, y-text_offset_y, textbox_width);
    } else {
      noFill();
      stroke('white');
    }
    
    ellipse(x, y, point_size, point_size);
  }
  fill("grey");
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

// +4 new dialogues
let dialogues = [];
for (let i = 1; i <= 23; i++) {
    let audio = {
        file: new Audio("dialogues/r"+ i +".ogg"),
        played: false
    };
    dialogues.push(audio);
}
dialogues[23] = {
    file: new Audio("dialogues/r1.m4a"),
    played: false
};
dialogues[24] = {
    file: new Audio("dialogues/r1.m4a"),
    played: false
};
dialogues[25] = {
    file: new Audio("dialogues/r1.m4a"),
    played: false
};
dialogues[26] = {
    file: new Audio("dialogues/r1.m4a"),
    played: false
};
dialogues[27] = {
    file: new Audio("dialogues/r1.m4a"),
    played: false
};

let bgSounds = {
    start: new Audio("sounds/x1_y2.ogg"),
    blacksmith: new Audio("sounds/x0_y1.ogg"),
    forest: new Audio("sounds/x2_y1.ogg"),
    tavern: new Audio("sounds/x0_y2.ogg"),
    market: new Audio("sounds/x2_y2.ogg"),
    cave: new Audio("sounds/x2_y0.ogg"),
    camp: new Audio("sounds/x1_y0.ogg"),
    hill: new Audio("sounds/x0_y0.ogg"),
    ts: new Audio("sounds/x1_y1.ogg")
}

let dialogueCounter = 0;

function playBgSound() {
    let x = (player_x - top_left_x)/cell_width;
    let y = (player_y - top_left_y) / cell_width;
    if (x == 0 && y == 0) {
        // todo
        bgSounds.hill.play();
        bgSounds.hill.loop = true;
    } else if (x == 0 && y == 1) {
        // todo
        bgSounds.blacksmith.play();
        bgSounds.blacksmith.loop = true;
    } else if (x == 0 && y == 2) {
        // todo
        bgSounds.tavern.play();
        bgSounds.tavern.loop = true;
    } else if (x == 1 && y == 0) {
        // todo
        bgSounds.camp.play();
        bgSounds.camp.loop = true;
    } else if (x == 1 && y == 1) {
        // todo
        bgSounds.ts.play();
        bgSounds.ts.loop = true;
    } else if (x == 1 && y == 2) {
        // todo
        bgSounds.start.play();
        bgSounds.start.loop = true;
    } else if (x == 2 && y == 0) {
        // todo
        bgSounds.cave.play();
        bgSounds.cave.loop = true;
    } else if (x == 2 && y == 1) {
        // todo
        bgSounds.forest.play();
        bgSounds.forest.loop = true;
    } else if (x == 2 && y == 2) {
        // todo
        bgSounds.market.play();
        bgSounds.market.loop = true;
    }
}

function stopBgSound() {
    for (let key in bgSounds) {
        if (!bgSounds[key].paused) {
            bgSounds[key].pause();
            bgSounds[key].currentTime = 0;
        }
    }
}

function fadeOut(element) {
    element.classList.remove("reveal");
    element.style.pointerEvents = "none";
    setTimeout(() => {
        element.remove();
    }, 1000);
}

// universal event listener
document.addEventListener('DOMContentLoaded', () => {
    let intro = document.querySelector(".intro");
    let canvas = document.getElementById("canvas");
    let controls = document.querySelector(".controls");
    let ud = document.querySelectorAll(".dialogue p");
    let udCounter = 0;

    // main intro cover title
    intro.addEventListener('click', () => {
        // remove the title cover
        intro.classList.add("fade");
        setTimeout(() => {
            intro.remove();
        }, 1000);

        // bsmtih has our canvas, so reveal it
        // making sure that it only plays once even when clicked multiple times
        if (!dialogues[dialogueCounter].played) {
            // playing the first dialogue
            // Narrator/Spirit: The Capital...broom poking someone)
            dialogues[dialogueCounter].file.play();
            
            // NOTE: needs rework
            playBgSound();
            dialogues[dialogueCounter].file.addEventListener("ended", () => {
                dialogueCounter++;
                // User: Please, sir, you have to help me-- our kingdom is in danger. I need to collect the three ancient gemstones!
                ud[udCounter].classList.add("reveal");
                ud[udCounter].addEventListener('click', () => {
                    fadeOut(ud[udCounter]);
                    udCounter++;
                    // Stranger: Rough night? Been there. Alright, just go home.
                    dialogues[dialogueCounter].file.play();
                    dialogues[dialogueCounter].file.addEventListener("ended", () => {
                        dialogueCounter++;
                        // User: I have to procure a weapon. The kingdom is in danger!
                        ud[udCounter].classList.add("reveal");
                        ud[udCounter].addEventListener('click', () => {
                            fadeOut(ud[udCounter]);
                            udCounter++;
                            // Stranger: Something's definitely off with your head. I heard the Blacksmith has really good hangover cures though.
                            dialogues[dialogueCounter].file.play();
                            dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                dialogueCounter++;
                                // User: Yes! A blacksmith! Show me the way!
                                ud[udCounter].classList.add("reveal");
                                ud[udCounter].addEventListener('click', () => {
                                    fadeOut(ud[udCounter]);
                                    udCounter++;
                                    // Stranger: Go north, to the town square, and then turn left.
                                    dialogues[dialogueCounter].file.play();
                                    dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                        dialogueCounter++;
                                        // show popup here
                                        console.log("Find the Blacksmith");
                                        controls.classList.add("reveal");
                                        canvas.classList.add("reveal");
                                        
                                    })
                                })
                            })
                        })
                    })
                })
            })
            
        }

        let controlButtons = document.querySelectorAll(".controls div");
        controlButtons.forEach(btn  => {
            // the first interaction happens outside this "loop"
            
            btn.addEventListener("click", () => {
                stopBgSound();
                playBgSound();
                let x = player_x / 100 - 1;
                let y = player_y / 100 - 1;
                // console.log(order[progress]);
                if (progress <= 7) {
                    if (order[progress][0] == x && order[progress][1] == y) {
                        playBgSound();
                        // 2,1 not here because we already covered the start story before
                        controls.classList.remove("reveal");
                        canvas.classList.remove("reveal");
                        if (x == 0 && y == 0) {
                            // The Hill
                            if (!dialogues[dialogueCounter].played) {
                                // Crowd (far away): He stole the pig! Find him! Look behind those rocks!
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                    dialogueCounter++;
                                    // User: Finally... I complete my fate. O Gems, show me the way to save my people!
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // (paper rumbling sounds)
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: huh?
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // (paper rumbling sounds)
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // User: What do I do now?
                                                    ud[udCounter].classList.add("reveal");
                                                    ud[udCounter].addEventListener('click', () => {
                                                        fadeOut(ud[udCounter]);
                                                        udCounter++;
                                                        // (paper rumbling sounds)
                                                        dialogues[dialogueCounter].file.play();
                                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                            dialogueCounter++;
                                                            // User:  Are you there?
                                                            ud[udCounter].classList.add("reveal");
                                                            ud[udCounter].addEventListener('click', () => {
                                                                fadeOut(ud[udCounter]);
                                                                udCounter++;
                                                                dialogues[dialogueCounter].file.play();
                                                                // NOTE: the user may be left thinking if it has ended or not
                                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {

                                                                    // the end
                                                                    document.querySelector(".credits").classList.add("reveal");
                                                                    console.log("the end");
                                                                })






                                                            })
                                                        })





                                                    })
                                                })






                                            })
                                        })





                                    })
                                })
                            }
                            // console.log("hill");
                            
                        } else if (x == 1 && y == 0) {
                            // The Camp
                            if (!dialogues[dialogueCounter].played) {
                                // Stranger 5: Welcome to Camp Longhorn! Fancy a marshmellow?
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                    dialogueCounter++;
                                    // User: I'd rather have the freshest game you've hunted today.
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Stranger 2: Then come by the bonfire. We're roasting the biggest wild mini pig ever seen in this forest.
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: So, a regular pig?
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // Narrator/Spirit: The prophecies say the last gem shall be earned by a test of fire. This mini pig is too magnificent to be just a coincidence...
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // User: I'm pretty sure this is a normal pig...
                                                    ud[udCounter].classList.add("reveal");
                                                    ud[udCounter].addEventListener('click', () => {
                                                        fadeOut(ud[udCounter]);
                                                        udCounter++;
                                                        // Narrator/Spirit: There is no time, Prince! A storm is approaching. Grab the animal, and run to the hills!
                                                        dialogues[dialogueCounter].file.play();
                                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                            dialogueCounter++;
                                                            // show popup here
                                                            console.log("Run west to the hills");
                                                            controls.classList.add("reveal");
                                                            canvas.classList.add("reveal");
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                            // console.log("camp");
                            
                        } else if (x == 2 && y == 0) {
                            // The Cave
                            if (!dialogues[dialogueCounter].played) {
                                // Miner: Hey, you can't come in here without a hard hat!
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                    dialogueCounter++;
                                    // User: How dare you speak like that to a Prince?!
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Miner: Where do you think you're going?
                                        // Narrator/Spirit: Let's hide here. Keep the gems close to you - the miners can steal them.
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // Run towards cave
                                            console.log("Find a place to stay");
                                            controls.classList.add("reveal");
                                            canvas.classList.add("reveal");
                                        })
                                    })
                                })
                            }
                            // console.log("cave");
                            
                        } else if (x == 0 && y == 1) {
                            // The BlackSmith
                            if (!dialogues[dialogueCounter].played) {
                                // Stranger 2: Welcome to the Blacksmith, traveller. How can I help you?
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                    dialogueCounter++;
                                    // User: Blacksmith, forge me a magical weapon to defeat the forces of darkness.
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Stranger 2: Ah, yeah... I'm actually not the Blacksmith, sorry... Are you okay, dude? You seem beaten up.
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: User: Direct me to the Blacksmith, at once!
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // Stranger: Go north, to the town square, and then turn left.
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // show popup here
                                                    console.log("Find the forest");
                                                    controls.classList.add("reveal");
                                                    canvas.classList.add("reveal");
                                                    
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                            // console.log("bsmith");
                            
                        } else if (x == 1 && y == 1) {
                            // The Town Square
                            
                            // console.log("ts");
                            
                        } else if (x == 2 && y == 1) {
                            // The Forest
                            // Blacksmith! I am here to collect my ancient weapon.
                            ud[udCounter].classList.add("reveal");
                            ud[udCounter].addEventListener('click', () => {
                                fadeOut(ud[udCounter]);
                                udCounter++;
                                // Crazy old man: I am not the Blacksmith! What even is a Blacksmith?
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                    dialogueCounter++;
                                    // User: You speak in riddles, Blacksmith. A wise man indeed.
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Crazy old man: And they say I'm crazy. How many times do I need to tell you I'm not the Blacksmith?
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: I come here in search of the gem of my people.
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // Crazy old man: Just take this, and leave.
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // User: User: The First Gem! And it has an inscription: "Happy hour - south west of the town square"
                                                    ud[udCounter].classList.add("reveal");
                                                    ud[udCounter].addEventListener('click', () => {
                                                        fadeOut(ud[udCounter]);
                                                        udCounter++;
                                                        // show popup here
                                                        console.log("Find the tavern");
                                                        controls.classList.add("reveal");
                                                        canvas.classList.add("reveal");
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                            // console.log("forest");
                            
                        } else if (x == 0 && y == 2) {
                            // The Tavern
                            if (!dialogues[dialogueCounter].played) {
                                // Narrator/Spirit: This doesn't sound like a place for a Prince. But the gems can be hidden in any place...
                                // Innkeeper: Welcome to The Smelly Ukelele. What can I get you?
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                    dialogueCounter++;
                                    // User: I come here to find the Second Magical Gem of my kingdom.
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Stranger 3: This man is already gone. Sit down, I'll buy you a beer.
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: I am the Prince of the Kingdom. I do not partake in such vices.
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // Innkeeper: What do you think we sell at a tavern? Apples?
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // User: Apples! The Second Gem is hidden in an Apple.
                                                    ud[udCounter].classList.add("reveal");
                                                    ud[udCounter].addEventListener('click', () => {
                                                        fadeOut(ud[udCounter]);
                                                        udCounter++;
                                                        // show popup here
                                                        console.log("Find the market");
                                                        controls.classList.add("reveal");
                                                        canvas.classList.add("reveal");
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                            // console.log("tavern");
                            
                        } else if (x == 2 && y == 2) {
                            // The Market
                            if (!dialogues[dialogueCounter].played) {
                                //Narrator/Spirit: You are truly cunning, Prince. Only the greatest minds could have solved that clue. Pick an apple.
                                // Stranger 4: Can you please stop rubbing my apples?
                                dialogues[dialogueCounter].file.play();
                                dialogues[dialogueCounter].file.addEventListener("ended", () => {
                                    dialogueCounter++;
                                    // User: Have you seen an exceptionally big apple? One that looks like an ancient gem, maybe?
                                    ud[udCounter].classList.add("reveal");
                                    ud[udCounter].addEventListener('click', () => {
                                        fadeOut(ud[udCounter]);
                                        udCounter++;
                                        // Stranger 4: This one. It is the most precious apple I have ever picked - and my most valued posession.
                                        // Narrator/Spirit: Stealing is not the way of the enlightened, but the fate of our kingdom depends on it.
                                        dialogues[dialogueCounter].file.play();
                                        dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                            dialogueCounter++;
                                            // User: Tough luck!
                                            ud[udCounter].classList.add("reveal");
                                            ud[udCounter].addEventListener('click', () => {
                                                fadeOut(ud[udCounter]);
                                                udCounter++;
                                                // Stranger 4: Somebody get him!
                                                // Narrator/Spirit: Run north, as far as you can!
                                                dialogues[dialogueCounter].file.play();
                                                dialogues[dialogueCounter].file.addEventListener('ended', () => {
                                                    dialogueCounter++;
                                                    // show popup here
                                                    console.log("Run North to the Cave");
                                                    controls.classList.add("reveal");
                                                    canvas.classList.add("reveal");
                                                    
                                                })
                                            })
                                        })
                                    })
                                })
                            }
                            // console.log("market");
                            
                        }
                    } 
                    // else {
                    //     console.log("not here");
                    //     playBgSound();
                    // }
                } else {
                        
                }
            })
        })
    })    

    control();

});
