let particles = [];
let tam = 10; // Tamaño de cada partícula y espaciado

function setup() {
  createCanvas(720, 1280);
  noStroke();

  let rects = [
    // CUADRADOS...
    { x: width / 2 - 140, y: height / 2 - 130, w: 270, h: 270, col: color(1, 19,82)},
    { x: 50 ,  y: 400 / 2 - 40, w: 80, h: 80 , col: color(188, 53, 19) },
    { x: 35 ,  y: 700 / 2 - 100, w: 250, h: 60, col: color(0, 222, 0) },
     { x: 520,  y: 650 / 2 - 65, w: 70, h: 70, col: color(0, 255, 0) },
    { x: 590,  y: 40, w: 40, h: 40, col: color(188, 53, 19) },
    { x: 490,  y: 790, w: 80, h: 80, col: color(255, 0, 0) },
    { x: 165,  y: 135 , w: 30, h: 30, col: color(243, 193, 27) },
    { x: 200,  y: 150, w: 20, h: 20, col: color(243, 193, 27) },
    { x: 160,  y: 180, w: 100, h: 50, col: color(243, 193, 27) },
    //RECTANGULOS...
    { x: 35 ,  y: 245, w: 250, h: 50, col: color(25, 143, 81) },
    { x: 460,  y: 1100, w: 80, h: 160, col: color(209, 73, 27) },
    { x: 390,  y: 1080, w: 170, h: 10, col: color(0, 0, 0) },
    { x: 270,  y: 50, w: 30, h: 170, col: color(243, 193, 27) },
    { x: 420,  y: 1050, w: 110, h: 10, col: color(0, 0, 0) },
    { x: 85,  y: 1120, w: 30, h: 140, col: color(209, 25, 27) },
    { x: 125,  y: 1180, w: 50, h: 80, col: color(0, 0, 0) },
    { x: 125,  y: 1120, w: 70, h: 40, col: color(243, 193, 27) },
    { x: 220,  y: 1000, w: 25, h: 135, col: color(1, 19, 82) },
    { x: 220,  y: 1160, w: 25, h: 100, col: color(1, 19, 82) },
    { x: 220,  y: 1, w: 40, h: 20, col: color(0, 0, 0) },
    { x: 300,  y: 10, w: 25, h: 160, col: color(0, 0, 0) },
    { x: 600,  y: 660, w: 40, h: 30, col: color(1, 19, 82) },
    { x: 600,  y: 620, w: 110, h: 20, col: color(1, 19, 82) },
    { x: 600,  y: 575, w: 40, h: 30, col: color(1, 19, 82) },
    { x: 605,  y: 485, w: 40, h: 20, col: color(188, 53, 19) },
    { x: 640,  y: 460, w: 60, h: 17, col: color(188, 53, 19) },
    { x: 595,  y: 755, w: 46, h: 148, col: color(243, 193, 27) },
    { x: 645,  y: 800, w: 28, h: 168, col: color(0, 0, 0) },
    { x: 566,  y: 980, w: 126, h: 27, col: color(243, 193, 27) },
    { x: 630,  y: 950, w: 67, h: 21, col: color(243, 193, 27) },
    { x: 67,  y: 768, w: 133, h: 123, col: color(243, 193, 27) },
    { x: 660,  y: 95, w: 46, h: 148, col: color(243, 193, 27) },
    { x: 656,  y: 220, w: 17, h: 48, col: color(243, 193, 27) },
       
      //lineas...
    { x: 396,  y: 584, w: 30, h: 611, col: color(209, 73, 27) },
    { x: 220,  y: 380, w: 16, h: 400, col: color(0, 0, 0) },
    { x: 271,  y: 437, w: 25, h: 289, col: color(0, 0, 0) },
    { x: 420,  y: 140, w: 25, h: 289, col: color(209, 73, 27) },
    { x: 516,  y:652, w: 36, h: 360, col: color(0, 0, 255) },
   
  ];

  
  for (let r of rects) {
    for (let x = r.x; x < r.x + r.w; x += tam) {
      for (let y = r.y; y < r.y + r.h; y += tam) {
        particles.push(new Particle(x, y, r.col, r.rot));
      }
    }
  }
}

function draw() {
  background(255);

 console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);

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
  constructor(x, y, col,rot) {
    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.velX = 0;
    this.velY = 0;
    this.speed = 12;
    this.col = col;
    this.rot = rot;
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
    push();
    fill (this.col);
    rect(this.x, this.y, tam, tam);
    pop();
  }
}