import React, { useState } from 'react';
import Context from './Context';

export default function ProfileProvider(props) {

    const [profile, setProfile]=useState(null);

    return (
       <Context.Provider value={{profile, setProfile}}>
           {props.children}
       </Context.Provider>
    )
}
