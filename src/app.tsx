import 'bootstrap/dist/css/bootstrap.min.css';  

import {
    Routes,
    Route,
    Navigate,
    HashRouter,
} from "react-router-dom";
import Home from "./home.tsx";
import Page1 from "./page1.tsx";
import Page2 from "./page2.tsx";
function App() {  
    return (
        <>
        {/* This is the alias of BrowserRouter i.e. Router 
        Seems like we need to use hash router as gitpages support it more*/}
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/page1" element={<Page1/>}/>
                <Route path="/pg2" element={<Page2/>}/>
                {/* If any route mismatches the upper 
      route endpoints then, redirect triggers 
      and redirects app to home component with to="/" */}
                {/* <Redirect to="/" /> */}
                <Route
                    path="*"
                    element={<Navigate to="/page1" />}
                />
            </Routes>
        </HashRouter>
    </>
    )

}

export default App;