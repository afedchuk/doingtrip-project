!function(i,e,t,s){t.swipebox=function(o,n){var a={useCSS:!0,hideBarsDelay:3e3},r=this,d=t(o),o=o,l=o.selector,p=t(l),c=e.createTouch!==s||"ontouchstart"in i||"onmsgesturechange"in i||navigator.msMaxTouchPoints,u=!!i.SVGSVGElement,b='<div id="swipebox-overlay">					<div id="swipebox-slider"></div>					<div id="swipebox-caption"></div>					<div id="swipebox-action">						<a id="swipebox-close"></a>						<a id="swipebox-prev"></a>						<a id="swipebox-next"></a>					</div>			</div>';r.settings={},r.init=function(){r.settings=t.extend({},a,n),p.click(function(i){i.preventDefault(),i.stopPropagation(),index=d.index(t(this)),x.target=t(i.target),x.init(index)})};var x={init:function(i){this.target.trigger("swipebox-start"),this.build(),this.openSlide(i),this.openImg(i),this.preloadImg(i+1),this.preloadImg(i-1)},build:function(){var e=this;if(t("body").append(b),e.doCssTrans()&&(t("#swipebox-slider").css({"-webkit-transition":"left 0.4s ease","-moz-transition":"left 0.4s ease","-o-transition":"left 0.4s ease","-khtml-transition":"left 0.4s ease",transition:"left 0.4s ease"}),t("#swipebox-overlay").css({"-webkit-transition":"opacity 1s ease","-moz-transition":"opacity 1s ease","-o-transition":"opacity 1s ease","-khtml-transition":"opacity 1s ease",transition:"opacity 1s ease"}),t("#swipebox-action, #swipebox-caption").css({"-webkit-transition":"0.5s","-moz-transition":"0.5s","-o-transition":"0.5s","-khtml-transition":"0.5s",transition:"0.5s"})),u){var s=t("#swipebox-action #swipebox-close").css("background-image");s=s.replace("png","svg"),t("#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close").css({"background-image":s})}d.each(function(){t("#swipebox-slider").append('<div class="slide"></div>')}),e.setDim(),e.actions(),e.keyboard(),e.gesture(),e.animBars(),t(i).resize(function(){e.setDim()}).resize()},setDim:function(){var e={width:t(i).width(),height:i.innerHeight?i.innerHeight:t(i).height()};t("#swipebox-overlay").css(e)},supportTransition:function(){for(var i="transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" "),t=0;t<i.length;t++)if(e.createElement("div").style[i[t]]!==s)return i[t];return!1},doCssTrans:function(){return r.settings.useCSS&&this.supportTransition()?!0:void 0},gesture:function(){if(c){var i=this,e=null,s=10,o={},n={},a=t("#swipebox-caption, #swipebox-action");a.addClass("visible-bars"),i.setTimeout(),t("body").bind("touchstart",function(i){return t(this).addClass("touching"),n=i.originalEvent.targetTouches[0],o.pageX=i.originalEvent.targetTouches[0].pageX,t(".touching").bind("touchmove",function(i){i.preventDefault(),i.stopPropagation(),n=i.originalEvent.targetTouches[0]}),!1}).bind("touchend",function(r){r.preventDefault(),r.stopPropagation(),e=n.pageX-o.pageX,e>=s?i.getPrev():-s>=e?i.getNext():a.hasClass("visible-bars")?(i.clearTimeout(),i.hideBars()):(i.showBars(),i.setTimeout()),t(".touching").off("touchmove").removeClass("touching")})}},setTimeout:function(){if(r.settings.hideBarsDelay>0){var e=this;e.clearTimeout(),e.timeout=i.setTimeout(function(){e.hideBars()},r.settings.hideBarsDelay)}},clearTimeout:function(){i.clearTimeout(this.timeout),this.timeout=null},showBars:function(){var i=t("#swipebox-caption, #swipebox-action");this.doCssTrans()?i.addClass("visible-bars"):(t("#swipebox-caption").animate({top:0},500),t("#swipebox-action").animate({bottom:0},500),setTimeout(function(){i.addClass("visible-bars")},1e3))},hideBars:function(){var i=t("#swipebox-caption, #swipebox-action");this.doCssTrans()?i.removeClass("visible-bars"):(t("#swipebox-caption").animate({top:"-50px"},500),t("#swipebox-action").animate({bottom:"-50px"},500),setTimeout(function(){i.removeClass("visible-bars")},1e3))},animBars:function(){var i=this,e=t("#swipebox-caption, #swipebox-action");e.addClass("visible-bars"),i.setTimeout(),t("#swipebox-slider").click(function(){e.hasClass("visible-bars")||(i.showBars(),i.setTimeout())}),t("#swipebox-action").hover(function(){i.showBars(),e.addClass("force-visible-bars"),i.clearTimeout()},function(){e.removeClass("force-visible-bars"),i.setTimeout()})},keyboard:function(){var e=this;t(i).bind("keyup",function(i){i.preventDefault(),i.stopPropagation(),37==i.keyCode?e.getPrev():39==i.keyCode?e.getNext():27==i.keyCode&&e.closeSlide()})},actions:function(){var i=this;d.length<2?t("#swipebox-prev, #swipebox-next").hide():(t("#swipebox-prev").bind("click touchend",function(e){e.preventDefault(),e.stopPropagation(),i.getPrev(),i.setTimeout()}),t("#swipebox-next").bind("click touchend",function(e){e.preventDefault(),e.stopPropagation(),i.getNext(),i.setTimeout()})),t("#swipebox-close").bind("click touchend",function(){i.closeSlide()})},setSlide:function(i,e){e=e||!1;var s=t("#swipebox-slider");this.doCssTrans()?s.css({left:100*-i+"%"}):s.animate({left:100*-i+"%"}),t("#swipebox-slider .slide").removeClass("current"),t("#swipebox-slider .slide").eq(i).addClass("current"),this.setTitle(i),e&&s.fadeIn(),t("#swipebox-prev, #swipebox-next").removeClass("disabled"),0==i?t("#swipebox-prev").addClass("disabled"):i==d.length-1&&t("#swipebox-next").addClass("disabled")},openSlide:function(e){t("html").addClass("swipebox"),t(i).trigger("resize"),this.setSlide(e,!0)},preloadImg:function(i){var e=this;setTimeout(function(){e.openImg(i)},1e3)},openImg:function(i){var e=this;return 0>i||i>=d.length?!1:void e.loadImg(d.eq(i).attr("href"),function(){t("#swipebox-slider .slide").eq(i).html(this)})},setTitle:function(i){t("#swipebox-caption").empty(),d.eq(i).attr("title")&&t("#swipebox-caption").append(d.eq(i).attr("title"))},loadImg:function(i,e){var s=t("<img>").on("load",function(){e.call(s)});s.attr("src",i)},getNext:function(){var i=this;index=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")),index+1<d.length?(index++,i.setSlide(index),i.preloadImg(index+1)):(t("#swipebox-slider").addClass("rightSpring"),setTimeout(function(){t("#swipebox-slider").removeClass("rightSpring")},500))},getPrev:function(){var i=this;index=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")),index>0?(index--,i.setSlide(index),i.preloadImg(index-1)):(t("#swipebox-slider").addClass("leftSpring"),setTimeout(function(){t("#swipebox-slider").removeClass("leftSpring")},500))},closeSlide:function(){var e=this;t(i).trigger("resize"),t("html").removeClass("swipebox"),e.destroy()},destroy:function(){var e=this;t(i).unbind("keyup"),t("body").unbind("touchstart"),t("body").unbind("touchmove"),t("body").unbind("touchend"),t("#swipebox-slider").unbind(),t("#swipebox-overlay").remove(),d.removeData("_swipebox"),e.target.trigger("swipebox-destroy")}};r.init()},t.fn.swipebox=function(i){if(!t.data(this,"_swipebox")){var e=new t.swipebox(this,i);this.data("_swipebox",e)}}}(window,document,jQuery);