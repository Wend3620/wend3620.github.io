import MiniDrawer from "./blueDrawer.tsx";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import './decor/helper.css' 


export default function Page1(){

  //   const [isOpen, setIsOpen] = React.useState(false);
  // if (isOpen){
  //   document.documentElement.style.setProperty('--unlockChoices', 'auto')
  //   document.documentElement.style.setProperty('--unlock', '0')
  // }else{
  //   document.documentElement.style.setProperty('--unlockChoices', 'none')
  //   document.documentElement.style.setProperty('--unlock', 'blur(0.6rem)')
  // }

    return (
        <>
            <MiniDrawer/>
            <Box sx={{position: 'absolute', bottom: 0, right: 0,}}>
              <Typography variant="body2" color="text.secondary" align="center">
                <span className="mr-1">Copyright © </span>
              <span>2025 Tropoview. All Rights Reserved.</span>
              </Typography>
          </Box>
            {/* <Box sx={{position: 'relative', pointerEvents:'auto', mt:20, mx: '75%', zIndex: 0}}>
            <button className='fool' onClick={() => setIsOpen(!isOpen)}>Log in?</button> 
              </Box> */}

            {/* <Box display="flex" justifyContent="center"
                alignContent="center" height="100vh"> */}
               {/* <Typography paragraph>
                Text
            </Typography> */}
               
            {/* </Box> */}

            {/* <img src={test1} width='1400px' 
            style={{top:'15%', left:'12%', position:'absolute',zIndex:-2}} className='img'/> */}
        </>

    )
}

