function Windowss(x, y, width,color) {
  this.x = x;
  this.y = y;


  this.width = width;
  this.color=color;
  this.isSelected = false;
}

//画出窗户
function drawWindow(x,y,x1,y1,x2,y2,width,r,color) {

  context.strokeStyle = color;
  context.beginPath();
  if(x1==x2){
    context.moveTo(x,y-width/2);
    context.lineTo(x,y+width/2);
  }else{
    var tan=(y2-y1)/(x2-x1);
    context.moveTo(x-width/2/(tan*tan+1),y-width*tan/2/(tan*tan+1));
    context.lineTo(x+width/2/(tan*tan+1),y+width*tan/2/(tan*tan+1));

  }
  context.closePath();
  context.stroke();

  // context.arc(x,y,width,Math.atan((y2 - y1)/(x2 - x1))+0.5*Math.PI,
  //     Math.atan((y2 - y1)/(x2 - x1)),true);
  // context.lineTo(x,y);

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