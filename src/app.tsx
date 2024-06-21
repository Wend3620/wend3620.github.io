import 'bootstrap/dist/css/bootstrap.min.css';  

import {
    Routes,
    Route,
    Navigate,
    HashRouter,
} from "react-router-dom";
import Home from "./home.tsx";
import Page1 from "./page1.tsx";
function App() {  
    return (
        <>
        {/* This is the alias of BrowserRouter i.e. Router */}
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/Page1"
                    element={<Page1 />}
                />

                {/* If any route mismatches the upper 
      route endpoints then, redirect triggers 
      and redirects app to home component with to="/" */}
                {/* <Redirect to="/" /> */}
                <Route
                    path="/*"
                    element={<Navigate to="/" />}
                />
            </Routes>
        </HashRouter>
    </>
    )

}

export default App;