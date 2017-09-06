// making our own Component
import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        
        this.state = {
            leaders: []
        }
    }        

    recentLeaders(){
        const myHeaders = new Headers({});

        const myInit = { method: 'GET', headers: myHeaders};          
        
        const myRequest = new Request(`https://fcctop100.herokuapp.com/api/fccusers/top/recent`, myInit);                

        fetch(myRequest)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Account not found');    
        })
        .then(data => {
            console.log("DATA", data);
      
            this.setState({ leaders: data });

            // here we set initial page with data
            //this.props.setChannels(data.follows);           
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });   


    }        

    componentDidMount() {
        window.addEventListener('load', this.recentLeaders());
    }    

    render() {
        return(
            <div>
                <h1>Leaders</h1>
            </div>
        )
    }
}

export default App;