import React from 'react';
import { Button }from 'antd';
import 'antd/dist/antd.css';

const Boton = (props) => {
    const { title, action, icono, primary, danger, round } = props;
    return (
        <>
            <Button type={primary} onClick={action} icon={icono} danger={danger} shape={round} >{title}</Button>
        </>
    )
}

export default Boton
