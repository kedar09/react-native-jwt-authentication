export const userState = {
  isLoading: true,
  isAuthenticated: false,
  displayName: '',
  email: '',
  phoneNumber: '',
  authId: '',
  token: null,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGGED_IN_SUCCESSFUL':
      return {
        ...state,
        isLoading: action.value.isLoading,
        displayName: action.value.displayName,
        email: action.value.email,
        phoneNumber: action.value.phoneNumber,
        isAuthenticated: action.value.isAuthenticated,
      };
    case 'LOGIN_FAILED':
      return {...state, isLoading: false};
    default:
      return state;
  }
};
