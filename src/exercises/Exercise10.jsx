import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { regexNumerico, regexEmail } from '../infra/regex';
import { inserirUsuario, listarUsuarios } from '../infra/firebase';

const Exercise10 = () => {
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
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    const usuariosList = await listarUsuarios();
    setUsuarios(usuariosList);
  }

  return (
    <div className="container">
      <h1>Formulário - EX10</h1>
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
        <ul>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, index) => (
              <li key={index}>
                {usuario.nome} - {usuario.telefone} - {usuario.email}
              </li>
            ))
          ) : (
            <li>Nenhum usuário encontrado.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Exercise10;
