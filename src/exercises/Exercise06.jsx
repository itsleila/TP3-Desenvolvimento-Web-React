import React from 'react';
import { useForm } from 'react-hook-form';

const Exercise06 = () => {
  const { register, handleSubmit } = useForm();

  function submeterForm(dados) {
    alert(JSON.stringify(`Nome: ${dados.nome} - Telefone: ${dados.telefone}`));
  }

  return (
    <div className="container">
      <h1>Formulário - EX06</h1>
      <form onSubmit={handleSubmit(submeterForm)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" {...register('nome')} />
        </div>
        <br />
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input type="text" {...register('telefone')} />
        </div>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Exercise06;
