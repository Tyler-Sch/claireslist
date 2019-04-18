import React, { useState } from 'react';
import TextInput from '../../generics/textInput';

// can refactor this out into own file
const additionalInfoMap = {
  'Description:': 'description',
  'Who has it': 'who_has_current',
  'Due back': 'due_back',
  'Can be borrowed for': 'how_long_can_borrow',
  'Date Added': 'date_posted'
};

const needInfo = {
  'Name of item': 'name',
  'Who owns it': 'who_owns'
}

export default function AddItemForm(props) {
    const [name, setName] = useState('');
    const [who_owns, setWhoOwns] = useState('');
    const [due_back, setDueBack] = useState(new Date());
    const [how_long_can_borrow, setHowLongBorrow] = useState('');
    const [description, setDescription] = useState('');

    const createNewItem = (e) => {
        e.preventDefault();
        window.location.hash = '';
        console.log('data to submit')
        console.log({
            name,
            who_owns,
            due_back,
            how_long_can_borrow
        })
        const requestObj = {
            name,
            who_owns,
            'optional_fields':{
                description,
                how_long_can_borrow,
            }
        };
        console.log(props.submitItemInfo);
        props.submitItemInfo(requestObj);

    };

    return (
      <div className="container comfortable">
        <form className="form" onSubmit={e => createNewItem(e)}>
          <TextInput
            label='Name of item'
            value={name}
            onchange={setName}
            type="text"
          />
        <TextInput
          label="Who owns it: "
          value={who_owns}
          onchange={setWhoOwns}
          type="text"
        />

        <TextInput
          label="How long are you willing to part with it: "
          value={how_long_can_borrow}
          onchange={setHowLongBorrow}
          type="text"
        />
        <TextInput
          label="Description: "
          value={description}
          onchange={setDescription}
          type="text"
         />
      <a href="#" className="button">close</a>
      <button className="button" type="submit">submit</button>
        </form>
      </div>
    )

}
