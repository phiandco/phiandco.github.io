var button = document.getElementById('btn-download');
button.addEventListener('click', function (e) {
    // var dataURL = canvas.toDataURL('image/png');
    // // window.href = dataURL;
    // window.open(dataURL);
    var canvas = document.getElementById('c');
    var dataUrl = canvas.toDataURL("image/png", 1.0);

    window.open(dataUrl, "3d touch draw image");
});
