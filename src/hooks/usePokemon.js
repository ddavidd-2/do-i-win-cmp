'use client';
import React from 'react';

function reducer(state, action) {
  if (action.type === 'name') {
    return {
      ...state,
      name: action.value
    }
  } else if (action.type === 'form') {
    return {
      ...state,
      form: action.value
    }
  } else if (action.type === 'attack') {
    return {
      ...state,
      atkIV: action.value
    }
  } else if (action.type === 'defense') {
    return {
      ...state,
      defIV: action.value
    }
  } else if (action.type === 'stamina') {
    return {
      ...state,
      staIV: action.value
    }
  }
}

export default function usePokemon() {
  const [pokemon, dispatch] = React.useReducer(reducer,
    {
      name: " ",
      form: "Normal",
      atkIV: 0,
      defIV: 0,
      staIV: 0,
    });

  return [pokemon, dispatch];
}