import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Button} from 'react-bootstrap';  
import './decor/helper.css';
import test1 from './compo/1.jpg';
import test2 from './compo/2.jpg';
import test3 from './compo/3.jpg';
import test4 from './compo/4.gif';
import test5 from './compo/5.gif';
import test6 from './compo/6.gif';
import { useState} from 'react';
import { motion } from "framer-motion"
import General from './general';

export function Page({src, isVisible, isDown, onWheel}:any){

  return(
    <motion.div
      style={{ 
        height: '400px',
        width: "200px",
        position: 'absolute',
        overflow: 'hidden',
      }}
      animate={{opacity: isVisible ? 1 : 0, y: isVisible ? 0 : isDown?[0,90, 180, 0]:[0,-90,-180, 0]}}
      //transition={{delay: isVisible ? 0.15 : 0, duration: 0.5}}
      onWheel={onWheel}
    >
      <img src={src} width='200px' alt="example" className="d-block mx-auto"/>
    </motion.div>
  )
}
function Page2() {
    //Function for switching back and forth
    const [currentPage, setCurrentPage] = useState(0);
    const [isScrollDirectionUp, setIsScrollDirectionUp] = useState(true);
    //const [scrollDelta, setScrollDelta] = useState(0);
    function next(){
      document.body.style.overflow='hidden'
      let newPage = (+(currentPage)+1) % pagesArr.length;
      setIsScrollDirectionUp(false);
      setCurrentPage(newPage);
    }
  
    function prev(){
      document.body.style.overflow='hidden'
      let newPage = +(currentPage) - 1;
  
      if (newPage<0) {
        newPage = pagesArr.length - 1;
      }
  
      setIsScrollDirectionUp(true);
      setCurrentPage(newPage);
      
    }
    /**
   * @param event {Event}
   */
    function onWheel(event:any) {

      const THRESHOLD = 55;
      if (event.deltaY > THRESHOLD) {
        next();
        //document.body.style.overflow='auto'
      }
      
      if (event.deltaY < -THRESHOLD) {
        prev();
        //document.body.style.overflow='auto'
      }
    }
    const pagesArr = [
      <Page key={0} src={test1} isVisible={currentPage===0} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
      <Page key={1} src={test2} isVisible={currentPage===1} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
      <Page key={2} src={test3} isVisible={currentPage===2} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
      <Page key={3} src={test4} isVisible={currentPage===3} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
      <Page key={4} src={test5} isVisible={currentPage===4} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
      <Page key={5} src={test6} isVisible={currentPage===5} isDown={isScrollDirectionUp} onWheel={onWheel}/>,
    ]
      
    return (
      <>  
        <General currentPage='/pg2'/>
        
        <Container className='content'>
          
          <p></p>
          <h1><b>Page2!!!</b></h1>
          <p></p>
          <Button variant="secondary" onClick={prev} 
                  style={{marginLeft:'36%', marginTop:'0px'}}>prev</Button>
          <div style={{display: 'block',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: '50%'}}>
          <div style={{marginBottom:'0px'}}>
            {pagesArr.map((Page) => {
              return Page
            })}
          </div>
          <Button variant="light" onClick={next} 
                  style={{marginLeft:'-60px', marginTop:'100px'}}>Next</Button>
          <Button variant="dark" onClick={prev} 
                  style={{marginLeft:'200px', marginTop:'100px'}}>prev</Button>
          
          <Button variant="info" onClick={prev} 
                  style={{marginLeft:'70px', marginTop:'100px'}}>prev</Button>
          </div>
        </Container>
      </>
    );  
    }  
    export default Page2;  