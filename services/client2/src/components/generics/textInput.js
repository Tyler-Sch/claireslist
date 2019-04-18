import React from 'react';

export default function TextInput({ label, value, onchange, type }) {

  return (
    <div className="form-group">
      <label>{label}
        <input
          type={ type }
          value={ value }
          onChange={(e) => onchange(e.target.value)}
        />
      </label>
    </div>
  )
}
