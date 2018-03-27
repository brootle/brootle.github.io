import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  // constructor(props){
  //   super(props);

  //   this.state = { manager: '' };
  // }

  // new style
  state = { 
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '' 
  };

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    // balance is returned in wei
    const balance = await web3.eth.getBalance(lottery.options.address);

    // update state after we get data
    this.setState({ manager, players, balance });
  }

  // new style, no need to bind this function
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Sending transaction to network...' });

    await lottery.methods.enter().send({ 
        from: accounts[0], 
        value: web3.utils.toWei(this.state.value, 'ether') 
    });    

    this.setState({ message: 'Transaction complete!' });

  }

  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Sending transaction to network...' });

    // await lottery.methods.enter().send({ 
    //     from: accounts[0], 
    //     value: web3.utils.toWei(this.state.value, 'ether') 
    // });    

    try{
        await lottery.methods.pickWinner().send({ 
            from: accounts[0]
        });
        this.setState({ message: 'Transaction complete!' });  
    } catch(err){
        // make sure we get error
        this.setState({ message: `${err}` });  
    }    
  
  }

  render() {

    //console.log(web3.version);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          Manager on this contract: {this.state.manager} <br/>
          There are {this.state.players.length} people who joined. <br/>
          And the total balance is {web3.utils.fromWei(this.state.balance, 'ether')} ether.
        </p>

        <hr/>

        <form onSubmit = { this.onSubmit }>
          <h4>Join contract</h4>
          <div>
            <label>Amount of Ether</label>
            <input 
              value = {this.state.value}
              onChange = {event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr/>

        <button onClick = {this.onClick}>Pick a winner!</button>

        <hr/>

        <h3>Status: {this.state.message}</h3>

      </div>
    );
  }
}

export default App;
