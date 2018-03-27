import React from 'react';
import Header from './Header';
import { Container } from 'semantic-ui-react'

// this is NextJS component, everything inside it will be moved to html head tag
import Head from 'next/head';

// functional components run with props
// everything inside this component will be passed to it in props.children
export default (props) => {
    return (
        <Container>
    
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>  
            </Head>
    
            <Header />

            {props.children}

        </Container>
    );
}