const ctx = document.getElementById('bar-chart').getContext('2d');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Bill', 'Jeff', 'Michael', 'Tim', 'Zuck'],
        datasets: [{
            label: 'Number of Cookies',
            data: [5, 2, 12, 19, 3],
            backgroundColor: [
                'rgba(255, 159, 64, 0.2)',  // Orange
                'rgba(255, 99, 132, 0.2)',  // Red
                'rgba(54, 162, 235, 0.2)',  // Blue
                'rgba(75, 192, 192, 0.2)',  // Green
                'rgba(153, 102, 255, 0.2)'  // Purple
            ],
            borderColor: [
                'rgba(255, 159, 64, 1)',    // Orange
                'rgba(255, 99, 132, 1)',    // Red
                'rgba(54, 162, 235, 1)',    // Blue
                'rgba(75, 192, 192, 1)',    // Green
                'rgba(153, 102, 255, 1)'    // Purple
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#eee'
                }
            }
        }
    },

});



const ctx2 = document.getElementById('pie-chart').getContext('2d');

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [{
    data: [25, 15, 30, 20, 10],
    backgroundColor: [
      '#ff6384',
      '#36a2eb',
      '#ffce56',
      '#4bc0c0',
      '#9966ff'
    ],
    borderWidth: 1
  }]
};

const config2 = {
  type: 'pie',
  data: data,
  options: {
    plugins: {
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percentage = (value / total * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          weight: 'bold',
          size: 16
        }
      },
      
    }
  },
  plugins: [ChartDataLabels]
};

new Chart(ctx2, config2);
