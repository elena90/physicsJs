var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ball = new Ball2(20, '#ff0000', 1, 0, true);
ball.pos2D = new Vector2D(150, 50);
ball.draw(ctx);

var balls = [];
var numBalls = 10;
for (var i = 1; i <= numBalls; i++) {
    var ball;
    var radius = (Math.random() + 0.5) * 20;
    var color = '#0000ff';

    ball = new Ball2(radius, color, 1, 0, true);
    ball.pos2D = new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height);
    ball.draw(ctx);
    balls.push(ball);
}
