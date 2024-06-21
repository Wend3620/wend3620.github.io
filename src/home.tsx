import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, NavDropdown, Container} from 'react-bootstrap';  
// import {useState} from 'react';
import './helper.css';
function Home() {  
  // const [show, setShow] = useState(false);  
  // const closeSidebar = () => setShow(false);  
  // const showSidebar = () => setShow(true);  
  
  return (  
    <>
      <Container className="sidebar">
        <a className="active" href="/">Home</a>
        <a href="/Page1">Page 1</a>
        <a href="/pg2">Page 2</a>
        <a href="/pg3">Page 3</a>
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
      </Container>

      <Container className="content">
        <h2>Practice 2</h2>
        <p>I am getting better at this!</p>
        <p>Hope there could be a major update soon!</p>
        <h3>CAPITALIZED</h3>
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