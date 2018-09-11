var canvas=document.getElementById('image-content');
var content=canvas.getContext("2d");

if (canvas.addEventListener) {

  // IE9, Chrome, Safari, Opera
  canvas.addEventListener("mousewheel", scaleCanvas, false);
  // Firefox
  canvas.addEventListener("DOMMouseScroll", scaleCanvas, false);
}else{
  // IE 6/7/8
  canvas.attachEvent("onmousewheel", scaleCanvas);
}

function scaleCanvas(event){
  event.preventDefault();
  var e = window.event || event; // old IE support
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  alert(delta+"->"+ e.wheelDelta+'->'+ e.detail);
}


function big(){

  //1清空
  context.clearRect(0, 0, canvas.width, canvas.height);
  //2重绘
  context.scale(2,2);
  for (var j = 0; j <= rooms.length-1; j++) {
    ZJdrawRubberbandShape(rooms[j].x1, rooms[j].y1, rooms[j].x2, rooms[j].y2, rooms[j].radius);
  }

  for (var j = 0; j <= circles.length-1; j++) {
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }
}


function small(){

  //1清空
  context.clearRect(0, 0, canvas.width, canvas.height);
  //2重绘
  context.scale(0.5,0.5);
  for (var j = 0; j <= rooms.length-1; j++) {
    ZJdrawRubberbandShape(rooms[j].x1, rooms[j].y1, rooms[j].x2, rooms[j].y2, rooms[j].radius);
  }

  for (var j = 0; j <= circles.length-1; j++) {
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }
}