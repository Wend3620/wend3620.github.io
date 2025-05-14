import 'bootstrap/dist/css/bootstrap.min.css';  

import {Routes,Route, HashRouter} 
from "react-router-dom";
// import Home from "./home.tsx";
import Page1 from "./pg1.tsx";
import Buggy from './buggy.tsx';
import About from './about.tsx';
import Minidrawer from './miniDrawer.tsx'
import Blogs from './blog.tsx';
function App() {  
    return (
        <>
        {/* This is the alias of BrowserRouter i.e. Router 
        Seems like we need to use hash router as gitpages support it more*/}
        <HashRouter>
            <Routes>
                <Route path="/" element={<Page1/>}/>
                <Route path="/EC-AIFS" element={<Page1/>}/>
                <Route path="/Model2" element={<Minidrawer/>}/>
                <Route path="/Model3" element={<Minidrawer/>}/>
                <Route path="/About" element={<About/>}/>
                <Route path="/Blogs" element={<Blogs/>}/>
                {/* <Route path="/action/3.4" element={<a href='http://34.162.230.12:8000/'/>}/> */}
                {/* ['EC-AIFS', 'Model2(GFS?)', 'Model3(TBD)'] */}
                {/* If any route mismatches the upper 
      route endpoints then, redirect triggers 
      and redirects app to home component with to="/" */}
                {/* <Redirect to="/" /> */}
                <Route
                    path="*"
                    // element={<Navigate to="/" />}
                    element={<Buggy/>}
                />
            </Routes>
        </HashRouter>
    </>
    )

}

export default App;