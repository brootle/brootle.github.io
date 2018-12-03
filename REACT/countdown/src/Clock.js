import React, { Component } from 'react';
import './App.css';

class Clock extends Component{

    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    componentDidMount(){
        setInterval(()=>{
            this.getTimeUntil(this.props.deadline);
        }, 1000)
    }

    startWithZero(number){
        return number < 10 ? '0' + number : number;
    }

    getTimeUntil(deadline){
        const time = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((time/1000)%60);
        const minutes = Math.floor((time/1000/60)%60);
        const hours = Math.floor((time/(1000*60*60))%24);
        const days = Math.floor(time/(1000*60*60*24));

        this.setState({
            days,
            hours,
            minutes,
            seconds
        })        
    }

    render(){
        return(
            <div>
                <div className="Clock-days">{this.startWithZero(this.state.days)} days</div>
                <div className="Clock-hours">{this.startWithZero(this.state.hours)} hours</div>
                <div className="Clock-minutes">{this.startWithZero(this.state.minutes)} minutes</div>
                <div className="Clock-seconds">{this.startWithZero(this.state.seconds)} seconds</div>
            </div>
        )        
    }
}

export default Clock;