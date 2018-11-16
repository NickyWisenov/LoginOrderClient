import React from 'react';
import { Link } from 'react-router-dom';

export default () =>{
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Movie Order APP</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                  </li>
              </ul>
          </div>
      </nav>
    );
}