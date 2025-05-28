let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  let rects = [
    { x: 100, y: 100, w: 80, h: 80 },
    { x: 300, y: 150, w: 120, h: 80 }
  ];
  
  for (let r of rects) {
    for (let x = r.x; x < r.x + r.w; x += 4) {
      for (let y = r.y; y < r.y + r.h; y += 4) {
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
    this.originX = x;      // Posición original
    this.originY = y;
    this.x = x;             // Posición actual
    this.y = y;
    this.targetX = this.originX;  // Posición destino
    this.targetY = this.originY;
    this.velX = 0;
    this.velY = 0;
    this.speed = 6;
  }

  explode() {
    // Generar dirección aleatoria hacia fuera del centro
    let angle = atan2(this.originY - height / 2, this.originX - width / 2);
    this.velX = cos(angle) * random(3, this.speed);
    this.velY = sin(angle) * random(3, this.speed);
  }

  goBack() {
    // Cambiar el destino a la posición original
    this.velX = (this.originX - this.x) * 0.1;
    this.velY = (this.originY - this.y) * 0.1;
  }

  update() {
    this.x += this.velX;
    this.y += this.velY;
    
    // Cuando está volviendo, corregimos la velocidad para que no pase de largo
    if (!mouseIsPressed) {
      this.velX = (this.originX - this.x) * 0.1;
      this.velY = (this.originY - this.y) * 0.1;
    }
  }

  show() {
    fill(255);
    rect(this.x, this.y, 3, 3);
  }
}