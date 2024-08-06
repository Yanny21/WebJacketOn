import React, { useEffect, useState } from 'react';
import api from './api';

const ExampleComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get('/')
            .then(response => {
                console.log(response.data); // Agregar para debug
                setData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data", error);
            });
    }, []);

    return (
        <div>
            <h1>Usuarios</h1>
            {data.length > 0 ? (
                data.map(item => (
                    <div key={item.id_usu}>
                        <p>Nombre: {item.nom_usu}</p>
                        <p>Apellido: {item.app_usu}</p>
                        <p>Email: {item.email_usu}</p>
                        <p>Tipo: {item.tipo_usu}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No hay usuarios disponibles.</p>
            )}
        </div>
    );
}

export default ExampleComponent;
