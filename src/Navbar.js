import React from 'react';
import Select from 'react-select';
import './Navbar.css';

const Navbar = ({ projects, selectedProject, onProjectChange }) => {

    return (
        <nav className="navbar" style={{ backgroundColor: 'rgb(220,220,220)' }}>
            <h1>My Projects</h1>
            <div className="dropdown-container">
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={projects.map(project => ({
                        value: project.id,
                        label: project.name
                    }))}

                    onChange={onProjectChange}
                    placeholder="Select a project"
                />
            </div>
        </nav>
    );
};

export default Navbar;
