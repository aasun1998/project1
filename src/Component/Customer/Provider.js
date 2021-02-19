import React, { useState } from 'react';
import Context from './Context';

export default function CustomerProvider(props) {

      const [customer, setCustomer]=useState(null);

    return (
       <Context.Provider value={{customer, setCustomer}}>
           {props.children}
       </Context.Provider>
    )
}
