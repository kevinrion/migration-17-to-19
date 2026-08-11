import React, { useState, createContext } from 'react';
import FormField from '../components/FormField';
import SubmitButton from '../components/SubmitButton';
import './Page.css';

export var TeamContext = createContext({
  members: [],
  addMember: function () {},
});

function MemberCard({ member, onPromote, theme }) {
  return (
    <li style={{ borderLeft: '3px solid ' + theme.accent }}>
      <strong>{member.name}</strong>
      <span className="muted"> — {member.role}</span>
      <button
        type="button"
        className="btn btn-secondary btn-small"
        onClick={function () { onPromote(member.name); }}
      >
        Promote
      </button>
    </li>
  );
}

function MemberList({ theme, onPromote }) {
  return (
    <TeamContext.Consumer>
      {function (value) {
        return (
          <ul className="item-list">
            {value.members.map(function (member, i) {
              return (
                <MemberCard
                  key={i}
                  member={member}
                  onPromote={onPromote}
                  theme={theme}
                />
              );
            })}
          </ul>
        );
      }}
    </TeamContext.Consumer>
  );
}

function Team() {
  const [members, setMembers] = useState([
    { name: 'Sam', role: 'Member' },
    { name: 'Jordan', role: 'Member' },
    { name: 'Riley', role: 'Lead' },
  ]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Member');

  var theme = { accent: '#61dafb', density: 'comfortable' };

  function addMember(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setMembers(members.concat([{ name: name.trim(), role: role }]));
    setName('');
  }

  function promote(memberName) {
    setMembers(function (prev) {
      return prev.map(function (m) {
        if (m.name === memberName) {
          return Object.assign({}, m, { role: 'Lead' });
        }
        return m;
      });
    });
  }

  var ctx = {
    members: members,
    addMember: addMember,
  };

  return (
    <TeamContext.Provider value={ctx}>
      <div className="page">
        <h2>Team</h2>
        <p className="page-description">
          Manage team members and roles for this workspace.
        </p>

        <form className="page-form" onSubmit={addMember}>
          <FormField
            label="Name"
            id="memberName"
            value={name}
            onChange={function (e) { setName(e.target.value); }}
            placeholder="Name"
          />
          <div className="form-field">
            <label htmlFor="memberRole">Role</label>
            <select
              id="memberRole"
              value={role}
              onChange={function (e) { setRole(e.target.value); }}
            >
              <option value="Member">Member</option>
              <option value="Lead">Lead</option>
              <option value="Guest">Guest</option>
            </select>
          </div>
          <div className="form-actions">
            <SubmitButton label="Add Member" />
          </div>
        </form>

        <MemberList theme={theme} onPromote={promote} />
      </div>
    </TeamContext.Provider>
  );
}

export default Team;
