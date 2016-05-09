/**
 * Created by Kefen Gong on 5/6/2016.
 */
function MaskLayer(ele, Bgcolor) {
    this.ele = ele;
    this.Bgcolor = Bgcolor;
    this.Mskele = null;
    this.init();
    this.setViewPort();
    //下策
    self = this;

}

MaskLayer.prototype = {
    show: function() {
        //这儿的this指向调用函数maskBtn, 怎么解决???
        console.log(self);
        console.log(this);
        console.log(this.Mskele);
        // 下策
        self.Mskele.style.display = 'block';
    },
    hdie: function() {
        console.log(this.Mskele);
        this.Mskele.style.display = 'none';
    },
    setViewPort: function() {
        this.Mskele.style.width = window.innerWidth + 'px';
        this.Mskele.style.height = window.innerHeight + 'px';
    },
    init: function() {
        //创建浮层,设置样式
        this.Mskele = document.createElement('div');
        this.setViewPort();
        this.Mskele.style.backgroundColor = this.Bgcolor;
        this.Mskele.style.position = 'fixed';

        //Mskele插入body 第一个子节点
        this.Mskele.appendChild(this.ele);
        var bodyNode = document.body;
        bodyNode.insertBefore(this.Mskele, bodyNode.firstChild);
        console.log(this.Mskele);

        // 点击其他元素之后会取消浮层
        var self = this;
        //console.log(self);
        this.Mskele.addEventListener('click',function() {
            self.hdie();
        });
        this.ele.addEventListener('click', function(e) {
            e.stopPropagation();
        })
    }

};

var color = 'rgba(128, 128, 128, .7)';
var maskForm = document.getElementsByClassName('mask-form')[0];
var maskBtn = document.getElementsByClassName('mask-trigger')[0];

var layer = new MaskLayer(maskForm, color);
//var gg = layer.show;
//console.log(gg);
maskBtn.addEventListener('click', layer.show);// 这里this会绑定maskBtn..
//maskBtn.addEventListener.call(MaskLayer,'click',layer.show());
