import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Firewall.css';

const Firewall = ({ service }) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [rules, setRules] = useState([]);

    const handleProjectChange = selectedOption => {
        const filter = service.find(filt => filt.name === selectedOption.label);
        setSelectedProject(filter);
        setRules(filter?.rules || []);
    };

    const handleAddRule = () => {
        const newRule = {
            ip: '',
            type: 'INBOUND',
            verdict: 'ALLOW',
            port: '',
            description: ''
        };
        setRules([...rules, newRule]);
    };

    const handleRemoveRule = index => {
        const updatedRules = [...rules];
        updatedRules.splice(index, 1);
        setRules(updatedRules);
    };

    const handleChangeRule = (index, field, value) => {
        const updatedRules = [...rules];
        updatedRules[index][field] = value;
        setRules(updatedRules);
    };

    if (!service) {
        return null;
    }

    return (
        <div className='center'>
            <div className="firewall-container">
                <Dropdown
                    projects={service}
                    selectedProject={selectedProject}
                    onProjectChange={handleProjectChange}
                />

                {selectedProject && (
                    <div className="firewall-details">
                        <h2>{selectedProject.name}</h2>
                        <p>Number of Rules: {rules.length}</p>
                        <div className="rule-list">
                            {rules.map((rule, index) => (
                                <div key={index} className="rule-item">
                                    <input
                                        type="text"
                                        placeholder="IP"
                                        value={rule.ip}
                                        onChange={e => handleChangeRule(index, 'ip', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Port"
                                        value={rule.port}
                                        onChange={e => handleChangeRule(index, 'port', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={rule.description}
                                        onChange={e => handleChangeRule(index, 'description', e.target.value)}
                                    />
                                    <button onClick={() => handleRemoveRule(index)}><FaMinus /></button>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleAddRule}><FaPlus /> Add Rule</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Firewall;
