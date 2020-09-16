let isFocused = false;
let width = 65;

function updateSettings(callback) {
    // Load width setting from storage
    try {
        chrome.storage.local.get(['width'], function (data) {
            width = data.width;
            callback();
        })
    } catch(e) {
        // We haven't stored a width setting yet
        callback()
    }
}

function changeStyle(elementID, stypeProp, data){
    document.getElementById(elementID).style[stypeProp] = data
}

function focusStack(){
    // Body
    document.getElementsByTagName("body")[0].style.background = "rgb(50,50,50)"
    // Center top question sub headder
    document.getElementById("mainbar").parentElement.children[1].style.margin = "auto"
    document.getElementById("mainbar").parentElement.children[1].style.maxWidth = "728px"

    changeStyle("sidebar", "display", "none")
    changeStyle("left-sidebar", "display", "none")
    // Center main content
    changeStyle("content", "border", "0px")
    changeStyle("content", "width", width + "%")
    changeStyle("content", "margin-bottom", "60px")
    changeStyle("content", "border-radius", "10px")
    changeStyle("content", "box-shadow", "0px 15px 80px -10px rgba(0, 0, 0, 0.8)")
    // Center main content
    changeStyle("mainbar", "float", "none")
    changeStyle("mainbar", "margin", "auto")
    changeStyle("mainbar", "width", "90%")
    // Center top question headder
    changeStyle("question-header", "margin", "auto")
    changeStyle("question-header", "width", "100%")
    changeStyle("question-header", "maxWidth", "728px")

    // Footer
    document.querySelector(".site-footer--container").style.display = "none"
    // Hide top bar
    document.querySelector(".top-bar").style.display = "none"
    if(document.querySelector(".js-dismissable-hero")){
        document.querySelector(".js-dismissable-hero").style.display = "none"
    }

    isFocused = true;
}

updateSettings(focusStack)

function unFocusStack(){
    // Body
    document.getElementsByTagName("body")[0].style = ""
    // Center top question sub headder
    document.getElementById("mainbar").parentElement.children[1].style = ""

    document.getElementById("sidebar").style = ""
    document.getElementById("left-sidebar").style = ""    
    // Center main content
    document.getElementById("content").style = ""

    // Center main content
    document.getElementById("mainbar").style = ""
    // Center top question headder
    document.getElementById("question-header").style = ""

    // Hide top bar
    document.querySelector(".top-bar").style = ""

    // Footer
    document.querySelector(".site-footer--container").style = ""
    if(document.querySelector(".js-dismissable-hero")){
        document.querySelector(".js-dismissable-hero").style = ""
    }

    isFocused = false;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "switch2"){
        focusStack()
        console.log("Enabling Plugin");
    }
    if (request.greeting == "switch1"){
        unFocusStack()
        console.log("Disabling Plugin");
    }
  });

// Listen for changes of the width
chrome.storage.local.onChanged.addListener(function (changes) {
    if (changes.width) {
        width = changes.width.newValue;

        // Update the page directly if we are already focused
        if (isFocused) {
            changeStyle("content", "width", width + "%")
        }
    }
});
