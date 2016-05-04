/**
 * Created by Kefen Gong on 5/3/2016.
 */

    var maskEle = document.getElementsByClassName('mask-layer')[0];
    var maskTrigger = document.getElementsByClassName('mask-trigger')[0];

function maskLayer(ele) {
    ele.style.height = window.innerHeight + "px"; //resize 时候触发此事件
    return {
        show: function() {
            ele.style.display = 'block';
        },
        hide: function() {
            ele.style.display = "none";
        }
    }
}

maskTrigger.addEventListener('click', maskLayer(maskEle).show, false);
maskEle.addEventListener('click', function(e) {
    if(e.target.className == "mask-layer") {
        maskLayer(maskEle).hide();
    }
});








