let isFocused = false;
let width = "65";
var isShadow = true;
let bgColour = "rgb(50,50,50)"

// We add our focus styles using a custom <style> element on the page
// This will create the element and add it to the documents head
const styleElement = document.createElement('style');
styleElement.id = 'so-focus-styles';
document.addEventListener("DOMContentLoaded", () => {
    document.head.appendChild(styleElement);
});

// We save our styles in this object so we can easily overwrite and change values
// This object uses the structure styles[CSS-Selector][Property Name] = value;
let styles = {};

// Reload and write styles if we are in focus mode
// This will allow us to refresh all values
function reloadStyles() {
    if (isFocused) {
        focusStack();
    }
}

// Load our settings from local storage
function updateSettings() {
    // Load width setting from storage
    try {
        chrome.storage.local.get(['width', 'isShadow', 'bgColour'], function (data) {
            if (typeof data.width == "string") {
                width = data.width;
            }
            if (typeof data.isShadow == "boolean") {
                isShadow = data.isShadow;
            }
            if (typeof data.bgColour == "string") {
                bgColour = data.bgColour;
            }
            reloadStyles();
        })
    } catch(e) {
        // We haven't stored a width setting yet
        reloadStyles()
    }
}

function changeStyle(selector, styleProp, data) {
    if (!styles[selector]) {
        styles[selector] = {};
    }

    styles[selector][styleProp] = data;
}

// Write our styles to the stylesheet element
function flushStyles() {
    // Generate a CSS Stylesheet from our styles object
    let stylesheet = '';
    for(let selector in styles) {
        stylesheet += `${selector} {`;

        for(let prop in styles[selector]) {
            stylesheet += `${prop}: ${styles[selector][prop]} !important;`;
        }

        stylesheet += '}';
    }

    styleElement.innerHTML = stylesheet;

    // Make sure our body element is visible
    document.body.style.visibility = 'visible';
}

function focusStack(){
    // Body
    changeStyle("body", "background", bgColour)

    // Center top question sub headder
    changeStyle(".inner-content:nth-child(1)", "margin", "auto")
    changeStyle(".inner-content:nth-child(1)", "maxWidth", "728px")

    changeStyle("#sidebar", "display", "none")
    changeStyle("#left-sidebar", "display", "none")
    // Center main content
    changeStyle("#content", "border", "0px")
    changeStyle("#content", "width", width + "%")
    changeStyle("#content", "max-width", "initial")
    changeStyle("#content", "margin-bottom", "60px")
    changeStyle("#content", "border-radius", "10px")
    if (isShadow) {
        changeStyle("#content", "box-shadow", "0px 15px 80px -10px rgba(0, 0, 0, 0.8)")
    } else{
        changeStyle("#content", "box-shadow", "0px 0px 0px 0px rgba(0, 0, 0, 0)")
    }

    // Center main content
    changeStyle("#mainbar", "float", "none")
    changeStyle("#mainbar", "margin", "auto")
    changeStyle("#mainbar", "width", "90%")
    // Center top question headder
    changeStyle("#question-header", "margin", "auto")
    changeStyle("#question-header", "width", "100%")
    changeStyle("#question-header", "maxWidth", "728px")

    // Container
    changeStyle(".container", "margin", 0)
    changeStyle(".container", "max-width", "initial")

    // Footer
    changeStyle(".site-footer--container", "display", "none")
    // Hide top bar
    changeStyle(".top-bar", "display", "none")
    changeStyle(".js-dismissable-hero", "display", "none")
    
    // Write our changes to the site's stylesheet
    flushStyles();

    isFocused = true;
}

document.addEventListener("DOMContentLoaded", focusStack);
updateSettings();

function unFocusStack(){
    // Simply remove all our custom styles
    styles = {};
    flushStyles();

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
            changeStyle("#content", "width", width + "%")
            flushStyles();
        }
    } 

    if (changes.isShadow) {
        isShadow = changes.isShadow.newValue;
        // Update the page directly if we are already focused
        if (isFocused) {
            if (changes.isShadow.newValue) {
                changeStyle("#content", "box-shadow", "0px 15px 80px -10px rgba(0, 0, 0, 0.8)")
            } else{
                changeStyle("#content", "box-shadow", "0px 0px 0px 0px rgba(0, 0, 0, 0)")
            }
            flushStyles();
        } 
    }

    if (changes.bgColour) {
        bgColour = changes.bgColour.newValue;
        // alert(bgColour)
        // Update the page directly if we are already focused
        if (isFocused) {
            changeStyle('body', 'background', bgColour);
            flushStyles();
        }
    } 
});
