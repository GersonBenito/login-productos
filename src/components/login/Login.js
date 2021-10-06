import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, notification, Space } from "antd";
import "antd/dist/antd.css";
import iconGoogle from "../../asset/svg/iconGoogle.svg";
import iconFacebook from "../../asset/svg/iconFacebook.svg";
import iconApple from "../../asset/svg/iconApple.svg";
import { auth, google } from "../../firebase";
import { postUser, getUserByCorreo } from "../../db/User";
import { getLogo }from '../../db/Logo';
import { useHistory }from 'react-router-dom';

const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [logo, setLogo] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const history = useHistory();

  const toggleAction = () => {
    setToggle(!toggle);
  };

  const obtenerLogo = async()=>{
    const data = await getLogo();
    setLogo(data);
  }

  useEffect(() =>{
    obtenerLogo();
  },[])

  const onFinish = (values) => {
    //metodo para registrar usuarios con correo y contraseña
    auth.createUserWithEmailAndPassword(values.correo, values.password)
      .then((res) => {
        //console.log('respuesta de firebase', res);
        postUser({
          correo: values.correo,
          password: values.password,
        });
        notification.success({
          message: "Registrado exitosamente",
          description: `Corro: ${values.correo}`,
        });
        setToggle(false);
      })
      .catch((error) => {
        //console.log(error.message);
        notification.error({
          message: "Error al registrarse",
          description: `Correo ${values.correo} ya se encuentra en uso`,
        });
      });
  };

  //funcion iniciar sesion con google
  const loginGoogle = () =>{
    auth.signInWithPopup(google)
    .then(res =>{
      console.log(res);
      let datos = {
        fotoPerfil:res.user.photoURL,
        nombreUsuario:res.user.displayName,
        correo:res.user.email,
      }
      //postUser(datos);
      //setDataUser(datos)
      
      //consultar a base de datos usuario
     getUserByCorreo(res.user.email, res.user.displayName).then(resUsuario =>{
      
      if(res.user.email === resUsuario.correo){
        console.log('usuario ya existe');
        setDataUser(res);
        history.push('/home',resUsuario);
      }else{
        postUser(datos);
      }
     }).catch(error =>{
       console.log(error);
     })
      
    }).catch(err =>{
      console.log(err);
    })
  }

  return (
    <ContinerFull>
      {toggle === true ? (
        <ConteinerRegistro>
          <Title>
            <div className="titulo">
              <p>Registrate</p>
            </div>
          </Title>
          <Formulario>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Formato incorrecto del correo",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Contraseña requerido",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" shape="round" onClick={()=>toggleAction()}>
                    Regresar
                  </Button>
                  <Button htmlType="submit" type="primary" shape="round">
                    Registrarse
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Formulario>
        </ConteinerRegistro>
      ) : (
        <ContainerLogin>
          <Title>
              {
                dataUser.length > 0 ? (
                  dataUser.map((res, index) =>(
                    <div key = {index}>
                      <img style={{width:'50px'}} src={res.fotoPerfil} alt="" />
                      <p>Nombre:{res.nombreUsuario}</p>
                      <p>Correo: {res.correo}</p>
                    </div>
                  ))
                ):('')
              }
            <div className="titulo">
              <p>!Bienvenido!</p>
            </div>
            <div className="cuenta">
              No tienes una cuenta,
              <p className="registrarse" onClick={() => toggleAction()}>
                Registrate
              </p>
            </div>
          </Title>
          <Formulario>
            <Form layout="vertical">
              <Form.Item
                label="Correo"
                name="correo"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Formato incorrecto del correo",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Contraseña requerido",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary" shape="round" block>
                  Sin in
                </Button>
              </Form.Item>
            </Form>
          </Formulario>
          <div className="continuarCon">
            <div className="line"></div>
            <div className="text">o continua con</div>
          </div>
          <div className="containerBoton">
            <div className="google icon" onClick={loginGoogle}>
              <img src={iconGoogle} alt="" />
            </div>
            <div className="facebook icon">
              <img src={iconFacebook} alt="" />
            </div>
            <div className="apple icon">
              <img src={iconApple} alt="" />
            </div>
          </div>
        </ContainerLogin>
      )}
      <ContainerImagen>
        {
          logo.map(res =>(
            <img key={res.id} src={res.url} alt="logo" />
          ))
        }
      </ContainerImagen>
    </ContinerFull>
  );
};

const ContinerFull = styled.div`
  padding: 20px;
  height: 85vh;
  display: flex;
`;

const ContainerLogin = styled.div`
  width: 50%;
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .containerBoton {
    display: flex;
    justify-content: space-evenly;
    width: 80%;
    margin-top: 20px;
  }
  .icon {
    border: 2px solid #789ade;
    width: 20%;
    max-width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px;
  }
  .icon > img {
    width: 40px;
  }
  .apple > img {
    width: 35px !important;
  }
  .continuarCon {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .line {
    height: 2px;
    background: red;
    width: 80%;
    background: #789ade;
  }
  .text {
    position: absolute;
    padding: 10px;
    background: white;
    font-weight: 500;
  }
`;

const Formulario = styled.div`
  width: 80%;
  .ant-input {
    border: 1px solid #789ade;
    border-radius: 45px;
  }
  .ant-input-affix-wrapper {
    border: 1px solid #789ade;
    border-radius: 45px;
  }
  .ant-btn-primary {
    background: #789ade;
    border-color: #789ade;
    font-size: 16px !important;
    display: flex;
    font-weight: 500;
    justify-content: center;
    align-items: center;
  }
  .ant-form-item-label > label {
    color: black;
    font-size: 16px;
    font-weight: 500;
  }
  .ant-input-password-icon {
    color: #789ade;
  }
`;
const ContainerImagen = styled.div`
  padding: 20px;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  .titulo {
    color: black;
    font-size: 25px;
    font-weight: 600;
  }
  .cuenta {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
    margin-top: -25px;
    margin-bottom: 20px;
  }
  .cuenta .registrarse {
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    margin-left: 5px;
    color: #789ade;
    display: flex;
    align-items: flex-end;
    margin-bottom: 0px;
  }
`;

const ConteinerRegistro = styled.div`
  padding: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Login;
