import React, { useState } from 'react';
import cthulhu from '../../images/cthulhu(1).svg';
import ItemView from './items/itemView';

export default function TableView(props) {
  const [createNewItem, setCreateNewItem] = useState(false);
  const [targetModifyItemId, setTargetModifyItemId] = useState(null);

  console.log(props)
  return (
    <div>
      <div className="sticky-right">
        <img height="35px" src={cthulhu} />
      </div>
      <div className="head">
        <p className='text-center bigger'>{props.room_name}</p>
      </div>

      <div className="container">
          {
            !createNewItem
            ? (<div className="honey box-shadow">
              <ItemView items={props.items} />
              </div>)
            : (<h1>Create new page here</h1>)
          }

      </div>
    </div>
  )
}
