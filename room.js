
function Room(x1,y1,x2,y2,x3,y3,x4,y4, radius, color,name){
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.x3 = x3;
  this.y3 = y3;
  this.x4 = x4;
  this.y4 = y4;

  this.radius = radius;
  this.color = color;
  this.name = name;
  this.isSelected = false;
}








//画出房间正交线条
function ZJdrawRubberbandShape(x1,y1,x2,y2,x3,y3,x4,y4,r,name) {
//画出八条直线和四个圆
  context.beginPath();
  context.moveTo(x1, y1-r);
  context.lineTo(x2, y2-r);
  context.stroke();


  context.beginPath();
  context.moveTo(x1, y1+r);
  context.lineTo(x2, y2+r);
  context.stroke();

  context.beginPath();
  context.moveTo(x3, y3+r);
  context.lineTo(x4, y4+r);
  context.stroke();

  context.beginPath();
  context.moveTo(x3, y3-r);
  context.lineTo(x4, y4-r);
  context.stroke();

  context.beginPath();
  context.moveTo(x1-r, y1);
  context.lineTo(x4-r, y4);
  context.stroke();

  context.beginPath();
  context.moveTo(x1+r, y1);
  context.lineTo(x4+r, y4);
  context.stroke();

  context.beginPath();
  context.moveTo(x2-r, y2);
  context.lineTo(x2-r, y3);
  context.stroke();

  context.beginPath();
  context.moveTo(x2+r, y2);
  context.lineTo(x2+r, y3);
  context.stroke();

//重新开始新的绘制
  context.beginPath();
  context.arc(x1, y1, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x2, y2, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x3, y3, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.beginPath();
  context.arc(x4, y4, r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  context.fillText((Math.abs(x2-x1)).toFixed(0).toString(),(x1+x2)/2,y1);
  context.fillText((Math.abs(y2-y1)).toFixed(0).toString(),x2,(y1+y2)/2);

  // var s=Math.abs((x2-x1)*(y2-y1));
  // context.fillText(s.toString(),(x1+x2)/2,(y1+y2)/2);
  context.fillText(name,(x1+x3)/2,(y1+y3)/2);
  context.fillText(((x3-x1)*(y3-y1)/10000).toFixed(2).toString()+"m2",(x1+x3)/2,(y1+y3)/2+10);
  // //填充矩形颜色
  // context.fillStyle="red";
  // context.fill();
  // //矩形边框颜色
  // context.strokeStyle="black";
  // context.stroke();
}


//定义房间
// function RoomDefine(i){
//   for (var m = 0; m <= circles.length - 1; m++) {
//     drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
//   }
//
//   // for (var j = 0; j < i; j++) {
//   //   drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
//   // }
//   // for (var m = (i + 1); m <= circles.length - 1; m++) {
//   //   drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
//   // }
// }


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

