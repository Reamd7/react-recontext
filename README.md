## react-recontext

[![npm version](https://badge.fury.io/js/react-recontext.svg)](https://badge.fury.io/js/react-recontext) [![CircleCI](https://circleci.com/gh/minhtc/react-recontext/tree/master.svg?style=svg)](https://circleci.com/gh/minhtc/react-recontext/tree/master) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/minhtc/react-recontext/graphs/contributors)

A lightweight state management inspired by Flux, Redux, based on the latest React Context API.

SUPER simple and easy to build react, react-native application and flux architecture.

Following the Flux Architechture

## Installation

    npm install --save react-recontext

_or_

    yarn add react-recontext

## Api

1. **`createStore(initialState, actionsCreators, enableLogger)`**: of course, to create the app's root Store! 😗
   - **initialState**: vanilla or immutable js object, contains store default value.
   - **actionsCreators**: js object contains function to update store value
   - **enableLogger**: boolean flag for debugging
2. **`<Provider />`**: wrap the root Component.
   - The root component usually is `<App />` Component
3. **`connect(mapStateToProps)(Component)`**: connect React Component to Store, very easy to get value from store in any components.
   - **mapStateToProps**: a function to define which store values you want to inject into Component props
4. **`dispatch(actionType, params)`**: dispatch an event to update the Store value, from everywhere.
   - **actionType**: a string corresponding to the action name in `actionsCreators`
   - **params**: should be an object contains the value you want to update in 

### Important and _funny_ part:

You don't need to create action types anymore, all action type would be generated automatically. For example:

- the actions creators:

        const actionsCreators = {
            addTodoItem: (state, { item }) => ({
                list: state.list.push(item)
            })
        };

- change the action name from camel case into screaming snake case (`addTodoItem` => `ADD_TODO_ITEM`) then dispatch action.

        dispatch("ADD_TODO_ITEM", { item: item })

## Example

There are some examples app you can play with:

- Web App Todos: [Todo App Example](https://github.com/minhtc/react-recontext/tree/master/examples/webapp)
- Web App Todos Preview on CodeSandbox: [Todo App Example](https://codesandbox.io/s/github/GantMan/ReactStateMuseum/tree/master/React/react-recontext)
- Web App Hackathon Team Matcher: [Hackathon team matcher](https://junctionxhanoi.meohack.com)
- React Native App Todos: [Todo App Example](https://github.com/minhtc/react-recontext/tree/master/examples/nativeapp)
- React Native Todos Preview on Expo: [Todo App Example](https://snack.expo.io/@minhtc/react-recontext-demo)
- React Native Audiobook: [Audiobook React Native App](https://github.com/minhtc/sachnoiapp)
- ...more is coming...

## Usage

Only **3 steps** to start with react-recontext

1.  Create **store.js**

```js
import createContext from "react-recontext";

const { dispatch, Context, Provider } = createContext({
  displayName: "AppContext",
  initState: {
    todos: []
  },
  actions: {
    TOGGLE_ITEM: (state, { todoId }) => ({
      todos: state.todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    })
  },
  isEnableLog: __DEV__
});

// export store
export { dispatch, Context, Provider };
```

2.  Wrap root component with Provider

- react:

```js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./store";
import App from "./App";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

- react-native + react-nativation

```js
import { createStackNavigator } from "react-navigation";
import { Provider } from "./store";

const AppNavigator = createStackNavigator(...)

// wrap root component with <Provider /> that imported from recontext store
const App = () => (
    <Provider>
        <AppNavigator />
    </Provider>
);
```

3.  Connect component to get data and call action anywhere you want

```js
import React from "react";
import Todo from "./Todo";
import { Context, dispatch } from "./store";

const TodoList = () => {
  const { todos } = React.useContext(Context);

  return (
    <ul>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          todo={todo}
          onClick={() => dispatch("TOGGLE_ITEM", { todoId: todo.id })} // dispatch action type to update store value
        />
      ))}
    </ul>
  );
};

export default TodoList;
```

## Debugging

Supporting debugging by print all the store changes, example:

<center>

![Logger Example](https://github.com/minhtc/react-recontext/raw/master/screenshots/logger.gif "Logger Example")

</center>
