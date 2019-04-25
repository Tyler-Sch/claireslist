import React, { useState, useEffect } from 'react';
import TextInput from '../generics/textInput';


export default function CreateNewGroupForm(props) {

    const handleRadioClick = () => {
      props.setIsPrivate(!props.isPrivate);

    }

    return (
        <div className="form-container">
          <form onSubmit={props.submitCreateRoom}>
            <TextInput
              label='New room name: '
              value={props.roomNameInput}
              onchange={props.setRoomNameInput}
              type="text"
            />
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
           <TextInput
              label="password"
              type="password"
              value={props.passwordInput}
              onchange={props.setPasswordInput}

            />
          <TextInput
            label="password again"
            type="password"
            value={props.confirmPassword}
            onchange={props.setConfirmPassword}
          />
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
