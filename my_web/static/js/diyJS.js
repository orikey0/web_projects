// 调用Swiper的JS文件,用作点击快速移动后刷新轮播
function openFunction(name) {
    var property = document.getElementById(name);
    property.style.display = "block";
    console.log("%s is opened!", property);
}
function closeFunction(name) {
    var flag = true;
    if (name == 'panel-default') {
        flag = confirm('打开地图请刷新页面');
        console.log('flag == ' + flag);
    }
    if (flag == false)
        return false;
    var property = document.getElementById(name);
    property.style.display = "none";
    console.log("%s is closed!", property);

}
function maxFunction(name, min, max) {
    var propertyA = document.getElementById(min);
    propertyA.style.display = "inline-block";
    var propertyB = document.getElementById(max);
    propertyB.style.display = "none";
    openFunction(name);

    console.log("%s is max!", propertyB);
}
function minFunction(name, min, max) {
    var propertyA = document.getElementById(min);
    propertyA.style.display = "none";
    var propertyB = document.getElementById(max);
    propertyB.style.display = "inline-block";
    closeFunction(name);
    console.log("%s is min!", propertyA);
}
var warnType = ['快速移动', '人群拥挤', '人数超限'];
var ID = ['ID-1', 'ID-2', 'ID-3'];
// 不能叫location,已经被使用了
var place = ['科技大学北', '大学生活动中心', 'J13正门'];
var capNames = ['邓艾', '邵秋', '张秋'];
var securityNames = [['秦羽', '班杰明', '徐冰'], ['单质帅', '华黎候', '贾诩'], ['马德华', '伊伍凡', '田科']];
var capTels = ['17866321964', '17865751486', '17865149378'];
var securityPlaces = ['J1教学楼', '家属区', '尤洛卡广场'];
var teamIDs = ['228', '229', '230'];
var iswork = ['未出勤', '未出勤', '未出勤',];

// 生成轮播安保/预警信息的具体内容
function createContent(flag) {
    var content = '';
    var html = '';
    if (flag < 3) {
        content += "<tr><th><i class='icon_ID'></i> 编号</th><th><i class='icon_ribbon'></i> 类型</th><th><i class='icon_documents'></i>信息</th></tr>";
        content += "<tr><td>1</td><td>异常类型</td><td>" + warnType[flag] + "</td></tr>";
        content += "<tr><td>2</td><td>设备编号</td><td>" + ID[flag] + "</td></tr>";
        content += "<tr><td>3</td><td>地点</td><td>" + place[flag] + "</td></tr>";
        content += "<tr><td>4</td><td>阈值人数</td><td>" + warnLimit[flag] + "</td></tr>";
        content += "<tr><td>5</td><td>人数</td><td>" + peopleNum[flag] + "</td></tr>";
        html = "<tbody>" + content + "</tbody>"
    }
    if (flag >= 3) {
        content += "<tr><th><i class='icon_ID'></i> 编号</th><td>" + teamIDs[flag - 3] + "</td>";
        content += "<tr><th><i class='icon_pin'></i> 驻地</th><td>" + securityPlaces[flag - 3] + "</td></tr>";
        content += "<tr><th><i class='icon_profile'</i> 队长</th><td>" + capNames[flag - 3] + "</td></tr>";
        content += "<tr><th><i class='icon_group'></i> 队员1</th><td>" + securityNames[flag - 3][0] + "</td></tr>";
        content += "<tr><th><i class='icon_group'></i> 队员2</th><td>" + securityNames[flag - 3][1] + "</td></tr>";
        content += "<tr><th><i class='icon_group'></i> 队员3</th><td>" + securityNames[flag - 3][2] + "</td></tr>";
        content += "<tr><th><i class='icon_mobile'</i> 联系方式</th><td>" + capTels[flag - 3] + "</td></tr>";
        content += "<tr><th class='icon_star'>是否出勤</th><td>" + iswork[flag - 3] + "</td></tr>";
        html = "<tbody>" + content + "</tbody>"
    }
    return html;
}

// 轮播的预警信息页面改变颜色js,Jquery
// 将Jquery封装成函数供marker使用
// 改变告警颜色
function createWarning(flag) {
    html = createContent(flag);
    if (flag < 3) {
        $("#ss03").css({ "display": "block" });
        var contentColor;
        if (flag == 0)
            contentColor = "#00c4ff";
        else if (flag == 1)
            contentColor = "orange"
        else if (flag == 2)
            contentColor = "red";
        $("#seekTable1").css({ "background-color": contentColor, "transition": "all 0.4s" });
        $("#seekTable1").html(html);
        mySwiper.update();
    }
    
    else if(flag >= 3){
        $("#ss02").css({ "display": "block" });
        $("#seekTable2").html(html);
        mySwiper.update();
    }
}
// 实时视频部分
var myVideo = document.getElementById('videoActive');
// 倍速
function getPlaySpeed() {
    return myVideo.playbackRate;
    // alert(myVideo.playbackRate);
}
function setPlaySpeed(speed) {
    console.log("speed = " + speed);
    var nowSpeed = getPlaySpeed();
    if (speed != 1) {
        if (nowSpeed != speed)
            myVideo.playbackRate = speed;
        else
            myVideo.playbackRate = 1;
    }
    else
        myVideo.playbackRate = speed;
}

// 数据库操作的页码js
var nowPage = 1;
var start, end;
getData();
function getData() {
    setPage(12);
}
//输出页码
function setPage(pageCount) {
    var pageHtml = '';

    if (nowPage <= 5) {
        start = 1;
    } else {
        var temp = nowPage - 5 + 1;
        if (temp + 9 <= pageCount)
            start = temp;
    }
    if (start + 9 < pageCount) {
        end = start + 9;
    } else {
        end = pageCount;
    }
    if (nowPage > 1) {
        pageHtml += '<span>上一页</span>';
    }
    for (var i = start, page_cur = ''; i <= end; i++) {
        if (nowPage == i) {
            page_cur = 'page_cur';
        } else {
            page_cur = '';
        }
        pageHtml += '<span class="' + page_cur + '">' + i + '</span>';
    }
    if (nowPage < pageCount) {
        pageHtml += '<span>下一页</span>';
    }
    $('.page_show').empty().append(pageHtml);
}

//根据id的不同，切换不同数据表的页面
$('#textCenter').on('click', '#pageShow span', function () {
    var $this = $(this);
    if ($this.hasClass('page_cur')) {
        return;
    }
    var page = $this.html();
    if (page == '上一页') {
        nowPage = nowPage - 1;
    } else if (page == '下一页') {
        nowPage = nowPage + 1;
    } else {
        nowPage = parseInt(page);
    }
    //根据页码获取当前页列表数据
    getData();
});

// 实时视频的url和相关动态html
url = "";
console.log("now url == " + url);
videoHtml = "";

function setUrl(url) {
    url = url;
    console.log("setUrl,url == " + url);
}
function setVideoHtml(url) {
    url = location.href;
    var intPos = url.indexOf("=");
    var url = url.substr(intPos + 1);
    mp4 = url + ".mp4";
    webm = url + ".webm";
    ogg = url + ".ogg";
    console.log("mp4 == " + mp4);
    console.log("webm == " + webm);
    console.log("ogg == " + ogg);
    videoHtml = '';
    videoHtml += "<video id='videoActive' style='object-fit: fill' controls='controls' autoplay='autoplay' muted>";
    videoHtml += "<source src=" + mp4 + " type='video/mp4'></source>";
    videoHtml += "<source src=" + ogg + " type='video/ogg'></source>";
    videoHtml += "<source src=" + webm + " type='video/webm'></source>";
    videoHtml += "<p>设备不支持</p>";
    videoHtml += "</video>";
    console.log("videoHtml");
    return videoHtml;
}

// 动态生成video内容
// setVideoHtml(url);
$('#video1').empty().append(setVideoHtml(url));

// datetimelocal部分，默认日期
//默认起始时间
var myDate = new Date(), Y = myDate.getFullYear(), M = myDate.getMonth() + 1, D = myDate.getDate() - 1;
//处理月是一位的情况
if ((M + '').length == 1) {
    M = '0' + (M + '');
}
//处理日是一位的情况
if ((D + '').length == 1) {
    D = '0' + (D + '')
}
var startDay = Y + '-' + M + '-' + D;
// 默认终止时间
myDate = new Date(), Y = myDate.getFullYear(), M = myDate.getMonth() + 1, D = myDate.getDate() - 1 + 1;
if ((M + '').length == 1) {
    M = '0' + (M + '');
}
if ((D + '').length == 1) {
    D = '0' + (D + '')
}
var endDay = Y + '-' + M + '-' + D;

myDate = new Date(), Y = myDate.getFullYear(), M = myDate.getMonth() + 1, D = myDate.getDate();
var tempDate = checkDateTime(M, D);
M = tempDate[0], D = tempDate[1];
var curDay = Y + '-' + M + '-' + D;

// console.log(curDay);
$('#searchBegin').val(startDay + 'T00:00');
$('#searchEnd').val(endDay + 'T00:00');
$('.searchDateTime').val(curDay + 'T00:00');

// 设置前flag天的时间

function checkDateTime(M, D) {
    if (D < 0) {
        if (M == "1" || M == "3" || M == "5" || M == "7" || M == "8" || M == "10" || M == "12") {
            D = 31 - 6;
        }
        else if (M == 2) {
            if (M % 4 == 0 && M % 100 != 0)
                D = 29 - 6;
            else
                D = 28 - 6;
        }
        else
            D = 30 - 6;
        M -= 1;
        if (M < 0) {
            M = 12;
            Y -= 1;
        }
    }
    if ((M + '').length == 1) {
        M = '0' + (M + '');
    }
    if ((D + '').length == 1) {
        D = '0' + (D + '')
    }
    return [M, D];
}

function setDatetimeLocal(flag) {
    if (flag >= 0 && flag != 7) {
        myDate = new Date(), Y = myDate.getFullYear(), M = myDate.getMonth() + 1, D = myDate.getDate() - flag;
        var tempDate = checkDateTime(M, D);
        M = tempDate[0], D = tempDate[1];
        var startDay = Y + '-' + M + '-' + D;
        $('#searchBegin').val(startDay + 'T00:00');
    }
    else if (flag == 7) {
        html = "当前时间:<input id='searchEnd' type='datetime-local'></form>"
        $('.searchFormCharts').html(html);
        $('#searchEnd').val(endDay + 'T00:00');
    }
    else {
        alert("输入日期有误！");
    }
}

// 菜单栏动态伸缩
$('#flexButton').click(function () {
    if ($('#flexButton').hasClass('arrow_carrot-2left_alt2')) {
        $('#flexButton').removeClass('arrow_carrot-2left_alt2');
        $('#flexButton').addClass('arrow_carrot-2right_alt2');
    }
    else if ($('#flexButton').hasClass('arrow_carrot-2right_alt2')) {
        $('#flexButton').removeClass('arrow_carrot-2right_alt2');
        $('#flexButton').addClass('arrow_carrot-2left_alt2');
    }
})