
//画出非正交墙体（这个r可以变化的）
function drawRubberbandShape(x1,y1,x2,y2,r) {
  context.strokeStyle = 'red';

  //context.scale(2,2);
  //设置线条颜色是红色，圆圈内颜色蓝色
  context.beginPath();
  context.arc(x1, y1, r, 0, 2 * Math.PI, false);
  context.closePath();
  context.stroke();
  context.fillStyle="blue";
  context.fill();


  context.beginPath();
  context.arc(x2, y2, r, 0, 2 * Math.PI, false);
  context.closePath();
  context.stroke();
  context.fillStyle="blue";
  context.fill();

  if (y2 == y1) {
    context.beginPath();
    context.moveTo(x1, y1 - r);
    context.lineTo(x2, y2 - r);
    context.stroke();

    context.beginPath();
    context.moveTo(x1, y1 + r);
    context.lineTo(x2, y2 + r);
    context.stroke();
  } else {
    var tan = (x2 - x1) / (y2 - y1);
    var cos = Math.sqrt(1/(1 + tan * tan));
    var sin = tan * cos;
    //画出切线
    context.beginPath();
    context.moveTo(x1 + r * cos, y1 - r * sin);
    context.lineTo(x2 + r * cos, y2 - r * sin);
    context.stroke();


    context.beginPath();
    context.moveTo(x1 - r * cos, y1 + r * sin);
    context.lineTo(x2 - r * cos, y2 + r * sin);
    context.stroke();


    context.fill();
    context.fillStyle="blue";
    //context.strokeStyle="blue";

  }
  var l=parseInt(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))).toFixed(0).toString();
  context.fillText(l,(x1+x2)/2,(y1+y2)/2);
  context.fillStyle="black";
  context.fill();

}
//drawRubberbandShape( 10, 10, 20, 20,5 );  //路径

//画出墙体正交线条 不可连笔(要调用墙体正交方法)
//返回结束点的坐标
function QTZJdrawRubberbandShape(x1,y1,x2,y2,r) {
  if(Math.abs(x2-x1)>Math.abs(y2-y1)){
    //先画横线再画直线,从mx,my到lx,my
    // context.beginPath();
    // context.moveTo(mousedown.x, mousedown.y);
    // context.lineTo(loc.x, mousedown.y);
    // context.stroke();
    drawRubberbandShape(x1,y1,x2,y1,r);
    return{
      x:x2,
      y:y1
    }
    // context.beginPath();
    // context.moveTo(loc.x, mousedown.y);
    // context.lineTo(loc.x, loc.y);
    // context.stroke();
  }else {
    ////先画直线再画横线
    // context.beginPath();
    // context.moveTo(mousedown.x, mousedown.y);
    // context.lineTo(mousedown.x, loc.y);
    // context.stroke();

    drawRubberbandShape(x1,y1,x1,y2,r);
    return{
      x:x1,
      y:y2
    }
    // context.beginPath();
    // context.moveTo(mousedown.x, loc.y);
    // context.lineTo(loc.x, loc.y);
    // context.stroke();
  }


}




//判断是否在矩形框内
function inrectangle(x,y,x1,y1,x2,y2,r) {


  if(x1==x2){

    if(y1<=y && y<=y2 && (x1-r)<=x && x<=(x1+r)){
      return true;
    }else if(y2<=y && y<=y1 && (x1-r)<=x && x<=(x1+r)){
      return true;
    }else {
      return false;
    }

  }else if(y1==y2){
    if(x1<=x && x<=x2 && (y1-r)<=y && y<=(y1+r)){
      return true;
    }else if(x2<=x && x<=x1 && (y1-r)<=y && y<=(y1+r)){
      return true;
    }else {
      return false;
    }
  }else{
    var k=(y2 - y1)/(x2 - x1);
    var tan = (x2 - x1) / (y2 - y1);
    var cos = Math.sqrt(1/(1 + tan * tan));
    var sin = tan * cos;
    x1=x1 + r * cos;
    y1=y1 - r * sin;
    x2=x2 + r * cos;
    y2=y2 - r * sin;
    var x3=x1 - 2 * r * cos;
    var y3=y1 + 2 * r * sin;
    // var x4=x2 - 2 * r * cos;
    // var y4=y2 + 2 * r * sin;



    if((k*(x-x1)+y1)<=y && y<=(k*(x-x3)+y3) && (y1-(x-x1)/k)<=y && y<=(y2-(x-x2)/k)){
      return true;
    }else if((k*(x-x3)+y3)<=y && y<=(k*(x-x1)+y1) && (y1-(x-x1)/k)<=y && y<=(y2-(x-x2)/k)){
      return true;
    }else if((k*(x-x3)+y3)<=y && y<=(k*(x-x1)+y1) && (y2-(x-x2)/k)<=y && y<=(y1-(x-x1)/k)){
      return true;
    }else if((k*(x-x3)+y3)<=y && y<=(k*(x-x1)+y1) && (y1-(x-x1)/k)<=y && y<=(y2-(x-x2)/k)){
      return true;
    }else {
      return false;
    }
  }


}


//如果点击点在矩形内部，将其定位在中间的位置
function incircle(x,y,x1,y1,x2,y2){
  //var n=((x2-x1)*(x2-x1)*x+(y2-y1)(y2*x1-x2*y1)+(y2-y1)(x2-x1)*y)/((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))

  if(x1==x2){
    return{
      x:x1,
      y:y
    }
  }else{
    var k=(y2 - y1)/(x2 - x1);
    x=(x+k*k*x1+k*y-k*y1)/(1+k*k);
    y=k*(x-x1)+y1;
    return{
      x:x,
      y:y
    }
  }
}

//定义墙体类别
function Circle(x1, y1,x2,y2, radius, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;

  this.radius = radius;
  this.color = color;
  this.isSelected = false;
}

//该方法很重要
function redrawCircle(i) {
  //可以先清除画布，再重绘除了所画的图形i之外的其他对象图形，
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var j = 0; j <= rooms.length-1; j++) {
    ZJdrawRubberbandShape(rooms[j].x1, rooms[j].y1, rooms[j].x2, rooms[j].y2,
        rooms[j].x3, rooms[j].y3, rooms[j].x4, rooms[j].y4,rooms[j].radius,rooms[j].name);
  }

  for (var j = 0; j < i; j++) {
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }
  for (var m = (i + 1); m <= circles.length - 1; m++) {
    drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
  }
}


function redrawWall(a) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(var i=0;i<=a[1];i++){
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }



  for(var i=a[a.length-1];i<=circles.length-1;i++){
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }
}