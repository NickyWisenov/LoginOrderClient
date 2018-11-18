import React from 'react';

class App extends React.Component {
    
    componentDidMount() {
        console.log(this.props.auth);
    }
    
    render(){
        return(
            <div className="main-container">
                <h1>Movie World</h1>
            </div>
        )
    }
}

export default App;