import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../components/App';
import SignupPage from '../components/signup/SignupPage';



const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
      <Route path="/" component={App} exact={true} />
        <Route path="/signup" component={SignupPage}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
