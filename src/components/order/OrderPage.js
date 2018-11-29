import { connect } from 'react-redux';
import { getMovies, saveOrder, updateOrder } from '../../actions/orderActions';
import OrderForm from './OrderForm';

const mapDispatchToProps = dispatch => {
  return ({
      loadMovieList: () => {
        dispatch(getMovies());
      },
      onSaveOrder: orderData => {
        dispatch(saveOrder(orderData));
      },
      onUpdateOrder: (history, orderId, orderData) => {
        dispatch(updateOrder(history, orderId, orderData));
      }
    }
  );
};

export default connect(
  null,
  mapDispatchToProps
)(OrderForm);