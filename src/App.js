import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Firewall from './firewall';
import Dashboard from './Dashboard';
import './App.css';
import ReportCard from './ReportCard';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';

// assets
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

import useMediaQuery from '@mui/material/useMediaQuery';

const App = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const theme = useTheme();
    const gridSpacing = 3;
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('https://servers.sanboxes.soulharsh007.dev/api/projects', {
                    headers: {
                        'Authorization': 'Bearer 9cea5f50-7058-49d2-85fd-14373aaa4c80',
                        'accept': 'application/json',
                    },
                });
                const res = response.data.data;
                setProjects(res);
                console.log(res, "result")
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleProjectChange = selectedOption => {
        const filter = projects.filter(project => project.name === selectedOption.label);
        setSelectedProject(filter.length > 0 ? filter[0].services : []);
        setDropdownValue(null);
    };

    const handleProjectChanges = selectedOption => {
        const filter = selectedProject.find(service => service.name === selectedOption.label);
        setDropdownValue(filter);
    };

    const calculateStorageUsage = () => {
        if (!dropdownValue || !dropdownValue.usage) return null;

        let totalStorageUsed = 0;
        let totalStorageCapacity = dropdownValue.specs.disk;
        let freeStorageSpace = 0;
        let numberOfHits = 0;

        if (dropdownValue.usage[0].hasOwnProperty('disk')) {
            totalStorageUsed = dropdownValue.usage.reduce((acc, curr) => acc + curr.disk, 0);
        } else if (dropdownValue.usage[0].hasOwnProperty('hits')) {
            numberOfHits = dropdownValue.usage.reduce((acc, curr) => acc + curr.hits, 0);
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
    const isLargeScreen = useMediaQuery('(min-width:1000px)');
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(min-width:600px) and (max-width:1000px)');


    return (
        <div className="app">

            <Navbar
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
                onProjectChanges={handleProjectChanges}
                dropdownValue={dropdownValue}
            />
            {dropdownValue && <div>
                <Grid container spacing={gridSpacing} style={{ marginTop: "10px" }} >
                    <Grid item xs={12} style={isLargeScreen ? { marginLeft: "100px" } : { marginLeft: "50px" }}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item lg={3} sm={5} xs={10}  >
                                <ReportCard
                                    primary={dropdownValue?.specs?.cpu || 0}
                                    secondary="CPU"
                                    color={theme.palette.warning.main}
                                    footerData="Performance OF CPU"
                                    iconFooter={TrendingUpIcon}
                                />
                            </Grid>
                            <Grid item lg={2.5} sm={5} xs={10}>
                                <ReportCard
                                    primary={dropdownValue?.specs?.disk || 0}
                                    secondary="Disk"
                                    color={theme.palette.error.main}
                                    footerData="Disk Performance"
                                    iconFooter={TrendingDownIcon}
                                />
                            </Grid>
                            <Grid item lg={2.5} sm={5} xs={10}>
                                <ReportCard
                                    primary={dropdownValue?.specs?.memory || 0}
                                    secondary="Memory"
                                    color={theme.palette.success.main}
                                    footerData="Memory Performance"
                                    iconFooter={TrendingUpIcon}
                                />
                            </Grid>
                            <Grid item lg={3} sm={5} xs={10}>
                                <ReportCard
                                    primary={dropdownValue?.type || "NONE"}
                                    secondary="Type"
                                    color={theme.palette.primary.main}
                                    footerData="Type of the Project"
                                    iconFooter={TrendingUpIcon}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} lg={5} sm={3} md={3} style={{ marginTop: "50px", marginLeft: "0px" }}>

                    <Grid container spacing={4}>
                        <Grid item lg={10} xs={14} sm={10} md={10}>
                            <Grid container spacing={9} style={isLargeScreen ? { marginLeft: "20px" } : {}}>

                                <Grid item xs={10.9} sm={8} lg={6} md={9} sx={!isSmallScreen ? { marginLeft: "30px" } : {}}>
                                    <Dashboard service={dropdownValue} />
                                </Grid>
                                <Grid item xs={11} sm={12} lg={5} sx={isSmallScreen ? { marginLeft: "20px" } : isMediumScreen ? { marginLeft: "20px" } : {}}>
                                    <Firewall service={dropdownValue} />
                                </Grid>
                            </Grid>
                        </Grid>



                        <Grid item lg={10

                        } xs={10} sm={10} style={isLargeScreen ? { marginLeft: "100px", marginRight: "0px" } : { marginLeft: "20px" }}>

                            <Card>
                                <CardHeader
                                    title={
                                        <Typography component="div" className="card-header">
                                            Sources
                                        </Typography>
                                    }
                                />
                                <Divider />
                                <CardContent>
                                    <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="body2">Total Storage Used</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="right">
                                                        {storageUsage?.totalStorageUsed || " "} GB
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" aria-label="direct" value={80} color="primary" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Grid container alignItems="center" >
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="body2">Total Storage Capacity</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="right">
                                                        {storageUsage?.totalStorageCapacity || 0} GB
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" aria-label="Social" value={storageUsage?.totalStorageCapacity || 0} color="secondary" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="body2">Free Storage Space</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="right">
                                                        {storageUsage?.freeStorageSpace || 0} GB
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" aria-label="Referral" value={storageUsage?.freeStorageSpace || 0} color="primary" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="body2">Total No. of Hits</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" align="right">
                                                        {storageUsage?.numberOfHits || 0}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <LinearProgress variant="determinate" aria-label="Bounce" value={storageUsage?.numberOfHits || 0} color="secondary" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" spacing={1}>
                                                <Grid item sm zeroMinWidth>
                                                    <Typography variant="body2"> Total Capacity of hits</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body1" align="left">
                                                        Infinity
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={14} md={14} sm={14}>
                                                    <LinearProgress variant="determinate" aria-label="Internet" value={100} color="primary" />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>

                            </Card>

                        </Grid>

                    </Grid>

                </Grid>
            </div>
            }
        </div >
    );
};

export default App;
