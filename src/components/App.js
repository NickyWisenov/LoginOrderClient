import React from 'react';
import NavigationBar from './NavigationBar'

class App extends React.Component {
    render(){
        return(
            <nav className="container">
                <NavigationBar />
            </nav> 
        )
    }
}

export default App;