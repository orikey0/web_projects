var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
// var _zr = myChart.getZr();
// ShowObjProperty(_zr);
//     _zr.add(new echarts.graphic.Text({
//      style: {            
//    x: _zr.getWidth() / 2,
//    y: _zr.getHeight() / 2,
//    color: '#666', 
//    text: '集团重大风险',
//    textAlign: 'center', 
//    textFont : 'bold 20px verdana'
//    }}  
//     ));
var app = {};

option01 = {
    title : {
        text: '异常事件占比',
        // subtext: '纯属虚构',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['快速移动','人群拥挤','人数超限']
    },
    calculable : true,
    series : [
        {
            name:'摄像头1',
            type:'pie',
            radius : [30, 110],
            // center->[x and y]
            center : ['20%', '50%'],
            roseType : 'radius',
            data:[
                {value:10, name:'快速移动'},
                {value:5, name:'人群拥挤'},
                {value:15, name:'人数超限'},
            ]
        },
        {
            name:'摄像头2',
            type:'pie',
            radius : [30, 110],
            center : ['50%', '50%'],
            roseType : 'area',
            data:[
                {value:10, name:'快速移动'},
                {value:5, name:'人群拥挤'},
                {value:15, name:'人数超限'},
            ]
        },
        {
            name:'摄像头3',
            type:'pie',
            radius : [30, 110],
            center : ['80%', '50%'],
            roseType : 'radius',
            data:[
                {value:5, name:'快速移动'},
                {value:8, name:'人群拥挤'},
                {value:2, name:'人数超限'},
            ]
        }
    ]
};


option02 = {
    title : {
        text: '人流量趋势图',
        x: 'center',
        align: 'right'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['摄像头1','摄像头2','摄像头3'],
        x:'right'
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'摄像头1',
            // 此处改变折线图和柱状图
            type:'line',
            data:[2.0, 5.0, 7.0, 3.0, 5.0, 6.0, 10.0, 10.0, 3.0, 0.0, 6.0, 3.0, 2.0, 5.0, 9.0, 6.0, 8.0, 7.0, 17.0, 10.0, 8.0, 8.0, 6.0, 2.0],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    // 横向图表不需要xAxis, yAxis决定标记线的位置
                    // {type : 'average', name: '平均值'}
                    // {name:'阈值1', value:'13', xAxis:7, yAxis:13}
                    {name:'阈值1', value:'13', yAxis:13}
                ]
            }
        },
        {
            name:'摄像头2',
            type:'line',
            data:[4.0, 4.0, 2.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0, 5.0, 3.0, 4.0, 1.0, 3.0, 6.0, 12.0, 8.0, 5.0, 2.0, 2.0, 2.0],
            markPoint : {
                data : [
                    // {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
                    // {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {name:'阈值2', value:'10', yAxis:10}
                ]
            }
        },
        {
            name:'摄像头3',
            type:'line',
            data:[0.0, 2.0, 1.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0, 0.0, 2.0, 1.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0],
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                // silent: true,
                data : [
                    {name:'阈值3', value:'6', yAxis:6}
                ]
            }
        }
    ]
};

var dataMap = {};
function dataFormatter(obj) {
    var pList = ['0时','1时','2时','3时','4时','5时','6时','7时','8时','9时','10时','11时','12时','13时','14时','15时','16时','17时','18时','19时','20时','21时','22时','23时'];
    var temp;
    for (var day = 01; day <= 03; day++) {
        var max = 0;
        var sum = 0;
        temp = obj[day];
        for (var i = 0, l = temp.length; i < l; i++) {
            max = Math.max(max, temp[i]);
            sum += temp[i];
            obj[day][i] = {
                name : pList[i],
                value : temp[i]
            }
        }
        obj[day + 'max'] = Math.floor(max / 100) * 100;
        obj[day + 'sum'] = sum;
    }
    // console.log(obj);
    return obj;
}

// 摄像头1
dataMap.dataPI = dataFormatter({
    1:[7, 9, 3, 10, 6, 1, 3, 9, 7, 6, 6, 8, 6, 6, 6, 1, 6, 5, 0, 1, 10, 0, 8, 8],
    2:[1, 2, 5, 9, 10, 4, 4, 7, 5, 3, 6, 1, 5, 6, 1, 8, 10, 5, 5, 8, 2, 8, 3, 4],
    3:[6, 8, 1, 5, 1, 6, 5, 7, 7, 10, 3, 1, 1, 2, 8, 5, 9, 3, 0, 10, 7, 1, 7, 10],
    4:[0, 10, 5, 4, 3, 6, 4, 1, 3, 4, 1, 5, 5, 10, 10, 2, 3, 2, 1, 8, 2, 5, 4, 2],
    5:[5, 8, 9, 6, 2, 1, 1, 7, 2, 2, 5, 4, 7, 5, 5, 9, 5, 10, 3, 5, 6, 3, 0, 10],
    6:[1, 4, 5, 5, 4, 4, 8, 7, 0, 2, 1, 0, 4, 6, 3, 6, 6, 2, 0, 1, 7, 3, 2, 8],
    7:[3, 0, 8, 7, 1, 0, 4, 9, 2, 9, 6, 2, 8, 4, 3, 8, 3, 10, 5, 10, 10, 6, 2, 0],

});
// 摄像头2
dataMap.dataSI = dataFormatter({
    1:[5, 9, 10, 8, 4, 5, 6, 5, 3, 5, 7, 6, 6, 2, 2, 0, 1, 5, 8, 7, 3, 4, 3, 0],
    2:[9, 9, 9, 3, 9, 5, 3, 8, 9, 2, 6, 3, 9, 2, 2, 8, 10, 7, 9, 5, 2, 5, 3, 10],
    3:[0, 4, 3, 9, 5, 9, 0, 2, 4, 3, 5, 5, 8, 5, 4, 4, 3, 0, 5, 9, 5, 2, 4, 10],
    4:[2, 10, 2, 4, 3, 10, 6, 9, 10, 5, 5, 9, 3, 2, 10, 3, 4, 8, 9, 7, 3, 8, 5, 7],
    5:[2, 3, 9, 8, 7, 1, 2, 8, 7, 1, 9, 5, 7, 7, 4, 1, 10, 2, 3, 9, 9, 5, 1, 5],
    6:[5, 0, 1, 3, 3, 9, 1, 7, 10, 3, 10, 7, 4, 0, 3, 8, 1, 6, 7, 6, 8, 3, 10, 3],
    7:[2, 5, 2, 5, 2, 4, 1, 4, 1, 8, 2, 8, 3, 2, 4, 2, 7, 7, 8, 10, 10, 2, 7, 10],
    
});
// 摄像头3
dataMap.dataTI = dataFormatter({
    1:[9, 7, 7, 3, 0, 3, 1, 0, 8, 3, 5, 8, 9, 9, 7, 6, 2, 10, 0, 9, 4, 1, 5, 3],
    2:[9, 5, 9, 10, 7, 2, 8, 3, 6, 3, 7, 2, 9, 7, 1, 10, 6, 6, 8, 10, 1, 10, 0, 5],
    3:[1, 2, 5, 10, 3, 5, 0, 0, 0, 5, 1, 5, 7, 6, 5, 10, 9, 5, 5, 1, 4, 8, 4, 9],
    4:[4, 10, 7, 7, 9, 9, 10, 10, 9, 8, 7, 4, 2, 8, 1, 6, 9, 1, 7, 8, 4, 1, 10, 9],
    5:[5, 5, 6, 2, 10, 2, 8, 9, 5, 1, 5, 7, 1, 8, 10, 10, 5, 3, 8, 2, 1, 8, 10, 7],
    6:[2, 6, 8, 4, 6, 5, 6, 9, 7, 7, 10, 2, 5, 4, 9, 3, 5, 9, 0, 5, 6, 0, 8, 6],
    7:[10, 1, 1, 4, 4, 4, 7, 9, 5, 3, 5, 7, 10, 1, 2, 2, 6, 9, 2, 5, 1, 2, 5, 4],
});



option03 = {
    // 底下那个栏
    baseOption: {
        timeline: {
            axisType: 'category',
            // autoPlay: true,
            // 展示停留时长
            playInterval: 1000,
            data: [
                '04-01','04-02','04-03',
                // {
                //     value: '04-03',
                //     tooltip: {
                //         formatter: '{b} 文字测试-这天人好多'
                //     },
                //     symbol: 'diamond',
                //     symbolSize: 16
                // },
                '04-04', '04-05','04-06','04-07',
                // {
                //     value: '04-08',
                //     tooltip: {
                //         formatter: function (params) {
                //             return params.name + '好多好多好多人';
                //         }
                //     },
                //     symbol: 'diamond',
                //     symbolSize: 18
                // },
            ],
        },
        title: {
            subtext: '24小时预警次数'
        },
        tooltip: {
        },
        // 右上选择标签
        legend: {
            x: 'right',
            data:['摄像头01', '摄像头02', '摄像头03'],
        },
        calculable : true,
        grid: {
            top: 80,
            bottom: 100,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true,
                        formatter: function (params) {
                            return params.value.replace('\n', '');
                        }
                    }
                }
            }
        },
        xAxis: [
            {
                'type':'category',
                'axisLabel':{'interval':0},
                'data':[
                    '0时','\n1时','\n2时','\n3时','\n4时','\n5时',
                    '6时','\n7时','\n8时','\n9时','\n10时','\n11时',
                    '12时','\n13时','\n14时','\n15时','\n16时','\n17时',
                    '18时','\n19时','\n20时','\n21时','\n22时','\n23时'
                ],
                splitLine: {show: false}
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '人次'
            }
        ],
        // 右上角扇形
        series: [
            {name: '摄像头01', type: 'bar'},
            {name: '摄像头02', type: 'bar'},
            {name: '摄像头03', type: 'bar'},
            {
                name: '人流量占比',
                type: 'pie',
                center: ['75%', '35%'],
                radius: '28%',
                z: 100
            }
        ]
    },
    options: [
        {
            title: {text: '4月1日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['1']},
                {data: dataMap.dataSI['1']},
                {data: dataMap.dataTI['1']},
                // 右上角扇形
                // {data: [
                    // {name: '摄像头01', value: dataMap.dataPI['摄像头01sum']},
                    // {name: '摄像头02', value: dataMap.dataSI['摄像头02sum']},
                    // {name: '摄像头03', value: dataMap.dataTI['摄像头03sum']}
                // ]}
            ]
        },
        {
            title: {text: '4月2日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['2']},
                {data: dataMap.dataSI['2']},
                {data: dataMap.dataTI['2']},
            ]
        },
        {
            title: {text: '4月3日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['3']},
                {data: dataMap.dataSI['3']},
                {data: dataMap.dataTI['3']},
            ]
        },
        {
            title: {text: '4月4日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['4']},
                {data: dataMap.dataSI['4']},
                {data: dataMap.dataTI['4']},
            ]
        },
        {
            title: {text: '4月5日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['5']},
                {data: dataMap.dataSI['5']},
                {data: dataMap.dataTI['5']},
            ]
        },
        {
            title: {text: '4月6日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['6']},
                {data: dataMap.dataSI['6']},
                {data: dataMap.dataTI['6']},
            ]
        },
        {
            title: {text: '4月7日拥堵分析', x:'center'},
            series: [
                {data: dataMap.dataPI['7']},
                {data: dataMap.dataSI['7']},
                {data: dataMap.dataTI['7']},
            ]
        },
    ]
    
};

if (option01 && typeof option01 === "object") {
    myChart.setOption(option01, true);
}

function refreshDiv(flag) {
    // console.log("刷新频率为:" + Interval);
    if (flag == 1 && option01 && typeof option01 === "object") {
        myChart.setOption(option01, true);
    }
    if (flag == 2 && option02 && typeof option02 === "object") {
        myChart.setOption(option02, true);
    }
    if (flag == 3 && option03 && typeof option03 === "object") {
        myChart.setOption(option03, true);
    }
}

