import * as action from "../App/Action";
const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

const InitialState = {
  lodding: false,
  data: [],
  error: "",
};

function Lodding() {
  return {
    type: action.LODING_DATA,
  };
}

function Data(user) {
  return {
    type: action.FEATCH_DATA,
    paylaod: user,
  };
}

function Error(error) {
  return {
    type: action.ERROR_DATA,
    paylaod: error,
  };
}

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case LODING_DATA:
      return {
        ...state,
        lodding: true,
      };
    case FEATCH_DATA:
      return {
        lodding: false,
        data: action.paylaod,
        error: "",
      };
    case ERROR_DATA:
      return {
        lodding: false,
        data: [],
        error: action.paylaod,
      };
  }
};
const ActionCreator = () => {
  return function (dispatch) {
    dispatch(Lodding());
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        const user = response.data;
        dispatch(Data(user));
      })
      .catch((error) => {
        dispatch(Error(error.message));
      });
  };
};

const Store = createStore(reducer, applyMiddleware(thunkMiddleware));
Store.subscribe(() => {
  console.log(Store.getState());
});
Store.dispatch(ActionCreator());

// node App/Api.js
     