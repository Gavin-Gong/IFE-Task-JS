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
        function addUpArrow() {

        }
        function addDownArrow() {}

    },
    addTbody: function() {
        // Create Table Body
        var tbody =document.createElement("tbody");
        this.tableEle.appendChild(tbody);

        // Append Data
        //for(var row=0; row< this.rows; row++) {
        //    tbody.insertRow(row);
        //    for(var col=0; col<this.cols; col++) {
        //        tbody.rows[row].insertCell(col);
        //        tbody.rows[row].cells[col].appendChild(this.data.row1);  //Some Bugs To Fix
        //    }

        for(var key in this.data) {
            var row = 0;
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
        this.tableEle.width = '80%';
        this.tableEle.tHead.style.backgroundColor = 'black';
        this.tableEle.tHead.style.color = 'white';
    },

    init: function() {
        this.addThead();
        this.addTbody();
        this.tableRender();
    }
};

// Table Config Data
var tableData = {
    tableEle: document.getElementsByClassName('tab')[0],
    cols: 4,
    rows: 5,
    data: { head: ['Q','W','E','R'],
            row1: [1,2,3,4],
            row2: [1,2,3,4],
            row3: [1,2,3,4],
            row4: [1,2,3,4]
    },
    disableSortCol: [1,2],
    defaultSortCol: [3, 'sb'] // col:3, Small --> Big
};

var newTable = new TableUtil(tableData);
