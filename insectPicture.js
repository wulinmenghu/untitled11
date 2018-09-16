
$(function(){
  $('.submit').on('click',function(){
    //将上传的图片读取成url显示到img中
    showDataByUrl();
    //将上传的文件读取成二进制显示到img中
    //showDataByBinaryString();
    //将上传的文件读取成文本显示到img中
    //showDataByText();
  });

  function showDataByUrl(){
    //files[0]读取一个文件的写法，多个文件需要用到循环
    var resultFile=document.getElementById('fileDemo').files[0];
    if ((/image\/\w+/.test(resultFile.type))) {
      if (resultFile) {
        var reader = new FileReader();
        reader.readAsDataURL(resultFile);
        reader.onload = function (e) {
          var urlData = this.result;
          console.log(urlData);
          document.getElementById("result").innerHTML += "<img src='" + urlData + "' alt='" + resultFile.name + "' />";
        };
      }
    }
  }

})
