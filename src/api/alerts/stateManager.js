const initialState = [];

const stateManager = (state = initialState, action) => {
  const { type, payload = {} } = action;
  switch (type) {
    case "setAlert":
      return [...state, payload];
    case "removeAlert":
      return state.filter((alert) => alert.id !== payload);
    case "clearAlerts":
      return initialState;
    default:
      return state;
  }
};

export default stateManager;
