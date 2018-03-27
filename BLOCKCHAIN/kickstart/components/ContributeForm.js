import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

import { Router } from '../routes';

import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {

    state = {
        contribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // when we click sumbit button we will show loading
        // and clean error message
        this.setState({ loading: true, errorMessage: '' });

        try {
            // const accounts = await web3.eth.getAccounts();
            // await factory.methods.createCampaign(this.state.minimumContribution).send({
            //     from: accounts[0]
            // });

            // after Campaign was created we redirect user to root page
            // Router.pushRoute('/');

            const accounts = await web3.eth.getAccounts();

            const campaign = Campaign(this.props.address);

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.contribution, 'ether')
            })

            // basically we just refresh current page
            Router.replaceRoute(`/campaigns/${this.props.address}`);
        } catch (err){
             this.setState({ errorMessage: err.message })        
        }

        //  after the function is done we remove loading from button
        this.setState({ loading: false, contribution: '' });             


    }        

    render(){
        return (
            <Form onSubmit = { this.onSubmit } error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input 
                        labelPosition='right' label='ether' 
                        value = {this.state.contribution}
                        onChange = {event => this.setState({ contribution: event.target.value })}                            
                    />
                </Form.Field>       
                <Message error header='Error' content={this.state.errorMessage} />
                <Button primary loading={this.state.loading}>Contribute</Button>                         
            </Form>
        );
    }
}

export default ContributeForm;