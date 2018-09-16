//确定房间的宽度
function getwidth() {
  if (event.keyCode == 13) {
    var input1=parseInt(document.getElementById("box1").value);
    restoreDrawingSurface();
    if(loc.x>mousedown.x){
      mousedown3.x=mousedown.x+input1;
    }else{
      mousedown3.x=mousedown.x-input1;
    }
    width=true;
    //saveDrawingSurface();
    dragging = true;
    document.getElementById("box1").value="";
  }
}

//确定房间的长度
function getheight() {
  if (event.keyCode == 13) {
    var input2=parseInt(document.getElementById("box2").value);
    restoreDrawingSurface();
    if(loc.y>mousedown.y){
      mousedown3.y=mousedown.y+input2;
    }else{
      mousedown3.y=mousedown.y+input2;
    }
    hight=true;
    saveDrawingSurface();
    dragging = true;
    document.getElementById("box2").value="";
  }

}
//确定墙体的长度并画出
function getKey() {
  if(event.keyCode==13){
    // if (isNaN(parseInt(document.getElementById("box").value))) {
    //    return false;
    // }
    //分情况，如果鼠标在点击点的右侧
    //通过id获取文本框对象并将其转化为整数
    var input=parseInt(document.getElementById("box").value);

    // if(isNaN(input)){
    //     document.getElementById("box").value="";
    // }
    restoreDrawingSurface();
    if(zhengjiao){
      //把mousedown定位到要画到的那个点上面
      if(Math.abs(loc.x-mousedown.x)>Math.abs(loc.y-mousedown.y)){
        if(loc.x>mousedown.x){
          loc.x = mousedown.x+input;
        }else {
          loc.x = mousedown.x-input;
        }
      }else {
        if(loc.y>mousedown.y){
          loc.y = mousedown.y+input;
        }else {
          loc.y = mousedown.y-input;
        }
      }

      loc=QTZJdrawRubberbandShape(mousedown.x,mousedown.y,loc.x,loc.y,5);
      if(wall){
        var circle = new Circle(mousedown.x, mousedown.y,loc.x,loc.y, 5, "blue");
        // 把它保存在数组中
        circles.push(circle);
      }else if(edit){
        circles[mousedown1.i].x1=mousedown.x;
        circles[mousedown1.i].y1=mousedown.y;
        circles[mousedown1.i].x2=loc.x;
        circles[mousedown1.i].y2=loc.y;
      }

      if(Math.abs(loc.x-mousedown.x)>Math.abs(loc.y-mousedown.y)){
        mousedown.x=loc.x;
      }else {
        mousedown.y=loc.y;
      }

    }else{
      drawDynamicLine(mousedown.x,mousedown.y,loc.x,loc.y,input);
    }


    //drawRubberbandShape(mousedown1);

    //e.preventDefault();
    saveDrawingSurface();
    // if(edit){
    //
    // }
    dragging = true;
    document.getElementById("box").value="";
  }
}

//画出墙体非正交的尺寸定位，加创建对象
function drawDynamicLine(x1,y1,x2,y2,input) {
  if (x1 == x2) {
    drawRubberbandShape(x1,y1,x2,y2,5)
    /*斜率不存在的情况*/
  } else {
    /*斜率为正或者负或者0*/
    //y=kx+b
    var k=(y2-y1)/(x2-x1) ;  //斜率k     正 负 0
    var b=y1-k*x1           //常数b
    var i=0;
    //x3和和y3存储结束的坐标
    var x3=0;
    var y3=0;


    //通过id获取文本框对象并将其转化为整数
    //var input = parseInt(document.getElementById("box").value);
    var increaseX=input/(Math.sqrt(1+k*k));
    //var increaseY=increaseX*k;

    if (y1<y2) {

      if (x1<x2) {
        // drawLine(x1,y1,x1+increaseX,y1+increaseY);
        // mousedown.x+=increaseX;
        i=1;
      } else {
        i=-1;
      }

    } else {

      if (x1>x2) {
        i=-1;
      } else {
        i=1;
      }

    }
    x3=x1+i*increaseX;
    y3=k*x3+b;
    drawRubberbandShape(x1,y1,x3,y3,5);

    //在画图的状态下创建新的对象，在编辑的状态下修改对象
    if(wall){
      var circle = new Circle(x1,y1,x3,y3, 5, "blue");
      circles.push(circle);
    }else if(edit){
      circles[mousedown1.i].x1=x1;
      circles[mousedown1.i].y1=y1;
      circles[mousedown1.i].x2=x3;
      circles[mousedown1.i].y2=y3;
    }
    mousedown.x=x3;
    mousedown.y=y3;


  }
}
