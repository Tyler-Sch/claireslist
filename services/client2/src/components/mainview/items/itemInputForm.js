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
return (
  <div className="container">
    <form className="form">
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
  <a href="#" className="button">close</a>
    </form>
  </div>
)

}
