import React, { useState } from 'react';

const Exercise02 = () => {
  const [formulario, setFormulario] = useState({ nome: '', telefone: '' });
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormulario((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    if (!formulario.nome && !formulario.telefone) {
      setError('Os campos nome e telefone são obrigatórios');
      setDisabled(true);
    } else {
      setDisabled(false);
      setError('');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Nome: ${formulario.nome}\nTelefone: ${formulario.telefone}`);
  }

  return (
    <div className="container">
      <h1>Formulário básico - EX02</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            name="nome"
            value={formulario.nome}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="text"
            name="telefone"
            value={formulario.telefone}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit" disabled={disabled}>
          Enviar
        </button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
    </div>
  );
};

export default Exercise02;
