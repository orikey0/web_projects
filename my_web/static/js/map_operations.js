var x = 120.11934041976929; //经度
var y = 36.001618315221194; //纬度
var Lng = [120.11934041976929, 120.12934041976929, 120.13934041976929];
var Lat = [36.001618315221194, 36.001618315221194, 36.001618315221194];
// 安保人员坐标列表
var sLng = [120.12934041976929, 120.10935041976929, 120.12534041976929];
var sLat = [36.000018315221194, 36.000015315221194, 36.002618315221194];
// 摄像头坐标列表
var cLng = [120.13434041976929, 120.13534041976929, 120.13034041976929];
var cLat = [36.002218315221194, 36.003518315221194, 36.004018315221194];

var first = List[0];
var second = List[1];
var third = List[2];

var peopleNum = [first,second,third];

var isJump = [false,false,false];
var position = new AMap.LngLat(x, y); // 标准写法

var urls = ["/static/test4", "/static/test2", "/static/test5"];

var cnt = 0;
//标志位

//窗体信息
var infoWindow = new AMap.InfoWindow({
  offset: new AMap.Pixel(5, -20)
});

// 添加与删除标记
var people_markers = [];
var security_markers = [];
var camera_markers = [];

// ************************************************************************************
// 地图初始化及载入插件
var map = new AMap.Map("mapContainer");
map.setCenter(position);
map.setZoom(15);

map.plugin(["AMap.ToolBar"], function () {
  var tool = new AMap.ToolBar();
  map.addControl(tool);
});
// 生成驾车路线
var startLngLat;
var endLngLat;
var driving;

function searchRoute() {
  getStartLocation = true;
}
// function createRoute(startLngLat = [x, y], endLngLat = [Lng[2], Lat[2]])

function clearRoute(){
  if(driving){
    // console.log("clear old driving");
    driving.clear();
  }
}

function createRoute() {
  AMap.plugin(["AMap.Driving"], function () {
    var drivingOption = {
      policy: AMap.DrivingPolicy.LEAST_TIME,
      map: map
    };
    clearRoute();
    driving = new AMap.Driving(
      drivingOption,
    ); //构造驾车导航类
    //driving 为全局变量，也只有设为全局变量才能存储每次的路径规划结果，才能调用clear()函
    //根据起终点坐标规划驾车路线
    driving.search(startLngLat.getPosition(), endLngLat.getPosition(), function (status, result) {
    });
  });
}

// ************************************************************************************
// 生成marker
function addMarkers() {
  // 生成摄像头marker
  for (var j = 0; j < cLng.length; ++j) {
    (function (i) {
      var status = [cLng[i], cLat[i]];//坐标
      var marker = new AMap.Marker({
        map: map,
        position: status,
        icon: new AMap.Icon({
          image: "/static/img/redMarker.png",
          size: new AMap.Size(30, 35), //图标大小
          imageSize: new AMap.Size(30, 35),
        }),
      });
      if (peopleNum[i] >= warnLimit[i]) {
        isJump[i] = true;
      }
      if (isJump[i] == true) {
        // 生成警报
        marker.setAnimation("AMAP_ANIMATION_BOUNCE");
      }


      // 生成窗体信息变量
      var topic = "摄像头信息";
      var cameraID = "ID-3";
      var info = createCameraString(topic, cameraID, cLng[i], cLat[i]);
      marker.content = info;

      var url = urls[i];
      console.log("urls = " + url);

      var that = this;
      marker.on('click', function (e) {
        // 显示信息窗体
        markerClick(e);
        // marker停止跳动
        isJump[i] = false;
        this.setAnimation("AMAP_ANIMATION_NONE");
        // 创建轮播插件中告警信息页
        createContent(i);
        createWarning(i);
        // 点击marker跳转至Swiper
        jumpToSwiper(e, 2);
      });

      // 右键菜单
      marker.on('rightclick', function (e) {
        //创建右键菜单
        var contextMenu = new AMap.ContextMenu();
        // 摄像头添加右键菜单内容
        contextMenu.addItem("实时视频", function (e) {
          console.log("this marker's url == " + url);
          open_video(e, url);
        }, 0);
        contextMenu.addItem("解决方案", function () {
          if (peopleNum[i] >= warnLimit[i]) {
            startLngLat = e.target;
            console.log(startLngLat);
            endLngLat = security_markers.pop();
            createRoute();
          }
          else {
            alert("无告警情况产生!");
          }
        }, 1);
        contextMenu.addItem("清除路径", function () {
          clearRoute()
        }, 2);
        contextMenu.open(map, e.lnglat);
      });
      // 地图上标记完后存入队列
      camera_markers.push(marker);
    })(j);
  }

  for (var j = 0; j < sLng.length; ++j) {
    (function (i) {
      var status = [sLng[i], sLat[i]];//坐标
      var marker = new AMap.Marker({
        map: map,
        position: status,
        icon: new AMap.Icon({
          image: "/static/img/blueMarker.png",
          size: new AMap.Size(30, 35), //图标大小
          imageSize: new AMap.Size(30, 35)
        })
      });
      // 生成窗体信息变量
      var topic = "安保信息";
      var name = capNames[i];
      var teamID = teamIDs[i];
      marker.on('click', function (e) {
        markerClick(e);
        createContent(i + 3);
        createWarning(i + 3);
        jumpToSwiper(e, 1);
      });
      var info = createSecurityString(topic, name, teamID, sLng[i], sLat[i]);
      marker.content = info;
      // 地图上标记完后存入队列
      security_markers.push(marker);
    })(j);
  }

}

function markerClick(e) {
  e = e || window.event;
  infoWindow.setContent(e.target.content);//必须要用setContent方法
  var status = e.target.getPosition();
  // console.log("status == " + status);
  map.panTo(status);
  infoWindow.open(map, status);
  // console.log("info open");
  // sliderTo(2,1000,false);
}
function infoClose() {
  infoWindow.close();
}

// 生成信息窗体内容
function createPeopleString(topic, cameraID, num, Lng, Lat) {
  var infoString = "<div id=\"containerInfoWindow\" ><b>" + topic + "</b></br>" + "摄像头型号 : " + cameraID + "</br>人头总数 : " + num + "</br>经纬度 : (" + Lng + " , " + Lat + ")" + "</br>地点信息 : 山东科技大学</div>";
  // console.log(typeof infoString + "\n" + infoString);
  return infoString;
}
function createSecurityString(topic, capName, teamID, Lng, Lat) {
  var infoString = "<div id=\"containerInfoWindow\" ><b>" + topic + "</b></br>" + "负责人姓名 : " + capName + "</br>小队编号 : " + teamID + "</br>经纬度 : (" + Lng + " , " + Lat + ")" + "</br>地点信息 : 山东科技大学</div>";
  // console.log(typeof infoString + "\n" + infoString);
  return infoString;
}
function createCameraString(topic, cameraID, Lng, Lat) {
  var infoString = "<div id=\"containerInfoWindow\" ><b>" + topic + "</b></br>" + "摄像头编号 : " + cameraID + "</br>经纬度 : (" + Lng + " , " + Lat + ")" + "</br>地点信息 : 山东科技大学</div>";
  // console.log(typeof infoString + "\n" + infoString);
  return infoString;
}

// 移除marker
function remove_marker(flag) {
  var deletemarker;
  if (flag == 0) {
    deletemarker = people_markers.pop();
  }
  else if (flag == 1) {
    deletemarker = security_markers.pop();
  }
  else if (flag == 2) {
    deletemarker = camera_markers.pop();
  }
  map.remove(deletemarker);
}
// 不能带参数，带参数就会自动调用
function open_video(e, url) {
  e = e || window.event;
  console.log("map,url == " + url);
  location = "/videoView?url=" + url;
}

Interval = 10000;
function refreshMarkers() {
  // 刷新摄像头
  for (i = 0; i < camera_markers.length; ++i) {
    var temp_marker = camera_markers[i];
    if (peopleNum[i] > warnLimit[i]) {
      isJump[i] = true;
      temp_marker.setAnimation("AMAP_ANIMATION_BOUNCE");
    }
  }
  // map.clearMap();
  // addMarkers();
  // console.log("clear once!");
}

// 点击marker，Swiper跳转至第三页
function jumpToSwiper(e, flag) {
  var mySwiper = new Swiper('.swiper-container', {
    /*启动动态检查器，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。*/
    observer: true,
    /*将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新。*/
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 30,
    // loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  mySwiper.slideTo(flag, 1000, false);//切换到第一个slide，速度为1秒
}
