import React, { useState } from 'react';
import cthulhu from '../../../images/cthulhu(1).svg';
import ItemContainer from './items/itemContainer';
import Modal from '../../generics/modal';
import TextInput from '../../generics/textInput';
import AddItemForm from './items/itemInputForm';

// TableView contains the logic for creating ( and updating soon) items on
// the list.

export default function TableView(props) {
    const [targetModifyItemId, setTargetModifyItemId] = useState(null);
    const urlBase = 'http://localhost:5001';
    const urlSuffix = '/tables/modify/create';
    const { baseRequestObj, getRoomInfo } = props;

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
        // also need to catch any sort of network error
        getRoomInfo();
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
            <img height="35px" src={cthulhu} />
            <p className="">create new</p>
          </a>
        </div>
        <div className="honey box-shadow">
          <ItemContainer items={props.items} />
        </div>



      </div>
    </div>
)
}
