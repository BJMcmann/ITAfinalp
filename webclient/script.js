//declare variables
var all, xbox, playstation, nintendo, pc;

//set variables
xbox = document.getElementById("xbox");
playstation = document.getElementById("playstation");
nintendo = document.getElementById("nintendo");
pc = document.getElementById("pc");


function changeFunc(xboxFilterFunc,ps4FilterFunc,ninFilterFunc,pcFilterFunc){
  var filter = document.getElementById("filterGames");
  //Code to test Filter Values
  var filterVal = filter.options[filter.selectedIndex].value;
  //alert(filterVal);


//Filter statement
if (filterVal ="All"){
  //pull all games
}
else if (filterVal = "Xbox One"){
  //pull xbox one games
  xboxFilterFunc();
}else if (filterVal = "PS4"){
  ps4FilterFunc();
  console.log("ps4 selected")
  //pull ps4games
}else if (filterVal = "Nintendo"){
  ninFilterFunc();
  console.log("nin selected")
  //pull nintendo games
}else if (filterVal = "PC"){
  pcFilterFunc();
  console.log("pc selected")
  //pull pc games
}

function xboxFilterFunc(){
  console.log("xbox info pulled");
}
function ps4FilterFunc(){
  console.log("ps4 info pulled");
}
function ninFilterFunc(){
  console.log("ps4 info pulled");
}
function pcFilterFunc(){
  console.log("ps4 info pulled")
}

}