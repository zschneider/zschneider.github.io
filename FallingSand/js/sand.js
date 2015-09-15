var stage;
var canvas;
var renderer;
var world;
// constants
var SPOUT_WIDTH = 30;
var STARTING_HEIGHT = 1;
var CANVAS_HEIGHT = 384;

var PART_SIZE = 1;
// lol these shouldnt be here
var particle_list = [];
var creation_speed = 3;
var current_iter = 0;
var more = true;

function init() {
    world = new p2.World();
    stage = new PIXI.Container();
    canvas = document.getElementById("game-canvas");
    renderer = PIXI.autoDetectRenderer(canvas.width, 
                                       canvas.height,
                                       {view:canvas});
    stage.scale.y = -1;
    planeShape = new p2.Plane();
    planeBody = new p2.Body({ mass: 0,
                              position: [0, -CANVAS_HEIGHT] });
    planeBody.addShape(planeShape);
    world.addBody(planeBody);
    
    requestAnimationFrame(update);
}

function new_particle_rand() {
    // random within 20 or so center
    var x = canvas.width/2 + Math.floor((Math.random()*SPOUT_WIDTH)-SPOUT_WIDTH/2);
    var boxShape = new p2.Box({ width: PART_SIZE, height: PART_SIZE});
    var boxBody = new p2.Body({
        mass:5,
        position:[x,0],
        velocity:[0,0],
        angle: 0,
        angularVelocity: 0,
        gravityScale: 4
    });
    boxBody.addShape(boxShape);
    world.addBody(boxBody);

    var particle = new Particle(x, STARTING_HEIGHT, boxBody);
    particle_list.push(particle);

    stage.addChild(particle.graphics);
}

function update() {
    var i;
    for (i = 0; i < particle_list.length; i++) {
        particle_list[i].update();
    }
    if (more && current_iter === creation_speed) {
        new_particle_rand();
        current_iter = 0;
    }
    current_iter++;
    world.step(1/60);
    renderer.render(stage);
    requestAnimationFrame(update);
}

var Particle = function (x, y, shape) {
    this.x = x;
    this.y = y;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x66FF99);
    this.graphics.drawRect(this.x, this.y, PART_SIZE, PART_SIZE);
    this.shape = shape;
}

Particle.prototype.update = function () {
    this.graphics.clear()
    this.graphics.beginFill(0x66FF99);
    this.graphics.drawRect(this.shape.position[0], this.shape.position[1], PART_SIZE, PART_SIZE);


    // if (this.y > CANVAS_HEIGHT) {
    //     more = false;
    // }
    // else {
    //     this.y += FALLING_SPEED;
    //     this.graphics.clear();
    //     
    // }
}