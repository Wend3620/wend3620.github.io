import * as React from 'react';
import { styled, Theme, CSSObject,createTheme, ThemeProvider} from '@mui/material/styles';
import {Toolbar, Button, Box, FormControlLabel, FormGroup,
  Checkbox, Stack, useMediaQuery,
  SwipeableDrawer, 
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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
// import './decor/helper.css' 
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
import { Global } from '@emotion/react';
// import { positions } from '@mui/system';
import bk1 from './compo/CONUS250.svg'
import bk2 from './compo/CONUS500.svg'
import bk4 from './compo/CONUS850.svg'
import tres1 from './compo/CONUS500_gph.svg'
import tres2 from './compo/CONUS500_vo.svg'
import tres3 from './compo/CONUS500_w.svg'
import tres4 from './compo/CONUS500_thta.svg'
import tres5 from './compo/CONUS500_tkns.svg'
import cmap1 from './compo/vo_cmap.svg'
import cmap2 from './compo/w_cmap.svg'
import blankSvg from './compo/blank.svg'
import Collapse from '@mui/material/Collapse';

import {PanelBar, SliderControl, LayerSelect, LocationSelect, PressureControl, 
  Puller, PressureControlH} from './panelbar.tsx'
// import test1 from './compo/testing1.svg' 
// Standard drawer width for desktop
const drawerWidth = 240;
// Smaller drawer width for tablet
const tabletDrawerWidth = 200;
const selectorWidth = 0;
const mobileappbar = 180;

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
    padding: 0,
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

export default function MiniDrawer() {
  interface LayerState {
    layer1: boolean;
    layer2: boolean;
    layer3: boolean;
    layer4: boolean;
    layer5: boolean;

  }
  type LayerName = keyof LayerState;
    const initialValue = 0;
    const initVal = 500;
    const drawerBleeding = 56;
    const theme = dayTheme; //Should be the same with day theme
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const [value, setValue] = React.useState(initialValue);
    const [pValue, setPValue] = React.useState(initVal);
    const [drag, setDrag] = React.useState(false);

    const [openSwipe, setOpenSwipe] = React.useState(false);
    
    const toggleDrawer = (newOpen: boolean) => () => {
      setOpenSwipe(newOpen);
    };
    const handleSwipeClose = () => {
      setOpenSwipe(!openSwipe);
    };
    const [visibleLayers, setVisibleLayers] = React.useState({
        layer1: false,
        layer2: false,
        layer3: false,
        layer4: false,
        layer5: false,
    });
    const filledSelected = visibleLayers.layer2 || visibleLayers.layer3;
    let panelWidth = isTablet? 200 :300 
    let layerSelectors: Array<{id: LayerName, key: number, name: string, plot:string, type:string, cmap:string, seqCmap: number}> = [
      {id: 'layer1', key: 0,name: 'GPH(Dam, Black)', plot: tres1, type: 'None', cmap: blankSvg, seqCmap: -1},
      {id: 'layer2', key: 1, name:'Vorticity(Filled)', plot: tres2, type: 'Filled', cmap: cmap1, seqCmap: 1},
      {id: 'layer3', key: 2, name:'W(Filled)', plot: tres3, type: 'Filled', cmap: cmap2, seqCmap: 1},
      {id: 'layer4', key: 3, name:'Pot. Temp(K, Red)', plot: tres4, type: 'None', cmap: blankSvg, seqCmap: -1},
      {id: 'layer5', key: 4, name:'Thickness(Dam, Dark Orange)', plot: tres5, type: 'None', cmap: blankSvg, seqCmap: -1},
    ];
  
  
    const pLayers = [
      { back: bk2, idLayers: layerSelectors }
    ];
    if (pValue == 850){ pLayers[0].back= bk1;}
    if (pValue == 500){ pLayers[0].back= bk2;}
    if (pValue == 250){ pLayers[0].back= bk4;}
    const toggleLayer = (layerName: LayerName): void => {
      setVisibleLayers((prev) => ({
        ...prev,
        [layerName]: !prev[layerName]
      }));
    };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };


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
              isMobile && {flexGrow: 0, mx: 'auto'},
            ]}>
              Sample
            </Typography>
            <SliderControl value={value} setValue={setValue} 
            sx ={[
              isTablet ? { ml:-2, mt:1.5, py: 1.5, pr:0, width: 600} :
            (  isMobile ? {mt:2,width: 600}:
              { ml:16, mt:1.5, p: 1.5, pr:-30, width: 1000})
            ]}/>
            {isMobile && <PressureControlH value={pValue} setValue={setPValue} sx={{width: 600,
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
        <List sx = {[isMobile && { top:1 + mobileappbar-70}]}>
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
          {[ "Otherwork", 'Blogs', 'About'].map((text, index) => (
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
                  {index % 3 === 2 ? <InfoIcon />: 
                  ( index % 2 === 0 ? <ScienceIcon /> : <ArticleIcon />) }
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1 } : { opacity: 0 },
                    isMobile && { opacity: 1 }
                    ]}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {!isMobile&&<>
      <Box sx={[{ display: 'flex', flexDirection: 'column', ml:6.5, mt:-2, zorder: 20,}, 
        isTablet && {ml:6.5},]}>
      <PressureControl value={pValue} setValue={setPValue}/>
      </Box>
      <PanelBar position='fixed' open={open} sx={[{left:0, mt: 0, zorder: 10,
        maxWidth:panelWidth}]} >
        <Box sx={[{mt:-12, pt: 22,pb:1 , width:'100%', maxWidth: panelWidth},
        { '&:hover': {bgcolor: 'primary.light', }, }]}>
        <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', 
             }, {height:'100%',maxHeight:210, pb:-50}]}   > 
        {/**/}
        {times0.map((item, index) => (
          <Button variant="contained" size="small" 
          key={index} sx={[{maxHeight: 35, my:0.5}, isTablet &&{minWidth:46, width:46}]} 
          onClick={() => setValue(-24+(index)*6)}>
            <ListItemText primary={item.time}/>
          </Button>
        ))}

        <Button variant="contained"
        sx={{height: 35, width: '100%', maxWidth: panelWidth}} 
        onClick={() => setValue(0)} >
        <ListItemText primary = 'Initialization time' /></Button>
        
        
        
        {times1.map((item, index) => (
          <Button variant="contained" 
          key={index} sx={[{maxHeight: 35, my:0.5}, 
          isTablet &&{minWidth:46, width:46, p:0}]} onClick={() => setValue((index+1)*6)}>
            <ListItemText primary={item.time}/>
          </Button>
        ))}
          {/* <Button variant="contained" size="small" onClick={() => setValue(10)} >
          10</Button>
          <Button variant="contained" size="small">
          but</Button> */}
        </Box>
        <Collapse in={drag}>
        {/* Time buttons */}
        <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',  
        alignContent: 'space-around',height: 120, mb:1,
        transition: '0.8s'}]} >
        
          { times2.map((item, index) => (
          <Button variant="contained"
          key={index} sx={[{maxHeight: 35, my:0.5}, isTablet &&{minWidth:46, width:46, p:0}]} 
          onClick={() => setValue((index+13)*6)}>
            <ListItemText primary={item.time} />
          </Button>
        ))}

        </Box>
        </Collapse>
        </Box>
        {/* <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',  alignContent: 'space-around',
          transition: '0.5s'}, drag ? {height: 60} : {height: 0},{ 
            '&:hover': {bgcolor: 'primary.light', }, }]}> */}
          
        {/* </Box> */}
        <IconButton  sx={[{mx:'auto', mt:-2, right:selectorWidth/2},
          isTablet && {mx:'auto', mt:-2, right:selectorWidth/2}
        ]} 
        onClick={() => setDrag(!drag)}>
          <ExpandCircleDownIcon sx={[{transition: '0.5s', },
              drag ? {  transform: 'rotate(-180deg)',}
                : { transform: 'rotate(0)', }]}/>
        </IconButton>
        <Box sx={{bgcolor: 'primary.light', my: -3, height:8, 
          width:panelWidth}} onClick={() => setDrag(!drag)}/>
        <Box sx={{position:'flex', mt:4, overflowY:'auto', 
          '&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none'}}>
        <LocationSelect />
        {
        // TODO This changes the layers
        }
        <LayerSelect>
          <FormGroup sx={{flexDirection: 'row', ml: 2}}>
            {layerSelectors.map(layer=> (
                <FormControlLabel
                  disabled = {filledSelected && !visibleLayers[layer.id] && layer.type === 'Filled'}
                  checked={visibleLayers[layer.id]}
                  key={layer.name}
                  control={<Checkbox color='secondary'/>}
                  onClick={() => toggleLayer(layer.id)}
                  label={layer.name}  />
            ))}
          </FormGroup>
        </LayerSelect>
        </Box>
        {/* <Typography variant="h6" >
          False
        </Typography> */}
      </PanelBar></>}
      
      <Box sx={[{ml:0, pt:6, width:1200,
        position: 'relative',}, isMobile && {ml:0, mt:16, width:'100%'},]}>
      <img src={pLayers[0].back} alt="first image" 
          style = {{position: 'absolute', width: '100%', height: 'auto',zIndex:0}}/>
          
      {layerSelectors.map(layer => (
            visibleLayers[layer.id] && (
              <Stack direction = 'column' sx = {{ width: '100%', maxWidth: 20000}}>
              <Box component = 'img' src={layer.plot} alt="image" 
                sx={{position: 'absolute', zIndex:1, width: '100%'}}/>
              <Box component = 'img' src={layer.cmap} 
              sx={{ 
                position: 'absolute',
                mt: '53%', zIndex:1, 
                ml: '8%',
                maxHeight: 500, 
                width: '80%',
                maxWidth:900,
              }}/>
              </Stack>
              )))}
       {isMobile && 
        
        <Button variant="contained"
        sx={[{position: 'fixed', bottom:40, width: '100%', zIndex: 90, 
          bgcolor: 'white', height: 50, left: 0, right:0} , 
          {'&:hover': {bgcolor: 'primary.light', }, }]}
        onClick={handleSwipeClose}>Other Options</Button>}
      </Box>
     
      {isMobile &&
      <>
       
      <Global
        styles={{
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
              {/* <StyledBox
                sx={{
                  position: 'absolute',
                  top:-12,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  visibility: 'visible',
                  right: 0,
                  left: 0,
                  height: 300,
                  bgcolor: 'gold',
                  zIndex: 10,
                }}
              >
                {/* onClick={handleSwipeClose} 
                What
              </StyledBox> */}
        <Box sx={{position:'relative', mt:0, overflowY:'auto', width: '100%',
                '&::-webkit-scrollbar': {display: 'none'}, scrollbarWidth: 'none',}}>
        <LocationSelect />
        {
        // TODO This changes the layers
        }
        <LayerSelect>
          <FormGroup sx={{flexDirection: 'row', ml: 2}}>
            {layerSelectors.map(layer=> (
                <FormControlLabel
                  disabled = {filledSelected && !visibleLayers[layer.id] && layer.type === 'Filled'}
                  checked={visibleLayers[layer.id]}
                  key={layer.name}
                  control={<Checkbox color='secondary'/>}
                  onClick={() => toggleLayer(layer.id)}
                  label={layer.name}  />
            ))}
          </FormGroup>
        </LayerSelect>
        </Box>
        </SwipeableDrawer>
      </>}
      {/* Main content would go here */}
      {/* <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
        ...(open && !isMobile && {
          marginLeft: drawerWidth,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        ...(!open && !isMobile && {
          marginLeft: `calc(${theme.spacing(8)} + 1px)`,
        }),
      }}> */}
      {/* <DrawerHeader /> */}
        {/* Your page content here */}
      {/* </Box> */}
      </ThemeProvider>
    </Box>
  );
}