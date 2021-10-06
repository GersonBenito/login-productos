import React from 'react';
import { Modal, DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const ModalDetalle = (props) => {
    const { data, closeModal, visible } = props;

    const getDate = (date, dataString) => {
        console.log(date, dataString);
    }

    return (
        <Container>
            <Modal
                title={data.title}
                footer={null}
                visible={visible}
                onCancel={closeModal}
            >
                <div className="line"></div>
                <ContainerModal>
                    <Space>
                        <DatePicker onChange={getDate} />
                        <TextField
                            label='fecha'
                            type='date'
                            defaultValue='29-05-2021'
                            InputLabelProps={{shrink:true}}
                        />
                    </Space>
                </ContainerModal>
            </Modal>
        </Container>
    )
}

const Container = styled.div`
    .ant-modal-body{
        padding: 10px !important;
    }
    .ant-modal-header{
        border-bottom: 2px solid red !important;
    }
`;
const ContainerModal = styled.div`
    .ant-modal-header{
        border-bottom: 2px solid red !important;
    }
    .ant-modal-content{
        background: transparent !important;
    }

    .ant-picker{
        border: 2px solid blue;
    }
`;

export default ModalDetalle
