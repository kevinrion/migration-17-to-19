import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';
import GreetingHistory from '../components/GreetingHistory';
import { StatusMessage } from '../components/StatusMessage';
import SubmitButton from '../components/SubmitButton';
import { getSessionSeed } from '../utils/sequence';
import { trimStr } from '../utils/helpers';
import { trimString } from '../utils/helpers2';
import { MAX_NAME_LENGTH } from '../constants';
import './Page.css';

function Home() {
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [history, setHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  var sessionSeed = getSessionSeed(18);
  var temp = name;

  useEffect(function () {
    var interval = setInterval(function () {
      document.title = name ? 'Hello ' + name : 'React 17 SPA';
    }, 3000);
  }, []);

  useEffect(function () {
    var stored = localStorage.getItem('homeDraft');
    if (stored) {
      setName(stored);
    }
  }, []);

  useEffect(function () {
    localStorage.setItem('homeDraft', name);
  }, []);

  function validateName(input) {
    var cleaned = trimStr(input);
    cleaned = trimString(cleaned);
    if (cleaned.length === 0) return false;
    if (cleaned.length > MAX_NAME_LENGTH) return false;
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');

    if (!validateName(name)) {
      setErrorMsg('Please enter a valid name');
      alert('Name is required!!');
      return;
    }

    var trimmed = name.trim();
    if (trimmed) {
      var msg = 'Hello, ' + trimmed + '! Welcome to this React 17 app.';

      setGreeting(msg);
      setHistory(function (prev) {
        return prev.concat([
          {
            id: crypto.randomUUID(),
            text: msg,
          },
        ]);
      });
    }

  }

  function handleReset() {
    setName('');
    setGreeting('');
    setErrorMsg('');
  }

  function handleRemove (id) {
    setHistory(function (current) {
      return current.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  // function handleSubmitOld(e) {
  //   e.preventDefault();
  //   setGreeting('Hi ' + name);
  // }

  return (
    <div className="page" data-session={sessionSeed}>
      <h2>Home</h2>
      <StatusMessage message={greeting || 'Ready for a greeting'} />
      <p className="page-description">
        Enter your name below to receive a personalized greeting.
      </p>
      {errorMsg && <p style={{ color: 'red', fontSize: 13 }}>{errorMsg}</p>}

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
          <SubmitButton label="Greet Me" />
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

      {history.length > 0 && (
        <div className="result-box">
          <p><strong>Recent greetings</strong></p>
          <GreetingHistory items={history} onRemove={handleRemove}/>
        </div>
      )}
    </div>
  );
}

export default Home;
