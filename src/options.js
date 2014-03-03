var storage = localStorage,
    gebi = document.getElementById.bind(document),
    defaultSize = 4,
    input = gebi('tabsize'),
    message = gebi('message'),
    timeout = null;

gebi('submit').addEventListener('click', save);
gebi('reset').addEventListener('click', reset);

input.value = storage.tabSize || defaultSize;

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
