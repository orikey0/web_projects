var x = 120.11934041976929; //经度
var y = 36.001618315221194; //纬度
var Lng = [120.11934041976929, 120.12934041976929, 120.13934041976929];
var Lat = [36.001618315221194, 36.001618315221194, 36.001618315221194];
var num = [1, 2, 3];
var videoNum = [11, 22, 33];

var position = new AMap.LngLat(x, y); // 标准写法

//窗体信息
var infoWindow = new AMap.InfoWindow({
  // isCustom: true,  //使用自定义窗体
  offset: new AMap.Pixel(0, -25)
});

// 添加与删除标记
var people_markers = [];
// ************************************************************************************
// 地图初始化及载入插件
var map = new AMap.Map("mapContainer");
map.setCenter(position);
map.setZoom(15);
map.plugin(["AMap.ToolBar"], function () {
  var tool = new AMap.ToolBar();
  map.addControl(tool);
});
// ************************************************************************************
//添加超阈值点
function add_people_marker() {
  // 将创建的点标记添加到已有的地图实例：
  for (var i = 0; i < Lng.length; ++i) {
    var status = [Lng[i], Lat[i]];//坐标
    var marker = new AMap.Marker({
      map: map,
      position: status,
      icon: new AMap.Icon({
        image: "../Beta0.5/img/icon01_temp.png",
        size: new AMap.Size(20, 25), //图标大小
        imageSize: new AMap.Size(20, 25)
      }),
    });
    // 生成窗体信息变量
    var topic = "预警信息";
    var cameraID = "CXK_RIP";
    // var num = 228;
    marker.on('mouseover',function(e){
        markerClick(e);
        this.setAnimation("AMAP_ANIMATION_NONE");
    });
    // marker.on('mouseout',infoClose);
    // marker.emit('click', {target: marker});
    var info = createString(topic, cameraID, num[i], Lng[i], Lat[i]);
    marker.content = info;
    marker.on('click', open_video);
    // 地图上标记完后存入队列
    people_markers.push(marker);
    // marker跳动
    marker.setAnimation("AMAP_ANIMATION_BOUNCE");
    console.log('marker == \n' + marker);
  }
}

function markerClick(e) {
  e = e || window.event;
  infoWindow.setContent(e.target.content);//必须要用setContent方法
  var status = e.target.getPosition();
  // console.log("status == " + status);
  map.panTo(status);
  infoWindow.open(map, status);
  console.log("info open");
  // marker.setAnimation('AMAP_ANIMATION_BOUNCE');
}
function infoClose() {
  infoWindow.close();
}

// 生成信息窗体内容
function createString(topic, cameraID, num, Lng, Lat) {
  var infoString = "<div id=\"containerInfoWindow\" ><b>" + topic + "</b></br>" + "摄像头型号 : " + cameraID + "</br>人头总数 : " + num + "</br>经纬度 : (" + Lng + " , " + Lat + ")" + "</br>地点信息 : 山东科技大学</div>";
  // console.log(typeof infoString + "\n" + infoString);
  return infoString;
}

function remove_people_marker() {
  var deletemarker = people_markers.pop();
  map.remove(deletemarker);
}
// 不能带参数，带参数就会自动调用
function open_video(e) {
  e = e || window.event;
  console.log("vidoeNum == ");
  //  var status = e.target.getPosition();
  window.location = "videoView.html";
}