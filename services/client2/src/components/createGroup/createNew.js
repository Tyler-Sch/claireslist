import React, { useState } from 'react';
import CreateNewGroupForm from './newGroupForm';

export default function CreateNew(props) {

  // const [privateState, setPrivateState] = useState(true);
  //
  // const handleRadioClick = () => {
  //   setPrivateState(!privateState);
  // }
    const [roomNameInput, setRoomNameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [hasCreated, setHasCreated] = useState(false);
    const [roomLengthError, setRoomLengthError] = useState(false);

    const submitCreateRoom = async (e) => {
        e.preventDefault();
        // check to make sure length of room name is greater than 4
        if (roomNameInput.length < 4) {
          setRoomLengthError(true)
          console.log('name of new room too short');
          return
        }
        // send call to api to create a new room
        const url = 'http://localhost:5001/tables/create_new';
        const data = {
          'roomName': roomNameInput,
          'private': isPrivate,
          'password': passwordInput
        }
        if (isPrivate) {
          if (passwordInput !== confirmPassword) {
            console.log('PASSWORDS DO NOT MATCH');
            console.log('CHANGE THE HTML');
            return;
          }
        }
        setIsCreatingNew(true);
        const response = await fetch(
          url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
          }
        )
        console.log(response);
        console.log(await response.json())
        // redirect info should go here. make sure to
        // add a thing for loading (when isCreatingNew = true)
    }



  return (
    <div className='container box-shadow-double lemon-lime-gradient padding'
          style={{'min-height': '30em'}}
      >
        <CreateNewGroupForm {...{roomNameInput, passwordInput,
                                setRoomNameInput, setPasswordInput,
                                submitCreateRoom, confirmPassword,
                                setConfirmPassword, isPrivate, setIsPrivate,
                                roomLengthError
                            }} />
    </div>
  )
}
