/**
 * Created by huiju on 2016/1/6.
 */
$(function(){
    $(window).scroll(function () {
        if($(window).scrollTop()>=100) {
            $(".go-top").fadeIn();
        }else {
            $(".go-top").fadeOut();
        }
    });


    $(".go-top").click(function(event){
        $('html,body').animate({scrollTop:0}, 100);
        return false;
    });
});

