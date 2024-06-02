import { Colors } from 'chart.js';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const Dropdown = ({ projects, selectedProject, onProjectChange }) => {
    const noProjectsMessage = "Select";
    const [value, setValue] = useState()
    useEffect(() => {
        setValue('')
    }, [projects])
    const handleProjectChange = (selectedOption) => {
        setValue(selectedOption);
        onProjectChange(selectedOption);
    };
    return (
        <div >
            {projects ? (
                <Select
                    className="react-select-container"
                    classNamePrefix="react-select"
                    options={projects.map(project => ({
                        value: project.id,
                        label: project.name,
                        Colors: '#517DFF'
                    }))}
                    value={value}
                    onChange={handleProjectChange}
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
