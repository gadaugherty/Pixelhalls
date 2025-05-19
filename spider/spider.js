// spider.js (Clean Pixel Grid Flashing Green)

const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixelSize = 16;
const cols = Math.floor(canvas.width / pixelSize);
const rows = Math.floor(canvas.height / pixelSize);

function drawBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawFlashingPixels() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (Math.random() > 0.9) {
        ctx.fillStyle = "#0f0";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }
  }
}

function animate() {
  drawBackground();
  drawFlashingPixels();
  requestAnimationFrame(animate);
}

animate();
