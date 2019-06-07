var dom = document.getElementById("EchartsContainer");
var myChart = echarts.init(dom);
var app = {};

option01 = {
    title: {
        text: '各摄像头告警事件占比统计',
        // subtext: '纯属虚构',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x: 'center',
        y: 'bottom',
        data: ['异常移动', '人群拥挤', '人数超限']
    },
    calculable: true,
    series: [
        {
            name: '摄像头1',
            type: 'pie',
            radius: [30, 110],
            // center->[x and y]
            center: ['18%', '50%'],
            roseType: 'radius',
            data: [
                { value: 10, name: '异常移动10次' },
                { value: 5, name: '人群拥挤5次' },
                { value: 15, name: '人数超限15次' },
            ]
        },
        {
            name: '摄像头2',
            type: 'pie',
            radius: [30, 110],
            center: ['53%', '50%'],
            roseType: 'radius',
            data: [
                { value: 7, name: '异常移动7次' },
                { value: 8, name: '人群拥挤8次' },
                { value: 12, name: '人数超限12次' },
            ]
        },
        {
            name: '摄像头3',
            type: 'pie',
            radius: [30, 110],
            center: ['85%', '50%'],
            roseType: 'radius',
            data: [
                { value: 5, name: '异常移动5次' },
                { value: 8, name: '人群拥挤8次' },
                { value: 2, name: '人数超限2次' },
            ]
        }
    ],
    // color: ['#00c4ff','orange','red']
};


option02 = {
    title: {
        text: '24小时各摄像头人流量趋势图',
        x: 'center',
        align: 'right'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['摄像头1', '摄像头2', '摄像头3'],
        x: 'right'
    },
    calculable: true,
    xAxis: [
        {
            type: 'category',
            data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '人次'
        }
    ],
    series: [
        {
            name: '摄像头1',
            // 此处改变折线图和柱状图
            type: 'line',
            data: [2.0, 5.0, 7.0, 3.0, 5.0, 6.0, 10.0, 10.0, 3.0, 0.0, 6.0, 3.0, 2.0, 5.0, 9.0, 6.0, 8.0, 7.0, 17.0, 10.0, 8.0, 8.0, 6.0, 2.0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { name: '阈值1', value: '13', yAxis: 13 }
                ]
            }
        },
        {
            name: '摄像头2',
            type: 'line',
            data: [4.0, 4.0, 2.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0, 5.0, 3.0, 4.0, 1.0, 3.0, 6.0, 12.0, 8.0, 5.0, 2.0, 2.0, 2.0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { name: '阈值2', value: '10', yAxis: 10 }
                ]
            }
        },
        {
            name: '摄像头3',
            type: 'line',
            data: [0.0, 2.0, 1.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0, 0.0, 2.0, 1.0, 4.0, 7.0, 8.0, 10.0, 11.0, 4.0, 2.0, 9.0, 6.0],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                // silent: true,
                data: [
                    { name: '阈值3', value: '6', yAxis: 6 }
                ]
            }
        }
    ]
};

option03 = {
    tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['摄像头1', '摄像头2', '摄像头3'],
        x: 'right'
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
            interval: 0,
            rotate: 40
        },
        data: ['0时0分', '0时15分', '0时30分', '0时45分', '1时0分', '1时15分', '1时30分', '1时45分', '2时0分', '2时15分', '2时30分', '2时45分', '3时0分', '3时15分', '3时30分', '3时45分', '此时']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '摄像头1',
            data: [0.44, 0.41, 0.6, 0.71, 0.51, 0.27, 0.38, 0.76, 0.29, 0.42, 0.32, 0.61, 0.48, 0.07, 0.38, 0.62, 0.4],
            type: 'line',
            smooth: true,
            markLine: {
                data: [
                    { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                    { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                    { name: '阈值3', value: '此时', xAxis: '此时' },
                ],
                symbol: ['none', 'none']
            },
            areaStyle: {
                color: "gray"
            },
        },
        {
            name: '摄像头2',
            data: [0.41, 0.86, 0.65, 0.4, 0.82, 0.56, 0.41, 0.23, 0.96, 0.17, 0.27, 0.04, 0.64, 0.38, 0.72, 0.36, 0.15, 0.8, 0.63, 0.9],
            type: 'line',
            smooth: true,
            markLine: {
                data: [
                    { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                    { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                    { name: '阈值3', value: '此时', xAxis: '此时' },
                ],
                symbol: ['none', 'none']
            },
            areaStyle: {
                color: "gray"
            },
        },
        {
            name: '摄像头3',
            data: [0.32, 0.91, 0.04, 0.66, 0.08, 0.52, 0.13, 0.84, 0.36, 0.03, 0.58, 0.99, 0.35, 0.61, 0.42, 0.55, 0.01, 0.53, 0.53, 0.32],
            type: 'line',
            smooth: true,
            markLine: {
                data: [
                    { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                    { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                    { name: '阈值3', value: '此时', xAxis: '此时' },
                ],
                symbol: ['none', 'none']
            },
            areaStyle: {
                color: "gray"
            },
        }
    ]
};

function changeChart() {
    option03 = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['摄像头1', '摄像头2', '摄像头3'],
            x: 'right'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                rotate: 40
            },
            data: ['0时0分', '0时15分', '0时30分', '0时45分', '1时0分', '1时15分', '1时30分', '1时45分', '2时0分', '2时15分', '2时30分', '2时45分', '3时0分', '3时15分', '3时30分', '3时45分', '此时', '0时15分', '0时30分', '0时45分', '1时0分'],
        },
        axisLabel: {
            interval: 0,
            rotate: 40
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '摄像头1',
                data: [0.44, 0.41, 0.6, 0.71, 0.51, 0.27, 0.38, 0.76, 0.29, 0.42, 0.32, 0.61, 0.48, 0.07, 0.38, 0.62, 0.4, 0.03, 0.25, 0.83, 0.53],
                type: 'line',
                smooth: true,
                markLine: {
                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                        { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            },
            {
                name: '摄像头2',
                data: [0.38, 0.41, 0.86, 0.65, 0.4, 0.82, 0.56, 0.41, 0.23, 0.96, 0.17, 0.27, 0.04, 0.64, 0.38, 0.72, 0.36, 0.15, 0.8, 0.63, 0.9],
                type: 'line',
                smooth: true,
                markLine: {
                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                        { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            },
            {
                name: '摄像头3',
                data: [0.35, 0.32, 0.91, 0.04, 0.66, 0.08, 0.52, 0.13, 0.84, 0.36, 0.03, 0.58, 0.99, 0.35, 0.61, 0.42, 0.55, 0.01, 0.53, 0.53, 0.32],
                type: 'line',
                smooth: true,
                markLine: {
                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6, label: { formatter: function (params) { str = '轻微拥挤'; return str } } },
                        { name: '阈值2', value: '0.8', yAxis: 0.8, label: { formatter: function (params) { str = '严重拥挤'; return str } } },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            }
        ]
    };
}


function returnChart() {
    option03 = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['摄像头1', '摄像头2', '摄像头3'],
            x: 'right'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                interval: 0,
                rotate: 40
            },
            data: ['0时0分', '0时15分', '0时30分', '0时45分', '1时0分', '1时15分', '1时30分', '1时45分', '2时0分', '2时15分', '2时30分', '2时45分', '3时0分', '3时15分', '3时30分', '3时45分', '此时']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '摄像头1',
                data: [0.44, 0.41, 0.6, 0.71, 0.51, 0.27, 0.38, 0.76, 0.29, 0.42, 0.32, 0.61, 0.48, 0.07, 0.38, 0.62, 0.4],
                type: 'line',
                smooth: true,
                markLine: {

                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6 },
                        { name: '阈值2', value: '0.8', yAxis: 0.8 },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            },

            {
                name: '摄像头2',
                data: [0.41, 0.86, 0.65, 0.4, 0.82, 0.56, 0.41, 0.23, 0.96, 0.17, 0.27, 0.04, 0.64, 0.38, 0.72, 0.36, 0.15, 0.8, 0.63, 0.9],
                type: 'line',
                smooth: true,
                markLine: {
                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6 },
                        { name: '阈值2', value: '0.8', yAxis: 0.8 },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            },
            {
                name: '摄像头3',
                data: [0.32, 0.91, 0.04, 0.66, 0.08, 0.52, 0.13, 0.84, 0.36, 0.03, 0.58, 0.99, 0.35, 0.61, 0.42, 0.55, 0.01, 0.53, 0.53, 0.32],
                type: 'line',
                smooth: true,
                markLine: {
                    data: [
                        { name: '阈值1', value: '0.6', yAxis: 0.6 },
                        { name: '阈值2', value: '0.8', yAxis: 0.8 },
                        { name: '阈值3', value: '此时', xAxis: '此时' },
                    ],
                    symbol: ['none', 'none']
                },
                areaStyle: {
                    color: "gray"
                },
            }
        ]
    };
}

if (option01 && typeof option03 === "object") {
    myChart.setOption(option03, true);
}

function refreshDiv(flag) {
    // console.log("刷新频率为:" + Interval);
    if (flag == 1 && option01 && typeof option01 === "object") {
        setDatetimeLocal(1);
        $('#exceedThreshold02').html('拥堵预测');
        myChart.setOption(option01, true);
    }
    if (flag == 2 && option02 && typeof option02 === "object") {
        setDatetimeLocal(1);
        $('#exceedThreshold02').html('拥堵预测');
        myChart.setOption(option02, true);
    }
    if (flag == 3 && option03 && typeof option03 === "object") {
        setDatetimeLocal(7);
        console.log($('#exceedThreshold02').text());
        if ($('#exceedThreshold02').text() == '拥堵预测') {
            alert('预测完成!');
            $('#exceedThreshold02').text('预测完成');
            changeChart();
            myChart.setOption(option03, true);
        }
        else if ($('#exceedThreshold02').text() == '预测完成') {
            flag = confirm('是否撤销预测？');
            console.log(flag);
            if (flag == true) {
                $('#exceedThreshold02').text('拥堵预测');
                returnChart();
                myChart.setOption(option03, true);
            }
        }
    }
}