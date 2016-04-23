(function() {
    console.log('gg');
    var moudule = document.getElementsByClassName('tree-moudule')[0],
        root = document.querySelector('.root'),
        btns = document.querySelectorAll('fieldset button'),
        searchBtn = btns[0],
        addBtn = btns[1],
        resetBtn = btns[2];
        inputValue = document.getElementsByClassName('input')[0].value;


    root.addEventListener('click', function(e) {
    var focusNode = e.target;
    console.log(focusNode);
    toggleFold(focusNode);
});

    function toggleFold(node) {
        var childElements = getChildelements(node);
        var childrenLen = childElements.length;
        if (childrenLen) {
            if (childElements[0].style.display === 'none') {
                for (var i = 0; i < childrenLen; i++) {
                    childElements[i].style.display = 'block';
                }
            } else {
                for (var j = 0; j < childrenLen; j++) {
                    childElements[j].style.display = 'none';
                }
            }
        }
    }

    function addNode(node, text) {
        var newNode = document.createElement('div');
        newNode.innerHTML = text.trim();
        if(text) {
            node.appendChild(newNode);
        }
    }
    function delNode(node) {
        if(node != root) {
            node.parentNode.removeChild(node);
        }
    }
    function getChildelements(node) {
        if(node) {
            var resultNode = [];
            for(var i= 0; i<node.childNodes.length; i++) {
                if(node.childNodes[i].nodeType == 1) {
                    resultNode.push(node.childNodes[i]);
                }
            }
            return resultNode;
        }
    }


})();

