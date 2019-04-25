import React, { useState } from 'react';
import CreateNewGroupForm from './newGroupForm';
import { Redirect } from 'react-router-dom';


// contains logic for creating a new room, setting private or not,
// checking passwords match.
export default function CreateNew(props) {
    const [roomNameInput, setRoomNameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    // const [isCreatingNew, setIsCreatingNew] = useState(false);
    // const [hasCreated, setHasCreated] = useState(false);
    const [roomLengthError, setRoomLengthError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [newUrl, setNewUrl] = useState(null);
    const url = 'http://localhost:5001/tables/create_new';


    // function for creating new room and making api call
    const submitCreateRoom = async (e) => {
        e.preventDefault();
        // check to make sure length of room name is greater than 4
        if (roomNameInput.length < 4) {
          setRoomLengthError(true)
          console.log('name of new room too short');
          return
        }
        // send call to api to create a new room
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
        // setIsCreatingNew(true);
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
        const responseData = await response.json()
        if (responseData.status === 'success') {
          console.log('new group created successfully');
          const encodedRoomName = responseData.url;
          setNewUrl(encodedRoomName);
          setRedirect(true);
        }
    }


  return (
    <div className='container box-shadow-double lemon-lime-gradient padding'
          style={{'min-height': '30em'}}>
          {
            redirect
            ? (<Redirect to={'/group/' + newUrl} /> )
          : (<CreateNewGroupForm {...{roomNameInput, passwordInput,
                                  setRoomNameInput, setPasswordInput,
                                  submitCreateRoom, confirmPassword,
                                  setConfirmPassword, isPrivate, setIsPrivate,
                                  roomLengthError
                              }} />)
          }
    </div>
  )
}
