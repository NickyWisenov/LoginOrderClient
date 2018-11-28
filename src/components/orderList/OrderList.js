import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOrders, getMovies, filterWeek, deleteOrder } from '../../actions/orderActions';
import './OrderList.css'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css';

class OrderList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            showCalendar: "none",
            selectedDays: null,
            selectedWeek: "",
        }

        this.displayCalendar = this.displayCalendar.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount () {
        this.props.loadOrderList(this.props.auth.user.id);
        this.props.loadMovieList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    displayCalendar () {
        this.setState({
            showCalendar: "block"
        })
    }

    handleWeekClick = (weekNumber, days, e) => {
        this.setState({
            selectedWeek: weekNumber,
            selectedDays: days
        });
    };

    handleClick () {
        const { orders } = this.props.orders;

        this.props.onfilterWeek(orders.filter(order => order.week === this.state.selectedWeek))
        this.setState({
            showCalendar: "none",
        })
    }

    handleOnChange (e) {
        this.setState({
            selectedWeek: e.target.value
        })
    }

    handleDelete (order_id, e) {
        const { orders } = this.props.orders;
        this.props.onDeleteRequest(orders.filter(order => order.id !== order_id), order_id);
    }

    handleEdit (order_id, e) {
        const { orders } = this.props.orders;
        const orderToUpdate = orders.filter(order => order.id === order_id);
        console.log(orderToUpdate);
    }

    render() {
        const { movies } = this.props.movies;
        // Render Order List'
        const { orders } = this.props.orders;
        
        const totalNumber = function (movie_id) {
            var totalNumber = 0;
            for (let i = 0; i < orders.length; i ++) {
                if (orders[i].quantities.find(item => item.movie_id === movie_id) != null) {
                    totalNumber += orders[i].quantities.find(item => item.movie_id === movie_id).quantity;
                } else {
                    totalNumber += 0;
                }
            }
            return totalNumber;
        }

        const sumTotalQuantity = function () {
            var sum = 0;
            for (let i = 0; i < orders.length; i ++) {
                sum += orders[i].totalQuantity;
            }
            return sum;
        }

        const sumTotalPrice = function () {
            var sum = 0;
            for (let i = 0; i < orders.length; i ++) {
                sum += orders[i].totalPrice;
            }
            return sum;
        }

        return (
            <div className="order-list">
                <div className="top-row">
                    <label>Select Week</label>
                    <input
                        className="week-select form-control"
                        onFocus={this.displayCalendar}
                        value={this.state.selectedWeek}
                    />

                    <div className="calendar-div" style={{display: this.state.showCalendar}}>
                        <DayPicker
                            showWeekNumbers
                            showOutsideDays
                            selectedDays={this.state.selectedDays}
                            onWeekClick={this.handleWeekClick}
                        />
                        <button 
                            style={{position:"absolute",marginLeft: "10px"}}
                            onClick={this.handleClick}
                        >
                            OK
                        </button>
                    </div>
                    
                    <h1>Order List</h1>
                </div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#Week</th>
                            <th scope="col">Location</th>
                            {
                                movies.map((movie, idx) => {
                                    return <th key={idx} scope="col">{movie.name}</th>
                                })
                            }
                            <th scope="col">Total Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Comment</th>
                            <th scope="col">#actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, idx) => (
                            <tr key={idx}>
                                <td>{order.week}</td>
                                <td onClick={e => this.handleEdit(order.id, e)} className="location-cell">
                                    {order.location}
                                </td>
                                {
                                    movies.map((movie, idx) => {
                                        return (
                                            <td key={idx}>
                                                {
                                                    order.quantities.find(item => item.movie_id === movie.id) != null ?
                                                    order.quantities.find(item => item.movie_id === movie.id).quantity
                                                    :
                                                    ""
                                                }
                                            </td>    
                                        )
                                    })
                                }
                                <td>{order.totalQuantity}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.comment}</td>
                                <td>
                                    <button
                                        onClick={e => this.handleDelete(order.id, e)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr key="total" id="total-row">
                            <td></td>
                            <td>Total</td>
                            {
                                movies.map((movie, idx) => {
                                    return (
                                        <td key={idx}>
                                            {
                                                totalNumber(movie.id) != 0 ?
                                                    totalNumber(movie.id)
                                                    :
                                                    ""
                                            }
                                        </td>    
                                    )
                                })
                            }
                            <td>{sumTotalQuantity()}</td>
                            <td>{sumTotalPrice()}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>   
            </div>
        )
    }
}

OrderList.propTypes = {
    loadOrderList: PropTypes.func.isRequired,
    loadMovieList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    movies: state.movies,
    orders: state.orders
})

const mapDispatchToProps = dispatch => {
    return({
        loadOrderList: (userId) => {
            dispatch(getOrders(userId));
        },
        loadMovieList: () => {
            dispatch(getMovies());
        },
        onfilterWeek: (filtered_orders) => {
            dispatch(filterWeek(filtered_orders));
        },
        onDeleteRequest: (orders_after_delete, order_id) => {
            dispatch(deleteOrder(orders_after_delete, order_id));
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);