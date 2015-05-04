var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var canvasBg = document.getElementById('canvas_bg');
var contextBg = canvasBg.getContext('2d');

var ball;
var xA = [];
var yA = [];
var n = 0;
var xmin = -10;
var xmax = 10;
var ymin = -50;
var ymax = 50;
var xorig = 275;
var yorig = 210;
var xwidth = 450;
var ywidth = 350;
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
    graph.drawgrid(2, 0.4, 10, 2);
    graph.drawaxes();

    for (var i = 0; i <= 1000; i++) {
        xA[i] = (i - 500) * 0.02;
        yA[i] = f(xA[i]);
    }
    graph.plot(xA, yA, '#ff0000', false, true);
}

function f(x) {
    var y;
    y = (x + 3.6) * (x + 2.5) * (x + 1) * (x - 0.5) * (x - 2) * (x - 3.5) * Math.exp(-x * x / 4);
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
