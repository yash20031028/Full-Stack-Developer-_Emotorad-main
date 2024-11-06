import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Dashboard.css';

const Dashboard = ({ data }) => {
    useEffect(() => {
        const ctx = document.getElementById('chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.title),
                datasets: [{
                    label: 'Data Value',
                    data: data.map(d => d.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }, [data]);

    return (
        <div className="dashboard">
            <h2>Analytics</h2>
            <canvas id="chart" width="400" height="200"></canvas>
        </div>
    );
};

export default Dashboard;
