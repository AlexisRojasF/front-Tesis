
// barChart
export var barChartOptions: any = {
elements: {
    rectangle: {
    borderWidth: 2,
    borderSkipped: 'bottom'
    }
},
responsive: true,
maintainAspectRatio: false,
responsiveAnimationDuration: 500,
legend: {
    position: 'top',
},
scales: {
    xAxes: [{
    display: true,
    gridLines: {
        color: "#F5F5F5",
        drawTicks: false,
    },
    scaleLabel: {
        display: true,
    }
    }],
    yAxes: [{
    display: true,
    gridLines: {
        color: "#F5F5F5",
        drawTicks: false,
    },
    scaleLabel: {
        display: true,
    }
    }]
},
title: {
    display: true,
    text: 'Estilo de aprendizaje promediado'
}

};
export var barChartLabels: string[] = ["Activo", "Reflexivo", "Teórico", "Pragmático"];
export var barChartType = 'bar';
export var barChartLegend = true;

export var barChartData: any[] = [
    { data: [65, 59, 80, 81], label: 'Tendencia' }
];

export var barChartColors: Array<any> = [
    {

        backgroundColor: '#28c99e',
        borderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {

        backgroundColor: '#F77E17',
        borderColor: 'transparent',
        pointBackgroundColor: 'transparent',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
];

// Radar
export var radarChartLabels: string[] = ["Activo", "Reflexivo", "Teórico", "Pragmático"];

export var radarChartData: any = [
    { data: [65, 59, 80, 81], label: 'Tendencia' },
];
export var radarChartType = 'radar';
export var radarChartColors: any[] = [
    {
        backgroundColor: "rgba(151, 90, 255, 0.3)",
        borderColor: "transparent",
        pointBorderColor: "#28c99e",
        pointBackgroundColor: "#FFF",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 2,
        pointRadius: 4
    }
];
export var radarChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    responsiveAnimationDuration: 500,
    legend: {
        position: 'top',
    },
    title: {
        display: true,
        text: 'Estilo de aprendizaje promediado'
    },
    scale: {
        reverse: false,
        ticks: {
        beginAtZero: true
        }
    }
};
