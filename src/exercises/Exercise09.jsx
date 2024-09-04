import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { regexNumerico, regexEmail } from '../infra/regex';
import { inserirUsuario } from '../infra/firebase';

const Exercise09 = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  async function submeterForm(dados) {
    let id = await inserirUsuario(dados);
    reset();
    setShowConfirmation(true);
  }

  return (
    <div className="container">
      <h1>Formulário - EX09</h1>
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
              pattern: { value: regexNumerico, message: 'Telefone inválido' },
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
              pattern: { value: regexEmail, message: 'Email inválido' },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
      </form>
      {showConfirmation && (
        <div className="FormConfirmation-message">
          Formulario enviado com sucesso!
        </div>
      )}
    </div>
  );
};

export default Exercise09;
