function Ball (radius, color) {
    this.radius = radius;
    this.color = color;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
};

Ball.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
};

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var ball;
var t;

window.onload = init;

function init() {
    ball = new Ball(20, '#0000ff');
    ball.x = 50;
    ball.y = 250;
    ball.vx = 2;
    t = new Date().getTime();
    ball.draw(ctx);
    animFrame();
};

// setInterval(function() {
//     onEachStep();
// }, 1000 / 60);
function animFrame() {
    requestAnimationFrame(animFrame);
    onEachStep();
};

function onEachStep() {
    var dt = (new Date().getTime() - t) / 1000 * 60; // 1 секунда прошедшая после последнего вызова
    t = new Date().getTime(); // reset t
    ball.x += ball.vx * dt;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(ctx);
};
