import { connect } from 'react-redux';
import { getMovies, saveOrder } from '../../actions/orderActions';
import OrderForm from './OrderForm';

const mapDispatchToProps = dispatch => {
  return ({
      loadMovieList: () => {
        dispatch(getMovies());
      },
      onSaveOrder: orderData => {
        dispatch(saveOrder(orderData));
      }     
    }
  );
};

export default connect(
  null,
  mapDispatchToProps
)(OrderForm);