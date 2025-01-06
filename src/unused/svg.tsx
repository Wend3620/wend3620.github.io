// import * as React from 'react';
// import test1 from './compo/testing.svg';

// const SVGLayerController = () => {
//   const [svgContent, setSvgContent] = React.useState<string | null>(null);
//   const [layers, setLayers] = React.useState<{ [key: string]: boolean }>({});
  
//     const sampleSVG = test1;


//     const layerSelectors = {
//         'S1': '#GeoContourSet_1',
//         'S2': '#GeoContourSet_2',
//         'S3': '#GeoContourSet_3',
//       };
//       React.useEffect(() => {
//         fetch(sampleSVG)
//           .then(res => res.text())
//           .then(text => setSvgContent(text));
//         initializeLayers();
//       }, []);
    
    
//       const initializeLayers = () => {
//         const initialLayers: { [key: string]: boolean } = {};
//         Object.keys(layerSelectors).forEach(name => {
//           initialLayers[name] = true;
//         });
//         setLayers(initialLayers);
//       };
    
//     const toggleLayer = (layerName: keyof typeof layerSelectors): void => {
//       setLayers((prev: { [key: string]: boolean }) => ({
//         ...prev,
//         [layerName]: !prev[layerName]
//       }));
//     };
    
//       const getProcessedSVG = () => {
//           if (!svgContent) return '';
          
//           const parser = new DOMParser();
//           const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
          
//           // Apply visibility to each layer using its corresponding selector
//           Object.entries(layers).forEach(([layerName, isVisible]) => {
//             const selector = layerSelectors[layerName as keyof typeof layerSelectors];
//           const elements = svgDoc.querySelectorAll(selector);
//           elements.forEach(element => {
//             (element as HTMLElement).style.display = isVisible ? 'block' : 'none';
//           });
//         });
        
//         return svgDoc.documentElement.outerHTML;
//       };
    
//       return (
//         <div className="w-20 mx-auto p-2">
//           {/* Layer controls */}
//           <div className="mb-0 flex flex-wrap gap-2">
//             {Object.entries(layers).map(([layerName, isVisible]) => (
//               <button
//                 key={layerName}
//                 onClick={() => toggleLayer(layerName as keyof typeof layerSelectors)}
//                 className={`px-4 py-2 rounded ${
//                   isVisible
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-gray-200 text-gray-700'
//                 }`}
//               >
//                 {layerName}
//               </button>
//             ))}
//           </div>
    
//           {/* SVG display */}
//           <div 
//             className="border border-gray-200 rounded p-4"
//             dangerouslySetInnerHTML={{ __html: getProcessedSVG() }}
//           />
    
//           {/* Examples of different selectors */}
//           <div className="mt-4 p-4 bg-gray-100 rounded">
//             <h3 className="font-bold mb-2">Example Selectors:</h3>
//             <ul className="space-y-2">
//               <li><code className="bg-gray-200 px-2 py-1 rounded">By ID: #layername</code></li>
//               <li><code className="bg-gray-200 px-2 py-1 rounded">By Class: .classname</code></li>
//               <li><code className="bg-gray-200 px-2 py-1 rounded">By Data Attribute: [data-layer="name"]</code></li>

//             </ul>
//           </div>
//         </div>
//       );
//     };
    
//     export default SVGLayerController;