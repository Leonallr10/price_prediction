// static/js/script.js
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");
    const commonFields = document.getElementById("commonFields");
    const smartphoneFields = document.getElementById("smartphoneFields");
    const laptopFields = document.getElementById("laptopFields");
    const accessoryFields = document.getElementById("accessoryFields");
    
    const launchDateInput = document.createElement('input');
    launchDateInput.type = 'date';
    launchDateInput.id = 'launchDate';
    launchDateInput.name = 'launchDate';
    launchDateInput.required = true;
    launchDateInput.placeholder = 'Launch Date';
    launchDateInput.className = 'form-control';
    commonFields.appendChild(launchDateInput);

    const toggleRequiredFields = (fields, required) => {
        const inputs = fields.querySelectorAll('input');
        inputs.forEach(input => {
            input.required = required;
        });
    };

    const resetFields = () => {
        smartphoneFields.classList.add("hidden");
        laptopFields.classList.add("hidden");
        accessoryFields.classList.add("hidden");
        
        toggleRequiredFields(smartphoneFields, false);
        toggleRequiredFields(laptopFields, false);
        toggleRequiredFields(accessoryFields, false);
    };

    productSelect.addEventListener("change", (event) => {
        resetFields();
        const selectedValue = event.target.value;

        if (selectedValue === "smartphones") {
            smartphoneFields.classList.remove("hidden");
            toggleRequiredFields(smartphoneFields, true);
        } else if (selectedValue === "laptops") {
            laptopFields.classList.remove("hidden");
            toggleRequiredFields(laptopFields, true);
        } else if (selectedValue === "accessories") {
            accessoryFields.classList.remove("hidden");
            toggleRequiredFields(accessoryFields, true);
        }
    });

    const form = document.getElementById("productForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        showMessage('Processing prediction...', 'info');
        
        const formData = {
            product: document.getElementById("product").value,
            pdtName: document.getElementById("pdtName").value,
            currentPrice: document.getElementById("currentPrice").value,
            initialPrice: document.getElementById("initialPrice").value,
            launchDate: document.getElementById("launchDate").value,
        };

        if (formData.product === "smartphones") {
            formData.storageCapacity = document.getElementById("storageCapacity").value;
            formData.ram = document.getElementById("ram").value;
            formData.cameraSetup = document.getElementById("cameraSetup").value;
            formData.batteryLife = document.getElementById("batteryLife").value;
        } else if (formData.product === "laptops") {
            formData.storageCapacityLaptop = document.getElementById("storageCapacityLaptop").value;
            formData.ramLaptop = document.getElementById("ramLaptop").value;
            formData.processor = document.getElementById("processor").value;
            formData.resolution = document.getElementById("resolution").value;
        } else if (formData.product === "accessories") {
            formData.compatibility = document.getElementById("compatibility").value;
            formData.colorOptions = document.getElementById("colorOptions").value;
        }

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.status === 'success') {
                displayPredictions(result.predictions);
                displayOnlineMetrics(result.online_metrics);
                showMessage('Prediction completed successfully!', 'success');
            } else {
                showMessage('Error: ' + result.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('An error occurred while processing your request.', 'error');
        }
    });
});

function displayPredictions(predictions) {
    const container = document.getElementById('predictions-container');
    
    const chartData = predictions.map(pred => ({
        date: new Date(pred.date),
        price: pred.predicted_price,
        discount: pred.total_discount
    }));

    container.innerHTML = `
        <h2>Price Predictions</h2>
        <div class="chart-container">
            <canvas id="priceChart"></canvas>
        </div>
        <div class="predictions-summary">
            <div class="summary-card">
                <h3>Average Price</h3>
                <p>$${calculateAverage(predictions.map(p => p.predicted_price)).toFixed(2)}</p>
            </div>
            <div class="summary-card">
                <h3>Max Discount</h3>
                <p>${Math.max(...predictions.map(p => p.total_discount))}%</p>
            </div>
            <div class="summary-card">
                <h3>Best Day to Buy</h3>
                <p>${findBestDayToBuy(predictions)}</p>
            </div>
        </div>
        <div class="predictions-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${predictions.map(pred => `
                        <tr class="${pred.is_weekend ? 'weekend' : ''} ${pred.is_holiday ? 'holiday' : ''}">
                            <td>${formatDate(pred.date)}</td>
                            <td>$${pred.predicted_price.toFixed(2)}</td>
                            <td>${pred.total_discount}%</td>
                            <td>
                                ${pred.is_weekend ? '🏖️ Weekend' : ''}
                                ${pred.is_holiday ? '🎉 Holiday' : ''}
                                ${pred.season ? `🌤️ ${pred.season}` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.map(d => formatDate(d.date)),
            datasets: [{
                label: 'Predicted Price',
                data: chartData.map(d => d.price),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.1)',
                tension: 0.1,
                fill: true
            }, {
                label: 'Discount %',
                data: chartData.map(d => d.discount),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                tension: 0.1,
                yAxisID: 'y1',
                fill: true
            }]
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.label === 'Predicted Price') {
                                label += '$' + context.parsed.y.toFixed(2);
                            } else {
                                label += context.parsed.y.toFixed(1) + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Price ($)'
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Discount (%)'
                    },
                    grid: {
                        drawOnChartArea: false},
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
    
    function displayOnlineMetrics(metrics) {
        const container = document.createElement('div');
        container.className = 'online-metrics';
        container.innerHTML = `
            <h3>Online Algorithm Metrics</h3>
            <div class="metrics-grid">
                <div class="metric">
                    <span class="metric-label">BIT Counter:</span>
                    <span class="metric-value">${metrics.bit}</span>
                    <div class="metric-description">Tracks pattern changes</div>
                </div>
                <div class="metric">
                    <span class="metric-label">Time Since Last Update:</span>
                    <span class="metric-value">${formatTime(metrics.timestamp)}</span>
                    <div class="metric-description">Measures update frequency</div>
                </div>
                <div class="metric">
                    <span class="metric-label">Update Frequency:</span>
                    <span class="metric-value">${metrics.frequency} times</span>
                    <div class="metric-description">Total updates tracked</div>
                </div>
            </div>
        `;
        
        document.getElementById('predictions-container').appendChild(container);
    }
    
    // Utility Functions
    function calculateAverage(numbers) {
        return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }
    
    function findBestDayToBuy(predictions) {
        const bestDay = predictions.reduce((best, current) => {
            return current.predicted_price < best.predicted_price ? current : best;
        }, predictions[0]);
        return formatDate(bestDay.date);
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
    
    function formatTime(seconds) {
        if (seconds < 60) return `${Math.round(seconds)}s`;
        if (seconds < 3600) return `${Math.round(seconds/60)}m`;
        return `${Math.round(seconds/3600)}h`;
    }
    
    function showMessage(message, type) {
        let messageContainer = document.querySelector('.message-container');
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'message-container';
            document.querySelector('.container').insertBefore(messageContainer, document.getElementById('predictions-container'));
        }
    
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        
        // Clear message after 5 seconds unless it's an error
        if (type !== 'error') {
            setTimeout(() => {
                messageContainer.textContent = '';
                messageContainer.className = 'message-container';
            }, 5000);
        }
    }
    
    // Add CSS styles programmatically
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            display: none;
        }
        
        .message-container {
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            text-align: center;
        }
        
        .message-container.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message-container.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .message-container.info {
            background-color: #cce5ff;
            color: #004085;
            border: 1px solid #b8daff;
        }
        
        .predictions-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .summary-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .predictions-table {
            margin-top: 20px;
            overflow-x: auto;
        }
        
        .predictions-table table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .predictions-table th,
        .predictions-table td {
            padding: 10px;
            border: 1px solid #dee2e6;
        }
        
        .predictions-table th {
            background-color: #f8f9fa;
        }
        
        .predictions-table tr.weekend {
            background-color: #f8f9fa;
        }
        
        .predictions-table tr.holiday {
            background-color: #fff3cd;
        }
        
        .chart-container {
            margin: 20px 0;
            height: 400px;
        }
        
        .online-metrics {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }
        
        .metric {
            text-align: center;
            padding: 15px;
            background: white;
            border-radius: 6px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .metric-label {
            font-weight: bold;
            color: #495057;
        }
        
        .metric-value {
            display: block;
            font-size: 1.5em;
            margin: 10px 0;
            color: #007bff;
        }
        
        .metric-description {
            font-size: 0.9em;
            color: #6c757d;
        }
    `;
    
    document.head.appendChild(style);