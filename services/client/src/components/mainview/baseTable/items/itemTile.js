import React, { useState } from 'react';


// two functions:
//   Item -> has info for item and logic to drop down to display more info
//           when clicked
//
//   ItemAuxInfo -> simple display for additional infomation

function ItemAuxInfo(props) {
  return (
      <div className="row border-solid-thin" style={{"marginTop":"1px"}}>
        <div className="col-xs-6">
          <p className="text-left">
            {props.heading}:
          </p>
        </div>
        <div className="col-xs-6">
          <p className="text-right" style={{'overflowWrap': 'break-word'}}>
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
        'Description': 'description',
        'Who has it': 'who_has_current',
        'Due back': 'due_back',
        'Can be borrowed for': 'how_long_can_borrow',
        'Date Added': 'date_posted'
    };


    const additInfo = Object.keys(additionalInfoMap).map((i,idx) => (
        <ItemAuxInfo key={idx} heading={i} value={props[additionalInfoMap[i]]} />
    ));


    return (
        <div >
          <div
              onClick={() => setMoreInfo(!moreInfo)}
              className="row comfortable water-blueberry-gradient"
          >
            <div className="col-xs-6">
              <p className="text-left" >{props.name}</p>
            </div>
            <div className="col-xs-6">
              <p className="text-right" >{props.who_owns}</p>
            </div>
          </div>
        {moreInfo &&
          <div className="padding">
            { additInfo }
            <div className="padding">
              <button className="full-btn margin" onClick={ props.focusTarget }>
                Change info
              </button>
            </div>
          </div>
        }
        </div>
    )
}
