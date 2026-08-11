import React, { useState } from 'react';
import FormField from '../components/FormField';
import './Page.css';

function Home() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      setGreeting('Hello, ' + name.trim() + '! Welcome to this React 17 app.');
    }
  }

  function handleReset() {
    setName('');
    setGreeting('');
  }

  return (
    <div className="page">
      <h2>Home</h2>
      <p className="page-description">
        Enter your name below to receive a personalized greeting.
      </p>

      <form className="page-form" onSubmit={handleSubmit}>
        <FormField
          label="Your Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Greet Me
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {greeting && (
        <div className="result-box">
          <p>{greeting}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
