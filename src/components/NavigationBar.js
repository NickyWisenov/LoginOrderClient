import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/loginActions';
import { withRouter } from 'react-router-dom';

class NaviationBar extends React.Component {
    onLogout (e) {
      e.preventDefault();
      this.props.logoutUser(this.props.history);
    }

    render() {
      const { isAuthenticated, user } = this.props.auth;
      return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">Movie Order APP</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {
                          !isAuthenticated ? 
                            <Link className="nav-link" to="/login">Login</Link>
                            :
                            <a href="#" className="nav-link" onClick={this.onLogout.bind(this)} >LogOut</a>
                        }
                    </li>
                </ul>
            </div>
        </nav>
      );
    }

}

NaviationBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NaviationBar));

