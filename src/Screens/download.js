import * as React from 'react';
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function Download() {
    const [platform, setPlatform] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setPlatform(event.target.value);
    };
    const handleChange1 = (event) => {
        setProjectName(event.target.value);
    };
    const handleChange2 = (event) => {
        setType(event.target.value);
    };
    return (
        <DashboardLayout>
            <MDTypography variant="h3" fontWeight="medium" mt={1}>
                Download
            </MDTypography>
            <Grid container sx={{ display: "flex", justifyContent: "center", margin: "15px 0px" }}>
                <Grid item lg={6} md={8} sm={12} xs={12}>
                    <Box component='form' role="form">
                        <Box my={2}>
                            <InputLabel id="demo-simple-select-label">Select Platform</InputLabel>
                            <Select
                                value={platform}
                                labelId="demo-simple-select-label"
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "10px" }}
                            >
                                <MenuItem value={10} sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                                <MenuItem value={20} sx={{ marginBottom: '3px' }}>IOS</MenuItem>
                                <MenuItem value={30} sx={{ marginBottom: '3px' }}>Android</MenuItem>
                                <MenuItem value={40} sx={{ marginBottom: '3px' }}>Flutter</MenuItem>
                                <MenuItem value={50} sx={{ marginBottom: '3px' }}>API</MenuItem>
                                <MenuItem value={60}>Website</MenuItem>
                            </Select>
                        </Box>
                        <Box my={2}>
                            <InputLabel id="demo-simple-select-label">Select Project Name</InputLabel>
                            <Select
                                value={projectName}
                                labelId="demo-simple-select-label"
                                onChange={handleChange1}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "10px" }}
                            >
                                <MenuItem value={10} sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                            </Select>
                        </Box>
                        <Box my={2}>
                            <InputLabel id="demo-simple-select-label" >Select Type</InputLabel>
                            <Select
                                value={type}
                                labelId="demo-simple-select-label"
                                onChange={handleChange2}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "10px" }}
                            >
                                <MenuItem value={10} sx={{ marginBottom: '3px' }}>CSV</MenuItem>
                                <MenuItem value={20} sx={{ marginBottom: '3px' }}>PDF</MenuItem>
                            </Select>
                        </Box>
                        <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                            <MDButton variant="gradient"
                                color="info"  >
                                Download
                            </MDButton>
                        </MDBox>
                    </Box>
                </Grid>
            </Grid>

        </DashboardLayout>
    );
}

export default Download;
