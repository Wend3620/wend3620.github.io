import 'bootstrap/dist/css/bootstrap.min.css';  
import './decor/buggy.css' ;
import { Box, Typography} from "@mui/material";
// import {Navigate} from "react-router-dom";

export default function Buggy() {
    document.body.setAttribute('class', 'back');
    return(
    <div className='space'>
        <p></p>
        <h1>Hello!</h1>
        <p>Perhaps the page you are looking at could be precisely described by the name of the landscape in the background photo...</p>
        <a href="https://wend3620.github.io/">Home</a>
        <Box sx={{position: 'absolute', bottom: 0, right: 0,}}>
              <Typography variant="body2" color="text.secondary" align="center">
                <span className="mr-1">Copyright © </span>
              <span>2025 Tropoview. All Rights Reserved.</span>
              </Typography>
        </Box>
    </div>
    );
}

