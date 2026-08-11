import React, { useState } from 'react';
import FormField from '../components/FormField';
import './Page.css';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    displayName: '',
    bio: '',
    country: 'us',
    newsletter: false,
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setProfile(function (prev) {
      return Object.assign({}, prev, { [name]: value });
    });
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="page">
      <h2>Profile Settings</h2>
      <p className="page-description">
        Update your profile information and preferences.
      </p>

      <form className="page-form" onSubmit={handleSubmit}>
        <FormField
          label="Username"
          id="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="johndoe"
          required
        />
        <FormField
          label="Display Name"
          id="displayName"
          value={profile.displayName}
          onChange={handleChange}
          placeholder="John Doe"
        />
        <FormField
          label="Bio"
          id="bio"
          type="textarea"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          rows={3}
        />

        <div className="form-field">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={profile.country}
            onChange={handleChange}
          >
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-field checkbox-field">
          <label>
            <input
              type="checkbox"
              name="newsletter"
              checked={profile.newsletter}
              onChange={handleChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Profile
          </button>
        </div>
      </form>

      {saved && (
        <div className="result-box result-success">
          <p><strong>Profile saved!</strong></p>
          <p>
            Username: {profile.username || '(not set)'}
            {profile.displayName && ' — ' + profile.displayName}
          </p>
          {profile.bio && <p>Bio: {profile.bio}</p>}
          <p>Country: {profile.country.toUpperCase()}</p>
          <p>Newsletter: {profile.newsletter ? 'Subscribed' : 'Not subscribed'}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
