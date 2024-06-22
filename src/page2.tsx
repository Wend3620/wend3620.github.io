import 'bootstrap/dist/css/bootstrap.min.css';  
import {Nav, NavDropdown, Container} from 'react-bootstrap';  
import './helper.css';

function Page2() {  
    //   const [show, setShow] = useState(false);  
      return (  
        <>
          <Container className="sidebar">
            <a href="#/">Home</a>
            <a href="#/page1">Page 1</a>
            <a className="active" href="#/pg2">Page 2</a>
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
          </Container>
    
          <Container className="content">
            <h2>Page2</h2>
            <img src="/compo/Aurora1.png" width="300" alt="Aurora on 5.10"/>
          </Container>
        </>
      );  
    }  
    export default Page2;  