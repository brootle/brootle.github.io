// making our own Component
import React, { Component } from 'react';

// import from bootstrap
import { Form, FormControl, Button } from 'react-bootstrap';

// import out own styles
import './App.css';

// import our own component
import AgeStats from './AgeStats';

class App extends Component {

    constructor(){
        super();
        this.state = {
            newDate: '',
            birthday: '1979-12-08',
            showStats: false
        }
    }

    changeBirthday (){
        console.log(this.state);
        this.setState({ 
            birthday: this.state.newDate,
            showStats: true
        });
        console.log(this.state);
    }

    render() {
        return(
            <div className="App">
                <Form inline>
                    <h2>Input your birthday!</h2>
                    <FormControl 
                        type="date" 
                        onChange={ event => this.setState({ newDate: event.target.value})}
                    />
                    {' '}
                    <Button onClick={ () => this.changeBirthday() }>Submit</Button>
                    {   
                        // add condition to show component if showStats is true
                        this.state.showStats ? 
                            <div className="fade age-stats">
                                <AgeStats date={this.state.birthday} /> 
                            </div>
                        : <div></div>
                    }
                </Form>
            </div>
        )
    }
}

export default App;