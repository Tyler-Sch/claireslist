import React from 'react';

export default function NewGroup() {
  return (
    <div className="container">
      <br />
      <br />
      <div className="box brutal-border-dark anim-bg-water">
        <form>
          <div className="form-group">
            <label>Group name</label>
            <input type="text"/>
          </div>
          <div className="form-group">
            <button className="lime-text grape box-shadow glitch squared button">Create Group</button>
          </div>

        </form>
      </div>
    </div>
  )
}
