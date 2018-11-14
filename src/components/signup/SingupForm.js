import React from 'react';
import { connect } from 'react-redux';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this. state = {
      username: '',
      password: '',
       errors: {}
    }; 

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };    
  
  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.onSignupRequest(this.state);
  };


  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
}

  render() {
    const {errors} = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
      <h1>Please Sing In!!</h1>
          <div className="form-group">
          <label>Username</label>
              <input
              type="text"
              className="form-control"
              name="username"
              value={ this.state.username }
              onChange={ this.handleChange }
            />
            {errors.username}
          </div>
          <div className="form-group">
          <label>Password</label>
              <input
              type="text"
              className="form-control"
              name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
            />
          </div>
          {errors.password}
          
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Sign Up</button>

          </div>
        </form>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
})



export default connect(mapStateToProps)(SignupForm);
