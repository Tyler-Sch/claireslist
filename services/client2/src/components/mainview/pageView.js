import React, { useState, useEffect } from 'react';
import LoadingScreen from '../loading';
import TableView from './tableView';
import TextInput from '../generics/textInput';
import Modal from '../generics/modal';

export default function PageView(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [roomData, setRoomData] = useState({});
  const [roomId, setRoomId] = useState(props.match.params.id);
  const [error, setError] = useState(false);

  const requestData = {
    requestedRoom: roomId,
    password
  };

  useEffect(() => {
    // check if password needed and download info
    getRoomInfo();
  }, [])

  const getRoomInfo = async () => {
    const url = 'http://localhost:5001/tables/fetch';

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
    // console.log(responseData);
    if (responseData.status === 'password needed') {
      setNeedsPassword(true);
      window.location.hash = 'password-modal';
      return
    }
    else if (responseData.status === 'success'){
      setRoomData(responseData.roomInfo);
      // console.log(responseData.roomInfo);
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
    setNeedsPassword(false);
    getRoomInfo();
  }


  return(
    <div>
      <Modal header='Password?' id="password-modal">
          <form onSubmit={submitPassword}>
            <TextInput
              label='Password'
              type='Password'
              value={password}
              onchange={setPassword}
              />
            <button type="submit" className="full-btn">Submit</button>
          </form>
      </Modal>
      {
        isLoading
        ? <LoadingScreen />
      : <TableView {...roomData}/>
      }
      { error && <p className="text-center">Something appears to have gone wrong</p>}
    </div>


  )
}
