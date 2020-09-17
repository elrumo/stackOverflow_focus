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
  var switchShadow = document.getElementById('switchShadow')
  var colourInput = document.getElementById('colourInput')

  // Wait until coral has loaded the element
  Coral.commons.ready(widthSetting, function() {
    
    // Load saves settings from local storage
    try {
      chrome.storage.local.get(['width'], function (data) {
        console.log(data.width);
        // Check if local storage width is empty
        if (typeof data.width != 'string') {
          widthSetting.value = 65;
        } else{
          widthSetting.value = data.width;
        }
      })

      chrome.storage.local.get(['isShadow'], function (data) {
        // Check if data.isShadow exists on local storage
        if (typeof data.isShadow == 'boolean') {
          if (data.isShadow) {
            switchShadow.setAttribute("checked")
          } else{
            switchShadow.removeAttribute("checked")
          }
        }else{
          switchShadow.setAttribute("checked")
        }
      })

      chrome.storage.local.get(['bgColour'], function (data) {
        // Check if local storage width is empty
        if (typeof data.bgColour != 'string') {
          colourInput.value = "rgb(50,50,50)";
        } else{
          colourInput.value = data.bgColour;
        }
      })


    } catch(e) {
      // We haven't stored a width setting yet
      console.log(e);
    }

    // Set width:
    widthSetting.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        width: widthSetting.value
      })
    })

    // Set shadow:
    switchShadow.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        isShadow: switchShadow.hasAttribute("checked")
      })
    })

    colourInput.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        bgColour: colourInput.value
      })
    })

  })

})