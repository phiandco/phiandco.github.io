/**
 * downloadBtn.js
 *
 * for "3d-touch-draw" for iPhone/iPad on the web
 *
 * Expanded and forked version of @cheeaun's 3d-touch-canvas
 * (https://github.com/cheeaun/3d-touch-canvas)
 *
 * @author  Philipp Kuecuekyan
 * @version 0.1.0
 *
 */

// add a button download listener and convert canvas to png in
// separate window
//

var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    var canvas = document.getElementById('c');
    var dataUrl = canvas.toDataURL("image/png", 1.0);

    window.open(dataUrl, "3d touch draw image");
});
