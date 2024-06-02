import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { TextField, Button, Typography, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import './Firewall.css';

const Firewall = ({ service }) => {
    const [rules, setRules] = useState(service?.rules || []);

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
        <Box >
            <Box className="firewall-container">
                {service && (
                    <Box className="firewall-details">
                        <Typography variant="h5">{service.name}</Typography>
                        <Typography variant="body1">Number of Rules: {rules.length}</Typography>
                        <Box className={rules.length > 4 ? "rule-list scrollable" : "rule-list"}>
                            {rules.map((rule, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }} className="rule-item">
                                    <TextField
                                        variant="outlined"
                                        label="IP"
                                        value={rule.ip}
                                        onChange={e => handleChangeRule(index, 'ip', e.target.value)}
                                    />
                                    <TextField
                                        variant="outlined"
                                        label="Port"
                                        value={rule.port}
                                        onChange={e => handleChangeRule(index, 'port', e.target.value)}
                                    />
                                    <IconButton onClick={() => handleRemoveRule(index)}><Delete /></IconButton>
                                </Box>
                            ))}
                        </Box>
                        <Button variant="contained" onClick={handleAddRule} startIcon={<FaPlus />}>Add Rule</Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Firewall;
