var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var graph = new Graph(ctx, -4, 4, 0, 1, 275, 380, 450, 350);
graph.drawgrid(1, 0.2, 0.2, 1);
graph.drawaxes();

// var xvals = [-4, -3, -2, -1, 0, 1, 2, 3, 4];
// var yvals = [16, 9, 4, 1, 0, 1, 4, 9, 16];
// graph.plot(xvals, yvals);

var xvals = [];
var yvals = [];

for (var i = 0; i < 100; i++) {
    xvals[i] = (i - 50) * 0.08;
    yvals[i] = f(xvals[i]);
}

graph.plot(xvals, yvals);

function f(x) {
    return Math.exp(-x * x);
}
