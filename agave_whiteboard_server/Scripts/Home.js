/// <reference path="../App.js" />
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

(function () {
    "use strict";
    
    Office.initialize = function (reason) {
        $(document).ready(function () {

            app.initialize();
            var docname;
            //var appID;
            var loaded = false;
            var savedID = Office.context.document.settings.get("id");

            if (!savedID) {
                //docname = encodeURI(Office.context.document.url);
                //make a guid for our id as docname
                docname = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                //save it
                Office.context.document.settings.set("id", docname);
                
                Office.context.document.settings.saveAsync(function (asyncResult) {
                        if (asyncResult.status == Office.AsyncResultStatus.Failed) {
                            console.log("save failed");
                        } else {
                            console.log("save succeeded");
                        }
                    });
                }
                else {
                docname = savedID;
                loaded = true;
            }

            var destinationUrl = "https://" + window.location.hostname + "/home/whiteboard?isJoin=" + loaded + "&id=" + docname;
            //console.log("docname " + docname + "/loaded " + loaded);
            //var destinationUrl = "http://localhost:55802/home/whiteboard?isJoin=" + loaded + "&id=" + docname;

            window.location.replace(destinationUrl);

        });
    }
})();