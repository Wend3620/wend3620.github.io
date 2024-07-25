import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
import './decor/helper.css';

import General from './general.tsx';

function Page1() {  

  return (  
    <>
      <General currentPage='/pg1'/>
      
      <Container className="content">
        <h2>Page1</h2>
        <p>If you see this then I hope you have a great day</p>
      </Container>
    </>
     
  );  
}  
export default Page1;  

export interface GeneralProps extends React.PropsWithChildren<{}> {
  currentPage: string;
}
  /* old page1:
    let open=true;
    function change() {
      if(open){
        document.documentElement.style.setProperty('--modify', '100px')
        open=false;
      }else{
        document.documentElement.style.setProperty('--modify', '135px')
        open=true;
      }
    }
    <Container className="sidebar">
    <p></p>
    <a href="/">Home</a>
    <a className="active" href="#/pg1">Page 1</a>
    <a href="#/pg2">Page 2</a>
    <a href="#/pg3">Page 3</a>
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
      <p></p>
      <button onClick={change}>Control</button>
    </Container> */
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