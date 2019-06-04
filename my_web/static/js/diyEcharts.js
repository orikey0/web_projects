
var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};
option = null;
app.title = '堆叠条形图';

len = List.length;
console.log("List == " + List);
var first = List[0];
var second = List[1];
var third = List[2];
cnt = 0;
option = {
    // 鼠标在图表上时显示的数据
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['正常人数']
    },
    grid: {
        left: '%',
        right: '%',
        bottom: '%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        // mininterval: 1,
        // maxinterval: 1,
        interval: 1  
    },
    yAxis: {
        type: 'category',
        data: ['摄像头1', '摄像头2', '摄像头3']
    },
    // series:鼠标在图表上时显示的数据
    series: [{
        name: '正常人数',
        type: 'bar',
        stack: '总量',
        barWidth : 50,//柱图宽度
        label: {
            normal: {
                // 图表里的数字
                show: true,
                position: 'insideRight',
                // fontSize: 18
            }
        },
        data: [first,second,third],
        markLine : {
            data : [
                {name:'阈值1', value:'5', xAxis:7}
            ]
        }
    },
    ]
};;

function creatEcharts(){
    option = {
        // 鼠标在图表上时显示的数据
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['正常人数']
        },
        grid: {
            left: '%',
            right: '%',
            bottom: '%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            // mininterval: 1,
            // maxinterval: 1,
            interval: 1  
        },
        yAxis: {
            type: 'category',
            data: ['摄像头1', '摄像头2', '摄像头3']
        },
        // series:鼠标在图表上时显示的数据
        series: [{
            name: '正常人数',
            type: 'bar',
            stack: '总量',
            barWidth : 50,//柱图宽度
            label: {
                normal: {
                    // 图表里的数字
                    show: true,
                    position: 'insideRight',
                    // fontSize: 18
                }
            },
            data: [peopleNum[0], peopleNum[1], peopleNum[2]],
            markLine : {
                data : [
                    {name:'阈值1', value:'5', xAxis:7, yAxis:13}
                ]
            }
        },
        ]
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
    peopleNum = [first,second,third];
    console.log("Echart: cnt == " + cnt);
    // console.log("f == " + typeof(first));
    console.log("刷新频率为:" + Interval);
    creatEcharts();
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
        // console.log("refreshDiv is work!");
        // for(var i = 0;i<=peopleNum.length;++i){
        //     if (peopleNum[i] > warnLimit[i]){
                map.clearMap();
                setCnt(cnt);
                addMarkers();
                // sub = peopleNum[i] - warnLimit[i];
                // if(sub > 5)
                //     createWarning(2);
                // else if(sub <= 5 && sub >= 0)
                //     createWarning(1);
                // 下一步不可能会运行到，只是放在这看着全而已
                // else if(sub < 0)
                //     createWarning(0);
                // break;
            // }
        // }

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