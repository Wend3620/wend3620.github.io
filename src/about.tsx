 // import {Navigate} from "react-router-dom";
import { Box } from "@mui/material";
import MiniDrawer from "./miniDrawer";
import { Component } from "./trial";
export default function About() {
    return(
    <>
    <MiniDrawer/>
    <Box sx={{mt:10, ml: 10}}>
        <p></p>
        <h1>Hello!</h1>
        <p>This is still an experiment!</p>
        <p>Please wait for more features!</p>
        <a href="https://wend3620.github.io/">Home</a>
        <Component/>
    </Box>
    </>
    );
}
