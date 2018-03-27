import React, { Component } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';

// error={!!this.state.errorMessage}
// we just to this to convert empty string to false

// import Layout and use it as parent component
import Layout from '../../components/Layout';

import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

import { Router } from '../../routes';

// this component will show the list of existing Campaings
class CampaignNew extends Component {

    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        // when we click sumbit button we will show loading
        // and clean error message
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0]
            });

            // after Campaign was created we redirect user to root page
            Router.pushRoute('/');
        } catch (err){
             this.setState({ errorMessage: err.message })
             //  after the function is done we remove loading from button
             this.setState({ loading: false });             
        }


    }    

    render() {

        return (
            <Layout>

                <h3>Create Campaign</h3>
                <Form onSubmit = { this.onSubmit } error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            labelPosition='right' label='wei' 
                            value = {this.state.minimumContribution}
                            onChange = {event => this.setState({ minimumContribution: event.target.value })}                            
                        />
                    </Form.Field>
                    <Message error header='Error' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>

            </Layout>
        );
    }  

}

// when we use NextJS we must export component
export default CampaignNew;