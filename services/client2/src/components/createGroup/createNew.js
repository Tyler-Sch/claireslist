import React, { useState } from 'react';
import CreateNewGroupForm from './newGroupForm';

export default function CreateNew(props) {

  // const [privateState, setPrivateState] = useState(true);
  //
  // const handleRadioClick = () => {
  //   setPrivateState(!privateState);
  // }
    const [roomNameInput, setRoomNameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const submitCreateRoom = (e) => {
        e.preventDefault();
        console.log(`roomNameInput: ${roomNameInput}`)
        // send call to api to create a new room
    }


  return (
    <div className='container box-shadow-double lemon-lime-gradient padding'
          style={{'min-height': '30em'}}
      >
        <CreateNewGroupForm {...{roomNameInput, passwordInput,
                                setRoomNameInput, setPasswordInput,
                                submitCreateRoom, confirmPassword,
                                setConfirmPassword
                            }} />
    </div>
  )
}
