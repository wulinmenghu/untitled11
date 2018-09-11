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
//j=3  房间的圆圈内
//j=4  房间的内部
//j=5  没有选中对象
function isinwall(x,y) {
  //返回的j值代表点击了哪一种区域
  //x1和y1代表没选中的点，赋予鼠标点击点，x2 y2表示要删掉的点
  //这里null就等于0（数值的空值为0）
  //定义一个数组存放变量，
  if (circles.length == 0) {
    return {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      i: null,
      j: 5
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


  // for (var j = 0; j <= rooms.length - 1; j++) {
  //   //使用勾股定理计算这个点与圆心之间的距离
  //   if ((Math.pow((x - rooms[j].x1), 2) + Math.pow((y - rooms[j].y1), 2)) <= Math.pow(rooms[j].radius, 2)) {
  //     return {
  //       x1: rooms[j].x2,
  //       y1: rooms[j].y2,
  //       x2: rooms[j].x1,
  //       y2: rooms[j].y1,
  //       i: j,
  //       j: 3
  //     }
  //   } else if ((Math.pow((x - rooms[j].x2), 2) + Math.pow((y - rooms[j].y2), 2)) <= Math.pow(rooms[j].radius, 2)) {
  //     return {
  //       x1: rooms[j].x1,
  //       y1: rooms[j].y1,
  //       x2: rooms[j].x2,
  //       y2: rooms[j].y2,
  //       i: j,
  //       j: 3
  //     }
  //   } else if ((Math.pow((x - rooms[j].x2), 2) + Math.pow((y - rooms[j].y1), 2)) <= Math.pow(rooms[j].radius, 2)) {
  //     return {
  //       x1: rooms[j].x1,
  //       y1: rooms[j].y2,
  //       x2: rooms[j].x2,
  //       y2: rooms[j].y1,
  //       i: j,
  //       j: 3
  //     }
  //   } else if ((Math.pow((x - rooms[j].x1), 2) + Math.pow((y - rooms[j].y2), 2)) <= Math.pow(rooms[j].radius, 2)) {
  //     return {
  //       x1: rooms[j].x2,
  //       y1: rooms[j].y1,
  //       x2: rooms[j].x1,
  //       y2: rooms[j].y2,
  //       i: j,
  //       j: 3
  //     }
  //   }else if (inrectangle(x,y,rooms[j].x1,rooms[j].y1,rooms[j].x2,rooms[j].y1,rooms[j].radius)) {
  //     return {
  //       x1: x,
  //       y1: y,
  //       x2 : null,
  //       y2 : null,
  //       i: j,
  //       j: 4
  //     }
  //   }else if (inrectangle(x,y,rooms[j].x2,rooms[j].y1,rooms[j].x2,rooms[j].y2,rooms[j].radius)) {
  //     return {
  //       x1: x,
  //       y1: y,
  //       x2 : null,
  //       y2 : null,
  //       i: j,
  //       j: 4
  //     }
  //   }else if (inrectangle(x,y,rooms[j].x1,rooms[j].y2,rooms[j].x2,rooms[j].y2,rooms[j].radius)) {
  //     return {
  //       x1: x,
  //       y1: y,
  //       x2 : null,
  //       y2 : null,
  //       i: j,
  //       j: 4
  //     }
  //   }else if (inrectangle(x,y,rooms[j].x1,rooms[j].y1,rooms[j].x1,rooms[j].y2,rooms[j].radius)) {
  //     return {
  //       x1: x,
  //       y1: y,
  //       x2 : null,
  //       y2 : null,
  //       i: j,
  //       j: 4
  //     }
  //   }
  // }
  if(j>=circles.length){
    return {
      x1: null,
      y1: null,
      x2: null,
      y2: null,
      i: null,
      j: 5
    }
  }

}


//绘制网格布局
// if(canvas.getContext){
//   var width = canvas.width,
//       height = canvas.height;
//   context.lineWidth = 2;
//   //先画横线
//   for( var i = 1; i * 50 < height; i++ ){
//     context.strokeStyle = 'gray';
//     context.beginPath();
//     context.moveTo(0,i * 50);
//     context.lineTo(width,i* 50);
//     context.stroke();
//   }
//   //再画纵线
//   for( var j = 1; j * 50 < width; j++ ){
//     context.strokeStyle = 'gray';
//     context.beginPath();
//     context.moveTo(j * 50, 0);
//     context.lineTo(j * 50, height);
//     context.stroke();
//   }
//
// }