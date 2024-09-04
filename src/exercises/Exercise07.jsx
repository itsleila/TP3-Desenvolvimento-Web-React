import React from 'react';
import { useForm } from 'react-hook-form';

const Exercise07 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submeterForm(dados) {
    alert(
      JSON.stringify(
        `Nome: ${dados.nome} - Telefone: ${dados.telefone} - Email: ${dados.email}`,
      ),
    );
  }

  return (
    <div className="container">
      <h1>Formulário - EX07</h1>
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
            type="text"
            {...register('telefone', {
              required: 'Telefone é obrigatório',
            })}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </div>
        <br />
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email é obrigatório',
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Exercise07;
