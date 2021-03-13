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

function toggleHidden(element) {
  var isHidden = [...element.classList].find(function(cssClass) {return cssClass === 'hidden'})
  if (isHidden) {
    element.classList.remove('hidden')
  } else {
    element.classList.add('hidden')
  }
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

  var switchShadow = document.getElementById("switchShadow");
  var shadowInput = document.getElementById("shadowInput");
  var borderRadiusInput = document.getElementById("borderRadiusInput");
  var widthInput = document.getElementById("widthInput");
  var colourInput = document.getElementById('colourInput')

  // Wait until coral has loaded the element
  Coral.commons.ready(widthInput, function() {
    
    // Load saves settings from local storage
    try {
      chrome.storage.local.get(['width'], function (data) {
        // Check if local storage width is empty
        if (typeof data.width != 'string') {
          widthInput.value = 65;
        } else {
          widthInput.value = data.width;
        }
      })

      chrome.storage.local.get(['isShadow', 'shadow'], function (data) {
        // Check if data.isShadow exists on local storage
        if (typeof data.isShadow == 'boolean') {
          if (data.isShadow) {
            switchShadow.setAttribute("checked")
            if (data.shadow) {
              shadowInput.value = data.shadow
            } else {
              shadowInput.value = ""
            }
          } else{
            switchShadow.removeAttribute("checked")
          }
        } else {
          switchShadow.setAttribute("checked")
        }
      })

      chrome.storage.local.get(['bgColour'], function (data) {
        // Check if local storage width is empty
        if (typeof data.bgColour != 'string') {
          colourInput.value = "rgb(50,50,50)";
        } else {
          colourInput.value = data.bgColour;
        }
      })

      chrome.storage.local.get(['borderRadius'], function (data) {
        // Check if local storage width is empty
        if (typeof data.borderRadius != 'string') {
          borderRadiusInput.value = 10;
        } else {
          borderRadiusInput.value = data.borderRadius;
        }
      })


    } catch(e) {
      // We haven't stored a width setting yet
      console.log(e);
    }

    // Set width:
    widthInput.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        width: widthInput.value
      })
    })

    // Set shadow:
    switchShadow.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        isShadow: switchShadow.hasAttribute("checked")
      })

      // Hide the custom shadow input
      toggleHidden(shadowInput)
    })

    // Set custom shadow:
    shadowInput.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        shadow: shadowInput.value
      })
    })

    // Set border-radius:
    borderRadiusInput.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        borderRadius: borderRadiusInput.value
      })
    })

    // Set background colour
    colourInput.on('change', function () {
      // Update the value in the storage
      chrome.storage.local.set({ 
        bgColour: colourInput.value
      })
    })

  })

})