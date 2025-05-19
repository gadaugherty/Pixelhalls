// spider.js

const canvas = document.getElementById("spiderCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヲン0123456789".split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Spider data
const spider = Array.from({ length: 15 }, () => ({
  x: Math.random() * canvas.width,
  y: -Math.random() * canvas.height,
  speed: 1 + Math.random() * 2
}));

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function drawSpider() {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "black";
  ctx.lineWidth = 1;

  spider.forEach(spider => {
    // Draw the string
    ctx.beginPath();
    ctx.moveTo(spider.x, 0);
    ctx.lineTo(spider.x, spider.y);
    ctx.stroke();

    // Draw the spider body
    ctx.beginPath();
    ctx.arc(spider.x, spider.y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Legs (simple stick legs)
    for (let i = -1; i <= 1; i += 2) {
      ctx.beginPath();
      ctx.moveTo(spider.x, spider.y);
      ctx.lineTo(spider.x + i * 8, spider.y + 4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(spider.x, spider.y);
      ctx.lineTo(spider.x + i * 8, spider.y - 4);
      ctx.stroke();
    }

    // Move spider down slowly
    spider.y += spider.speed;
    if (spider.y > canvas.height) spider.y = -10;
  });
}

function animate() {
  drawMatrix();
  drawSpiders();
  requestAnimationFrame(animate);
}

animate();
