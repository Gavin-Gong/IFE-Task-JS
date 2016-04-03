/**
 * Created by Kefen Gong on 4/2/2016.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
    // 确定是否选项发生了变化

    // 设置对应数据
    //console.log(event.target.nodeName.toLowerCase());
    // 调用图表渲染函数
    // 只有在点input element的时候有用
    if(event.target.nodeName.toLowerCase() == "input" && event.target.value != pageState.nowGraTime) {
        //console.log(pageState.nowGraTime);
        pageState.nowGraTime = event.target.value;
        //console.log(event.target.value);
        renderChart();
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    console.log(pageState.nowSelectCity);
    console.log(this.value);
    // 确定是否选项发生了变化
    if(this.value != pageState.nowSelectCity) {
        pageState.nowSelectCity = this.value; // 设置对应数据
        renderChart(); // 调用图表渲染函数
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    //var graTime = document.getElementsByName('gra-time');
    var graTime = document.getElementById("form-gra-time");
    console.log(graTime);
    graTime.addEventListener("click", graTimeChange);

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.getElementById("city-select");
    for (var city in aqiSourceData) {
        citySelect.innerHTML += "<option>" + city +"</option>";
    }
    console.log(citySelect.value);
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    //console.log(citySelect.options[citySelect.selectedIndex]);
    var cityArr = Object.getOwnPropertyNames(aqiSourceData); //获取属性列表
    pageState.nowSelectCity = cityArr[0];
    citySelect.addEventListener("change", citySelectChange);

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    for(var key in aqiSourceData) {
        chartData[key] = {"day":{}, "week": {}, "month": {"1":0, "2": 0, "3": 0}};

        //Day
        chartData[key].day = aqiSourceData[key];
        console.log(chartData[key].day);

        //Month
        for(var i = 1; i<=3; i++) {
            var monthReg = new RegExp("2016-0" + i +"-\\d{2}"),
                monthSum = 0,
                count = 0;

            for(var daykey in chartData[key].day) {
                if(monthReg.test(daykey)) {
                    monthSum += chartData[key].day[daykey];
                    count++;
                }
            }
            chartData[key].month[i] = Math.ceil(monthSum/count);
        }

        //Week
        var weekNum = 0;
        var weekSum = 0;
        var weekCount = 0;
        var weekArray = [];
        for(var time in chartData[key].day) {
            //console.log(chartData[key].day[time]);

            weekSum += chartData[key].day[time];

            weekCount++;

            if(!weekCount % 7) {
                weekNum++;
                weekArray.push(weekNum);
                console.log(weekArray);
                //chartData[key].week.[weekArray] = Math.ceil(weekSum/7);
                //chartData[key].week = {weekArray[weekNum]: Math.ceil(weekSum/7)}
            }

        }
        console.log(chartData[key].week);


    }


}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
    initAqiChartData();
}

init();
