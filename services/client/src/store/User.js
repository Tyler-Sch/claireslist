import React, { useState, createContext } from 'react';

const fakeGroupData = [
  {
    'groupName': 'bunnyslayer',
    'groupAddress': '34sdfgs'
  },
  {
    'groupName': 'fakeGroup2',
    'groupAddress': 'adsf33F'
  },
  {
    'groupName': 'bunnyslayer2',
    'groupAddress': '34sdfgs32'
  },
  {
    'groupName': 'fakeGroup3',
    'groupAddress': 'adsf3233F'
  },
  {
    'groupName': 'bunnyslayer3',
    'groupAddress': '34sd24fgs'
  },
  {
    'groupName': 'fakeGroup5',
    'groupAddress': 'ad44sf33F'
  }
]



export const userContext = new createContext();

export default function User(props) {
  const [loggedIn, setLogin] = useState(true);
  // fix me for real data
  const [memberGroups, setMemberGroups] = useState(fakeGroupData); // needs to come out in place of fetch


  return (
    <userContext.Provider value={{ loggedIn, memberGroups }} >
      {props.children}
    </userContext.Provider>
  )
}
