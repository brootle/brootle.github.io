import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link, Router } from '../../../routes';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

class RequestNew extends Component {

    static async getInitialProps(props){
        // props.query.address - this is how we pass it from routes.js
        const { address } = props.query;
        return { address }; 
    }    

    state = {
        description: '',
        amount: '',
        recipient: '',
        errorMessage: '',
        loading: false
    }    

    onSubmit = async (event) => {
        event.preventDefault();

        // when we click sumbit button we will show loading
        // and clean error message
        this.setState({ loading: true, errorMessage: '' });

        try {

            const { description, amount, recipient } = this.state;

            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);       

            await campaign.methods.createRequest(description, web3.utils.toWei(amount, 'ether'), recipient).send({
                from: accounts[0]
            });   

            // after Campaign was created we redirect user requests list
            Router.pushRoute(`/campaigns/${this.props.address}/requests/`);
        } catch (err){
             this.setState({ errorMessage: err.message })
             //  after the function is done we remove loading from button
             this.setState({ loading: false });             
        }


    }        

    render(){
        return(
            <Layout>   

                <Link route={`/campaigns/${this.props.address}/requests/`}>
                    <a>Back to Requests List</a>
                </Link>  

                <h3>New Request</h3>      
                <Form onSubmit = { this.onSubmit } error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input                             
                            value = {this.state.description}
                            onChange = {event => this.setState({ description: event.target.value })}                            
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Amount in Ether</label>
                        <Input                             
                            value = {this.state.amount}
                            onChange = {event => this.setState({ amount: event.target.value })}                            
                        />
                    </Form.Field>        
                    <Form.Field>
                        <label>Recipient</label>
                        <Input                             
                            value = {this.state.recipient}
                            onChange = {event => this.setState({ recipient: event.target.value })}                            
                        />
                    </Form.Field>                                  
                    <Message error header='Error' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>                      
            </Layout>   
        );
    }
}

export default RequestNew;