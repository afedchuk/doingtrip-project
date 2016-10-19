(function(e){var t={};var n=0;e.galleriffic={version:"2.0.1",normalizeHash:function(e){return e.replace(/^.*#/,"").replace(/\?.*$/,"")},getImage:function(n){if(!n)return undefined;n=e.galleriffic.normalizeHash(n);return t[n]},gotoImage:function(t){var n=e.galleriffic.getImage(t);if(!n)return false;var r=n.gallery;r.gotoImage(n);return true},removeImageByHash:function(t,n){var r=e.galleriffic.getImage(t);if(!r)return false;var i=r.gallery;if(n&&n!=i)return false;return i.removeImageByIndex(r.index)}};var r={delay:3e3,numThumbs:20,preloadAhead:40,enableTopPager:false,enableBottomPager:true,maxPagesToShow:7,imageContainerSel:"",captionContainerSel:"",controlsContainerSel:"",loadingContainerSel:"",renderSSControls:true,renderNavControls:true,playLinkText:"Play",pauseLinkText:"Pause",prevLinkText:"Previous",nextLinkText:"Next",nextPageLinkText:"Next &rsaquo;",prevPageLinkText:"&lsaquo; Prev",enableHistory:false,enableKeyboardNavigation:true,autoStart:false,syncTransitions:false,defaultTransitionDuration:1e3,onSlideChange:undefined,onTransitionOut:undefined,onTransitionIn:undefined,onPageTransitionOut:undefined,onPageTransitionIn:undefined,onImageAdded:undefined,onImageRemoved:undefined};e.fn.galleriffic=function(s){e.extend(this,{version:e.galleriffic.version,isSlideshowRunning:false,slideshowTimeout:undefined,clickHandler:function(t,n){this.pause();if(!this.enableHistory){var r=e.galleriffic.normalizeHash(e(n).attr("href"));e.galleriffic.gotoImage(r);t.preventDefault()}},appendImage:function(e){this.addImage(e,false,false);return this},insertImage:function(e,t){this.addImage(e,false,true,t);return this},addImage:function(r,i,s,o){var u=typeof r==="string"?e(r):r;var a=u.find("a.thumb");var f=a.attr("href");var l=a.attr("title");var c=u.find(".caption").remove();var h=a.attr("name");n++;if(!h||t[""+h]){h=n}if(!s)o=this.data.length;var p={title:l,slideUrl:f,caption:c,hash:h,gallery:this,index:o};if(s){this.data.splice(o,0,p);this.updateIndices(o)}else{this.data.push(p)}var d=this;if(!i){this.updateThumbs(function(){var e=d.find("ul.thumbs");if(s)e.children(":eq("+o+")").before(u);else e.append(u);if(d.onImageAdded)d.onImageAdded(p,u)})}t[""+h]=p;a.attr("rel","history").attr("href","#"+h).removeAttr("name").click(function(e){d.clickHandler(e,this)});return this},removeImageByIndex:function(e){if(e<0||e>=this.data.length)return false;var t=this.data[e];if(!t)return false;this.removeImage(t);return true},removeImageByHash:function(t){return e.galleriffic.removeImageByHash(t,this)},removeImage:function(e){var n=e.index;this.data.splice(n,1);delete t[""+e.hash];this.updateThumbs(function(){var t=o.find("ul.thumbs").children(":eq("+n+")").remove();if(o.onImageRemoved)o.onImageRemoved(e,t)});this.updateIndices(n);return this},updateIndices:function(e){for(i=e;i<this.data.length;i++){this.data[i].index=i}return this},initializeThumbs:function(){this.data=[];var t=this;this.find("ul.thumbs > li").each(function(n){t.addImage(e(this),true,false)});return this},isPreloadComplete:false,preloadInit:function(){if(this.preloadAhead==0)return this;this.preloadStartIndex=this.currentImage.index;var e=this.getNextIndex(this.preloadStartIndex);return this.preloadRecursive(this.preloadStartIndex,e)},preloadRelocate:function(e){this.preloadStartIndex=e;return this},preloadRecursive:function(e,t){if(e!=this.preloadStartIndex){var n=this.getNextIndex(this.preloadStartIndex);return this.preloadRecursive(this.preloadStartIndex,n)}var r=this;var i=t-e;if(i<0)i=this.data.length-1-e+t;if(this.preloadAhead>=0&&i>this.preloadAhead){setTimeout(function(){r.preloadRecursive(e,t)},500);return this}var s=this.data[t];if(!s)return this;if(s.image)return this.preloadNext(e,t);var o=new Image;o.onload=function(){s.image=this;r.preloadNext(e,t)};o.alt=s.title;o.src=s.slideUrl;return this},preloadNext:function(e,t){var n=this.getNextIndex(t);if(n==e){this.isPreloadComplete=true}else{var r=this;setTimeout(function(){r.preloadRecursive(e,n)},100)}return this},getNextIndex:function(e){var t=e+1;if(t>=this.data.length)t=0;return t},getPrevIndex:function(e){var t=e-1;if(t<0)t=this.data.length-1;return t},pause:function(){this.isSlideshowRunning=false;if(this.slideshowTimeout){clearTimeout(this.slideshowTimeout);this.slideshowTimeout=undefined}if(this.$controlsContainer){this.$controlsContainer.find("div.ss-controls a").removeClass().addClass("play").attr("title",this.playLinkText).attr("href","#play").html(this.playLinkText)}return this},play:function(){this.isSlideshowRunning=true;if(this.$controlsContainer){this.$controlsContainer.find("div.ss-controls a").removeClass().addClass("pause").attr("title",this.pauseLinkText).attr("href","#pause").html(this.pauseLinkText)}if(!this.slideshowTimeout){var e=this;this.slideshowTimeout=setTimeout(function(){e.ssAdvance()},this.delay)}return this},toggleSlideshow:function(){if(this.isSlideshowRunning)this.pause();else this.play();return this},ssAdvance:function(){if(this.isSlideshowRunning)this.next(true);return this},next:function(e,t){this.gotoIndex(this.getNextIndex(this.currentImage.index),e,t);return this},previous:function(e,t){this.gotoIndex(this.getPrevIndex(this.currentImage.index),e,t);return this},nextPage:function(e,t){var n=this.getCurrentPage();var r=this.getNumPages()-1;if(n<r){var i=n*this.numThumbs;var s=i+this.numThumbs;this.gotoIndex(s,e,t)}return this},previousPage:function(e,t){var n=this.getCurrentPage();if(n>0){var r=n*this.numThumbs;var i=r-this.numThumbs;this.gotoIndex(i,e,t)}return this},gotoIndex:function(t,n,r){if(!n)this.pause();if(t<0)t=0;else if(t>=this.data.length)t=this.data.length-1;var i=this.data[t];if(!r&&this.enableHistory)e.historyLoad(String(i.hash));else this.gotoImage(i);return this},gotoImage:function(e){var t=e.index;if(this.onSlideChange)this.onSlideChange(this.currentImage.index,t);this.currentImage=e;this.preloadRelocate(t);this.refresh();return this},getDefaultTransitionDuration:function(e){if(e)return this.defaultTransitionDuration;return this.defaultTransitionDuration/2},refresh:function(){var e=this.currentImage;if(!e)return this;var t=e.index;if(this.$controlsContainer){this.$controlsContainer.find("div.nav-controls a.prev").attr("href","#"+this.data[this.getPrevIndex(t)].hash).end().find("div.nav-controls a.next").attr("href","#"+this.data[this.getNextIndex(t)].hash)}var n=this.$imageContainer.find("span.current").addClass("previous").removeClass("current");var r=0;if(this.$captionContainer){r=this.$captionContainer.find("span.current").addClass("previous").removeClass("current")}var i=this.syncTransitions&&e.image;var s=true;var o=this;var u=function(){s=false;n.remove();if(r)r.remove();if(!i){if(e.image&&e.hash==o.data[o.currentImage.index].hash){o.buildImage(e,i)}else{if(o.$loadingContainer){o.$loadingContainer.show()}}}};if(n.length==0){u()}else{if(this.onTransitionOut){this.onTransitionOut(n,r,i,u)}else{n.fadeTo(this.getDefaultTransitionDuration(i),0,u);if(r)r.fadeTo(this.getDefaultTransitionDuration(i),0)}}if(i)this.buildImage(e,i);if(!e.image){var a=new Image;a.onload=function(){e.image=this;if(!s&&e.hash==o.data[o.currentImage.index].hash){o.buildImage(e,i)}};a.alt=e.title;a.src=e.slideUrl}this.relocatePreload=true;return this.syncThumbs()},buildImage:function(e,t){var n=this;var r=this.getNextIndex(e.index);var i=this.$imageContainer.append('<span class="image-wrapper current"><a class="advance-link" rel="history" href="#'+this.data[r].hash+'" title="'+e.title+'">&nbsp;</a></span>').find("span.current").css("opacity","0");i.find("a").append(e.image).click(function(e){n.clickHandler(e,this)});var s=0;if(this.$captionContainer){s=this.$captionContainer.append('<span class="image-caption current"></span>').find("span.current").css("opacity","0").append(e.caption)}if(this.$loadingContainer){this.$loadingContainer.hide()}if(this.onTransitionIn){this.onTransitionIn(i,s,t)}else{i.fadeTo(this.getDefaultTransitionDuration(t),1);if(s)s.fadeTo(this.getDefaultTransitionDuration(t),1)}if(this.isSlideshowRunning){if(this.slideshowTimeout)clearTimeout(this.slideshowTimeout);this.slideshowTimeout=setTimeout(function(){n.ssAdvance()},this.delay)}return this},getCurrentPage:function(){return Math.floor(this.currentImage.index/this.numThumbs)},syncThumbs:function(){var e=this.getCurrentPage();if(e!=this.displayedPage)this.updateThumbs();var t=this.find("ul.thumbs").children();t.filter(".selected").removeClass("selected");t.eq(this.currentImage.index).addClass("selected");return this},updateThumbs:function(e){var t=this;var n=function(){if(e)e();t.rebuildThumbs();if(t.onPageTransitionIn)t.onPageTransitionIn();else t.show()};if(this.onPageTransitionOut){this.onPageTransitionOut(n)}else{this.hide();n()}return this},rebuildThumbs:function(){var t=this.data.length>this.numThumbs;if(this.enableTopPager){var n=this.find("div.top");if(n.length==0)n=this.prepend('<div class="top pagination"></div>').find("div.top");else n.empty();if(t)this.buildPager(n)}if(this.enableBottomPager){var r=this.find("div.bottom");if(r.length==0)r=this.append('<div class="bottom pagination"></div>').find("div.bottom");else r.empty();if(t)this.buildPager(r)}var i=this.getCurrentPage();var s=i*this.numThumbs;var o=s+this.numThumbs-1;if(o>=this.data.length)o=this.data.length-1;var u=this.find("ul.thumbs");u.find("li").each(function(t){var n=e(this);if(t>=s&&t<=o){n.show()}else{n.hide()}});this.displayedPage=i;u.removeClass("noscript");return this},getNumPages:function(){return Math.ceil(this.data.length/this.numThumbs)},buildPager:function(e){var t=this;var n=this.getNumPages();var r=this.getCurrentPage();var i=r*this.numThumbs;var s=this.maxPagesToShow-1;var o=r-Math.floor((this.maxPagesToShow-1)/2)+1;if(o>0){var u=n-o;if(u<s){o=o-(s-u)}}if(o<0){o=0}if(r>0){var a=i-this.numThumbs;e.append('<a rel="history" href="#'+this.data[a].hash+'" title="'+this.prevPageLinkText+'">'+this.prevPageLinkText+"</a>")}if(o>0){this.buildPageLink(e,0,n);if(o>1)e.append('<span class="ellipsis">&hellip;</span>');s--}while(s>0){this.buildPageLink(e,o,n);s--;o++}if(o<n){var f=n-1;if(o<f)e.append('<span class="ellipsis">&hellip;</span>');this.buildPageLink(e,f,n)}var l=i+this.numThumbs;if(l<this.data.length){e.append('<a rel="history" href="#'+this.data[l].hash+'" title="'+this.nextPageLinkText+'">'+this.nextPageLinkText+"</a>")}e.find("a").click(function(e){t.clickHandler(e,this)});return this},buildPageLink:function(e,t,n){var r=t+1;var i=this.getCurrentPage();if(t==i)e.append('<span class="current">'+r+"</span>");else if(t<n){var s=t*this.numThumbs;e.append('<a rel="history" href="#'+this.data[s].hash+'" title="'+r+'">'+r+"</a>")}return this}});e.extend(this,r,s);if(this.enableHistory&&!e.historyInit)this.enableHistory=false;if(this.imageContainerSel)this.$imageContainer=e(this.imageContainerSel);if(this.captionContainerSel)this.$captionContainer=e(this.captionContainerSel);if(this.loadingContainerSel)this.$loadingContainer=e(this.loadingContainerSel);this.initializeThumbs();if(this.maxPagesToShow<3)this.maxPagesToShow=3;this.displayedPage=-1;this.currentImage=this.data[0];var o=this;if(this.$loadingContainer)this.$loadingContainer.hide();if(this.controlsContainerSel){this.$controlsContainer=e(this.controlsContainerSel).empty();if(this.renderSSControls){if(this.autoStart){this.$controlsContainer.append('<div class="ss-controls"><a href="#pause" class="pause" title="'+this.pauseLinkText+'">'+this.pauseLinkText+"</a></div>")}else{this.$controlsContainer.append('<div class="ss-controls"><a href="#play" class="play" title="'+this.playLinkText+'">'+this.playLinkText+"</a></div>")}this.$controlsContainer.find("div.ss-controls a").click(function(e){o.toggleSlideshow();e.preventDefault();return false})}if(this.renderNavControls){this.$controlsContainer.append('<div class="nav-controls"><a class="prev" rel="history" title="'+this.prevLinkText+'">'+this.prevLinkText+'</a><a class="next" rel="history" title="'+this.nextLinkText+'">'+this.nextLinkText+"</a></div>").find("div.nav-controls a").click(function(e){o.clickHandler(e,this)})}}var u=!this.enableHistory||!location.hash;if(this.enableHistory&&location.hash){var a=e.galleriffic.normalizeHash(location.hash);var f=t[a];if(!f)u=true}if(u)this.gotoIndex(0,false,true);if(this.enableKeyboardNavigation){e(document).keydown(function(e){var t=e.charCode?e.charCode:e.keyCode?e.keyCode:0;switch(t){case 32:o.next();e.preventDefault();break;case 33:o.previousPage();e.preventDefault();break;case 34:o.nextPage();e.preventDefault();break;case 35:o.gotoIndex(o.data.length-1);e.preventDefault();break;case 36:o.gotoIndex(0);e.preventDefault();break;case 37:o.previous();e.preventDefault();break;case 39:o.next();e.preventDefault();break}})}if(this.autoStart)this.play();setTimeout(function(){o.preloadInit()},1e3);return this}})(jQuery)