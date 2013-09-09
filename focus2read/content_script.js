	//alert("script must give be ready for keys evnets now");
 	
	$(window).keydown(function(event){
	
		if (event.ctrlKey && event.keyCode == 81) {
			initialize_script();
		}
	});
	

