import React from 'react';

export default function Modal(props) {
  // needs props.id to be unique modal id
  // props.header text in modals header
  // props.children for the modals body
  return (
    <div>
      <div id={props.id} className="modal cheddar">
        <div className="modal-content">
          <div className="modal-head">
            <p className="huge">{props.header}</p>
          </div>
        </div>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  )
}
