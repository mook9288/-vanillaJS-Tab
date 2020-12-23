
var tabHeader = document.querySelectorAll('.tab-wrapper > .tab-headers .tab-header');
var tabContent = document.querySelectorAll('.tab-wrapper > .tab-contents .panel');
var defaultIdx = 0;

[].forEach.call(tabHeader, function (el, i) {
  var elements = el.querySelector("a");
  var tabContentID = elements.getAttribute("href");
  var tabContentEl = document.querySelector(tabContentID);
  
  if (defaultIdx === i) {
    elements.classList.add("active");
    tabContentEl.style.display = "block";
  } else {
    tabContentEl.style.display = "none";
  }
  
  elements.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.currentTarget.getAttribute("href");
    var targetContent = document.querySelector(target);
    
    [].forEach.call(tabHeader, function (el, j) {
      var hideHeaderID = el.querySelector("a").getAttribute("href");
      var hideContentID = document.querySelector(hideHeaderID);
      if(i != j){
        el.querySelector("a").classList.remove('active');
        hideContentID.style.display = "none";
      }
    });
      
    if (elements.classList.contains("active")) {
      elements.classList.remove("active");
      targetContent.style.display = "none";
    } else {
      elements.classList.add("active");
      targetContent.style.display = "block";
    }
  });
});
