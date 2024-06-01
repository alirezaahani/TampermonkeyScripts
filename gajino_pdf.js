// ==UserScript==
// @name         Gajino
// @version      2024-03-14
// @description  GAJINO DOWNLOADER
// @match        *://*.gajino.com/*
// @run-at       context-menu
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js
// @require      https://unpkg.com/downloadjs@1.4.7
// ==/UserScript==

(async function() {
    'use strict';

    const access_token = localStorage.token;
    const book_id = location.pathname.split('/').slice(-2)[0];
    const max_pages = JSON.parse(sessionStorage.getItem('libraryBookData-375')).totalBookPage;

    const pdfDoc = await PDFLib.PDFDocument.create();

    let progress = document.createElement('progress');
    progress.style.position = 'fixed';
    progress.style.width = '100%';
    progress.style.bottom = '0';
    progress.style.zIndex = '1000';
    document.body.appendChild(progress);

    for (var i = 1; i <= max_pages; i += 10) {
        progress.value = i / max_pages * 100;

        const response = await fetch(`https://api.gajino.com/api/v1/Stream/GetBookLibraryChunkPwa/${book_id}/${i}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "en-US,en;q=0.9,fa-IR;q=0.8,fa;q=0.7",
                "authorization": `Bearer ${access_token}`,
            },
            "referrer": "https://app.gajino.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });


        const response_json = await response.json();
        const data = (response_json["result"]["chunkBytesBase64"]);
        const donorPdfBytes = Uint8Array.from(atob(data), c => c.charCodeAt(0));
        const donorPdfDoc = await PDFLib.PDFDocument.load(donorPdfBytes);
        const docLength = donorPdfDoc.getPageCount();
        for (var k = 0; k < docLength; k++) {
            const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
            pdfDoc.addPage(donorPage);
        }
    }

    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, `${book_id}.pdf`, "application/pdf");
})();
