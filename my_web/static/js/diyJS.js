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
// 播放和暂停
var totalTime = 0;
var currentTime = 0;
var myVideo = document.getElementById('videoActive');


myVideo.addEventListener('loadedmetadata', function () {
    totalTime = myVideo.duration;
})
myVideo.addEventListener('timeupdate', function () {
    currentTime = myVideo.currentTime;
})

function playVideo() {
    if (myVideo.paused) myVideo.play();
}
function pauseVideo() {
    if (myVideo.play) myVideo.pause();
}
function endVideo() {
    myVideo.currentTime = totalTime;
    myVideo.pause();
    // video.play();
}
function playPause() {
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
}

myVideo.onclick = function () {
    if (control.style.visibility == "hidden")
        control.style.visibility = "visible";
    else control.style.visibility = "hidden";
};

myVideo.ondblclick = function () {
    if (myVideo.paused) {
        myVideo.play();
        control.style.visibility = "hidden";
    } else {
        myVideo.pause();
        control.style.visibility = "visible";
    }
    // 阻止js冒泡
    return false;
};
myVideo.onkeyup = function (e) {
    var e = e || window.event;
    if (e.keyCode == 32) {
        if (myVideo.paused) myVideo.play();
        else myVideo.pause();
    }
    return false;
};

// 获取视频时长
$(document).ready(function () {
    $("#videoActive").on(
        "timeupdate",
        function (event) {
            onTrackedVideoFrame(this.currentTime, this.duration);
        });
})

function onTrackedVideoFrame(currentTime, duration) {
    $("#current").text(currentTime);
    $("#duration").text(duration);
}

// 倍速
function getPlaySpeed(){ 
    return myVideo.playbackRate;
	// alert(myVideo.playbackRate);
} 
function setPlaySpeed(speed){ 
    console.log("speed = " + speed);
    var nowSpeed = getPlaySpeed();
    if(speed != 1){
        if (nowSpeed != speed)
            myVideo.playbackRate = speed;
        else
            myVideo.playbackRate = 1;
    }
    else
        myVideo.playbackRate = speed;
} 
