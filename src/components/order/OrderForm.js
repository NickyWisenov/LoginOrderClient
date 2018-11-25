import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class OrderForm extends React.Component {
    constructor(props) {
        super(props);

		this.state = {
			errors: {}
		};
    }


    componentWillMount () {
        this.props.loadMovieList();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    
    render() {

        const { locations } = this.props.auth;
        console.log(locations);
        return (
            <div className="order-form">
                <h1>Order Movie</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">

                    </div>
                </form>
            </div>
        )
    }
}

OrderForm.propTypes = {
    loadMovieList: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    movies: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
    movies: state.movies
});

export default connect(mapStateToProps)(OrderForm);


