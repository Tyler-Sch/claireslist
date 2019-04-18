import React, { useState } from 'react';
import cthulhu from '../../images/cthulhu(1).svg';
import ItemView from './items/itemView';
import Modal from '../generics/modal';
import TextInput from '../generics/textInput';
import AddItemForm from './items/itemInputForm';

export default function TableView(props) {
  const [targetModifyItemId, setTargetModifyItemId] = useState(null);

  return (
    <div>
      <div className="sticky-right">
        <a href="#create-item-modal">
          <img height="35px" src={cthulhu} />
        </a>
      </div>
      <Modal id="create-item-modal" header="create new item" >
        <AddItemForm />
      </Modal>
      <div className="head">
        <p className='text-center bigger'>{props.room_name}</p>
      </div>

      <div className="container">
        <div className="honey box-shadow">
          <ItemView items={props.items} />
        </div>



      </div>
    </div>
  )
}
