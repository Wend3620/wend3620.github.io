 // import {Navigate} from "react-router-dom";
import { Box} from "@mui/material";
import MiniDrawer from "./miniDrawer";
import { Component } from "./trial";
// import tres1 from './compo/CONUS500.svg'
// import tres2 from './compo/CONUS500_vo.svg'
// import {useState} from 'react'
export default function About() {
    //   interface LayerState {
    //     layer1: boolean;
    //     layer2: boolean;
    // }
    // type LayerName = keyof LayerState;
    // const [visibleLayers, setVisibleLayers] = useState({
    //   layer1: true,
    //   layer2: true,
    // });

    // const toggleLayer = (layerName: LayerName): void => {
    //   setVisibleLayers((prev: LayerState) => ({
    //       ...prev,
    //       [layerName]: !prev[layerName]
    //   }));
    // };
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
        {/* <div className="relative w-96 h-64"> 
        <Button onClick={() => toggleLayer('layer1')} sx={{zIndex:10}}
          > {visibleLayers.layer1 ? "Hide" : "Show"} layer1 </Button>
        <Button onClick={() => toggleLayer('layer2')} sx={{zIndex:10}} > 
        {visibleLayers.layer1 ? "Hide" : "Show"} layer2 </Button>
        {/* First image */}
        {/* <div className="absolute left-0 top-0 w-64 h-48 z-10">
          {visibleLayers.layer1&& <img 
            src={tres1}
            alt="Second image" 
            style = {{position: 'absolute',left: 30, top: 50,
              zIndex:0
            }}
          />}
          {visibleLayers.layer2 && (<img 
            src={tres2}
            alt="Second image" 
            style = {{position: 'absolute',left: 30, top: 50, zIndex:1}}
          />)}

        </div>  */}
        <div className="absolute right-0 bottom-0 w-64 h-48 z-0">
        
        </div>
    </Box>
    </>
    );
}
