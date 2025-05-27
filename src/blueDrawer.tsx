import * as React from 'react';
import { styled, Theme, CSSObject, ThemeProvider} from '@mui/material/styles';
import {Toolbar, Button, Box, FormControlLabel, FormGroup,
  Checkbox, Stack, useMediaQuery,
  SwipeableDrawer,
  Tooltip,
  LinearProgressProps,
  LinearProgress,
} from '@mui/material';
import MuiDrawer  from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// useTheme,
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
// import './decor/helper.css' 
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import InfoIcon from '@mui/icons-material/Info';
// import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import { Global } from '@emotion/react';
// import { positions } from '@mui/system';
import cmap1 from './compo/vo_cmap.svg'
import cmap2 from './compo/w_cmap.svg'
import blankSvg from './compo/blank.svg'
import Collapse from '@mui/material/Collapse';
import { dayTheme } from './theme.tsx';
import {PanelBar, SliderControl, LayerSelect, LocationSelect, PressureControl, 
  Puller, PressureControlH} from './panelbar.tsx'
// import test1 from './compo/testing1.svg' 
// Standard drawer width for desktop
const drawerWidth = 240;
// Smaller drawer width for tablet
const tabletDrawerWidth = 200;
const selectorWidth = 0;
const mobileappbar = 180;



const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.between('sm', 'md')]: {
    width: tabletDrawerWidth,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down('sm')]: {
    width: 0,
    height: '100vh'
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  left: 0,
  width: 1000,
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {//Theme not the same as dayTheme
    height: mobileappbar,
  },
  height: 70,
  boxShadow: "none",
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color ='secondary'/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    // width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        [theme.breakpoints.down('sm')]: {
          width: '100%',  // On small screens, drawer takes up most of the screen
          position: 'fixed',
          height:'100%'
        },
      },
    }),
    ...(!open && {
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),

      },
    }),
  }),
);

  interface LayerData {
    plot: any; // Your plot data
  }

  interface LayerState {
    [layerId: string]: boolean; // visibility state for each layer
  }

  interface WeatherData {
    [pressureLevel: string]: {
      [timeStep: string]: {
        [layerId: string]: LayerData;
      };
    };
  }

  


export default function MiniDrawer() {
  interface LayerConfig {
    id: string;
    key: number;
    name: string;
    type: 'None' | 'Filled';
    cmap: string; // SVG or colormap reference
  }


    interface Coordinates {
      lat: number;
      lon: number;
  }
  
  interface MouseMoveEvent {
      clientX: number;
      clientY: number;
  }
  
    const initialValue = 0;
    const initVal = -500;
    const drawerBleeding = 56;
    
    const theme = dayTheme; //Should be the same with day theme
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    let panelWidth = isTablet? 200 :260 
    const [tValue, setTvalue] = React.useState(initialValue);
    const [pValue, setPvalue] = React.useState(initVal);
    const [drag, setDrag] = React.useState(false);
    const [toolbar, setToolbar] = React.useState(false);
    const [openSwipe, setOpenSwipe] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpenSwipe(newOpen);
    };
    const handleSwipeClose = () => {
      setOpenSwipe(!openSwipe);
    };
    
    const loadWeatherData = async () => {
    const data: WeatherData = {};
    // Define your file structure
    const pressureLevels = ['100', '150', '200', '250', '300','400', '500', '600', '700', '850', '925', '1000'];
    const timeSteps = [];
      
    for (let hour = 0; hour <= 144; hour+=6) {
      // Then the code pushes each time it loops to the empty array I initiated.
      let attn =hour.toString();
      timeSteps.push(attn);
      }
    const layers = ['bg', 'gph', 'vo', 'w', 'thta', 'tkns'];
    console.log('Loading weather data...');
    for (const [index, level] of pressureLevels.entries()) {
        data[level] = {};
        for (const time of timeSteps) {
          data[level][time] = {};
          for (const layer of layers) {
            try {
              // Dynamic import - adjust path as needed
              const imageModule = await import(`./compo/test/CONUS${level}_${layer}_${time}h.webp`);
              data[level][time][layer] = { plot: imageModule.default };
          } catch (error) {
            console.warn(`Could not load image: ${level}_${layer}_${time}h`);
          }
        }
      }
      setProgress((index + 1) / pressureLevels.length * 100);
    }
      
      return data;
    }

    const [weatherData, setWeatherData] = React.useState<WeatherData>({});
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
        const data = await loadWeatherData();
        setWeatherData(data);
      } catch (error) {
      console.error('Error:', error);
      } finally {
      setLoading(false);
      }
    };
    fetchData();
  }, []);
  const layerConfigs: LayerConfig[] = [
    { id: 'gph', key: 0, name: 'GPH(Dam, Black)', type: 'None', cmap: blankSvg },
    { id: 'vo', key: 1, name: 'Vorticity(Filled)', type: 'Filled', cmap: cmap1 },
    { id: 'w', key: 2, name: 'W(Filled)', type: 'Filled', cmap: cmap2 },
    { id: 'thta', key: 3, name: 'Pot. Temp(K, Red)', type: 'None', cmap: blankSvg },
    { id: 'tkns', key: 4, name: 'Thickness(Dam, Dark Orange)', type: 'None', cmap:blankSvg},
  ];

  // Layer visibility state (applies to ALL levels and times)
  const [layerStates, setLayerStates] = React.useState<LayerState>({
    gph: false,
    vo: false,
    w: false,
    thta: false,
    tkns: false,
  });

    const filledSelected = layerStates.vo || layerStates.w;


    const toggleLayer = (layerId: string) => {
      setLayerStates(prev => ({
        ...prev,
        [layerId]: !prev[layerId]
      }));
    };
    const visibleLayers = React.useMemo(() => {
    const currentData = weatherData[(-1*pValue).toString()]?.[tValue.toString()];
    if (!currentData) return [];

    return layerConfigs
      .filter(config => layerStates[config.id]) // Only visible layers
      .map(config => ({
        ...config,
        state: layerStates[config.id],
        plot: currentData[config.id]?.plot,
      }))
      .filter(layer => layer.plot); // Only layers with data
  }, [(-1*pValue).toString(), tValue.toString(), layerStates, weatherData]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  //Cursor section starts
  const [coordinates, setCoordinates] = React.useState({ lat: 0, lon: 0 });
  const [showTooltip, setShowTooltip] = React.useState(false);
  const mapRef = React.useRef<HTMLDivElement>(null);
    
  // These would be your actual map boundaries in lat/lon
  const mapBounds = {
    minLat: 17.5,
    maxLat: 56.5,
    minLon: -132.7,
    maxLon: -58.8
  };
  
  // Convert SVG coordinates to lat/lon
  const svgToLatLon = (svgX:number, svgY:number, 
                        svgWidth:number, svgHeight:number) => {
    // Calculate the percentage across the SVG
    const percentX = svgX / svgWidth;
    const percentY = svgY / svgHeight;
    
    // Convert to lat/lon based on map bounds
    // Note: Y is inverted in SVG (0 is top)
    const lon = mapBounds.minLon + percentX * (mapBounds.maxLon - mapBounds.minLon);
    const lat = mapBounds.maxLat - percentY * (mapBounds.maxLat - mapBounds.minLat);
    
    return { lat, lon };
    };
    
  const handleMouseMove = (event: MouseMoveEvent): void => {
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect();
            const svgX: number = event.clientX - rect.left;
            const svgY: number = event.clientY - rect.top;
            
            const { lat, lon }: Coordinates = svgToLatLon(svgX, svgY, rect.width, rect.height);
            
            setCoordinates({
                lat: parseFloat(lat.toFixed(6)),
                lon: parseFloat(lon.toFixed(6))
            });
            setShowTooltip(true);
        }
    };
  
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  //Cursor section ends

  // Setting up time for buttons
  const times0 = [];

  for (let hour = -24; hour <0; hour+=6) {
    // Then the code pushes each time it loops to the empty array I initiated.
    let attn = '';
    if (hour > -10) attn='-00'+(hour*-1).toString();
    else if (hour > -100) attn='-0'+(hour*-1).toString();
    else attn=(hour*-1).toString();
    times0.push(
        {time: attn, timeValue: hour}
        );
    }

  const times1 = [];
      
  for (let hour = 6; hour <= 72; hour+=6) {
    // Then the code pushes each time it loops to the empty array I initiated.
    let attn = '';
    if (hour < 10) attn='00'+hour.toString();
    else if (hour < 100) attn='0'+hour.toString();
    else attn=hour.toString();
    times1.push(
        {time: attn, timeValue: hour}
       );
    }

  const times2 = [];
  for (let hour = 78; hour <= 144; hour+=6) {
    // Then the code pushes each time it loops to the empty array I initiated.
    let attn = '';
    if (hour < 10) attn='00'+hour.toString();
    else if (hour < 100) attn='0'+hour.toString();
    else attn=hour.toString();
    times2.push(
        {time: attn, timeValue: hour}
       );
    }
  const buttonSx = [{my:0.3, maxHeight:32, 
    width:56,minWidth:53, mx:'auto', py:1,fontSize: isTablet? 14 :16,},
     isTablet &&{minWidth:46, width:46, p:0, fontsize:10}
    , ]
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <ThemeProvider theme={dayTheme}>
        <AppBar position="fixed" open={open} 
          sx={[{ borderBottom: 1,  borderColor: 'black',  color: "primary",}
          ]}>
          <Toolbar sx= {[isMobile&&{display: 'flex', flexWrap: 'wrap',alignContent: 'space-evenly'
            , justifyContent:'space-evenly'}]}>
            <IconButton
              aria-label="open drawer"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              sx={[
                { marginRight: 5 },
                { transition: '0.5s' },
                open && !isMobile ? { transform: 'rotate(-180deg)' } : { transform: 'rotate(0)' }
              ]}>
              {open && isMobile ? <CloseIcon /> : open ? <ChevronRightIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h5" sx={[{flexGrow: 0, pl:3, pr: 10},
              isTablet && {flexGrow: 0, ml:-3},
              isMobile && {flexGrow: 0, mx: 'auto'},
            ]}>
              Tropoview
            </Typography>
            <SliderControl value={tValue} setValue={setTvalue} min={0} max={144} step={6}
            sx ={[
              isTablet ? { ml:-5, mt:1.5, py: 1.5, pr:0, width: 600} :
            (  isMobile ? {mt:2,width: 600}:
              { ml:8, mt:1.5, p: 1.5, pr:0, width: 1000})
            ]}/>
            {isMobile && <PressureControlH value={pValue} setValue={setPvalue} sx={{width: 600,
               height: 80,zIndex:10,backgroundColor:'transparent', ml:2
            }}/>}
          </Toolbar>
        </AppBar>
      
      
      <Drawer 
      
        variant='permanent' //{drawerVariant}
        open={open}
        onClose={isMobile ? handleDrawerClose : undefined}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}>
        <DrawerHeader>
          {isMobile && (
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          )}
        </DrawerHeader>
        <Divider />
        <List sx = {[isMobile && { top:1 + mobileappbar-70, height: 220,}]}>
          {['EC-AIFS', 'Model2(GFS?)', 'Model3(TBD)'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton 
                href={`#/${text}`}
                onClick={isMobile ? handleDrawerClose : undefined}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                  isMobile && { justifyContent: 'initial' }
                ]}>
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                    isMobile && { mr: 3 }
                  ]}>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open ? { opacity: 1 } : { opacity: 0 },
                    isMobile && { opacity: 1 }
                  ]}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx = {[isMobile && { mt:6}]}/>
        <List>
          {['Other Tools', 'About'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href= {"#/"+text}
                onClick={isMobile ? handleDrawerClose : undefined}
                sx={[{ minHeight: 48, px: 2.5,},
                  open ? {justifyContent: 'initial',}: {justifyContent: 'center',},
                isMobile && { justifyContent: 'initial' }]}
              >
                <ListItemIcon
                  sx={[ {minWidth: 0, justifyContent: 'center', },
                    open? { mr: 3,}: { mr: 'auto', },
                    isMobile && { mr: 3 }
                  ]}
                >
                  {index % 2 === 0 ? <ScienceIcon />: <InfoIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[{opacity: open? 1 :0},
                    isMobile && { opacity: 1 }
                    
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {!isMobile&&
      <Box sx={[{ display: 'flex', flexWrap: 'wrap',flexDirection: 'row', 
        alignContent: 'space-around',justifyContent: 'space-evenly',}, ]}>

      <PanelBar position='relative' open={open} sx={[{left:0, right:0, mt: 0, zIndex: 30,
        maxWidth:panelWidth,overflowY:'auto',
        borderRight:1, borderRightColor: toolbar? 'black': 'white',
          '&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none'}]} >
        <Box sx={[{mt:-12, pt: 22,pb:1 , width:'100%', maxWidth: panelWidth,
        },
        { '&:hover': {bgcolor: 'primary.light', }, }]}>
        <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',  
        alignContent: 'space-around',
             }, {height:isTablet? 150: 180,maxHeight:220, mb:0}]}   > 
        {/**/}
        {times0.map((item, index) => (
          <Button variant="contained" size="small" disabled
          key={index} sx={buttonSx} 
          onClick={() => setTvalue(-24+(index)*6)}>
            {item.time}
          </Button>
        ))}

        <Button variant="contained"
        sx={{height: 32, my:0.3,width: '100%', maxWidth: panelWidth-10}} 
        onClick={() => setTvalue(0)} >
        <ListItemText sx={{
          textTransform: 'capitalize'
        }}primary = {isTablet? 'Init. Time':'Initialization time'} />
        </Button>

        
        {times1.map((item, index) => (
          <Button variant="contained" 
          key={index} sx={buttonSx} onClick={() => setTvalue((index+1)*6)}>
            {item.time}
          </Button>
        ))}
          {/* <Button variant="contained" size="small" onClick={() => setValue(10)} >
          10</Button>
          <Button variant="contained" size="small">
          but</Button> */}
        </Box>
        <Collapse in={drag}>
        {/* Time buttons */}
        {/* justifyContent: 'space-evenly',  
        alignContent: 'space-around', */}
        <Box sx={[{display: 'flex', flexWrap: 'wrap',  mt:0.5, 
        height: isTablet?60: 90, mb:2.5,
        transition: '0.8s'}]} >
        
          { times2.map((item, index) => (
          <Button variant="contained"
          key={index} sx={buttonSx} 
          onClick={() => setTvalue((index+13)*6)}>
            {item.time}
          </Button>
        ))}

        </Box>
        </Collapse>
        </Box>

        <Box sx={{bgcolor: 'primary.light', mt: 0, height:8, 
          width:'100%'}} onClick={() => setDrag(!drag)}>

          <IconButton  sx={[{ mt:-2, left:'42%',},
          isTablet && {mx:'auto', mt:-2, right:selectorWidth/2}]} 
        onClick={() => setDrag(!drag)}>
          <ExpandCircleDownIcon sx={[{transition: '0.5s', },
              drag ? {  transform: 'rotate(-180deg)',}
                : { transform: 'rotate(0)', }]}/>
        </IconButton>
        </Box>
        <Box sx={{position:'flex', mt:1}}>
        <LocationSelect/>
        {
        // TODO This changes the layers
        }
        <LayerSelect>
          <FormGroup sx={{flexDirection: 'row', ml: 2,}}>
            {layerConfigs.map(layer=> (
                <FormControlLabel
                  disabled = {filledSelected && !layerStates[layer.id] && layer.type === 'Filled'}
                  checked={layerStates[layer.id]}
                  key={layer.key}
                  control={<Checkbox color='secondary' size={isTablet?'small': 'medium'}/>}
                  onClick={() => toggleLayer(layer.id)}
                  label={layer.name}  
                  slotProps={{typography: {fontSize: isTablet?12 : 16}}}
                  // sx={{fontSize: isTablet? 14 :16}}
                  />
            ))}
          </FormGroup>
        </LayerSelect>
        </Box>
        {/* <Typography variant="h6" >
          False
        </Typography> */}
      </PanelBar>
      <Stack position='relative' direction='row'
       sx={{ml:0,zIndex:toolbar?12:0}}>
      <Collapse in={toolbar} orientation='horizontal'>
          {/* <Box sx = {{width: isTablet?60:80, bgcolor: 'black'}}></Box> */}
         <PressureControl value={pValue} setValue={setPvalue} 
         sx={[{height: 460, width: isTablet?70:90, marginTop: 9,
                   zIndex:6,},
                isTablet&& {ml:0, height: 460,}]}/>
      </Collapse>
      <Box  onClick={() => setToolbar(!toolbar)} 
      sx = {{height:10, mt: 10, zIndex: 10, bgcolor: 'black',
            width:2, maxWidth:10}} >
      <svg>
        <IconButton component="polygon"
          points="0,100 20, 90 20,10 0, 00 "
          sx={(theme) => ({fill: theme.palette.primary.light, 
          zIndex:toolbar?20:0})}>
              {/* 
          stroke: theme.palette.secondary.main, strokeWidth: 1, */}
          </IconButton>
      </svg>
      <ArrowForwardIosIcon sx={[{position:'relative',  zIndex:100, width: 15,
         height: 20, top:-120, ml:0.2, },
          {transition: '0.5s', },toolbar ? {  transform: 'rotate(-180deg)',}
                : { transform: 'rotate(0)', }]}/>
      </Box>
      </Stack>
      </Box>}
      <Tooltip
        open={showTooltip}
        title={`Lat: ${coordinates.lat.toFixed(2)}, 
                  Lon: ${coordinates.lon.toFixed(2)}`}
        placement="top-start"
        arrow
        followCursor
        sx={{zIndex: 1000}}>
      <Box ref={mapRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave} sx={[{position: 'absolute',
            ml:52, mt:10, width:'64vw', aspectRatio: '19/10',
        cursor: 'crosshair', 

        }, isTablet && { ml:34, mt:10, width:'60vw'},
        isMobile && {ml:0, mt:25, width:'95%'}]}>
      
      <Box component='img' src={weatherData[(-1*pValue).toString()]?.[tValue.toString()]['bg'].plot} 
          sx = {{position: 'absolute', width: '100%',
          zIndex:0}} key={`${coordinates.lat}-${pValue}-${tValue}`} />
      {loading && 
          <Box sx={{ width: '100%', position: 'absolute', top: '50%', }}>
          <LinearProgressWithLabel value={progress} />
          Loading...
          </Box>}
      {!loading && visibleLayers.map(layer => (
          layer.state && (
            <Stack direction = 'column' key={`${coordinates.lat}-${pValue}-${tValue}-${layer.id}Stack`} 
            sx = {{ position: 'absolute', zIndex:2, width: '100%', }}>
            <Box component = 'img' key={`${coordinates.lat}-${pValue}-${tValue}-${layer.id}`}  
            src={layer.plot} alt="image" 
              sx={{width: '100%', position: 'relative'}}/>
            <Box component = 'img' key={`${coordinates.lat}-${pValue}-${tValue}-${layer.id}cmap`}  
            src={layer.cmap} 
            sx={{ 
              position: 'relative', zIndex:2, 
              ml: '4%', mt: '-1%',
              width: '60%',
              left: '1%',
            }}/>
            </Stack>
            )))}
        {isMobile && 
                <Button variant="contained"
                sx={[{position: 'fixed', bottom:40, width: '100%', zIndex: 10, 
                  bgcolor: 'white', height: 50, left: 0, right:0} , 
                  {'&:hover': {bgcolor: 'primary.light', }, }]}
                onClick={handleSwipeClose}>Other Options</Button>}
        </Box>
      </Tooltip>
      {isMobile &&
      <>
      <Global styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },}}/>
      <SwipeableDrawer
              // container={container}
              anchor="bottom"
              open={openSwipe}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              swipeAreaWidth={drawerBleeding}
              disableSwipeToOpen={false}
              keepMounted
             
            >
              <Puller onClick={handleSwipeClose}/> 
        <Box sx={{position:'relative', mt:2, overflowY:'auto', width: '100%',
                '&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none',}}>
        <LocationSelect />
        {
        // TODO This changes the layers
        }
        <LayerSelect>
          <FormGroup sx={{flexDirection: 'row', ml: 2}}>
            {layerConfigs.map(layer=> (
                <FormControlLabel
                  disabled = {filledSelected && !layerStates[layer.id] && layer.type === 'Filled'}
                  checked={layerStates[layer.id]}
                  key={layer.key}
                  control={<Checkbox color='secondary' size={isTablet?'small': 'medium'}/>}
                  onClick={() => toggleLayer(layer.id)}
                  label={layer.name}  
                  slotProps={{typography: {fontSize: isTablet?12 : 16}}}
                  // sx={{fontSize: isTablet? 14 :16}}
                  />
            ))}
          </FormGroup>
        </LayerSelect>
        </Box>
        </SwipeableDrawer>
      </>}
      </ThemeProvider>
  
    </Box>
  );
}