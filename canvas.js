//输入坐标是e.clientX，e.clientY，得到返回值是canvas的位置坐标
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect();
  return {
    x : x - bbox.left * (canvas.width / bbox.width),
    y : y - bbox.top * (canvas.height / bbox.width)
  };
}

//复制保存当前全部的canvas上的数据
function saveDrawingSurface() {
  drawingSurfacsImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}
//恢复canvas的数据，主要用来显示最新的线段，擦除原来的线段
function restoreDrawingSurface() {
  context.putImageData(drawingSurfacsImageData,
      0, 0, 0, 0, canvas.width, canvas.height
  );
}



//判断是否在图形对象区域内
//j=1  墙体的圆圈内
//j=2  墙体的柱子内
//j=3  房间的圆圈
//j=4  房间的柱子内
//j=5  房间的内部
//j=6  没有选中对象
function isinwall(x,y) {
  //返回的j值代表点击了哪一种区域
  //x1和y1代表没选中的点，赋予鼠标点击点，x2 y2表示要删掉的点
  //这里null就等于0（数值的空值为0）
  //定义一个数组存放变量，
  if (circles.length == 0 && rooms.length==0) {
    return {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      i: null,
      j: 6
    }
  }
  for (var i = 0; i <= circles.length - 1; i++) {
    //使用勾股定理计算这个点与圆心之间的距离
    //在墙体的点上j=1;在墙体内部j=2;在房间点上j=3;在房间内部j=4;不作为j=5
    if ((Math.pow((x - circles[i].x1), 2) + Math.pow((y - circles[i].y1), 2)) <= Math.pow(circles[i].radius, 2)) {
      return {
        x1: circles[i].x2,
        y1: circles[i].y2,
        x2: circles[i].x1,
        y2: circles[i].y1,
        i: i,
        j: 1
      }
    } else if ((Math.pow((x - circles[i].x2), 2) + Math.pow((y - circles[i].y2), 2)) <= Math.pow(circles[i].radius, 2)) {
      return {
        x1: circles[i].x1,
        y1: circles[i].y1,
        x2: circles[i].x2,
        y2: circles[i].y2,
        i: i,
        j: 1
      }
    } else if (inrectangle(x,y,circles[i].x1,circles[i].y1,circles[i].x2,circles[i].y2,circles[i].radius)) {
      return {
        x1: x,
        y1: y,
        x2 : null,
        y2 : null,
        i: i,
        j: 2
      }
    }
  }


  for (var j = 0; j <= rooms.length - 1; j++) {
    //使用勾股定理计算这个点与圆心之间的距离
    if ((Math.pow((x - rooms[j].x1), 2) + Math.pow((y - rooms[j].y1), 2)) <= Math.pow(rooms[j].radius, 2)) {
      return {
        x1: rooms[j].x1,
        y1: rooms[j].y1,
        x2: rooms[j].x1,
        y2: rooms[j].y1,
        // x3: rooms[j].x4,
        // y3: rooms[j].y4,
        i: j,
        j: 3
      }
    } else if ((Math.pow((x - rooms[j].x2), 2) + Math.pow((y - rooms[j].y2), 2)) <= Math.pow(rooms[j].radius, 2)) {
      return {
        x1: rooms[j].x2,
        y1: rooms[j].y2,
        x2: rooms[j].x2,
        y2: rooms[j].y2,
        // x3: rooms[j].x3,
        // y3: rooms[j].y3,
        i: j,
        j: 3
      }
    } else if ((Math.pow((x - rooms[j].x3), 2) + Math.pow((y - rooms[j].y3), 2)) <= Math.pow(rooms[j].radius, 2)) {
      return {
        x1: rooms[j].x3,
        y1: rooms[j].y3,
        x2: rooms[j].x3,
        y2: rooms[j].y3,
        // x3: rooms[j].x4,
        // y3: rooms[j].y4,
        i: j,
        j: 3
      }
    } else if ((Math.pow((x - rooms[j].x4), 2) + Math.pow((y - rooms[j].y4), 2)) <= Math.pow(rooms[j].radius, 2)) {
      return {
        x1: rooms[j].x4,
        y1: rooms[j].y4,
        x2: rooms[j].x4,
        y2: rooms[j].y4,
        // x3: rooms[j].x3,
        // y3: rooms[j].y3,
        i: j,
        j: 3
      }
    }else if (inrectangle(x,y,rooms[j].x1,rooms[j].y1,rooms[j].x2,rooms[j].y2,rooms[j].radius)) {
      return {
        x1: x,
        y1: y,
        x2: rooms[j].x1,
        y2: rooms[j].y1,
        x3: rooms[j].x2,
        y3: rooms[j].y2,
        i: j,
        j: 4
      }
    }else if (inrectangle(x,y,rooms[j].x2,rooms[j].y2,rooms[j].x3,rooms[j].y3,rooms[j].radius)) {
      return {
        x1: x,
        y1: y,
        // x2: rooms[j].x1,
        // y2: rooms[j].y1,
        // x3: rooms[j].x2,
        // y3: rooms[j].y2,
        i: j,
        j: 4
      }
    }else if (inrectangle(x,y,rooms[j].x3,rooms[j].y3,rooms[j].x4,rooms[j].y4,rooms[j].radius)) {
      return {
        x1: x,
        y1: y,
        // x2 : null,
        // y2 : null,
        i: j,
        j: 4
      }
    }else if (inrectangle(x,y,rooms[j].x1,rooms[j].y1,rooms[j].x4,rooms[j].y4,rooms[j].radius)) {
      return {
        x1: x,
        y1: y,
        // x2 : null,
        // y2 : null,
        i: j,
        j: 4
      }
    }else if(isinroom1(x,y,rooms[j].x1,rooms[j].y1,rooms[j].x2,rooms[j].y2,
        rooms[j].x3,rooms[j].y3,rooms[j].x4,rooms[j].y4)){
      return {
        x1: x,
        y1: y,
        // x2 : null,
        // y2 : null,
        i: j,
        j: 5
      }
    }
  }
  if(j>=rooms.length){
    return {
      x: x,
      y: y,
      j: 6
    }
  }

}

//绘制网格
drawGrid();
//绘制网格布局
function drawGrid() {
  if(canvas.getContext){
  context.lineWidth = 2;
  //先画横线
  for( var i = 1; i * 50 < canvas.height; i++ ){
    context.strokeStyle = 'gray';
    context.beginPath();
    context.moveTo(0,i * 50);
    context.lineTo(canvas.width,i* 50);
    context.stroke();
  }
  //再画纵线
  for( var j = 1; j * 50 < canvas.width; j++ ){
    context.strokeStyle = 'gray';
    context.beginPath();
    context.moveTo(j * 50, 0);
    context.lineTo(j * 50, canvas.height);
    context.stroke();
  }

}
}





// function ispoint(x1,y1,x2,y2,x3,y3,x4,y4) {
//   if(x1==x2 && x3==x4){
//     return{
//       x1:null,
//       x2:null,
//       i:false
//     }
//   }if(x3==x4){
//      var k1=(y2-y1)/(x2-x1);
//
//   }else {
//
//   }
// }



//判断两条线段是否有交点
function isIntersect(x1,y1,x2,y2,x3,y3,x4,y4)
{
  // 转换成一般式: Ax+By = C
  var a1 = y2 - y1;
  var b1 = x1 - x2;
  var c1 = y2 * x1 -x2 * y1;

  //转换成一般式: Ax+By = C
  var a2 = y4 - y3;
  var b2 = x3 - x4;
  var c2 = y4 * x3 -x4 * y3;

  // 计算交点
  var d = a1*b2 - a2*b1;

  // 当d==0时，两线平行
  if (d == 0) {
    return false;
  }else {
    var x = (b2*c1 - b1*c2) / d;
    var y = (a1*c2 - a2*c1) / d;

    // 检测交点是否在两条线段上
    if ((isInBetween(x1, x, x2) || isInBetween(y1, y, y2)) &&
        (isInBetween(x3, x, x4) || isInBetween(y3, y, y4)))
    {
      return true;
    }
  }

  return false;
}
//如果b在a和c之间，返回true
//当a==b或者b==c时排除结果，返回false
function isInBetween(a, b, c) {
  // 如果b几乎等于a或c，返回false.为了避免浮点运行时两值几乎相等，但存在相差0.00000...0001的这种情况出现使用下面方式进行避免
  if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) {
    return false;
  }

  return (a < b && b < c) || (c < b && b < a);
}

//判断点是否在四条直线的封闭区域内边
function isinroom1(x,y,x1,y1,x2,y2,x3,y3,x4,y4) {
  if(x1<=x && x<=x3 && y1<=y && y<=y3){
    return true;
  }else if(x3<=x && x<=x1 && y1<=y && y<=y3){
    return true;
  }else if(x1<=x && x<=x3 && y3<=y && y<=y1){
    return true;
  }else if(x3<=x && x<=x1 && y3<=y && y<=y1){
    return true;
  }else {
    return false ;
  }

}


//重绘所有墙体
function redrawAllWall() {
  for (var m = 0; m <= circles.length - 1; m++) {
    drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
  }
}

//重绘所有房间
function redrawAllRoom() {
  //先重绘出所有的墙体，再对特定的房间进行重绘
  for (var m = 0; m <= rooms.length - 1; m++) {
    ZJdrawRubberbandShape(rooms[m].x1, rooms[m].y1, rooms[m].x2, rooms[m].y2,
        rooms[j].x3, rooms[j].y3, rooms[j].x4, rooms[j].y4,rooms[m].radius,rooms[m].name);
  }
}

//重绘除了i之外的所有墙体
function redrawSomeWall(i) {
  for (var j = 0; j < i; j++) {
    drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
  }
  for (var m = (i + 1); m <= circles.length - 1; m++) {
    drawRubberbandShape(circles[m].x1, circles[m].y1, circles[m].x2, circles[m].y2, circles[m].radius);
  }
}

//重绘除了i之外的所有房间
function redrawSomeRoom(i) {
  for (var j = 0; j < i; j++) {
    ZJdrawRubberbandShape(rooms[j].x1, rooms[j].y1, rooms[j].x2, rooms[j].y2,
        rooms[j].x3, rooms[j].y3, rooms[j].x4, rooms[j].y4,rooms[j].radius,rooms[j].name);
  }
  for (var m = (i + 1); m <= rooms.length - 1; m++) {
    ZJdrawRubberbandShape(rooms[m].x1, rooms[m].y1, rooms[m].x2, rooms[m].y2,
        rooms[j].x3, rooms[j].y3, rooms[j].x4, rooms[j].y4,rooms[m].radius,rooms[m].name);
  }
}