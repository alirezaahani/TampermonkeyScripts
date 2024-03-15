// ==UserScript==
// @name         Monta PDF
// @version      2024-03-14
// @description  MONTA PDF
// @match        *://*.monta.ir/*
// @run-at  document-end
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
        .m--control-container {
            width: 100% !important;
            max-width: 100% !important;
        }
        `);

GM_addStyle(`
        div {
            page-break-inside: avoid !important;
            break-inside: avoid;
        }
        `);

GM_addStyle(`
        .box {
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
        }`);

GM_addStyle(`
        .m--main-contents .m--content-panel {
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
        .m--main-contents .m--content-panel {
            background: #F1F2F6;
            border: none;
            border-radius: 0;
            padding: 0;
            width: 0;
        }
        .m--main-panel {
            padding-top: 0 !important;
        }
        `);

(function() {
    'use strict';

    const handel = setInterval(function() {
        if(document.querySelector('.level') === null) {
            return;
        }

        document.querySelector('.m--header').remove()
        document.querySelector('.m--sidebar-panel').remove()
        document.querySelector('.m--nav-mobile').remove()
        document.querySelector('.grecaptcha-badge').remove()
        Array.from(document.querySelectorAll('a')).filter((a) => a.innerText.includes('پاسخ')).forEach((a) => a.click())
        Array.from(document.querySelectorAll('.level')).forEach((el) => el.remove())
        Array.from(document.querySelectorAll('.is-narrow')).forEach((el) => el.remove())
        Array.from(document.querySelectorAll('.button')).forEach((el) => el.remove())
        Array.from(document.querySelectorAll('.is-hidden-mobile')).forEach((el) => el.parentElement.remove())
        Array.from(document.querySelectorAll('.is-rounded')).forEach((el) => el.remove())
        Array.from(document.querySelectorAll('.half-space-left')).forEach((el) => el.parentElement.remove())

        clearInterval(handel);
    }, 5000);



})();
