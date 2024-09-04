import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { regexCEP } from '../infra/regex';
import obterEndereco from '../infra/cep';

const Exercise16 = () => {
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [erro, setErro] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  async function handleChangeEndereco(e) {
    const cep = e.target.value.replace(/\D/g, '');
    if (regexCEP.test(cep)) {
      const enderecoObtido = await obterEndereco(cep);
      if (enderecoObtido && !enderecoObtido.erro) {
        setErro(null);
        setEndereco(enderecoObtido);
        setMostrarEndereco(true);
      } else {
        setErro('CEP não encontrado');
        setMostrarEndereco(false);
      }
    }
  }

  return (
    <div className="container">
      <h1>Endereço completo - EX16</h1>
      <form>
        <div>
          <label htmlFor="cep">digite um CEP</label>
          <input
            id="cep"
            placeholder="CEP (EX: 01001000)"
            size={100}
            type="text"
            className="input-Registerform"
            {...register('cep', {
              onChange: handleChangeEndereco,
              required: 'CEP é obrigatório',
              validate: {
                matchPattern: (value) => regexCEP.test(value) || 'CEP inválido',
              },
            })}
          />
          {errors.cep && <p className="error-message">{errors.cep.message}</p>}
          {erro && <p className="error-message">{erro}</p>}
          {mostrarEndereco && endereco && (
            <div>
              <p>Logradouro: {endereco.logradouro}</p>
              <p>Bairro: {endereco.bairro}</p>
              <p>Localidade: {endereco.localidade}</p>
              <p>UF: {endereco.uf}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Exercise16;
