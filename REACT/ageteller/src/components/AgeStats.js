import React, { Component } from 'react';

import PartyPopper from '../assets/party-popper.jpg';

class AgeStats extends Component {

    timeSince(date){

        let other_date = new Date(date).getTime();

        let today = new Date().getTime();

        let difference = Math.abs(today - other_date);
        
        return `${difference} milliseconds`;
    }

    render(){
        return(
            <div>
                <h3>{this.props.date}</h3>
                <h4>Result: {this.timeSince(this.props.date)}</h4>
                <img src={PartyPopper} alt="party-popper" className="party-popper" />
            </div>
        )
    }
}

export default AgeStats;