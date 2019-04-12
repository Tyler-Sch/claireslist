import React, { useState } from 'react';

export default function CreateNewList(props) {
  const [buttonClass, setButtonClass] = useState(['box-shadow'])

  return (
    <div>
      <button className={[...buttonClass, 'grape-pool-water','full-btn', 'glitch', 'bevel'].join(' ')}>
        <span className='throb'
        ><span style={{'display':'inline-block', 'transform': 'rotate(-15deg)'}}
        >C</span>reate </span> a New List</button>
    </div>
  )
}
