// Custom useContext for the Cart 
import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

/*
  Manage the state cart (array).
  ADD: Add items to cart array
  REMOVE: Remove item from cart array using index
  Throws an error if different case.
*/

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
      case "REMOVEALL":
      return [];
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

/* Context could be imported everywhere in the application
  Implemented as an array (list), with each item assigned a key. 
*/
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
