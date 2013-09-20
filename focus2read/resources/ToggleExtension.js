	//#######################################
	//enable/disable the extension functionality
		 window.addEventListener("load", windowLoaded, false);
		 function windowLoaded() {
			chrome.tabs.executeScript(null,{code:"initialize_script();"});
			window.close();
		 }
		 
		 