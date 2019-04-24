import React, { useState, useEffect } from 'react';
import cthulhu from '../../../images/cthulhu(1).svg';
import ItemContainer from './items/itemContainer';
import Modal from '../../generics/modal';
import TextInput from '../../generics/textInput';
import AddItemForm from './items/itemInputForm';

// TableView contains the logic for creating  updating and displaying items on
// the list.

export default function TableView(props) {
    const [targetModifyItemIdx, setTargetModifyItemIdx] = useState(null);
    const urlBase = 'http://localhost:5001';
    const urlCreateSuffix = '/tables/modify/create';
    const urlUpdateSuffix = '/tables/modify/update';
    const { baseRequestObj, getRoomInfo } = props;
    const [name, setName] = useState('');
    const [who_owns, setWhoOwns] = useState('');
    const [due_back, setDueBack] = useState('');
    const [how_long_can_borrow, setHowLongBorrow] = useState('');
    const [description, setDescription] = useState('');
    const [who_has_current, setWhoHasCurrent] = useState('');

    const itemDict = {
      name,
      who_owns,
      due_back,
      how_long_can_borrow,
      description,
      who_has_current,
      setName,
      setWhoOwns,
      setDueBack,
      setHowLongBorrow,
      setDescription,
      setWhoHasCurrent
    }

    const submitItemInfo = async () => {
        // function for adding new items to the database
        const reqData = baseRequestObj;
        const url = urlBase + (
          (targetModifyItemIdx !== null) ? urlUpdateSuffix : urlCreateSuffix
        );
        const modifyObject = {};


        const itemObj = {
          'type': 'create',
          'target': 'item',
          name,
          who_owns,
          'optional_fields': {
            description,
            how_long_can_borrow
          }
        };

        if (targetModifyItemIdx === null) {
          reqData['action'] = itemObj
        }
        else {

          modifyObject['type'] = 'update';
          modifyObject['target'] = 'item';
          modifyObject['targetId'] = props.items[targetModifyItemIdx].id;
          modifyObject['dataToUpdate'] = {
            name,
            who_owns,
            due_back,
            how_long_can_borrow,
            description,
            who_has_current
          };
          reqData['action'] = modifyObject;
        }


        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqData)
          }
         );

        const data = await response.json();
        console.log(data);
        // need to add a check for if the item is added to the room
        // successfully
        // also need to catch any sort of network error
        setTargetModifyItemIdx(null);
        getRoomInfo();
    };

    useEffect(() => {
      if (targetModifyItemIdx === null) {
        resetFormData();
      }
      else {
        setFormDataToAvailableItem();
        window.location.hash = 'create-item-modal';
      }
    },[targetModifyItemIdx])

    const setFormDataToAvailableItem = () => {
      const targetItem = props.items[targetModifyItemIdx];
      setName(targetItem.name);
      setWhoOwns(targetItem.who_owns);
      setDueBack(targetItem.due_back);
      setHowLongBorrow(targetItem.how_long_can_borrow);
      setDescription(targetItem.description);
      setWhoHasCurrent(targetItem.who_has_current);
      
    };

    const resetFormData = () => {
      setName('');
      setWhoOwns('');
      setDueBack('');
      setHowLongBorrow('');
      setDescription('');
    };

    return (
    <div>
      <Modal id="create-item-modal" header="create new item" >
        <AddItemForm
            submitItemInfo={submitItemInfo}
            {...itemDict}
            setTargetModifyItemIdx={setTargetModifyItemIdx}
            optional_info={targetModifyItemIdx != null}
        />
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
          <ItemContainer items={props.items} focusTarget={setTargetModifyItemIdx} />
        </div>
      </div>
    </div>
)
}
