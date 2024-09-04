import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../infra/firebase';
import { regexEmail } from '../infra/regex';

const Exercise15 = () => {
  const [usuario, setUsuario] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const fazerLogin = async () => {
    setError('');
    setSuccessMessage('');
    try {
      const { email, senha } = getValues();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        senha,
      );
      const usuario = {
        id: userCredential.user.uid,
        email: userCredential.user.email,
      };
      setUsuario(usuario);
      setSuccessMessage('Login realizado com sucesso!');
      reset();
    } catch (error) {
      setError('Ocorreu um erro ao fazer login, tente novamente mais tarde.');
    }
  };

  return (
    <div className="container">
      <h1>Fazer Login - EX15</h1>
      <form onSubmit={handleSubmit(fazerLogin)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="email@gmail.com"
            {...register('email', {
              required: 'Email é obrigatório',
              pattern: { value: regexEmail, message: 'Email inválido' },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <br />
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            placeholder="******************"
            {...register('senha', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter pelo menos 6 caracteres',
              },
            })}
          />
          {errors.senha && <span>{errors.senha.message}</span>}
        </div>
        <br />
        <button type="submit">Enviar</button>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
      </form>
    </div>
  );
};

export default Exercise15;

//email: usario@gmail.com
//senha: Usuario123
