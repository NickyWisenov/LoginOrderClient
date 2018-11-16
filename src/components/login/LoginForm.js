import React from 'react';
import { connect } from 'react-redux';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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
    console.log(this.state);
    return (
      <div className="login-form">
        <h1 className="login-form-title">Please Log In!</h1>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              className={errors.email ? "form-control is-invalid" : "form-control"}
              name="email"
              value={ this.state.email }
              onChange={ this.handleChange }
              placeholder="Please Insert your Email Here..."
            />
            <div className="invalid-feedback">
                {errors.email}
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="text"
              className={errors.password ? "form-control is-invalid" : "form-control"}
              name="password"
              value={ this.state.password }
              onChange={ this.handleChange }
              placeholder="Please Insert your Password Here..."
            />
            <div className="invalid-feedback">
                {errors.password}
            </div>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(mapStateToProps)(LoginForm);
