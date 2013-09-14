//##########################################################
//##########################################################
var coord_x=0;
var coord_y=0;
var lock=false;
var _body=document.getElementsByTagName('body')[0];
var canvas1= document.getElementById("canvas1");
var canvas2= document.getElementById("canvas2");
screen_width=screen.width;
screen_height=screen.height;
/////////controlling variables
var R=255; var G=255; var B=255; var alpha=0.05;
var scroll_responding=1;
var transparancy=65;
var reading_area=20;
var reading_area_scale=2;
var lastTime_overIcon=new Date();

//##########################################################
/////initiailizing the script
//##########################################################
function initialize_script(){
							
	var enabling_div=document.getElementById('everything_div');
	//enable 
	if (enabling_div == null) {
		initializeSettings();
		_body.onmousemove = function(e){
			focus_(e);
		};
		_body.onmousedown = function(e){
			lockscroll(e);
		};		
		icon_URL = chrome.extension.getURL("/images/settings_icon1.png");
		//icon_URL ="http://files.softicons.com/download/system-icons/web0.2ama-icons-by-chrfb/png/48x48/Settings.png";
		var canvas1_code = "<canvas id=\"canvas1\" width=\""+screen_width+"\" height=\""+screen_height+"\" style=\"position:fixed; top:-700px; right:0px; left:0px;z-index:10000;\" > </canvas>";
		var canvas2_code = "<canvas id=\"canvas2\" width=\""+screen_width+"\" height=\""+screen_height+"\" style=\"position:fixed; top:360px; right:0px; left:0px;z-index:10000;\" > </canvas>";
		var settings_icon= "<div width=\"10\" height=\"10\" id=\"settings_icon\"  style=\"width:40px; height:40px; position:fixed; top:12px; right:10px; px;z-index:10100;\"><img src=\""+icon_URL+"\"> </div>";
		var _settings_background="<div id='settings_background' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; background-color: rgb(65, 63, 63); opacity: 0.1; border-radius: 2%;'></div>";
		var _settings= "<div id=\"settings\" style='margin: 10px;'> 	<p class=\"ui-state-default ui-corner-all ui-helper-clearfix\" style=\"padding: 4px;\">	 Colorpicker :	 </p>	<div id=\"red\" class=\"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"><div class=\"ui-slider-range ui-widget-header ui-slider-range-min\" style=\"width: 100%; \"></div><a class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\" style=\"left: 100%; \"></a></div><div id=\"green\" class=\"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"><div class=\"ui-slider-range ui-widget-header ui-slider-range-min\" style=\"width: 54.90196078431373%; \"></div><a class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\" style=\"left: 54.90196078431373%; \"></a></div><div id=\"blue\" class=\"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"><div class=\"ui-slider-range ui-widget-header ui-slider-range-min\" style=\"width: 23.52941176470588%; \"></div><a class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\" style=\"left: 23.52941176470588%; \"></a></div><div id=\"swatch\" class=\"ui-widget-content ui-corner-all\" style=\"background-color: rgb(255, 140, 60); \"></div><p  class=\"ui-state-default ui-corner-all ui-helper-clearfix\" style=\"padding: 4px;\">	 <label for=\"amount\">Transparency :</label>	 </p><div id=\"transparency_slider\" class=\"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"><div class=\"ui-slider-range ui-widget-header ui-slider-range-min\" style=\"width: 5.150214592274678%; \"></div><a class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\" style=\"left: 5.150214592274678%; \"></a></div><p  class=\"ui-state-default ui-corner-all ui-helper-clearfix\" style=\"padding: 4px;\">	 <label for=\"amount\">Focus range :</label>	 </p><div id=\"Focus_range_slider\" class=\"ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all\"><div class=\"ui-slider-range ui-widget-header ui-slider-range-min\" style=\"width: 5.150214592274678%; \"></div><a class=\"ui-slider-handle ui-state-default ui-corner-all\" href=\"#\" style=\"left: 5.150214592274678%; \"></a></div></div>";
		var settings_block= "<div id='settings_block' style='display:none; width:270px; height:320px; position:fixed; top:40px; right:10px; px;z-index:10100;'>"+_settings_background+_settings+"</div>";
		var everything_div = "<div id=\"everything_div\" >" + canvas1_code + canvas2_code + settings_icon +settings_block + "</div>";
		_body.innerHTML = everything_div + _body.innerHTML;
		document.getElementById('settings_icon').onmouseover=function(e){	settings(e)	};
		document.getElementById('settings_block').onmouseout=function(e){	checkOut(e);};
		$("#settings_icon_image").attr("src",icon_URL);
		draw();	
		///#####################################				
		//transparency script		
		$(function() {
		 	$( "#transparency_slider" ).slider({range: "min",	value: transparancy,	min: 1,	max: 400,	stop: function( event, ui ) {	transparancy=ui.value; updateSettings();}	});		
			$( "#amount" ).val( "$" + $( "#transparency_slider" ).slider( "value" ) );	
			});
		///#####################################
		//Focus_range script		
		
			$(function() {
		 	$( "#Focus_range_slider" ).slider({range: "min",	value: reading_area ,	min: 1,	max: 230, stop: function( event, ui ) {reading_area= ui.value; lock=false; setSettings();}	});		
			$( "#amount" ).val( "$" + $( "#Focus_range_slider" ).slider( "value" ) );	
			});				
		
		///#####################################
		//RGB_ script 
			$(function() {
			$( "#red, #green, #blue" ).slider({	orientation: "horizontal",	range: "min",	max: 255,	value: 255,	stop: refreshSwatch	,slide:refreshColorTemplate,creat: refreshSwatch	});	
			$( "#red" ).slider( "value", R );
			$( "#green" ).slider( "value", G );
			$( "#blue" ).slider( "value", B );	});
			$("#swatch").css( "background-color", "rgb("+R+", "+G+", "+B+");");					
	}
	//disable
	else
	{
		var stat=enabling_div.style.display;
		//it exist before i just should display it or not...
		//stat="none";
		
		if(stat=="none"){ enabling_div.style.display="block"; initializeSettings(); }
		else { enabling_div.style.display="none";}
		
	}
}

//##########################################################
/////initiailizing the style settings 
//##########################################################
//cookies functions
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}
//initializeSettings:: 
function initializeSettings(){
var red_value=getCookie("focuseSettingsRED");
var green_value=getCookie("focuseSettingsGREEN");
var blue_value=getCookie("focuseSettingsBLUE");
var reading_area_value=getCookie("focuseSettingsREADINGAREA");
var transparancy_value=getCookie("focuseSettingsTRANSPERANCY");
  if (red_value!=null && green_value!=null && blue_value!=null )
  {
  R=red_value; 
  G=green_value;
  B=blue_value;
  reading_area=parseInt(reading_area_value);   
  transparancy=parseInt(transparancy_value);
  }
else 
  {
  if (red_value!=null )
    {
    setCookie("focuseSettingsRED",R,365);
	setCookie("focuseSettingsGREEN",G,365);
	setCookie("focuseSettingsBLUE",B,365);
	setCookie("focuseSettingsREADINGAREA",reading_area,365);
	setCookie("focuseSettingsTRANSPERANCY",transparancy,365);
    }
  }	
}
//save new settings
function setSettings()
{
	setCookie("focuseSettingsRED",R,365);
	setCookie("focuseSettingsGREEN",G,365);
	setCookie("focuseSettingsBLUE",B,365);
	setCookie("focuseSettingsREADINGAREA",reading_area,365);
	setCookie("focuseSettingsTRANSPERANCY",transparancy,365);
}

//##########################################################
//## settings:: to show and hide settings
//##########################################################
	 	  
	function settings(event)
	{
		
		var settings_div=document.getElementById('settings_block');
		var stat=settings_div.style.display;

		var options={};
		if(stat=="none"){ 
		 $( "#settings_block" ).show("blind", options, "slow");
		}
		else {
			curDate= new Date();
			if((curDate - lastTime_overIcon) >1000)
			$( "#settings_block" ).hide("blind", options, "slow");
		}
		pausecomp(200);
		
	}
	
	
	function checkOut(event)
	{
		if(event.clientX<document.getElementById('settings_block').offsetLeft || event.clientY>(document.getElementById('settings_block').offsetTop+320))
		{
			settings();
		}
	}
//##########################################################
//## pausecomp:: a delay function
//##########################################################

 function pausecomp(millis) {
 var date = new Date();
 var curDate = null;

 do { curDate = new Date(); } 
 while(curDate-date < millis);
 } 

function lockscroll(event)
{
		lock = !lock;
}
//##########################################################
//##
//##########################################################
function focus_(event){
	if(event==null) return;  //onload there's no event
	
var temp_y=event.clientY;
diff_y=Math.abs(temp_y-coord_y);
if(diff_y>scroll_responding && !lock) 
{
	//re-arrange the reading area around the mouse 
	coord_x=event.clientX;
	coord_y=event.clientY;
	canvas1.style.top=(coord_y-canvas1.height-reading_area)+"px";
	canvas2.style.top=(coord_y+reading_area)+"px";	
}
else
{
	 //nothing to do
}	
return  ;
}

//##########################################################
//##########################################################
function draw() {
canvas1= document.getElementById("canvas1");
canvas2= document.getElementById("canvas2");
//create the html5 context object to enable draw methods
ctx1= canvas1.getContext("2d");
ctx2= canvas2.getContext("2d");
//setting the size of the canvases
//canvas1.style.height=document.getElementsByTagName('body')[0].style.height
ctx1.clearRect(0,0,canvas1.width, canvas1.height);
ctx2.clearRect(0,0,canvas1.width, canvas1.height);
//drawing in the canvases
//filestyle(r,g,b,alpha);
ctx1.fillStyle= "rgba("+R+","+G+","+B+","+alpha+")";
ctx2.fillStyle= "rgba("+R+","+G+","+B+","+alpha+")";
for (var i = 0; i < transparancy; i += reading_area_scale) {
	//fileRect(X,Y,width,height);
	ctx1.fillRect(0, 0, canvas1.width, canvas1.height-i);
	ctx2.fillRect(0, i, canvas2.width, canvas2.height);
}
coord_y=100;
focus_(); 
return ;
}

///####################################################
///####################################################
///############# sliders::jquery part  ################
///####################################################
///#####################################

	///#####################################
	//connecting to tab script 
	// ## to refresh the colors and other stuff in the tab by editing the sliders
	//temporarly
		function change_vars(response)
		{
			reading_area=response;
		}
		function updateSettings()
		{
			lock=false;
			setSettings();
			draw();
		}

	///#####################################
	//RGB script
	
		function hexFromRGB(r, g, b) {	
			var hex = [	r.toString( 16 ), g.toString( 16 ),	b.toString( 16 )];	
				$.each( hex, function( nr, val ) {			
				if ( val.length === 1 ) {			
					hex[ nr ] = "0" + val;			
					}
							});	
				return hex.join( "" ).toUpperCase();	
				}	
						
		function refreshSwatch() {
			R = $( "#red" ).slider( "value" );  
			G = $( "#green" ).slider( "value" );	
			B = $( "#blue" ).slider( "value" );	
			refreshColorTemplate();
			updateSettings();
			
			}	
		function refreshColorTemplate(){
			var red = $( "#red" ).slider( "value" ),  	
			green = $( "#green" ).slider( "value" ),	
			blue = $( "#blue" ).slider( "value" ),	
			hex = hexFromRGB( red, green, blue );
			$( "#swatch" ).css( "background-color", "#" + hex );
			
		}				

///####################################################
///####################################################
///####################################################
///####################################################