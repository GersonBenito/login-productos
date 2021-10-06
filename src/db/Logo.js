import { firebase }from '../firebase';

const db = firebase.firestore();

export const getLogo = async() =>{
    try {
        const logo = await db.collection('logo').get();
        const dataLogo = logo.docs.map(res =>({
            id:res.id, ...res.data()
        }))
        return dataLogo;
    } catch (error) {
        console.log('ERROR AL OBETENER EL LOGO');
    }
}