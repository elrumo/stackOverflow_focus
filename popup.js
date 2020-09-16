function sendMsg(msg) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: msg,
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var switchBtn = document.getElementById("switch")

  switchBtn.addEventListener("click", function () {
    if (document.getElementById("switch").checked) {
      document.getElementById("switchLabel").innerHTML = "Disabled"
      sendMsg("switch1")
    } else {
      document.getElementById("switchLabel").innerHTML = "Enabled"
      sendMsg("switch2")
    }
  })

  var widthSetting = document.getElementById('width-setting')

  // Wait until coral has loaded the element
  Coral.commons.ready(widthSetting, function() {
    // Load width setting from storage
    try {
      chrome.storage.local.get(['width'], function (data) {
        widthSetting.value = data.width;
      })
    } catch(e) {
      // We haven't stored a width setting yet
    }
    
    widthSetting.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        width: widthSetting.value
      })
    })
  })

})