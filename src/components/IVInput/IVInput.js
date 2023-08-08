import React from 'react';
import { styled } from 'styled-components';

function IVInput({ stat, statHandler }) {

  const ivs = [];
  for (let i = 0; i < 16; i++) {
    ivs[i] = i;
  }

  return (
    <Select
      id="iv"
      value={stat}
      onChange={statHandler}
    >
      {ivs.map((iv) => {
        return (
          <option
            key={iv}
            value={iv}
            label={iv.toString()}
          />
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  background-color: transparent;
  border: none;
  width: 2.3rem;
  border-bottom: 1px solid black;

  &:focus {
    outline: none;
    border-bottom: 2px solid red;
  }
`
export default IVInput;
