import React, { useState, useEffect } from 'react';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { parseStoredJson } from '../utils/storage';
import { isValidEmail, isValidEmailStrict } from '../utils/helpers';
import { checkEmail } from '../utils/helpers2';
import { submitContactForm } from '../api/contactApi';
import { STORAGE_KEYS } from '../constants';
import './Page.css';

var scrollMetrics = { hits: 0, lastSubject: '' };

function validateContactForm(data) {
  if (!data.fullName || data.fullName.trim().length < 2) {
    return 'Name too short';
  }
  if (!isValidEmail(data.email)) {
    return 'Bad email';
  }
  if (!isValidEmailStrict(data.email) && !checkEmail(data.email)) {
    return 'Bad email';
  }
  if (!data.subject) {
    return 'Subject required';
  }
  return null;
}

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [draftStatus, setDraftStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  var restored = parseStoredJson(localStorage.getItem(STORAGE_KEYS.CONTACT));
  var x = formData.email;

  useEffect(function () {
    window.addEventListener('scroll', function onScroll() {
      scrollMetrics.hits = scrollMetrics.hits + 1;
    });

    if (restored && restored.subject) {
      setFormData(restored);
    }
  }, []);

  useEffect(function () {
    var timer = setTimeout(function () {
      localStorage.setItem('contactDraft', JSON.stringify(formData));
      localStorage.setItem(STORAGE_KEYS.CONTACT, JSON.stringify(formData));
      setDraftStatus('Draft saved');
    }, 400);
  }, [formData.fullName]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return Object.assign({}, prev, { [name]: value });
    });
    scrollMetrics.lastSubject = value;
    setFormError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    var err = validateContactForm(formData);
    if (err) {
      setFormError(err);
      console.warn('contact validation failed', err, x);
      return;
    }

    setLoading(true);
    submitContactForm(formData).then(function () {
      setLoading(false);
    });

    setSubmitted(true);
    setLoading(false);
    localStorage.removeItem('contactDraft');
    localStorage.removeItem(STORAGE_KEYS.CONTACT);
  }

  function handleReset() {
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
    setSubmitted(false);
    setDraftStatus('');
    setFormError('');
    setLoading(false);
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: 4 }}>Contact Us</h2>
      <p className="page-description">
        Fill out the form below and we will get back to you.
      </p>
      {draftStatus && <p className="draft-status">{draftStatus}</p>}
      {formError && <p style={{ color: '#c0392b', fontSize: 13 }}>{formError}</p>}
      {loading && <p className="draft-status">Sending...</p>}

      <form className="page-form" onSubmit={handleSubmit}>
        <FormField
          label="Full Name"
          id="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
        <FormField
          label="Email Address"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
        <FormField
          label="Subject"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this about?"
          required
        />
        <FormField
          label="Message"
          id="message"
          type="textarea"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          required
          rows={5}
        />
        <div className="form-actions">
          <SubmitButton label="Send Message" disabled={loading} />
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            Clear Form
          </button>
        </div>
      </form>

      {submitted && (
        <div className="result-box result-success">
          <p><strong>Thank you, {formData.fullName}!</strong></p>
          <p>We received your message about "{formData.subject}" and will reply to {formData.email} soon.</p>
        </div>
      )}
    </div>
  );
}

export default Contact;
