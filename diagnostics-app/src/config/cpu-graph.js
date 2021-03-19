export default {
  //Chart.js options
  animation: {
    duration: 3,
  },
  scales: {
    scaleLabel: {
      fontColor: "white",
    },
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
        },
        gridLines: {
          display: true,
        },
      },
    ],
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
        },
      },
    ],
  },
  legend: {
    display: true,
    position: "right",
    labels: {
      fontColor: "white",
      boxWidth: 15,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};
