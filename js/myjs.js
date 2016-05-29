// JavaScript Document
function findInArr(arr,n){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == n){
			return true;
		}
	}
	return false;
}

function getByClass(oParent,sClass){
	if(oParent.getElementsByCalssName){
		return oParent.getElementsByCalssName(sClass);
	} else {
		var result = [];
		var aEle = oParent.getElementsByTagName("*");
		for(var i = 0; i < aEle.length; i++){
			
			var _aTmp = aEle[i].className.split(" ");
			
			if(findInArr(_aTmp,sClass)){
				result.push(aEle[i]);
			}
		}
		return result;
	}
}

function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,null))[name];
}

function move(obj,json,options){
	options = options || {};
	options.duration = options.duration || 700;
	options.easing = options.easing || "ease-out";
	 
	var start = {};
	var dis = {};
	
	for(var name in json){
		//1起点
		if(name == "opacity"){
			start.opacity = parseFloat(getStyle(obj,name));
		} else {
			start[name] = parseInt(getStyle(obj,name));
		}
		//距离
		dis[name] = json[name] - start[name];
	
	} 
	//次数
	var count = Math.round(options.duration/30);
	
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		
		for(var name in json){
			
			switch(options.easing){
				case "linear"://匀速
					var a = n/count;
					var cur = start[name] + dis[name]*a;
					break;
				case "ease-in"://加速
					var a = n/count;
					var cur = start[name] + dis[name]*a*a*a;
					break;
				case "ease-out"://减速
					var a = 1 - n/count;
					var cur = start[name] + dis[name]*(1 - a*a*a);
					break;
			}
			
			
			if(name == "opacity"){
				obj.style.opacity = cur;
				obj.style.filter = "alpha(opacity:"+cur*100+")";
			} else {
				obj.style[name] = cur + "px";
			}
		}
		
		if(n == count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}	
	},30);
	
}

window.onload=function(){
	var oMain=document.getElementById("main");
	var oBtn=document.getElementById("btn");
	var aBtn=oBtn.getElementsByTagName("li");
	var aDiv=getByClass(oMain,"act");
	
	var oUl = document.getElementById("ul1");
	var aLi = oUl.children;
	var len = aLi.length; 
	
	var iNow=0;
	
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			aBtn[i].onmouseover=function(){
				iNow=index;
				tab();
			};
		})(i);
	}
	
	function tab(){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className="";
			aDiv[i].style.display="none";
		}
		aBtn[iNow].className="active";
		aDiv[iNow].style.display="block";
	}
	//11111
 	oUl.style.width = 840 + 20*(len - 1) + "px";
	
	for(var i = 1; i < len; i++){
		aLi[i].style.left = 840 + 20*(i - 1) + "px"; 
	}
	
	for(var i = 0; i < len; i++){
		
		(function(index){
			aLi[i].onmouseover = function(){
				for(var i = 0; i < len; i++){
					if(i <= index){
						move(aLi[i],{left:i*20});
					} else {
						move(aLi[i],{left:840 + 20*(i - 1)});
					}
				}
			};
		})(i);
	}
	//22222
};
