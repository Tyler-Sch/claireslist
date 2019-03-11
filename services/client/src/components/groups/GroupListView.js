import React from 'react';
const groupFakeData = [
  {
    'owner': 'Claire',
    'whoHasIt': 'Matt',
    'itemName': 'Comic Book',
    'dueBack': 'Whenever'
  },
  {
    'owner': 'Tyler',
    'whoHasIt': 'Andy',
    'itemName': 'Stand Mixer',
    'dueBack': 'Whenever'
  },
  {
    'owner': 'Bunka',
    'whoHasIt': 'Joe',
    'itemName': 'Comic Book',
    'dueBack': 'asap'
  },
  {
    'owner': 'Joe',
    'whoHasIt': 'No 0ne',
    'itemName': 'belt sander',
    'dueBack': 'n/a'
  },
]


export default function GroupList(props) {
  const arg = props.match.params.id;
  // Think groups it belongs to need to be fetched from inside
  // this function. Could pass it back up through userContext,
  // but i'll have to be careful of endless loop
  // probably will need the logic for joining a group in here too

  return (
    <h1>{arg}</h1>
  )
}
