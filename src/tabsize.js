'use strict';

var cache = [],
    forcedTabSize = null,
    nbsp = '&nbsp;',
    middot = '&middot;',
    disabledClassName = '__forcetabsize_disabled__',
    addedTabClassName = '__forcetabsize__',
    bodyClassList = document.body.classList,
    disable = bodyClassList.add.bind(bodyClassList, disabledClassName);

function enable() {
    bodyClassList.remove(disabledClassName);
    // Forcing size in case it didn't work before for some reason
    forceSize();
}

// Get the tab size setting from extension's localStorage
chrome.runtime.sendMessage({
    method: 'getTabSize'
}, function(response) {
    forcedTabSize = response.tabSize;
    forceSize();
});

// Counts leading instances of a substring
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
            // Skip previously processed elemenets
            if (~cache.indexOf(codeEl)) {
                return;
            }

            cache.push(codeEl);

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
                            // This probably is a comment line so skip it
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
                    lineEl.innerHTML = '<span class="' + addedTabClassName + '">' +
                            Array(spaces / tabSize * forcedTabSize - spaces + 1).join(middot) +
                            '</span>' + html;

                    return true;
                });
        });
}
