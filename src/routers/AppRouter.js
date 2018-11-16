import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// Import Component
import NavigationBar from '../components/NavigationBar';
import App from '../components/App';
import SignupPage from '../components/signup/SignupPage';
import LoginPage from '../components/login/LoginPage';



const AppRouter = () => (
  <BrowserRouter>
    <div>
      <NavigationBar />
      <Route path="/" component={App} exact={true} />
      <div className="container">
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage}/>
      </div>
    </div>
  </BrowserRouter>
);
export default AppRouter;
