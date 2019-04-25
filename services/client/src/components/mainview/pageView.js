import React, { useState, useEffect } from 'react';
import LoadingScreen from '../generics/loading';
import TableView from './baseTable/tableView';
import TextInput from '../generics/textInput';
import Modal from '../generics/modal';

// has logic for checking passwords if one is required to access the room
// When a person is granted access, this function passes basic neccessary
// request data to its' child TableView (roomId and password)

export default function PageView(props) {
    const [isLoading, setIsLoading] = useState(true);
    // const [needsPassword, setNeedsPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [roomData, setRoomData] = useState({});
    const [roomId, setRoomId] = useState(props.match.params.id);
    const [error, setError] = useState(false);
    const url = 'http://localhost:5001/tables/fetch';
    const requestData = {
        requestedRoom: roomId,
        password
    };


    // check if password needed and download info
    useEffect(() => {
        getRoomInfo();
    }, [])


    // handles checking if room is private and checks given
    // password once given
    const getRoomInfo = async () => {
        const response = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            }
        )

        const responseData = await response.json()

        if (responseData.status === 'password needed') {
          // setNeedsPassword(true);
          window.location.hash = 'password-modal';
          return
        }
        else if (responseData.status === 'success'){
          setRoomData(responseData.roomInfo);
          window.location.hash = '';
          setIsLoading(false);
        }
        else {
          console.log('There was an error in retrieving room info');
          console.log(roomId);
          console.log(responseData);
          setError(true);
        }
      }


    const submitPassword = (e) => {
        e.preventDefault();
        getRoomInfo();
    }


  return(
    <div>
      <Modal header='Password?' id="password-modal">
          <form onSubmit={ submitPassword }>
            <TextInput
              label='Password'
              type='Password'
              value={ password }
              onchange={ setPassword }
              />
            <button type="submit" className="full-btn">Submit</button>
          </form>
      </Modal>
      {
        isLoading
        ? <LoadingScreen />
        : <TableView { ...roomData }
            baseRequestObj={ requestData }
            getRoomInfo={ getRoomInfo }
          />
      }
      { error &&
          <p className="text-center">Something appears to have gone wrong</p> }
    </div>
  )
}
