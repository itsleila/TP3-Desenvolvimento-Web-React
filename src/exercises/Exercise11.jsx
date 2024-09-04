import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { regexNumerico, regexEmail } from '../infra/regex';
import { inserirUsuario, listarUsuarios } from '../infra/firebase';
import { DefaultDataTable as DataTable } from '../components';

const Exercise11 = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function submeterForm(dados) {
    await inserirUsuario(dados);
    reset();
    setShowConfirmation(true);
    fetchUsuarios();
    setTimeout(() => setShowConfirmation(false), 2000);
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    const usuariosList = await listarUsuarios();
    setUsuarios(usuariosList);
  }

  const columns = [
    {
      name: 'Nome',
      selector: (row) => row.nome,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: (row) => row.telefone,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <h1>Formulário - EX11</h1>
      <form onSubmit={handleSubmit(submeterForm)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            {...register('nome', {
              required: 'Nome é obrigatório',
            })}
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>
        <br />
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            type="text"
            {...register('telefone', {
              required: 'Telefone é obrigatório',
              pattern: { value: regexNumerico, message: 'Telefone inválido' },
            })}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: { value: regexEmail, message: 'Email inválido' },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
        {showConfirmation && (
          <div className="FormConfirmation-message">
            Formulário enviado com sucesso!
          </div>
        )}
      </form>
      <div>
        <h2>Lista de Usuários</h2>
        <DataTable
          title="Usuários"
          columns={columns}
          data={usuarios}
          pagination
          disableSelection={true}
        />
      </div>
    </div>
  );
};

export default Exercise11;
