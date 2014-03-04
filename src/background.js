'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: '/blob/'
                        }
                    })
                ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});

var state = {};

chrome.pageAction.onClicked.addListener(function(tab) {
    var disabled = state[tab.id] = !state[tab.id];

    chrome.tabs.executeScript(tab.id, {
        code: disabled ? 'disable()' : 'enable()'
    });
    chrome.pageAction.setTitle({
        title: disabled ? 'Enable forced tab size' : 'Disable forced tab size',
        tabId: tab.id
    });
    chrome.pageAction.setIcon({
        path: 'images/icon19' + (disabled ? '-off' : '') + '.png',
        tabId: tab.id
    });
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {code: "forceSize()"});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse(request.method === 'getTabSize' ? {
        tabSize: localStorage.tabSize || 4
    } : {});
});
