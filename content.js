'use strict';

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request === 'canonicalUrl') {
        const element = document.querySelector('link[rel=canonical]');
        sendResponse(element !== null ? element.href : null);
    }
});