 // import {Navigate} from "react-router-dom";
import { Box, Divider, Typography} from "@mui/material"; //, useMediaQuery
import MiniDrawer from "./miniDrawer";
// import { dayTheme } from "./theme";
import * as React from 'react';
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
        <p>This is a website that I have spent about three folds of planned time to finish.</p>
        <p>As you may see, many options are still unavailable. They will be gradually available in future days. Stay tuned!</p>
        <p>---- 5-26-2025</p>
        {/* <a href="https://wend3620.github.io/">Home</a>
        */}
        {/* <Box>Practice Zone
          <Divider/>
          <Box sx={{mt:10}}>
        <Component/> 
        <PhotoGallery/>
        </Box>
        </Box> */}
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

interface Photo {
  id: number;
  name: string;
  url: string;
  caption: string;
}

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/photos');
      const data: Photo[] = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPhotos} disabled={loading}>
        {loading ? 'Loading...' : 'Load Photos'}
      </button>
      
      <Box sx={{ width:800, display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {photos.map(photo => (
          <div key={photo.id}>
            <img 
              src={`http://localhost:5000${photo.url}`}
              alt={photo.caption}
              style={{ width: '100%', height: '50%', objectFit: 'fill' }}
            />
            <p>{photo.caption}</p>
          </div>
        ))}
      </Box>
    </div>
  );
};

function Component() {


    const jsonData = {
      "users": [
          {
              "name": "alan", 
              "age": 23,
              "username": "aturing"
          },
          {
              "name": "john", 
              "age": 29,
              "username": "__john__"
          }
      ],
      'message': "I just want to say hello"
    }
  
    function handleClick() {
      
      // Send data to the backend via POST
      fetch('http://localhost:5000/api/receive-data', {  // Enter your IP address here
  
        method: 'POST', 
        // mode: 'cors', 
        // credentials: 'include',
        headers: {
          
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Access-Control-Allow-Origin':'*'
        },
        
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  
      }).then((response) => response.json())
      .then((data) => {
         console.log(data);
         // Handle data
      })
      .catch((err) => {
         console.log(JSON.stringify(err));
      });
      
    }
    return (
      <>
      <button onClick={handleClick} tabIndex={0} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        Send data to backend
      </button>
      </>
    );
  
  }
  
  export { Component };
