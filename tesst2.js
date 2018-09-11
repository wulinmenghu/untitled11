var canvas = document.querySelector( 'canvas' );
var context = canvas.getContext( '2d' );
//创建各种部件的集合数组
var circles = [];
var rooms=[];
var doors=[];
var Windows=[];
var loc = null;
var points = [];
//标记是否第一次点击，用不用储存图形对象(包括正交模式）
var lag = false;

var width=false;
var hight=false;
//存放按下点的坐标
var mousedown = {};
//存放函数isinwall的返回值
var mousedown1= {};
//存放画正交结束函数返回值的点坐标
var mousedown2= {};
//存放房间尺寸文本框输入的定点坐标
var mousedown3= {};
//存放门的函数返回值
var mousedown4={};
var zhengjiaoCheckbox = document.getElementById("zhengjiao");
var zhengjiao = zhengjiaoCheckbox.checked;
var strokeStyleSelect = document.getElementById("strokeStyleSelect");
//var eraseAllButton = document.getElementById("eraseAllButton");
var guidewireCheckbox = document.getElementById("guidewireCheckbox");
var guidewires = guidewireCheckbox.checked;
//定义各种开关
var edit = false;
var wall=false;
var room=false;
var door=false;
var window=false;
//判断是否拖曳
var dragging=false;

document.getElementById("eraseAllButton").onclick = function(e){
  context.clearRect(0, 0, canvas.width, canvas.height);
  circles=[];
  //rooms=[];
  saveDrawingSurface();
  wall=false;
  room=false;
  edit=false;
  door=false;
  window=false;
  dragging = false;
  lag = false;
};
document.getElementById("wall").onclick=function(e){

  wall=true;
  room=false;
  edit=false;
  door=false;
  window=false;
  dragging = false;
  lag = false;
}
document.getElementById("room").onclick=function(e){
  room=true;
  wall=false;
  edit=false;
  door=false;
  window=false;
  dragging = false;
  lag = false;
}
document.getElementById("edit").onclick=function(e){
  edit=true;
  room=false;
  wall=false;
  door=false;
  window=false;
  dragging = false;
  lag = false;
}
document.getElementById("door").onclick=function(e){
  door=true;
  room=false;
  wall=false;
  edit=false;
  window=false;
  dragging = false;
  lag = false;
}
document.getElementById("window").onclick=function(e){
  window=true;
  room=false;
  wall=false;
  door=false;
  edit=false;
  dragging = false;
  lag = false;
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

canvas.onmousedown=function(e){
  //每次点击一下，默认下一步移动，保存现有图形
  dragging = true;
  e.preventDefault();

  loc = windowToCanvas(e.clientX, e.clientY);
  if (event.button==0){
    saveDrawingSurface();
    //画墙
    if(wall){
      //第二次点击
      if(lag){
        //创建墙体对象
        if(zhengjiao){
          var circle = new Circle(mousedown.x, mousedown.y,mousedown2.x,mousedown2.y, 5, "red");
          // 把它保存在数组中
          circles.push(circle);
          mousedown.x=mousedown2.x;
          mousedown.y=mousedown2.y;
        }else{

          // mousedown1 = isinwall(loc.x, loc.y);
          // if (mousedown1.j == 1) {
          //   var circle = new Circle(mousedown.x, mousedown.y,mousedown1.x2,mousedown1.y2, 5, "blue");
          //   // 把它保存在数组中
          //   circles.push(circle);
          //   //需要重绘，将之前最后一个画出的图形擦掉，再画出最后那个图形(重绘之前的所有图形）
          //   // restoreDrawingSurface();
          //   drawRubberbandShape(mousedown.x,mousedown.y,mousedown1.x2,mousedown1.y2,5);
          //   context.clearRect(0, 0, canvas.width, canvas.height);
          //   for (var i = 0; i <= rooms.length-1; i++) {
          //     ZJdrawRubberbandShape(rooms[i].x1, rooms[i].y1, rooms[i].x2, rooms[i].y2, rooms[i].radius);
          //   }
          //
          //   for (var j = 0; j < circles.length-1; j++) {
          //     drawRubberbandShape(circles[j].x1, circles[j].y1, circles[j].x2, circles[j].y2, circles[j].radius);
          //   }
          //  //redrawCircle(mousedown1.i);
          //   mousedown.x = mousedown1.x2;
          //   mousedown.y = mousedown1.y2;
          // }else {
          //   var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
          //   // 把它保存在数组中
          //   circles.push(circle);
          //
          //   mousedown.x=loc.x;
          //   mousedown.y=loc.y;
          // }
          if (mousedown1.j == 1) {
            var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
            // 把它保存在数组中
            circles.push(circle);
            mousedown.x = mousedown1.x2;
            mousedown.y = mousedown1.y2;
          }else {
            var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
            // 把它保存在数组中
            circles.push(circle);
            mousedown.x = loc.x;
            mousedown.y = loc.y;
          }
        }
        //第一次点击
      }else{
        lag=true;
        //以下尝试点击在对象内部直接将点锁定在圆心
        mousedown1 = isinwall(loc.x, loc.y);
        if (mousedown1.j == 1) {
          mousedown.x = mousedown1.x2;
          mousedown.y = mousedown1.y2;
        // }else if(mousedown1.j==5) {
        //   mousedown.x=loc.x;
        //   mousedown.y=loc.y;
        }else {
          mousedown.x=loc.x;
          mousedown.y=loc.y;
        }
        // mousedown.x=loc.x;
        // mousedown.y=loc.y;

      }
    }else if(room){
      //第二次点击，将房间的四条边存放在四个墙体对象中
      if(lag){
        if(width){
          // //var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
          // var r = new Room(mousedown.x, mousedown.y,mousedown3.x,loc.y, 5, "red");
          // // 把它保存在数组中
          // rooms.push(r);
          var circle = new Circle(mousedown.x, mousedown.y,mousedown3.x,mousedown.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(loc.x, mousedown.y,mousedown3.x,loc.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, loc.y,mousedown3.x,loc.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, mousedown.y,mousedown.x,loc.y, 5, "blue");
          circles.push(circle);
        }else if(hight){
          // var r = new Room(mousedown.x, mousedown.y,loc.x,mousedown3.y, 5, "red");
          // // 把它保存在数组中
          // rooms.push(r);

          var circle = new Circle(mousedown.x, mousedown.y,loc.x,mousedown.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(loc.x, mousedown.y,loc.x,mousedown3.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, loc.y,loc.x,mousedown3.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, mousedown.y,mousedown.x,mousedown3.y, 5, "blue");
          circles.push(circle);
        }else{
          //var r = new Room(mousedown.x, mousedown.y,loc.x,loc.y, 5, "red");
          // 把它保存在数组中
          var circle = new Circle(mousedown.x, mousedown.y,loc.x,mousedown.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(loc.x, mousedown.y,loc.x,loc.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, loc.y,loc.x,loc.y, 5, "blue");
          circles.push(circle);
          var circle = new Circle(mousedown.x, mousedown.y,mousedown.x,loc.y, 5, "blue");
          circles.push(circle);
        }
        mousedown.x = loc.x;
        mousedown.y = loc.y;
        restoreDrawingSurface();
        dragging=false;
        lag=false;
        width=false;
        hight=false;

        //第一次点击
      }else{
        lag=true;
        mousedown1 = isinwall(loc.x, loc.y);
        if (mousedown1.j == 1 ) {
          mousedown.x = mousedown1.x2;
          mousedown.y = mousedown1.y2;
        }else {
          mousedown.x=loc.x;
          mousedown.y=loc.y;
        }
        // mousedown.x=loc.x;
        // mousedown.y=loc.y;
      }
    }else if(edit){
      //第二次点击
      if(lag){
        if (mousedown1.j == 1){
            if(zhengjiao){
              circles[mousedown1.i].x1=mousedown.x;
              circles[mousedown1.i].y1=mousedown.y;
              circles[mousedown1.i].x2=mousedown2.x;
              circles[mousedown1.i].y2=mousedown2.y;
            }else{
            circles[mousedown1.i].x1=mousedown.x;
            circles[mousedown1.i].y1=mousedown.y;
            circles[mousedown1.i].x2=loc.x;
            circles[mousedown1.i].y2=loc.y;
          }

        // }else if(mousedown1.j==3){
        //   rooms[mousedown1.i].x1=mousedown.x;
        //   rooms[mousedown1.i].y1=mousedown.y;
        //   rooms[mousedown1.i].x2=loc.x;
        //   rooms[mousedown1.i].y2=loc.y;
        }



        lag=false;
        dragging=false;
        //第一次点击
      }else{
        //获取函数对象
        mousedown1 = isinwall(loc.x, loc.y);
        if (mousedown1.j==1) {
          mousedown.x = mousedown1.x1;
          mousedown.y = mousedown1.y1;

          //重绘的时候传入每个对象的变量
          redrawCircle(mousedown1.i);
          saveDrawingSurface();
          //restoreDrawingSurface();
          lag = true;
          dragging=true;
        // }else if(mousedown1.j==3){
        //   mousedown.x = mousedown1.x1;
        //   mousedown.y = mousedown1.y1;
        //   redrawRoom(mousedown1.i);
        //   saveDrawingSurface();
        //   //restoreDrawingSurface();
        //   lag = true;
        //   dragging=true;
        }
      }
    // } else if(door){
    //   //只有在房间内部才创立对象
    //   mousedown4=inDoor(loc.x,loc.y);
    //   // if(mousedown4.j!=0){
    //   //   var d=new Door(loc.x,loc.y,5,5);
    //   //   doors.push(d);
    //   //   drawDoor(loc.x,loc.y,mousedown4.x1,mousedown4.y1,mousedown4.x2,mousedown4.y2,10,mousedown4.j);
    //   // }
    //   drawDoor(loc.x,loc.y,mousedown4.x1,mousedown4.y1,mousedown4.x2,mousedown4.y2,10,mousedown4.j)
    //

    // }else if(window){

    }

  }
}

canvas.onmousemove=function(e){
  //判断当前是否用户在拖动
  e.preventDefault();
  loc = windowToCanvas(e.clientX, e.clientY);
  if(dragging) {
    //把原来的图片覆盖掉所有的内容，覆盖掉旧的线条
    restoreDrawingSurface();
    if(wall){
      if(zhengjiao){
        //把画出墙体的落点付给m2，设置为下一个点的起始位置
        mousedown2 = QTZJdrawRubberbandShape(mousedown.x,mousedown.y,loc);

        //为了在未输入的情况下显示缺省值
        if(Math.abs(loc.x-mousedown.x)>Math.abs(loc.y-mousedown.y)){
          document.getElementById("box").value=Math.abs(loc.x - mousedown.x);
        }else {
          document.getElementById("box").value=Math.abs(loc.y - mousedown.y);
        }
      }else{
        //如果鼠标拖曳到原点区域内，直接赋予圆心点坐标
        mousedown1 = isinwall(loc.x, loc.y);
        if (mousedown1.j==1||mousedown1.j==3) {
          drawRubberbandShape(mousedown.x,mousedown.y,mousedown1.x2,mousedown1.y2,5);
        }else{
          drawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
        }


        //为了在未输入的情况下显示缺省值
        document.getElementById("box").value=Math.sqrt((loc.x - mousedown.x)*(loc.x - mousedown.x)+
            (loc.y - mousedown.y)*(loc.y - mousedown.y));
      }

      //实现文本框数值自动选中
      document.getElementById("box").select();
    }else if(room){
      if(width && hight){
        ZJdrawRubberbandShape(mousedown.x,mousedown.y,mousedown3.x,mousedown3.y,5);
        document.getElementById("box2").value=Math.abs(loc.y - mousedown.y);
        document.getElementById("box1").value=Math.abs(loc.x - mousedown.x);
        lag=false;
        dragging=false;
        width=false;
        hight=false;
        // var r = new Room(mousedown.x, mousedown.y,mousedown3.x,mousedown3.y, 5, "red");
        // rooms.push(r);

        // 把它保存在数组中
        var circle = new Circle(mousedown.x, mousedown.y,mousedown3.x,mousedown.y, 5, "blue");
        circles.push(circle);
        var circle = new Circle(mousedown3.x, mousedown.y,mousedown3.x,mousedown3.y, 5, "blue");
        circles.push(circle);
        var circle = new Circle(mousedown.x, mousedown3.y,mousedown3.x,mousedown3.y, 5, "blue");
        circles.push(circle);
        var circle = new Circle(mousedown.x, mousedown.y,mousedown.x,mousedown3.y, 5, "blue");
        circles.push(circle);
      }else if(width){
        ZJdrawRubberbandShape(mousedown.x,mousedown.y,mousedown3.x,loc.y,5);
        document.getElementById("box2").value=Math.abs(loc.y - mousedown.y);
        document.getElementById('box2').focus();
        document.getElementById("box2").select();
      }else if(hight){
        ZJdrawRubberbandShape(mousedown.x,mousedown.y,loc.x,mousedown3.y,5);
        document.getElementById("box1").value=Math.abs(loc.x - mousedown.x);
        document.getElementById('box1').focus();
        document.getElementById("box1").select();
      }else {
        mousedown1 = isinwall(loc.x, loc.y);
        if (mousedown1.j==1) {
          ZJdrawRubberbandShape(mousedown.x,mousedown.y,mousedown1.x2,mousedown1.y2,5);
          document.getElementById("box2").value=Math.abs(mousedown1.y2 - mousedown.y);
          document.getElementById("box1").value=Math.abs(mousedown1.x2 - mousedown.x);
        }else{
          ZJdrawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
          document.getElementById("box2").value=Math.abs(loc.y - mousedown.y);
          document.getElementById("box1").value=Math.abs(loc.x - mousedown.x);
        }
        document.getElementById("box1").select();
      }

    }else if(edit){
      if(mousedown1.j==1){
        if(zhengjiao){
          mousedown2 = QTZJdrawRubberbandShape(mousedown.x,mousedown.y,loc);
          //为了在未输入的情况下显示缺省值
          if(Math.abs(loc.x-mousedown.x)>Math.abs(loc.y-mousedown.y)){
            document.getElementById("box").value=Math.abs(loc.x - mousedown.x);
          }else {
            document.getElementById("box").value=Math.abs(loc.y - mousedown.y);
          }
        }else{
          drawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
          //为了在未输入的情况下显示缺省值
          document.getElementById("box").value=Math.sqrt((loc.x - mousedown.x)*(loc.x - mousedown.x)+
              (loc.y - mousedown.y)*(loc.y - mousedown.y));
        }
      }else if(mousedown1.j==3){
        ZJdrawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
      }
      document.getElementById("box").select();

    }
    message.innerHTML = "x=" +loc.x + " ,y=" + loc.y;
  }
}
//鼠标右键停止

//鼠标滑过十字光标

// canvas.onmousemove = function(e){
//   //loc = windowToCanvas(e.clientX, e.clientY);
//   hoverTitle(e.clientX,e.clientY);
// }
// function hoverTitle(x,y){
//   var ifp = 0;
//   for(var i = 0; i < clickposition.length; i++){
//     var p = clickposition[i];
//     if(p.x1 < x && p.x2 > x && p.y1 < y && p.y2 > y){
//       ifp = 1;
//
//     }
//   }
//   if(ifp == 1){
//     $("body").css('cursor','pointer');
//   }else{
//     $("body").css('cursor','default');
//   }
// }
//
// function clickTitle(x,y){
//   for(var i = 0; i < clickposition.length; i++){
//     var p = clickposition[i];
//     if(p.x1 < x && p.x2 > x && p.y1 < y && p.y2 > y){
//       parent.goDetail("${siteId}",p.id);
//     }
//   }
// }
// canvas.onmousemove=function(e){
//   document.style.cursor='crosshair';
// }


canvas.oncontextmenu = function(e) {

  if (event.button == 2) {
    e.preventDefault();
    // loc = windowToCanvas(e.clientX, e.clientY);
    //放弃上一步画的内容
    //saveDrawingSurface();
    // if(wall){
    //   restoreDrawingSurface();
    // }else if(room){
    //   restoreDrawingSurface();
    // }else if(edit){
    // }
    restoreDrawingSurface();
    dragging = false;
    lag = false;

    //lag2=false;
    //return false;//取消右键点击的默认事件
  }
}


//鼠标滚轮事件
windowAddMouseWheel();
function windowAddMouseWheel() {
  var scrollFunc = function (e) {
    e = e || window.event;
    e.preventDefault();
    loc = windowToCanvas(e.clientX, e.clientY);
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
      if (e.wheelDelta > 0) { //当滑轮向上滚动时
        //alert("滑轮向上滚动");
        //调用函数放大
        //1清空
        context.clearRect(0, 0, canvas.width, canvas.height);
        //2平移

        context.scale(2,2);
        context.translate(-loc.x/2,-loc.y/2);
        //3重绘
        big();
        // context.scale(0.5,0.5);
        // context.translate(loc.x/2,loc.y/2);
      }
      if (e.wheelDelta < 0) { //当滑轮向下滚动时
        //1清空
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.scale(0.5,0.5);
        context.translate(loc.x,loc.y);
        small();
        // context.scale(2,2);
        // context.translate(-loc.x,-loc.y);
      }
    } else if (e.detail) {  //Firefox滑轮事件
      if (e.detail> 0) { //当滑轮向上滚动时
        alert("滑轮向上滚动");
      }
      if (e.detail< 0) { //当滑轮向下滚动时
        alert("滑轮向下滚动");
      }
    }
  };
  //给页面绑定滑轮滚动事件
  if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
  }
  //滚动滑轮触发scrollFunc方法
  canvas.onmousewheel = canvas.onmousewheel = scrollFunc;
}
