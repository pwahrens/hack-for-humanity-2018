Highcharts.chart('resource-graph', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Needed Resources'
    },
    xAxis: {
        categories: [
            'Food',
            'Water',
            'Medicine',
            'Blankets',
            'Toiletries',
            'Power'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Quantity (#)'
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Resources',
        data: [
            resources['Food'],
            resources['Water'],
            resources['Medicine'],
            resources['Blankets'],
            resources['Toiletries'],
            resources['Power']
        ]
    }]
});
