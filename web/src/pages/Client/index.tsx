import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

interface ClientFormat {
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

const Client = () => {
    const [client, setClient] = useState<ClientFormat[]>([]);
    const [formData, setFotmData] = useState<ClientFormat>();
    const navigate = useNavigate();

    //console.log(client);
    //console.log(client[0]);
    //console.log(formData);



    const { id } = useParams();
    const nameField = document.querySelector('input#name');
    const referenceField = document.querySelector('input#reference');
    const contactField = document.querySelector('input#contact');
    const addressField = document.querySelector('input#address');
    const cityField = document.querySelector('input#city');
    const extraInfosField = document.querySelector('input#extraInfos');
    const submitButton = document.querySelector('button#submit');

    /*const UpdateClient = () => {
        const [formData, setFormData] = useState({
            name: '',
            reference: '',
            contact: '',
            address: '',
            city: '',
            extraInfos: '' 
        })
    }*/
    
    const handleUpdateClient = () => {
        console.log('edição habilitada');
        nameField?.removeAttribute("disabled");
        referenceField?.removeAttribute("disabled");
        contactField?.removeAttribute("disabled");
        addressField?.removeAttribute("disabled");
        cityField?.removeAttribute("disabled");
        extraInfosField?.removeAttribute("disabled");
        submitButton?.removeAttribute("disabled");
    }

    const handleDeleteClient = () => {
        console.log('deletando cliente');
        let confirmDelete = window.confirm(`Usuário ${client[0].name} será excluído`);
        if(confirmDelete) {
            api.delete(`client/${id}`)
            .then(response => {
                if(response.data.statusCode == 200) {
                    alert('Usuário Excluído com sucesso');

                    navigate('/clients');
                }
            })
        }
    }

    useEffect(() => {
        api.get(`client/${id}`)
            .then(response => {
                setClient(response.data);
                setFotmData(client[0]);
            })
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        //console.log(name + " " + value);
        //console.log(client);
        //console.log(formData);
    }

    //console.log(client);
    //console.log(client[0]);
    //console.log(formData);

    return (
        <div id="page-client">
            <header>
                <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
                <p><Link to='/'>Home</Link> {'->'} <Link to='/clients'>Listar Clientes</Link> {'->'} Visualizar Cliente</p>
                (implementar edição)
            </header>
            <div id="content">
                <div id="clientOptions">
                    <button onClick={handleUpdateClient}>Atualizar Dados do Cliente</button>
                    <button onClick={handleDeleteClient}>Excluir Cliente</button>
                </div>
                <main>
                    {client.map(client => (
                        <form key={client.id}>
                        <h1>Dados do Cliente</h1>
                            <fieldset>
                                <legend>Dados Pessoais</legend>
                                <div className="field">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" name='name' id='name' value={client.name} disabled required onChange={handleInputChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="reference">Referencia</label>
                                    <input type="text" name='reference' id='reference' value={client.reference} disabled required onChange={handleInputChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="contact">Contato</label>
                                    <input type="text" name='contact' id='contact' value={client.contact} disabled required onChange={handleInputChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Localização</legend>
                                <div className="field">
                                    <label htmlFor="address">Endereço</label>
                                    <input type="text" name='address' id='address' value={client.address} disabled required onChange={handleInputChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="city">Cidade</label>
                                    <input type="text" name='city' id='city' value={client.city} disabled required onChange={handleInputChange} />
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Informações Extras</legend>
                                <div className="field">
                                    <label htmlFor="extraInfos">Informações Extras</label>
                                    <input type="text" name='extraInfos' id='extraInfos' value={client.extraInfos} disabled onChange={handleInputChange} />
                                </div>
                            </fieldset>
                            <button name='submit' id='submit' type="submit" disabled>Atualizar Dados do Cliente</button>
                        </form>
                    ))}
                </main>
            </div>
        </div>
    )
}

export default Client;