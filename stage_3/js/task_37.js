/**
 * Created by Kefen Gong on 5/3/2016.
 */

    var maskEle = document.getElementsByClassName('mask-layer')[0];
    var maskTrigger = document.getElementsByClassName('mask-trigger')[0];

function maskLayer(ele, trigger) {
    function show() {
        ele.style.display = 'block'
    }
    function hide() {
        ele.style.display = "none";
    }
    function setHeight() {
        ele.style.height = window.innerHeight + "px";
    }
    ele.addEventListener('click', function(e) {
        if(e.target = ele) {
            hide();
        }
    });
    setHeight();
    trigger.addEventListener('click', show, false);
    window.addEventListener('resize', setHeight, false);
}

maskLayer(maskEle, maskTrigger);










