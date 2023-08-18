const minimapObject = document.getElementById("minimap");
const minimapDoc = minimapObject.contentDocument;

minimapObject.onload = function () {
    const svgRoot = minimapDoc.querySelector("svg");
    const contentContainer = document.getElementById("content-container");

    // Get the initial size of the SVG
    const svgWidth = svgRoot.getAttribute("width");
    const svgHeight = svgRoot.getAttribute("height");

    // Update minimap view on initial load
    updateMinimapView(contentContainer, svgWidth, svgHeight);

    // Listen for zoom and pan events on your main content
    contentContainer.addEventListener("scroll", function () {
        updateMinimapView(contentContainer, svgWidth, svgHeight);
    });
};

function updateMinimapView(contentContainer, svgWidth, svgHeight) {
    const minimapViewport = minimapDoc.querySelector("svg>svg");
    const contentWidth = contentContainer.scrollWidth;
    const contentHeight = contentContainer.scrollHeight;

    // Calculate the scale factors for the minimap view
    const scaleX = svgWidth / contentWidth;
    const scaleY = svgHeight / contentHeight;

    // Calculate the minimap view box position
    const viewBoxX = contentContainer.scrollLeft * scaleX;
    const viewBoxY = contentContainer.scrollTop * scaleY;

    // Set the minimap view box attributes
    minimapViewport.setAttribute("viewBox", `${viewBoxX} ${viewBoxY} ${svgWidth} ${svgHeight}`);
}