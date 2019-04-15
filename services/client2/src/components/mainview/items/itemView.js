import React, { useState } from 'react';

export default function ItemView(props) {
  // take a list of items in props and display each one

  return (
    <div className="item-menu container">
      <div className="row">
        <div className="col-xs-6 glitch">
          <p className=" bigger text-left">
            Item
          </p>
        </div>
        <div className="col-xs-6 glitch">
          <p className="text-right bigger">
            Who owns?
          </p>
        </div>
      </div>
      <div className="item-menu-body padding">
        {props.items.map((i, idx) => (<Item {...i} key={i.id} />))}
      </div>
    </div>


  )
}



function Item(props) {
  const [moreInfo, setMoreInfo] = useState(false);

  const dateAdded = new Date(props.date_posted);

  return (
    <div onClick={() => setMoreInfo(!moreInfo)}>
      <div className="row comfortable water-blueberry-gradient ">
        <div className="col-xs-6">
          <p className="text-left" >{props.name}</p>
        </div>
        <div className="col-xs-6">
          <p className="text-right" >{props.who_owns}</p>
        </div>
      </div>
    {moreInfo &&
      <div className="container padding">
        <div className="row border-solid-thin">
          <div className="col-xs-6">
            <p className="text-left">
              Who has it:
            </p>
          </div>
          <div className="col-xs-6">
            <p className="text-right">
              {props.who_has_current}
            </p>
          </div>
        </div>
        <div className="row border-solid-thin">
          <div className="col-xs-6">
            <p className="text-left">
              Due back:
            </p>
          </div>
          <div className="col-xs-6">
            <p className="text-right">
              {props.due_back}
            </p>
          </div>
        </div>
        <div className="row border-solid-thin">
          <div className="col-xs-6">
            <p className="text-left">Date added:</p>
          </div>
          <div className="col-xs-6">
            <p className="text-right">
              {dateAdded.getMonth()}/{dateAdded.getDate()}/{dateAdded.getFullYear()}
            </p>
          </div>
        </div>
        <div className="row border-solid-thin">
          <div className="col-xs-6">
            <p className="text-left">Can borrow for: </p>
          </div>
          <div className="col-xs-6">
            <p className="text-right">{props.how_long_can_borrow}</p>
          </div>
        </div>
      </div>
    }
    </div>


  )
}

function ItemTable(props) {

}
