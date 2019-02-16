import React from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Index from './views/Index'
import MainPage from './views/MainPage'
import Search from './views/Search'
import Status from './views/Status'
import CartInfo from './views/CartInfo'
import BackEnd from './views/BackEnd'
import Product from './views/Product'
const AppRouter = () => (
       <Router>
       <span>
       {/* <Link to='/'>首页</Link>
       <Link to='/MainPage'>首页</Link> */}
          <Route  path="/" exact component={Index} />
          <Route path="/MainPage/" exact  component={MainPage}/>
          <Route path="/CartInfo/" component={CartInfo}/>
          <Route path="/Search" component={Search}/>
          <Route path="/Status" component={Status}/>
          <Route path="/BackEnd" component={BackEnd}/>
          <Route path="/Product/:id" component={Product}/>
       </span>
    </Router>  );
  
  export default AppRouter;