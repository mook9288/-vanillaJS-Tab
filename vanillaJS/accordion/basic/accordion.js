
var accItem = document.querySelectorAll('.panel-group > .panel');
var accHeader = document.querySelectorAll('.panel-group > .panel .panel-title a');
var defaultIdx = 0;

[].forEach.call(accHeader, function (el, i) {
  var accContentID = el.getAttribute("href");
  var accContentEl = document.querySelector(accContentID);
  
  if (defaultIdx === i) {
    el.classList.add("active");
    accContentEl.style.display = "block";
  } else {
    accContentEl.style.display = "none";
  }
  
  el.addEventListener("click", function (e) {
    e.preventDefault();
    var target = e.currentTarget.getAttribute("href");
    var targetContent = document.querySelector(target);
    
    [].forEach.call(accItem, function (el, j) {
      var hideHeaderID = el.querySelector('.panel-title a').getAttribute("href");
      var hideContentID = document.querySelector(hideHeaderID);
      if(i != j){
        el.querySelector('.panel-title a').classList.remove('active');
        hideContentID.style.display = "none";
      }
    });
      
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      targetContent.style.display = "none";
    } else {
      el.classList.add("active");
      targetContent.style.display = "block";
    }
  });
});
