import React, { useState } from 'react';
import cthulhu from '../../images/cthulhu(1).svg';
import ItemView from './items/itemView';
import Modal from '../generics/modal';
import TextInput from '../generics/textInput';
import AddItemForm from './items/itemInputForm';

export default function TableView(props) {
    const [targetModifyItemId, setTargetModifyItemId] = useState(null);
    const urlBase = 'http://localhost:5001';
    const urlSuffix = '/tables/modify/create';
    const baseRequestObj = props.baseRequestObj;

    const submitItemInfo = async (itemObj) => {
        // function for adding new items to the database
        const reqData = baseRequestObj;
        reqData['action'] = {
            'type': 'create',
            'target': 'item',
            ...itemObj
        }
        const response = await fetch(
          urlBase + urlSuffix,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
          }
         );

        const data = await response.json();
        // need to add a check for if the item is added to the room
        // successfully
        props.getRoomInfo();
    }

    return (
    <div>

      <Modal id="create-item-modal" header="create new item" >
        <AddItemForm submitItemInfo={submitItemInfo} />
      </Modal>
      <div className="head">
        <p className='text-center bigger'>{props.room_name}</p>
      </div>

      <div className="container">
        <div className="">
          <a href="#create-item-modal">
            <img height="35px" src={cthulhu} style={{'position': 'sticky'}}/>
            <p className="">create new</p>
          </a>
        </div>
        <div className="honey box-shadow">
          <ItemView items={props.items} />
        </div>



      </div>
    </div>
)
}
