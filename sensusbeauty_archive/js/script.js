$(document).ready(function () {
	var isIE = document.all && !window.atob;

	if (!isIE) {
		window.onbeforeunload = function (e) {
			$('body').fadeOut(400);
		}
	}

	$(window).load(function () {
		$('body').removeClass('loading');

		setTimeout(function () {
			check_if_in_view($('.slideLeft'));
			check_if_in_view($('.slideUp'));
			check_if_in_view($('.slideRight'));
			check_if_in_view($('.slideIn'));
		}, 800)
		
		skinCareSlider();

	})
	
	

	var throttled = _.throttle(onScrollCheckView, 400);
	$(window).scroll(throttled);
	$(window).scroll(function () {
		scroll_top = $(window).scrollTop();
		console.log(scroll_top);
		if(scroll_top>20){
			if(!$(".web-header").hasClass("srcoll-down")){
				$(".web-header").addClass("srcoll-down")
			}
		}else{
			if($(".web-header").hasClass("srcoll-down")){
				$(".web-header").removeClass("srcoll-down")
			}
		}

	});
	
	$(window).resize(function () {
		skinCareSlider();
	})


	$(".scroll-to").click(function () {
		target = $(this).attr("data-target");
		console.log(target);
		
		if($(target).length){
			target_top = $(target).offset().top - 140;
			$("html, body").stop().animate({ scrollTop: target_top }, 500, 'linear');
		}else{
			window.location.href = home_url+'/'+target
		}
		
	})
	
	function skinCareSlider(){
		win_w = $(window).width();
		if(win_w <768){
			$('.skin-care-item-list').flickity({
				prevNextButtons: false,
				pageDots: true
			});
		}else{
			$('.skin-care-item-list').flickity('destroy');
		}
	}


	function onScrollCheckView() {
		check_if_in_view($('.slideLeft'));
		check_if_in_view($('.slideUp'));
		check_if_in_view($('.slideRight'));
		check_if_in_view($('.slideIn'));
	}


	function check_if_in_view(element) {
		var $animation_elements = element;
		var window_height = $(window).height();
		var window_top_position = $(window).scrollTop();
		var window_bottom_position = (window_top_position + window_height);

		$.each($animation_elements, function () {
			var $element = $(this);
			var element_height = $element.outerHeight();
			var element_top_position = ($element.offset().top) + 65;
			var element_bottom_position = (element_top_position + element_height);

			//check to see if this current container is within viewport
			//console.log(element_bottom_position + ", "+window_top_position);
			//console.log(element_top_position + ", "+window_bottom_position);
			if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
				$element.addClass('on');
			} else {
				// $element.removeClass('on');
			}
		});
	}

	$(".header-menu-wrap a").click(function(){
		win_w = $(window).width();
		if(win_w < 1000){
			$(".mobile-menu-btn").click();
		}
	})


	$(".mobile-menu-btn").click(function () {
		var tl = new TimelineMax();
		if (!$(".header-menu-wrap").hasClass("active")) {
			$(".header-menu-wrap").addClass("active");

			tl.to($(".mobile-menu-btn span").eq(0), 0.2, { 'top': '50%', 'ease': 'Power1' }, 0);
			tl.to($(".mobile-menu-btn span").eq(2), 0.2, { 'top': '50%', 'ease': 'Power1' }, 0);

			tl.to($(".mobile-menu-btn span").eq(1), 0, { 'autoAlpha': '0', 'ease': 'Power1' }, 0.2);

			tl.to($(".mobile-menu-btn span").eq(0), 0.2, { 'rotation': 45, 'ease': 'Power1' }, 0.3);
			tl.to($(".mobile-menu-btn span").eq(2), 0.2, { 'rotation': -45, 'ease': 'Power1' }, 0.3);

		} else {
			$(".header-menu-wrap").removeClass("active");

			tl.to($(".mobile-menu-btn span").eq(0), 0.2, { 'rotation': 0, 'ease': 'Power1' }, 0);
			tl.to($(".mobile-menu-btn span").eq(2), 0.2, { 'rotation': 0, 'ease': 'Power1' }, 0);

			tl.to($(".mobile-menu-btn span").eq(1), 0, { 'autoAlpha': '1', 'ease': 'Power1' }, 0.2);



			tl.to($(".mobile-menu-btn span").eq(0), 0.2, { 'top': '0%', 'ease': 'Power1' }, 0.3);
			tl.to($(".mobile-menu-btn span").eq(2), 0.2, { 'top': '100%', 'ease': 'Power1' }, 0.3);
		}
	})
	
	$(".section-1 .slider ul").bxSlider({
		'controls':false,
		'pager': true,
		'adaptiveHeight': true,
		'auto': true

	});
	
	
	$("#submit-btn").click(function(){
		form_data = $("#contactus").serialize();
		vaildate = true;
		
		$("#contactus input, #contactus textarea").removeClass("error");
		
		$("#contactus input, #contactus textarea").each(function(){
			console.log($(this).val());
			if($(this).val() == ""){
				$(this).addClass("error");
				vaildate = false;
			}
		})
		
		
		console.log(form_data);
		form_data = form_data+"&submit_type=contactus_submit";
		if(vaildate){
			$.ajax({
	            type: "POST",
	            data: form_data,
	            url: home_url+"",
	            beforeSend: function() {
	                
	            },
	            success: function(data) {
	// 				console.log(data);
	// 				alert(data);
					var output = JSON.parse(data);
					if(output.status==1){
						alert("送出成功");
						window.location.href = home_url+"/#contacts";
						
					}else{
						alert("送出錯誤");
					}
	            }
	        });
	    }
	})
	
	$("#trial-submit-btn").click(function(){
		form_data = $("#freetrial").serialize();
		console.log(form_data);
		form_data = form_data+"&submit_type=freetrial";
		
		vaildate = true;
		
		$("#freetrial input").removeClass("error");
		
		$("#freetrial input").each(function(){
			console.log($(this).val());
			if($(this).val() == ""){
				$(this).addClass("error");
				vaildate = false;
			}
		})
		
		if(!$("input[name='is_tnc']").is(":checked")){
			alert("請閱讀及同意條款及細則");
			vaildate = false;
		}
		
		
		
		if(vaildate){
			$.ajax({
	            type: "POST",
	            data: form_data,
	            url: home_url+"",
	            beforeSend: function() {
	                
	            },
	            success: function(data) {
					var output = JSON.parse(data);
					if(output.status==1){
						alert("送出成功");
						window.location.href = home_url+"/freetrial";
						
					}else{
						alert("送出錯誤");
					}
	            }
	        });
	    }
	})
	
	$(".popup-bg, .close-btn").click(function(){
		$(".popup-wrap").removeClass("active");
		$("body").removeClass("no-scroll");
	})
	
	$(".treatment-wrap a").click(function(){
		this_id = $(this).attr('data-id');
		$("#skin-care-"+this_id).addClass("active");
		
		
		$("#skin-care-"+this_id+" .slider ul").bxSlider({
			'controls':true,
			'pager': false,
			'adaptiveHeight': true,
		});

	
		$("body").addClass("no-scroll");
		
	})
	
	

})

}
/*
     FILE ARCHIVED ON 11:40:11 Aug 16, 2023 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:38:54 Dec 10, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.801
  exclusion.robots: 0.094
  exclusion.robots.policy: 0.079
