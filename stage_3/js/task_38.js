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
            upArrow.style.cssText= 'position:absolute; top: 23px; right:10px; border: 8px solid transparent; border-top: 8px solid #f44336';
            ele.appendChild(upArrow);
        }
        function addDownArrow(ele) {
            var downArrow = document.createElement("div");
            downArrow.style.cssText= 'position:absolute; top: 0px; right:10px;border: 8px solid transparent; border-bottom: 8px solid #f44336';
            ele.appendChild(downArrow);
        }
        for(var f=0; f<self.cols; f++) {
            // state 标记状态，若为self.disableSortCol.length 则说明添加箭头
            var state = 0;
            var arrowEle = self.tableEle.tHead.rows[0].cells[f];
            //var disableArrow = self.tableEle.tHead.rows[0].cells[].
            for(var j=0; j<self.disableSortCol.length; j++) {
                if(arrowEle && (self.disableSortCol[j] != (f+1))) {
                    state ++;
                }
            }
            if(state == self.disableSortCol.length) {
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
        var self = this;


        // Small --> Big,
        // colNum 要进行排序的列数
        function SBSort(colNum) {
            var colArr = [];
            var tempRow = null;
            var tBodies = self.tableEle.tBodies;
            for(var x=0; x<self.rows-1; x++) {
                //colArr.push();
                var preRow = tBodies.rows[x].cells[colNum+1].innerText;
                var nextRow = tBodies.rows[x+1].cells[colNum+1].innerText;
                if(preRow > nextRow){
                    tBodies.insertRow(x);
                }
            }
        }
        // Big --> Small
        function BSSort(colNum) {

        }

        function exchangeRow(preRow, nextRow, colNum) {
            // exchange
            var tempPreRow = nextRow;
            var tempNextRow = preRow;
            // delete Row
            self.tableEle.tBodies.deleteRow(colNum);
            self.tableEle.tBodies.deleteRow(colNum+1);

            self.tableEle.tBodies.insertRow(colNum).appendChild(tempPreRow.innerHTML);
            self.tableEle.tBodies.insertRow(colNum+1).appendChild(tempNextRow.innerHTML);
        }
    },

    tableRender: function() {
        // Set Table Basic Style
        this.tableEle.border = 1;
        this.tableEle.width = '40%';
        this.tableEle.tHead.style.backgroundColor = '#333';
        this.tableEle.tHead.style.color = 'white';
        this.tableEle.cellPadding = '10';

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
