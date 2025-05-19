// spider.js - Metroid-style JS Game Setup

const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

document.body.style.background = "black";

const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

const player = {
  x: 100,
  y: 100,
  width: 20,
  height: 30,
  dx: 0,
  dy: 0,
  speed: 2,
  gravity: 0.5,
  jumpForce: -10,
  grounded: false,

  draw() {
    ctx.fillStyle = "#0f0";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },

  update() {
    this.dy += this.gravity;
    this.grounded = false;

    // Controls
    if (keys["ArrowLeft"] || keys["a"]) this.dx = -this.speed;
    else if (keys["ArrowRight"] || keys["d"]) this.dx = this.speed;
    else this.dx = 0;

    if ((keys["ArrowUp"] || keys["w"]) && this.grounded) {
      this.dy = this.jumpForce;
      this.grounded = false;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Simple ground collision
    if (this.y + this.height > canvas.height - 50) {
      this.y = canvas.height - 50 - this.height;
      this.dy = 0;
      this.grounded = true;
    }
  }
};

function drawGround() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGround();
  player.update();
  player.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
