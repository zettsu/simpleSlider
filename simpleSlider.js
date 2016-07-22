var items_count 	= 0;
var current_page 	= 0;
var elements;
var init;

var current_elements = {"range" : {"start":0,"end":0}};

var default_config = {
	"sliderTarget"	: ".slider",
	"itemsName"		: ".slider-item",
	"itemsMove" 	: "3",
	"itemsShow" 	: "3",
	"infinite"		: "false",
	"debug"			: "false" };

	function simpleSlider(custom_config){	
		
		if(custom_config != undefined){
			var custom = Object.keys(custom_config).length;
		}
		
		if(custom > 0){
			$.each(custom_config, function(index, object){
				if(index in default_config){
					if(object != default_config[index]){
						default_config[index]= object;
				    }
				}
			});
		}
		
		init = true;
	}
	
	function initilizeSlider(){
		init = true;
		
		elements = countElementsOnSlider();
		
		cleanSliderItemsClasses();
		
		var default_movement = default_config["itemsMove"];
		var default_show	= parseInt(default_config["itemsShow"]);
		
		if(default_movement > default_show || default_movement < 0){
			default_config["itemsMove"] = default_show;
		}
		
		current_elements["range"]["start"] = 0;
		current_elements["range"]["end"]   = default_show;
		
		settingActiveClass(current_elements["range"]["start"],current_elements["range"]["end"]);
		
	  hasMoreElements();
		
		debug_log();		
	}
	
	function sliderNext(){
		var default_movement = parseInt(default_config["itemsMove"]);
		cleanSliderItemsClasses();
		
		if(current_elements["range"]["end"] >= elements || current_elements["range"]["start"] >= elements && default_config["infinite"] == "true" ){
			current_elements["range"]["start"] = 0;
			current_elements["range"]["end"] = parseInt(default_config["itemsShow"]);
		}else{
			current_elements["range"]["start"] = current_elements["range"]["start"] + default_movement;
			current_elements["range"]["end"]   = current_elements["range"]["end"] + default_movement;
		}
		
		settingActiveClass(current_elements["range"]["start"],current_elements["range"]["end"]);

		hasMoreElements();
		
		debug_log();		
	}
	
	function sliderPrevious(){
		var default_movement = parseInt(default_config["itemsMove"]);
		
		cleanSliderItemsClasses();
		
		if(current_elements["range"]["start"] <= 0 || current_elements["range"]["start"] <= 0 && default_config["infinite"] == "false" ){
			current_elements["range"]["start"] = elements - parseInt(default_config["itemsShow"]);
			current_elements["range"]["end"] = elements;
		}else{
			current_elements["range"]["start"] = current_elements["range"]["start"] - default_movement;
			current_elements["range"]["end"]   = current_elements["range"]["end"] - default_movement;
		}
		
		settingActiveClass(current_elements["range"]["start"],current_elements["range"]["end"]);
	
		hasMoreElements();
		
		debug_log();
	}
	
	
	function hasMoreElements(){
		if(default_config["infinite"] == "false"){
			if(current_elements["range"]["start"] <= 0){
				$(".lSPrev").hide();
			}else{
				$(".lSPrev").show();
			}
	
			if(current_elements["range"]["end"] >= elements){
				$(".lSNext").hide();
			}else{
				$(".lSNext").show();
			}
		}
		
	}
	
	function debug_log(){
		if(default_config["debug"] == "true"){
			console.log(current_elements["range"]);
			if(init){
				console.log(default_config);
				init = false;
			}
		}
	}
	
	function countElementsOnSlider(){
		return count_elements = $(default_config['itemsName']).length;
	}
			
	function cleanSliderItemsClasses(){
		$(default_config['itemsName']).addClass('inactive');
	}
	
	function settingActiveClass(start,end){
		$(default_config['itemsName']).slice(start,end).removeClass('inactive');		
	}
