 // import {Navigate} from "react-router-dom";
import { Box, Typography} from "@mui/material"; //, useMediaQuery
import MiniDrawer from "./miniDrawer";
// import { Component } from "./trial";
// import { dayTheme } from "./theme";
// import * as React from 'react';
export default function About() {
    // const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
    //const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
    // let panelWidth = isTablet? 200 :260 
    return(
    <>
    <MiniDrawer/>
    <Box sx={{mt:10, ml: 10}}>
        <p></p>
        <h1>Hello!</h1>
        <p>This is still an experiment!</p>
        <p>Please wait for more features!</p>
        {/* <a href="https://wend3620.github.io/">Home</a>
        <Component/> */}

        <div className="absolute right-0 bottom-0 w-64 h-48 z-0">
        
        </div>
    </Box>
    <Box sx={{position: 'absolute', bottom: 0, right: 0,}}>
        <Typography variant="body2" color="text.secondary" align="center">
          <span className="mr-1">Copyright © </span>
        <span>2025 Tropoview. All Rights Reserved.</span>
        </Typography>
    </Box>
    </>
    );
}
