'use strict';
chrome.action.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, "canonicalUrl")
        .then(canonicalUrl => {
            const url = (canonicalUrl || tab.url).replace(/^https?:\/\//, '');
            chrome.tabs.create({
                url: "https://x.com/search?f=live&q=url%3A" + encodeURIComponent(url)
            });
        })
        .catch(error => {
            // If message fails, just use the current tab URL
            const url = tab.url.replace(/^https?:\/\//, '');
            chrome.tabs.create({
                url: "https://x.com/search?f=live&q=url%3A" + encodeURIComponent(url)
            });
        });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!changeInfo.url) return;
    if (changeInfo.url.lastIndexOf("http", 0) === 0) {
        chrome.action.enable(tabId);
    } else {
        chrome.action.disable(tabId);
    }
});
