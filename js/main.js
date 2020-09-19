$(document).ready(function(){
  visualEffect();
  scrollEvent();
})


function visualEffect(){

  visualHeight()
  textEffect()

  $(window).on('resize',visualHeight)
  function visualHeight(){
    $('.visual').css({'height':$(window).innerHeight()})
  }
  function textEffect(){
    var $title0=$('.visual .text-wrap .title').eq(0);
    var $title1=$('.visual .text-wrap .title').eq(1);
    var $title2=$('.visual .text-wrap .title').eq(2);
    var title1Num=$title1.children().size()
    var title2Num=$title2.children().size()
  
    init()

    function init(){
      $title0.css({'opacity':0, 'top':-100})
      $title1.children().css({"opacity":0,"top":-200})
      $title2.children().css({"opacity":0,"top":200})
    }

    $title0.animate({'opacity':1, 'top':0},500,"easeOutCubic",function(){
      for(var i=0; i<title1Num; i++){
        $title1.children().eq(i).animate({"opacity":1,"top":0},500+(120*i),"easeOutCubic",function(){
          for(var i=0; i<title2Num; i++){
            $title2.children().eq(i).animate({"opacity":1,"top":0},500+(120*i),"easeOutCubic")
          }
        })
      }
    })
  }
}
function scrollEvent(){
  // scroll value
  var currentScroll=$(document).scrollTop();
  var newScroll;
  var sectionTop=[];
  sectionTop[0]=$('.about').offset().top;
  sectionTop[1]=$('.work').offset().top;
  sectionTop[2]=$('.contact').offset().top+500;

  // header
  var $mainMenu=$('.main-menu>li>a');
  // visual
  var $scrollDownBtn=$('.scroll-down');
  // about
  var $aboutImg=$('.introduce>.img-wrap');
  var $aboutText=$('.introduce>.text-wrap');
  // skill
  var $skillWrap=$('.skill-wrap');
  // work
  var $workList=$('.work__list>li');
  var workLiNum=$workList.size();

  init();
  initEvent();

  function init(){
    // about
    $aboutImg.css({'left':-500,'opacity':0})
    $aboutText.css({'right':-500,'opacity':0})
    // skill
    $skillWrap.css({'top':500,'opacity':0})
    $workList.css({'left':500,'opacity':0})
  }

  function initEvent(){
    $(window).on('scroll',onScroll);
    $mainMenu.on('click',clickMenuScroll);
    $scrollDownBtn.on('click',function(){
      $('body,html').animate({scrollTop:sectionTop[0]},500,"easeOutCubic")
    })
  }

  function clickMenuScroll(){
    var menuNum=$mainMenu.index($(this));
    $('body,html').animate({scrollTop:sectionTop[menuNum]},500,"easeOutCubic")
  }

  function onScroll(){
    newScroll=$(document).scrollTop()
    // header 활성화
    if(newScroll-currentScroll>0 || newScroll<sectionTop[0]-80){
      $('header.on').filter(':not(:animated)').animate({'height':0},500,"easeOutCubic",function(){
        $('header').removeClass('on')
      })
    }else if(newScroll-currentScroll<0 && newScroll>sectionTop[0]-80){
      $('header').addClass('on');
      $('header.on').filter(':not(:animated)').animate({'height':80},500,"easeOutCubic");
    }
    if(newScroll<sectionTop[0]){
      $mainMenu.parent().removeClass('on')
    }else if(newScroll>sectionTop[0] && newScroll<sectionTop[1]){
      $mainMenu.parent().removeClass('on')
      $mainMenu.parent().eq(0).addClass('on')
    }else if(newScroll>sectionTop[1] && newScroll<sectionTop[2]-500){
      $mainMenu.parent().removeClass('on')
      $mainMenu.parent().eq(1).addClass('on')
    }else if(newScroll>sectionTop[2]-500){
      $mainMenu.parent().removeClass('on')
      $mainMenu.parent().eq(2).addClass('on')
    }
    // about transition
    if(newScroll>=sectionTop[0]-600 && newScroll<sectionTop[0]){
      $aboutImg.animate({'left':0,'opacity':1},700,"easeOutCubic");
      $aboutText.animate({'left':0,'opacity':1},700,"easeOutCubic");
    }else if(newScroll>=sectionTop[0] && newScroll<sectionTop[1]-600){
      $skillWrap.animate({'top':0,'opacity':1},700,"easeOutCubic");
    }else if(newScroll>=sectionTop[1]-600){
      for(i=0; i<=workLiNum; i++){
        $workList.eq(i).animate({'left':0,'opacity':1},700+(i*500),"easeOutCubic");
      }
    }
    currentScroll=newScroll
  }


}