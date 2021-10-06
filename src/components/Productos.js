import React, { useEffect, useState } from 'react'
import TablaProducto from './TablaProducto'

const Productos = () => {
    const [productos, setProductos] = useState([]);

    const getProductos = async() =>{
        const url = 'https://fakestoreapi.com/products';
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setProductos(data);
    }

    useEffect(() =>{
        getProductos();
    },[])

    return (
        <>
            <TablaProducto data={productos} />
        </>
    )
}

export default Productos
