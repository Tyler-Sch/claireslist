import React from 'react';
import addFileIcon from '../../images/add-new-document.png';
import file from '../../images/file.png';
import { Link } from 'react-router-dom';

export default function HomeUserGroups(props) {
  return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-xs-6 col-sm-4">
            <Link to="/my-groups-create/new-group">
              <img className="throb" src={addFileIcon} />
              <p className="honey-text">create new</p>
            </Link>
          </div>
          {props.groups.map((i) => (
            <div className="col-xs-6 col-sm-4">
              <div className="box blur-hover">
                <Link to={"/my-groups/" + i.groupAddress}>

                  <img src={file} key={i.groupAddress} />
                  <p className="honey-text">{i.groupName}</p>
                </Link>
              </div>
            </div>
              )
            )}
        </div>
      </div>

  )
}
