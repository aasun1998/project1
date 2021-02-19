import React, { useState } from 'react';
import Context from './Context';

export default function SettingProvider(props) {

      const [setting, setSetting]=useState(null);

    return (
       <Context.Provider value={{setting, setSetting}}>
           {props.children}
       </Context.Provider>
    )
}
