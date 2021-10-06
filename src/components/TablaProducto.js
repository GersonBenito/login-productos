import React, { useState } from 'react';
import { Table, Space }from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import Boton from './Boton';
import { FormOutlined, DeleteOutlined, UnorderedListOutlined }from '@ant-design/icons';
import ModalDetalle from './ModalDetalle';

const TablaProducto = (props) => {
    const { data } = props;

    const [visible, setVisible] = useState(false);
    const [dataDetalle, setDataDetalle] = useState([]);

    const actualizar = () =>{
        console.log('boton editar');
    }

    const eliminar = () =>{
        console.log('boton eliminar');
    }

    const showModalDetalle = (record) =>{
        setVisible(true);
        setDataDetalle(record);
    }

    const closeModal = () =>{
        setVisible(false);
    }

    const colum = [
        {
            title:'Nombre',
            dataIndex:'title',
            key:'title',
            render:(_,record) =>(
                <p>{record.title}</p>
            ),
        },
        {
            title:'Categoria',
            dataIndex:'category',
            key:'category',
            width:200,
            align:'center',
            render:(_,record) =>(
                <p>{record.category}</p>
            ),
        },
        {
            title:'Precio',
            dataIndex:'price',
            key:'price',
            width: 100,
            align:'center',
            render:(_,record) =>(
                <p>{record.price}</p>
            ),
        },
        {
            title:'Descripcion',
            dataIndex:'description',
            key:'description',
            width:500,
            render:(_,record) =>(
                <p>{record.description}</p>
            ),
        },
        {
            title:'Acciones',
            dataIndex:'action',
            key:'action',
            render:(_,record) =>{
                return(
                    <Space>
                        <Boton primary='primary' title='Actualizar' icono={<FormOutlined />} round='round' action={actualizar} />
                        <Boton primary='primary' title='Eliminar' icono={<DeleteOutlined />} danger='danger' round='round' action={eliminar} />
                        <Boton primary='primary' title='Detalles' icono={<UnorderedListOutlined />} round='round' action={()=>showModalDetalle(record)} />
                    </Space>
                )
            }
        },
    ]
    return (
        <ContainerTable>
            <Table columns={colum} dataSource={data} scroll={{y:700, x:900}} />
            <ModalDetalle data={dataDetalle} visible={visible} closeModal={closeModal} />
        </ContainerTable>
    )
}

const ContainerTable = styled.div`
    padding: 20px;
`;

export default TablaProducto
