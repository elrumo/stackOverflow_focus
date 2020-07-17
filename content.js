function focusStack(){
    function changeSyle(elementID, stypeProp, data){
        document.getElementById(elementID).style[stypeProp] = data
    }

    // Body
    document.getElementsByTagName("body")[0].style.background = "rgb(50,50,50)"
    // Center top question sub headder
    document.getElementById("mainbar").parentElement.children[1].style.margin = "auto"
    document.getElementById("mainbar").parentElement.children[1].style.maxWidth = "728px"

    changeSyle("sidebar", "display", "none")
    changeSyle("left-sidebar", "display", "none")
    // Center main content
    changeSyle("content", "border", "0px")
    changeSyle("content", "width", "65%")
    changeSyle("content", "margin-bottom", "60px")
    changeSyle("content", "border-radius", "10px")
    changeSyle("content", "box-shadow", "0px 15px 80px -10px rgba(0, 0, 0, 0.8)")
    // Center main content
    changeSyle("mainbar", "float", "none")
    changeSyle("mainbar", "margin", "auto")
    changeSyle("mainbar", "width", "90%")
    // Center top question headder
    changeSyle("question-header", "margin", "auto")
    changeSyle("question-header", "width", "100%")
    changeSyle("question-header", "maxWidth", "728px")

    // Footer
    document.querySelector(".site-footer--container").style.display = "none"
    // Hide top bar
    document.querySelector(".top-bar").style.display = "none"
    if(document.querySelector(".js-dismissable-hero")){
        document.querySelector(".js-dismissable-hero").style.display = "none"
    }
}

focusStack()

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