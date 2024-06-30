$(function(){
  var num = 0;
  var gun = 0;

  // 在加载时克隆第一个 iframe 并添加到 .home 容器中
  var clone1 = $('#demo1').clone(true);
  $('.home').append(clone1[0]);

  // 设置定时器，每隔 20 秒切换 iframe
  setInterval(function(){
    num++;
    if(num > 2){
      num = 0;
    }
    switchIframe(num);
  }, 20000);

  // 切换显示指定索引的 iframe
  function switchIframe(index) {
    $('.home iframe').hide(); // 隐藏所有 iframe
    $('.home iframe:eq(' + index + ')').show(); // 显示指定索引的 iframe
  }
});
