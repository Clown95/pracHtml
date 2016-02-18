/**
 * Created by huiju on 2015/12/22.
 */
(function ($) {
    var PageFunc = function PageFunc() { }
    $.PageFunc = function (Total, PageSize, curPageNum, FunUrl) {
        if (PageSize == "" || PageSize == null || PageSize == undefined) {
            PageSize = 10;
        }
        if (curPageNum == "" || curPageNum == null || curPageNum == undefined) {
            curPageNum = 1;
        }
//计算总页数
        Total = parseInt(Total); //总记录数
        PageSize = parseInt(PageSize); //每页显示数
        curPageNum = parseInt(curPageNum); //当前页
//总页数
        var AllPage = Math.floor(Total / PageSize);
        if (Total % PageSize != 0) {
            AllPage++;
        }

        var navHtml = "";

        if (curPageNum <= 0)
            curPageNum = 1;
        if (AllPage > 1) {
            if (curPageNum != 1) {
//处理首页连接
                navHtml += "<span><a href=\"javascript:" + FunUrl + "('1')\" >|<</a></span>  ";
            }
            if (curPageNum > 1) {
//处理上一页的连接
                navHtml += "<span><a href=\"javascript:" + FunUrl + "('" + (curPageNum - 1) + "')\" ><<</a></span>  ";
            }
            else {
                navHtml += "<span class=\"disabled\"><<</span>  ";
            }

            var currint = 5;
            for (var i = 0; i <= 10; i++) {
//一共最多显示10个页码，前面5个，后面5个
                if ((curPageNum + i - currint) >= 1 && (curPageNum + i - currint) <= AllPage)
                    if (currint == i) {
//当前页处理
                        navHtml += "<span lass=\"current\">[" + curPageNum + "]</span>  ";
                    }
                    else {
//一般页处理
                        var n = curPageNum + i - currint;
                        navHtml += "<a href=\"javascript:" + FunUrl + "('" + (parseInt(n)) + "')\">" + n + "</a>  ";
                    }
            }
            if (curPageNum < AllPage) {
//处理下一页的链接
                navHtml += "<span><a href=\"javascript:" + FunUrl + "('" + (parseInt(curPageNum) + 1) + "')\">>></a></span>  ";
            }
            else {
                navHtml += "<span class=\"disabled\">>></span>  ";
            }

            if (curPageNum != AllPage) {
                navHtml += "<span><a href=\"javascript:" + FunUrl + "('" + AllPage + "')\" >>|</a></span>  ";
            }

        }

        navHtml += "<span>[" + curPageNum + "/" + AllPage + "]</span>  ";

        return navHtml;

    };

})(jQuery);
