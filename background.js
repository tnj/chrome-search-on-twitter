'use strict';

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.sendMessage(tab.id, "canonicalUrl", function (canonicalUrl) {
        const url = (canonicalUrl || tab.url).replace(/^https?:\/\//, '');
        chrome.tabs.create({
            url: "https://twitter.com/search?f=live&q=url%3A" + encodeURIComponent(url)
        });
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (!changeInfo.url) return;
    if (changeInfo.url.lastIndexOf("http", 0) === 0) {
        chrome.browserAction.enable(tabId);
    } else {
        chrome.browserAction.disable(tabId);
    }
});
