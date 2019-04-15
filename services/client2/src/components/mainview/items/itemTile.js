import React, { useState } from 'react';


function ItemAux(props) {

  return (

      <div className="row border-solid-thin">
        <div className="col-xs-6">
          <p className="text-left">
            {props.heading}
          </p>
        </div>
        <div className="col-xs-6">
          <p className="text-right">
            {props.value}
          </p>
        </div>
      </div>

  )
}

export default function Item(props) {
  const [moreInfo, setMoreInfo] = useState(false);

  const dateAdded = new Date(props.date_posted);
  const additionalInfoMap = {
    'Description:': 'description',
    'Who has it': 'who_has_current',
    'Due back': 'due_back',
    'Can be borrowed for': 'how_long_can_borrow',
    'Date Added': 'date_posted'
  };

  const additInfo = Object.keys(additionalInfoMap).map(i => (
    <ItemAux heading={i} value={props[additionalInfoMap[i]]} />
  ));
  console.log(additInfo)

  return (
    <div >
      <div onClick={() => setMoreInfo(!moreInfo)} className="row comfortable water-blueberry-gradient ">
        <div className="col-xs-6">
          <p className="text-left" >{props.name}</p>
        </div>
        <div className="col-xs-6">
          <p className="text-right" >{props.who_owns}</p>
        </div>
      </div>
    {moreInfo &&
      <div className="container padding">
        { additInfo }
        <div className="container padding">
          <button className="full-btn margin">Change info</button>
        </div>
      </div>

    }
    </div>
  )
}
