import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Dropdown from './Dropdown';
import './object.css'

const ObjectStorage = ({ service }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleProjectChange = selectedOption => {
        const filter = service.find(filt => filt.name === selectedOption.label);
        setSelectedProject(filter);
    };

    const calculateStorageUsage = () => {
        if (!selectedProject || !selectedProject.usage) return null;

        let totalStorageUsed = 0;
        let totalStorageCapacity = selectedProject.specs.disk;
        let freeStorageSpace = 0;
        let numberOfHits = 0;

        if (selectedProject.usage[0].hasOwnProperty('disk')) {
            totalStorageUsed = selectedProject.usage.reduce((acc, curr) => acc + curr.disk, 0);
        } else if (selectedProject.usage[0].hasOwnProperty('hits')) {
            numberOfHits = selectedProject.usage.reduce((acc, curr) => acc + curr.hits, 0);
        }

        freeStorageSpace = totalStorageCapacity - totalStorageUsed;

        return {
            totalStorageUsed,
            totalStorageCapacity,
            freeStorageSpace,
            numberOfHits
        };
    };

    const storageUsage = calculateStorageUsage();

    if (!service) {
        return null;
    }

    return (
        <div className="object-storage-container">
            <Dropdown
                projects={service}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
            />

            {selectedProject && (
                <div className="object-storage-details">
                    <h2>{selectedProject.name}</h2>
                    {storageUsage && (
                        <div>
                            <p>Total Storage Used: {storageUsage.totalStorageUsed} GB</p>
                            <p>Total Storage Capacity: {storageUsage.totalStorageCapacity} GB</p>
                            <p>Free Storage Space: {storageUsage.freeStorageSpace} GB</p>
                            {storageUsage.numberOfHits !== undefined && (
                                <p>Number of Hits: {storageUsage.numberOfHits}</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ObjectStorage;
