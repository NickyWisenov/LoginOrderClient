import React from 'react';
import { BrowserRouter, Route, history } from 'react-router-dom';

// Import Component
import NavigationBar from '../components/NavigationBar';
import App from '../components/App';
import SignupPage from '../components/signup/SignupPage';
import LoginPage from '../components/login/LoginPage';
import WelcomePage from '../components/welcome/WelcomePage';
import OrderPage from '../components/order/OrderPage';

const AppRouter = () => (
  <BrowserRouter history={history}>
    <div>
      <NavigationBar />
      <div className="container main-body">
        <Route path="/" component={App} exact={true} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/welcome" component={WelcomePage} />
        <Route path="/order" component={OrderPage} />
      </div>
    </div>
  </BrowserRouter>
);
export default AppRouter;
