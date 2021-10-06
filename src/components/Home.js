import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Avatar, Image, Card }from 'antd';
import 'antd/dist/antd.css';


const Home = () => {
    const location = useLocation();
    console.log(location.state);
    const { correo, fotoPerfil, nombreUsuario } = location.state;
    const { Meta } = Card;
    return (
        <Container>
            <Card style={{width:300, marginTop:16}}>
                <Meta 
                    avatar={<Avatar src={<Image src={fotoPerfil} /> } />}
                    title={nombreUsuario}
                    description={correo}
                />
            </Card>
        </Container>
    )
}

const Container = styled.div`
    padding: 20px;
    height: 85vh;
`;

export default Home
