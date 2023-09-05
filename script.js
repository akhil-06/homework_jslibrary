// Initialize your variables
const chartData = {
    labels: [],
    datasets: [{
        label: 'Real-Time Data',
        data: [],
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }],
};

let chart;
let isPaused = false;

// Function to update the chart with new data
function updateChart(newData) {
    if (!isPaused) {
        chartData.labels.push(new Date().toLocaleTimeString());
        chartData.datasets[0].data.push(newData);

        if (chartData.labels.length > 10) {
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
        }

        chart.update();
    }
}

// Function to fetch and update real-time data (simulated data)
function fetchData() {
    const newData = Math.random() * 100;
    updateChart(newData);

    setTimeout(fetchData, 5000);
}

// Initialize the chart
const ctx = document.getElementById('realTimeChart').getContext('2d');
chart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second', // Use 'second' as the unit
                    displayFormats: {
                        second: 'HH:mm:ss', // Format for seconds
                    },
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    },
});

// Add event listener to pause button
const pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});

// Start fetching and updating real-time data
fetchData();
