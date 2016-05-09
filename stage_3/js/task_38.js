/**
 * Created by Kefen Gong on 5/9/2016.
 */
function TableUtil(configData) {
    this.tableEle = configData.tableEle;
    this.cols = configData.cols;
    this.rows = configData.rows;
    this.data = configData.data;
    this.disableSortCol = configData.disableSortCol;
    this.defaultSortCol = configData.defaultSortCol;

    this.init();
}

TableUtil.prototype = {
    constructor: TableUtil,

    addThead: function() {
        var thead = document.createElement("thead");
        this.tableEle.appendChild(thead);

        thead.insertRow(0);
        for(var i= 0; i<this.cols; i++) {
            thead.rows[0].insertCell(i);
            thead.rows[0].cells[i].innerHTML= this.data.head[i];
        }
    },
    addArrow: function() {
        var self = this;
        function addUpArrow(ele) {
            var upArrow = document.createElement("div");
            upArrow.style.cssText= 'position:absolute; top:18px; right:10px; border: 8px solid transparent; border-top: 8px solid #f44336';
            ele.appendChild(upArrow);
        }
        function addDownArrow(ele) {
            var downArrow = document.createElement("div");
            downArrow.style.cssText= 'position:absolute; top:-5px; right:10px;border: 8px solid transparent; border-bottom: 8px solid #f44336';
            ele.appendChild(downArrow);
        }
        for(var f=0; f<self.cols; f++) {
            var arrowEle = self.tableEle.tHead.rows[0].cells[f];
            //var disableArrow = self.tableEle.tHead.rows[0].cells[].
            if(arrowEle) {
                    addDownArrow(arrowEle);
                    addUpArrow(arrowEle);
                }
            }


    },
    addTbody: function() {
        // Create Table Body
        var tbody = document.createElement("tbody");
        this.tableEle.appendChild(tbody);

        // Append Data
        var row = 0;
        for(var key in this.data) {

            tbody.insertRow(row++);
            if(key != 'head') {
                for (var col=0; col<this.cols; col++) {
                    tbody.rows[row-1].insertCell(col);
                    tbody.rows[row-1].cells[col].innerHTML = this.data[key][col];
                }
            }
        }
    },

    sortTable: function() {

    },

    tableRender: function() {
        // Set Table Basic Style
        this.tableEle.border = 1;
        this.tableEle.width = '40%';
        this.tableEle.tHead.style.backgroundColor = '#333';
        this.tableEle.tHead.style.color = 'white';

        // Set Cell position:relative
        var headTdEle = this.tableEle.tHead.getElementsByTagName('td');
        for(var g=0; g<this.cols; g++) {
            headTdEle[g].style.position = 'relative';
        }
    },

    init: function() {
        this.addThead();
        this.addTbody();
        this.tableRender();
        this.addArrow();
    }
};

// Table Config Data
var tableData = {
    tableEle: document.getElementsByClassName('tab')[0],
    cols: 4,
    rows: 5,
    data: { head: ['Q','W','E','R'],
            row1: [1,33,3,42],
            row2: [5,7,43,46],
            row3: [7,4,65,54],
            row4: [2,6,12,32]
    },
    disableSortCol: [1,2],
    defaultSortCol: [3, 'sb'] // col:3, Small --> Big
};

var newTable = new TableUtil(tableData);
