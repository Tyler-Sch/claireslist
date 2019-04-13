import React, { useState, useEffect } from 'react';

export default function CreateNewGroupForm(props) {

    // const [privateState, setPrivateState] = useState(true);

    const handleRadioClick = () => {
      props.setIsPrivate(!props.isPrivate);

    }

    return (
        <div className="form-container">
          <form onSubmit={props.submitCreateRoom}>
            <div className="form-group">
              <label>New Room name:
              <input type="text"
                  value={props.roomNameInput}
                  onChange={(e) => props.setRoomNameInput(e.target.value)}
              />
              </label>
            </div>
            <div className="form-group">
              <label>Private: </label>
                <input
                  onClick={handleRadioClick}
                  type="radio"
                  checked={props.isPrivate}
                /> Yep
                <input
                  onClick={handleRadioClick}
                  type="radio"
                  checked={!props.isPrivate}
                /> Nope
            </div>
            { props.isPrivate && (
        <div>

            <div className="form-group">
              <label>Password:
                <input
                    type="password"
                    value={props.passwordInput}
                    onChange={(e) => props.setPasswordInput(e.target.value)}
                />
              </label>
            <div className="form-group">
              <label>password again:
                  <input
                      type="password"
                      value={props.confirmPassword}
                      onChange={(e) => props.setConfirmPassword(e.target.value)}
                  />
              </label>
              </div>

            </div>
        </div>)  }

            <div className='form-group'>
              <button className=' bubble-gum padding comfortable full-btn box-shadow'>
                <p className="huge glitch">set it off</p>
              </button>
            </div>
          </form>
        </div>
    )
}
