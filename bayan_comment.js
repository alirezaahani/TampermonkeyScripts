// ==UserScript==
// @name         BLOG COMMENT COLLECTOR
// @version      2024-06-13
// @description  Export your blog comments as json
// @match        *://blog.ir/panel/*/my_comments*
// @run-at       context-menu
// @grant        GM_addStyle
// ==/UserScript==

(async function() {
    'use strict';

    const blog_panel_url = window.location.href.split('/')[4];


    let progress = document.createElement('progress');
    progress.style.position = 'fixed';
    progress.style.width = '100%';
    progress.style.bottom = '0';
    progress.style.zIndex = '1000';
    document.body.appendChild(progress);

    let comments = [];

    const max_pages = parseInt(document.querySelector('.paging a:last-of-type').href.split('=')[1]);
    const select_options = [20, 50, 100];
    const increment = select_options[document.querySelector('.paging select:last-of-type').selectedIndex];

    progress.max = `${max_pages}`;


    for (let page = 1; page <= max_pages; page++) {
        const page_html = await ((await fetch(`https://blog.ir/panel/${blog_panel_url}/my_comments?page=${page}%28${increment}%29`)).text());
        let parser = new DOMParser();
        const doc = parser.parseFromString(page_html, "text/html");
        doc.querySelectorAll('.commentRow').forEach(el => {
            const comment = {
                'blog': {
                    'name': el.querySelector('.blogRow')?.innerText.replace(/\s+/g,' ').trim(),
                    'post': el.querySelector('.postRow')?.innerText.replace(/\s+/g,' ').trim(),
                    'link': el.getAttribute("data-post-link"),
                },
                'comment': {
                    'date': el.querySelector('.logDate')?.innerText.replace(/\s+/g,' ').trim(),
                    'website': el.querySelector('a.website')?.href,
                    'email': el.querySelector('a.email')?.innerText.replace(/\s+/g,' ').trim(),
                    'text': el.querySelector('.fullComment')?.innerText.replace(/\s+/g,' ').trim(),
                },
                'reply': {
                    'info': el.querySelector('.replyInfo')?.innerText.replace(/\s+/g,' ').trim(),
                    'text': el.querySelector('.replyText')?.innerText.replace(/\s+/g,' ').trim(),
                    'link': el.querySelector('.replyInfo')?.querySelector('a')?.href,
                }
            };
            comments.push(comment);

            progress.value = `${page}`;
        })
    }

    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(comments));
    let download_element = document.createElement('a');
    download_element.setAttribute("href", data);
    download_element.setAttribute("download", "comments.json");
    download_element.click();
    download_element.remove();
})();
