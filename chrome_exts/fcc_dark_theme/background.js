  chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set(
        {
            background: '#1e1e1e',
            color:'#cccccc'
        }, 
        function() {
      console.log("The theme was changed to dark");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'learn.freecodecamp.org'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

  });