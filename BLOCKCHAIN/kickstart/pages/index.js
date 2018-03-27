import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

// import instance of deployed Factory
import factory from '../ethereum/factory';

// import Layout and use it as parent component
import Layout from '../components/Layout';

import { Link } from '../routes';

// this component will show the list of existing Campaings
class CampaignIndex extends Component {

    // componentDidMount will not run on server side
    // so we use this NextJS function to load initial data
    // and this data will be sent as props to React side
    // so NextJS will execute this without rendering component
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();   
        // and return data as object
        return { campaigns }; 
    }
   
    // async componentDidMount(){
    //     const campaigns = await factory.methods.getDeployedCampaigns().call();   
    //     console.log(campaigns);
    // }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }
 
    render() {

        return (
            <Layout>
                <div>                                  
                    <h3>Open Campaings</h3>
                    <Link route='/campaigns/new'>
                        <a>
                            <Button floated='right' content='Create Campaign' icon='add circle' primary />
                        </a>
                    </Link>
                    { this.renderCampaigns() }                    
                </div>
            </Layout>
        );
    }  

}

// when we use NextJS we must export component
export default CampaignIndex;