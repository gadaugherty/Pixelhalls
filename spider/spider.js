// spider.js (Pixel Grid Flashing Green)

const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pixelSize = 16;
const cols = Math.floor(canvas.width / pixelSize);
const rows = Math.floor(canvas.height / pixelSize);

function drawHallwayBackground() {
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, "#000");
  grad.addColorStop(0.5, "#111");
  grad.addColorStop(1, "#000");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#0f0";
  ctx.lineWidth = 0.2;

  for (let i = 0; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(i, 0);
    ctx.stroke();
  }

  for (let i = 0; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(canvas.width - i, 0);
    ctx.stroke();
  }
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
  drawHallwayBackground();
  drawFlashingPixels();
  requestAnimationFrame(animate);
}

animate();
