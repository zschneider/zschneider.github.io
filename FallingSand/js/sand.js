var stage;
var canvas;
var renderer;

// constants
var SPOUT_WIDTH = 30;
var STARTING_HEIGHT = -1;
var FALLING_SPEED = .2;
var CANVAS_HEIGHT = 384;
// lol these shouldnt be here
var particle_list = [];
var creation_speed = 3;
var current_iter = 0;
var more = true;

function init() {
    stage = new PIXI.Container();
    canvas = document.getElementById("game-canvas");
    renderer = PIXI.autoDetectRenderer(canvas.width, 
                                       canvas.height,
                                       {view:canvas});

    requestAnimationFrame(update);
}

function new_particle_rand() {
    // random within 20 or so center
    var x = canvas.width/2 + Math.floor((Math.random()*SPOUT_WIDTH)-SPOUT_WIDTH/2);
    

    var particle = new Particle(x, STARTING_HEIGHT);
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
    renderer.render(stage);
    requestAnimationFrame(update);
}

var Particle = function (x, y) {
    this.x = x;
    this.y = y;
    this.graphics = new PIXI.Graphics();
    this.graphics.beginFill(0x66FF99);
    this.graphics.lineStyle(1, 0x66FF99);
    this.graphics.drawRect(this.x, this.y, 1, 1);
}

Particle.prototype.update = function () {
    if (this.y > CANVAS_HEIGHT) {
        more = false;
    }
    else {
        this.y += FALLING_SPEED;
        this.graphics.clear();
        this.graphics.beginFill(0x66FF99);
        this.graphics.lineStyle(1, 0x66FF99);
        this.graphics.drawRect(this.x, this.y, 1, 1);
    }
}