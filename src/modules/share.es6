import BrowserKit from "checkout-browser-kit";

export var targets = [{
    name: 'twitter',
    iconUrl: 'http://localhost:8000/img/twitter.png',
    postUrl: 'https://twitter.com/intent/tweet',
    titleField: 'text',
    urlField: 'url'
}];

// create target lookup by name
var targetLookup = {};
for (var target of targets) {
    targetLookup[target.name] = target;
}

export function post(targetName) {
    //TODO: Use Readability Parser API to get content metadata
    //Below is just a hard-coded example

    var metadata = {
        [targetLookup[targetName].titleField]: 'Building web plugins', [targetLookup[targetName].urlField]: 'http://www.example.com/folder1/folder2'
    };
    var postUrl = targetLookup[targetName].postUrl;

    var targetUrl = postUrl + BrowserKit.toQueryString(postUrl, metadata);
    window.open(targetUrl, '_blank');
}
