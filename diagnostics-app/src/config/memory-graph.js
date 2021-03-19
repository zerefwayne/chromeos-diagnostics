export default {
  //Chart.js options
  animation: {
    duration: 3,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          fontColor: "white",
          min: 0,
          max: 100,
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
    display: false,
  },
  responsive: true,
  maintainAspectRatio: false,
};
