// ==UserScript==
// @name         CMS-Toolbox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @updateURL    https://github.com/mehmood-baryalai/CMS-Toolbox/raw/main/CMS-Toolbox.user.js
// @description  try to take over the world!
// @author       Mehmood Baryalai
// @match        *://cms.buitms.edu.pk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=edu.pk
// @require      https://git.io/waitForKeyElements.js
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==


// add top menu
waitForKeyElements("dl", function(elem) {

    //menu style
    GM_addStyle ( "                                 \
.dropbtn {                                  \
color: #004b91;                                 \
border: none;                                 \
}                                 \
\
.dropdown {                                 \
position: relative;                                 \
display: inline-block;                                 \
}                                 \
\
.dropdown-content {                                 \
display: none;                                 \
position: absolute;                                 \
background-color: #f1f1f1;                                 \
min-width: 160px;                                 \
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);                                 \
z-index: 1;                                 \
}                                 \
\
.dropdown-content a {                                 \
color: black;                                 \
padding: 10px 16px;                                 \
text-decoration: none;                                 \
display: block;                                 \
}                                 \
\
.dropdown-content a:hover {background-color: #ddd;}                                 \
.dropdown:hover .dropdown-content {display: block;}                                 \
.dropdown:hover .dropbtn {background-color: rgb(241,245,255);}                                 \
" );


    //menu html
    $(elem).css("overflow", "visible");
    $(elem).prepend('<dt>\
<div class=\"dropdown\">\
<button class=\"dropbtn\">Shortcuts</button>\
<div class=\"dropdown-content\">\
<a href=\"#\">Mark Attendance...</a>             \
<a href=\"#\">Approve Grade Roster \[CP\]</a>             \
<a href=\"javascript:pAction_win0(document.win0,\'TCHR_CLAS_ATND_STRM$prompt\');\">About</a>                          \
</div>\
</div>\
</dt>'
                   );


});


function main(where) {
    // do stuff here with  where  instead of  document
    // e.g. use  where.querySelector()  in place of  document.querySelector()
    // and add stylesheets with  where.head.appendChild(stylesheet)

    if(where.getElementsByClassName("PAPAGETITLE")[0].innerText==="Attendance Roster By Class"){
        alert("Attendance Roster Page");
    }
}

//main(document); // run it on the top level document (as normal)

waitForKeyElements("iframe, frame", function(elem) {

    // skip if already processed
    //if($(elem).attr('wfke_found')) {console.log("Skipped for "+elem.id);return;}

    //alert("Element found with id=" + elem.id+"\n");

    //add onload event listener to the Main Content frame
    if(elem.id==="ptifrmtgtframe"){
        elem.addEventListener("load", function () {
            // alert("Element load event called for id=" + elem.id);
            // elem.removeAttribute("wfke_found");
        });
        //process the internal content of the iframe
        main(elem.contentDocument);
    }
});
