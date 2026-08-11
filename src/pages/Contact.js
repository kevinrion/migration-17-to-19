import React, { useState } from 'react';
import FormField from '../components/FormField';
import './Page.css';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return Object.assign({}, prev, { [name]: value });
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleReset() {
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
    setSubmitted(false);
  }

  return (
    <div className="page">
      <h2>Contact Us</h2>
      <p className="page-description">
        Fill out the form below and we will get back to you.
      </p>

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
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
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
