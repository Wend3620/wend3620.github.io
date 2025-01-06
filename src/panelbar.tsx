import * as React from 'react';

import { styled, createTheme} from '@mui/material/styles';
import { Slider, Stack,  Button, Box, } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// import './decor/helper.css' 

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;
const panelWidth = 300;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export const dayTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#F1F1F1',
    },
    secondary:{
      main: "#111111",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }

  }
});

export const PanelBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme }) => ({
      marginLeft: `calc(${theme.spacing(7)} + 6px)`,
      width: panelWidth,
      height: '100vh',
      boxShadow: "none",
      flexShrink: 0,
      whiteSpace: 'nowrap',
      variants: [
        {props: ({ open }) => open,
          style: {
            marginLeft: `calc(-3px + ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        },
        {
          props: ({ open }) => !open,
          style: {
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        },
      ],
    }));
  
interface SliderControlProps {
  value?: number;
  setValue?: any;
  min?: number;
  max?: number;
  step?: number;
  // initialValue?: number;
}
export const SliderControl: React.FC<SliderControlProps> = ({
    value,
    setValue,
    min = -24,
    max = 144,
    step = 6,
    
  }) => {
  const [isRunning, setIsRunning] = React.useState(false);
  const directionRef = React.useRef<"back" | "forward">("back");
  const intervalIdRef = React.useRef(0);
  const handleSliderChange = (event:any) => {
    setValue(Number(event.target.value));
  }; 

  const increment = () => {
    setValue((prev:number) => Math.min(prev + step, max));
  };

  const decrement= () => {
    setValue((prev:number) => Math.max(prev - step, min));
  };

  // For the player
  const handleBack = () => {
    directionRef.current = "back";
    if (!isRunning) {
      setIsRunning(true);
    }
  };
  const handleNext = () => {
    directionRef.current = "forward";
    if (!isRunning) {
      setIsRunning(true);
    }
  };
  const handleStop = () => {
    setIsRunning((r) => !r);
  };

  React.useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = window.setInterval(() => {
        if (directionRef.current === "forward") {
          increment();
        }
        if (directionRef.current === "back") {
          decrement();
        }
      }, 500);  //The number here is for the time interval between each frame
      console.log("run");
    }

    return () => {
      console.log("clear");
      return window.clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);
      
    // For the Slider module ---------------------------
    const marks = [{value: -24, label: '-24',},
    {value: 0, label: '0',},
    {value: 24, label: '24',},
    {value: 48, label: '48',},
    {value: 72, label: '72',},
    {value: 96, label: '96',},
    {value: 120, label: '120',},
    {value: 144, label: '144',},];

    function valuetext(value: number) {
      return `${value}h`;
    }
    return ( 
  <Stack direction="row"
          sx={{ ml:16, mt:1.5, py: 1.5, pr:-30, width: 600}}> 
          {/* borderRadius: '50%' */}
    <IconButton
      //"inherit"
      aria-label="play/stop"
      onClick={isRunning ? handleStop :handleBack}
      edge="start"
      sx={{transition: '0.5s', mt:-0.5,
        display: 'flex',flexDirection: 'column'}}
    >
      {isRunning && directionRef.current === "back" ? <PauseIcon/>: 
      <PlayArrowIcon sx={{transform: 'rotate(-180deg)'}}/>}
      { isRunning && directionRef.current === "back" ?
      <Typography variant="body2" sx={{width: 50}}>
          Stop
      </Typography> :
      <Typography variant="body2" sx={{width: 50}}>
          Back
      </Typography>}
    </IconButton>
    <IconButton
      //"inherit"
      aria-label="play/stop"
      onClick={isRunning ? handleStop :handleNext}
      edge="start"
      sx={{transition: '0.5s', mt:-0.5, display: 'flex',
        flexDirection: 'column'}}
    >
      {isRunning && directionRef.current === "forward" ? <PauseIcon/>: 
      <PlayArrowIcon/>}
      { isRunning && directionRef.current === "forward" ? 
      <Typography variant="body2" sx={{width: 50}}>
          Stop
      </Typography> :
      <Typography variant="body2" sx={{width: 50}}>
          Forward
      </Typography>}
    </IconButton>
    <Button variant="contained" size="small" 
    endIcon={<ArrowBackIosNewIcon sx={{mx: -0.5}}/>} onClick={decrement}
    sx={{mt: 0.2, height: 30, px:3, mr:0, fontSize: 15}}>
    Prev </Button>
    <Slider
      aria-label="Time"
      value={value}
      defaultValue={6}
      valueLabelDisplay="off"
      getAriaValueText={valuetext}
      shiftStep={6}
      step={6}
      marks={marks}
      min={-24}
      max={144}
      color='secondary'
      onChange={handleSliderChange}

      sx={{'& .MuiSlider-thumb': {
          borderRadius: '0px',
          width:0.02,
          boxShadow: '0px 0px 2px, rgba(0,0,0,0.24), 0px 0px 20px, rgba(0,0,0,0.2)',
        },ml:1}}
    />
    <Button variant="contained" size="small" 
    startIcon={<ArrowForwardIosIcon sx={{mr: -0.5}}/>} onClick={increment}
    sx={{mt: 0.2, height: 30, px:3, ml: 1, fontSize: 15}}>
    Next </Button>
  </Stack>
  )};

const data = [
    {label: 'CONUS' },
    {label: 'Midwest' },
    {label: 'Northeast' },
    ];
    



export function LayerSelect ({children}: {children?: React.ReactNode}){
    const [open, setOpen] = React.useState(true);

    // Animation
    const underlining = {
      link: {
        color: 'primary.main',
        position: 'relative',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: open ? panelWidth : '60%',
          height: '3px',
          bottom: '-5px',
          left: '-48px',
          transform: 'translate(0%,100%)',
          backgroundColor: 'black',
          transformOrigin: 'center',
          // visibility: 'hidden',
          transition: 'all 0.2s ease-in-out',
        },
        '&:hover:before': {
          visibility: 'visible',
          width: panelWidth,
        },
        
      },
    }
    return (
      <Box sx={{width: panelWidth}} >
        {/* [{width: panelWidth, mt:5}, open 
            ? {bgcolor: 'rgba(225, 160, 0, 1)',}
            : {bgcolor: 'rgba(225, 170, 0, 1)',},
          open? {pb: 2, } : { pb: 1,  }] */}
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={[{px: 3,
                pt: 1.5,},
            // open? {  pb: 0.8,}: { pb: 0.8,  },
            open ? {'&:hover, &:focus'
                : {'& svg': {opacity:1},}}
              : {'&:hover, &:focus': 
                {'& svg': {opacity: 1}},}]} >
            <KeyboardArrowDown
            sx={[{ ml: -2,
                opacity: 1,
                transition: '0.2s', },
              open ? {  transform: 'rotate(-180deg)'}
                : { transform: 'rotate(-90deg) '},
            ]}/>       
          <ListItemText
            primary="Sample Layer"
            primaryTypographyProps={{
              fontSize: 18,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px', 
              color: 'black', //open ? 'rgba(0,0,0,1)' : 'rgba(200,255,255,1)'
            }}
            // secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
            // secondaryTypographyProps={{
            //   noWrap: true,
            //   fontSize: 12,
            //   lineHeight: '16px',
            //   color: open ? 'rgba(0,0,0,1)' : 'rgba(200,255,255,1)',
            // }}
            sx={[{ my: 0, ml:2}, underlining.link]}
            
          />
          
        </ListItemButton>
        {open && children}
      </Box>
    );
  }

export function LocationSelect() {
    const [open, setOpen] = React.useState(true);
    // Animation
    const underlining = {
      link: {
        color: 'primary.main',
        position: 'relative',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: open ? panelWidth : '85%',
          height: '3px',
          bottom: '-5px',
          left: '-48px',
          transform: 'translate(0%,100%)',
          backgroundColor: 'black',
          transformOrigin: 'center',
          // visibility: 'hidden',
          transition: 'all 0.2s ease-in-out',
        },
        '&:hover:before': {
          visibility: 'visible',
          width: panelWidth,
        },
        
      },
    }
    return (
      <Box sx={{width: panelWidth, mt:5}} >
        {/* [{width: panelWidth, mt:5}, open 
            ? {bgcolor: 'rgba(225, 160, 0, 1)',}
            : {bgcolor: 'rgba(225, 170, 0, 1)',},
          open? {pb: 2, } : { pb: 1,  }] */}
        <ListItemButton
          alignItems="flex-start"
          onClick={() => setOpen(!open)}
          sx={[{px: 3,
                pt: 1.5,},
            // open? {  pb: 0.8,}: { pb: 0.8,  },
            open ? {'&:hover, &:focus'
                : {'& svg': {opacity:1},}}
              : {'&:hover, &:focus': 
                {'& svg': {opacity: 1}},}]} >
            <KeyboardArrowDown
            sx={[{ ml: -2,
                opacity: 1,
                transition: '0.2s', },
              open ? {  transform: 'rotate(-180deg)'}
                : { transform: 'rotate(-90deg) '},
            ]}/>       
          <ListItemText
            primary="Region (Sample)"
            primaryTypographyProps={{
              fontSize: 18,
              fontWeight: 'medium',
              lineHeight: '20px',
              mb: '2px', 
              color: 'black', //open ? 'rgba(0,0,0,1)' : 'rgba(200,255,255,1)'
            }}
            sx={[{ my: 0, ml:2}, underlining.link]}
            
          />
         
        </ListItemButton>
        {open &&
          data.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ mt:1 ,py: 0, minHeight: 32 }} //, color: 'rgba(255,255,255,.8)'
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
              />
            </ListItemButton>
          ))
          }
      </Box>
    );
  }

