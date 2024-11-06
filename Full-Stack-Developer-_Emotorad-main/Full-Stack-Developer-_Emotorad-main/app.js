import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import Chart from 'chart.js/auto';

const App = () => {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);

    const handleLogin = async (googleData) => {
        const res = await axios.post('http://localhost:5000/auth/google', {
            token: googleData.tokenId,
        });
        setUser(res.data);
    };

    const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/data');
        setData(res.data);
    };

    useEffect(() => {
        if (user) fetchData();
    }, [user]);

    const renderChart = () => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.title),
                datasets: [{
                    label: 'Value',
                    data: data.map(d => d.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    };

    useEffect(() => {
        if (data.length > 0) renderChart();
    }, [data]);

    return (
        <div>
            {!user ? (
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={handleLogin}
                    onFailure={(e) => console.error(e)}
                    cookiePolicy={'single_host_origin'}
                />
            ) : (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <canvas id="myChart" width="400" height="200"></canvas>
                </div>
            )}
        </div>
    );
};

export default App;
