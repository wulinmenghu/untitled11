var canvas = document.querySelector( 'canvas' );
var context = canvas.getContext( '2d' );
var circles = [];
var rooms=[];
var loc = null;
var points = [];
//标记是否第一次点击，用不用储存图形对象(包括正交模式）
var lag = false;
//标记是否第一次正交点击，用不用连笔
//var lag2=false;
var mousedown = {};
var mousedown1= {};
var mousedown2= {};
var zhengjiaoCheckbox = document.getElementById("zhengjiao");
var zhengjiao = zhengjiaoCheckbox.checked;
var strokeStyleSelect = document.getElementById("strokeStyleSelect");
var eraseAllButton = document.getElementById("eraseAllButton");
var guidewireCheckbox = document.getElementById("guidewireCheckbox");
var guidewires = guidewireCheckbox.checked;
var edit = false;
var wall=false;
var room=false;

var an=false;

eraseAllButton.onclick = function(e){
  context.clearRect(0, 0, canvas.width, canvas.height);
  saveDrawingSurface();
};
document.getElementById("wall").onclick=function(e){
  wall=true;
  room=false;
  edit=false;
}
document.getElementById("room").onclick=function(e){
  room=true;
  wall=false;
  edit=false;
}
document.getElementById("edit").onclick=function(e){
  edit=true;
  room=false;
  wall=false;
}
strokeStyleSelect.onchange = function(e){
  context.strokeStyle = strokeStyleSelect.value;
};
guidewireCheckbox.onchange = function(e){
  guidewires = guidewireCheckbox.checked;
};
zhengjiaoCheckbox.onchange = function(e) {
  zhengjiao = zhengjiaoCheckbox.checked;
}
context.strokeStyle = strokeStyleSelect.value;





/*
* 判断点在不在路径中：
* ctx.isPointInPath( 要判断的点x轴坐标，要判断的点y轴坐标 )  //相对画布的坐标
* */

// 这个方法用来储存每个圆圈对象
function Point(x,y){
  this.x=x;
  this.y=y;

}




// function addCircle(x1, y1,,x2,y2, radius, color) {
//   // var radius = 5;
//   // var x = randomFromTo(0, canvas.width);
//   // var y = randomFromTo(0, canvas.height);
//
//   // 为圆圈计算一个随机颜色
//   //var colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
//   var color = "red";
//
//   // 创建一个新圆圈
//   var circle = new Circle(x1, y1,,x2,y2, radius, color);
//
//   // 把它保存在数组中
//   circles.push(circle);
//
//   // 重新绘制画布
//   drawCircles();
// }



//清除区域内容
// function clearregion(){
//
// }
// function isinroom(x,y){
//   //x1和y1代表没选中的点，赋予鼠标点击点，x2 y2表示要删掉的点
//   for(var i=0; i<=rooms.length-1; i++){
//     //使用勾股定理计算这个点与圆心之间的距离
//     if((Math.pow((x-rooms[i].x1),2)+Math.pow((y-rooms[i].y1),2))<=Math.pow(rooms[i].radius,2)){
//       return {
//         x1 : rooms[i].x2,
//         y1 : rooms[i].y2,
//         x2 : rooms[i].x1,
//         y2 : rooms[i].y1,
//         i : i,
//         j : true
//       };
//     }else if((Math.pow((x-rooms[i].x2),2)+Math.pow((y-rooms[i].y2),2))<=Math.pow(rooms[i].radius,2)){
//       return {
//         x1 : rooms[i].x1,
//         y1 : rooms[i].y1,
//         x2 : rooms[i].x2,
//         y2 : rooms[i].y2,
//         i : i,
//         j : true
//       }
//     }
//   }
//   if(i>=rooms.length){
//     return {
//       j : false
//     }
//   }
// }


canvas.onmousedown=function(e){
  dragging = true;
  e.preventDefault();
  saveDrawingSurface();
  loc = windowToCanvas(e.clientX, e.clientY);
  if (event.button==0){
    //编辑模式
    if(edit){
      //第一次点击对象,与是否正交无关
      if(!an) {
        // circles[mousedown.i].x2=loc.x;
        // circles[mousedown.i].y2=loc.y;
        mousedown = isinwall(loc.x, loc.y);
        if (mousedown.j==1 || mousedown.j==2) {
          // 把x1点赋予点击点
          mousedown.x = mousedown.x1;
          mousedown.y = mousedown.y1;
          mousedown1.x = mousedown.x1;
          mousedown1.y = mousedown.y1;
          //clearregion();
          redrawCircle(mousedown.i);
          saveDrawingSurface();
          //restoreDrawingSurface();
          an = true;
        }
        //第二次点击转移
      }else{
        //loc = windowToCanvas(e.clientX, e.clientY);

        //restoreDrawingSurface();
        if(zhengjiao){
         loc.x=mousedown2.x;
         loc.y=mousedown2.y;
        }

        circles[mousedown.i].x1=mousedown1.x;
        circles[mousedown.i].y1=mousedown1.y;
        circles[mousedown.i].x2=loc.x;
        circles[mousedown.i].y2=loc.y;
        an=false;

        dragging=false;
      }

      //绘制墙体模式
    }else if(wall){
        if(lag){
          if(zhengjiao){
            loc.x=mousedown2.x;
            loc.y=mousedown2.y;
          }


          //如果点击重合了，俺就把点定位在 原来的点上面
          mousedown = isinwall(loc.x, loc.y);
          if (mousedown.j==1){
            mousedown2.x = mousedown.x2;
            mousedown2.y = mousedown.y2;
          }
          var point=new Point(loc.x,loc.y);
          points.push(point);

          var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
          // 把它保存在数组中
          circles.push(circle);
          mousedown.x = loc.x;
          mousedown.y = loc.y;
          mousedown1.x = loc.x;
          mousedown1.y = loc.y;
        }else{
          lag=true;
          //如果点击在对象圆圈内部，把圆心赋予点击点
           mousedown = isinwall(loc.x, loc.y);
          if (mousedown.j==1 || mousedown.j==3) {
            // 把x2点赋予点击点
            mousedown.x = mousedown.x2;
            mousedown.y = mousedown.y2;
            mousedown1.x = mousedown.x2;
            mousedown1.y = mousedown.y2;
          }else if(mousedown.j==2){
            mousedown=incircle(mousedown.x,mousedown.y,
                circles[mousedown.i].x1,circles[mousedown.i].y1,
                circles[mousedown.i].x2,circles[mousedown.i].y2)
            // mousedown.x=loc.x;
            // mousedown.y=loc.y;
            mousedown1.x=mousedown.x;
            mousedown1.y=mousedown.y;
          }else{
            mousedown.x=loc.x;
            mousedown.y=loc.y;
            mousedown1.x=loc.x;
            mousedown1.y=loc.y;
          }
        }
    }else if(room){
      if(lag){
        var point=new Point(loc.x,loc.y);
        points.push(point);

        var r = new Room(mousedown.x, mousedown.y,loc.x,loc.y, 5, "red");
        // 把它保存在数组中
        rooms.push(r);
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        mousedown1.x = loc.x;
        mousedown1.y = loc.y;
        //直接停止画图
        dragging=false;
        lag=false;
      }else {
        lag=true;

        //如果点击在对象圆圈内部，把圆心赋予点击点
        // mousedown = isinroom(loc.x, loc.y);
        // if (mousedown.j) {
        //   // 把x2点赋予点击点
        //   mousedown.x = mousedown.x2;
        //   mousedown.y = mousedown.y2;
        //   mousedown1.x = mousedown.x2;
        //   mousedown1.y = mousedown.y2;
        // }else{
        //   mousedown.x=loc.x;
        //   mousedown.y=loc.y;
        //   mousedown1.x=loc.x;
        //   mousedown1.y=loc.y;
        mousedown.x=loc.x;
        mousedown.y=loc.y;
        }
    }
  }

}



//当鼠标移动时
canvas.onmousemove = function(e){
  //判断当前是否用户在拖动
  if(dragging) {

    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    //把原来的图片覆盖掉所有的内容，覆盖掉旧的线条
    restoreDrawingSurface();
    if(wall){
      if(zhengjiao){
        //把画出墙体的落点付给m2，设置为下一个点的起始位置
        mousedown2 = QTZJdrawRubberbandShape(mousedown.x,mousedown.y,loc);
      }else{
        drawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
      }
    }else if(edit){
      // if(mousedown.j==2){
      //
      // }

        if(zhengjiao){
          mousedown2 = QTZJdrawRubberbandShape(mousedown.x,mousedown.y,loc);
        }else{
          drawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
        }
    }else if(room){
      ZJdrawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
    }



      message.innerHTML = "x=" +loc.x + " ,y=" + loc.y;

  }
  // var loc = windowToCanvas(e.clientX, e.clientY);
  // message.innerHTML = "x=" +loc.x + " ,y=" + loc.y;
  // document.getElementById("box2").value=e.clientX;
  // document.getElementById("box3").value=e.clientY;
  //getKey(e);
};

// //当鼠标抬起时
// canvas.onmouseup = function(e) {
//     loc = windowToCanvas(e.clientX, e.clientY);
//restoreDrawingSurface();
//     updateRubberband(loc);
//     //鼠标抬起，拖动标记设为否
//     dragging = false;
// };

//这一步是为了阻止右击时系统默认的弹出框
document.oncontextmenu = function(e){
  if(event.button==2){
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    restoreDrawingSurface();
    // updateRubberband(mousedown.x,mousedown.y,loc.x,loc.y);
    //鼠标右键，拖动标记设为否
    dragging = false;

    lag= false;
    //lag2=false;
    //return false;//取消右键点击的默认事件
  }

}
