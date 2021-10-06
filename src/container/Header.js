import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLogo }from '../db/Logo';

const Header = () => {
    const [logo, setLogo] = useState([]);

    const obtenerLogo = async()=>{
        try {
            const data = await getLogo();
            setLogo(data);
        } catch (error) {
            console.log('Ocurrio un error al obtener el logo');
        }
    }

    useEffect(() =>{
        obtenerLogo();
    },[])
    return (
        <ContainerHeader>
            <Logo>
                <div className="logo">
                    {
                        logo.map(res =>(
                            <img key={res.id} src={res.url} alt={res.titulo} />
                        ))
                    }
                </div>
            </Logo>
           <Menu>
               <div className="hepl link">Ayuda</div>
               <div className="contacto link">Contacto</div>
               <div className="salir link">Salir</div>
           </Menu>
        </ContainerHeader>
    )
}

const ContainerHeader = styled.div`
    height: 7vh;
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #bfbfbf;
    box-shadow: 5px 0px 20px 2px #bfbfbf;
`;

const Menu = styled.div`
    display: flex;
    .link{
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        margin-right: 10px;
    }
    .salir{
        margin-right: 0px;
    }
`;

const Logo = styled.div`
    .logo{
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
    }
    .logo > img{
        width: 60px;
    }
`;

export default Header
