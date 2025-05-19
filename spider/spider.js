const canvas = document.getElementById('spiderCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dy = Math.random() * 1 + 0.5;
  }

  draw() {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2); // body
    ctx.fill();

    // legs
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(this.x - 5, this.y); ctx.lineTo(this.x - 10, this.y - 5);
    ctx.moveTo(this.x + 5, this.y); ctx.lineTo(this.x + 10, this.y - 5);
    ctx.moveTo(this.x - 5, this.y); ctx.lineTo(this.x - 10, this.y + 5);
    ctx.moveTo(this.x + 5, this.y); ctx.lineTo(this.x + 10, this.y + 5);
    ctx.stroke();
  }

  update() {
    this.y += this.dy;
    if (this.y > canvas.height) this.y = 0;
    this.draw();
  }
}

const spiders = [];
for (let i = 0; i < 20; i++) {
  spiders.push(new Spider(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spiders.forEach(spider => spider.update());
  requestAnimationFrame(animate);
}

animate();