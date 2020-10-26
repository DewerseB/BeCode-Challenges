/**
 * Turns an HTML table into a data object formated for Chart.js
 */
class DataFromTable {
    constructor(table) {
        this.type = 'bar';
        this.data = this.getData(table);
    }

    /**
     * Gets a set of data from a table.
     * 
     * @param {HTMLElement} table the table HTML element containing the data
     * 
     * @return {Object} an object containing the data, formated for Chart.js
     */
    getData(table) {
        let data = {
            labels: [],
            datasets: []
        };
        let rows = table.children[2].children;
        switch(table.id) {
            case 'table1':
                for (let i = 1; i < rows.length; i++) {
                    data.labels.push(rows[i].children[1].innerHTML.replace(/\(.*\)/, ''));
                }
                for (let j = 2; j < rows[0].children.length; j++) {
                    let dataset = {
                        label: rows[0].children[j].innerHTML,
                        data : [],
                        backgroundColor: 'rgba(0, ' + j*15 + ', ' + j*20 + ', 0.3)'
                    }
                    for (let k = 1; k <= data.labels.length; k++) {
                        rows[k].children[j].innerHTML === ':' ? dataset.data.push(0) : dataset.data.push(parseInt(rows[k].children[j].innerHTML, 10));
                    }
                    data.datasets.push(dataset);
                }
                break;
            case 'table2':
                for (let i = 0; i < rows.length; i++) {
                    data.labels.push(rows[i].children[1].innerHTML.replace(/\s+/g, ' ').replace(/<br>/g, ''));
                }
                for (let j = 2; j < table.children[1].children[0].children.length; j++) {
                    let dataset = {
                        label: table.children[1].children[0].children[j].innerHTML,
                        data : [],
                        backgroundColor: 'rgba(0, ' + j*30 + ', ' + j*60 + ', 0.3)'
                    }
                    for (let k = 0; k < data.labels.length; k++) {
                        rows[k].children[j].innerHTML === ':' ? dataset.data.push(0) : dataset.data.push(parseInt(rows[k].children[j].innerHTML, 10));
                    }
                    data.datasets.push(dataset);
                }
                break;  
        }
        return data;
    }
}


/**
 * Turns a request's response into a data object formated for Chart.js
 */
class DataFromRequest {
    constructor(response) {
        this.type = 'line',
        this.data = {
            labels: this.getLabels(response),
            datasets: [{
                label: 'Graph Line',
                data: this.getData(response),
                backgroundColor: 'rgba(0, 119, 204, 0.3)'
            }]
        }
    }

    /**
     * Gets an array of labels from a request's response
     * 
     * @param {Object} response an object containing the request's response
     * 
     * @return {Array} an array containing the labels
     */
    getLabels(response) {
        let labels = [];
        for (let i = 0; i < response.length; i++) {
            labels.push(response[i][0]);
        }
        return labels;
    }

    /**
     * Gets an array of data from a request's response
     * 
     * @param {Object} response an object containing the request's response
     * 
     * @return {Array} an array containing the data
     */
    getData(response) {
        let datas = [];
        for (let i = 0; i < response.length; i++) {
            datas.push(response[i][1]);
        }
        return datas;
    }
}


/**
 * Creates a canvas.
 * 
 * @param {HTMLElement} target the target HTML element to add the canvas next to
 * @param {Boolean} before true to put the canvas before the element, false to put it after
 * 
 * @return {CanvasRenderingContext2D} the 2d context of the canvas
 */
function createCanvas(target, before) {
    let canvas = document.createElement('canvas');
    before ? target.parentNode.insertBefore(canvas, target) : target.parentNode.insertBefore(canvas, target.nextSibling);
    return canvas.getContext('2d');
}



let datah1;
let charth1;
let refreshData = (ctx) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            let response = JSON.parse(this.responseText);
            if (datah1 === undefined) {
                datah1 = new DataFromRequest(response);
                charth1 = new Chart(ctx, datah1);
            } else {
                for (let i = 0; i < response.length; i++) {
                    if (datah1.data.labels.length > 100) {
                        datah1.data.datasets[0].data.shift();
                    } else {
                        datah1.data.labels.push(datah1.data.labels.length);
                    }
                    datah1.data.datasets[0].data.push(response[i][1]);
                    charth1.update();
                }
            }
        }
    };
    request.open("GET", "https://canvasjs.com/services/data/datapoints.php");
    request.send();
}
  

/**
 * Generates and fills a canvas with a chart for each #table.
 * Starts an interval to refresh the canvas under #firstHeading.
 */
(function loadCharts() {
    const tables = [document.getElementById('table1'),document.getElementById('table2')];
    tables.forEach((table) => {
        let data = new DataFromTable(table);
        let ctx = createCanvas(table, true);
        let chart = new Chart(ctx, data);
    });
    let ctxh1 = createCanvas(document.getElementById('firstHeading'), false);
    setInterval(() => {
        refreshData(ctxh1)
    }, 1000);
})();