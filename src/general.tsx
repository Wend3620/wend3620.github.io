import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, NavDropdown} from 'react-bootstrap';  
import './decor/helper.css';
import { useState } from 'react';
import { motion} from "framer-motion";


export interface GeneralProps {
  currentPage: string,
}
export default function General({currentPage}: {readonly currentPage:string}){
  document.body.classList.add('front');
  const [isOpen, setIsOpen] = useState(false);
  if(!isOpen){
    document.documentElement.style.setProperty('--modify', '100px')
    
  }else{
    document.documentElement.style.setProperty('--modify', '135px')
  }
  return(
        <motion.div 
          className={'sidebar'}
          initial={false}
          animate={{
            width: isOpen ? '135px' : '100px',
            // onAnimationEnd: end,
            transition: {
              duration: 0.3,
            },
          }}
        >
          
        <p></p>
        <a className={currentPage==='/'? 'active' : ' '} href="/">Home</a>
        <a className={currentPage==='/pg1'? "active" : ' '} href="#/pg1">Page 1</a>
        <a className={currentPage==='/pg2'? "active" : ' '} href="#/pg2">Page 2</a>
        <a className={currentPage==='/pg3'? "active" : ' '} href="#/pg3">Page 3</a>
        <Nav>
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="More"
              menuVariant="dark"
              drop ="end"
            >
              <NavDropdown.Item href="#action/3.1">Eat</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Drink
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Sleep</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <button style={{border:'none', width:'0', margin: '0px'}} //Need change later
                  onClick={() => setIsOpen(!isOpen)}>
            <motion.div 
            className={'button'}
            initial={false}
            animate={{
              width: isOpen ? '135px' : '100px',
              transition: {
                duration: 0.3,
              },
              }}
            >
            Control</motion.div>
        </button>
      </motion.div>  
  )
}