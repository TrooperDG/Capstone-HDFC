import React, { createContext, useContext, useReducer } from "react";

const SimulationStateContext = createContext();
const SimulationDispatchContext = createContext();

const initialState = {
  user: {
    id: "u01",
    name: "Vishal",
    phone: "+91-XXXXXXXXXX",
    email: "vishal@example.com",
  },

  channelsOrder: ["SMS", "WHATSAPP", "EMAIL", "INAPP"],

  blocked: { SMS: false, WHATSAPP: false, EMAIL: false, INAPP: false },
  deviceOffline: false,
  spoofing: false,

  events: [], // UI phone messages
  logs: [], // terminal logs

  adminToast: null,
  selectedMessage: null, // for verification modal
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_LOG":
      return { ...state, logs: [...state.logs, action.log] };

    case "TOGGLE_BLOCK":
      return {
        ...state,
        blocked: {
          ...state.blocked,
          [action.channel]: !state.blocked[action.channel],
        },
      };

    case "SET_SPOOF":
      return { ...state, spoofing: action.value };

    case "SET_OFFLINE":
      return { ...state, deviceOffline: action.value };

    case "REORDER_CHANNELS":
      return { ...state, channelsOrder: action.payload };

    case "PUSH_EVENT":
      return { ...state, events: [action.event, ...state.events] };

    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.id ? { ...e, ...action.patch } : e
        ),
      };

    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.id),
      };

    case "SET_ADMIN_TOAST":
      return { ...state, adminToast: action.toast };

    case "SET_SELECTED_MESSAGE":
      return { ...state, selectedMessage: action.message };

    case "CLEAR_SELECTED_MESSAGE":
      return { ...state, selectedMessage: null };

    default:
      return state;
  }
}

export function SimulationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SimulationStateContext.Provider value={state}>
      <SimulationDispatchContext.Provider value={dispatch}>
        {children}
      </SimulationDispatchContext.Provider>
    </SimulationStateContext.Provider>
  );
}

export function useSimulationState() {
  return useContext(SimulationStateContext);
}
export function useSimulationDispatch() {
  return useContext(SimulationDispatchContext);
}
