import React, { useState } from 'react';

const Exercise03 = () => {
  const [formulario, setFormulario] = useState({ nome: '', telefone: '' });
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormulario((prevForm) => {
      const updatedForm = { ...prevForm, [name]: value };
      if (!updatedForm.nome || !updatedForm.telefone) {
        setError('Os campos nome e telefone são obrigatórios');
        setDisabled(true);
      } else if (name === 'telefone' && isNaN(value)) {
        setError('Apenas números são permitidos para o telefone.');
        setDisabled(true);
      } else {
        setError('');
        setDisabled(false);
      }

      return updatedForm;
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(`Nome: ${formulario.nome}\nTelefone: ${formulario.telefone}`);
  }

  return (
    <div className="container">
      <h1>Formulário básico - EX03</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          name="nome"
          required
          value={formulario.nome}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="telefone">Telefone:</label>
        <input
          type="text"
          name="telefone"
          required
          value={formulario.telefone}
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          Enviar
        </button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
    </div>
  );
};

export default Exercise03;
