import 'bootstrap/dist/css/bootstrap.min.css';  
import './decor/buggy.css' ;
// import {Navigate} from "react-router-dom";

export default function Buggy() {
    document.body.setAttribute('class', 'back');
    return(
    <div className='space'>
        <p></p>
        <h1>Hello!</h1>
        <p>Perhaps the page you are looking at could be precisely described by the name of the landscape in the background photo...</p>
        <a href="https://wend3620.github.io/">Home</a>
    </div>
    );
}