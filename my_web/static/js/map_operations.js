// 调用其他js文件
// document.write("<script language=javascript src='/js/diySwiper.js>'</script>");

var x = 120.11934041976929; //经度
var y = 36.001618315221194; //纬度
var Lng = [120.11934041976929, 120.12934041976929, 120.13934041976929];
var Lat = [36.001618315221194, 36.001618315221194, 36.001618315221194];
// 安保人员坐标列表
var sLng = [120.12934041976929, 120.10935041976929, 120.12534041976929];
var sLat = [36.000018315221194, 36.000015315221194, 36.002618315221194];
// 摄像头坐标列表
var cLng = COO_x;
var cLat = COO_y;
var warn_num = COO_warn;
var num = [1, 2, 3];
var videoNum = [11, 22, 33];

var position = new AMap.LngLat(x, y); // 标准写法

//窗体信息
var infoWindow = new AMap.InfoWindow({
  // isCustom: true,  //使用自定义窗体
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
// 获取marker位置与正常模式的切换
var getStartLocation = false;
var getEndLocation = false;
function searchRoute() {
  getStartLocation = true;
}
// function createRoute(startLngLat = [x, y], endLngLat = [Lng[2], Lat[2]])

function clearRoute(){
  if(driving){
    console.log("clear old driving");
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
//添加超阈值点
function add_people_marker() {

  // 将创建的点标记添加到已有的地图实例：
  for (var i = 0; i < Lng.length; ++i) {
    var status = [Lng[i], Lat[i]];//坐标
    // var limit = 60;
    // var peopleNum = 50;
    var marker = new AMap.Marker({
      map: map,
      position: status,
      icon: new AMap.Icon({
        image: "../Beta0.91/img/redMarker.png",
        size: new AMap.Size(20, 25), //图标大小
        imageSize: new AMap.Size(20, 25)
      }),
    });
    // 生成窗体信息变量
    var topic = "预警信息";
    var cameraID = "CXK_RIP";
    // var num = 228;
    marker.on('mouseover', function (e) {
      markerClick(e);
      this.setAnimation("AMAP_ANIMATION_NONE");
    });
    // marker.on('mouseout',infoClose);
    // marker.emit('click', {target: marker});
    var info = createPeopleString(topic, cameraID, num[i], Lng[i], Lat[i]);
    marker.content = info;
    marker.on('click', open_video);
    // 地图上标记完后存入队列
    people_markers.push(marker);
    // marker跳动
    // if peopleNum >= limit{
    marker.setAnimation("AMAP_ANIMATION_BOUNCE");
    // }

    console.log('marker == \n' + marker);
  }
}

// 生成marker
function addMarkers() {
  // 生成摄像头marker
  for (var i = 0; i < Lng.length; ++i) {
    var status = [Lng[i], Lat[i]];//坐标

    // var isfirstOpenWindow = true;
    var marker = new AMap.Marker({
      map: map,
      position: status,
      icon: new AMap.Icon({
        image: "/static/img/redMarker.png",
        size: new AMap.Size(30, 35), //图标大小
        imageSize: new AMap.Size(30, 35),
      }),
    });
    // 生成窗体信息变量
    var topic = "摄像头信息";
    var cameraID = "ID-3";
    // if(isfirstOpenWindow == true){
    // marker.on('mouseover', function (e) {
    //   markerClick(e);
    //   this.setAnimation("AMAP_ANIMATION_NONE");
    //   // isfirstOpenWindow = false;
    // });
    // }
    // marker.setAnimation("AMAP_ANIMATION_BOUNCE");
    var info = createCameraString(topic, cameraID, sLng[i], sLat[i]);
    marker.content = info;
    marker.on('click', function (e) {
      if (getStartLocation == false && getEndLocation == false)
        markerClick(e);
      // 获取生成路径的起始点和终点的坐标
      else {
        if (getStartLocation == true) {
          startLngLat = e.target;
          getStartLocation = false;
          getEndLocation = true;
          startLngLat.setAnimation("AMAP_ANIMATION_BOUNCE");
        }
        else if (getEndLocation == true) {
          endLngLat = e.target;
          getEndLocation = false;
          startLngLat.setAnimation("AMAP_ANIMATION_NONE");
          // 两个点都获取到了，开始生成路径
          createRoute();
        }
      }
    });
    marker.on('dblclick', open_video);
    // 地图上标记完后存入队列
    camera_markers.push(marker);
    console.log('camera == \n' + marker);
  }

  //安保markers
  for (var i = 0; i < Lng.length; ++i) {
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
    var capName = "邓艾";
    var teamID = 228;
    marker.on('click', function (e) {
      if (getStartLocation == false && getEndLocation == false)
        markerClick(e);
      // 获取生成路径的起始点和终点的坐标
      else {
        if (getStartLocation == true) {
          startLngLat = e.target;
          getStartLocation = false;
          getEndLocation = true;
          startLngLat.setAnimation("AMAP_ANIMATION_BOUNCE");
        }
        else if (getEndLocation == true) {
          endLngLat = e.target;
          getEndLocation = false;
          startLngLat.setAnimation("AMAP_ANIMATION_NONE");
          // 两个点都获取到了，开始生成路径
          createRoute();
        }
      }
    });
    var info = createSecurityString(topic, capName, teamID, sLng[i], sLat[i]);
    marker.content = info;
    // marker.on('click', open_securityPage);
    // 地图上标记完后存入队列
    security_markers.push(marker);
    console.log('security == \n' + marker);
  }
  console.log("生成一次markers");
}

function markerClick(e) {
  e = e || window.event;
  infoWindow.setContent(e.target.content);//必须要用setContent方法
  var status = e.target.getPosition();
  // console.log("status == " + status);
  map.panTo(status);
  infoWindow.open(map, status);
  console.log("info open");
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
function open_video(e) {
  e = e || window.event;
  console.log("vidoeNum == ");
  //  var status = e.target.getPosition();
  window.location = "videoView.html";
}

Interval = 10000;
function refreshMarkers() {
  map.clearMap();
  addMarkers();
  console.log("clear once!");
}

// 刷新生成marker
self.setInterval("refreshMarkers()", Interval);
