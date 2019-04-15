import React from 'react';

export default function TableView(props) {
  console.log(props)
  return (
    <div>
      <p className='text-center bigger'>{props.room_name}</p>
    </div>
  )
}
