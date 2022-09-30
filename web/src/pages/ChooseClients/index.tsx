import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

interface Client {
    id: number,
    name: string,
    reference: string,
    contact: string,
    address: string,
    city: string,
    lat: string,
    lon: string,
    extraInfos: string,
}

const ChooseClients = () => {
    const [city, setCity] = useState("");
    const [clients, setClients] = useState<Client[]>([]);


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        fetchData();

    }

    function fetchData() {
        api.get('clients', {params: {city: city}})
        .then(response => {
            setClients(response.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setCity(value);
    }

    return (
        <div id="page-choose-clients">
            <header>
                    <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
                    <p><Link to='/'>Home</Link> {'->'} Selecionar Clientes para Montagem de Rota</p>
                    (implementar seleção de clientes)
            </header>
            <main>
                <h1>Seleção de Clientes para Montagem de Rota</h1>
                <div id="chooseCity">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Defina a Cidade para a Montagem da Rota</legend>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <input type="text" name='city' id='city' onChange={handleInputChange}/>
                            </div>
                        </fieldset>
                        <button type='submit'>Buscar Clientes da Cidade</button>
                    </form>
                </div>
                <div id="filteredClients">
                    {clients.map(client => (
                        <p key={client.id}>{client.name} {client.reference} {client.contact}</p>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default ChooseClients;