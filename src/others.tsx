import MiniDrawer from "./miniDrawer"
// import * as React from 'react';
//styled, Theme, CSSObject,createTheme,
import {  ThemeProvider} from '@mui/material/styles';
import { Box,useMediaQuery, CssBaseline} from '@mui/material';
//, BoxProps, Toolbar
import { Typography } from "@mui/material";
import { PanelBar } from './panelbar';
import { dayTheme } from "./theme";
// const drawerWidth = 240;
// // Smaller drawer width for tablet
// const tabletDrawerWidth = 200;
// const mobileappbar = 180;
const appBarHeight = 70;

// interface Blog {
//   title: string;
//   preview: string;
//   content: string;
//   timestamp: string;
// }

// const BlogPreview: React.FC = () => {
//   const [expanded, setExpanded] = React.useState<boolean>(false);
  
//   // Sample blog data
//   const blog: Blog = {
//     title: "Getting Started with React and Material UI",
//     preview: "Learn how to set up your first React project with Material UI components for beautiful, responsive interfaces.",
//     timestamp: "May 17, 2025",
//     content: `
//       # Getting Started with React and Material UI

//       React is a popular JavaScript library for building user interfaces, and Material UI is a comprehensive component library that implements Google's Material Design.

//       ## Why Use Material UI?
      
//       Material UI provides a set of reusable, well-tested components that follow Material Design principles. This means you can create beautiful, consistent UIs without having to build everything from scratch.
      
//       ## Setting Up Your Project
      
//       To get started with React and Material UI, you'll need to set up a new React project and install the Material UI package.
      
//       First, create a new React project using Create React App:
      
//       \`\`\`
//       npx create-react-app my-app
//       cd my-app
//       \`\`\`
      
//       Then, install Material UI:
      
//       \`\`\`
//       npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
//       \`\`\`
      
//       ## Using Material UI Components
      
//       Now you can start using Material UI components in your React app. Import the components you need and use them in your JSX.
      
//       For example, to add a button:
      
//       \`\`\`jsx
//       import Button from '@mui/material/Button';
      
//       function App() {
//         return (
//           <Button variant="contained" color="primary">
//             Hello World
//           </Button>
//         );
//       }
//       \`\`\`
      
//       ## Theming
      
//       Material UI also provides a theming system that allows you to customize the look and feel of your components.
      
//       \`\`\`jsx
//       import { createTheme, ThemeProvider } from '@mui/material/styles';
      
//       const theme = createTheme({
//         palette: {
//           primary: {
//             main: '#1976d2',
//           },
//           secondary: {
//             main: '#dc004e',
//           },
//         },
//       });
      
//       function App() {
//         return (
//           <ThemeProvider theme={theme}>
//             {/* Your components */}
//           </ThemeProvider>
//         );
//       }
//       \`\`\`
      
//       ## Conclusion
      
//       With React and Material UI, you can quickly build beautiful, responsive web applications without having to reinvent the wheel. Start exploring the wide range of components available and customize them to fit your needs.
//     `
//   };

//   // Function to toggle expanded state
//   const toggleExpanded = (): void => {
//     setExpanded(!expanded);
//   };

//   // Function to create HTML from markdown
//   const createMarkup = (content: string) => {
//     return { __html: content };
//   };

//   return (

//     <Box>
//       <Box 
//       >
//         <h2 >{blog.title}</h2>
        
//         {!expanded && (
//           <p >{blog.preview}</p>
//         )}
//       </Box>
      
//       {/* {expanded && (
//         <>
//           <Box dangerouslySetInnerHTML={createMarkup(blog.content)}/>
//           <button onClick={toggleExpanded}>
//             Show Less
//           </button>
//         </>
//       )} */}
      
//       <Box>
//         {blog.timestamp}
//       </Box>
//     </Box>
//   );
// };



export default function OtherTools(){
    const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
    let panelWidth = isTablet? 200 :260 
    // const [open, setOpen] = React.useState(false);
    
      // const handleDrawerOpen = () => {
      //   setOpen(true);
      // };
    
      // const handleDrawerClose = () => {
      //   setOpen(false);
      // };
      //open={open}
    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* Top line, could be removed */}
        <ThemeProvider theme={dayTheme}>
        <MiniDrawer/>
        {!isMobile && <PanelBar position='fixed' sx={[{left:0, mt: 0, zorder: 10,
              maxWidth:panelWidth, color: 'black'}]} >
        <Typography variant="h4" sx={{fontWeight: 'Bold', color: 'black',
            letterSpacing: 6,position: 'fixed', 
            left: panelWidth/2, top: '50%'}}>
                Other Tools
        </Typography>
        <Typography sx={{color: 'black', fontSize:16,position: 'fixed', 
            left: panelWidth/2, top: '55%'}}>
                (Content will be added soon)
        </Typography>
        </PanelBar>}
        {isMobile &&  <><Typography variant="h4" sx={{fontWeight: 'Bold', color: 'black',
            letterSpacing: 6,position: 'fixed', top: appBarHeight+10,
            left: '52%', transform: 'translateX(-50%)'}}>
                Other Tools
        </Typography>
        <Typography sx={{color: 'black', fontSize:16,position: 'fixed', 
            left: '52%', transform: 'translateX(-50%)', 
            top: appBarHeight+50,}}>
                (Content will be added soon)
        </Typography></>}
        <Box sx={{position: 'absolute', bottom: 0, right: 0,}}>
              <Typography variant="body2" color="text.secondary" align="center">
                <span className="mr-1">Copyright © </span>
              <span>2025 Tropoview. All Rights Reserved.</span>
              </Typography>
        </Box>
        </ThemeProvider>
        </Box>
        
    )

}