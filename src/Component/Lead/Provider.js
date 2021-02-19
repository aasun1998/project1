import React, { useState } from 'react';
import Context from './Context';

export default function LeadProvider(props) {

      const [lead, setLead]=useState(null);

    return (
       <Context.Provider value={{lead, setLead}}>
           {props.children}
       </Context.Provider>
    )
}
