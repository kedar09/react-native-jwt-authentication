import React, {useReducer} from 'react';
import {userReducer, userState} from '../reducers/user.reducer';
import {UserContext} from './user.context';

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, userState);

  return (
    <UserContext.Provider value={{userState: state, dispatchUser: dispatch}}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
