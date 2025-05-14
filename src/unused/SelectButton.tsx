// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';

// const data = [
//   { icon: <People />, label: 'Authentication' },
//   { icon: <Dns />, label: 'Database' },
//   { icon: <PermMedia />, label: 'Storage' },
//   { icon: <Public />, label: 'Hosting' },
// ];


// export default function CustomizedList() {
//   const [open, setOpen] = React.useState(true);
//   return (
//         <Paper elevation={0} sx={{ maxWidth: 256 }}>
            
//             <Box sx={[open ? {
//                    bgcolor: 'rgba(71, 98, 130, 0.2)', }
//                  : { bgcolor: 'rgba(71, 98, 130, 0.2)',},
//                 open? {pb: 2, } : { pb: 0,  },]} >
//               <ListItemButton
//                 alignItems="flex-start"
//                 onClick={() => setOpen(!open)}
//                 sx={[{px: 3,
//                       pt: 2.5,},
//                   open? {  pb: 0,}: { pb: 2.5,  },
//                   open
//                     ? {'&:hover, &:focus': {
//                        '& svg': {opacity: 1,},
//                         }, }
//                     : {'&:hover, &:focus': {
//                         '& svg': {opacity: 0,},
//                         },
//                       },
//                 ]} >
//                 <ListItemText
//                   primary="Build"
//                   primaryTypographyProps={{
//                     fontSize: 15,
//                     fontWeight: 'medium',
//                     lineHeight: '20px',
//                     mb: '2px',
//                     color: open ? 'rgba(40,0,0,0)' : 'rgba(200,255,255,0.5)',
//                   }}
//                   secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
//                   secondaryTypographyProps={{
//                     noWrap: true,
//                     fontSize: 12,
//                     lineHeight: '16px',
//                     color: open ? 'rgba(40,0,0,0)' : 'rgba(200,255,255,0.5)',
//                   }}
//                   sx={{ my: 0 }}
//                 />
//                 <KeyboardArrowDown
//                   sx={[{ mr: -1,
//                       opacity: 0,
//                       transition: '0.2s', },
//                     open ? {  transform: 'rotate(-180deg)',}
//                       : { transform: 'rotate(0)', },
//                   ]}/>
//               </ListItemButton>
//               {open &&
//                 data.map((item) => (
//                   <ListItemButton
//                     key={item.label}
//                     sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
//                   >
//                     <ListItemText
//                       primary={item.label}
//                       primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
//                     />
//                   </ListItemButton>
//                 ))}
//             </Box>
//         </Paper>
//   );
// }

// import { useState } from 'react';
// import tres1 from '../compo/CONUS500.svg'
// import tres2 from '../compo/CONUS500_vo.svg'
// const LayerToggleDemo = () => {
//   // Track visibility state for multiple layers
//   const [layersVisible, setLayersVisible] = useState({
//     layer1: true,
//     layer2: true,
//     layer3: true
//   });
  
//   // Debug information to see current state
//   const [debugInfo, setDebugInfo] = useState("");
  
//   // Toggle function with logging
// interface LayerState {
//     layer1: boolean;
//     layer2: boolean;
//     layer3: boolean;
// }

// type LayerName = keyof LayerState;

// const toggleLayer = (layerName: LayerName): void => {
//     console.log(`Toggling ${layerName} from ${layersVisible[layerName]} to ${!layersVisible[layerName]}`);
    
//     setLayersVisible((prev: LayerState) => {
//         const newState: LayerState = {
//             ...prev,
//             [layerName]: !prev[layerName]
//         };
        
//         // Update debug info
//         setDebugInfo(`${layerName} set to: ${!prev[layerName]}`);
        
//         return newState;
//     });
// };
  
//   // Styling
//   const buttonStyle = (layerName: LayerName) => ({
//     padding: '10px 15px',
//     margin: '0 10px 10px 0',
//     backgroundColor: layersVisible[layerName] ? '#4CAF50' : '#f44336',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//     zIndex: 100, // Ensure button is above layers
//     position: 'relative' // Needed for z-index to work
//   });
  
//   const layerStyle = {
//     width: '100%',
//     height: '100px',
//     margin: '10px 0',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: 'white',
//     fontWeight: 'bold',
//     position: 'relative' as const, // Normal positioning for layers
//     pointerEvents: 'none' as const // Make sure layers don't block button clicks
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold mb-4">Layer Visibility Toggle Demo</h1>
      
//       {/* Debug Panel */}
//       <div className="bg-gray-100 p-3 mb-4 rounded">
//         <h3 className="font-bold">Debug Info:</h3>
//         <pre>{JSON.stringify(layersVisible, null, 2)}</pre>
//         {debugInfo && <p className="text-blue-600">{debugInfo}</p>}
//       </div>
      
//       {/* Buttons - in their own container above layers */}
//       <div className="mb-4 relative z-10">
//         <h2 className="text-xl mb-2">Control Buttons</h2>
//         <button 
//           onClick={() => toggleLayer('layer1')}
//         >
//           {layersVisible.layer1 ? "Hide" : "Show"} Layer 1
//         </button>
        
//         <button 
//           onClick={() => toggleLayer('layer2')}
//         >
//           {layersVisible.layer2 ? "Hide" : "Show"} Layer 2
//         </button>
        
//         <button 
//           onClick={() => toggleLayer('layer3')}
//         >
//           {layersVisible.layer3 ? "Hide" : "Show"} Layer 3
//         </button>
//       </div>
      
//       {/* Layer Container */}
//       <div className="relative">
//         <h2 className="text-xl mb-2">Layers</h2>
        
//         {/* Using display property to toggle visibility */}
//         <div 
//         >
//           Layer 1
//         </div>
        
//         <div 
//         >
//           Layer 2
//         </div>
        
//         <div 
//         >
//           Layer 3
//         </div>
//       </div>
      
//       {/* Alternative implementation using conditional rendering */}
//       <div className="mt-8">
//         <h2 className="text-xl mb-2">Alternative: Conditional Rendering</h2>
        
//         {layersVisible.layer1 && (
//           <div 
//           >
//             Layer 1 (Conditional Render)
//             <img 
//             src={tres1}
//             alt="Second image" 
//             style = {{position: 'absolute',left: 30, top: 50, zIndex:-2
//             //   visibility: visibleLayers.layer1 ? 'hidden' : 'visible'
//             }}
//           />
//           </div>
//         )}
        
//         {layersVisible.layer2 && (
//           <div 
//           >
//             Layer 2 (Conditional Render)
//           </div>
//         )}
        
//         {layersVisible.layer3 && (
//           <div 
//           >
//             Layer 3 (Conditional Render)
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LayerToggleDemo;