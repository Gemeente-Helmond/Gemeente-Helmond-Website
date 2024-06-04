var tmpl;

var debounce = function (func, wait, immediate) {
     var timeout;
     return function() {
         var context = this, args = arguments;
         var later = function() {
                 timeout = null;
                 if (!immediate) func.apply(context, args);
         };
         var callNow = immediate && !timeout;
         clearTimeout(timeout);
         timeout = setTimeout(later, wait);
         if (callNow) func.apply(context, args);
     };
};

function getModalResult(id, val) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      tmpl = document.getElementById("tmpl_es_result_modal").innerHTML;
      Mustache.parse(tmpl);
  	  var result = Mustache.render(tmpl, data);    
      var targetElement = document.getElementById(id);
      targetElement.innerHTML = result;
      // Required for Matomo
      if (typeof addEventTracker === "function") {
        addEventTracker(targetElement);
	  }
    }
  };
  xhttp.open("GET", "/search-result-modal-data?q=" + val, true);
  xhttp.send();
}


function autocomplete(inp) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", debounce(function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      //console.log(val);
      if (!val) { return false;}
      currentFocus = -1;
      document.getElementById("searchform").classList.add('hasfocus');
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items p-3 bg-white border border-primary border-top-0");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      getModalResult(this.id + "autocomplete-list", val);
      //setArrowfunction(this.id + "autocomplete-list", val);
  }, 500));
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      // TO DO: push tab with keydown
  });
  
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp && !x[i].contains(elmnt)) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
    document.getElementById("searchform").classList.remove('hasfocus');
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

var esCallback = function(){
  tmpl = document.getElementById("tmpl_es_result_modal").innerHTML;
  Mustache.parse(tmpl);
  
  autocomplete(document.getElementById("searchpageinput"));
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  esCallback();
} else {
  document.addEventListener("DOMContentLoaded", esCallback);
}