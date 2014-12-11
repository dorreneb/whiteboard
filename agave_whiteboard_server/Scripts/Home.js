/// <reference path="../App.js" />

(function () {
    "use strict";
    
    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {

        
        $(document).ready(function () {
            //document.write("desperation");
            app.initialize();
            var docname;
            var loaded = false;
            var savedID = Office.context.document.settings.get("id");
            
            if (!savedID) {
                docname = encodeURI(Office.context.document.url);
            }
            else {
                docname = savedID;
                loaded = true;
            }
            
            //var destinationUrl = "https://" + window.location.hostname +"/home/whiteboard?id=" + docname + "&isJoin=" + loaded;
            console.log("docname " + docname + "/loaded " + loaded)
            var destinationUrl = "http://localhost:55802/home/whiteboard?isJoin=" + loaded + "&id=" + docname;
               
             window.location.replace(destinationUrl);  
             //document.write("id is" + docname);
        });

    };

    //document.write("at the end of initialize");
})();