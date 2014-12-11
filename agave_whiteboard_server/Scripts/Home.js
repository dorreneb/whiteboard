/// <reference path="../App.js" />

(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            var docname = encodeURI(Office.context.document.url);
            //remove the file extenstion from end
           // if (docname.length>5) docname = docname.substring(0, docname.length - 5);
            window.location.replace("http://localhost:55802/home/whiteboard/?id="+docname);
        })
        
        }
})();