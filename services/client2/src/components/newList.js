import React from 'react';
import { Link } from 'react-router-dom';

export default function CreateNewList(props) {
  // const [buttonClass, setButtonClass] = useState(['box-shadow'])

  return (
    <div>
      <Link to={'/create-new'} className={['box-shadow', 'grape-pool-water','full-btn', 'glitch', 'bevel'].join(' ')}>
        <span className='throb'
        ><span style={{'display':'inline-block', 'transform': 'rotate(-15deg)'}}
        >C</span>reate </span> a New List</Link>
    </div>
  )
}
