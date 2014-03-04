'use strict';

var storage = chrome.storage.sync,
        gebi = document.getElementById.bind(document),
        input = gebi('tabsize'),
        message = gebi('message'),
        timeout = null,
        tabSize,
        defaultSize;

chrome.runtime.sendMessage({method: 'syncTabSize'}, function() {
    chrome.runtime.sendMessage({method: 'getTabSize'},
    function(response) {
        tabSize = response.tabSize;
        defaultSize = response.defaultSize;
        init();
    });
});

gebi('submit').addEventListener('click', save);
gebi('reset').addEventListener('click', reset);

function init() {
    input.value = tabSize;
}

function showMessage(text) {
    chrome.runtime.sendMessage({method: 'syncTabSize'});
    message.innerText = text;
    window.clearTimeout(timeout);
    timeout = window.setTimeout(showMessage.bind(null, ''), 2500);
}

function save() {
    var value = parseInt(input.value, 10);
    if (!value) {
        return;
    }
    input.value = value;
    if (value !== defaultSize) {
        storage.set({
            'tabSize': value
        }, showMessage.bind(null, 'Tab size saved'));
    }
}

function reset() {
    storage.remove('tabSize', function() {
        showMessage('Tab size reset');
        input.value = defaultSize;
    });
}
