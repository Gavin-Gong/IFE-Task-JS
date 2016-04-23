(function() {
    console.log('gg');
    var moudule = document.getElementsByClassName('tree-moudule')[0],
        root = document.querySelector('.root'),
        operator = document.getElementsByClassName('operator')[0],
        btns = operator.querySelectorAll('button'),
        searchBtn = btns[0],
        addBtn = btns[1],
        delBtn = btns[2],
        resetBtn = btns[3];
        input = document.getElementsByClassName('input')[0];


    root.addEventListener('dblclick', function(e) {
    var focusNode = e.target;
    console.log(focusNode);
    toggleFold(focusNode);
    });

    root.addEventListener('click', function(e) {
    var focusNode = e.target;
        color(focusNode);
    });

    delBtn.addEventListener('click', function() {
       var selectedNodes = document.getElementsByClassName('bg-color') ;
        for (var i=0; i<selectedNodes.length; i++) {
            delNode(selectedNodes[i]);
        }
    });
    addBtn.addEventListener('click', function() {

        addNode(document.getElementsByClassName('bg-color'), input.value);
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

    function addNode(nodes, text) {
        var newNode = document.createElement('div');
        newNode.innerHTML = text.trim();
        if(text) {
            for(var g=0; g<nodes.length; g++) {
                nodes[g].appendChild(newNode);
            }

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
    function color(node) {
        //var nodes = document.getElementsByClassName('bg-color');
        var oClassName = node.className;
        console.log(oClassName.search('bg-color'));
        if(oClassName.search('bg-color') == -1) {
            node.className += 'bg-color';
        } else {
            node.className = oClassName.replace("bg-color", '');
        }
    }


})();

