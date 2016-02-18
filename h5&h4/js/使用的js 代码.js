/**
 * Created by zhangle on 2015/8/14.
 */

//前提需要倒入Jquery,获取id为bgclock的标签，然后显示出时间。
var my_date=new Date();
var my_year=my_date.getFullYear();
var my_month=my_date.getMonth() + 1;
var my_day=my_date.getDate();
var my_mainday=my_date.getDay();
var week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
$(document).ready(function(){
    $('#bgclock').html(my_year+"-"+my_month+"-"+my_day+week[my_mainday]);
})