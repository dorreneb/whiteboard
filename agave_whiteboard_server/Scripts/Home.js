/// <reference path="../App.js" />

(function () {
    "use strict";
    try {
        
        $(document).ready(function () {
           
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
            
        });

    };
    
    } catch (err) {
        document.write(":(");
    }
})();