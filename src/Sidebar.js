import React from 'react';
import './Sidebar.css'; // Uncomment if you are using an external CSS file

const Sidebar = ({ onServiceClick }) => {
    const service = ['services', 'storage', 'firewall']

    return (
        <div className="sidebar">
            <h2>Services</h2>
            <ul>
                {service.map(service => (
                    <li key={service.slug} onClick={() => onServiceClick(service)}>
                        {service}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
