var cache = [],
    forcedTabSize = null,
    nbsp = '&nbsp;',
    middot = '&middot;',
    disabledClassName = '__forcetabsize_disabled__',
    addedTabClassName = '',
    bodyClassList = document.body.classList,
    disable = bodyClassList.add.bind(bodyClassList, disabledClassName);

function enable() {
    bodyClassList.remove(disabledClassName);
    forceSize();
}

chrome.runtime.sendMessage({
    method: 'getTabSize'
}, function(response) {
    forcedTabSize = response.tabSize;
    forceSize();
});

function count(str, x) {
    var i = 0,
            len = x.length;
    for (; ; i += 1) {
        if (str.substr(i * len, len) === x) {
            continue;
        }
        return i;
    }
}

function forceSize() {
    Array.prototype.forEach.call(document.getElementsByClassName('code-body'),
        function(codeEl) {
            if (~cache.indexOf(codeEl)) {
                return;
            }
            //console.log('forceSize', forcedTabSize, codeEl);

            cache.push(codeEl);
            var i = 0;

            codeEl.style.tabSize = forcedTabSize;

            var tabSize = 0;
            Array.prototype.forEach.call(codeEl.getElementsByClassName('line'),
                function(lineEl) {
                    var html = lineEl.innerHTML;
                    var spaces = count(html, nbsp);
                    if (!spaces) {
                        return true;
                    }
                    if (!tabSize) {
                        if (/\s+\*/.test(html)) {
                            return true;
                        }
                        tabSize = spaces;
                    }
                    var level = spaces / tabSize;
                    if (Math.round(level) !== level) {
                        return true;
                    }
                    if (spaces === forcedTabSize * level) {
                        return false;
                    }
                    lineEl.innerHTML = '<span class="__forcetabsize__">' +
                            Array(spaces / tabSize * forcedTabSize - spaces + 1).join(middot) +
                            '</span>' + html;

                    i += 1;
                    return true;
                });
        });
}
