import { connect } from 'react-redux';
import { userLoginRequest } from '../../actions/loginActions';
import LoginForm from './LoginForm'

const mapDispatchToProps = dispatch => {
  return {
    onLoginRequest: userData => {
      dispatch(userLoginRequest(userData));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);