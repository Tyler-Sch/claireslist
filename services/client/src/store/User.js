import React, { useState, createContext } from 'react';

export const userContext = new createContext();

export default function User(props) {
  const [loggedIn, setLogin] = useState(true);

  return (
    <userContext.Provider value={{ loggedIn }} >
      {props.children}
    </userContext.Provider>
  )
}
