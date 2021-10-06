import { firebase }from '../firebase';

const db = firebase.firestore();

export const postUser = async(user) =>{
    try {
        db.collection('user').add(user);
        console.log('USUARIO AGREGADO CORRECTAMENTE');
    } catch (error) {
        console.log('ERROR AL GUARDAR USUARIO');
    }
}


export const getUserByCorreo = async(correo, name) =>{
    try {
        let dataUsuario = [];
        const usuario = await db.collection('user').where('correo','==',correo).where('nombreUsuario','==',name).get();
        if(!usuario.empty){
            usuario.forEach(res =>{
                dataUsuario = {
                    id: res.id,
                    ...res.data()
                }
            })
        }

        console.log('usuario logeado');
        return dataUsuario;
    } catch (error) {
        console.log('Usuario no esta logueado');
    }
}