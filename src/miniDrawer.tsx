import * as React from 'react';
import { styled, Theme, CSSObject,createTheme, ThemeProvider} from '@mui/material/styles';
import {Toolbar, Box,useMediaQuery,} from '@mui/material';
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
import InfoIcon from '@mui/icons-material/Info';
// import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';



const drawerWidth = 240;
// Smaller drawer width for tablet
const tabletDrawerWidth = 200;
// const mobileappbar = 180;
const appBarHeight = 70;
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

// const pageTheme = dayTheme;

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
  // necessary for content to be below app bar
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
  height: appBarHeight,
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

  const isMobile = useMediaQuery(dayTheme.breakpoints.down('sm'));
  //const isTablet = useMediaQuery(dayTheme.breakpoints.between('sm', 'md'));
  // let panelWidth = isTablet? 200 :260 
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Top line, could be removed */}
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
            
          </Toolbar>
        </AppBar>
      
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List sx={{mt:1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {['EC-AIFS', 'Model2(GFS?)', 'Model3(TBD)'].map((text) => (
            <ListItem key={text} disablePadding sx={{
            flexGrow: 0, width: '100%', display: 'flex', flexDirection: 'row'
            }}>
              <ListItemButton href= {"#/"+text}
                sx={[ {minHeight: 48, px: 2.5},
                open ? { justifyContent: 'initial',  }: {  justifyContent: 'center', },]}
              >
                <ListItemIcon
                  sx={[{minWidth: 0,justifyContent: 'center',}, 
                    open ? { mr: 3,} : {mr: 'auto',},]}
                ><ComputerIcon/>
                   
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[{ opacity: open? 1 : 0,},]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List >
            {/* <ListItem key={"Otherwork"} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[{ minHeight: 48, px: 2.5,},
                  open ? {justifyContent: 'initial',}: {justifyContent: 'center',},]}
              >
                <ListItemIcon
                  sx={[ {minWidth: 0, justifyContent: 'center', },
                    open? { mr: 3,}: { mr: 'auto', },
                  ]}
                >
                
                <ArticleIcon/>
                </ListItemIcon>
                <ListItemText
                  primary={"Otherwork"}
                  sx={[open ? { opacity: 1, } : {  opacity: 0,},]}
                />
              </ListItemButton>
            </ListItem> */}
          {['Other Tools', 'About'].map((text, index) => (
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
                  {index % 2 === 0 ? <ScienceIcon />: <InfoIcon />}
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
     
      
      </ThemeProvider>
    </Box>
  );
}
