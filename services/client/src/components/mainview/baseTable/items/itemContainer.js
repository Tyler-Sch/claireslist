import React, { useState } from 'react';
import Item from './itemTile';

export default function ItemContainer(props) {
  // take a list of items in props and display each one

  return (
    <div className="item-menu">
      <div className="row">
        <div className="col-xs-6">
          <p className=" bigger text-left">
            Item
          </p>
        </div>
        <div className="col-xs-6">
          <p className="text-right bigger">
            Who owns?
          </p>
        </div>
      </div>
      <div className="item-menu-body padding">
        {props.items.map((i, idx) => (
          <Item {...i} key={i.id} focusTarget={() => (
              props.focusTarget(idx)
            )}
          />))}
      </div>
    </div>


  )
}
