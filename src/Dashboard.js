import React, { useState } from 'react';
import Dropdown from './Dropdown';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import './Dashboard.css'
import useMediaQuery from '@mui/material/useMediaQuery';

const Dashboard = ({ service }) => {
    console.log(service, "maps")

    const [selectedProject, setSelectedProject] = useState(null);
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const handleProjectChange = selectedOption => {
        const filter = service.find(filt => filt.name === selectedOption.label);
        setSelectedProject(filter);
    };

    if (!service) {
        return null;
    }

    return (
        <div className="dashboard-container" style={isSmallScreen ? {

            maxWidth: '90vw',
            overflowX: 'auto',
            zIndex: '999',
            position: 'relative'
        } : {}}>

            {service && (
                <div style={isSmallScreen ? { width: '500px', font: 'Montserrat' } : {}}>
                    <h3>{service.name} Usage Chart</h3>
                    <LineChart usage={service.usage || []} />
                </div>
            )}
            {!service && <div>Please select a project to see details.</div>}
        </div>
    );
};

const LineChart = ({ usage }) => {
    const labels = usage.map((_, index) => `Sample ${index + 1}`);

    const isRequestsData = usage.length > 0 && 'requests' in usage[0];

    const cpuData = isRequestsData ? usage.map(sample => sample.requests) : usage.map(sample => sample.cpu);
    const memoryData = isRequestsData ? usage.map(sample => sample.allowed * 100) : usage.map(sample => sample.memory);
    const diskData = isRequestsData ? usage.map(sample => sample.blocked * 100) : usage.map(sample => sample.disk);

    const data = {
        labels: labels,
        datasets: [
            {
                label: isRequestsData ? 'Requests' : 'CPU Usage',
                data: cpuData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: isRequestsData ? 'Allowed Percentage' : 'Memory Usage',
                data: memoryData,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: isRequestsData ? 'Blocked Percentage' : 'Disk Usage',
                data: diskData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Samples',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};


export default Dashboard;