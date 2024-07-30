import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
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



function Page2() {
    const [isMouseOver, setIsMouseOver] = useState(false);
    //Function for switching back and forth
    const [currentPage, setCurrentPage] = useState(0);
    const [isScrollDirectionUp, setIsScrollDirectionUp] = useState(false);
    //const [scrollDelta, setScrollDelta] = useState(0);
    
    
    function Page({src, isVisible, isDown, onWheel}:any){
      
      return(
        <motion.div
          style={{ 
            height: '400px',
            width: "200px",
            position: 'absolute',
          }}
          initial={false}
          animate={{opacity: isVisible ? 1 : 0, y: isVisible ? 0 : isDown? [0,90, 180, 0]:[0,-90, -180, 0]}}
          // transition={{delay: isVisible ? 0.15 : 0, duration: 1}}
          onWheel={onWheel}
        >
          <img alt='images' src={src} width='200px' //Different height leads to different margin
            style={{top:'50%', transform: 'translate(0%, 50%)'}}/>   {/* className="d-block mx-auto" */}
        </motion.div>
      )
    }
    document.body.style.overflow = isMouseOver? "hidden" : "scroll";
    function next(){
      let newPage = ((currentPage)+1) % pagesArr.length;
      setIsScrollDirectionUp(false);
      setCurrentPage(newPage);
    }

    function jumpDown(){
      let newPage = ((currentPage)+3) % pagesArr.length;
      setIsScrollDirectionUp(false);
      setCurrentPage(newPage);
    }
  
    function prev(){
      let newPage = (currentPage) - 1;
  
      if (newPage<0) {
        newPage = pagesArr.length - 1;
      }
  
      setIsScrollDirectionUp(true);
      setCurrentPage(newPage);
    }

    function jumpUp(){
      let newPage = (currentPage) - 3;
  
      if (newPage<0) {
        newPage = pagesArr.length - 3;
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
          <p>Current page is: {currentPage}</p>
          <div style={{borderStyle: 'dashed', height:"400px", width:"206px",
                      position:'absolute',left:'50%', top:'200px'
          }}
          onMouseEnter={()=>setIsMouseOver(true)}
          onMouseLeave={()=>setIsMouseOver(false)}>
          <button type="button" onClick={jumpUp} 
                  style={{
                    top:'-8%', left:'50%', transform: 'translate(-50%, -50%)', 
                    position:'absolute', backgroundColor:'teal', color:'white',
                    border:'none',padding:'12px 24px', borderRadius:'5px',
                    }}>Jump</button>
          <button type="button" onClick={prev} 
                  style={{width:'80px',
                    left:'-22%', top:'50%', transform: 'translate(-50%, -50%)', 
                  position:'absolute',backgroundColor:'grey', color:'white',
                  border:'none',padding:'6px 4px', borderRadius:'5px',fontSize:'18px'
                  }}>Previous</button>
          <button type="button" onClick={next} 
                  style={{ width:'80px',
                  right:'-62%', top:'50%', transform: 'translate(-50%, -50%)', 
                  position:'absolute', backgroundColor:'darkred', color:'white',
                  border:'none',padding:'6px 12px', borderRadius:'5px', fontSize:'20px'
                  }}>Next</button>
          <button type="button" onClick={jumpDown} 
                  style={{
                  bottom:'-18%', left:'50%', transform: 'translate(-50%, -50%)', 
                  position:'absolute', backgroundColor:'gold', color:'black', 
                  border:'none', padding:'6px 12px', borderRadius:'5px', fontSize:'20px'
                  }}>Jump</button>
            <div>{pagesArr.map((Page) => {return Page })}</div>
            </div>
        </Container>
      </>
    );  
    }  
    export default Page2;  


    // <button type="button" onClick={prev} 
    //               style={{marginLeft:'50%', marginTop:'0px', color:'red'}}>prev</button>
    //       <div style={{marginLeft: '45%', marginTop:'0px', 
    //                   borderStyle: 'dashed', height:"400px", width:"206px"}}>
                  
    //       <button type="button" onClick={next} 
    //               style={{marginLeft:'-60px', marginTop:'100px', color:'gold'}}>Next</button>
    //       <div> {pagesArr.map((Page) => {
    //             return Page  })}
    //       </div>
    //       <button type="button" onClick={prev} 
    //               style={{marginLeft:'200px', marginTop:'100px', color:'silver'}}>prev</button>
          
    //       </div>
    //       <button onClick={prev} 
    //               style={{marginLeft:'50%', marginTop:'200px', color:'teal'}}>prev</button>