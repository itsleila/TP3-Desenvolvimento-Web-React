import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { regexNumerico, regexEmail } from '../infra/regex';
import {
  inserirUsuario,
  listarUsuarios,
  obterUsuario,
} from '../infra/firebase';
import { DefaultDataTable as DataTable } from '../components';

const Exercise12 = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
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

  async function onRowSelected({ selectedRows }) {
    if (selectedRows.length > 0) {
      const usuarioId = selectedRows[0].id;
      const usuarioSelecionado = await obterUsuario(usuarioId);
      setValue('nome', usuarioSelecionado.nome);
      setValue('telefone', usuarioSelecionado.telefone);
      setValue('email', usuarioSelecionado.email);
    }
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
    {
      name: 'ID',
      selector: (row) => row.id,
      omit: true,
    },
  ];

  return (
    <div className="container">
      <h1>Formulário - EX12</h1>
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
          columns={columns}
          data={usuarios}
          pagination
          selectableRows
          onSelectedRowsChange={onRowSelected}
          selectableRowDisabled={false}
        />
      </div>
    </div>
  );
};

export default Exercise12;
