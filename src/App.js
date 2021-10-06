import React from 'react';
import { BrowserRouter, Switch, Route }from 'react-router-dom';
import Login from './components/login/Login';
import Layout from './layout/Layout';
import Productos from './components/Productos';
import NotFound from './container/NotFound';
import Home from './components/Home';
function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/productos' component={Productos} />
          <Route exact path='/home' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
