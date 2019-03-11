import React, { useState } from 'react';
import ItemTable from './ItemTable';
import { Link } from 'react-router-dom';
const groupFakeData = [
  {
    'owner': 'Claire',
    'whoHasIt': 'Matt',
    'itemName': 'Comic Book',
    'dueBack': 'Whenever'
  },
  {
    'owner': 'Tyler',
    'whoHasIt': 'Andy',
    'itemName': 'Stand Mixer',
    'dueBack': 'Whenever'
  },
  {
    'owner': 'Bunka',
    'whoHasIt': 'Joe',
    'itemName': 'Comic Book',
    'dueBack': 'asap'
  },
  {
    'owner': 'Joe',
    'whoHasIt': 'No 0ne',
    'itemName': 'belt sander',
    'dueBack': 'n/a'
  },
]


export default function GroupList(props) {
  const arg = props.match.params.id;
  const [groupItems, setGroupItems] = useState(groupFakeData);
  // Think groups it belongs to need to be fetched from inside
  // this function. Could pass it back up through userContext,
  // but i'll have to be careful of endless loop
  // probably will need the logic for joining a group in here too

  return (
    <div>
      <br/>
      <br/>
      <div className="container">
        <a href="#momodal" className="small-btn blur-hover squared lime eggplant-text box-shadow">Add a new item</a>
        <div className="container">
          <div id="momodal" className="modal draggable lime">
            <div className="modal-content">
              <div className="modal-head">
                <div className="box">
                  <h1 className="bigger text-center">Add a new item!</h1>
                </div>
              </div>
              <div className="modal-content">
                <div className="box">
                  <form>
                    <div className="form-group">
                      <label>Item name</label>
                      <input type="text" />
                    </div>
                    <div className="form-group">
                      <label>Owner</label>
                      <input type="text" />
                    </div>
                    <div className="form-group">
                      <label>Any one currently have it?</label>
                      <input type="text" />
                    </div>
                    <div className="form-group">
                      <label>DueBack (n/a) if it's out?</label>
                      <input type="text" />
                    </div>
                    <div className="form-group">
                      <button className="small-btn square">Add item</button>
                    </div>
                  </form>
                </div>

              </div>
              <div className="modal-footer">

                <a href="#" className="small-btn bubble-gum box-shadow">close</a>
              </div>
            </div>
          </div>
        </div>
      {
        (groupItems.length > 0)
        ? <ItemTable groupItems={groupItems} />
        : <h1>No Items found</h1>
      }

      </div>
    </div>
  )
}
