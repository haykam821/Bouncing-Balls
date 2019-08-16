window.addEventListener("error", error => document.body.innerText = error);

const debug = document.getElementById("debug");

const can = document.getElementById("d");
can.width = window.innerWidth;
can.height = window.innerHeight;

const ctx = can.getContext("2d");

/**
 * Returns the exit bounce angle of an object off a surface.
 * @param {number} incoming The angle the object is incoming at.
 * @param {number} surface The angle of the surface to bounce off of.
 * @returns {number} The exit angle.
 */
function bounceAngle(incoming = 0, surface = 0) {
	const angle = surface * 2 - incoming;
	if (angle >= 360) {
		return angle - 360;
	}
	return angle < 0 ? angle + 360 : angle;
}

/**
 * Moves a coordinate in a direction.
 * @param {number} x The origin X coordinate.
 * @param {number} y The origin Y coordinate.
 * @param {number} angle The angle to travel at.
 * @param {number} distance The distance to travel.
 * @returns {Object} An object containg the X and Y coordinates of the new position.
 */
function moveAtAngle(x, y, angle, distance) {
	return {
		x: Math.round(Math.cos(angle * Math.PI / 180) * distance + x),
		y: Math.round(Math.sin(angle * Math.PI / 180) * distance + y),
	};
}

class Ball {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.angle = Math.random() * 359;
	}

	tick() {
		const moved = moveAtAngle(this.x, this.y, this.angle, 3);
		this.x = moved.x;
		this.y = moved.y;

		if (this.x < 0) {
			this.angle = bounceAngle(this.angle, 90);

		}
		if (this.y < 0) {
			this.angle = bounceAngle(this.angle, 180);
		}
		if (this.x > can.width) {
			this.angle = bounceAngle(this.angle, 270);
		}
		if (this.y > can.height) {
			this.angle = bounceAngle(this.angle, 0);
		}
	}

	render(context) {
		context.translate(this.x, this.y);
		context.fillRect(0, 0, 5, 5);
	}
}

const ents = [new Ball(can.width / 2, can.height / 2)];

/**
 * Renders the canvas.
 */
function render() {
	for (let index = 0; index < ents.length; index++) {
		ents[index].tick();
		debug.innerText = `X: ${ents[index].x}, Y: ${ents[index].y}, angle: ${ents[index].angle}`;

		ctx.clearRect(0, 0, can.width, can.height);

		ctx.save();
		ents[index].render(ctx);
		ctx.restore();
	}

	window.requestAnimationFrame(render);
}
render();