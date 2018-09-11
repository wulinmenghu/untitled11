
function Room(x1, y1,x2,y2, radius, color){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.radius = radius;
  this.color = color;
  this.isSelected = false;
}








//画出房间正交线条
function ZJdrawRubberbandShape(x1,y1,x2,y2,r) {
//画出八条直线和四个圆
  context.beginPath();
  context.moveTo(x1, y1-r);
  context.lineTo(x2, y1-r);
  context.stroke();


  context.beginPath();
  context.moveTo(x1, y1+r);
  context.lineTo(x2, y1+r);
  context.stroke();

  context.beginPath();
  context.moveTo(x1, y2+r);
  context.lineTo(x2, y2+r);
  context.stroke();

  context.beginPath();
  context.moveTo(x1, y2-r);
  context.lineTo(x2, y2-r);
  context.stroke();

  context.beginPath();
  context.moveTo(x1-r, y1);
  context.lineTo(x1-r, y2);
  context.stroke();

  context.beginPath();
  context.moveTo(x1+r, y1);
  context.lineTo(x1+r, y2);
  context.stroke();

  context.beginPath();
  context.moveTo(x2-r, y1);
  context.lineTo(x2-r, y2);
  context.stroke();

  context.beginPath();
  context.moveTo(x2+r, y1);
  context.lineTo(x2+r, y2);
  context.stroke();

//重新开始新的绘制
  context.beginPath();
  context.arc(x1, y1, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x1, y2, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x2, y1, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x2, y2, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.fillText(Math.abs(x2-x1).toString(),(x1+x2)/2,y1);
  context.fillText(Math.abs(y2-y1).toString(),x2,(y1+y2)/2);
  //context.fillText("房间",(x1+x2)/2,(y1+y2)/2);
  // //填充矩形颜色
  // context.fillStyle="red";
  // context.fill();
  // //矩形边框颜色
  // context.strokeStyle="black";
  // context.stroke();
}

// ZJdrawRubberbandShape(200,200,50,50,5);
//  drawRubberbandShape(300,300,400,400,5)

//编辑模式


// function redrawRoom(i) {
//   //可以先清除画布，再重绘除了所画的图形i之外的其他对象图形，
//   context.clearRect(0, 0, canvas.width, canvas.height);
//   for (var m = 0; m <= circles.length - 1; m++) {
//     drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
//   }
//
//   for (var j = 0; j < i; j++) {
//     ZJdrawRubberbandShape(rooms[j].x1, rooms[j].y1, rooms[j].x2, rooms[j].y2, rooms[j].radius);
//   }
//   for (var m = (i + 1); m <= rooms.length - 1; m++) {
//     ZJdrawRubberbandShape(rooms[m].x1, rooms[m].y1, rooms[m].x2, rooms[m].y2, rooms[m].radius);
//   }
// }

// //判断是否在房间内部，四条边或者是房间内部
// function inroom(x,y,x1,y1,x2,y2,r){
//   // if(y1==y2){
//   //
//   // }
// }

