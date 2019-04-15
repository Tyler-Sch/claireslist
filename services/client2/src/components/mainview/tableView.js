import React from 'react';
import cthulhu from '../../images/cthulhu(1).svg';
import ItemView from './items/itemView';

export default function TableView(props) {
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
          <div className="honey box-shadow">
          <ItemView items={props.items} />
          </div>
      </div>
    </div>
  )
}
