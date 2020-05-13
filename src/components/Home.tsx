import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import img from '../img/welcome.jpg';

const BackgroundImg = styled.div`
    background-image: url(${img});
    background-size: cover;
    opacity: 0.5;
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`;

const Home = () => {
    return (
        <Container>
            <BackgroundImg className='public-background'></BackgroundImg>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore
                ab rem repellendus aspernatur perspiciatis molestiae iure, iste
                voluptate esse accusantium cupiditate? Molestias pariatur modi
                perspiciatis quo eius amet sapiente. Ea? Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Neque quaerat rerum dolorum
                expedita iusto quod aperiam, voluptate consequuntur amet, quos
                nobis laborum eligendi? Id doloremque quo blanditiis! Illo,
                maxime ut?
            </p>
        </Container>
    );
};

export default Home;
