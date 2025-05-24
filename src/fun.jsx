import React, { useState, useRef, useEffect } from 'react';

const ParabolaDrawer = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('drag'); // 'drag' or 'bezier'
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTarget, setDragTarget] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);
    
    // Draw all completed parabolas
    lines.forEach(line => {
      if (line.controlPoint) {
        drawParabola(ctx, line);
      } else {
        drawStraightLine(ctx, line);
      }
      drawControlPoints(ctx, line);
    });
    
    // Draw current line being created
    if (currentLine) {
      if (currentLine.controlPoint) {
        drawParabola(ctx, currentLine);
      } else {
        drawStraightLine(ctx, currentLine);
      }
      drawControlPoints(ctx, currentLine);
    }
  }, [lines, currentLine, mode]);

  const drawGrid = (ctx, width, height) => {
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawStraightLine = (ctx, line) => {
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    ctx.lineTo(line.end.x, line.end.y);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const drawParabola = (ctx, line) => {
    if (mode === 'drag') {
      drawQuadraticParabola(ctx, line);
    } else {
      drawBezierParabola(ctx, line);
    }
  };

  const drawQuadraticParabola = (ctx, line) => {
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    // Use quadratic interpolation through 3 points
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const point = quadraticInterpolation(line.start, line.controlPoint, line.end, t);
      
      if (i === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    }
    
    ctx.stroke();
  };

  const drawBezierParabola = (ctx, line) => {
    ctx.strokeStyle = '#44ff44';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(line.start.x, line.start.y);
    
    // Use quadratic Bezier curve
    ctx.quadraticCurveTo(
      line.controlPoint.x, 
      line.controlPoint.y, 
      line.end.x, 
      line.end.y
    );
    
    ctx.stroke();
  };

  const quadraticInterpolation = (p0, p1, p2, t) => {
    // Quadratic interpolation through 3 points
    const mt = 1 - t;
    const mt2 = mt * mt;
    const t2 = t * t;
    
    return {
      x: mt2 * p0.x + 2 * mt * t * p1.x + t2 * p2.x,
      y: mt2 * p0.y + 2 * mt * t * p1.y + t2 * p2.y
    };
  };

  const drawControlPoints = (ctx, line) => {
    // Draw start point
    ctx.fillStyle = '#007bff';
    ctx.beginPath();
    ctx.arc(line.start.x, line.start.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw end point
    ctx.fillStyle = '#007bff';
    ctx.beginPath();
    ctx.arc(line.end.x, line.end.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw control point if it exists
    if (line.controlPoint) {
      ctx.fillStyle = '#ff6b6b';
      ctx.beginPath();
      ctx.arc(line.controlPoint.x, line.controlPoint.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw connection lines to show control relationship
      ctx.strokeStyle = 'rgba(255, 107, 107, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.controlPoint.x, line.controlPoint.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
      
      ctx.setLineDash([]);
    }
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const distance = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  };

  const getMidpoint = (p1, p2) => {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2
    };
  };

  const findClickTarget = (mousePos) => {
    // Check current line first
    if (currentLine) {
      if (currentLine.controlPoint && distance(mousePos, currentLine.controlPoint) < 15) {
        return { type: 'control', lineIndex: -1 };
      }
      if (distance(mousePos, currentLine.start) < 15) {
        return { type: 'start', lineIndex: -1 };
      }
      if (distance(mousePos, currentLine.end) < 0) {
        return { type: 'end', lineIndex: -1 };
      }
    }
    
    // Check existing lines
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i];
      if (line.controlPoint && distance(mousePos, line.controlPoint) < 15) {
        return { type: 'control', lineIndex: i };
      }
      if (distance(mousePos, line.start) < 15) {
        return { type: 'start', lineIndex: i };
      }
      if (distance(mousePos, line.end) < 15) {
        return { type: 'end', lineIndex: i };
      }
    }
    
    return null;
  };

  const handleMouseDown = (e) => {
    const mousePos = getMousePos(e);
    const target = findClickTarget(mousePos);
    
    if (target) {
      setIsDragging(true);
      setDragTarget(target);
      e.preventDefault(); // Prevent default behavior when dragging
    } else {
      // Creating a new line - use click events, not drag
      if (!currentLine) {
        // Start new line
        setCurrentLine({
          start: mousePos,
          end: mousePos,
          controlPoint: null
        });
      } else if (!currentLine.controlPoint) {
        // Complete the line and add control point
        const newLine = {
          ...currentLine,
          end: mousePos,
          controlPoint: getMidpoint(currentLine.start, mousePos)
        };
        setCurrentLine(newLine);
      } else {
        // Finish the current line and save it
        setLines(prev => [...prev, currentLine]);
        setCurrentLine(null);
      }
    }
  };

  const handleMouseMove = (e) => {
    const mousePos = getMousePos(e);
    
    if (isDragging && dragTarget) {
      if (dragTarget.lineIndex === -1) {
        // Dragging current line
        setCurrentLine(prev => {
          if (!prev) return null;
          const newLine = { ...prev };
          
          if (dragTarget.type === 'control') {
            newLine.controlPoint = mousePos;
          } else if (dragTarget.type === 'start') {
            newLine.start = mousePos;
            if (newLine.controlPoint) {
              newLine.controlPoint = getMidpoint(newLine.start, newLine.end);
            }
          } else if (dragTarget.type === 'end') {
            newLine.end = mousePos;
            if (newLine.controlPoint) {
              newLine.controlPoint = getMidpoint(newLine.start, newLine.end);
            }
          }
          
          return newLine;
        });
      } else {
        // Dragging existing line
        setLines(prev => {
          const newLines = [...prev];
          const line = { ...newLines[dragTarget.lineIndex] };
          
          if (dragTarget.type === 'control') {
            line.controlPoint = mousePos;
          } else if (dragTarget.type === 'start') {
            line.start = mousePos;
            if (line.controlPoint) {
              line.controlPoint = getMidpoint(line.start, line.end);
            }
          } else if (dragTarget.type === 'end') {
            line.end = mousePos;
            if (line.controlPoint) {
              line.controlPoint = getMidpoint(line.start, line.end);
            }
          }
          
          newLines[dragTarget.lineIndex] = line;
          return newLines;
        });
      }
    } else if (currentLine && !currentLine.controlPoint && !isDragging) {
      // Update end point while creating line (only when not dragging)
      setCurrentLine(prev => ({
        ...prev,
        end: mousePos
      }));
    }
    
    // Update cursor
    const canvas = canvasRef.current;
    const target = findClickTarget(mousePos);
    canvas.style.cursor = target ? 'pointer' : 'crosshair';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragTarget(null);
  };

  const clearCanvas = () => {
    setLines([]);
    setCurrentLine(null);
  };

  const undoLast = () => {
    if (currentLine) {
      setCurrentLine(null);
    } else if (lines.length > 0) {
      setLines(prev => prev.slice(0, -1));
    }
  };

  const generatePointsOnParabola = (line, numPoints = 5) => {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);
      let point;
      
      if (mode === 'drag') {
        point = quadraticInterpolation(line.start, line.controlPoint, line.end, t);
      } else {
        // For Bezier curves
        const mt = 1 - t;
        point = {
          x: mt * mt * line.start.x + 2 * mt * t * line.controlPoint.x + t * t * line.end.x,
          y: mt * mt * line.start.y + 2 * mt * t * line.controlPoint.y + t * t * line.end.y
        };
      }
      
      points.push({
        x: Math.round(point.x * 100) / 100, // Round to 2 decimal places
        y: Math.round(point.y * 100) / 100,
        t: Math.round(t * 100) / 100
      });
    }
    return points;
  };

  const calculateParabolaEquation = (line) => {
    if (!line.controlPoint) return null;
    
    // For a parabola through 3 points, solve y = ax² + bx + c
    const p1 = line.start;
    const p2 = line.controlPoint;
    const p3 = line.end;
    
    try {
      const x1 = p1.x, y1 = p1.y;
      const x2 = p2.x, y2 = p2.y;
      const x3 = p3.x, y3 = p3.y;
      
      const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
      if (Math.abs(denom) < 1e-10) return null;
      
      const a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denom;
      const b = (x3 * x3 * (y1 - y2) + x2 * x2 * (y3 - y1) + x1 * x1 * (y2 - y3)) / denom;
      const c = (x2 * x3 * (x2 - x3) * y1 + x3 * x1 * (x3 - x1) * y2 + x1 * x2 * (x1 - x2) * y3) / denom;
      
      return {
        a: Math.round(a * 1000000) / 1000000,
        b: Math.round(b * 1000000) / 1000000,
        c: Math.round(c * 1000000) / 1000000,
        equation: `y = ${a.toFixed(6)}x² + ${b.toFixed(6)}x + ${c.toFixed(6)}`
      };
    } catch (e) {
      return null;
    }
  };

  const exportToJSON = (format = 'points') => {
    const allLines = [...lines];
    if (currentLine && currentLine.controlPoint) {
      allLines.push(currentLine);
    }
    
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        mode: mode,
        format: format,
        totalParabolas: allLines.length,
        canvasDimensions: { width: 800, height: 600 }
      },
      parabolas: []
    };
    
    allLines.forEach((line, index) => {
      if (!line.controlPoint) return;
      
      const parabolaData = {
        id: index + 1,
        controlPoints: {
          start: { x: line.start.x, y: line.start.y },
          control: { x: line.controlPoint.x, y: line.controlPoint.y },
          end: { x: line.end.x, y: line.end.y }
        }
      };
      
      if (format === 'points' || format === 'both') {
        parabolaData.samplePoints = generatePointsOnParabola(line, 5);
      }
      
      if (format === 'equation' || format === 'both') {
        const equation = calculateParabolaEquation(line);
        if (equation) {
          parabolaData.equation = equation;
        }
      }
      
      exportData.parabolas.push(parabolaData);
    });
    
    return exportData;
  };

  const downloadJSON = (format = 'points') => {
    const data = exportToJSON(format);
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `parabolas_${format}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.parabolas && Array.isArray(data.parabolas)) {
          const importedLines = data.parabolas.map(p => ({
            start: p.controlPoints.start,
            controlPoint: p.controlPoints.control,
            end: p.controlPoints.end
          }));
          
          setLines(importedLines);
          setCurrentLine(null);
          
          // Update mode if specified
          if (data.metadata && data.metadata.mode) {
            setMode(data.metadata.mode);
          }
        }
      } catch (error) {
        alert('Error importing JSON file. Please check the file format.');
        console.error('Import error:', error);
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Interactive Parabola from Line
        </h1>
        
        <div className="mb-4 text-center">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setMode('drag')}
              className={`px-4 py-2 rounded transition-colors ${
                mode === 'drag' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Quadratic Mode
            </button>
            <button
              onClick={() => setMode('bezier')}
              className={`px-4 py-2 rounded transition-colors ${
                mode === 'bezier' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Bezier Mode
            </button>
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            <p className="mb-2">
              <strong>Step 1:</strong> Click once to start, move mouse to see preview, click again to set endpoint
            </p>
            <p className="mb-2">
              <strong>Step 2:</strong> Drag the red control point to bend the line into a parabola
            </p>
            <p className="mb-2">
              <strong>Step 3:</strong> Click anywhere empty to finish and start a new line
            </p>
            <p>
              You can drag blue endpoints and red control points anytime to reshape
            </p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          <button
            onClick={clearCanvas}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={undoLast}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Undo Last
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => downloadJSON('points')}
              className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
              disabled={lines.length === 0 && !currentLine?.controlPoint}
            >
              Export Points
            </button>
            <button
              onClick={() => downloadJSON('equation')}
              className="px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-sm"
              disabled={lines.length === 0 && !currentLine?.controlPoint}
            >
              Export Equations
            </button>
            <button
              onClick={() => downloadJSON('both')}
              className="px-3 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors text-sm"
              disabled={lines.length === 0 && !currentLine?.controlPoint}
            >
              Export Both
            </button>
          </div>
          
          <label className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors cursor-pointer">
            Import JSON
            <input
              type="file"
              accept=".json"
              onChange={importFromJSON}
              className="hidden"
            />
          </label>
        </div>
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            className="border-2 border-gray-300 rounded shadow-md bg-white"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Blue dots: Line endpoints (draggable)
          </p>
          <p>
            <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span>
            Red dot: Control point (drag to bend line into parabola)
          </p>
          <p className="mt-2">
            {mode === 'drag' ? 'Red curves: True parabolas' : 'Green curves: Bezier curves'}
          </p>
          <div className="mt-2 text-xs">
            <p><strong>Export Options:</strong></p>
            <p>• Points: 5 sample points along each parabola</p>
            <p>• Equations: Mathematical coefficients (y = ax² + bx + c)</p>
            <p>• Both: Complete data with points and equations</p>
          </div>
          {(lines.length > 0 || currentLine?.controlPoint) && (
            <p className="mt-2">
              Total parabolas: {lines.length + (currentLine?.controlPoint ? 1 : 0)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParabolaDrawer;