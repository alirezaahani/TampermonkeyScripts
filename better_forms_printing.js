// ==UserScript==
// @name         Better forms PRINTING
// @version      2024-06-19
// @description  Better forms PRINTING
// @author       Alireza
// @match        *://docs.google.com/forms/u/0/d/*/printallresponses
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
        .Dq4amc {
    display: none;
}

.v1CNvb.sId0Ce {
    display: none;
}

.I3zNcc.yF4pU {
    display: none;
}

body {
    direction: rtl !important;
}
        `);

(function() {
    'use strict';

    document.querySelectorAll('div[role="radio"][aria-checked="false"]').forEach(el => {
        if (el.parentElement.parentElement.parentElement.parentElement.childNodes.length != 7) {
            el.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    })
    document.querySelectorAll('div[role="checkbox"][aria-checked="false"]').forEach(el => {
        el.parentElement.parentElement.parentElement.parentElement.style.display = "none"
    })
    document.querySelectorAll('div[role="textbox"]:empty').forEach(el => {
        el.parentElement.parentElement.parentElement.style.display = "none"
    })
})();
