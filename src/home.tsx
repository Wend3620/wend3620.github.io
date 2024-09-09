import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
import './decor/helper.css';
import General from './general';
import { Component  } from './trial';
export interface GeneralProps {
  currentPage: string,
}
//Fancy constant, but how good is it?
// 
function Home() {  
  
  return (  
    <>
      <General currentPage='/'/>

      <Container className="content">
        <p></p>
        <h2>Practice 2</h2>
        <p>I am getting better at this!</p>
        <p>Hope there could be a major update soon!</p>
        <h3>CAPITALIZED</h3>
        <Component/>
      </Container>
      <h1>A new age has come!</h1>
      <h1>BARE WITNESS!!!!</h1>
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