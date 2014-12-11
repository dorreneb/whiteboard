var components = {
    "chat": "#discussion",
    "username": "#displayname",
    "message": "#message",
    "sendmessagebutton": "#sendmessage",
    "group": "#groupName",
    "canvas" : "#canvas"
};

$(function () {
    // Reference the auto-generated proxy for the hub.
    window.chat = $.connection.whiteBoardHub;

    //changes canvas after receiving updates
    window.chat.client.getSync = function (json) {
        window.canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    }

    //sends the json from the canvas to all other members in the group
    window.sync = function () {
        var status = JSON.stringify(window.canvas);
        chat.server.sync(status, $(components.group).val());
    }

    // Start the connection.
    $.connection.hub.start().done(function () {
        $.connection.whiteBoardHub.server.joinRoom($(components.username).val(), $(components.group).val());
    });
});
