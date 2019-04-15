import React, { useState } from 'react';
import LoadingScreen from '../loading';

export default function PageView(props) {
  const [isLoading, setIsLoading] = useState(true);

  // <h1>{props.match.params.id}</h1>

  return(
    <div>
      <LoadingScreen />
    </div>
  )
}
