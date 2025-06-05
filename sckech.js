
let particles = [];
let tam = 8;

function setup() {
  createCanvas(720, 1280); 
  noStroke();

  


  // ==================== FIGURAS ====================
  let rects = [

  // Verde grande
 { x:154, y: 308, w: 91, h:344,ang: 35, color:'#198F51'},
 
 // Rojo 
{ x:52 , y:310 , w: 60,h: 67,ang : 35 ,color:  '#D14A1C'},
{ x:254 , y:530 , w: 30,h: 611,ang : 35 ,color:  '#D14A1C'},
{ x:573 , y:55 , w: 41,h: 40,ang : 117 ,color:  '#D14A1C'},
{ x:585 , y:506 , w: 60,h: 63,ang : 72 ,color:  '#D14A1C'},
{ x:639 , y: 488 , w: 60,h: 17,ang : 80 ,color:  '#D14A1C'},

 // Amarillo 
{ x:107 , y:154 , w: 62,h: 97,ang : 29 ,color:  '#F9C913'},
{ x:42 , y:130 , w: 37,h: 33,ang : 29 ,color:  '#F9C913'},
{ x:74 , y:105 , w: 19,h: 19,ang : 33 ,color:  '#F9C913'},
{ x:239 , y:88 , w: 22,h: 113,ang : 35 ,color:  '#F9C913'}, 
{ x:620 , y:162 , w: 184,h: 40,ang : 90 ,color:  '#F9C913'}, 
{ x:630 , y:243 , w: 17,h: 48,ang : 95 ,color:  '#F9C913'}, 
{ x:572 , y:367 , w: 17,h: 196,ang : 95 ,color:  '#F9C913'}, 
{ x:636 , y:368, w: 17,h: 196,ang : 95 ,color:  '#F9C913'}, 

  // Negro 
{ x:446 , y:342 , w: 359,h: 62,ang : 16 ,color:  '#000000'},
{ x:235 , y:17 , w: 22,h: 30,ang : 35 ,color:  '#000000'},
{ x:293 , y:68 , w: 22,h: 137,ang : 35 ,color:  '#000000'},
{ x:304 , y:766 , w: 37,h: 261,ang : 29 ,color:  '#000000'},
{ x:410 , y:799 , w: 36,h: 360,ang : 29,color:  '#000000'},
{ x:606 , y:874 , w: 27,h: 167,ang : 29,color:  '#000000'},
{ x:532 , y:1063 , w: 10,h: 113,ang : 112,color:  '#000000'},
{ x:551 , y:1100 , w: 10,h: 174,ang : 112,color:  '#000000'},
{ x:174 , y:1235 , w: 39,h: 55,ang : 29,color:  '#000000'},

//amarrillo
{ x:570 , y:823, w: 46,h: 148,ang : 95 ,color:  '#F9C913'},
{ x:208 , y:1195, w: 50,h: 28,ang : 29 ,color:  '#F9C913'}, 
{ x:613 , y:930, w: 126,h: 27,ang : 65 ,color:  '#F9C913'}, 
{ x:658 , y:920, w: 67,h: 21,ang : 65 ,color:  '#F9C913'}, 

//{ x:137 , y:823, w: 134,h: 123,ang :0, color:  '#F9C913'}, 

// rojo
{ x:516 , y: 783 , w: 85,h: 81,ang : 21 ,color:  '#D14A1C'},
{ x:519 , y: 1190 , w: 68,h: 160,ang : 13 ,color:  '#D14A1C'},
{ x:137 , y: 1214 , w: 27,h: 138,ang : 29 ,color:  '#D14A1C'},

// Azul 
{ x:434 , y:584 , w: 235,h:241 ,ang : 45 ,color:  '#031351'},
{ x:660 , y:618 , w: 109,h:19 ,ang : 45,color:  '#031351'},
{ x:640 , y:641 , w: 41,h:30 ,ang : 45 ,color:  '#031351'},
{ x:690 , y:599 , w: 41,h:30 ,ang : 45 ,color:  '#031351'},
{ x:280 , y:1165 , w: 83,h:19 ,ang : 109,color:  '#031351'},
{ x:233 , y:1239 , w: 52,h:19 ,ang : 109 ,color:  '#031351'},

];
// ==================== FIGURAS ====================
for (let r of rects) {
    let cosR = cos(r.ang);
    let sinR = sin(r.ang);
    let cx = r.x;
    let cy = r.y;

    for (let i = 0; i < r.w; i += tam) {
      for (let j = 0; j < r.h; j += tam) {
        // Rota el punto (i,j) respecto al centro del rectángulo
        let xRot = cx + i * cosR - j * sinR - r.w / 2 * cosR + r.h / 2 * sinR;
        let yRot = cy + i * sinR + j * cosR - r.w / 2 * sinR - r.h / 2 * cosR;
        particles.push(new Particle(xRot, yRot, r.color, r.ang));
      }
    }
  }
}

function draw() {

  background(240);
 console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);


  for (let p of particles) {
    p.update();
    p.show();
  }
}

function mousePressed() {
// Activa el comportamiento de explosión
  for (let p of particles) {
    p.explode();
  }
}

// Función llamada cuando se suelta un botón del ratón
function mouseReleased() {

  for (let p of particles) {
    p.goBack();
  }
}



class Particle {
  constructor(x, y, color,ang) {
   // Almacena la posición original del cuadrado
    this.originX = x;
    this.originY = y;
 // Posición actual del cuadrado
    this.x = x;
    this.y = y;
    // Velocidad
    this.velX = 0;
    this.velY = 0;
   
// Multiplicador de velocidad para explosión
    this.speed = 12;
    // Color 
    this.color = color;
    this.ang=ang;
  }
   // Método para hacer que los cuadrados explote hacia afuera desde el centro del lienzo
  explode() {

// Calcula el ángulo desde el centro del lienzo hasta el origen del cuadrado
    let angle = atan2(this.originY - height / 2, this.originX - width / 2);
   // Establezca la velocidad en función del ángulo y una velocidad aleatoria
    this.velX = cos(angle) * random(3, this.speed);
    this.velY = sin(angle) * random(3, this.speed);
  }

 // Método para hacer que los cuadrados regrese a su posición original
  goBack() {
// Calcula la velocidad para moverse hacia el origen, con un factor de amortiguamiento (0,1)    this.velX = (this.originX - this.x) * 0.1;
    this.velY = (this.originY - this.y) * 0.1;
  }

// Actualizar la posición de los cuadrados

  update() {
    this.x += this.velX;
    this.y += this.velY;

   // cuando se suelta el mouse, mueve continuamente los cuadrados hacia su origen
    if (!mouseIsPressed) {
      this.velX = (this.originX - this.x) * 0.1;
      this.velY = (this.originY - this.y) * 0.1;
    }
  }

 // Dibuja las figuras en pequeños cuadrados
  show() {
    push(); 
    stroke(this.color);
    fill(this.color); 
    translate(this.x, this.y);
    rotate(this.ang);
    rect(-tam / 2, -tam / 2, tam, tam);
    pop(); 
 
 
 
 
  }
}
