import React, { useState } from 'react';
import Context from './Context';

export default function BlogProvider(props) {

      const [blog, setBlog]=useState(null);

    return (
       <Context.Provider value={{blog, setBlog}}>
           {props.children}
       </Context.Provider>
    )
}
