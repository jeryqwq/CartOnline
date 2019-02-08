import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './views/Index'
import MainPage from './views/MainPage'
const AppRouter = () => (
    <Router>
       <span>
       {/* <Link to='/'>首页</Link>
       <Link to='/MainPage'>首页</Link> */}
          <Route  path="/" exact component={Index} />
          <Route path="/MainPage/" exact  component={MainPage}/>
       </span>
    </Router>
  );
  
  export default AppRouter;