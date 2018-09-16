//定义门类别
function Door(x, y, width,color) {
  this.x = x;
  this.y = y;


  this.width = width;
  this.color=color;
  this.isSelected = false;
}

//判断门是否在墙内
function inDoor(x,y) {
  for (var i = 0; i <= rooms.length - 1; i++) {
    if (inrectangle(x, y, rooms[i].x1, rooms[i].y1, rooms[i].x2, rooms[i].y1, rooms[i].radius)) {
      return {
        x1: rooms[i].x1,
        y1: rooms[i].y1,
        x2: rooms[i].x2,
        y2: rooms[i].y1,
        j: 1
      }
    } else if (inrectangle(x, y, rooms[i].x2, rooms[i].y1, rooms[i].x2, rooms[i].y2, rooms[i].radius)) {
      return {
        x1: rooms[i].x2,
        y1: rooms[i].y1,
        x2: rooms[i].x2,
        y2: rooms[i].y2,
        j: 2
      }
    } else if (inrectangle(x, y, rooms[i].x1, rooms[i].y2, rooms[i].x2, rooms[i].y2, rooms[i].radius)) {
      return {
        x1: rooms[i].x1,
        y1: rooms[i].y2,
        x2: rooms[i].x2,
        y2: rooms[i].y2,
        j: 3
      }
    } else if (inrectangle(x, y, rooms[i].x1, rooms[i].y1, rooms[i].x1, rooms[i].y2, rooms[i].radius)) {
      return {
        x1: rooms[i].x1,
        y1: rooms[i].y1,
        x2: rooms[i].x1,
        y2: rooms[i].y2,
        j: 4
      }
    } else {
      return {
        x1: rooms[i].x1,
        y1: rooms[i].y1,
        x2: rooms[i].x1,
        y2: rooms[i].y2,
        j: 0
      }
    }

    //判断是否在墙内
    // for (var i = 0; i <= circles.length - 1; i++){
    //
    // }
  }
}
//drawDoor(30,10,20,20,50,20,10,1);
// context.beginPath();
// context.arc(300,200,100,0,1.5*Math.PI,true);
// context.moveTo(300,100);
// context.lineTo(300,200);
// context.lineTo(400,200);
// context.stroke();
//画出门
function drawSingleDoor(x,y,x1,y1,x2,y2,width) {
  context.beginPath();
  context.arc(x,y,width,Math.atan((y2 - y1)/(x2 - x1))+0.5*Math.PI,
      Math.atan((y2 - y1)/(x2 - x1)),true);
  context.lineTo(x,y);
  context.closePath();
  context.stroke();
  //drawRubberbandShape( 10, 10, 20, 20,5 );
  // if(j==1){
  //   context.beginPath();
  //   context.arc(x,y1,width,0,1.5*Math.PI,true);
  //   context.moveTo(x,y1-width);
  //   context.lineTo(x,y1);
  //   context.lineTo(x+width,y1);
  //   context.stroke();
  // }else if(j==2){
  //   context.beginPath();
  //   context.arc(x1,y,width,0.5*Math.PI,0,true);
  //   context.stroke();
  // }else if(j==3){
  //   context.beginPath();
  //   context.arc(x,y1,width,Math.PI,0.5*Math.PI,true);
  //   context.stroke();
  // }else if(j==4){
  //   context.beginPath();
  //   context.arc(x1,y,width,1.5*Math.PI,Math.PI,true);
  //   context.stroke();
  // }
}

function drawDoubleDoor(x,y,x1,y1,x2,y2,width,){
  context.beginPath();
  context.arc(x,y,width,Math.atan((y2 - y1)/(x2 - x1)),
      Math.atan((y2 - y1)/(x2 - x1))+0.5*Math.PI,false);
  context.lineTo(x,y);
  context.closePath();
  context.stroke();
}

function drawMoveDoor(x,y,x1,y1,x2,y2,width,){
  context.beginPath();
  context.arc(x,y,width,Math.atan((y2 - y1)/(x2 - x1))+0.5*Math.PI,
      Math.atan((y2 - y1)/(x2 - x1)),true);
  context.lineTo(x,y);
  context.closePath();
  context.stroke();
}