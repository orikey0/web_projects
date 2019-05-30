var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '堆叠条形图';
var List = [6,9,8,5,4,3,5,2,1]
len = List.length;
console.log("List == " + List);
var first = List[0];
var second = List[1];
var third = List[2];
cnt = 0;
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
        data: [first,second,third]
    },]
};;

function creatEcharts(){
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
            data: [first, second, third]
        },]
    };;
}



if (option && typeof option === "object") {
    myChart.setOption(option, true);
    console.log("refreshDiv is work!");
}

function refreshDiv() {
    cnt = (cnt+1)%3;
    first = List[cnt*3];
    second = List[cnt*3+1];
    third = List[cnt*3+2];
    // console.log("f == " + typeof(first));
    console.log("刷新频率为:" + Interval);
    creatEcharts();
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        // console.log("refreshDiv is work!");
    }
    // console.log("run here");
}


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