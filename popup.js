document.addEventListener('DOMContentLoaded', function () {
  
  var switchBtn = document.getElementById("switch")

  switchBtn.addEventListener("click", function(){
    function sendMsg(msg){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: msg}, function(response) {
          console.log(response.farewell);
        });
      });
    }
    if (document.getElementById("switch").checked) {
      document.getElementById("switchLabel").innerHTML = "Disabled"
      sendMsg("switch1")
    } else{
      document.getElementById("switchLabel").innerHTML = "Enabled"
      sendMsg("switch2")
    }
  })

})