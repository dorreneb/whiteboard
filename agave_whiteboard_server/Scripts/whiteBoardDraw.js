
var drawComponents = {
    "canvasName" : "drawCanvas",
    "canvas": "#" + this.canvasName,
    "group": "#groupName",
    "menu" : "#menuDiv"
};

function responsive() {
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

$(document).ready(function () {
    window.canvas = new fabric.Canvas('drawCanvas');

    //when clicking on the screen draw a circle
    window.canvas.on('mouse:down', function (options) {
        if (!options.target) {
            var circle = new fabric.Circle({
                radius: 10, fill: 'green', left: options.e.clientX - 5, top: options.e.clientY - 5 - $(drawComponents.menu).height()
            });
            window.canvas.add(circle);
        }
    });

    window.canvas.on('mouse:up', function (options) {
        var status = JSON.stringify(window.canvas);
        window.sync(status);
    });

    responsive();
  
});