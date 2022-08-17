import * as React from 'react';
import { useState, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography, Card, CardContent, Grid, Divider, Button } from '@mui/material';
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function AddEstimation() {
    // const [platform, setPlatform] = React.useState('');
    // const [projectName, setProjectName] = React.useState('');
    // const [type, setType] = React.useState('');
    const [state, setState] = useState({ users: [] });
    const [status, setStatus] = React.useState([]);
    const [rows, setRows] = useState([]);
    // const [note, setNote] = React.useState('');
    const [checked, setChecked] = React.useState(false);
    const usersCollectionRef = collection(db, 'estimation');
    const funcsCollectionRef = collection(db, 'Sub functionality');
    const [currentEvent, setCurrentEvent] = useState({
        platform: '',
        projectName: '',
        type: '',
        status: [],
        note: ''
    })
    const addUser = () => {
        setState({
            users: [...state.users, <User />]
        })
    }

    useEffect(() => {
        getData();
    }, [setRows]);

    const getData = async () => {
        const item = await getDocs(funcsCollectionRef);
        setRows(item.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(item);
    };
    const toppings = [
        {
            name: "Name",
        },
        {
            name: "Email",
        },
        {
            name: "Password",
        },
        {
            name: "Mobile no.",
        },
        {
            name: "Address",
        },
    ];

    const User = () => {
        return (
            <MDBox py={3} px={2}
                variant="gradient" bgColor="white" borderRadius="lg" coloredShadow="info"
                sx={{ width: { lg: "550px", md: "550px", sm: "100%" }, marginTop: "10px" }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormControl sx={{ width: { lg: "550px", md: "550px", sm: "100%", xs: "100%" }, height: '40px' }}>
                        <Select
                            value={currentEvent?.type}
                            onChange={handleChange2}
                            variant="filled"
                            sx={{ width: { lg: "150px", md: "550px", sm: "100%", } }}
                        >
                            <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                            <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                            <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                            <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: "wrap" }}>
                    {toppings.map(({ name, price }, index) => {
                        return (
                            <FormControlLabel sx={{ margin: "0px 5px", display: "grid" }} htmlFor={`custom-checkbox-${index}`} control={<Checkbox
                                type="checkbox" id={`custom-checkbox-${index}`}
                                name={name} value={name}
                                checked={checkedState[index]}
                                onChange={(name) => handleOnChange(index, name)}
                            />} label={name} />
                        )
                    })}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", flexDirection: { sm: "column", md: "row" } }}>
                    <MDTypography variant="h6" fontWeight="medium" mr={2} sx={{ float: "left" }}>
                        Hours
                    </MDTypography>
                    <MDInput type="text" label="Enter Total Hours" variant="outlined" sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                        value={total} onChange={(e) => { setTotal(e.target.value) }} />
                </Box>
            </MDBox>
        )
    }

    const handleChange1 = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (event) => {
        setCurrentEvent({ ...currentEvent, platform: event.target.value });
    };

    const handleChange2 = (event) => {
        setCurrentEvent({ ...currentEvent, type: event.target.value });
    };
    const handleSubmit = async () => {
        console.log(currentEvent, checkedState, total);
        await addDoc(usersCollectionRef, {
            platform: currentEvent?.platform,
            projectName: currentEvent?.projectName,
            projectName: currentEvent?.projectName,
            type: currentEvent?.type,
            checkedState: status,
            total: total,
            note: currentEvent?.note
        })
    };
    const [checkedState, setCheckedState] = useState(
        new Array(toppings.length).fill(false)
    );

    const [total, setTotal] = useState();

    const handleOnChange = (position, name) => {

        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedState(updatedCheckedState);
        updatedCheckedState.map((v, i) => {
            toppings[i].status = v;
        })
        console.log("position, name", toppings);
        setStatus(toppings);

        // const totalHours = updatedCheckedState.reduce(
        //     (sum, currentState, index) => {
        //         if (currentState === true) {
        //             return sum + toppings[index].hours;
        //         }
        //         return sum;
        //     },
        //     0
        // );
        // setTotal(totalHours);
    };

    // const getFormattedHours = (hours) => `${hours.toFixed(2)}`;

    return (
        <DashboardLayout>
            <MDTypography variant="h3" fontWeight="medium" mt={1}>
                Add New Estimation
            </MDTypography>
            <Grid container sx={{ display: "flex", justifyContent: "center", margin: "15px 0px" }}>
                <Grid item lg={6} md={8} sm={12} xs={12}>
                    <Box component='form' role="form">
                        <Box my={3}>
                            <InputLabel id="demo-simple-select-label"> Platform</InputLabel>
                            <Select
                                value={currentEvent?.platform}
                                labelId="demo-simple-select-label"
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'With label' }}
                                fullWidth sx={{ height: '40px', marginTop: "8px" }}
                            >
                                <MenuItem value='React Native' sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                                <MenuItem value='IOS' sx={{ marginBottom: '3px' }}>IOS</MenuItem>
                                <MenuItem value='Android' sx={{ marginBottom: '3px' }}>Android</MenuItem>
                                <MenuItem value='Flutter' sx={{ marginBottom: '3px' }}>Flutter</MenuItem>
                                <MenuItem value='API' sx={{ marginBottom: '3px' }}>API</MenuItem>
                                <MenuItem value='Website'>Website</MenuItem>
                            </Select>
                        </Box>
                        <Box my={3}>
                            <InputLabel id="demo-simple-select-label"> Project Name</InputLabel>
                            <MDInput type="text" variant="outlined" fullWidth sx={{ height: '40px', marginTop: "8px" }}
                                value={currentEvent?.projectName} onChange={(e) => { setCurrentEvent({ ...currentEvent, projectName: e.target.value }) }} />
                        </Box>
                        <Box my={3}>
                            <InputLabel id="demo-simple-select-label">Select Functionality</InputLabel>
                            <Grid container>
                                <Grid item lg={10} md={10} sm={10} xs={9}>
                                    <Select
                                        value={currentEvent?.type}
                                        labelId="demo-simple-select-label"
                                        onChange={handleChange2}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'With label' }}
                                        fullWidth sx={{ height: '40px', marginTop: "8px" }}
                                    >
                                        <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                                        <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                                        <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                                        <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item lg={2} md={2} sm={2} xs={3} sx={{ padding: "8px 0px 0px 10px", textAlign: "right" }}>
                                    <MDButton variant="gradient"
                                        onClick={addUser}
                                        color="info"  >
                                        Add
                                    </MDButton>
                                </Grid>


                            </Grid>
                        </Box>
                        {currentEvent?.type &&
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "column" } }}>
                                <MDTypography variant="h5" fontWeight="medium" mr={2}>
                                    Sub Functionality
                                </MDTypography>
                                <MDBox py={3} px={2}
                                    variant="gradient" bgColor="white" borderRadius="lg" coloredShadow="info"
                                    sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormControl sx={{ width: { lg: "550px", md: "550px", sm: "100%", xs: "100%" }, height: '40px' }}>
                                            <Select
                                                value={currentEvent?.type}
                                                onChange={handleChange2}
                                                variant="filled"
                                                sx={{ width: { lg: "150px", md: "550px", sm: "100%", } }}
                                            >
                                                <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                                                <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                                                <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                                                <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                                            </Select>
                                        </FormControl>

                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: "wrap" }}>
                                        {toppings.map(({ name, price }, index) => {
                                            return (
                                                <FormControlLabel sx={{ margin: "0px 5px", display: "grid" }} htmlFor={`custom-checkbox-${index}`} control={<Checkbox
                                                    type="checkbox" id={`custom-checkbox-${index}`}
                                                    name={name} value={name}
                                                    checked={checkedState[index]}
                                                    onChange={(name) => handleOnChange(index, name)}
                                                />} label={name} />
                                            )
                                        })}
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", flexDirection: { sm: "column", md: "row" } }}>
                                        <MDTypography variant="h6" fontWeight="medium" mr={2} sx={{ float: "left" }}>
                                            Hours
                                        </MDTypography>
                                        <MDInput type="text" label="Enter Total Hours" variant="outlined" sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                            value={total} onChange={(e) => { setTotal(e.target.value) }} />
                                    </Box>
                                </MDBox>
                                {state.users}
                            </Box>
                        }
                        <Box my={3}>
                            <InputLabel id="demo-simple-select-label">   Add Notes</InputLabel>
                            <MDInput type="text" variant="outlined" fullWidth sx={{ height: '40px', marginTop: "8px" }}
                                value={currentEvent?.note} onChange={(e) => { setCurrentEvent({ ...currentEvent, note: e.target.value }) }} />
                        </Box>
                        <MDBox mt={4} mb={1} sx={{ textAlign: "center" }}>
                            <MDButton variant="gradient" onClick={handleSubmit} color="info"  >
                                Save
                            </MDButton>
                        </MDBox>
                    </Box>
                </Grid>
            </Grid>
            {/* <Grid container spacing={0} sx={{ display: "flex", justifyContent: "space-around" }}>
                <Grid item
                    lg={8}
                    sm={12}
                    xs={12}>
                    <Box>
                        <Grid component="form" role="form">
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "row" } }}>
                                <MDTypography variant="h5" fontWeight="medium" mr={2}>
                                    Platform
                                </MDTypography>
                                <FormControl sx={{ width: { lg: "550px", md: "550px", sm: "100%" }, height: '40px' }}>
                                    <InputLabel id="demo-simple-select-label">Select Platform</InputLabel>
                                    <Select
                                        value={currentEvent?.platform}
                                        labelId="demo-simple-select-label"
                                        label="Platform Select"
                                        onChange={handleChange}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'With label' }}
                                        sx={{ width: { lg: "550px", md: "550px", sm: "100%" }, height: '40px' }}

                                    >
                                        <MenuItem value='React Native' sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                                        <MenuItem value='IOS' sx={{ marginBottom: '3px' }}>IOS</MenuItem>
                                        <MenuItem value='Android' sx={{ marginBottom: '3px' }}>Android</MenuItem>
                                        <MenuItem value='Flutter' sx={{ marginBottom: '3px' }}>Flutter</MenuItem>
                                        <MenuItem value='API' sx={{ marginBottom: '3px' }}>API</MenuItem>
                                        <MenuItem value='Website'>Website</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "row" } }}>
                                <MDTypography variant="h5" fontWeight="medium" mr={2} sx={{ float: "left" }}>
                                    Project Name
                                </MDTypography>
                                <MDInput type="text" label="Enter Project Name" variant="outlined" sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                    value={currentEvent?.projectName} onChange={(e) => { setCurrentEvent({ ...currentEvent, projectName: e.target.value }) }} />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "row" } }}>
                                <MDTypography variant="h5" fontWeight="medium" mr={2}>
                                    Main Functionality
                                </MDTypography>
                                <FormControl sx={{ width: { lg: "550px", md: "550px", sm: "100%", xs: "100%" }, height: '40px' }}>
                                    <InputLabel id="demo-simple-select-label">Select Functionality</InputLabel>
                                    <Select
                                        value={currentEvent?.type}
                                        labelId="demo-simple-select-label"
                                        label="Select Functionality"
                                        onChange={handleChange2}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'With label' }}
                                        sx={{ width: { lg: "550px", md: "550px", sm: "100%", height: '40px' } }}
                                    >
                                        <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                                        <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                                        <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                                        <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                                    </Select>
                                </FormControl>
                                <MDButton variant="gradient"
                                    onClick={addUser}
                                    color="info" halfWidth >
                                    Add
                                </MDButton>
                            </Box>
                            {currentEvent?.type &&
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "column" } }}>
                                    <MDTypography variant="h5" fontWeight="medium" mr={2}>
                                        Sub Functionality
                                    </MDTypography>
                                    <MDBox py={3} px={2}
                                        variant="gradient" bgColor="white" borderRadius="lg" coloredShadow="info"
                                        sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                    >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <FormControl sx={{ width: { lg: "550px", md: "550px", sm: "100%", xs: "100%" }, height: '40px' }}>
                                                <Select
                                                    value={currentEvent?.type}
                                                    onChange={handleChange2}
                                                    variant="filled"
                                                    sx={{ width: { lg: "150px", md: "550px", sm: "100%", } }}
                                                >
                                                    <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                                                    <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                                                    <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                                                    <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                                                </Select>
                                            </FormControl>
                                        
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: "space-between", flexWrap: "wrap" }}>
                                            {toppings.map(({ name, price }, index) => {
                                                return (
                                                    <FormControlLabel sx={{ margin: "0px 5px", display: "grid" }} htmlFor={`custom-checkbox-${index}`} control={<Checkbox
                                                        type="checkbox" id={`custom-checkbox-${index}`}
                                                        name={name} value={name}
                                                        checked={checkedState[index]}
                                                        onChange={(name) => handleOnChange(index, name)}
                                                    />} label={name} />
                                                )
                                            })}
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", flexDirection: { sm: "column", md: "row" } }}>
                                            <MDTypography variant="h6" fontWeight="medium" mr={2} sx={{ float: "left" }}>
                                                Hours
                                            </MDTypography>
                                            <MDInput type="text" label="Enter Total Hours" variant="outlined" sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                                value={total} onChange={(e) => { setTotal(e.target.value) }} />
                                        </Box>
                                    </MDBox>
                                    {state.users}
                                </Box>
                            }
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", flexDirection: { sm: "column", md: "row" } }}>
                                <MDTypography variant="h5" fontWeight="medium" >
                                    Add Notes
                                </MDTypography>
                                <MDInput type="text" label="Enter Note Here" variant="outlined" sx={{ width: { lg: "550px", md: "550px", sm: "100%" } }}
                                    value={currentEvent?.note} onChange={(e) => { setCurrentEvent({ ...currentEvent, note: e.target.value }) }} />
                            </Box>
                            <Box style={{ textAlign: 'center', marginTop: '50px' }}>
                                <MDButton variant="gradient" onClick={handleSubmit} color="info" halfWidth >
                                    Save
                                </MDButton>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </Grid> */}

            {/* <DashboardNavbar /> */}
            {/* <Box sx={{ margin: "auto", Width: "800px" }}>
                <Box sx={{ display: "flex", alignItems: "center", marginTop: "15px" }}>
                    <MDTypography variant="h5" fontWeight="medium" mt={1} mr={3}>
                        Platform
                    </MDTypography>
                    <FormControl sx={{ width: '40%' }}>
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
                            <MenuItem value='React Native' sx={{ marginBottom: '3px' }}>React Native</MenuItem>
                            <MenuItem value='IOS' sx={{ marginBottom: '3px' }}>IOS</MenuItem>
                            <MenuItem value='Android' sx={{ marginBottom: '3px' }}>Android</MenuItem>
                            <MenuItem value='Flutter' sx={{ marginBottom: '3px' }}>Flutter</MenuItem>
                            <MenuItem value='API' sx={{ marginBottom: '3px' }}>API</MenuItem>
                            <MenuItem value='Website'>Website</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>
                    <MDTypography variant="h5" fontWeight="medium" mt={1} mr={3}>
                        Project Name
                    </MDTypography>
                    <MDInput type="text" label="Enter Project Name" variant="outlined" sx={{ width: '40%' }}
                        value={projectName} onChange={(e) => { setProjectName(e.target.value) }} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>
                    <MDTypography variant="h5" fontWeight="medium" mt={1} mr={3}>
                        Main<br /> Functionality
                    </MDTypography>
                    <FormControl sx={{ width: '40%', }}>
                        <InputLabel id="demo-simple-select-label">Select Functionality</InputLabel>
                        <Select
                            value={type}
                            labelId="demo-simple-select-label"
                            label="Select Functionality"
                            onChange={handleChange2}
                            displayEmpty
                            inputProps={{ 'aria-label': 'With label' }}
                            sx={{ height: '40px' }}
                        >
                            <MenuItem value='Login' sx={{ marginBottom: '3px' }}>Login</MenuItem>
                            <MenuItem value='Signup' sx={{ marginBottom: '3px' }}>Signup</MenuItem>
                            <MenuItem value='Notifications' sx={{ marginBottom: '3px' }}>Notifications</MenuItem>
                            <MenuItem value='Logout' sx={{ marginBottom: '3px' }}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                    
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px" }}>
                    <MDTypography variant="h5" fontWeight="medium" mt={1} mr={3}>
                        Sub<br /> Functionality
                    </MDTypography>
                    <MDBox
                        py={3}
                        px={2}
                        variant="gradient"
                        bgColor="white"
                        borderRadius="lg"
                        coloredShadow="info"
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <MDTypography variant="h6" color="black">
                                Signup
                            </MDTypography>
                            <MDTypography variant="h6" color="black">
                                Hours: {getFormattedPrice(total)}
                            </MDTypography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {toppings.map(({ name, price }, index) => {
                                return (
                                    <FormGroup>
                                        <FormControlLabel htmlFor={`custom-checkbox-${index}`} control={<Checkbox
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={checkedState[index]}
                                            onChange={(name) => handleOnChange(index, name)}
                                        />} label={name} />
                                    </FormGroup>

                                )
                            })}
                        </Box>
                    </MDBox>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "45px" }}>
                    <MDTypography variant="h5" fontWeight="medium" mt={1} mr={3}>
                        Add Notes
                    </MDTypography>
                    <MDInput type="text" label="Enter Note Here" variant="outlined" sx={{ width: '40%' }}
                        value={note} onChange={(e) => { setNote(e.target.value) }} />
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <MDButton variant="gradient"
                        onClick={handleSubmit}
                        color="info" halfWidth >
                        Save
                    </MDButton>
                </Box>
            </Box> */}

        </DashboardLayout>
    );
}

export default AddEstimation;
