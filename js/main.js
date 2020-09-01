$(document).ready(function(){
  headerEffect();
  // visualEffect();
})
function headerEffect(){
  var $header=$('#header');

  init();
  
  function init(){
    $header.css({'height':$(window).innerHeight()});
  }
  function initEvent(){
    $(window).on('resize',init);
  }
}