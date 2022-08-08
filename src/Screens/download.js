/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import * as React from 'react';
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDTypography from "components/MDTypography";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Material Dashboard 2 React components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { color } from '@mui/system';
import { Info } from '@mui/icons-material';

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
            {/* <DashboardNavbar /> */}
            <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px' }}>
                <MDTypography variant="h5" fontWeight="medium" mt={1}>
                    Platform
                </MDTypography>
                <FormControl sx={{ width: '40%', marginLeft: '60px' }}>
                    <InputLabel id="demo-simple-select-label">Select Platform</InputLabel>
                    <Select
                        value={platform}
                        labelId="demo-simple-select-label"
                        label="Platform Select"
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'With label' }}
                        sx={{ height: '40px' }}
                    >
                        <MenuItem value={10} sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                        <MenuItem value={20} sx={{ marginBottom: '3px' }}>IOS</MenuItem>
                        <MenuItem value={30} sx={{ marginBottom: '3px' }}>Android</MenuItem>
                        <MenuItem value={40} sx={{ marginBottom: '3px' }}>Flutter</MenuItem>
                        <MenuItem value={50} sx={{ marginBottom: '3px' }}>API</MenuItem>
                        <MenuItem value={60}>Website</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px' }}>
                <MDTypography variant="h5" fontWeight="medium" mt={1}>
                    Project Name
                </MDTypography>
                <FormControl sx={{ width: '40%', marginLeft: '17px' }}>
                    <InputLabel id="demo-simple-select-label">Select Project Name</InputLabel>
                    <Select
                        value={projectName}
                        labelId="demo-simple-select-label"
                        label="Select Project Name"
                        onChange={handleChange1}
                        displayEmpty
                        inputProps={{ 'aria-label': 'With label' }}
                        sx={{ height: '40px' }}
                    >
                        <MenuItem value={10} sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px' }}>
                <MDTypography variant="h5" fontWeight="medium" mt={1}>
                    Type
                </MDTypography>
                <FormControl sx={{ width: '40%', marginLeft: '95px' }}>
                    <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                    <Select
                        value={type}
                        labelId="demo-simple-select-label"
                        label="Select Type"
                        onChange={handleChange2}
                        displayEmpty
                        inputProps={{ 'aria-label': 'With label' }}
                        sx={{ height: '40px' }}
                    >
                        <MenuItem value={10} sx={{ marginBottom: '3px' }}>CSV</MenuItem>
                        <MenuItem value={20} sx={{ marginBottom: '3px' }}>PDF</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <MDBox mt={8} mb={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                <MDButton variant="gradient"
                    color="info" halfWidth >
                    Download
                </MDButton>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default Download;
