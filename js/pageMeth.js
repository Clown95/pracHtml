/**
 * Created by huiju on 2015/12/22.
 */
function pagerBar(dataCount,pageSize,serverUrl,contentPlace,pagerbarPlace,callBack){
    this.dataCount = dataCount;
    this.pageSize = pageSize;
    this.serverUrl = serverUrl;
    this.contentPlace = $("#"+contentPlace);
    this.pagerbarPlace = $("#"+pagerbarPlace);
    this.callBack = callBack;

    this.pageCount = 0;
    this.pageIndex = 1;
    this.curInfo = $("<span/>");
    this.prePage = $("<span/>");
    this.nextPage = $("<span/>");
    this.init();
}
pagerBar.prototype = {
    init : function(){
        this.getPageCount();
        this.initLink();
        this.showBarInfo();
        if(this.pageCount>0){
            this.setLink(1);
        }
    },
    getPageCount : function(){
        this.pageCount = parseInt(this.dataCount / this.pageSize);
        if(this.dataCount % this.pageSize !=0){
            this.pageCount++;
        }
    },
    initLink : function(){
        var self = this;
        this.prePage = $("<span/>").html("上一页").addClass("pageLink");
        this.prePage.click(function(){
            self.setLink(self.pageIndex-1);
        });
        this.nextPage = $("<span/>").html("下一页").addClass("pageLink");
        this.nextPage.click(function(){
            self.setLink(self.pageIndex+1);
        });
        this.pagerbarPlace.append(this.curInfo).append(this.prePage).append(this.nextPage);
    },
    showBarInfo : function(){
        this.prePage.hide();
        this.nextPage.hide();

        if(this.pageCount==0){
            this.curInfo.html("暂时没有信息!");
        }
        else if(this.pageCount==1){
            this.curInfo.html("1/1");
        }
        else{
            this.curInfo.html(this.pageCount + "/" + this.pageIndex);
        }

    },
    setLink : function(i){
        var self = this;
        $.ajax({
            url:self.serverUrl,
            type:"get",
            data:{pageSize:self.pageSize,pageIndex:i},
            cache:false,
            error:function(){
                alert("数据加载失败!");
            },
            success:function(htmlData){
                self.contentPlace.html(htmlData);
                if(self.pageCount==1){
                    self.prePage.hide();
                    self.nextPage.hide();
                }else{
                    if(i==1){
                        self.prePage.hide();
                        self.nextPage.show();
                    }else if(i==self.pageCount){
                        self.prePage.show();
                        self.nextPage.hide();
                    }else{
                        self.prePage.show();
                        self.nextPage.show();
                    }
                }
                self.pageIndex = i;
                self.curInfo.html(self.pageCount+"/"+self.pageIndex);
                if(self.callBack){
                    self.callBack();
                }
            }
        });
    },
    changeServerUrl : function(dataCount,serverUrl){
        this.dataCount = dataCount;
        this.serverUrl = serverUrl;
        this.pageIndex=1;

        this.getPageCount();
        this.showBarInfo();
        this.contentPlace.html("");
        if(this.pageCount>0){
            this.setLink(1);
        }
    },
    dataCountDec : function(){
        this.dataCount--;
        this.getPageCount();
        if(this.pageCount<this.pageIndex){
            this.pageIndex = this.pageCount;
        }
        if(this.pageIndex>0){
            this.setLink(this.pageIndex);
        }
        this.showBarInfo();
    }
}