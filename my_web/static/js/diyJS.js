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

// document.body.style.overflow = 'hidden';
// function _preventDefault(e) { e.preventDefault(); }
// window.addEventListener('touchmove', _preventDefault);

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

// 数据库操作js
var nowPage = 1;
var start, end;
getData();
function getData() {
    setPage(12);
}
//输出页码
function setPage(pageCount) {
    //var pageCount = data.pageCount;
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
    console.log("start == " + start);
    console.log("end == " + end);
    console.log("nowPage == " + nowPage);
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
$('#textCenter01').on('click', '#pageShow01 span', function () {
    // var $this = $(this); 声明一个变量，$this 是变量名，加$说明是jquery对象。
    // this是document事件
    var $this = $(this);
    console.log("this == " + this);
    // $(this).hasClass('.user') 是判断当前获得的对象'$(this)'是否拥有user这个ClassName，如果有则返回true，如果没有则返回false
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
$('textCenter02').on('click', '#pageShow02 span', function () {
    var $this = $(this);
    // console.log("this == " + $this);
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
    getData();
});
$('textCenter03').on('click', '#pageShow03 span', function () {
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
    getData();
});