import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import './App.css';
import ObjectStorage from './ObjectStorage';
import Firewall from './firewall';
const App = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedService, setSelectedService] = useState('services');
    const [navbar, setNavBar] = useState('')
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://servers.sanboxes.soulharsh007.dev/api/projects', {
                    headers: {
                        'Authorization': 'Bearer 9cea5f50-7058-49d2-85fd-14373aaa4c80',
                        'accept': 'application/json',
                    },
                });
                const res = response.data.data;
                setProjects(res);
                console.log(res, "result")
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectChange = selectedOption => {
        console.log(selectedOption, 'selected')
        let filter = projects.filter((filt) => filt.name == selectedOption.label)
        setSelectedProject(filter[0].services);
        console.log(filter[0].services, "filter")
        setSelectedService(null);
    };

    const handleServiceClick = service => {
        setSelectedService(service);
    };

    return (
        <div className="app">
            <Navbar
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
            />
            <div className="main-content">

                <Sidebar
                    onServiceClick={handleServiceClick}
                />
                {selectedService == 'services' && <Dashboard service={selectedProject} />}
                {selectedService == 'storage' && <ObjectStorage service={selectedProject} />}
                {selectedService == 'firewall' && <Firewall service={selectedProject} />}
            </div>

        </div>
    );
};

export default App;
