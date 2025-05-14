import * as React from 'react';
import { styled, Theme, CSSObject,createTheme, ThemeProvider} from '@mui/material/styles';
import {Toolbar, Button, Box, FormControlLabel, FormGroup,
  Checkbox,
  Stack
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
// import './decor/helper.css' 

import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';
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

import {PanelBar, SliderControl, LayerSelect, LocationSelect, PressureControl} from './panelbar.tsx'
// import test1 from './compo/testing1.svg' 

const drawerWidth = 240;
const panelWidth = 300;
const selectorWidth = 80;

const dayTheme = createTheme({
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

// const pageTheme = dayTheme;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  // borderRight: 'solid gray', //Change the border appearance
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
  // borderRight: 'solid gray', //Change the border appearance
  // width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    left: 0,
    width:900,
    height: 70,
    boxShadow: "none",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {props: ({ open }) => open,
        style: {
          // marginLeft: drawerWidth,
          // width:  `calc(800px - 60px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          // ...openedMixin(theme), Controlling a weird right border
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          // ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MainDrawer() {
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
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(initialValue);
    const [pValue, setPValue] = React.useState(initVal);
    const [drag, setDrag] = React.useState(false);
    const [visibleLayers, setVisibleLayers] = React.useState({
        layer1: false,
        layer2: false,
        layer3: false,
        layer4: false,
        layer5: false,
    });
    
  const layerSelectors: Array<{id: LayerName, name: string, plot:string, type:string, cmap:string, seqCmap: number}> = [
    {id: 'layer1', name: 'GPH(Dam, Black)', plot: tres1, type: 'None', cmap: blankSvg, seqCmap: -1},
    {id: 'layer2', name:'Vorticity(Filled)', plot: tres2, type: 'Filled', cmap: cmap1, seqCmap: 0},
    {id: 'layer3', name:'W(Filled)', plot: tres3, type: 'Filled', cmap: cmap2, seqCmap: 0},
    {id: 'layer4', name:'Pot. Temp(K, Red)', plot: tres4, type: 'None', cmap: blankSvg, seqCmap: -1},
    {id: 'layer5', name:'Thickness(Dam, Dark Orange)', plot: tres5, type: 'None', cmap: blankSvg, seqCmap: -1},
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

  const initBoarder = 186;
  const numCmap = 1;

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Top line, could be removed */}
      <ThemeProvider theme={dayTheme}>
      <AppBar position="fixed" open={open} 
        sx={{borderBottom: 4, 
          borderColor: 'black', color: "primary", }}>
        <Toolbar>
          <IconButton
            //"inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose :handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5,},{transition: '0.5s', },
              open ? {  transform: 'rotate(-180deg)',}
                : { transform: 'rotate(0)', }
              // open && { display: 'none' },
            ]}
          >
            {open ? <ChevronRightIcon/>: <MenuIcon/> }
            
          </IconButton>
          {/*  */}
          <Typography variant="h5" sx={{width: 40}}>
            Sample
          </Typography>
          <SliderControl value={value} setValue={setValue}/>
        </Toolbar>
      </AppBar>
      {/* Core Left panel */}
      
      <PanelBar position='fixed' open={open} sx={{left:0, mt: 0, maxWidth:panelWidth+selectorWidth}} >
        <PressureControl value={pValue} setValue={setPValue}/>
        <Box sx={[{mt:-60, pt: 2,pb:1 , width:'100%', maxWidth: panelWidth},
        { '&:hover': {bgcolor: 'primary.light', }, }]}>
        <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', 
             }, {height:'100%',maxHeight:225, pb:0}]}   > 
        {/**/}
        {times0.map((item, index) => (
          <Button variant="contained" size="small" 
          key={index} sx={{maxHeight: 35, my:0.5}} onClick={() => setValue(-24+(index)*6)}>
            <ListItemText primary={item.time} />
          </Button>
        ))}

        <Button variant="contained" size="small" 
        sx={{height: 35, width: '100%', maxWidth: panelWidth-16, my:0.5}} onClick={() => setValue(0)} >
        <ListItemText primary = 'Initialization time' /></Button>
        
        
        
        {times1.map((item, index) => (
          <Button variant="contained" size="small" 
          key={index} sx={{maxHeight: 35, my:0.5}} onClick={() => setValue((index+1)*6)}>
            <ListItemText primary={item.time} />
          </Button>
        ))}
          {/* <Button variant="contained" size="small" onClick={() => setValue(10)} >
          10</Button>
          <Button variant="contained" size="small">
          but</Button> */}
        </Box>
        <Collapse in={drag}>
        <Box sx={[{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly',  
        alignContent: 'space-around',
        transition: '0.8s'}]} >
        
          { times2.map((item, index) => (
          <Button variant="contained" size="small" 
          key={index} sx={{maxHeight: 35, my:0.5}} onClick={() => setValue((index+13)*6)}>
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
        <IconButton  sx={{mx:'auto', mt:-2, right:selectorWidth/2}} onClick={() => setDrag(!drag)}>
          <ExpandCircleDownIcon sx={[{transition: '0.5s', },
              drag ? {  transform: 'rotate(-180deg)',}
                : { transform: 'rotate(0)', }]}/>
        </IconButton>
        <Box sx={{bgcolor: 'primary.light', my: -3, height:8, width:panelWidth}} onClick={() => setDrag(!drag)}/>
        <Box sx={{position:'flex', mt:0, overflowY:'scroll'}}>
        <LocationSelect/>
        {
        // TODO This changes the layers
        }
        <LayerSelect>
          <FormGroup sx={{flexDirection: 'row', ml: 2}}>
            {layerSelectors.map(layer=> (
                <FormControlLabel
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
      </PanelBar>
      </ThemeProvider>
      <Box sx={{ml: 26, mt:2, width: '90%', maxWidth: 20000,position: 'absolute',}}>
      <img src={pLayers[0].back} alt="first image" 
          style = {{position: 'absolute', width: '100%',zIndex:0}}/>
          
      {layerSelectors.map(layer => (
            visibleLayers[layer.id] && (
              <Stack direction = 'row' sx = {{ width: '100%', maxWidth: 20000}}>
              <Box component = 'img' src={layer.plot} alt="image" 
                sx={{position: 'absolute', zIndex:1, width: '100%'}}
              />
              <Box component = 'img' src={layer.cmap} 
              sx={{ 
                position: 'absolute',
                mt: 15, zIndex:1, 
                ml: initBoarder,
                maxHeight: 500, 
                maxWidth:90,
              }}/>
              </Stack>
              )))}
      </Box>
     
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List sx={{mt:1}}>
          {['EC-AIFS', 'Model2(GFS?)', 'Model3(TBD)'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' ,}}>
              <ListItemButton href= {"#/"+text}
                sx={[ {maxHeight: 48, px: 2.5},
                open ? { justifyContent: 'initial',  }: {  justifyContent: 'center', },]}
              >
                <ListItemIcon
                  sx={[{minWidth: 0,justifyContent: 'center',}, 
                    open ? { mr: 3,} : {mr: 'auto',},]}
                ><ComputerIcon/>
                   
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1, }: { opacity: 0,},]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider/>
        <List >
            <ListItem key={"Otherwork"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[{ minHeight: 48, px: 2.5,},
                  open ? {justifyContent: 'initial',}: {justifyContent: 'center',},]}
              >
                <ListItemIcon
                  sx={[ {minWidth: 0, justifyContent: 'center', },
                    open? { mr: 3,}: { mr: 'auto', },
                  ]}
                >
                <ScienceIcon />
                </ListItemIcon>
                <ListItemText
                  primary={"Otherwork"}
                  sx={[open ? { opacity: 1, } : {  opacity: 0,},]}
                />
              </ListItemButton>
            </ListItem>
          {['Blogs', 'About'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton href= {"#/"+text}
                sx={[{ minHeight: 48, px: 2.5,},
                  open ? {justifyContent: 'initial',}: {justifyContent: 'center',},]}
              >
                <ListItemIcon
                  sx={[ {minWidth: 0, justifyContent: 'center', },
                    open? { mr: 3,}: { mr: 'auto', },
                  ]}
                >
                  {index % 2 === 0 ? <ArticleIcon/> : <InfoIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[open ? { opacity: 1, } : {  opacity: 0,},]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* <Container sx={{mt:10, ml:20, position: 'absolute'
          // ,border: 2
      }} Old Layer select
        dangerouslySetInnerHTML={{ __html: getProcessedSVG()}}/> */}
    </Box>
  );
}
