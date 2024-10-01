import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
import './decor/helper.css';
import General from './general';
import { Component  } from './trial';
import { useState } from 'react';
export interface GeneralProps {
  currentPage: string,
}
//Fancy constant, but how good is it?
// 
function Home() {  
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen){
    document.documentElement.style.setProperty('--unlockChoices', 'auto')
    document.documentElement.style.setProperty('--unlock', '0')
  }else{
    document.documentElement.style.setProperty('--unlockChoices', 'none')
    document.documentElement.style.setProperty('--unlock', 'blur(0.6rem)')
  }
  return (  
    <>
      <General currentPage='/'/>
      
      <Container className="content">
        <p></p>
        <h2>Practice 3</h2>
        <p>Guys, sorry for the delay, I am working on the update!!!</p>
        <Component/>
        <div style={{pointerEvents:'auto', padding:'60px'}}>
          <button className='fool' onClick={() => setIsOpen(!isOpen)}>Log in?</button> 
        </div>
      </Container>
      
    </>
    // <>  
    // <Container className='p-4'>  
    //   <Button variant="light" onClick={showSidebar}>  
    //     Launch Sidebar  
    //   </Button>  
    //   <Offcanvas placement='start' show={show} onHide={closeSidebar}>  
    //     <Offcanvas.Header closeButton>  
    //       <Offcanvas.Title>Sidebar Title</Offcanvas.Title>  
    //     </Offcanvas.Header>  
    //     <Offcanvas.Body>  
    //       <p>Images</p>
    //       <p>Some dummy text, we can have any text or element at this place. </p> 
    //     </Offcanvas.Body>  
    //   </Offcanvas>  
    //   </Container>  
    // </>  
  );  
}  
export default Home;  