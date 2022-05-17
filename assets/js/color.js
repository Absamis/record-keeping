const color=document.getElementById("color");
const show=document.getElementById("text");
color.onchange=function(){
	show.value=color.value;
}