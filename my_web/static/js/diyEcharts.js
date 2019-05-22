// document.write("<script language=javascript src='js/disJS.js'></script>");
document.write("<script language=javascript src='js/map_operations.js'></script>");

var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '堆叠条形图';

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['正常人数', '警戒人数']
    },
    grid: {
        left: '%',
        right: '%',
        bottom: '%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['摄像头1', '摄像头2', '摄像头3']
    },
    series: [{
        name: '正常人数',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [peopleNum[0], peopleNum[1], peopleNum[2]]
    },
    ]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
    // console.log("图表初始化!");
}
function refreshDiv() {
    // console.log("刷新频率为:" + Interval);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        for(var i = 0;i<=peopleNum.length;++i){
            if (peopleNum[i] > warnLimit[i]){
                map.clearMap();
                addMarkers();
                sub = peopleNum[i] - warnLimit[i];
                if(sub > 5)
                    createWarning(2);
                else if(sub <= 5 && sub >= 0)
                    createWarning(1);
                // 下一步不可能会运行到，只是放在这看着全而已
                else if(sub < 0)
                    createWarning(0);
                break;
            }
        }
    }
    // console.log("run here");
}

var Interval = 10000;
function setTime() {
    var temp = $("input[name='refreshTime']:checked").val();
    // .val返回value; .val(value)设置value;
    if(Interval != temp){
        Interval = temp;
        clearInterval(set1);
        set1 = self.setInterval("refreshDiv()", Interval);
    }
}
var set1 = self.setInterval("refreshDiv()", Interval);
self.setInterval("setTime()",1000);
