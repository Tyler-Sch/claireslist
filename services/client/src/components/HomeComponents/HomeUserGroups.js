import React from 'react';
import addFileIcon from '../../images/add-new-document.png';
import file from '../../images/file.png';

export default function HomeUserGroups(props) {
  return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <img src={addFileIcon} />
            <p>create new</p>
          </div>
          {props.groups.map((i) => (
            <div className="col-xs-6 col-sm-4">
              <img src={file} key={i.groupAddress} />
              <p className="center-text">{i.groupName}</p>
            </div>
              )
            )}
        </div>
      </div>

  )
}
