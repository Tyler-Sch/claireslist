import React, { useState } from 'react';
import TextInput from '../../../generics/textInput';

// can refactor this out into own file
// const additionalInfoMap = {
//   'Description:': 'description',
//   'Who has it': 'who_has_current',
//   'Due back': 'due_back',
//   'Can be borrowed for': 'how_long_can_borrow',
//   'Date Added': 'date_posted'
// };
//
// const needInfo = {
//   'Name of item': 'name',
//   'Who owns it': 'who_owns'
// }

export default function AddItemForm(props) {

    const {
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
    } = props;



    return (
      <div className="comfortable">
        <form className="form" onSubmit={e => props.submitItemInfo(e)}>
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
       { props.optional_info &&
        <div>
           <TextInput
             label="Who has it currently: "
             value={who_has_current}
             onchange={setWhoHasCurrent}
             type="text"
            />
          <TextInput
            label="Due back: "
            value={due_back}
            onchange={setDueBack}
            type="date"
          />
        </div>
       }
       <button onClick={(e) => {
           e.preventDefault();
           window.location.hash = '';
           props.setTargetModifyItemIdx(null);
         }} className="button">
         close
       </button>
      <button className="button" type="submit">submit</button>
        </form>
      </div>
    )

}
