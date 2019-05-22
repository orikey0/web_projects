var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};

option01 = {
    title : {
        text: '告警类型分析',
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
            radius : [20, 110],
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
            center : ['80%', '50%'],
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
            radius : [20, 110],
            center : ['50%', '50%'],
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
                    // {type : 'average', name: '平均值'}
                    {name:'阈值1', value:'13', xAxis:7, yAxis:13}
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
                    {name:'阈值1', value:'10', xAxis:7, yAxis:10}
                    // {type : 'average', name : '平均值'}
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
                    {
                        yAxis: 6
                    }
                ]
            }
        }
    ]
};

var dataMap = {};
function dataFormatter(obj) {
    var pList = ['04-01','04-02','04-03','04-04','04-05','04-06','04-07','04-08','04-09','04-10','04-11','04-12','04-13','04-14','04-15','04-16','04-17','04-18','04-19','04-20','04-21','04-22','04-23','04-24','04-25','04-26','04-27','04-28','04-29','04-30'];
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

dataMap.dataPI = dataFormatter({
    //max : 4000,
    1:[136.27,159.72,2905.73,641.42,1306.3,1915.57,1277.44,1701.5,124.94,3064.78,1583.04,2015.31,1612.24,1391.07,3973.85,3512.24,2569.3,2768.03,2665.2,2047.23,659.23,844.52,2983.51,726.22,1411.01,74.47,1220.9,678.75,155.08,184.14],
    2:[124.36,145.58,2562.81,554.48,1095.28,1631.08,1050.15,1302.9,114.15,2540.1,1360.56,1729.02,1363.67,1206.98,3588.28,3258.09,2147,2325.5,2286.98,1675.06,539.83,685.38,2482.89,625.03,1108.38,68.72,988.45,599.28,134.92,159.29],
    3:[118.29,128.85,2207.34,477.59,929.6,1414.9,980.57,1154.33,113.82,2261.86,1163.08,1495.45,1182.74,1098.66,3226.64,2769.05,1795.9,1969.69,2010.27,1458.49,462.19,606.8,2240.61,550.27,1067.6,63.88,789.64,497.05,107.4,127.25],
});

dataMap.dataSI = dataFormatter({
    //max : 26600,
    1:[3752.48,5928.32,13126.86,6635.26,8037.69,12152.15,5611.48,5962.41,7927.89,25203.28,16555.58,8309.38,9069.2,6390.55,24017.11,15427.08,9815.94,9361.99,26447.38,5675.32,714.5,5543.04,11029.13,2194.33,3780.32,208.79,6935.59,2377.83,975.18,1056.15],
    2:[3388.38,4840.23,10707.68,5234,6367.69,9976.82,4506.31,5025.15,7218.32,21753.93,14297.93,6436.62,7522.83,5122.88,21238.49,13226.38,7767.24,7343.19,23014.53,4511.68,571,4359.12,8672.18,1800.06,3223.49,163.92,5446.1,1984.97,744.63,827.91],
    3:[2855.55,3987.84,8959.83,3993.8,5114,7906.34,3541.92,4060.72,6001.78,18566.37,11908.49,4905.22,6005.3,3919.45,18901.83,11010.5,6038.08,5687.19,19419.7,3381.54,443.43,3448.77,6711.87,1476.62,2582.53,136.63,4236.42,1527.24,575.33,662.32],
});

dataMap.dataTI = dataFormatter({
    //max : 25000,
    1:[12363.18,5219.24,8483.17,3960.87,5015.89,8158.98,3679.91,4918.09,11142.86,20842.21,14180.23,4975.96,6878.74,3921.2,17370.89,7991.72,7247.02,7539.54,24097.7,3998.33,1148.93,3623.81,7014.04,2781.29,3701.79,322.57,4355.81,1963.79,540.18,861.92],
    2:[10600.84,4238.65,7123.77,3412.38,4209.03,6849.37,3111.12,4040.55,9833.51,17131.45,12063.82,4193.69,5850.62,3121.4,14343.14,6607.89,6053.37,6369.27,20711.55,3383.11,953.67,2881.08,6030.41,2177.07,2892.31,274.82,3688.93,1536.5,470.88,702.45],
    3:[9179.19,3405.16,6068.31,2886.92,3696.65,5891.25,2756.26,3371.95,8930.85,13629.07,9918.78,3662.15,5048.49,2637.07,11768.18,5700.91,5127.12,5402.81,18052.59,2919.13,748.59,2474.44,5198.8,1885.79,2519.62,240.85,3143.74,1363.27,398.54,563.74],
});



option03 = {
    // 底下那个栏
    baseOption: {
        timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 1000,
            data: [
                '04-01','04-02','04-03',
                {
                    value: '04-03',
                    tooltip: {
                        formatter: '{b} 文字测试-这天人好多'
                    },
                    symbol: 'diamond',
                    symbolSize: 16
                },
                '04-04', '04-05','04-06','04-07','04-08',
                {
                    value: '04-08',
                    tooltip: {
                        formatter: function (params) {
                            return params.name + '好多好多好多人';
                        }
                    },
                    symbol: 'diamond',
                    symbolSize: 18
                },
            ],
            // 年份
            // label: {
            //     formatter : function(s) {
            //         return (new Date(s)).getFullYear();
            //     }
            // }
        },
        title: {
            subtext: '30天内人流趋势'
        },
        tooltip: {
        },
        // 右上选择标签
        legend: {
            x: 'right',
            // data: ['第一产业', '第二产业', '第三产业', 'GDP', '金融', '房地产'],
            data:['摄像头01', '摄像头02', '摄像头03'],
            // selected: {
            //     'GDP': false, '金融': false, '房地产': false
            // }
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
                    '04-01','\n04-02','04-03','\n04-04','04-05','\n04-06','04-07','\n04-08',
                    '04-09','\n04-10','04-11','\n04-12','04-13','\n04-14','04-15','\n04-16',
                    '04-17','\n04-18','04-19','\n04-20','04-21','\n04-22','04-23','\n04-24',
                    '04-25','\n04-26','04-27','\n04-28','04-29','\n04-30'
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
            // {name: 'GDP', type: 'bar'},
            // {name: '金融', type: 'bar'},
            // {name: '房地产', type: 'bar'},
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
            title: {text: '人流趋势图'},
            series: [
                // {data: dataMap.dataGDP['摄像头01']},
                // {data: dataMap.dataFinancial['摄像头01']},
                // {data: dataMap.dataEstate['摄像头01']},
                {data: dataMap.dataPI['1']},
                {data: dataMap.dataSI['1']},
                {data: dataMap.dataTI['1']},
                // 右上角扇形
                // {data: [
                //     {name: '第一产业', value: dataMap.dataPI['摄像头01sum']},
                //     {name: '第二产业', value: dataMap.dataSI['摄像头01sum']},
                //     {name: '第三产业', value: dataMap.dataTI['摄像头01sum']}
                // ]}
            ]
        },
        {
            title: {text: '人流趋势图'},
            series: [
                {data: dataMap.dataPI['2']},
                {data: dataMap.dataSI['2']},
                {data: dataMap.dataTI['2']},
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

