/***
	This JS file is responsible for all type of scrolling on site.
	(different btn that changes current user location on site by scroll)
	!Scroll must be smooth
***/

/* Event Listeners */
// A btn .below, which scrolls to the child of body (For instance: tab1 to tab2)
document.querySelector("body").addEventListener("click", scrollBelow);

/* Event functions */

// A function which scrolls to the next body child
function scrollBelow(event) {
	// To make function work and perform scrolling event.target must be scroll btn element or its child
	let obj = event.target;
	let scrollDurationMs = 500; // Scroll animation time(Milliseconds)

	/* Checking if user clicked on scroll btn elem or on its child */
	// Getting scroll btn element in case if user clicked on its child
	let scrollBtn = findParentByClassName(obj, "js-scroll-below");
	if (obj.classList.contains('js-scroll-below') || scrollBtn) {
		let currentTab = obj.parentNode; // getting a first parent(of btn)
		// Filtering parents of element until body child wont be found
		// And its gonna be our current element(tab)
		while (currentTab.parentNode.tagName !== "BODY") {
			currentTab = currentTab.parentNode;
		}
		// Getting a height of elem(its length that should be scrolled)
		let currentTabHeightPx = currentTab.clientHeight
		doScrolling(currentTabHeightPx, scrollDurationMs);
	}
}

/* Helper functions */

/*** 
	AN ANSWER FROM STACKOVERFLOW
	https://stackoverflow.com/questions/17722497/scroll-smoothly-to-specific-element-on-page
***/
function doScrolling(elementY, duration) { 
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}