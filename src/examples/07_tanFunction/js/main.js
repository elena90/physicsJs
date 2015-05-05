var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var canvasBg = document.getElementById('canvas_bg');
var contextBg = canvasBg.getContext('2d');

var ball;
var xA = [];
var yA = [];
var n = 0;
var xmin = -720;
var xmax = 720;
var ymin = -10;
var ymax = 10;
var xorig = 250;
var yorig = 250;
var xwidth = 400;
var ywidth = 400;
var xscal = (xmax - xmin) / xwidth;
var yscal = (ymax - ymin) / ywidth;
var idInterval;

window.onload = init;

function init() {
    plotGraph();
    placeBall();
    setupTimer();
}

function plotGraph() {
    var graph = new Graph(contextBg, xmin, xmax, ymin, ymax, xorig, yorig, xwidth, ywidth);
    graph.drawgrid(180, 45, 5, 1);
    graph.drawaxes();

    for (var i = 0; i <= 1440; i++) {
        var t = 0.01 * i;
        xA[i] = (i - 720);
        yA[i] = Math.sin(xA[i] * Math.PI / 180) / Math.cos(xA[i] * Math.PI / 180);
    }

    graph.plot(xA, yA, '#ff0000', false, true);
}

function f(x) {
    var y;
    y = -Math.sqrt(1 - x * x);
    return y;
}

function placeBall() {
    ball = new Ball(6, '#0000ff');
    ball.x = xA[0] / xscal + xorig;
    ball.y = -yA[0] / yscal + yorig;
    ball.draw(context);
}

function setupTimer() {
    idInterval = setInterval(moveBall, 1000 / 60);
}

function moveBall() {
    ball.x = xA[n] / xscal + xorig;
    ball.y = -yA[n] / yscal + yorig;
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(context);
    n++;
    if (n == xA.length) {
        clearInterval(idInterval);
    }
}
