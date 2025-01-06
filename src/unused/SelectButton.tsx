// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import People from '@mui/icons-material/People';
// import PermMedia from '@mui/icons-material/PermMedia';
// import Dns from '@mui/icons-material/Dns';
// import Public from '@mui/icons-material/Public';

// const data = [
//   { icon: <People />, label: 'Authentication' },
//   { icon: <Dns />, label: 'Database' },
//   { icon: <PermMedia />, label: 'Storage' },
//   { icon: <Public />, label: 'Hosting' },
// ];


// export default function CustomizedList() {
//   const [open, setOpen] = React.useState(true);
//   return (
//         <Paper elevation={0} sx={{ maxWidth: 256 }}>
            
//             <Box sx={[open ? {
//                    bgcolor: 'rgba(71, 98, 130, 0.2)', }
//                  : { bgcolor: 'rgba(71, 98, 130, 0.2)',},
//                 open? {pb: 2, } : { pb: 0,  },]} >
//               <ListItemButton
//                 alignItems="flex-start"
//                 onClick={() => setOpen(!open)}
//                 sx={[{px: 3,
//                       pt: 2.5,},
//                   open? {  pb: 0,}: { pb: 2.5,  },
//                   open
//                     ? {'&:hover, &:focus': {
//                        '& svg': {opacity: 1,},
//                         }, }
//                     : {'&:hover, &:focus': {
//                         '& svg': {opacity: 0,},
//                         },
//                       },
//                 ]} >
//                 <ListItemText
//                   primary="Build"
//                   primaryTypographyProps={{
//                     fontSize: 15,
//                     fontWeight: 'medium',
//                     lineHeight: '20px',
//                     mb: '2px',
//                     color: open ? 'rgba(40,0,0,0)' : 'rgba(200,255,255,0.5)',
//                   }}
//                   secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
//                   secondaryTypographyProps={{
//                     noWrap: true,
//                     fontSize: 12,
//                     lineHeight: '16px',
//                     color: open ? 'rgba(40,0,0,0)' : 'rgba(200,255,255,0.5)',
//                   }}
//                   sx={{ my: 0 }}
//                 />
//                 <KeyboardArrowDown
//                   sx={[{ mr: -1,
//                       opacity: 0,
//                       transition: '0.2s', },
//                     open ? {  transform: 'rotate(-180deg)',}
//                       : { transform: 'rotate(0)', },
//                   ]}/>
//               </ListItemButton>
//               {open &&
//                 data.map((item) => (
//                   <ListItemButton
//                     key={item.label}
//                     sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
//                   >
//                     <ListItemText
//                       primary={item.label}
//                       primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
//                     />
//                   </ListItemButton>
//                 ))}
//             </Box>
//         </Paper>
//   );
// }

// import React from 'react'

// import makeStyles from "@mui/styled-engine-sc"

// import ArrowDropDownIcon from '@mui/base'
// import Button from '@mui/material'
// import ButtonGroup from '@mui/material'
// import Menu from '@mui/material'

// const useStyles = makeStyles({
//   button: {},
//   buttonDropdown: {},
// })

// type SelectButtonProps = {
//   textPrefix?: string
//   onChange?: (event: React.ChangeEvent<{ name?: string; value?: unknown }>) => void
//   onClick?: (event: React.ChangeEvent<{ name?: string; value?: unknown }>) => void
//   value?: string
//   children: React.ReactNode
//   classes?: any
// }

// const SelectButton = React.forwardRef<HTMLDivElement, SelectButtonProps>((
//   props: SelectButtonProps,
//   ref: React.Ref<HTMLDivElement>,
// ) => {
//   const { textPrefix, onChange = () => {}, onClick = () => {}, value: initialValue, children } = props
//   const classes = useStyles(props)
//   const anchorRef = (ref as React.RefObject<HTMLDivElement>) || React.useRef<HTMLDivElement>(null)
//   const [isOpen, setOpen] = React.useState(false)
//   const valueRef = React.useRef(initialValue)
//   valueRef.current = initialValue

//   const handleItemClick = (value: string) => (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
//     setOpen(false)
//     Object.defineProperty(e, 'target', { writable: true, value: { value } })
//     valueRef.current = value
//     onChange(e)
//   }

//   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     const value = valueRef.current
//     Object.defineProperty(e, 'target', { writable: true, value: { value } })
//     valueRef.current = value
//     onClick(e)
//   }

//   const items = React.Children
//     .map(children as React.ReactElement, child => {
//       if (!child) {
//         return null
//       }
//       const selected = valueRef.current === child.props.value
//       const valueReadable = child.props.children
//       const item = React.cloneElement(child, {
//         'aria-selected': selected ? 'true' : undefined,
//         onClick: handleItemClick(child.props.value),
//         role: 'option',
//         selected,
//         value: undefined, // The value is most likely not a valid HTML attribute.
//         'data-value': child.props.value, // Instead, we provide it as a data attribute.
//         'data-value-readable': valueReadable,
//       })
//       return item
//     })
//     .filter(item => item !== null)

//   const displayName = (value: any) =>
//     (items.find(item => item!.props['data-value'] === value)!).props['data-value-readable']

//   return <>
//     <ButtonGroup variant='contained' ref={anchorRef}>
//       <Button
//         className={classes.button}
//         onClick={handleButtonClick}
//       >
//         { textPrefix }{ displayName(valueRef.current) }
//       </Button>
//       <Button
//         className={classes.buttonDropdown}
//         size='small'
//         onClick={() => setOpen(true)}
//       >
//         <ArrowDropDownIcon />
//       </Button>
//     </ButtonGroup>
//     <Menu
//       open={isOpen}
//       onClose={() => setOpen(false)}
//       getContentAnchorEl={null} // needed for anchorOrigin to work
//       anchorEl={anchorRef.current}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//     >
//       { items }
//     </Menu>
//   </>
// })

// SelectButton.displayName = 'SelectButton'

// export default SelectButton