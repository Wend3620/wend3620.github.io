// import React, { useState } from 'react';
// import { Box, Typography, Container, Divider, useMediaQuery } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { dayTheme } from './theme';
// const App = () => {
//   // State to track which link is being hovered
//   const [hoveredLink, setHoveredLink] = useState<string | null>(null);
//   const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
//   const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
//   // Links data
//   const links = [
//     { id: 'blog', label: 'Blog' },
//     { id: 'projects', label: 'Projects' },
//     { id: 'information', label: 'Information' }
//   ];

//   return (
//     <Container maxWidth="md" sx={{ py: 0, height: '90vh', display: 'flex', 
//     flexDirection: 'column', maxWidth: '100vw', ml:'2vw'}}>
//       <Box sx={{ mt: 6,}}>
//         <Typography variant="h2" component="h1" sx={{ 
//           fontWeight: 'bold', 
//           mb: 1,
//           fontFamily: '"Times New Roman", serif',
//         }}>
//           Hello
//         </Typography>
//         <Typography sx={{ m2: 4 }}>
//           Since you are already here, I don't mind you to look around.
//         </Typography>
//       </Box>

//       <Box sx={{ ml: 2, mt: 10 }}>
//         {links.map((link) => (
//           <Box 
//             key={link.id}
//             sx={{ 
//               display: 'flex',
//               alignItems: 'center',
//               mb: 1.5,
//               cursor: 'pointer'
//             }}
//             onMouseEnter={() => setHoveredLink(link.id)}
//             onMouseLeave={() => setHoveredLink(null)}
//           >
//             <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
//             <Typography 
//               component="span"
//               sx={{ 
//                 ml: 1,
//                 textDecoration: hoveredLink === link.id ? 'underline' : 'none',
//                 fontWeight: 'medium',
//               }}
//             >
//               {link.label}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
      
//       <Divider sx={{position: 'absolute', bottom:'10%', width: isMobile?'82vw':`calc(90vw - 4vw)`,
//         justifyContent:'center', mx:'auto'}} />
//     </Container>
//   );
// };

// export default App;