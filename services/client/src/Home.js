import React, { useContext } from 'react';
import { userContext } from './store/User';
import HomeInfo from './components/HomeComponents/Info';
import HomeUserGroups from './components/HomeComponents/HomeUserGroups';

export default function Home(props) {
  const { loggedIn, memberGroups } = useContext(userContext);

  return (
    <div>
    {
      (loggedIn)
      ? <HomeUserGroups groups={memberGroups} />
      : (<div>
        <h1 className="honey-text">Sup???</h1>
        <HomeInfo />
      </div>)
    }
    </div>
    )
};
