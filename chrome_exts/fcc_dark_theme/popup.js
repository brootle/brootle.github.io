let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('background', function(data) {
    changeColor.style.backgroundColor = data.background;
    changeColor.setAttribute('value', data.background);
});

  
changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {   
                code: `
                    document.body.style.backgroundColor = "#1e1e1e"; 
                    document.body.style.color = "#cccccc"; 

                    let links = document.getElementsByTagName("a");
                    Array.prototype.forEach.call(links, link => {
                        link.style.color = "#cccccc";
                    });                    
                `
            });
    });
};
