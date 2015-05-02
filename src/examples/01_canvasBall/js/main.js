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
var ball = new Ball(50, '#009AFF');

ball.x = 100;
ball.y = 100;
ball.draw(ctx);
