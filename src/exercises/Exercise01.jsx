import React, { useState } from 'react';

const Exercise01 = () => {
  const [formulario, setFormulario] = useState({ nome: '', telefone: '' });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormulario((Form) => ({
      ...Form,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Nome: ${formulario.nome}\nTelefone: ${formulario.telefone}`);
  }

  return (
    <div className="container">
      <h1>Formulário básico - EX01</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          value={formulario.nome}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="number"
          name="telefone"
          value={formulario.telefone}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Exercise01;
