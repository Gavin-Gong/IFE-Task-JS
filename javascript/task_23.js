/**
 * Created by Kefen Gong on 4/17/2016.
 */
var interval = 300;
lock = false;

$ = function(el) {
    return document.querySelector(el);
};
var root = $(".root"),
    search = $("#search"),
    add = $("#add"),
    operator = $(".operator"),
    tree = new Tree(root); //构造对象实例, 同时传入参数

// 点击一次变色, 二次取消
// root绑定事件不行, 因为root是个一个类数组
root.addEventListener('click', function(e) {
    var div = e.target;
    if (div && div.nodeName == "DIV") {
        var oriClass = div.className;
        // search
        if (oriClass.search('active') == -1) {
            div.style.backgroundColor = '#fef9d1';
            div.className = oriClass + ' active';
        } else {
            div.style.backgroundColor = '#fff';
            div.className = oriClass.replace('active', '');
        }
    }
});

operator.addEventListener('click', function(event) {
    var btn = event.target;
    if (btn && btn.nodeName === "BUTTON") {
        if(lock) {
            alert("正在遍历中");
            return;
        }


        clearColor(tree); // 清楚颜色
        switch (btn.id) {
            case "traverseDF":
            case "traverseBF":
                tree[btn.id](); //遍历
                animation(tree.stack);
                break;
            case "DFSearch":
            case "BFSearch":
                tree["traverse" + btn.id.substring(0, 2)](); //遍历
                animation(tree.stack, checkInput(search)); //
                break;
            case "addNode":
                var text = checkInput(add);
                if (text =='') alert('节点内容不能为空');
                addSubNode("active", text);
                break;
            case "delNode":
                if(delNode("active")) alert("删除成功");
                break;
        }
    }
});



function checkInput(ele) {
    return ele.value.trim();
}

function delNode(className) {
    var nodes = document.getElementsByClassName(className);
    if (nodes.length == 0) return false; // 判断空nodelist
    var length = nodes.length;
    for (var i = 0; i < length; i ++) {
        nodes[0].parentNode.removeChild(nodes[0]);  // 为何要用[0]而不是[i]
    }
    return true;
}
function addSubNode(className, text) {
    // write by me
    var parentNode = document.getElementsByClassName(className);
    var subNode = document.createElement("div");

    if(parentNode && text) {
        subNode.innerHTML = text;
        console.log(parentNode.length);
        for (var i = 0; i < parentNode.length; i++) {
            parentNode[i].appendChild(subNode);
            parentNode[i].style.backgroundColor = '#fef9d1';
        }
    } else {
        return false;
    }
}
function clearColor(tree) {
    tree.traverseDF();
    tree.stack.forEach(function(ele) {
        ele.style.backgroundColor = '#fff';
    });
}
function animation(nodes, keyword) {
    lock = true;
    var keyword = keyword || null;  // 何解?
    (function show() {
        var next = nodes.shift();
        if (next) {
            next.style.backgroundColor = '#ccc';
            setTimeout(function() {
                if (!(next.firstChild.nodeValue.trim() == keyword))
                {next.style.backgroundColor = '#fff';}

                show();
            }, interval);
        } else {
            lock = false;
        }
    })();  // 匿名函数, 立即执行函数?
}


function Tree(node) {
    this.stack = [];
    this.root = node;
}

Tree.prototype.traverseDF = function(callback) {
    var stack = [];
    // 立即执行函数, 递归
    (function recurse(currentNode) {
        stack.push(currentNode);
        for(var i = 0; i < currentNode.children.length; i++) {
            recurse(currentNode.children[i]);
        }
        callback ? callback(currentNode) : null;
    })(this.root);
    this.stack = stack;
};

Tree.prototype.traverseBF = function(callback) {
    var queue = [],
        currentNode = this.root;
    this.stack = [];
    this.stack.push(currentNode);
    while (currentNode) {
        var length = currentNode.children.length;
        for (var i = 0; i < length; i++) {
            queue.push(currentNode.children[i]);
        }
        callback ? callback(currentNode) : null;// 这个callback是个什么东西
        currentNode = queue.shift();
        this.stack.push(currentNode);
    }
};
