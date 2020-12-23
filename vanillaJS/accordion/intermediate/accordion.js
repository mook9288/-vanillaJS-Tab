var classes = {
  add: function (el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  },
  remove: function (el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
}

var defaultHeaderID = null;
var defaultIdx = 0;
var headers ={}; 
var old = null;

function init() {
  initVars();
  initEvents();
  show(headers[defaultHeaderID]);
}

function initVars() {
  var elements = document.querySelectorAll(".panel-heading a");
  
  [].forEach.call(elements, function (el, i) {
    var accContentID = el.getAttribute("href");
    var accContentEl = document.querySelector(accContentID);
    
    if (!accContentEl) {
      throw Error("컨텐츠가 없다!!!");
    }

    headers[accContentID] = {
      header: el,
      content: accContentEl,
      index: i
    }
    // console.log(headers[accContentID])
    console.log(defaultIdx)
    
    if (defaultIdx === i) {
      defaultHeaderID = accContentID;
    } else {
      accContentEl.style.display = "none";
    }
  })
}

function initEvents() {
  for (var key in headers) {
    var obj = headers[key];
    var header = obj.header;
    
    header.addEventListener("click", function (e) {
      e.preventDefault();
      var target = e.currentTarget.getAttribute("href");
      var me = headers[target];
      show(me);
      console.log(me)
    });
  }
  
}

function show(target) {
  if (old) {
    hide(old);
  }
  classes.add(target.header,"active");
  target.content.style.display = "block";
  old = target;
}

function hide(target) {
  classes.remove(target.header,"active");
  target.content.style.display = "none";
}

init();