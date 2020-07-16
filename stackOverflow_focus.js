function changeSyle(elementID, stypeProp, data){
    document.getElementById(elementID).style[stypeProp] = data
}

changeSyle("sidebar", "display", "none")
changeSyle("left-sidebar", "display", "none")

// Center main content
changeSyle("content", "border", "0px")

// Center main content
changeSyle("mainbar", "float", "none")
changeSyle("mainbar", "margin", "auto")

// Center top question headder
changeSyle("question-header", "margin", "auto")
changeSyle("question-header", "width", "100%")
changeSyle("question-header", "maxWidth", "728px")

// Center top question sub headder
document.getElementById("mainbar").parentElement.children[1].style.margin = "auto"
document.getElementById("mainbar").parentElement.children[1].style.maxWidth = "728px"

// Hide top bar
document.querySelector(".top-bar").style.display = "none"