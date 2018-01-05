$(function(){
	$('.header-menu>a.menu').on('click',function(){
		$('.header-tipBox,.header-menu-bg').show();
	});
	$('.header-menu-bg').on('click',function(){
		$('.header-tipBox,.header-menu-bg').hide();
	});
});