$(window).load(function(){
  resizeEvent();
  headerEffect();
  workEffect();
})
function resizeEvent(){
  // work
  
  visualResize();
  workListResize();

  $(window).on('resize',resize);

  function resize(){
    visualResize();
    workListResize();
  }

  function visualResize(){
    $('#visual').css({'height':$('#visual>img').innerHeight()})
  }
  function workListResize(){
    $('.work_list').css({'height':$('.work_list li img').innerHeight()+3})
  }

}
function headerEffect(){
  var $header=$('#header');
  var $mainMenu=$('.mainmenu_list>li>a')
  var menuIndex;
  var menuTop=[];
  menuTop[0]=$('#visual').offset().top-0;
  menuTop[1]=$('#about').offset().top-200;
  menuTop[2]=$('#skill').offset().top-200;
  menuTop[3]=$('#work').offset().top-200;

  init();
  initEvent();
  
  function init(){
    $header.css({'height':$(window).innerHeight()});
    $mainMenu.parent('li').eq(0).addClass('selected');
  }
  function initEvent(){
    $(window).on('resize',init);
    $(window).on('scroll',onScroll);
  }

  function onScroll(){
    var scrollTop=$(document).scrollTop();
    if(scrollTop<=menuTop[1]){
      menuIndex=0;
    }else if(scrollTop>=menuTop[1] && scrollTop<menuTop[2]){
      menuIndex=1;
    }else if(scrollTop>=menuTop[2] && scrollTop<menuTop[3]){
      menuIndex=2;
    }else if(scrollTop>=menuTop[3]){
      menuIndex=3;
    }
    $mainMenu.parent('li').removeClass('selected');
    $mainMenu.parent('li').eq(menuIndex).addClass('selected');
  }
}
function workEffect(){
  var $workList=$('.work_list').children();
  var $activeWorkList=$('.active_work_list').children();
  var clickNum;

  loadWork(0);

  $workList.on('click',clickWork);

  function clickWork(){
    clickNum=$workList.index($(this));
    loadWork(clickNum);
  }
  function loadWork(index){
    $workList.removeClass('selected');
    $workList.eq(index).addClass('selected');
    $activeWorkList.css({'display':'none'})    
    $activeWorkList.eq(index).css({'display':'block'})
  }
}