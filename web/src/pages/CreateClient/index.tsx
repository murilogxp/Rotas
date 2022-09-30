import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

import './styles.css'

const CreateClient = () => {
    const [formData, setFormData] = useState({
        name: '',
        reference: '',
        contact: '',
        address: '',
        city: '',
        extraInfos: ''
    })

    const navigate = useNavigate();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        console.log(formData);
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, reference, contact, address, city, extraInfos } = formData;

        const data = {
            name,
            reference,
            contact,
            address,
            city,
            extraInfos
        }

        await api.post('client', data);

        alert('Cliente Criado!');

        navigate('/');
    }

    return (
        <div id="page-create-client">
            <header>
                <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
                <p><Link to='/'>Home</Link> {'->'} Cadastrar Cliente</p>
                (implementar mapa)
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Cliente</h1>
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    <div className="field">
                        <label htmlFor="name">Nome</label>
                        <input type="text" name='name' id='name' required onChange={handleInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="reference">Referencia</label>
                        <input type="text" name='reference' id='reference' required onChange={handleInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="contact">Contato</label>
                        <input type="text" name='contact' id='contact' required onChange={handleInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Localização</legend>
                    <div className="field">
                        <label htmlFor="address">Endereço</label>
                        <input type="text" name='address' id='address' required onChange={handleInputChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <input type="text" name='city' id='city' required onChange={handleInputChange} />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informações Extras</legend>
                    <div className="field">
                        <label htmlFor="extraInfos">Informações Extras</label>
                        <input type="text" name='extraInfos' id='extraInfos' onChange={handleInputChange} />
                    </div>
                </fieldset>
                <button type="submit">Cadastrar Cliente</button>
            </form>
        </div>
    )
}

export default CreateClient;