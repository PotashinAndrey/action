import {Vector, Quatern, Matrix} from '/javascript-algebra/index.js';
import {Canvas} from '/javascript-canvas/index.js';
import {Projectile} from './projectile.js';

let canvas = document.getElementById("canvas");

canvas.width = 1024;
canvas.height = 766;

if (!canvas.getContext('2d')) alert('увы');
let ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = true;

const cursor = {x: 0, y: 0};
canvas.addEventListener('mousemove', e => {
  cursor.x = e.offsetX;
  cursor.y = e.offsetY;
  Draw();
});

canvas.addEventListener('click', e => {
  Shoot();
});

Draw();

function Draw() {

  const w = canvas.width / 2;
  const h = canvas.height / 2;
  ctx.resetTransform();
  ctx.lineWidth = 0.1;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.translate(w, h);
  ctx.scale(1, -1);

  const scale = {x: 10, y: 10};
  ctx.scale(scale.x, scale.y);

  const cur = {
    x: (cursor.x - w) /  scale.x,
    y: (cursor.y - h) / -scale.y
  }

  let angle = -getAngle(cur);

  drawMyCharacter(ctx, angle);

  function Shoot() {
    let proj = new Projectile(20, 100, cur);
    console.log('shoot'); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  }
}

function drawMyCharacter(ctx, angle = 0) {
  drawHead(ctx);
  drawBody(ctx, angle, 4, 2.65);
  drawHands(ctx, angle);
  drawPistol(ctx, angle);

  ctx.stroke();
  ctx.closePath();
}

function drawHead(ctx) {
  ctx.beginPath();
  ctx.moveTo(2, 0);
  ctx.arc(0, 0, 2, 0, Math.PI*2, true);
}

function drawBody(ctx, angle, x, y) {
  let rightTop = rotate(x, y, angle);
  let leftTop = rotate(-x, y, angle);
  let leftBottom = rotate(-x, -y, angle);
  let rightBottom = rotate(x, -y, angle);

  let left = rotate(-x, 0, angle);
  let right = rotate(x, 0, angle);

  ctx.moveTo(left.x, left.y);
  ctx.bezierCurveTo(leftTop.x, leftTop.y, rightTop.x, rightTop.y, right.x, right.y);
  ctx.bezierCurveTo(rightBottom.x, rightBottom.y, leftBottom.x, leftBottom.y, left.x, left.y);
}

function drawHands(ctx, angle = 0) {
  let x = 2.6;
  let y = 1.7;

  ctx.moveTo(rotate(x, y, angle).x, rotate(x, y, angle).y);
  ctx.lineTo(rotate(x, y + 2.1, angle).x, rotate(x, y + 2.1, angle).y);
  ctx.lineTo(rotate(x - 1.2, y + 2.1, angle).x, rotate(x - 1.2, y + 2.1, angle).y);
  ctx.lineTo(rotate(x - 1.2, y + 0.2, angle).x, rotate(x - 1.2, y + 0.2, angle).y);

  ctx.moveTo(rotate(-x, y, angle).x, rotate(-x, y, angle).y);
  ctx.lineTo(rotate(x - 0.9, y + 2.6, angle).x, rotate(x - 0.9, y + 2.6, angle).y);
  ctx.moveTo(rotate(x - 1.2, y + 1.3, angle).x, rotate(x - 1.2, y + 1.3, angle).y);
  ctx.lineTo(rotate(x - 2.8, y + 0.4, angle).x, rotate(x - 2.8, y + 0.4, angle).y);
}

function drawPistol(ctx, angle) {
  let x = 2.4;
  let y = 3.9;

  ctx.moveTo(rotate(x, y, angle).x, rotate(x, y, angle).y);
  ctx.lineTo(rotate(x, y + 2.5, angle).x, rotate(x, y + 2.5, angle).y);
  ctx.lineTo(rotate(x - 0.6, y + 2.5, angle).x, rotate(x - 0.6, y + 2.5, angle).y);
  ctx.lineTo(rotate(x - 0.6, y, angle).x, rotate(x - 0.6, y, angle).y);
  ctx.lineTo(rotate(x, y, angle).x, rotate(x, y, angle).y);
}

function drawLinesToCoordinates(w, h, cursor, func) {
  ctx.beginPath();
  ctx.strokeStyle = 'green';

  const y = func(cursor.x);
  ctx.moveTo(cursor.x, 0);
  ctx.lineTo(cursor.x, y);
  ctx.lineTo(0, y);
  ctx.stroke();
  ctx.closePath();
}

function getAngle(cursor) {
  let v0 = {x:0, y:1};

  let angle = Math.acos((cursor.x * v0.x + cursor.y * v0.y)/(Math.sqrt(cursor.x * cursor.x + cursor.y * cursor.y) * Math.sqrt(v0.x * v0.x + v0.y * v0.y)));

  if (cursor.x * v0.y - v0.x * cursor.y < 0) {
    angle *= -1;
  }

  return angle;
}

function rotate(xCoord, yCoord, angle) {
  return {x: xCoord * Math.cos(angle) - yCoord * Math.sin(angle),
          y: yCoord * Math.cos(angle) + xCoord * Math.sin(angle),
          }
}
