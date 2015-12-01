
var el = document.getElementById('c');
var ctx = el.getContext('2d');
var canvasColor = '#000000';

var scaleFactor = window.devicePixelRatio || 1;
if (scaleFactor > 1){
    el.width = el.offsetWidth * scaleFactor;
    el.height = el.offsetHeight * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);
}

ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

function distanceBetween(point1, point2){
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2){
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

el.ontouchstart = function(e){
    e.preventDefault();
    isDrawing = true;
    lastPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
};

var rectSize = 60;
el.ontouchmove = function(e){
    if (!isDrawing) return;

    var currentPoint = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    var force = e.touches[0].force;

    for (var i = 0; i < dist; i++){
      var x = lastPoint.x + (Math.sin(angle) * i);
      var y = lastPoint.y + (Math.cos(angle) * i);

      var radgrad = ctx.createRadialGradient(x,y,0,x,y,rectSize/3*(force+0.2));

      radgrad.addColorStop(0, canvasColor);
      radgrad.addColorStop(0.6, canvasColor);
      radgrad.addColorStop(1, hexToRgb(canvasColor, 0));

      ctx.fillStyle = radgrad;
      ctx.fillRect(x-rectSize/2, y-rectSize/2, rectSize, rectSize);
    }

    lastPoint = currentPoint;
};

el.ontouchend = function(){
    isDrawing = false;
};

el.ongesturestart = function(){
    ctx.clearRect(0, 0, el.width, el.height);
}

function setCanvasColor(pickerColor) {
    canvasColor = pickerColor;
}

function hexToRgb(hex, alpha) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var toString = function () {
        if (this.alpha == undefined) {
            return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
        }
        if (this.alpha > 1) {
            this.alpha = 1;
        } else if (this.alpha < 0) {
            this.alpha = 0;
        }
        return "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.alpha + ")";
    }
    if (alpha == undefined) {
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
            toString: toString
        } : null;
    }
    if (alpha > 1) {
        alpha = 1;
    } else if (alpha < 0) {
        alpha = 0;
    }
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        alpha: alpha,
        toString: toString
    } : null;
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

function rotateAndResize() {

    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');

    // Copy canvas as image data
    var imgData = ctx.getImageData(0,0, canvas.width, canvas.height);

    // Resize original canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Copy back to resized canvas
    ctx.putImageData(imgData, 0, 0);

    // Set up temporary canvas
    var tmpCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tmpCtx = tempCanvas.getContext('2d');

    // Copy to temporary canvas
    tempCanvas.drawImage(canvas, 0, 0);

    // Resize original canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Copy back to resized canvas
    ctx = canvas.getContext('2d');
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

}
window.addEventListener('orientationchange', rotateAndResize, false);

function sizeCanvas() {
    var canvas = document.getElementById('c');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

sizeCanvas();
