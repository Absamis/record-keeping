let toJCSSPropStyle = function(arg){
    var text = arg.split('-');
    let word = arg;
    if (text.length > 1) {
        word = "";
        text.forEach(function (txt, index) {
            if (index > 0)
                txt = txt.charAt(0).toUpperCase() + txt.slice(1);
            word += txt;
        });
    }
	return word;
}
let toggleElem = function(elem, callback/*Object */){
	if(typeof callback == 'object'){
		for(let keys in callback){
			if(document.querySelector(elem)){
				var element = document.querySelector(elem);
				// console.log(callback[keys]);
                for (let elemt in callback[keys]) {
                    if (keys == 'action') {
                        callback();
                    }
                    else if (keys == 'method') {
                        callback();
                    }
					else if(keys == 'toggleProp'){
						var styleprop = callback[keys][elemt];
						elemt = toJCSSPropStyle(elemt);
						if(element.style[elemt] == "")
							element.style[elemt] = styleprop[0];
						if(element.style[elemt] == styleprop[0])
							element.style[elemt] = styleprop[1]
						else
							element.style[elemt] = styleprop[0]
                        console.log(element.style[elemt]);

					}
					else if(keys == 'elemProp'){
						var styleprop = callback[keys][elemt];
						elemt = toJCSSPropStyle(elemt);
						element.style[elemt] = styleprop;
					}
					else if(keys == 'classToggle'){
                        var styleprop = callback[keys][elemt];
                        if(element.getAttribute("class") == "")
							element.setAttribute("class", styleprop[0]);
						else if(element.classList.contains(styleprop[0]))
							element.classList.replace(styleprop[0], styleprop[1])
						else
							element.classList.add(styleprop[0])
						// element.style[elemt] = styleprop;
					}
					else
						throw new Error("Argument not valid in function toggleElem");
				}
			}
			else
				throw new Error("Invalid Element Specified");
		}
	}
}
let switchElemsProp = (elem, callback) => {
    if (typeof(callback) == 'object') {
        var elements = document.querySelectorAll(elem);

    }
}
function fetchRequest(url, method, data, caller){
	try{
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(event){
			if(this.readyState == 4 && this.status == 200){
				if(typeof caller.response == 'function')
					caller.response(this.response);
				else
					caller.response();
			}
		}
		xmlHttp.open(method, url, true);
		if(method.toUpperCase() == 'GET')
			xmlHttp.send();
		else if(method.toUpperCase() == 'POST')
			xmlHttp.send(data);
		else
			throw new Error("Request method undefined");
	}
	catch(err){
		console.log(err);
		return false;
	}
}
/**
 *
 * Switch betwwen tabs
 **/
function switchTab(elem, callback){
	let focusTab = tabClass = null;
	if(typeof callback == 'object'){
		var currentElem= elem;
		for(let key in callback){
			if(currentElem == key){
				focusTab = callback[key];
			}
			if(focusTab){
				for(let key in callback){
					tabClass = callback[key];
					if(tabClass != focusTab){
						if(document.querySelector("."+tabClass))
							document.querySelector("."+tabClass).style.display = "none";
					}
				}
				if(document.querySelector("."+focusTab))
					document.querySelector("."+focusTab).style.display = "block";
				return;
			}
		}
	}
	else
		throw new Error("Callback function needed");
}
/**
 * {
 	url: ll,
 	method:,
 	beforeDone: function(){

 	}
 	afterDone:(){

 	}
 	done(){

 	}
 * }*/
function makeHttpRequest(params){
	this.url;
	this.data;
	this.response;
	this.method;
	this.beforeDone = function(callback){
		if(typeof callback == 'function')
			callback();
		else
			callback
		return this;
	};
	this.send = function(callback){
		fetchRequest(this.url, this.method, this.data, this);
	};
	this.done = function(callback){
		this.response = callback;
		return this;
	};
	if(!new.target)
		return new makeHttpRequest(params);
	if(typeof params == 'object' ){
		this.url = params?.url;
		this.method = params?.method || 'GET';
		this.data = params?.data || '';
		if(this.url === undefined)
			throw new Error("URL parameter not defined");
	}
	else{
		throw new Error("Object paramters not defined");
	}
	return this;
}
function setActionLimit(objProp){
	let count = delay = errorText = strict = null;
	let delayCount = 0;
	var isCountStarted;
	var isCountStoped;
	var times;
	var timer;
	if(!new.target)
		return new setActionLimit(objProp);
	this.countDone = ()=>{
		if(isCountStoped){
			isCountStoped = false;
			if(typeof callback == 'function')
				callback();
			else
				callback;
			// alert("Timer started");
		}
		return this;
	}
	this.countStart = (callback)=>{
		if(this.isCountStarted){
			alert(isCountStarted)
			if(typeof callback == 'function')
				callback();
			else
				callback;
		}
		return this;
	}
	checkTimeLimit = (count, delay)=>{
		// (localStorage.getItem("action-count") > this.count)? localStorage.setItem("action-count", 0) : null;
		if(sessionStorage.getItem("action-count")){
			// if(this.isCountStarted == true){
			// 	return;
			// }
			times = sessionStorage.getItem("action-count");
			times++;
			if(times >= this.count){
				times = 0;
				startDelayCount(delay);
			}
			sessionStorage.setItem("action-count", times);
		}
		else{
			sessionStorage.setItem("action-count", 0);
		}
	}
	startDelayCount = (delay)=>{
		timer = setInterval(function(){
			isCountStarted = true;
			delayCount++;
			console.log("Counting.....");
			if(delayCount == delay){
				alert("stop");
				isCountStarted = false;
				isCountStoped = true;
				clearInterval(timer);
				sessionStorage.setItem("action-count", 0);
			}
			alert(isCountStarted);
		},1000);
	}
	getVars = ()=>{

	}
	if(typeof(objProp) !== 'object'){
		throw new Error("Invalid method argument");
	}
	this.count = objProp.count;
	this.delay = objProp.delay;
	this.errorText = objProp.errorText;

	if(typeof this.count != 'number' || typeof this.delay != 'number')
		throw new Error("object properties not defined");

	checkTimeLimit(this.count, this.delay);
	return this;
}
