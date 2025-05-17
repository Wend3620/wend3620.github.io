import MiniDrawer from "./miniDrawer"
import descrip from './compo/description.pdf' 
export default function Blogs(){
    return (
        <div>
        <MiniDrawer/>
          <iframe
            src= {descrip}
            title="PDF Viewer"
            width="75%" 
            height="1000px"
            style={{margin: 'auto', display:'flex',
                    marginTop: -5
            }}
          />
        </div>
    )

}