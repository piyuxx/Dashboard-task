import { Colors } from 'chart.js';
import React from 'react';
import Select from 'react-select';

const Dropdown = ({ projects, selectedProject, onProjectChange }) => {
    const noProjectsMessage = "Select";



    return (
        <div className="dropdown-container">
            {projects ? (
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={projects.map(project => ({
                        value: project.id,
                        label: project.name,
                        Colors: '#517DFF'
                    }))}
                    onChange={onProjectChange}
                    placeholder="Select a project"

                />
            ) : (
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={[{ value: '', label: noProjectsMessage }]}
                    isDisabled={true}
                    placeholder={noProjectsMessage}

                />
            )}
        </div>
    );
};

export default Dropdown;
