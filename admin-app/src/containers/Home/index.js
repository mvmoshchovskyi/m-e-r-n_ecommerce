import React from 'react';
import Layout from "../../components/Layout";
import {Jumbotron} from "react-bootstrap";

const Home = () => {
    return (
        <Layout>
            <Jumbotron style={{margin:'5rem', background:'#fff'}} className='text-center'>
                <h1>welcome dashboard</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nemo.</p>
            </Jumbotron>
        </Layout>
    );
};

export default Home;
