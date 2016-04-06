/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
*    "北京": 90,
*    "上海": 40
* };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityName = document.getElementById("aqi-city-input").value.trim();
    var quaValue = document.getElementById("aqi-value-input").value.trim();
    if(!quaValue.match(/^\d+$/)) {
        alert("骚年郎,你输入错误哦");
        return;
    }
    aqiData[cityName] = quaValue;
    console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById('aqi-table');
        table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    console.log(table);
    for(var cityName in aqiData) {
        table.innerHTML += "<tr><td>" + cityName + "</td><td>" + aqiData[cityName] + "</td><td><button class='del-btn'>删除</button></td></tr>"
    }
    init();//形成循环调用...
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
// do sth.
    var trNode = this.parentNode.parentNode;
    var city = trNode.children[0].innerHTML;
    console.log("gg");
    delete aqiData[city];
    renderAqiList();
}

function init() {

// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
// js放到head标签就报错,放到body标签底部就不报错,节点要加载完才能执行onclick事件.
//    document.getElementById("add-btn").addEventListener('click', addBtnHandle);
    document.getElementById('add-btn').onclick = addBtnHandle;
    // 先用笨办法
    var delbtn = document.getElementsByClassName('del-btn');
    console.log(delbtn.length);
    for(var i=0; i<delbtn.length; i++) {
        delbtn[i].onclick = delBtnHandle;
    }
}

init();