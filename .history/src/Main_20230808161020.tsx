import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import App from "./App";
import Login from "./Login";

function App() {
    return (
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
  
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </div>
      </BrowserRouter>
    );
  }
  
  function Home() {
    return <h1>Home</h1>;
  }
  
  function About() {
    return <h1>About</h1>;
  }





// function Main() {

//     return(
//         <BrowserRouter>
//             <div>
//                 <Route path="/" exact Component={SignIn} />
//                 <Route path="/home" Component={Home} />
//             </div>
//         </BrowserRouter>
//     );
// }  


//     const SignIn = () => {
//         return(
//             <>
//                 <Login />
//                 <App />
//             </>
//         )
//     }

//     const Home = () => {
//         return(
//             <>
//                 <App />
//             </>
//         )
//     }


export default Main; 