var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '堆叠条形图';
var a = 190;
var b = 330;
var c = 410;

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
        data: [a, b, c]
    },]
};;





if (option && typeof option === "object") {
    myChart.setOption(option, true);
    console.log("refreshDiv is work!");
}

function refreshDiv() {
    console.log("刷新频率为:" + Interval);
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        // console.log("refreshDiv is work!");
    }
    // console.log("run here");
}


console.log(list)
var Interval = 3000;

function setTime() {
    var temp = $("input[name='refreshTime']:checked").val();
    // console.log("Interval = " + Interval + " temp == " + temp);
    // .val返回value; .val(value)设置value;
    if (Interval != temp) {
        Interval = temp;
        console.log("after : Interval = " + Interval + " temp == " + temp);
        clearInterval(set1);
        set1 = self.setInterval("refreshDiv()", Interval);
    }
}
var set1 = self.setInterval("refreshDiv()", Interval);
self.setInterval("setTime()", 1000);
