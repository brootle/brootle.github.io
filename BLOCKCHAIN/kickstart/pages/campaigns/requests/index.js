import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button, Table } from 'semantic-ui-react';

import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';

import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props){
        // props.query.address - this is how we pass it from routes.js
        const { address } = props.query;

        const campaign = Campaign(address);   

        // now let's get number of requests created for this campaing
        const requestCount = await campaign.methods.getRequestsCount().call();    

        const aproversCount = await campaign.methods.aproversCount().call(); 

        // now we get all requests one by one
        const requests = await Promise.all(
            // we use fill() to make array of indexes
            Array(parseInt(requestCount)).fill().map( (element, index) => {
                // get request at certain index
                return campaign.methods.requests(index).call();
            })
        );       

        return { address, requests, requestCount, aproversCount }; 
    }

    renderRows(){
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow 
                    request={request} 
                    id={index}
                    key={index} 
                    address={this.props.address}
                    aproversCount={this.props.aproversCount}
                />
            );
        });
    }

    render(){

        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>   
                <Link route={`/campaigns/${this.props.address}`}>
                    <a>Back to Campaign details</a>
                </Link>               
                <h3>List of requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button content='New Request' primary floated='right' style={{ marginBottom: 10 }} />
                    </a>
                </Link>                   

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>               
                <div>Requests fount: {this.props.requestCount}</div>
            </Layout>   
        );
    }
}

export default RequestIndex;