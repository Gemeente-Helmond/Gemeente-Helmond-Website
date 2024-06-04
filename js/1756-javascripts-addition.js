/* Write here your custom javascript codes */
function setCookie(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
            document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        }

        function getCookie(key) {
            var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
            return keyValue ? keyValue[2] : null;
        }
function iframetitle() {
      $j('.map iframe').attr('title','googlekaart');
}	
function correctFooter(){
  var h = $j("#footer").height();
  console.log('footer height:' + h);
  $j("body").css("margin-bottom",h+"px");
}
var sitefunctions = {
   
	
    // font resizer
   textresize : function(){
      var fontsizeContainer = $j("#FontSize"); // div waar de links in staan
      $j(fontsizeContainer).css('display','inline-block');
      var $cookie_name = "LetterFormaat";
      var originalFontSize = 'originalfont';
      var smallFontSize = 'smallfont';
      var bigFontSize = 'bigfont';
      var biggerFontSize = 'biggerfont';
      var $getSize = getCookie($cookie_name);
      if($getSize) {
            $j("body").addClass($getSize);
      }
      // reset link - reset cookie
      $j(".FontSizeReset", fontsizeContainer).click(function(){
            $j("body").removeClass("bigfont").removeClass("biggerfont"); 
            $j.cookie($cookie_name, null,{path: '/'});
        	correctFooter();
            return false;
      });
      // +link
      $j(".FontSizeInc", fontsizeContainer).click(function(){
	  $j.cookie("contrastbuttons", null,{path: '/'});
  		 $j.cookie($cookie_name, bigFontSize,{path: '/'});
		 $j("body").removeClass("biggerfont").addClass("bigfont");
        correctFooter();
         return false;
      });
      // ++link
      $j(".FontSizeIncInc", fontsizeContainer).click(function(){
		 $j.cookie($cookie_name, biggerFontSize,{path: '/'});
		 $j("body").removeClass("bigfont").addClass("biggerfont");
        correctFooter();
         return false;
      });
  },
  contrast:function() {
  	// contrastbuttons
     if ( $j.cookie("contrastbuttons") ) {
               $j("body").addClass("contrastbody");
               $j("#hoogcontrast").addClass("contrastactive").find("a").text("Normaal contrast");
     }
     $j("#hoogcontrast").click(function(e){
       e.preventDefault();
                 if ( $j(this).hasClass("contrastactive") ) {
                      $j(this).removeClass("contrastactive").find("a").text("Hoog contrast");;
                      $j.cookie("contrastbuttons", null,{path: '/'});
                      $j("body").removeClass("contrastbody");
               return false;
                 }
                 else {
                      $j(this).addClass("contrastactive").find("a").text("Normaal contrast");
                      $j.cookie("contrastbuttons", "contrast",{path: '/'});
                      $j("body").addClass("contrastbody");
               return false;
                 }
			
     });
  },
};

////////////////     ONLOAD     //////////////////////

$j( document ).ready(function() {
  $j("a:contains('@')").addClass("notranslate");
  $j("span:contains('@')").addClass("notranslate");
  
  correctFooter();
  $j(window).on("resize",function() {correctFooter();});
  //textimages
  //$j("img.textimage").wrap("<div class='textimage'></div>").after(function(){return "<span class='altoverlay'>"+$j(this).attr("alt")+"</span>"});
  $j("img.textimage").closest("a").wrap("<div class='textimagecontainer'></div>").after(function(){return "<span class='altoverlay'>"+$j(this).find("img").attr("alt")+"</span>"});
  $j("span.altoverlay").on("click",function(e){
      var url = $j(this).parent().find("a").first().attr("href");
      window.location=url;
    });
// font resizer
   $j('#FontSize').show().append(' <span>Tekst</span> <a class="FontSizeReset" href="#" title="Normaal lettertype">A </a> <a class="FontSizeInc" href="#" title="Groter lettertype">A+</a> <a class="FontSizeIncInc" href="#" title="Grootste lettertype">A++</a>');
   sitefunctions.textresize();
   // contrast
	sitefunctions.contrast();
	
   // Activate Carousel
   $j("#pageCarousel").carousel();
   $j("#playButton").click(function () {
     $j("#pageCarousel").carousel('cycle');
   });
   $j("#pauseButton").click(function () {
     $j("#pageCarousel").carousel('pause');
   }); 
   
   $j(".postchange").change(function() {
     this.form.submit();
   });
   
   $j('#bdsorttitlelink').click(function(){
     $j('#bdlisttitle').toggle();
	 $j('#bdlistdate').toggle();
     return false;
   });
   
   $j('#bdsortdatelink').click(function(){
     $j('#bdlisttitle').toggle();
	 $j('#bdlistdate').toggle();
     return false;
   });
   $j('.map iframe').each(function(){
      $j(this).attr('title','googlekaart');
   });
  
  // Google Translate make sure popup doesnt disappear on click.
  $(document).on('click', '#google_translate_element select', function(e) {
    e.stopPropagation();
    e.preventDefault();
  });
  
// webrichtlijnen, maak een h2 boven de paginering voor de aria-labelledby
  $j('.pages').closest('.sml_list').prepend('<h2 id="h2listsubtitle" class="hidden">Overzicht</h2>');
 console.log('pages');
// webrichtlijnen, zet een titel op het iframe
setTimeout(iframetitle, 2000);
// New bug in IE11 -- scrolling position:fixed + background-image elements jitters badly   
  if(navigator.userAgent.match(/MSIE 10/i) || navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.match(/Edge\/12\./)) {
    $j('body').on("mousewheel", function () {
      event.preventDefault();
      var wd = event.wheelDelta;
      var csp = window.pageYOffset;
      window.scrollTo(0, csp - wd);
    });
  }
   
});