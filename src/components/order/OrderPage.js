import { connect } from 'react-redux';
import { getMovies, saveOrder, updateOrder, removeErrors } from '../../actions/orderActions';

import OrderForm from './OrderForm';

const mapDispatchToProps = dispatch => {
  return ({
      loadMovieList: () => {
        dispatch(getMovies());
      },
      onSaveOrder: (history, orderData) => {
        dispatch(saveOrder(history, orderData));
      },
      onUpdateOrder: (history, orderId, orderData) => {
        dispatch(updateOrder(history, orderId, orderData));
      },
      onRemoveErrors: () => {
        dispatch(removeErrors());
      }
    }
  );
};

export default connect(
  null,
  mapDispatchToProps
)(OrderForm);