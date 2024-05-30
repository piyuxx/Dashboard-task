import React from 'react';
import Dropdown from './Dropdown';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';

const Dashboard = ({ service }) => {
    const [selectedProject, setSelectedProject] = React.useState(null);

    const handleProjectChange = selectedOption => {
        const filter = service.find(filt => filt.name === selectedOption.label);
        setSelectedProject(filter);
    };

    if (!service) {
        return null;
    }

    return (
        <div className="dashboard-container">
            <Dropdown
                projects={service}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
            />
            {selectedProject && (
                <div>
                    <h3>{selectedProject.name} Usage Chart</h3>
                    <LineChart usage={selectedProject.usage} type={selectedProject.type} />
                </div>
            )}
            {!selectedProject && <div>Please select a project to see details.</div>}
        </div>
    );
};

const LineChart = ({ usage, type }) => {
    const labels = usage.map((_, index) => `Sample ${index + 1}`);
    let datasets = [];

    if (type === "HOT") {
        datasets = [
            {
                label: 'Objects',
                data: usage.map(sample => sample.objects),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Size',
                data: usage.map(sample => sample.size),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: 'Hits',
                data: usage.map(sample => sample.hits),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ];
    } else {
        const isRequestsData = usage.length > 0 && 'requests' in usage[0];

        datasets = [
            {
                label: isRequestsData ? 'Requests' : 'CPU Usage',
                data: usage.map(sample => isRequestsData ? sample.requests : sample.cpu),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: isRequestsData ? 'Allowed Percentage' : 'Memory Usage',
                data: usage.map(sample => isRequestsData ? sample.allowed * 100 : sample.memory),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
                label: isRequestsData ? 'Blocked Percentage' : 'Disk Usage',
                data: usage.map(sample => isRequestsData ? sample.blocked * 100 : sample.disk),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ];
    }

    const data = {
        labels: labels,
        datasets: datasets,
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
