import React from 'react';
import { connect } from 'react-redux';

class WelcomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			errors: {}
		};

	}


	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		const locationsList = this.props.auth.locations.locations.map(function(location){
			return <li className="locations-list" key={location.city}>{location.city} - {location.country}</li>
		});

		return (
			<div className="welcome-page">
				<div className="welcome-banner">
						<h1>Welcome { this.props.auth.user.First_Name + " " + this.props.auth.user.Last_Name }</h1>
				</div>
				<div className="locations">
					{ locationsList }
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps)(WelcomePage);