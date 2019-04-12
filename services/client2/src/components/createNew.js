import React from 'react';

export default function CreateNew(props) {
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
              <input type="radio" name="private" value="Yes"/>Yep
              <input type="radio" name="private" value="No"/>Naw
          </div>
          <div className='form-group'>
            <button className='glitch bubble-gum padding full-btn box-shadow'>Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}
