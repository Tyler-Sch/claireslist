import React, { useState } from 'react';

export default function CreateNew(props) {

  const [privateState, setPrivateState] = useState(true);

  const handleRadioClick = () => {
    setPrivateState(!privateState);
  }


  return (
    <div className='container box-shadow-double blood-black-gradient padding'
          style={{'min-height': '20em'}}
      >
      <div className="form-container">
        <form>
          <div className="form-group">
            <label>New Room name: <input type="text" />
            </label>
          </div>
          <div className="form-group">
            <label>Private: </label>
              <input onClick={handleRadioClick} type="radio" checked={!privateState}/>Yep
              <input onClick={handleRadioClick} type="radio" checked={privateState}/>Naw
          </div>
          { !privateState && (<div className="form-group">
            <label>Pasword:
              <input type="text"/>
            </label>
          </div>)  }

          <div className='form-group'>
            <button className='glitch bubble-gum padding full-btn box-shadow'>
              <p className="huge">set it off</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
