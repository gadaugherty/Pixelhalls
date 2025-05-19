const canvas = document.getElementById('spiderCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Spider {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.alive = true;
    this.dy = Math.random() * 2 + 1;
  }

  draw() {
    if (!this.alive) return;

    // Body
    ctx.fillStyle = '#00ff00';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    const legLength = 15;
    for (let i = -1; i <= 1; i += 2) {
      ctx.beginPath();
      ctx.moveTo(this.x + i * 10, this.y);
      ctx.lineTo(this.x + i * (10 + legLength), this.y - legLength);
      ctx.moveTo(this.x + i * 10, this.y);
      ctx.lineTo(this.x + i * (10 + legLength), this.y + legLength);
      ctx.stroke();
    }
  }

  update() {
    if (this.alive) {
      this.y += this.dy;
      if (this.y - this.radius > canvas.height) {
        this.y = -this.radius;
        this.x = Math.random() * canvas.width;
      }
    }
    this.draw();
  }

  isClicked(x, y) {
    const dx = x - this.x;
    const dy = y - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }
}

const spiders = [];
for (let i = 0; i < 10; i++) {
  spiders.push(new Spider(Math.random() * canvas.width, Math.random() * canvas.height));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spiders.forEach(spider => spider.update());
  requestAnimationFrame(animate);
}

animate();

// Touch or click to squash
function handleTap(x, y) {
  spiders.forEach(spider => {
    if (spider.isClicked(x, y)) {
      spider.alive = false;
    }
  });
}

canvas.addEventListener('click', (e) => {
  handleTap(e.clientX, e.clientY);
});

canvas.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  handleTap(touch.clientX, touch.clientY);
});