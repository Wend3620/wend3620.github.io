import * as React from 'react';
import { styled, Theme, CSSObject,createTheme, ThemeProvider} from '@mui/material/styles';
import {Toolbar, Box} from '@mui/material';
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

import InfoIcon from '@mui/icons-material/Info';
import ArticleIcon from '@mui/icons-material/Article';
import ScienceIcon from '@mui/icons-material/Science';
import ComputerIcon from '@mui/icons-material/Computer';


const drawerWidth = 240;

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

export default function MiniDrawer() {
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        sx={{borderBottom: 3, 
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
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List sx={{mt:1}}>
          {['Model1', 'Model2', 'Model3'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' ,}}>
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
                  sx={[open ? { opacity: 1, }: { opacity: 0,},]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
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
      
    </Box>
  );
}
