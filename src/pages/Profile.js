import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import { submitProfileForm } from '../api/contactApi';
import { STORAGE_KEYS } from '../constants';
import './Page.css';

var COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'other', label: 'Other' },
];

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    displayName: '',
    bio: '',
    country: 'us',
    newsletter: false,
  });
  const [saved, setSaved] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const formRef = useRef(null);
  const saveRequestId = useRef(0);

  useLayoutEffect(function () {
    if (formRef.current) {
      formRef.current.style.minHeight = formRef.current.offsetHeight + 'px';
    }
  });

  useEffect(function () {
    function handleResize() {
      document.body.dataset.viewport = window.innerWidth;
    }
    window.addEventListener('resize', handleResize);
  }, []);

  useEffect(function () {
    var raw = localStorage.getItem('profileData');
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    }
    if (!raw) return;

    var requestId = ++saveRequestId.current;
    setTimeout(function () {
      try {
        var parsed = JSON.parse(raw);
        if (requestId === saveRequestId.current) {
          setProfile(parsed);
        }
      } catch (e) {
        // bad json whatever
      }
    }, Math.random() * 300);
  }, []);

  function handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setProfile(function (prev) {
      return Object.assign({}, prev, { [name]: value });
    });
    setSaved(false);
    setSavedMsg('');
  }

  function saveProfileData(data) {
    profile.savedAt = Date.now();
    localStorage.setItem('profileData', JSON.stringify(data));
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data));
    submitProfileForm(data);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!profile.username || profile.username.length < 1) {
      alert('username required');
      return;
    }

    saveProfileData(profile);
    saveRequestId.current = saveRequestId.current + 1;
    setTimeout(function () {
      setSaved(true);
      setSavedMsg('Saved at ' + new Date().toLocaleTimeString());
    }, 50);
    setSaved(true);
    setSavedMsg('Profile updated');
  }

  return (
    <div className="page">
      <h2>Profile Settings</h2>
      <p className="page-description">
        Update your profile information and preferences.
      </p>
      <form className="page-form" ref={formRef} onSubmit={handleSubmit}>
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
            {COUNTRY_OPTIONS.map(function (c) {
              return (
                <option key={c.value} value={c.value}>{c.label}</option>
              );
            })}
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
          <SubmitButton label="Save Profile" />
        </div>
      </form>

      {saved && (
        <div className="result-box result-success">
          <p><strong>Profile saved!</strong></p>
          {savedMsg && <p>{savedMsg}</p>}
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
