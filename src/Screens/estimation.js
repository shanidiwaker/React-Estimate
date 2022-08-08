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
import React, { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";

// Data
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'

// Material Dashboard 2 React components
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";

//Table
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper,
    Button, Card, Grid, CardContent, Typography, Box,
} from "@mui/material";

function Estimation() {
    const [platform, setPlatform] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [rows, setRows] = useState([]);
    const [type, setType] = React.useState('');
    const usersCollectionRef = collection(db, 'estimation');
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        getData();
    }, [setRows]);

    const getData = async () => {
        const item = await getDocs(usersCollectionRef);
        setRows(item.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        console.log(item);
    };

    const handleChange = (event) => {
        setPlatform(event.target.value);
    };
    const handleChange1 = (event) => {
        setProjectName(event.target.value);
    };
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array?.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis?.map((el) => el[0]);
    }
    const headCells = [
        {
            id: "index",
            numeric: false,
            disablePadding: false,
            label: "Index",
        },
        {
            id: "project name",
            numeric: false,
            disablePadding: false,
            label: "Project Name",
        },
        {
            id: "main functionality",
            numeric: false,
            disablePadding: false,
            label: "Main Functionality",
        },
        {
            id: "sub functionality",
            numeric: false,
            disablePadding: false,
            label: "Sub Functionality",
        },
        {
            id: "hours",
            numeric: false,
            disablePadding: false,
            label: "Hours",
        }
    ];

    function EnhancedTableHead(props) {
        const {
            order,
            orderBy,
            onRequestSort,
        } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead sx={{ display: 'contents' }}>
                <TableRow>

                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                <Typography variant="subtitle1" fontWeight="500">
                                    {headCell.label}
                                </Typography>
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc" ? "sorted descending" : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(["asc", "desc"]).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows?.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    return (
        <DashboardLayout>
            <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '10px' }}>
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
            <Box sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px' }}>
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
            <Box mt={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ flex: 1, justifyContent: 'center' }}>
                    <MDTypography variant="h6" textAlign='center'>
                        Estimation List
                    </MDTypography>
                </Box>
                <Box sx={{ right: 0 }}>
                    <MDButton variant="gradient"
                        component={Link}
                        to="/addEstimation"
                        color="info" halfWidth >
                        Add New
                    </MDButton>
                </Box>
            </Box>
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Projects Table
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <Paper sx={{ width: "100%", mb: 2, }}>
                                    <TableContainer >
                                        <Table
                                            sx={{ minWidth: 750 }}
                                            aria-labelledby="tableTitle"
                                            size={dense ? "small" : "medium"}
                                        >
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={handleSelectAllClick}
                                                onRequestSort={handleRequestSort}
                                                rowCount={rows?.length}
                                            />
                                            {rows?.length > 0 ?
                                                <TableBody>
                                                    {stableSort(rows, getComparator(order, orderBy))
                                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                        ?.map((row, index) => {
                                                            var func = row.checkedState.map((p) => {
                                                                if (p.status == true)
                                                                    return <p>{p.name}<br /></p>
                                                            })
                                                            // console.log('======>', func)
                                                            const isItemSelected = isSelected(row.name);
                                                            const labelId = `enhanced-table-checkbox-${index}`;

                                                            return (
                                                                <TableRow
                                                                    hover
                                                                    onClick={(event) => handleClick(event, row.name)}
                                                                    role="checkbox"
                                                                    tabIndex={-1}
                                                                    // aria-checked={isItemSelected}
                                                                    key={row.id}
                                                                // selected={isItemSelected}
                                                                >
                                                                    <TableCell>
                                                                        {index + 1}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                                            {row.projectName}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                                            {row.type}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                                            {func}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                                            {row.total}
                                                                        </Typography>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {emptyRows > 0 && (
                                                        <TableRow
                                                            style={{
                                                                height: (dense ? 33 : 53) * emptyRows,
                                                            }}
                                                        >
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                                :
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell style={{ textAlign: "center", padding: "20px 0px" }} colSpan={5}><h2>  No Event Found  !</h2></TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            }
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}

export default Estimation;



