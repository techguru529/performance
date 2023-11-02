document.addEventListener('DOMContentLoaded', function () {
    // Default expectations for each level
    const levelExpectations = {
        'mts-1': [1, 1, 1, 1, 1],
        'mts-2': [2, 2, 2, 2, 2],
        'mts-3': [3, 3, 3, 3, 3],
        'senior-mts': [4, 4, 4, 4, 4],
        'staff-engineer': [5, 5, 5, 5, 5],
        // ... Add other levels with their expectations as needed
    };

    // Initialize sliders to the default expectation level
    const sliders = {
        'productivity': document.getElementById('productivity'),
        'okr': document.getElementById('okr'),
        'softSkills': document.getElementById('softSkills'),
        'feedback': document.getElementById('feedback'),
        'codeQuality': document.getElementById('codeQuality')
    };

    // Initialize the chart
    var ctx = document.getElementById('spiderChart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Productivity', 'OKRs', 'Soft Skills', 'Feedback', 'Code Quality'],
            datasets: [
                {
                    label: 'Expectations',
                    backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    borderColor: 'rgba(0, 0, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 0, 255, 1)',
                    pointRadius: 5,
                    data: levelExpectations['mts-1']
                },
                {
                    label: 'Individual Performance',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 5,
                    data: [2.5, 2.5, 2.5, 2.5, 2.5]
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });

    // Function to update the individual performance dataset
    function updatePerformance() {
        chart.data.datasets[1].data = [
            parseFloat(sliders['productivity'].value),
            parseFloat(sliders['okr'].value),
            parseFloat(sliders['softSkills'].value),
            parseFloat(sliders['feedback'].value),
            parseFloat(sliders['codeQuality'].value)
        ];
        chart.update();
    }

    // Event listeners for sliders
    Object.keys(sliders).forEach(key => {
        sliders[key].addEventListener('input', function () {
            updatePerformance();
            // Update the legends for slider values
            document.getElementById(key + '-value').textContent = sliders[key].value;
        });
    });

    // Function to update the expectations dataset and sliders based on the selected level
    function updateExpectations() {
        const selectedLevel = document.getElementById('level').value;
        const levelData = levelExpectations[selectedLevel];
        chart.data.datasets[0].data = levelData;
        chart.data.datasets[1].data = levelData;
        // Update slider positions and legends to match expectations
        Object.keys(sliders).forEach((key, index) => {
            sliders[key].value = levelData[index];
            document.getElementById(key + '-value').textContent = levelData[index];
        });
        chart.update();
    }

    // Event listener for the level dropdown
    document.getElementById('level').addEventListener('change', updateExpectations);

    // Initialize chart with MTS-1 expectations
    updateExpectations();
});
