'use strict';

var storage = localStorage,
    gebi = document.getElementById.bind(document),
    input = gebi('tabsize'),
    message = gebi('message'),
    timeout = null;
    
chrome.runtime.sendMessage({
    method: 'getTabSize'
}, function(response) {
    tabSize = response.tabSize;
    init();
});

gebi('submit').addEventListener('click', save);
gebi('reset').addEventListener('click', reset);

function init() {
    input.value = tabSize;
}

function showMessage(text) {
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
        storage.tabSize = value;
    }
    showMessage('Tab size saved');
}

function reset() {
    storage.removeItem('tabSize');
    input.value = defaultSize;
    showMessage('Tab size reset');
}
