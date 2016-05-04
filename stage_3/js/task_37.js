/**
 * Created by Kefen Gong on 5/3/2016.
 */

    var maskEle = document.getElementsByClassName('mask-layer')[0];
    var maskTrigger = document.getElementsByClassName('mask-trigger')[0];

function maskLayer(ele) {
    //this.ele = ele;
    ele.style.height = window.innerHeight + "px";
    return {
        show: function() {
            ele.style.display = 'block';
            alert('block');
        },
        hide: function() {
            ele.style.display = "none";
            alert('hide')
        }

    }
}

maskTrigger.addEventListener('click', maskLayer(maskEle).show, false);

//maskTrigger.addEventListener('click', maskLayer.show(), false);
maskEle.addEventListener('click', function(e) {
    if(e.target.className == "mask-layer") {
        maskLayer(maskEle).hide();
    }
});

//maskTrigger.addEventListener('click', showMask(maskEle));
//maskTrigger.addEventListener('click', maskLayer.hide());
//maskLayer.addEventListener('click', maskLayer.hide(), false);







