/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Box from '@mui/material/Box';

import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

export default function Data() {
    const [info, setInfo] = useState([]);
    const usersCollectionRef = collection(db, 'estimation');



    return {
        columns: [
            { Header: "index", accessor: "index", align: "center" },
            { Header: "Project Name", accessor: "projectname", align: "left" },
            { Header: "Main Functionality", accessor: "mainFunctionality", align: "left" },
            { Header: "Sub Functionality", accessor: "subFunctionality", align: "left" },
            { Header: "Hours", accessor: "hours", align: "left" },
            { Header: "Operations", accessor: "operations", align: "left" },
        ],

        rows: [
            {
                index: <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                    1
                </MDTypography>,
                projectname: (
                    <Box sx={{}}>
                        <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                            {/* {info?.projectName} */}
                            Shani
                        </MDTypography>
                    </Box>
                ),
                mainFunctionality: (
                    <MDBox>
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            SignUp
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Login
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Social Login
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Notifications
                        </MDTypography>
                    </MDBox>
                ),
                subFunctionality:
                    <MDBox> <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                        SignUp
                    </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Name, DOB, Email, Mobile No, Id, Password
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                            Login
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Name,Email, Password
                        </MDTypography>
                    </MDBox>,
                hours: (
                    <MDBox>
                        <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                            Total Hour:
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            SignUp(10)
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Login(6)
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Social Login(4)
                        </MDTypography><br />
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Notifications(5)
                        </MDTypography><br />
                    </MDBox>
                ),
                operations: <MDBox>
                    <MDTypography component="a" href="#" variant="text" color="text" fontWeight="medium">
                        Only Edit & Delete
                    </MDTypography><br />
                </MDBox>,
            }

        ],
    };
}
