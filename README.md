#github-forcetabsize

This is a Chrome extension that attempts to normalize the indentation level 
in GitHub's code viewer regardless if tabs or spaces are used.
It assumes that the first indented non-comment line is at the first level of
indentation and adjusts the indentation accordingly. It also applies `tab-size`
CSS to the code viewer. The changes in tab size can be turned off with a page
action button. The extention doesn't affect other functions of GitHub.

Note: Reducing the number or spaces is not yet supported, it only adds spaces
or changes tab size.

### Installation

Install at [Chrome Web Store](https://chrome.google.com/webstore/detail/github-forcetabsize/djgjbkiceplcmddchilbonmgmfdjbafc).

### Changelog

**0.1.1** (2014-03-04)

 * Using `chrome.storage.sync` instead of `localStorage`

**0.1.0** (2014-03-03)

 * Initial release

MIT licensed. Made by slikts <dabas@untu.ms>
