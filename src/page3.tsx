// Seek to work on cursor feedback 
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
import './decor/helper.css';
import './decor/rect.css';
import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import General from './general';

// let [mark, setMark]= useState<{ x: number; y: number; width: number; height: number; key: string }[]>([]);
 
// function Printing(input:any){
//   return(
//   <div><p>{input}</p></div>)
// }
export default function Page3() {
  const [annotations, setAnnotations] = useState<{ x: number; y: number; width: number; height: number; key: string }[]>([]);
  function DrawAnnotations (){
    
    const [newAnnotation, setNewAnnotation] = useState<{ x: number; y: number; width: number; height: number; key: string }[]>([]);

    const handleMouseDown = (event:any) => {
      if (newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    };

    const handleMouseUp = (event:any) => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: (annotations.length + 1).toString()
        };
        
        annotations.push(annotationToAdd);
        // values.push(annotationToAdd);
        // setValues([...annotations]);
        setNewAnnotation([]);
        setAnnotations([...annotations]);
        
      
      }
    };

    const handleMouseMove = (event:any) => {
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            key: "0"
          }
        ]);
      }
    };

    const annotationsToDraw = [...annotations, ...newAnnotation];
    
    return (
      <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={1600}
        height={900}
      >
        <Layer>
          {annotationsToDraw.map(value => {
            return (
              <Rect
                x={value.x}
                y={value.y}
                width={value.width}
                height={value.height}
                key={value.key}
                fill="transparent"
                stroke="black"
              />
              
            );
          })}
        </Layer>

      </Stage>
    );
  };
  return (  
    <>
      
      <General currentPage='/pg3'/>
      <Container className="content">
      <p></p>
      <h1><b>Page3!!!</b></h1>
      <h2>Cursor practice</h2>
      <p style={{textAlign: 'center',}}><h3>Press and drag!</h3></p>
      <DrawAnnotations />
      {annotations.map(value => {
            return (
              <p>x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              key={value.key}
              fill="transparent"
              stroke="black"</p>
                
              
            );
          })}
      </Container>
    </>
  );  
}  
