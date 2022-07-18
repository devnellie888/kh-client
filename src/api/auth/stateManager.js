const initialState = {
  registered: [],
  loggedIn: false,
  prevent: false,
};

const stateManager = (state = initialState, action) => {
  const { type, userData = {}, path = "/", loaded = false } = action;
  switch (type) {
    case "login":
      return {
        ...state,
        error: false,
        ...userData,
        loggedIn: true,
        path,
        loaded,
      }; //todo use filteration in user and save it in db to store sorting and filters on server

    case "authError":
      return {
        error: true,
        loggedIn: false,
        path: "/auth",
        loaded,
        prevent: !state.prevent,
      };

    //todo need to send these two cases to dashboard reducer. Auth needs to be separate
    case "register":
      const { username, role } = userData;
      return {
        ...state,
        error: false,
        registered: [
          ...state.registered,
          {
            username,
            role,
          },
        ],
      };

    case "dataError":
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};

export default stateManager;
