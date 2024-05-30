import React from 'react';
import Select from 'react-select';

const Dropdown = ({ projects, selectedProject, onProjectChange }) => {

    return (

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

    );
};

export default Dropdown;
