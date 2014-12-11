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

    //function that shows someone is logging into the system
    window.chat.client.systemMessage = function (message) {
        $(components.chat).append('<li><strong>' + htmlEncode(message) + '</strong></li>');
    }

    // Create a function that the hub can call back to display messages.
    window.chat.client.addNewMessageToPage = function (name, message) {
        // Add the message to the page.
        $(components.chat).append('<li><strong>' + htmlEncode(name) + '</strong>: ' + htmlEncode(message) + '</li>');
    };

    //changes canvas after receiving updates
    window.chat.client.getSync = function (json) {
        window.canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
    }

    //sends the json from the canvas to all other members in the group
    window.sync = function (json) {
        chat.server.sync(json, $(components.group).val());
    }

    // Start the connection.
    $.connection.hub.start().done(function () {
        $.connection.whiteBoardHub.server.joinRoom($(components.username).val(), $(components.group).val());
        $(components.sendmessagebutton).click(function () {
            // Call the Send method on the hub.
            chat.server.send($(components.username).val(), $(components.message).val(), $(components.group).val());
            // Clear text box and reset focus for next comment.
            $(components.message).val('').focus();
        });
    });
});
// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

