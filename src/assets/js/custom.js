(function ($, window, Typist) {
    
	/*---------owl-carousel------------*/
	
	
	$('.owl-carousel').owlCarousel({
		loop:true,
		margin:10,
		responsiveClass:true,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true,
		responsive:{
			0:{
				items:2,
				nav:true
			},
			600:{
				items:3,
				nav:false
			},
			1000:{
				items:4,
				nav:true,
				loop:false
			}
		}
	});
	
	/*-------tooltip---------*/
	
	$(function () {
	  $('[data-toggle="tooltip"]').tooltip()
	});
	
	
	/*-------------headder_fixed-------------*/
	
	if ($(window).width() > 992) {
		$(window).scroll(function(){  
		   if ($(this).scrollTop() > 40) {
			  $('#navbar_top').addClass("fixed-top");
			  // add padding top to show content behind navbar
			  $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
			}else{
			  $('#navbar_top').removeClass("fixed-top");
			   // remove padding top from body
			  $('body').css('padding-top', '0');
			}   
		});
	  } // end if
	
/*--------------ASO.JS---------------*/
	
AOS.init();
		
//refresh animations
 
$(window).on('load', function() {
	AOS.refresh();
});
	
	
	
})(jQuery, window);