import React from 'react';
import { useForm } from 'react-hook-form';
import { regexNumerico } from '../infra/regex';

const Exercise05 = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submeterForm(dados) {
    alert(JSON.stringify(dados));
  }

  return (
    <div className="container">
      <h1>Formulário - EX05</h1>
      <form onSubmit={handleSubmit(submeterForm)}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" {...register('nome')} />
        </div>
        <br />
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            type="text"
            {...register('telefone', {
              pattern: { value: regexNumerico, message: 'Telefone inválido' },
            })}
          />
          {errors.telefone && <span>{errors.telefone.message}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Exercise05;
