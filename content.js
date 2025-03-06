'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request === 'canonicalUrl') {
        const element = document.querySelector('link[rel=canonical]');
        sendResponse(element !== null ? element.href : null);
        return true; // Required to use sendResponse asynchronously
    }
});