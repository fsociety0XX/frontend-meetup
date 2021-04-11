import React, { useContext, useReducer, createContext } from "react";

// prepares the data layer
export const StateContext = createContext();

// wrap our app and provides data layer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// pull information from data layer
// export const useStateValue = useContext(StateContext);

// export function contextFunction() {
//   let useStateValue = useContext(StateContext);

//   return <ComponentImpl useStateValue={useStateValue}></ComponentImpl>;
// }
