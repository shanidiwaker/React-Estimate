import * as React from 'react';
import Grid from "@mui/material/Grid";
import { db } from '../firebase-config';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { jsPDF } from "jspdf";
import "jspdf-autotable";


function Download() {
    const [platformData, setPlatformData] = React.useState(null);
    const [platform, setPlatform] = React.useState('');
    const [rawData, setRawData] = React.useState()
    const [selectedProject, setSelectedProject] = React.useState([])
    const [projectName, setProjectName] = React.useState('');
    const [type, setType] = React.useState('');
    const platformRef = collection(db, 'Platform');
    const usersCollectionRef = collection(db, 'estimation');
    const [shortedArray, setShortedArray] = React.useState([])

    React.useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const platformData = await getDocs(platformRef);
        let pData = platformData.docs?.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPlatformData(pData)
        const item = await getDocs(usersCollectionRef);
        let data = item.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRawData(data)
        console.log("datadata", data);

    };

    const selectPlatform = (value) => {
        var arr = [];
        setPlatform(value);
        arr = rawData.filter((v, i) => {
            return v.platform == value
        })
        setShortedArray(arr);
    }



    const selectProject = (value) => {
        var arr = [];
        setProjectName(value);
        arr = shortedArray.filter((v, i) => {
            return v.projectName == value
        })
        setSelectedProject(arr);
    };
    const handleChange2 = (event) => {
        setType(event.target.value);
    };

    const getPdf = () => {
        const doc = new jsPDF();
        var tableColumn = ["DASHBOARD DETAILS", ""];

        var ProjectData = [
            ["Project Name", selectedProject[0].projectName],
            [""],
            ["PROJECT WILL BE BUILT"],
            ["Platform", selectedProject[0].platform],
            ["presenters", "1"],
            [""],
            ["NUMBER OF USERS ATTENDED"],
            ["Attendees",],
            ["presenters", "1"],
            [""],
            ["TOTAL NUMBER OF QUESTIONS",],
            ["NUMBER OF ANSWERED QUESTIONS",],
            [""],
            ["NUMBER OF FILES",],
            ["NUMBER OF DOWNLOADS",],
        ];
        doc.autoTable(tableColumn, ProjectData, { startY: 20 });
        doc.save(`Project.pdf`);
    }
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
                                onChange={(eve) => {
                                    selectPlatform(eve.target.value)
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "10px" }}
                            >
                                {platformData?.map((v) => (
                                    <MenuItem value={v.title} sx={{ marginBottom: '3px' }}>{v?.title}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box my={2}>
                            <InputLabel id="demo-simple-select-label">Select Project Name</InputLabel>
                            <Select
                                value={projectName}
                                labelId="demo-simple-select-label"
                                onChange={(eve) => {
                                    selectProject(eve.target.value)
                                }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "10px" }}
                            >
                                {shortedArray?.map((v) => (
                                    <MenuItem value={v.projectName} sx={{ marginBottom: '3px' }}>{v?.projectName}</MenuItem>
                                ))}
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
                                color="info"
                                onClick={getPdf}  >
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
