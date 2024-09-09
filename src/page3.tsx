// Seek to work on cursor feedback 
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container} from 'react-bootstrap';  
import './decor/helper.css';
import './decor/rect.css';
import { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import General from './general';

// let [mark, setMark]= useState<{ x: number; y: number; width: number; height: number; key: string }[]>([]);
let mark: number[] = [0, 0, 0, 0];
const DrawAnnotations = () => {
  const [annotations, setAnnotations] = useState<{ x: number; y: number; width: number; height: number; key: string }[]>([]);
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
  // annotationsToDraw.map(value => {
  //   setMark([{
  //       x: value.x,
  //       y: value.y,
  //       width: value.width,
  //       height: value.height,
  //       key: value.key
  //   }])
  // }) 
  mark[0] = annotationsToDraw[0].x;
  mark[1] = annotationsToDraw[0].y;
  mark[2] = annotationsToDraw[0].width;
  mark[3] = annotationsToDraw[0].height;
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

function Trigger() {
      const jsonData = {
        "Values": [
            {
                "x": mark[0], 
                "width": mark[2]
            },
            {
                "y": mark[1], 
                "height": mark[3]
            }
        ]
      }

  
    function handleClick() {
      
      // Send data to the backend via POST
      fetch('https://34.162.230.12:5000/', {  // Enter your IP address here
  
        method: 'POST', 
        mode: 'cors', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin':'*'
        },
        
        body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
  
      }).then((response) => response.json())
      .then((data) => {
         console.log(data);
         // Handle data
      })
      .catch((err) => {
         console.log(JSON.stringify(err));
      });
      
    }
  
    return (
      <button onClick={handleClick} tabIndex={0} style={{
        textAlign: 'center',
        width: '100px',
        border: '1px solid gray',
        borderRadius: '5px'
      }}>
        Send data to backend
      </button>
    );
  
  }
  
  export { Trigger };

export default function Page3() {
  return (  
    <>
      
      <General currentPage='/pg3'/>
      <Container className="content">
      <p></p>
      <h1><b>Page3!!!</b></h1>
      <h2>Cursor practice</h2>
      <p style={{textAlign: 'center',}}><h3>Press and drag!</h3></p>
      <DrawAnnotations />
      <Trigger/>
      </Container>
    </>
  );  
}  
