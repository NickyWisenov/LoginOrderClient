import { connect } from 'react-redux';
import { userSignupRequest } from '../../actions/signupActions';
import SingupForm from './SingupForm'

const mapDispatchToProps = dispatch => {
  return {
    onSignupRequest: userData => {
      dispatch(userSignupRequest(userData));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SingupForm);