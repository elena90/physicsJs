var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var canvasBg = document.getElementById('canvas_bg');
var contextBg = canvasBg.getContext('2d');

var ball;
var xA = [];
var yA = [];
var n = 0;
var xmin = 0;
var xmax = 1440;
var ymin = -1;
var ymax = 1;
var xorig = 50;
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
    graph.drawgrid(180, 45, 1, 0.2);
    graph.drawaxes();

    for (var i = 0; i <= 1440; i++) {
        var t = 0.01 * i;
        xA[i] = i;
        yA[i] = f(xA[i]);
    }

    graph.plot(xA, yA, '#ff0000', false, true);
}

function f(x) {
    var y;
    y = fourierSum(20, x);
    return y;
}
function fourierSum(N, x) {
    var fs = 0;
    for (var nn = 1; nn <= N; nn = nn + 2) {
        fs += Math.sin(nn * x * Math.PI / 180) / nn;
    }
    return fs;
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
