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
       // if (Office && Office.context && Office.context.document && Office.context.document.settings) {
            //window.typeWords("testtest", 100, 150);
            //Office.context.document.settings.set("id", $(components.group).val());
            //window.typeWords($(components.group).val(), 0, 0);
            //window.typeWords(Office.context.document.settings.get("id"), 0, 0);
           // window.typeWords($(components.group).val(), 100, 100);

            //Office.context.document.settings.saveAsync(function (asyncResult) {
            //    if (asyncResult.status == Office.AsyncResultStatus.Failed) {
            //        window.typeWords('Settings save failed. Error: ' + asyncResult.error.message,100,200);
            //    } else {
            //        window.typeWords('Settings saved.', 100, 200);
            //        window.typeWords(Office.context.document.settings.get("id"), 100, 250);
            //    }
            //});


            //Office.context.document.settings.saveAsync(function () { window.typeWords("saved", 100, 200); });
       // }
      //  else {
       //     console.log("no office context found");
      //  }
    });
});
