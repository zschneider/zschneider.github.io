function init() {
	var canvas = document.getElementById("demoCanvas");
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight;

	stage = new createjs.Stage("demoCanvas");
	createjs.Ticker.addEventListener("tick",handleTick);
	window.addEventListener("keydown",handleKeyPress,true);
	setWorldProperties();
	drawthecircle();
}

var circleProps = {
	vy: 0,
	vx: 0,
	ay: 0,
	ax: 0,
	m: 0.1,
	dt: 0.05,
	e: -0.5,
	r: 10,
	A: 0
}

function setWorldProperties() {
	rho = 1.2 //Density of air
	C_d = 0.47 //Coefficient of drag for a ball
}

function drawthecircle() {
	circle = new createjs.Shape();
	circleProps.A = Math.PI * circleProps.r * circleProps.r / 10000;
	circle.graphics.beginFill("red").drawCircle(0,0,circleProps.r);

	circle.x = circle.y = 50;

	stage.addChild(circle);
}

function handleTick() {
	var fy = 0;
	var fx = 0;
	// Gravity
	fy += circleProps.m * 9.81;

	fy += -1 * 0.5 * rho * C_d * circleProps.A * circleProps.vy * circleProps.vy;
	if (circleProps.vx > 0) {
		fx += -1 * 0.5 * rho * C_d * circleProps.A * circleProps.vx * circleProps.vx;
	}
	if (circleProps.vx < 0) {
		fx += 1 * 0.5 * rho * C_d * circleProps.A * circleProps.vx * circleProps.vx;
	}
	dy = circleProps.vy * circleProps.dt + (0.5 * circleProps.ay * circleProps.dt * circleProps.dt)
	dx = circleProps.vx * circleProps.dt + (0.5 * circleProps.ax * circleProps.dt * circleProps.dt)

	circle.y += dy * 100;
	circle.x += dx * 100;

	new_ay = fy / circleProps.m;
	new_ax = fx / circleProps.m;

	avg_ay = 0.5 * (new_ay + circleProps.ay);
	avg_ax = 0.5 * (new_ax + circleProps.ax);

	circleProps.vy += avg_ay * circleProps.dt;
	circleProps.vx += avg_ax * circleProps.dt;

	if (circle.y + circleProps.r > stage.canvas.height && circleProps.vy > 0) {
		circleProps.vy *= circleProps.e;
		circle.y = stage.canvas.height - circleProps.r;
	}
	if (circle.x > stage.canvas.width) { circle.x = 0; }
	//if (circle.y > stage.canvas.height) { circle.y = 0; }
	//if (circle.y < 0) { circle.y = stage.canvas.height; }
	if (circle.x < 0) { circle.x = stage.canvas.width; }
	stage.update();
}

function handleKeyPress(e) {
	if (e.keyCode == 87 || e.keyCode == 38) {
		moveUp();
	}
	if (e.keyCode == 65 || e.keyCode == 37) {
		moveLeft();
	}
	if (e.keyCode == 68 || e.keyCode == 39) {
		moveRight();
	}
	if (e.keyCode == 83 || e.keyCode == 40) {
		moveDown();
	}
}

function moveUp() {
	//circle.y -= 10;
	circleProps.vy -= 2;
}

function moveDown() {
	//circle.y += 10;
	circleProps.vy += 2;
}

function moveLeft() {
	//circle.x -= 10;
	circleProps.vx -= 2;

}

function moveRight() {
	//circle.x += 10;
	circleProps.vx += 2;
}
