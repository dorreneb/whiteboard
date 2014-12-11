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
        console.log("log from sync");
        var status = JSON.stringify(window.canvas);
        chat.server.sync(status, $(components.group).val());
    }

    // Start the connection.
    $.connection.hub.start().done(function () {
        $.connection.whiteBoardHub.server.joinRoom($(components.username).val(), $(components.group).val());
        if (Office&&Office.context&&Office.context.document&&Office.context.document.settings){
            Office.context.document.settings.set("id", $(components.group).val());
            Office.context.document.settings.saveAsync(function () { console.log("saved"); });
        }
        else {
            console.log("no office context found");
        }
    });
});
