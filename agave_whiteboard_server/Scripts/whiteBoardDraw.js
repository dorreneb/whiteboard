﻿
var drawComponents = {
    "canvasName": "drawCanvas",
    "canvas": "#" + this.canvasName,
    "group": "#groupName",
    "menu": "#menuDiv",
    "drawButton": "#insertDraw",
    "textButton": "#insertText",
    "selectButton": "#insertNone"
};

//resize the canvas to fit all available space on the screen and nothing more
function resizeScreen() {
    var menubarheight = $(drawComponents.menu).height();
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var widthn = width - 1;
    var heightn = height - menubarheight - 1;
    window.canvas.setDimensions({
        width: widthn,
        height: heightn
    });
}

//when the window resizes resize the canvas
window.onresize = function (event) {
    resizeScreen();
};

//if draw button is selected draw a circle
$(drawComponents.drawButton).click(function () {
    window.currentAction = drawComponents.drawButton;
    window.canvas.isDrawingMode = true;
});

//if text button is selected draw text
$(drawComponents.textButton).click(function () {
    window.currentAction = drawComponents.textButton;
    window.canvas.isDrawingMode = false;


});

//if text button is selected draw text
$(drawComponents.selectButton).click(function () {
    window.currentAction = drawComponents.selectButton;
    window.canvas.isDrawingMode = false;
});


//when document is actually ready do stuff
$(document).ready(function () {
    //create the canvas
    window.canvas = new fabric.Canvas(drawComponents.canvasName);

    //resize the window to fit the screen
    resizeScreen();

    //insert text when the draw button is clicked and text is selected
    window.canvas.on('mouse:up', function (options) {
        if (!options.target && window.currentAction === drawComponents.textButton) {

            var text = new fabric.IText('Tap and Type', {
                fontFamily: 'Segoe UI Light',
                left: options.e.clientX - 5, 
                top: options.e.clientY - 5 - $(drawComponents.menu).height()
                
            })
            window.canvas.add(text);

            window.sync();
        }
    });

    window.canvas.on('object:modified', function (options) {
        window.sync();
    });

});