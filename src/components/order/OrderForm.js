import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from '../../helper/is_empty';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        // Refs to interact32 with dom
        this.movieRefs = [];
        this.setMovieRefs = element => {
            this.movieRefs.push(element);
        }
        this.locationRef = null;
        this.setLocationRef = element => {
            this.locationRef = element;
        }

        this.state = {
            totalPrice: 0,
            errors: null,
            locationError: "",
            priceError: "",
        };
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        var  totalPrice = 0;
        for (let movieItem of this.movieRefs) {
            totalPrice += movieItem.dataset.price * movieItem.value;
        }

        this.setState({
            totalPrice: totalPrice,
        }, () => {
            if (this.state.totalPrice != 0) {
                this.setState({
                    priceError: ""
                })
            }
        });
    }

    handleSubmit = (e) => {
        if (this.locationRef.value == 0) {
            this.setState({
                locationError: "Select the location"
            });
        }

        if (this.state.totalPrice == 0) {
            this.setState({
                priceError: "You can not order no movies"
            });
        }

        if (this.locationRef.value != 0 && this.state.totalPrice != 0) {
            this.setState({
                errors: {}
            });

            const moviesList = [];
            for (let movieItem of this.movieRefs) {
                if (movieItem.value != 0) {
                    moviesList.push({
                        id: movieItem.dataset.id,
                        quantity: movieItem.value
                    });
                }
            }
            
            const orderData = {
                location: this.locationRef.value,
                moviesList: moviesList,
                totalPrice: this.state.totalPrice,
                orderedBy: this.props.auth.user.id,
                comment: document.getElementById('comment').value,
            }
            
            

            if (this.props.orders.isEditing) {
                this.props.onUpdateOrder(this.props.history, this.props.orders.orderToUpdate[0].id, orderData)
            } else {
                console.log(orderData);
                this.props.onSaveOrder(this.props.history, orderData);
            }
        }
    }

    onLocationChange = (e) => {
        this.setState({
            locationError: ""
        })
    }

    componentWillMount () {
        // Prevent direct route from out without login
        if (!localStorage.jwtToken) {
			window.location.href = '/login'
        }
        this.props.loadMovieList();
        this.props.onRemoveErrors();

        if (this.props.orders.isEditing) {
            this.setState({
                totalPrice: this.props.orders.orderToUpdate[0].totalPrice
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { locations } = this.props.auth.locations;
        const { orders, orderToUpdate, isEditing } = this.props.orders;
        const onLocationChange = this.onLocationChange;
        const setLocationRef = this.setLocationRef;
        const renderLocationSelect = function () {
            return(
                    <select 
                        className="col-sm-8 form-control" 
                        id="locations" 
                        name="location"
                        defaultValue = {isEditing ? orderToUpdate[0].locationId : 0}
                        ref = { setLocationRef }
                        onChange = { onLocationChange }
                    >
                        <option value="0">Choose Location</option>
                        {
                            locations.map((location, idx) => {
                                    return <option 
                                                key={idx} 
                                                value={location.id}
                                            >
                                                {location.city} - {location.country}
                                            </option>
                                
                            })
                        }
                    </select>
            )
        }

        const { movies } = this.props.movies;
        const handleChange = this.handleChange;
        const setMovieRefs = this.setMovieRefs;
        const renderMovieList = function () {
            return (
                <div className="movie-list">
                    {
                        movies.map((movie, idx) => {
                            return (
                                <div key={idx} className="form-group row">
                                    <label htmlFor={movie.name} className="col-sm-4 col-form-label">{movie.name}</label>
                                    <div className="col-sm-3">
                                        {
                                            isEditing ?
                                                <input
                                                    data-price={movie.price}
                                                    data-id={movie.id}
                                                    name={"movie[" + movie.id + "]"}
                                                    type="number"
                                                    className="form-control"
                                                    id={movie.name}
                                                    style={{textAlign: "center"}}
                                                    onChange={handleChange}
                                                    ref = { setMovieRefs }
                                                    min={0}
                                                    defaultValue={
                                                        orderToUpdate[0].quantities.find(x => x.movie_id === movie.id) != null ? 
                                                            orderToUpdate[0].quantities.find(x => x.movie_id === movie.id).quantity
                                                            : 
                                                            0
                                                    }
                                                />
                                                :
                                                <input
                                                    data-price={movie.price}
                                                    data-id={movie.id}
                                                    name={"movie[" + movie.id + "]"}
                                                    defaultValue={0}
                                                    type="number"
                                                    className="form-control"
                                                    id={movie.name}
                                                    style={{textAlign: "center"}}
                                                    onChange={handleChange}
                                                    ref = { setMovieRefs }
                                                    min={0}
                                                />
                                        }
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        return (
            <div className="order-form">
                {
                    this.props.orders.isEditing ?
                        <h1>Update Movie</h1>
                        :
                        <h1>Order Movie</h1>
                }
                {
                    console.log(isEmpty(this.state.errors))
                }
                {
                    !isEmpty(this.state.errors) ?
                        <div className="alert alert-danger row" role="alert">Sorry, You can not order twice for same location in the same week</div>
                        :
                        ""
                }
                <form id="orderForm">
                    
                    {/* Locations Select */}
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label" htmlFor="inlineFormCustomSelect">Locations</label>
                        {
                            renderLocationSelect()
                        }
                    </div>
                    {
                        this.state.locationError !== "" ? (
                                <div className="alert alert-danger row" role="alert">
                                    {this.state.locationError}
                                </div>
                            ) : ""
                    }
                    {/* Movies List */}
                    <div className="form-group row">
                        <label htmlFor="quantity" className="col-sm-4 col-form-label">Movie Title</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control-plaintext" id="quantity" value="Quantity" readOnly />
                        </div>
                    </div>
                    {
                        renderMovieList()
                    }
                    <hr />
                    {/* Total Price */}
                    <div className="form-group row">
                        <label htmlFor="total-price" className="col-sm-4 col-form-label"><strong>Total Price</strong></label>
                        <div className="col-sm-3">
                            <input 
                                type="text" 
                                className="form-control-plaintext" 
                                id="total-price" 
                                value={this.state.totalPrice} 
                                style={{textAlign: "center",backgroundColor:"#76b0f5"}} 
                                readOnly
                            />
                        </div>
                    </div>
                    {
                        this.state.priceError !== "" ? (
                                <div className="alert alert-danger row" role="alert">
                                    {this.state.priceError}
                                </div>
                            ) : ""
                    }
                    <hr />
                    {/* Comment */}
                    <div className="form-group">
                        <label htmlFor="comment" className="comment">Comment</label>
                        <div>
                            <textarea 
                                className="form-control" 
                                id="comment" 
                                placeholder="Please Leave your Comment..." 
                                defaultValue={isEditing ? orderToUpdate[0].comment : ""}
                            >
                            </textarea>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-group row">
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary btn-block mr-3 ml-3">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

OrderForm.propTypes = {
    loadMovieList: PropTypes.func.isRequired,
    onSaveOrder: PropTypes.func.isRequired,
    onUpdateOrder: PropTypes.func.isRequired,
    onRemoveErrors: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps)(OrderForm);


