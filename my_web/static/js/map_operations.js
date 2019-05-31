// 调用其他js文件
document.write("<script language=javascript src='/static/js/disJS.js'></script>");

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

var isfirstJump = [true,true,true];
var position = new AMap.LngLat(x, y); // 标准写法

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
// 获取marker位置与正常模式的切换
var getStartLocation = false;
var getEndLocation = false;
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

function setCnt(a){
  cnt = a;
  console.log("map: cnt == " + cnt);
}

// ************************************************************************************
// 生成marker

function addMarkers() {
 
  first = List[cnt*3];
  second = List[cnt*3+1];
  third = List[cnt*3+2];
  peopleNum=[first,second,third];
  console.log("add: cnt == " + cnt);
  console.log("peopleNum == " + peopleNum);
  console.log("warnLimit == " + warnLimit);
  // 生成摄像头marker
  for (var i = 0; i < cLng.length; ++i) {
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
    if (peopleNum[i] >= warnLimit[i] && isfirstJump[i] == true) {
      // 生成警报
      marker.setAnimation("AMAP_ANIMATION_BOUNCE");
      isfirstJump[i] = false;
      createWarning(2);
    }
    else if(peopleNum[i] < warnLimit[i] && isfirstJump[i] == false){
      // 警报消失，重新计数
      isfirstJump[i] = true;
      // removeWarning();
    }
    

    

    // 生成窗体信息变量
    var topic = "摄像头信息";
    var cameraID = "ID-3";
    var info = createCameraString(topic, cameraID, cLng[i], cLat[i]);
    marker.content = info;
    var that = this;
    marker.on('click', function (e) {
      if (getStartLocation == false && getEndLocation == false){
        markerClick(e);
        this.setAnimation("AMAP_ANIMATION_NONE");
        console.log("i == " + that.i);
        // 对象内调用自己的属性
        // 正常情况下点击marker是打不开此部分的
        // 用flag的话目前做不到针对每个marker分别取值
        // createWarning(1);
      }
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
          createRoute();
        }
      }
    });
    marker.on('dblclick', open_video);
    // 地图上标记完后存入队列
    camera_markers.push(marker);
  }

  //安保markers
  for (var i = 0; i < sLng.length; ++i) {
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
    // console.log('security == \n' + marker);
  }
  // console.log("生成一次markers");
 
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
function open_video(e) {
  e = e || window.event;
  // console.log("vidoeNum == ");
  //  var status = e.target.getPosition();
  window.location.href = "/videoView";
}

Interval = 10000;
function refreshMarkers() {
  map.clearMap();
  addMarkers();
  // console.log("clear once!");
}

// 刷新生成marker
// self.setInterval("refreshMarkers()", Interval);
