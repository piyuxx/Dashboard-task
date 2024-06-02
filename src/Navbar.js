import React from 'react';
import Select from 'react-select';
import './Navbar.css';
import Dropdown from './Dropdown';
const Navbar = ({ projects, selectedProject, onProjectChange, onProjectChanges, drodownValue }) => {
    console.log(projects, "projects")
    return (
        <nav className="navbar" >

            <div className="dropdown-container" style={{}}>
                <div>

                    <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        options={projects.map(project => ({
                            value: project.id,
                            label: project.name
                        }))}

                        onChange={onProjectChange}
                        placeholder="Select"
                    />
                </div>
                <div>
                    <Dropdown
                        projects={selectedProject}
                        onProjectChange={onProjectChanges}
                        drodownValue={drodownValue}
                    />
                </div>
            </div >
        </nav >
    );
};

export default Navbar;