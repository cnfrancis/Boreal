import React, { useReducer, useContext, createContext } from "react";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.user;
    case "RESET":
      return null;
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, null);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUser = () => useContext(UserStateContext);
export const useDispatchUser = () => useContext(UserDispatchContext);
