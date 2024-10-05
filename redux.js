const { log } = require("console");
const redux = require("redux");
const createStore = redux.createStore;

const redux_logger = require("redux-logger");
const logger = redux_logger.createLogger();
const applyMiddleware = redux.applyMiddleware;

// --------------------------------
const My_Cake = "BUY_CAKE";
function BUY_CAKE() {
  return {
    type: My_Cake,
  };
}
// --------------------------------
// --
// --
// --------------------------------
const My_ICE = "BUY_ICE";
function BUY_ICE() {
  return {
    type: My_ICE,
  };
}
// --------------------------------
// --
// --
// --
// --
// ----------------------------------
const cake_InitialState = {
  cake_stor: 10,
};
const iceCream_InitialState = {
  iceCream_store: 10,
};
// ----------------------------------
// --
// --
// --
// --
const Reducer_cake = (state = cake_InitialState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        cake_stor: state.cake_stor - 1,
      };
    default:
      return state;
  }
};
// --
// --
// ================================================================
// --
// --
const Reducer_iceCream = (state = iceCream_InitialState, action) => {
  switch (action.type) {
    case "BUY_ICE":
      return {
        ...state,
        iceCream_store: state.iceCream_store - 1,
      };
    default:
      return state;
  }
};

// ============================================
// add two ruducer
const combineReducers = redux.combineReducers;
const RootReducer = combineReducers({
  cake: Reducer_cake,
  iceCream: Reducer_iceCream,
});
const Stor = createStore(RootReducer, applyMiddleware(logger));
// ============================================

const unsubscribe = Stor.subscribe(() => {
  // هنا لما كنت بحب اشوف الداته ولان
  // middelware حلت المووضع
  // بدون الحاجه الي unsubscribe او subscribe
  // middelware بتخليك تشوف الداته بتاعتك
  // console.log(Stor.getState());
});
Stor.dispatch(BUY_CAKE());
Stor.dispatch(BUY_ICE());
unsubscribe();
// node redux.js
