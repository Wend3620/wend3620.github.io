import * as React from 'react';
import { styled, createTheme} from '@mui/material/styles';
import { Slider, Stack,  Button, Box, Collapse, useMediaQuery, Skeleton,
  SwipeableDrawer, CssBaseline,} from '@mui/material';
import { Global } from '@emotion/react';
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

const tabletDrawerWidth = 200;
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const dayTheme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#F1F1F1',
    },
    secondary: {
      main: "#111111",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      }
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 1280,
      lg: 1640,
      xl: 1836,
    },
  },
});
const panelWidth = 260;
export const PanelBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    
    })<AppBarProps>(({ theme }) => ({
      
      marginLeft: `calc(${theme.spacing(7)} + 6px)`,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
      },
      maxWidth: panelWidth,
      height: '100vh',
      boxShadow: "none",
      flexShrink: 0,
      variants: [
        {props: ({ open }) => open,
          style: {
            [theme.breakpoints.between('sm', 'md')]: {
              marginLeft: `calc(-3px + ${tabletDrawerWidth}px)`,
            },
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
  sx?: any;
  // initialValue?: number;
}
export const SliderControl: React.FC<SliderControlProps> = ({
    value,
    setValue,
    min = -24,
    max = 144,
    step = 6,
    sx
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
          sx = {sx}> 
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
    const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
    const panelWidth = isTablet?200:260;
    // Animation
    
    const underlining = {
      link: {
        color: 'primary.main',
        position: 'relative',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: open ? isMobile? '100%': panelWidth : '60%',
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
          width: isMobile? '100%': panelWidth,
        },
        
      },
    }
    return (
      <Box sx={{width: isMobile? '100%': panelWidth}} >
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
    const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
    const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
    const panelWidth = isTablet?200:260;
    const underlining = {
      link: {
        color: 'primary.main',
        position: 'relative',

        '&:before': {
          content: "''",
          position: 'absolute',
          width: open ? isMobile? '100%': panelWidth : '85%',
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
          width: isMobile? '100%': panelWidth,
        },
        
      },
    }
    return (
      <Box sx={{width: isMobile? '100%': panelWidth, mt:0}} >
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
            // open ? {'&:hover, &:focus'
            //   : {'& svg': {opacity:1},}}
            // : {'&:hover, &:focus': 
            //   {'& svg': {opacity: 1}},}
            ]} >
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

export const PressureControl: React.FC<SliderControlProps> = ({
    value,
    setValue,
    min = 100,
    max = 1000,
  }) => {
  const [open, setOpen] = React.useState(true);
  const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
  const panelWidth = isTablet?200:260;
  const handleToggle = (): void => {
    setOpen((prev) => !prev);
  };
  const handleSliderChange = (event:any) => {
    setValue(Number(event.target.value));
  }; 


  const increment1 = (value: any) => {
    if (value > 700)
    setValue((value: number) => Math.min(value + 50, max));
    else if (value == 250)
      setValue((value: number) => Math.min(value + 150, max));
    else if (value < 250)
      setValue((value: number) => Math.min(value + 75, max));
    else
      setValue((value: number) => Math.min(value + 100, max));
    };

    const decrement1 = (value: any) => {
      if (value > 800)
      setValue((value: number) => Math.min(value - 50, max));
      else if (value == 400)
        setValue((value: number) => Math.min(value - 150, max));
      else if (value < 300)
        setValue((value: number) => Math.min(value - 75, max));
      else
        setValue((value: number) => Math.min(value - 100, max));
      };

    // For the Slider module ---------------------------
    const marks = [{value: 100, label: '1000',},
    {value: 175, label: '925',},
    {value: 250, label: '850',},
    {value: 400, label: '700',},
    {value: 500, label: '600',},
    {value: 600, label: '500',},
    {value: 700, label: '400',},
    {value: 800, label: '300',},
    {value: 850, label: '250',},
    {value: 900, label: '200',},
    {value: 950, label: '150',},
    {value: 1000, label: '100',},];

    function valuetext(label: number) {
      return `${label}h`;
    }
    return ( 
  <Stack direction="column"
          sx={[{ ml: 41, height: 460, width:80, mt: 9,
          zIndex:10,backgroundColor:'transparent',},
          isTablet&& {ml:33, height: 460,}]}> 
          {/* borderRadius: '50%' */}
    <Collapse in={open} timeout={300}>
    <Stack direction="column" sx = {{maxHeight: 400, width: 80,
    pr: 4,borderLeft:3, pt:2,borderColor:'secondary', backgroundColor:'white'}}>
    
    <Slider
      aria-label="Time"
      value={value}
      defaultValue={500}
      valueLabelDisplay="off"
      getAriaValueText={valuetext}
      step={null}
      marks={marks}
      orientation = "vertical"
      min={min}
      max={max}
      color='secondary'
      onChange={handleSliderChange}
      sx={{'& .MuiSlider-thumb': {
          borderRadius: '0px',
          width:0.8,
          height: 0.02
        },ml:0, mt:0,width: 7,height: panelWidth, 
      fontsize:'10%'}}
    />
    

    <Button variant="contained" size="small" 
    startIcon={<ArrowForwardIosIcon sx={{ml:1, width: 20,transform: 'rotate(-90deg)'}}/>} 
    onClick={() => increment1(value)}
    sx={{ml: 1, height:30, minWidth:10, mt:2}}> </Button>
    <Button variant="contained" size="small" 
    endIcon={<ArrowBackIosNewIcon sx={{ml:-1.5, width: 20, transform: 'rotate(-90deg)'}}/>} 
    onClick={() => decrement1(value)}
    sx={{ml: 1, height: 30, minWidth:10}}></Button>
    </Stack>
    </Collapse>
    <Box sx = {[{fontSize:15, maxWidth:90, pl:1, 
        display: '-webkit-box', backgroundColor:'white',
        WebkitLineClamp: 2,         // Exactly 2 lines
        WebkitBoxOrient: 'vertical',borderLeft:3, borderColor:'secondary' }, { 
          '&:hover': {bgcolor: 'primary.light'}, }]} onClick = {handleToggle}>
      {/* <Divider /> */}
      Pressure <br/>Control</Box>

  </Stack>
  )};


export const PressureControlH: React.FC<SliderControlProps> = ({
    value,
    setValue,
    min = 100,
    max = 1000,
    sx
  }) => {
  const handleSliderChange = (event:any) => {
    setValue(Number(event.target.value));
  }; 


  const increment1 = (value: any) => {
    if (value > 700)
    setValue((value: number) => Math.min(value + 50, max));
    else if (value == 250)
      setValue((value: number) => Math.min(value + 150, max));
    else if (value < 250)
      setValue((value: number) => Math.min(value + 75, max));
    else
      setValue((value: number) => Math.min(value + 100, max));
    };

    const decrement1 = (value: any) => {
      if (value > 800)
      setValue((value: number) => Math.min(value - 50, max));
      else if (value == 400)
        setValue((value: number) => Math.min(value - 150, max));
      else if (value < 300)
        setValue((value: number) => Math.min(value - 75, max));
      else
        setValue((value: number) => Math.min(value - 100, max));
      };

    // For the Slider module ---------------------------
    const marks = [{value: 100, label: '1000',},
    {value: 175, label: '',},
    {value: 250, label: '850',},
    {value: 400, label: '700',},
    {value: 500, label: '600',},
    {value: 600, label: '500',},
    {value: 700, label: '400',},
    {value: 800, label: '300',},
    {value: 850, label: '',},
    {value: 900, label: '200',},
    {value: 950, label: '',},
    {value: 1000, label: '100',},];

    function valuetext(label: number) {
      return `${label}h`;
    }
    return ( 
  <Stack direction="row"
          sx={sx}> 
          {/* borderRadius: '50%' */}
    <Box sx = {[{fontSize:15, width:100, pl:0, height:30, 
        display: '-webkit-box', WebkitLineClamp: 2,         // Exactly 2 lines
        WebkitBoxOrient: 'vertical'}]} >
      {/* <Divider /> */}
      Pressure <br/>Control(hPa)</Box>
    <Button variant="contained" size="small" 
    endIcon={<ArrowBackIosNewIcon  sx={{mr: -0.5}}/>} 
    onClick={() => decrement1(value)}
    sx={{mt: 0.2, height: 30, px:3, ml:0}}>Lower</Button>

    <Slider
      aria-label="Time"
      value={value}
      defaultValue={500}
      valueLabelDisplay="off"
      getAriaValueText={valuetext}
      step={null}
      marks={marks}
      orientation = "horizontal"
      min={min}
      max={max}
      color='secondary'
      onChange={handleSliderChange}
      sx={{'& .MuiSlider-thumb': {
          borderRadius: '0px',
          width:0.02,
          height: 0.1
      },ml:1}}
    />
    
    <Button variant="contained" size="small" 
    startIcon={<ArrowForwardIosIcon sx={{mx: -0.5}}/>} 
    onClick={() => increment1(value)}
    sx={{mt: 0.2, height: 30, px:3, ml:1}}> Higher</Button>



  </Stack>
  )};

const drawerBleeding = 56;
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: 'grey',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.background.default,
  }),
}));

export const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.applyStyles('dark', {
    backgroundColor: 'grey',
  }),
}));

export const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'grey',
  borderRadius: 3,
  position: 'absolute',
  top: 12,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: 'grey',
  '&:hover': {bgcolor: 'white'}
  }),
}));
export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </StyledBox>
        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          <Skeleton variant="rectangular" height="100%" />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}