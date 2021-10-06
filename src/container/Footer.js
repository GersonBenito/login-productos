import React, { useState } from 'react'
import styled from 'styled-components'

const Footer = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    return (
        <ContainerFooter>
            <h4>{`©copyright | Gerson Benito ${year}`}</h4>
        </ContainerFooter>
    )
}

const ContainerFooter = styled.div`
    height: 7vh;
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #bfbfbf;
    box-shadow: 0px -10px 20px -10px #bfbfbf;
`;

export default Footer
