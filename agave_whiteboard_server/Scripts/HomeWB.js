(function () {
    "use strict";

    // The initialize function must be run each time a new page is loaded
    Office.initialize = function (reason) {
        $(document).ready(function () {
            app.initialize();
            window.typeWords('wrong ready called', 100, 160);
        });

    };
})();