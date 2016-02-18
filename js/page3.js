/**
 * Created by huiju on 2015/12/22.
 */
var currentSet,CutFlag,TotalByte,PageCount,key,tempText,tempPage;
key="";
currentSet=0;
TotalByte=Text.length;
if (flag==1)
{
    PageCount=Math.round(TotalByte/PageSize);
    if(parseFloat("0."+TotalByte%PageSize)>0){
        if(parseFloat("0."+TotalByte%PageSize)<0.5){
            PageCount=PageCount+1;
        }
    }
    var PageNum=new Array(PageCount+1);
    var PageTitle=new Array(PageCount+1);
    PageNum[0]=0;
    PageTitle[0]="";

    var sDrv1,sDrv2,sDrv3,sDrv4,sFlag;
    var sDrvL,sTemL;
    var sTem1,sTem2,k;
    sFlag=0;

    for(j=1;j<PageCount+1;j++){
        PageNum[j]=PageNum[j-1]+PageSize;
        PageTitle[j]="";
        //alert(j);
        sDrv1="<br>";
        sDrv2="<BR>";
        sDrv3="<Br>";
        sDrv4="<bR>";
        sDrvL=sDrv1.length;
        for(k=PageNum[j];k<=TotalByte;k++){
            sTem1=Text.substring(PageNum[j]-sDrvL,k);
            sTemL=sTem1.length;
            sTem2=sTem1.substring(sTemL-sDrvL,sTemL)
            if (sTem2==sDrv1 || sTem2==sDrv2 || sTem2==sDrv3 || sTem2==sDrv4)
            {
                sFlag=sFlag+1;
                PageNum[j]=k;
                break;
            }
        }
        if (PageNum[j]>TotalByte) {
            break;
        }
        if (j<PageCount) {
            PageNum.length=j;
            PageCount=j
        }
        if (PageCount>1&&sFlag>1&&PageCount<sFlag) {
            PageCount=sFlag+1;
        }
        else{
//手动分页
            var j,sFlag,PageCount,sText;
            var sTitleFlag;
            var PageNum=new Array();
            var PageTitle=new Array();
            PageSize=0;
            j=1;
            PageNum[0]=-10;
            PageTitle[0]="";
            sFlag=0;
            sText=Text;
            do
            {
                sText=Text.substring(PageNum[j-1]+10,TotalByte);
                sFlag=sText.indexOf("[NextPage");
                if (sText.substring(sFlag+9,sFlag+10)=="=")
                {
                    sTitleFlag=sText.indexOf("]",sFlag);
                    PageTitle[j]=sText.substring(sFlag+10,sTitleFlag);
                }
                else{
                    PageTitle[j]="";
                }
                if (sFlag>0)
                {
                    PageNum[j]=sFlag+PageNum[j-1]+10;
                }
                else{
                    PageNum[j]=TotalByte;
                }
                j+=1;
            }
            while (PageNum[j-1]<TotalByte);
            PageCount=j-1;
        }

        function CovertCRLFToBR(s) {
            var i;
            var s2 = s;

            while(s2.indexOf("[NextPage]")>0)
            {
                i = s2.indexOf("[NextPage]");
                s2 = s2.substring(0, i) + "" + s2.substring(i + 10, s2.length);
            }
            return s2;
        }
        function text_pagination(Page){
            var Output,Byte;
            if(Page==null){Page=1;}
            Output="";
            Output=Output+"<table width=100% height=30 border=0 align=center cellpadding=0 cellspacing=0>";
            Output=Output+"<tr>";
            Output=Output+"<td height=1 background=Images/DotLine.gif></td>";
            Output=Output+"</tr>";
//头部功能导航条
            Output=Output+"<tr>";
//正文查找
            Output=Output+"<td align=left width='40%'> ";
            Output=Output+"<input type=hidden name=keys class=iptA onchange='key=this.value' size=12> <input type=hidden class=btnA name=search value='查找正文' onclick='searchkey();' style='width:60'>";
            Output=Output+"</td>";
            Output=Output+"<td align=right>";
//页码显示方式一
//第x页：分页标题
            if (Page==0 || PageCount==0){
                Output=Output+"当前是：<font color=red>全文显示</font>" ;
            }
            else{
                if(TotalByte>PageSize){Byte=PageNum[Page]-PageNum[Page-1]}else{Byte=TotalByte};
                Output=Output+"第 <font color=red>"+Page+"</font> 页";
                if (PageTitle[Page]!="")
                {
                    Output=Output+"：<font color=800000>"+PageTitle[Page]+"</font>";
                }
            }
//显示方式二
//下拉菜单选择
//if (PageCount>0)
//{
// Output=Output+PageNav(2,Page);
// Output=Output+" </td>";
//}
//显示方式三
//页码选择列表
//Output=Output+"<td align=right bgcolor=#f0faff>";
//Output=Output+PageNav(0,Page);
//Output=Output+"</td>";
            Output=Output+"</tr>";
            Output=Output+"<tr>";
            Output=Output+"<td height=1 background=Images/DotLine.gif></td>";
            Output=Output+"</tr>";
            Output=Output+"</table>";
//显示正文
            if(Page==0) {
//不分页
                tempText=CovertCRLFToBR(Text);
            }
            else{
//分页
                if (flag==1)
//自动分页
                {
                    tempText=Text.substring(PageNum[Page-1],PageNum[Page]);
                }
                else{
//手动分页
                    if (PageTitle[Page-1].length==0)
                    {
                        tempText=Text.substring(PageNum[Page-1]+10,PageNum[Page]);
                    }
                    else{
                        tempText=Text.substring(PageNum[Page-1]+11+PageTitle[Page-1].length,PageNum[Page]);
                    }
                }
            }
            Output=Output+"<div id=world>";
            Output=Output+tempText;
            Output=Output+"</div>";
            Output=Output+"<br>";
            Output=Output+"<div align=center>";
            Output=Output+PageNav(1,Page);
            Output=Output+"</div>";

            article.innerHTML = Output;
            document.location.href='#';
            eval(document.all.keys).value=key;
            if (key!=""){searchkey();}
        }
        function searchkey(){
//正文查找函数
            h="<font class=keyworld>";
            f="</font>";
            keyset=new Array();
            key=document.all.keys.value;
            if (key==""){
                alert("请输入关键字！");
                return;
            }
            else{
                keyset[0]=tempText.indexOf(key,0);

                if (keyset[0]<0){
                    return;
                }else
                    temp=tempText.substring(0,keyset[0]);
                temp=temp+h+key+f;
                temp2=tempText.substring(keyset[0]+key.length,tempText.length);
                for (i=1;i<tempText.length;i++) {
                    keyset[i]=tempText.indexOf(key,keyset[i-1]+key.length);
                    if(keyset[i]<0){
                        temp=temp+tempText.substring(keyset[i-1]+key.length,tempText.length);
                        break;
                    }else{
                        temp=temp+tempText.substring(keyset[i-1]+key.length,keyset[i])+h+key+f;
                    }
                }
                world.innerHTML = temp;
            }
        }
        function PageNav(ShowStyle,Page){
//分页码显示函数
//参数为调用样式，0=简单样式，1=标准样式
            var temp="";
            if (ShowStyle==0)
//简单样式
            {
                tempPage=Page;
                if(TotalByte>PageSize){
                    if (Page-4<=1){
                        temp=temp+"<font face=webdings color=#999999>9</font>";
                        if (Page<=1){temp=temp+"<font face=webdings color=#999999>7</font>";}else{temp=temp+"<a href=javascript:text_pagination("+(Page-1)+")><font face=webdings>7</font></a>";}
                        if (PageCount>10){
                            for(i=1;i<8;i++){
                                if (i==Page){
                                    temp=temp+"<font color=red>"+i+"</font> ";
                                }else{
                                    temp=temp+"<a href=javascript:text_pagination("+i+") >"+i+"</a>"+" ";
                                }
                            }
                            temp=temp+" ...";
                        }
                        else{
                            for(i=1;i<PageCount+1;i++){
                                if (i==Page){
                                    temp=temp+"<font color=red>"+i+"</font> ";
                                }
                                else{
                                    temp=temp+"<a href=javascript:text_pagination("+i+") >"+i+"</a>"+" ";
                                }
                            }
                        }
                        if (Page==PageCount){temp=temp+"<font face=webdings color=#999999>8</font>";}else{temp=temp+"<a href=javascript:text_pagination("+(Page+1)+")><font face=webdings>8</font></a>";}
                        if(PageCount<10){temp=temp+"<font face=webdings color=#999999>:</font>";}else{temp=temp+"<a href=javascript:text_pagination("+PageCount+")><font face=webdings>:</font></a>";}
                    }
                    else if(Page+4<=PageCount){
                        temp=temp+"<a href=javascript:text_pagination(1)><font face=webdings>9</font></a>";
                        temp=temp+"<a href=javascript:text_pagination("+(Page-1)+")><font face=webdings>7</font></a>";
                        if (PageCount>10){
                            temp=temp+"..";
                            for(i=Page-4;i<Page+4;i++){
                                if (i==Page){
                                    temp=temp+"<font color=red>"+i+"</font> ";
                                }
                                else{
                                    temp=temp+"<a href=javascript:text_pagination("+i+") >"+i+"</a>"+" ";
                                }
                            }
                            temp=temp+" ..";
                        }
                        else{
                            for(i=1;i<PageCount+1;i++){
                                if (i==Page){
                                    temp=temp+"<font color=red>"+i+"</font> ";
                                }
                                else{
                                    temp=temp+"<a href=javascript:text_pagination("+i+") >"+i+"</a>"+" ";
                                }
                            }
                        }

                        if (Page==PageCount){temp=temp+"<font face=webdings color=#999999>8</font>";}else{temp=temp+"<a href=javascript:text_pagination("+(Page+1)+")><font face=webdings>8</font></a>";}
                        temp=temp+"<a href=javascript:text_pagination("+PageCount+")><font face=webdings>:</font></a>";
                    }
                    else{
                        temp=temp+"<a href=javascript:text_pagination(1)><font face=webdings>9</font></a>";
                        temp=temp+"<a href=javascript:text_pagination("+(Page-1)+")><font face=webdings>7</font></a>";
                        temp=temp+".."
                        for(i=Page-2;i<PageCount+1;i++){
                            if (i==Page){
                                temp=temp+"<font color=red>"+i+"</font> ";
                            }
                            else{
                                temp=temp+"<a href=javascript:text_pagination("+i+") >"+i+"</a>"+" ";
                            }
                        }
                        if (Page==PageCount){temp=temp+"<font face=webdings color=#999999>8</font>";}else{temp=temp+"<a href=javascript:text_pagination("+(Page+1)+")><font face=webdings>8</font></a>";}
                        temp=temp+"<font face=webdings color=#999999>:</font>";
                    }
                }
                else{
                    temp=temp+"<font color=red>1</font> ";
                }
                temp=temp+" <a href=javascript:text_pagination(0)>显示全部</a>"
            }
            else if (ShowStyle==1)
//标准样式
            {
                if(TotalByte>PageSize){if(Page!=0){if(Page!=1){temp=temp+"<a href='#top' onclick=javascript:text_pagination("+(Page-1)+")><font color=3366cc>[上一页]</font></a>  ";}}}
                for (i=1;i<PageCount+1 ;i++ )
                {
                    if (Page==i)
                    {
                        temp=temp+"<font color=800000>["+i+"]</font>  ";
                    }
                    else{
                        temp=temp+"<a href='#top' onclick=javascript:text_pagination("+i+")><font color=3366cc>["+i+"]</font></a>  ";
                    }
                }
                temp=temp+"<a name='foot'></a>";
                if(TotalByte>PageSize){if(Page!=0){if(Page!=PageCount){temp=temp+"<a href='#top' onclick=javascript:text_pagination("+(Page+1)+")><font color=3366cc>[下一页]</font></a>";}}}
                temp=temp+" <a href=javascript:text_pagination(0)><font color=3366cc>显示全部</font></a>"
            }
            else if (ShowStyle==2)
//下拉菜单样式
            {
                temp=temp+'<select onchange="text_pagination(this.value)">'
                for (i=1;i<PageCount+1 ;i++ )
                {
                    if (Page==i)
                    {
                        temp=temp+"<option value='"+i+"' selected style='color:red'>第 "+i+" 页"

                    }
                    else{
                        temp=temp+"<option value='"+i+"'>第 "+i+" 页";
                    }
                    if (PageTitle[i].length!=0)
                    {
                        temp=temp+'：'+PageTitle[i];
                    }
                    temp=temp+"</option>";
                }
                temp=temp+"</select>";
            }

            return (temp);
        }
