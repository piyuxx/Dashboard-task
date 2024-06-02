import React, { useState } from 'react';
import Dropdown from './Dropdown';
import './object.css'

const ObjectStorage = ({ service }) => {


    console.log(service, "objectStorage")
    const calculateStorageUsage = () => {
        if (!service || !service.usage) return null;

        let totalStorageUsed = 0;
        let totalStorageCapacity = service.specs.disk;
        let freeStorageSpace = 0;
        let numberOfHits = 0;

        if (service.usage[0].hasOwnProperty('disk')) {
            totalStorageUsed = service.usage.reduce((acc, curr) => acc + curr.disk, 0);
        } else if (service.usage[0].hasOwnProperty('hits')) {
            numberOfHits = service.usage.reduce((acc, curr) => acc + curr.hits, 0);
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


            {service && (
                <div className="object-storage-details">
                    <h2>{service.name}</h2>
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
