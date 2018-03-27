import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';

// import Layout and use it as parent component
import Layout from '../../components/Layout';
import ContributeForm from '../../components/ContributeForm';

import { Link } from '../../routes';

// import instance of deployed Campaign
// in this case it's a function that will return instance on Campaign based on address we pass
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

// this component will show the list of existing Campaings
class CampaignShow extends Component {

    // componentDidMount will not run on server side
    // so we use this NextJS function to load initial data
    // and this data will be sent as props to React side
    // so NextJS will execute this without rendering component
    // the props in this function is not related to component props
    static async getInitialProps(props){
        // props.query.address - this is how we pass it from routes.js
        const campaign = Campaign(props.query.address);   
        // and return data as object
        const summary = await campaign.methods.getSummary().call();
        return { 
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            aproversCount: summary[3],
            manager: summary[4]
        }; 
    }

    renderCards(){
        // we just destructure from object
        const { minimumContribution, balance, requestsCount, aproversCount, manager } = this.props;

        // we can also add style to Card Group
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created campaign and can make requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'The amount in wei that you should contribute to become approver',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'Requests to send money, must be approved by approvers',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: aproversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who already donated to this campaign',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'How much money campaign has left to spent',
                style: { overflowWrap: 'break-word' }
            }                                          
        ];

        return <Card.Group items={items} />
    }

    render() {

        return (
            <Layout>                              
                <h3>Some Campaign</h3>     
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}   
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address} /> 
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button address={this.props.address} content='View Requests' primary />
                                </a>
                            </Link>         
                        </Grid.Column>           
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }  

}

// when we use NextJS we must export component
export default CampaignShow;