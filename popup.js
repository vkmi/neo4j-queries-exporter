(function(){
  var currentTabId;
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    currentTabId = tab.id;
  });

  var codeToInject = {
    code:'(function(){ var allCypherQueries = JSON.parse(localStorage.getItem("neo4j.documents")); var allQueryString = ""; for (i=19; i < allCypherQueries.length; i++){ allQueryString += allCypherQueries[i].content + "\\n\\n";}; var element = document.createElement("a"); element.href = window.URL.createObjectURL(new Blob([allQueryString], {type: "text/plain;charset=utf-8;"})); element.download = "queriesBackup.txt"; document.body.appendChild(element); element.click(); document.body.removeChild(element);})();'
  };

  (function(){
    chrome.tabs.executeScript(currentTabId,codeToInject);
  })();
})();