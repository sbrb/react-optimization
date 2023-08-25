// import "./App.css";
// import React, { useState } from "react";
// import { Switch, Route, useParams } from "react-router-dom";

// function App() {
//   const Home = () => {
//     return <div>Home</div>;
//   };

//   const Product = (props) => {
//     const params = useParams();
//     const [data, setData] = useState("");

//     const fetchData = () =>
//       new Promise((resolve, reject) => {
//         setTimeout(() => {
//           setData(params.id);
//           resolve();
//         }, 2000);
//       });

//     fetchData();

//     return <div>Product {data}</div>;
//   };

//   return (
//     <Switch>
//       <Route exact path="/" component={Home} />
//       <Route path="/product/:id" component={Product} />
//     </Switch>
//   );
// }

// export default App;





import React, { lazy, Suspense } from "react";
import { Switch, Route, Link } from "react-router-dom";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </Suspense>
    </div>
  );
};

export default App;


