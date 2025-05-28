let particles = [];
let step = 3; // Tamaño de cada partícula y espaciado

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  let rects = [
    { x: width / 2 - 140, y: height / 2 - 40, w: 80, h: 80 },
    { x: width / 2 - 40,  y: height / 2 - 40, w: 80, h: 80 },
    { x: width / 2 + 60,  y: height / 2 - 40, w: 80, h: 80 }
  ];

  for (let r of rects) {
    for (let x = r.x; x < r.x + r.w; x += step) {
      for (let y = r.y; y < r.y + r.h; y += step) {
        particles.push(new Particle(x, y));
      }
    }
  }
}

function draw() {
  background(20);

  for (let p of particles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
  for (let p of particles) {
    p.explode();
  }
}

function mouseReleased() {
  for (let p of particles) {
    p.goBack();
  }
}

class Particle {
  constructor(x, y) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.speed = 12;
  }

  explode() {
    let angle = atan2(this.originY - height / 2, this.originX - width / 2);
    this.velX = cos(angle) * random(3, this.speed);
    this.velY = sin(angle) * random(3, this.speed);
  }

  goBack() {
    this.velX = (this.originX - this.x) * 0.1;
    this.velY = (this.originY - this.y) * 0.1;
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;

    if (!mouseIsPressed) {
      this.velX = (this.originX - this.x) * 0.1;
      this.velY = (this.originY - this.y) * 0.1;
    }
  }

  show() {
    fill(255);
    rect(this.x, this.y, step, step);
  }
}