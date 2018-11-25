import { connect } from 'react-redux';
import { getMovies } from '../../actions/orderActions';
import OrderForm from './OrderForm'

const mapDispatchToProps = dispatch => {
  return {
    loadMovieList: () => {
      dispatch(getMovies());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(OrderForm);