import 'bootstrap/dist/css/bootstrap.min.css';  

import {Routes,Route, HashRouter} 
from "react-router-dom";
import Home from "./home.tsx";
import Page1 from "./page1.tsx";
import Page2 from "./page2.tsx";
import Page3 from "./page3.tsx";
import Buggy from "./buggy.tsx";
function App() {  
    return (
        <>
        {/* This is the alias of BrowserRouter i.e. Router 
        Seems like we need to use hash router as gitpages support it more*/}
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/pg1" element={<Page1/>}/>
                <Route path="/pg2" element={<Page2/>}/>
                <Route path="/pg3" element={<Page3/>}/>
                {/* <Route path="/action/3.4" element={<a href='http://34.162.230.12:8000/'/>}/> */}
                
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