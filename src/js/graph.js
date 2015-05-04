function Graph(context, xmin, xmax, ymin, ymax, x0, y0, xwidth, ywidth) {
    // VARIABLE DECLARATIONS
    // canvas context on which to draw graph instance
    var ctx = context;

    // location of origin (in pixels) in parent document
    var xOrig;
    var yOrig;

    // overall width and height of graph in pixels
    var xWidth;
    var yWidth;
    // min and max of x and y relative to origin (in pixels)
    var xMinRel;
    var xMaxRel;
    var yMinRel;
    var yMaxRel;
    // obvious
    var xTickMajor;
    var xTickMinor;
    var yTickMajor;
    var yTickMinor;
    // scaling used in displaying values on the axes
    var xDisplScal;
    var yDisplScal;
    // width and height of textbox used for displaying values on the axes
    // this should not have to be tampered with (I hope)
    var tw = 15;
    var th = 20;
    // declarations for quantities to be used later
    var xMin;
    var xMax;
    var yMin;
    var yMax;
    var xx;
    var yy;
    var xDispl;
    var yDispl;
    var txpos;
    var typos;

    // PARAMETER ASSIGNMENTS
    // assign parameter values based on specified arguments
    xOrig = x0;
    yOrig = y0;
    xWidth = xwidth;
    yWidth = ywidth;
    xDisplScal = (xmax - xmin) / xwidth;
    yDisplScal = (ymax - ymin) / ywidth;

    xMinRel = xmin / xDisplScal;
    xMaxRel = xmax / xDisplScal;
    yMinRel = ymin / yDisplScal;
    yMaxRel = ymax / yDisplScal;

    // convert to absolute coordinates
    xMin = xMinRel + xOrig;
    xMax = xMaxRel + xOrig;
    yMin = yOrig - yMinRel;
    yMax = yOrig - yMaxRel;
    txpos = xOrig - tw;
    typos = yOrig;

    // METHODS
    // DRAW GRID: draw major, minor lines and display values
    this.drawgrid = function(xmajor, xminor, ymajor, yminor) {
        var xTickMajor = xmajor / xDisplScal;
        var xTickMinor = xminor / xDisplScal;
        var yTickMajor = ymajor / yDisplScal;
        var yTickMinor = yminor / yDisplScal;

        // Рисуем клетки //
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#cccccc';
        ctx.beginPath();

        // Рисуем линии y
        var xx = xMin;
        while (xx <= xMax) {
            ctx.moveTo(xx, yMin);
            ctx.lineTo(xx, yMax);

            xx += xTickMinor;
        }
        ctx.stroke();

        // Рисуем линии x
        var yy = yMax;
        while (yy <= yMin) {
            ctx.moveTo(xMax, yy);
            ctx.lineTo(xMin, yy);

            yy += yTickMinor;
        }
        ctx.stroke();

        ctx.strokeStyle = '#999999';
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Рисуем основные направляющие //
        // Рисуем линии y
        var xx = xMin;
        while (xx <= xMax) {
            ctx.moveTo(xx, yMin);
            ctx.lineTo(xx, yMax);

            xx += xTickMajor;
        }
        ctx.stroke();

        // Рисуем линии x
        var yy = yMax;
        while (yy <= yMin) {
            ctx.moveTo(xMax, yy);
            ctx.lineTo(xMin, yy);

            yy += yTickMajor;
        }
        ctx.stroke();

        // Подписи по оси y
        ctx.font = '10pt Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'top';
        yy = yMax;

        while (yy <= yMin) {
            yDispl = (yOrig - yy) * yDisplScal;
            ctx.fillText(yDispl, txpos + 5, yy - th / 2);
            yy += yTickMajor;
        }

        // Подписи по оси x
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        xx = xMin;
        while (xx <= xMax) {
            xDispl = (xx - xOrig) * xDisplScal;
            ctx.fillText(xDispl, xx - tw + 10, typos + 5);
            xx += xTickMajor;
        }

    }

    // DRAW AXES: draw axes and labels
    this.drawaxes = function(xlabel, ylabel) {
        if (typeof(xlabel) === 'undefined') {
            xlabel = 'x';
        }
        if (typeof(ylabel) === 'undefined') {
            ylabel = 'y';
        }

        // Линии
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath() ;
        ctx.moveTo(xMin, yOrig);
        ctx.lineTo(xMax, yOrig);
        ctx.moveTo(xOrig, yMin);
        ctx.lineTo(xOrig, yMax);
        ctx.stroke();

        // Подписи.
        ctx.font = '12pt Arial';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(xlabel, xMax + 0.75 * tw, typos - th / 2);
        ctx.fillText(ylabel, txpos + tw / 2 + 5, yMax - 1.5 * th);
    };

    // PLOT DATA: plot data
    this.plot = function(xArr, yArr, pColor, pDots, pLine) {
        // the last three arguments have default values
        if (typeof(pColor) === 'undefined') {
            pColor = '#0000ff';
        }
        if (typeof(pDots) === 'undefined') {
            pDots = true;
        }
        if (typeof(pLine) === 'undefined') {
            pLine = true;
        }
        var xpos = xOrig + xArr[0] / xDisplScal;
        var ypos = yOrig - yArr[0] / yDisplScal;
        ctx.strokeStyle = pColor;
        ctx.lineWidth = 1;
        ctx.beginPath() ;
        ctx.moveTo(xpos, ypos);
        ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);

        for (var i = 1; i < xArr.length; i++) {
            xpos = xOrig + xArr[i] / xDisplScal;
            ypos = yOrig - yArr[i] / yDisplScal;

            if (pLine) {
                ctx.lineTo(xpos, ypos);
            }else {
                ctx.moveTo(xpos, ypos);
            }
            if (pDots) {
                ctx.arc(xpos, ypos, 1, 0, 2 * Math.PI, true);
            }
        }
        ctx.stroke();
    };
}
