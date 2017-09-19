$(function(){
	var nav = $(".navbar-body");
	var win = $(window);
	var doc = $(document);
	var btn = $("nav a");
	var sections = $(".section");
	var len = btn.length - 1;
	win.scroll(function(){	
		
		//导航定位
		if(doc.scrollTop()>=840){
			nav.addClass("fixed-nav");
//			if(nav.css("opacity")!=1){
//				nav.fadeIn();
//			}
//			else {
//			    nav.css("opacity","1");
//			}
			nav.fadeIn(800);
		}
		else 
			nav.removeClass("fixed-nav");
			
		//滚动到相应位置导航栏自动切换	
		btn.each(function(index){
			var that = sections.eq(index);
			if(doc.scrollTop() >= that.offset().top - 100){
				btn.removeClass("current");
				btn.eq(index).addClass("current");
			}
		});	
		
		//progress-bar动画
		var skills = $(".skills");
		var education = $(".education");
		var bar = $(".progress-bar");
		if((doc.scrollTop()>=skills.offset().top - 400)&&(doc.scrollTop()<education.offset().top)){
			bar.addClass("barGo");
		}		
	});			
		//点击导航跳转
			btn.on('click', function(e){
  			  	e.preventDefault();
			  	$('html, body').animate({
			    'scrollTop': $($(this).attr('href')).offset().top
			  	}, 400);
				});			
		
})

